export interface TornCompanyV2Profile {
  id: number;
  name: string;
  company_type: number;
  rating: number; // stars 0-10
  director: number; // director player ID
  employees_hired: number;
  employees_capacity: number;
  daily_income?: number;
  daily_customers?: number;
  days_old?: number;
}

export interface TornFactionV2Basic {
  id: number;
  name: string;
  tag: string;
  leader: number;
  "co-leader": number;
  respect: number;
  age: number;
  capacity: number;
  members: Array<{
    id: number;
    name: string;
    level: number;
    days_in_faction: number;
    last_action: {
      status: string;
      timestamp: number;
      relative: string;
    };
    position: string;
  }>;
}

export interface TornUserV2Profile {
  player_id: number;
  name: string;
  level: number;
  rank: string;
  age: number;
  status: {
    description: string;
    state: string;
  };
  job?: {
    company_id: number;
    company_name: string;
    company_type: number;
    position: string;
  };
  faction?: {
    faction_id: number;
    faction_name: string;
    position: string;
  };
}

export interface TornWorkStatsV2 {
  manual_labor: number;
  intelligence: number;
  endurance: number;
}
