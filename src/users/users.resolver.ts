import { Args, Mutation, Query, Resolver, Context } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateUserInput, LoginResult, LoginResultEnterprise } from './dto/users-inputs.dto';

import { UserInputError } from 'apollo-server-core';
import { UserDocument, UsersModel } from './schema/user.schema';
import { CreateEnterpiseDto } from 'src/enterprise/dto/enterprise.dto';

@Resolver(() => UsersModel)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Mutation(() => LoginResult)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<LoginResult> {
    let createdUser: LoginResult | undefined;
    try {
     
      createdUser = await this.usersService.create(createUserInput);
    } catch (error) {
      throw new UserInputError(error.message);
    }
    return createdUser;
  }

  @Mutation(() => LoginResultEnterprise)
  async createUserAndEnterprise(
    @Args('createUserInput') createUserInput: CreateUserInput, @Args('createEnterpiseInput') createEnterpiseInput:CreateEnterpiseDto
  ): Promise<LoginResult> {
    let createdUser: LoginResult | undefined;
    try {
     
      createdUser = await this.usersService.createUserAndEnterprise(createUserInput,createEnterpiseInput);
    } catch (error) {
      throw new UserInputError(error.message);
    }
    return createdUser;
  }

  @Query(() => UsersModel)
  // @UseGuards(JwtAuthGuard)
  async getUser(
    @Args('userId') userId: string
  ): Promise<UserDocument> {
    return this.usersService.findById(userId);
  }
}
