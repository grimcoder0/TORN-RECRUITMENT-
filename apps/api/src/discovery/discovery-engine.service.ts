import { Injectable, Logger } from '@nestjs/common';
import { TornApiService } from '../torn/torn-api.service';
import { TornCompanyV2Profile, TornFactionV2Basic } from '../torn/torn-api.types';

export enum OpportunityStatus {
  DISCOVERED = 'DISCOVERED',
  OPEN = 'OPEN',
  VERIFIED_RECRUITING = 'VERIFIED_RECRUITING',
  NO_OPENING = 'NO_OPENING',
  STALE = 'STALE',
}

export interface DiscoveredCompanyRecord {
  tornCompanyId: number;
  name: string;
  typeId: number;
  rating: number;
  directorId: number;
  employeeCapacity: number;
  employeeCount: number;
  availableCapacity: number;
  status: OpportunityStatus;
  firstDetectedAt: Date;
  lastDetectedAt: Date;
  lastSyncedAt: Date;
  isDirectorVerified: boolean;
}

export interface DiscoveredFactionRecord {
  tornFactionId: number;
  name: string;
  tag: string;
  leaderId: number;
  respect: number;
  capacity: number;
  memberCount: number;
  availableCapacity: number;
  status: OpportunityStatus;
  firstDetectedAt: Date;
  lastDetectedAt: Date;
  lastSyncedAt: Date;
  isLeaderVerified: boolean;
}

@Injectable()
export class DiscoveryEngineService {
  private readonly logger = new Logger(DiscoveryEngineService.name);

  // In-memory cache store until PostgreSQL/Prisma instance connects
  private readonly companiesStore = new Map<number, DiscoveredCompanyRecord>();
  private readonly factionsStore = new Map<number, DiscoveredFactionRecord>();

  constructor(private readonly tornApi: TornApiService) {}

  public async syncCompany(
    companyId: number,
    apiKey: string,
  ): Promise<DiscoveredCompanyRecord> {
    const profile: TornCompanyV2Profile = await this.tornApi.fetchCompanyProfile(companyId, apiKey);
    const availableCapacity = Math.max(0, profile.employees_capacity - profile.employees_hired);
    const existing = this.companiesStore.get(companyId);
    const now = new Date();

    let status: OpportunityStatus;
    if (existing && existing.isDirectorVerified) {
      status = availableCapacity > 0 ? OpportunityStatus.VERIFIED_RECRUITING : OpportunityStatus.NO_OPENING;
    } else {
      status = availableCapacity > 0 ? OpportunityStatus.DISCOVERED : OpportunityStatus.NO_OPENING;
    }

    const record: DiscoveredCompanyRecord = {
      tornCompanyId: companyId,
      name: profile.name,
      typeId: profile.company_type,
      rating: profile.rating,
      directorId: profile.director,
      employeeCapacity: profile.employees_capacity,
      employeeCount: profile.employees_hired,
      availableCapacity,
      status,
      firstDetectedAt: existing?.firstDetectedAt || now,
      lastDetectedAt: availableCapacity > 0 ? now : (existing?.lastDetectedAt || now),
      lastSyncedAt: now,
      isDirectorVerified: existing?.isDirectorVerified || false,
    };

    this.companiesStore.set(companyId, record);
    this.logger.log(`Company [${companyId}] synced. Status: ${status}, Vacancies: ${availableCapacity}`);
    return record;
  }

  public async syncFaction(
    factionId: number,
    apiKey: string,
  ): Promise<DiscoveredFactionRecord> {
    const basic: TornFactionV2Basic = await this.tornApi.fetchFactionProfile(factionId, apiKey);
    const memberCount = basic.members.length;
    const availableCapacity = Math.max(0, basic.capacity - memberCount);
    const existing = this.factionsStore.get(factionId);
    const now = new Date();

    let status: OpportunityStatus;
    if (existing && existing.isLeaderVerified) {
      status = availableCapacity > 0 ? OpportunityStatus.VERIFIED_RECRUITING : OpportunityStatus.NO_OPENING;
    } else {
      status = availableCapacity > 0 ? OpportunityStatus.DISCOVERED : OpportunityStatus.NO_OPENING;
    }

    const record: DiscoveredFactionRecord = {
      tornFactionId: factionId,
      name: basic.name,
      tag: basic.tag,
      leaderId: basic.leader,
      respect: basic.respect,
      capacity: basic.capacity,
      memberCount,
      availableCapacity,
      status,
      firstDetectedAt: existing?.firstDetectedAt || now,
      lastDetectedAt: availableCapacity > 0 ? now : (existing?.lastDetectedAt || now),
      lastSyncedAt: now,
      isLeaderVerified: existing?.isLeaderVerified || false,
    };

    this.factionsStore.set(factionId, record);
    this.logger.log(`Faction [${factionId}] synced. Status: ${status}, Vacancies: ${availableCapacity}`);
    return record;
  }

  public getDiscoveredCompanies(): DiscoveredCompanyRecord[] {
    return Array.from(this.companiesStore.values());
  }

  public getDiscoveredFactions(): DiscoveredFactionRecord[] {
    return Array.from(this.factionsStore.values());
  }
}
