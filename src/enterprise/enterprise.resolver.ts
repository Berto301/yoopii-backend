import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { EnterpriseService } from './enterprise.service';
import { Enterprise,EnterpriseDocument } from './schema/enterprise.schema';
import { UseGuards } from '@nestjs/common';
import { CreatedEnterpriseDto, CreateEnterpiseDto } from './dto/enterprise.dto';
import { CurrentUser } from 'src/decorators/get-user-id.decorator';
import { UsersModel } from 'src/users/schema/user.schema';

@Resolver()
export class EnterpriseResolver {
  constructor(private readonly enterpriseService: EnterpriseService) {}

  // @UseGuards(JwtAuthGuard)
  @Mutation(() => CreatedEnterpriseDto)
  createEnterprise(
    @Args('createEnterprise') createEnterprise: CreateEnterpiseDto
    // @CurrentUser() user: UsersModel,
  ) {
    return this.enterpriseService.create(createEnterprise);
  }

  // @UseGuards(JwtAuthGuard)
  // @Query(() => [Enterprise])
  // getAllOrders(): Promise<Enterprise[]> {
  //   return this.enterpriseService.findAll();
  // }

  @Query(() => Enterprise)
  // @UseGuards(JwtAuthGuard)
  async getEnterpriseByUser(
    @Args('userId') userId: string
  ): Promise<Enterprise> {
    return this.enterpriseService.findByUser(userId);
  }

  @Query(() => Enterprise)
  async getEnterpriseInfo(
    @Args('id') id: string
  ): Promise<Enterprise> {
    return this.enterpriseService.findById(id);
  }
}
