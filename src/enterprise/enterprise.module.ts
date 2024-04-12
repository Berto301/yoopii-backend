import { Module } from '@nestjs/common';
import { EnterpriseService } from './enterprise.service';
import { EnterpriseResolver } from './enterprise.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Enterprise, EnterpriseSchema } from './schema/enterprise.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Enterprise.name, schema: EnterpriseSchema }]),
  ],
  providers: [EnterpriseService, EnterpriseResolver],
  exports:[EnterpriseService]
})
export class EnterpriseModule {}
