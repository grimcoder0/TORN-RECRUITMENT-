import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { apiKey } = await request.json();

    if (!apiKey || typeof apiKey !== 'string' || apiKey.trim().length < 16) {
      return NextResponse.json(
        { success: false, error: 'A valid Torn API Key (at least 16 characters) is required.' },
        { status: 400 }
      );
    }

    const cleanKey = apiKey.trim();

    // Query Torn API v2 with selections: profile,workstats
    const userUrl = `https://api.torn.com/v2/user/?selections=profile,workstats&key=${cleanKey}`;
    const userRes = await fetch(userUrl, { cache: 'no-store' });
    const rawData = await userRes.json();

    if (rawData.error) {
      return NextResponse.json(
        { success: false, error: `Torn API Error [${rawData.error.code}]: ${rawData.error.error}` },
        { status: 400 }
      );
    }

    const profile = rawData.profile || rawData;
    const workstats = rawData.workstats || rawData.work_stats || {};

    const playerId = profile.id || profile.player_id || rawData.id || rawData.player_id || 'Unknown';
    const name = profile.name || rawData.name || 'Unknown Player';
    const level = profile.level ?? rawData.level ?? 1;
    const rank = profile.rank || rawData.rank || '';
    const age = profile.age || rawData.age || 0;

    const manualLabor = workstats.manual_labor || rawData.manual_labor || 0;
    const intelligence = workstats.intelligence || rawData.intelligence || 0;
    const endurance = workstats.endurance || rawData.endurance || 0;
    const totalWorkStats = manualLabor + intelligence + endurance;

    const player = {
      playerId,
      name,
      level,
      rank,
      age,
      manualLabor,
      intelligence,
      endurance,
      totalWorkStats,
    };

    // Robust extraction of Company / Job from all known Torn response paths
    const job = profile.job || rawData.job || {};
    const company = profile.company || rawData.company || {};

    const companyId =
      job.company_id ||
      job.id ||
      company.id ||
      company.company_id ||
      profile.company_id ||
      rawData.company_id ||
      null;

    const companyName =
      job.company_name ||
      company.name ||
      company.company_name ||
      profile.company_name ||
      rawData.company_name ||
      (companyId && companyId !== 0 ? `Company #${companyId}` : 'Unemployed');

    const jobPosition =
      job.position ||
      company.position ||
      profile.job_title ||
      rawData.job_title ||
      (companyId && companyId !== 0 ? 'Employee' : 'None');

    const isCompanyDirector =
      (typeof jobPosition === 'string' && jobPosition.toLowerCase().includes('director')) ||
      job.is_director === true ||
      company.is_director === true;

    const companyAffiliation = {
      inCompany: Boolean(companyId && companyId !== 0 && companyName !== 'Unemployed'),
      companyId: companyId && companyId !== 0 ? companyId : null,
      companyName,
      position: jobPosition,
      isDirector: isCompanyDirector,
    };

    // Robust extraction of Faction from all known Torn response paths
    const faction = profile.faction || rawData.faction || {};

    const factionId =
      faction.faction_id ||
      faction.id ||
      profile.faction_id ||
      rawData.faction_id ||
      null;

    const factionName =
      faction.faction_name ||
      faction.name ||
      profile.faction_name ||
      rawData.faction_name ||
      (factionId && factionId !== 0 ? `Faction #${factionId}` : 'No Faction Joined');

    const factionPosition =
      faction.position ||
      profile.faction_position ||
      rawData.faction_position ||
      (factionId && factionId !== 0 ? 'Member' : 'None');

    const isFactionLeader =
      typeof factionPosition === 'string' &&
      (factionPosition.toLowerCase().includes('leader') || factionPosition.toLowerCase().includes('co-leader'));

    const factionAffiliation = {
      inFaction: Boolean(factionId && factionId !== 0 && factionName !== 'No Faction Joined'),
      factionId: factionId && factionId !== 0 ? factionId : null,
      factionName,
      position: factionPosition,
      isLeader: isFactionLeader,
    };

    // Generate intelligent recommendations
    const suggestions: any[] = [];

    if (!factionAffiliation.inFaction) {
      suggestions.push({
        type: 'FACTION_ALERT',
        title: 'You currently have no Faction',
        description: 'Joining a faction provides gym gains, steadfast perks, free medical/energy supplies, and war payouts.',
        actionText: 'Browse Open Factions',
        link: '/factions',
      });
    }

    if (!companyAffiliation.inCompany) {
      suggestions.push({
        type: 'JOB_ALERT',
        title: 'You are currently Unemployed',
        description: `Your work stats (${player.totalWorkStats.toLocaleString()} total) qualify you for active company openings.`,
        actionText: 'Find Matching Jobs',
        link: '/jobs',
      });
    } else if (companyAffiliation.isDirector) {
      suggestions.push({
        type: 'DIRECTOR_ALERT',
        title: `Director of ${companyAffiliation.companyName}`,
        description: 'Your directorship has been verified. You can post recruitment vacancies and configure multi-stage rotational training.',
        actionText: 'Post Recruitment Job',
        link: '/companies/post-job',
      });
    }

    return NextResponse.json({
      success: true,
      data: {
        player,
        company: companyAffiliation,
        faction: factionAffiliation,
        suggestions,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to communicate with Torn API.' },
      { status: 500 }
    );
  }
}
