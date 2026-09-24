import { Injectable, Logger } from '@nestjs/common';
import {
  TornCompanyV2Profile,
  TornFactionV2Basic,
  TornUserV2Profile,
  TornWorkStatsV2,
} from './torn-api.types';

@Injectable()
export class TornApiService {
  private readonly logger = new Logger(TornApiService.name);
  private readonly baseUrl = 'https://api.torn.com';
  private lastCallTimestamp = 0;
  private readonly minIntervalMs = 670; // 90 calls/min rate limit protection

  private async rateLimitThrottle(): Promise<void> {
    const now = Date.now();
    const elapsed = now - this.lastCallTimestamp;
    if (elapsed < this.minIntervalMs) {
      const waitTime = this.minIntervalMs - elapsed;
      await new Promise((resolve) => setTimeout(resolve, waitTime));
    }
    this.lastCallTimestamp = Date.now();
  }

  public async fetchCompanyProfile(
    companyId: number,
    apiKey: string,
  ): Promise<TornCompanyV2Profile> {
    await this.rateLimitThrottle();
    const url = `${this.baseUrl}/company/${companyId}?selections=profile&key=${apiKey}`;
    this.logger.log(`Fetching Torn Company profile: ${companyId}`);

    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Torn API returned status ${res.status}`);
    }

    const data = await res.json();
    if (data.error) {
      throw new Error(`Torn API Error [${data.error.code}]: ${data.error.error}`);
    }

    const profile = data.company;
    return {
      id: companyId,
      name: profile.name,
      company_type: profile.company_type,
      rating: profile.rating || 0,
      director: profile.director,
      employees_hired: profile.employees_hired || 0,
      employees_capacity: profile.employees_capacity || 0,
      daily_income: profile.daily_income,
      daily_customers: profile.daily_customers,
      days_old: profile.days_old,
    };
  }

  public async fetchFactionProfile(
    factionId: number,
    apiKey: string,
  ): Promise<TornFactionV2Basic> {
    await this.rateLimitThrottle();
    const url = `${this.baseUrl}/faction/${factionId}?selections=basic&key=${apiKey}`;
    this.logger.log(`Fetching Torn Faction profile: ${factionId}`);

    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Torn API returned status ${res.status}`);
    }

    const data = await res.json();
    if (data.error) {
      throw new Error(`Torn API Error [${data.error.code}]: ${data.error.error}`);
    }

    const faction = data.faction;
    const membersArray = Object.entries(faction.members || {}).map(([id, m]: [string, any]) => ({
      id: Number(id),
      name: m.name,
      level: m.level,
      days_in_faction: m.days_in_faction,
      last_action: m.last_action,
      position: m.position,
    }));

    return {
      id: factionId,
      name: faction.name,
      tag: faction.tag,
      leader: faction.leader,
      "co-leader": faction["co-leader"],
      respect: faction.respect || 0,
      age: faction.age || 0,
      capacity: faction.capacity || 0,
      members: membersArray,
    };
  }

  public async verifyUserAndRoles(
    apiKey: string,
  ): Promise<{
    user: TornUserV2Profile;
    workStats?: TornWorkStatsV2;
  }> {
    await this.rateLimitThrottle();
    const url = `${this.baseUrl}/user/?selections=profile,workstats&key=${apiKey}`;

    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Torn API returned status ${res.status}`);
    }

    const data = await res.json();
    if (data.error) {
      throw new Error(`Torn API Error [${data.error.code}]: ${data.error.error}`);
    }

    return {
      user: {
        player_id: data.player_id,
        name: data.name,
        level: data.level,
        rank: data.rank,
        age: data.age,
        status: data.status,
        job: data.job,
        faction: data.faction,
      },
      workStats: data.workstats,
    };
  }
}
