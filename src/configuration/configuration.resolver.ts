import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ConfigurationService } from './configuration.service';
import { Configuration } from './schema/configuration.schema';
import { UseGuards } from '@nestjs/common';
import { CreatedConfigurationDto, CreateConfigurationDto, updateConfigurationDto } from './dto/configuration.dto';
import { CurrentUser } from 'src/decorators/get-user-id.decorator';
import { UsersModel } from 'src/users/schema/user.schema';

@Resolver()
export class ConfigurationResolver {
  constructor(private readonly configService: ConfigurationService) {}

  // @UseGuards(JwtAuthGuard)
  @Mutation(() => CreatedConfigurationDto)
  createConfiguration(
    @Args('createConfiguration') createConfiguration: CreateConfigurationDto,
    // @CurrentUser() user: UsersModel,
  ) {
    return this.configService.create(createConfiguration);
  }

  @Mutation(() => CreatedConfigurationDto)
  updateConfiguration(
    @Args('updateConfiguration') updateConfiguration: updateConfigurationDto,
    // @CurrentUser() user: UsersModel,
  ) {
    return this.configService.update(updateConfiguration);
  }

  @Query(() => CreatedConfigurationDto)
  async getConfigById(
    @Args('id') id: string
  ){
    console.log({id})
    return this.configService.findById(id);
  }

  // @UseGuards(JwtAuthGuard)
  // @Query(() => [Configuration])
  // getAllOrders(): Promise<Configuration[]> {
  //   return this.orderService.findAll();
  // }
}
