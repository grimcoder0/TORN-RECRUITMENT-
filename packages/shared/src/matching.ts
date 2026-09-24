import { MatchingResult, TornCompanySummary, TrainingProgramType } from './index';

export interface PlayerMatchingProfile {
  level: number;
  manualLabor: number;
  intelligence: number;
  endurance: number;
  desiredSalary: number;
  preferredTraining: TrainingProgramType;
}

export interface CompanyJobRequirement {
  minimumLevel: number;
  requiredManual: number;
  requiredIntelligence: number;
  requiredEndurance: number;
  salary: number;
  trainingType: TrainingProgramType;
}

export class MatchingEngine {
  public static evaluateJobMatch(
    player: PlayerMatchingProfile,
    job: CompanyJobRequirement
  ): MatchingResult {
    const satisfied: string[] = [];
    const unmet: string[] = [];

    // Level check
    if (player.level >= job.minimumLevel) {
      satisfied.push(`Level requirement met (Req: ${job.minimumLevel}, Yours: ${player.level})`);
    } else {
      unmet.push(`Level requirement not met (Req: ${job.minimumLevel}, Yours: ${player.level})`);
    }

    // Work stats check
    if (
      player.manualLabor >= job.requiredManual &&
      player.intelligence >= job.requiredIntelligence &&
      player.endurance >= job.requiredEndurance
    ) {
      satisfied.push('Stat thresholds satisfied (Manual, Intelligence, Endurance)');
    } else {
      const deficits: string[] = [];
      if (player.manualLabor < job.requiredManual) deficits.push(`Manual (-${job.requiredManual - player.manualLabor})`);
      if (player.intelligence < job.requiredIntelligence) deficits.push(`Intelligence (-${job.requiredIntelligence - player.intelligence})`);
      if (player.endurance < job.requiredEndurance) deficits.push(`Endurance (-${job.requiredEndurance - player.endurance})`);
      unmet.push(`Work stats deficit: ${deficits.join(', ')}`);
    }

    // Salary preference
    if (job.salary >= player.desiredSalary) {
      satisfied.push(`Salary meets or exceeds preference ($${job.salary.toLocaleString()})`);
    } else {
      unmet.push(`Salary below desired threshold ($${job.salary.toLocaleString()} vs $${player.desiredSalary.toLocaleString()})`);
    }

    // Training preference
    if (
      player.preferredTraining === TrainingProgramType.NO_TRAINING ||
      player.preferredTraining === job.trainingType
    ) {
      satisfied.push(`Training program matches (${job.trainingType})`);
    } else {
      unmet.push(`Training program mismatch (Offers ${job.trainingType}, preferred ${player.preferredTraining})`);
    }

    const totalCriteria = satisfied.length + unmet.length;
    const matchScore = totalCriteria > 0 ? Math.round((satisfied.length / totalCriteria) * 100) : 0;

    return {
      isMatched: unmet.length === 0,
      isPartialMatch: satisfied.length > 0 && unmet.length > 0,
      matchScore,
      satisfiedRequirements: satisfied,
      unmetRequirements: unmet,
    };
  }
}
