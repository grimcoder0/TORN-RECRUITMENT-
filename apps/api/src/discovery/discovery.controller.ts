import { Controller, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { DiscoveryEngineService } from './discovery-engine.service';

@Controller('discovery')
export class DiscoveryController {
  constructor(private readonly discoveryEngine: DiscoveryEngineService) {}

  @Get('companies')
  getCompanies() {
    return {
      success: true,
      data: this.discoveryEngine.getDiscoveredCompanies(),
    };
  }

  @Get('factions')
  getFactions() {
    return {
      success: true,
      data: this.discoveryEngine.getDiscoveredFactions(),
    };
  }

  @Post('sync/company/:id')
  async syncCompany(
    @Param('id', ParseIntPipe) id: number,
    @Query('key') apiKey: string,
  ) {
    if (!apiKey) {
      return { success: false, error: 'Torn API Key is required for sync request' };
    }
    const result = await this.discoveryEngine.syncCompany(id, apiKey);
    return { success: true, data: result };
  }

  @Post('sync/faction/:id')
  async syncFaction(
    @Param('id', ParseIntPipe) id: number,
    @Query('key') apiKey: string,
  ) {
    if (!apiKey) {
      return { success: false, error: 'Torn API Key is required for sync request' };
    }
    const result = await this.discoveryEngine.syncFaction(id, apiKey);
    return { success: true, data: result };
  }
}
