import { Module } from '@nestjs/common';
import { ConfigurationService } from './configuration.service';
import { ConfigurationResolver } from './configuration.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigurationSchema,Configuration  } from './schema/configuration.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Configuration.name, schema: ConfigurationSchema }]),
  ],
  providers: [ConfigurationService, ConfigurationResolver],
  exports:[ConfigurationService]
})
export class ConfigurationsModule {}
