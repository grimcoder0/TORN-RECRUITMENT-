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

    // 1. Fetch live user profile and work stats
    // We try Torn API v2 first; if needed we fallback or combine with v1 to guarantee all fields
    let profile: any = {};
    let workstats: any = {};
    let rawData: any = {};

    try {
      // Torn API v2 call
      const v2Url = `https://api.torn.com/v2/user/?selections=profile,workstats&key=${cleanKey}`;
      const v2Res = await fetch(v2Url, { cache: 'no-store' });
      const v2Data = await v2Res.json();

      if (!v2Data.error) {
        rawData = v2Data;
        profile = v2Data.profile || v2Data;
        workstats = v2Data.workstats || v2Data.work_stats || {};
      }
    } catch (e) {
      console.warn('V2 user fetch error:', e);
    }

    // If profile or ID is still missing or company/faction is empty, query v1 as robust fallback/enrichment
    if (!profile.name || !profile.player_id && !profile.id || !profile.job && !profile.faction) {
      try {
        const v1Url = `https://api.torn.com/user/?selections=profile,workstats&key=${cleanKey}`;
        const v1Res = await fetch(v1Url, { cache: 'no-store' });
        const v1Data = await v1Res.json();

        if (v1Data.error && !profile.name) {
          return NextResponse.json(
            { success: false, error: `Torn API Error [${v1Data.error.code}]: ${v1Data.error.error}` },
            { status: 400 }
          );
        }

        if (!v1Data.error) {
          // Merge data
          rawData = { ...v1Data, ...rawData };
          profile = { ...v1Data, ...profile };
          if (v1Data.manual_labor) {
            workstats = {
              manual_labor: v1Data.manual_labor,
              intelligence: v1Data.intelligence,
              endurance: v1Data.endurance,
              ...workstats,
            };
          }
        }
      } catch (e) {
        console.warn('V1 user fallback error:', e);
      }
    }

    const playerId = profile.player_id || profile.id || rawData.player_id || rawData.id || 'Unknown';
    const name = profile.name || rawData.name || 'Unknown Player';
    const level = profile.level ?? rawData.level ?? 1;
    const rank = profile.rank || rawData.rank || '';
    const age = profile.age || rawData.age || 0;

    const manualLabor = workstats.manual_labor || profile.manual_labor || rawData.manual_labor || 0;
    const intelligence = workstats.intelligence || profile.intelligence || rawData.intelligence || 0;
    const endurance = workstats.endurance || profile.endurance || rawData.endurance || 0;
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

    // 2. Identify Company ID & Details
    const job = profile.job || rawData.job || {};
    const companyObj = profile.company || rawData.company || {};

    let companyId =
      job.company_id ||
      job.id ||
      companyObj.id ||
      companyObj.company_id ||
      profile.company_id ||
      rawData.company_id ||
      null;

    let companyName =
      job.company_name ||
      companyObj.name ||
      companyObj.company_name ||
      profile.company_name ||
      rawData.company_name ||
      null;

    let jobPosition =
      job.position ||
      companyObj.position ||
      profile.job_title ||
      rawData.job_title ||
      'Employee';

    let companyStars = 0;
    let companyType = '';

    // If companyId is found and greater than 0, query Torn API directly for the exact company profile & stars
    if (companyId && Number(companyId) > 0) {
      try {
        // First try v2 company
        const compV2Url = `https://api.torn.com/v2/company/${companyId}?selections=profile&key=${cleanKey}`;
        const compV2Res = await fetch(compV2Url, { cache: 'no-store' });
        const compV2Data = await compV2Res.json();

        if (compV2Data && !compV2Data.error) {
          const compProfile = compV2Data.company || compV2Data.profile || compV2Data;
          if (compProfile.name) companyName = compProfile.name;
          if (compProfile.rating !== undefined) companyStars = compProfile.rating;
          if (compProfile.stars !== undefined) companyStars = compProfile.stars;
          if (compProfile.company_type) companyType = `Type #${compProfile.company_type}`;
        } else {
          // Fallback to v1 company profile
          const compV1Url = `https://api.torn.com/company/${companyId}?selections=profile&key=${cleanKey}`;
          const compV1Res = await fetch(compV1Url, { cache: 'no-store' });
          const compV1Data = await compV1Res.json();

          if (compV1Data && compV1Data.company) {
            if (compV1Data.company.name) companyName = compV1Data.company.name;
            if (compV1Data.company.rating !== undefined) companyStars = compV1Data.company.rating;
            if (compV1Data.company.stars !== undefined) companyStars = compV1Data.company.stars;
          }
        }
      } catch (e) {
        console.error('Failed to fetch detailed company profile:', e);
      }
    }

    const isCompanyDirector =
      (typeof jobPosition === 'string' && jobPosition.toLowerCase().includes('director')) ||
      job.is_director === true ||
      companyObj.is_director === true;

    const hasCompany = Boolean(companyId && Number(companyId) > 0);

    const companyAffiliation = {
      inCompany: hasCompany,
      companyId: hasCompany ? companyId : null,
      companyName: hasCompany ? (companyName || `Company #${companyId}`) : 'Unemployed',
      position: hasCompany ? jobPosition : 'None',
      stars: companyStars,
      companyType,
      isDirector: isCompanyDirector,
    };

    // 3. Identify Faction ID & Details
    const factionObj = profile.faction || rawData.faction || {};

    let factionId =
      factionObj.faction_id ||
      factionObj.id ||
      profile.faction_id ||
      rawData.faction_id ||
      null;

    let factionName =
      factionObj.faction_name ||
      factionObj.name ||
      profile.faction_name ||
      rawData.faction_name ||
      null;

    let factionTag = factionObj.tag || profile.faction_tag || rawData.faction_tag || '';
    let factionPosition =
      factionObj.position ||
      profile.faction_position ||
      rawData.faction_position ||
      'Member';

    // If factionId is found and greater than 0, query Torn API directly for the exact faction profile & real name/tag
    if (factionId && Number(factionId) > 0) {
      try {
        // First try v2 faction basic
        const factV2Url = `https://api.torn.com/v2/faction/${factionId}?selections=basic&key=${cleanKey}`;
        const factV2Res = await fetch(factV2Url, { cache: 'no-store' });
        const factV2Data = await factV2Res.json();

        if (factV2Data && !factV2Data.error) {
          const factBasic = factV2Data.faction || factV2Data.basic || factV2Data;
          if (factBasic.name) factionName = factBasic.name;
          if (factBasic.tag) factionTag = factBasic.tag;
        } else {
          // Fallback to v1 faction basic
          const factV1Url = `https://api.torn.com/faction/${factionId}?selections=basic&key=${cleanKey}`;
          const factV1Res = await fetch(factV1Url, { cache: 'no-store' });
          const factV1Data = await factV1Res.json();

          if (factV1Data && !factV1Data.error) {
            if (factV1Data.name) factionName = factV1Data.name;
            if (factV1Data.tag) factionTag = factV1Data.tag;
          }
        }
      } catch (e) {
        console.error('Failed to fetch detailed faction profile:', e);
      }
    }

    const hasFaction = Boolean(factionId && Number(factionId) > 0);

    const isFactionLeader =
      typeof factionPosition === 'string' &&
      (factionPosition.toLowerCase().includes('leader') || factionPosition.toLowerCase().includes('co-leader'));

    const factionAffiliation = {
      inFaction: hasFaction,
      factionId: hasFaction ? factionId : null,
      factionName: hasFaction ? (factionName || `Faction #${factionId}`) : 'No Faction Joined',
      tag: factionTag,
      position: hasFaction ? factionPosition : 'None',
      isLeader: isFactionLeader,
    };

    // 4. Generate intelligent recommendations
    const suggestions: any[] = [];

    if (!factionAffiliation.inFaction) {
      suggestions.push({
        type: 'FACTION_ALERT',
        title: 'You currently have no Faction',
        description: 'Joining a faction provides substantial gym gains, steadfast perks, OC payouts, and free medical/energy supplies.',
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
        title: `Director of ${companyAffiliation.companyName} (${companyAffiliation.stars}★)`,
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
