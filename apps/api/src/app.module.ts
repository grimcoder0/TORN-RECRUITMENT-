import { Module } from '@nestjs/common';
import { TornApiService } from './torn/torn-api.service';
import { DiscoveryEngineService } from './discovery/discovery-engine.service';
import { DiscoveryController } from './discovery/discovery.controller';

@Module({
  imports: [],
  controllers: [DiscoveryController],
  providers: [TornApiService, DiscoveryEngineService],
})
export class AppModule {}
