import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { AuthModule } from '../auth/auth.module';
import { UsersModel, UsersSchema } from './schema/user.schema';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { EnterpriseModule } from '../enterprise/enterprise.module';
import { ConfigurationsModule } from 'src/configuration/configuration.module';
import { ConfigurationService } from 'src/configuration/configuration.service';
import {UsersGateway} from './users.gateway'

@Module({
  imports: [
    ConfigModule,
    forwardRef(() => AuthModule),
    EnterpriseModule,
    ConfigurationsModule,
    MongooseModule.forFeature([{ name: UsersModel.name, schema: UsersSchema }])
  ],
  providers: [UsersResolver, UsersService,UsersGateway],
  exports: [UsersService],
})
export class UsersModule {}
