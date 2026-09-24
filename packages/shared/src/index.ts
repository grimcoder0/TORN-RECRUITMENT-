export enum TornRole {
  PLAYER = 'PLAYER',
  COMPANY_DIRECTOR = 'COMPANY_DIRECTOR',
  FACTION_LEADER = 'FACTION_LEADER',
  RECRUITER = 'RECRUITER',
  MODERATOR = 'MODERATOR',
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN',
}

export enum DiscoveryOpportunityStatus {
  DISCOVERED = 'DISCOVERED',
  OPEN = 'OPEN',
  VERIFIED_RECRUITING = 'VERIFIED_RECRUITING',
  NO_OPENING = 'NO_OPENING',
  STALE = 'STALE',
  CLAIMED = 'CLAIMED',
  CLOSED = 'CLOSED',
}

export enum TrainingProgramType {
  NO_TRAINING = 'NO_TRAINING',
  FREE_TRAINING = 'FREE_TRAINING',
  PAID_TRAINING = 'PAID_TRAINING',
  ROTATIONAL_TRAINING = 'ROTATIONAL_TRAINING',
}

export interface TornCompanySummary {
  id: number;
  name: string;
  typeId: number;
  typeName: string;
  rating: number;
  directorId?: number;
  directorName?: string;
  employeeCapacity: number;
  employeeCount: number;
  availableCapacity: number;
  status: DiscoveryOpportunityStatus;
  isDirectorVerified: boolean;
  firstDetectedAt: string;
  lastSyncedAt: string;
}

export interface TornFactionSummary {
  id: number;
  name: string;
  tag?: string;
  leaderId?: number;
  leaderName?: string;
  respect: number;
  capacity: number;
  memberCount: number;
  availableCapacity: number;
  status: DiscoveryOpportunityStatus;
  isLeaderVerified: boolean;
  firstDetectedAt: string;
  lastSyncedAt: string;
}

export interface MatchingResult {
  isMatched: boolean;
  isPartialMatch: boolean;
  matchScore: number;
  satisfiedRequirements: string[];
  unmetRequirements: string[];
}
