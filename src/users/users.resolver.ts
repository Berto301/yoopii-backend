import { Args, Mutation, Query, Resolver, Context } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateAgentInput, CreateUserInput, LoginResult, LoginResultEnterprise, UpdatePasswordInput, UpdateUsersInput, User } from './dto/users-inputs.dto';

import { UserInputError } from 'apollo-server-core';
import { UserDocument, UsersModel } from './schema/user.schema';
import { CreateEnterpiseDto } from 'src/enterprise/dto/enterprise.dto';
import { CurrentUser } from 'src/decorators/get-user-id.decorator';

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

  @Mutation(() => User)
  async createAgent(
    @Args('createAgent') createAgentInput: CreateAgentInput,
  ): Promise<User> {
    let createdUser: User | undefined;
    try {
     
      createdUser = await this.usersService.createAgent(createAgentInput);
    } catch (error) {
      throw new UserInputError(error.message);
    }
    return createdUser;
  }

  @Query(() => [UsersModel])
  async getAgents(
    @Args('id') id: string
  ): Promise<UsersModel[]> {
    return this.usersService.getAgents(id);
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
  async getUser(
    @Args('userId') userId: string
  ): Promise<UserDocument> {
    return this.usersService.findById(userId);
  }

  @Query(() => UsersModel)
  async getAuthInfo(
    @Args('id') id: string
  ): Promise<UserDocument> {
    return this.usersService.findById(id);
  }

  @Mutation(() => User)
  async delete(
    @Args('id') id: string
  ): Promise<User> {
    return this.usersService.delete(id);
  }

  @Mutation(()=>User) 
  async updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUsersInput
  ) : Promise<User> {
    return this.usersService.update(updateUserInput);
  }
 
  @Mutation(()=>User) 
  async updatePassword(
    @Args('updatePasswordInput') updatePasswordInput: UpdatePasswordInput
  ) : Promise<User> {
    return this.usersService.updatePassword(updatePasswordInput);
  }
  // @Query(() => UsersModel)
  // @UseGuards(JwtAuthGuard)
  // async getUserInfo(
  //   @CurrentUser() user: User,
  // ): Promise<UserDocument> {
  //   return this.usersService.authfindById(user);
  // }
}
