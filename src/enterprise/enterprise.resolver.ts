import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { EnterpriseService } from './enterprise.service';
import { Enterprise } from './schema/enterprise.schema';
import { UseGuards } from '@nestjs/common';
import { CreatedEnterpriseDto, CreateEnterpiseDto } from './dto/enterprise.dto';
import { CurrentUser } from 'src/decorators/get-user-id.decorator';
import { UsersModel } from 'src/users/schema/user.schema';

@Resolver()
export class EnterpriseResolver {
  constructor(private readonly orderService: EnterpriseService) {}

  // @UseGuards(JwtAuthGuard)
  @Mutation(() => CreatedEnterpriseDto)
  createEnterprise(
    @Args('createEnterprise') createEnterprise: CreateEnterpiseDto
    // @CurrentUser() user: UsersModel,
  ) {
    return this.orderService.create(createEnterprise);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [Enterprise])
  getAllOrders(): Promise<Enterprise[]> {
    return this.orderService.findAll();
  }
}
