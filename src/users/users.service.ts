import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UsersModel, UserDocument as UserDocument } from './schema/user.schema';
import { AuthService } from '../auth/auth.service';
import { CreateUserInput, LoginResult, LoginResultEnterprise, UpdatePasswordInput, UpdateUsersInput, User } from './dto/users-inputs.dto';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
import { CreateEnterpiseDto } from 'src/enterprise/dto/enterprise.dto';
import { Enterprise, EnterpriseDocument } from 'src/enterprise/schema/enterprise.schema';
import { EnterpriseService } from 'src/enterprise/enterprise.service';
import { ConfigurationService } from 'src/configuration/configuration.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly config: ConfigService,
    @InjectModel(UsersModel.name) private userModel: Model<UserDocument>,
    private readonly enterpriseService: EnterpriseService,
    private readonly configurationService: ConfigurationService,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
  ) {}

  /**
   * Creates a user
   *
   * @param {CreateUserInput} createUserInput username, email, and password. Username and email must be
   * unique, will throw an email with a description if either are duplicates
   * @returns {Promise<UserDocument>} or throws an error
   * @memberof UsersService
   */
  async create(createUserInput: CreateUserInput): Promise<LoginResult> {
    const createdUser = new this.userModel(createUserInput);
    // console.log({createdUser, createUserInput})
    const token = await this.authService.createJwt(createdUser);
    let user: UserDocument | undefined;
    try {
      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(createdUser.password, salt);
      createdUser.password = passwordHash
      createdUser.enterprise = null
      await this.createConfigBase(createdUser)
      user = await createdUser.save();
      //creation configuration
    } catch (error) {
      throw new BadRequestException(error);
    }
    return { user, token: token.token };
  }

   async createConfigBase(user){
    if(user._id){
       const created = await this.configurationService.create({
        "userId":user._id,
        "format" : "DD/MM/YYYY",
        "timezone" : "UTC",
        "taux" : 0,
        "devise" : "MGA",
       })
       return created
    }else{
      throw new BadRequestException('User not found');
    }
  }

  async createUserAndEnterprise(createUserInput: CreateUserInput,createEnterpiseInput:CreateEnterpiseDto): Promise<LoginResultEnterprise> {
    const createdEnterprise = await this.enterpriseService.create(createEnterpiseInput);
    if(createdEnterprise?._id){
      const createdUser = await new this.userModel(createUserInput);
      // console.log({createdUser, createUserInput})
      const token = await this.authService.createJwt(createdUser);
      let user: UserDocument | undefined;
      //let enterprise: EnterpriseDocument | undefined
      try {
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(createdUser.password, salt);
        createdUser.password = passwordHash
        createdUser.enterprise =  createdEnterprise 
        await this.createConfigBase(createdUser)
        user = await createdUser.save();
      } catch (error) {
        throw new BadRequestException(error);
      }
      return { user, token: token.token };
    }
    
  }
  // ---------------------------------------------------------
  /**
   * Returns a user by their unique email address or undefined
   *
   * @param {string} email address of user, not case sensitive
   * @returns {(Promise<UserDocument | undefined>)}
   * @memberof UsersService
   */
  async findOneByEmail(email: string): Promise<UserDocument | undefined> {
    const user = await this.userModel
      .findOne({ email: email.toLowerCase() })
      .exec();
    if (user) return user;
    return undefined;
  }
  async updatePassword(updatePasswordInput: UpdatePasswordInput): Promise<UserDocument | undefined>{
    const user = await this.userModel
      .findOne({ _id: updatePasswordInput._id })
      .exec();
   let userUpdated: UserDocument | undefined;
    if (user._id){
      if(!(updatePasswordInput.newPassword === updatePasswordInput.confirmPassword))  throw new BadRequestException("Passwords must be the same");
      const isPasswordValid = bcrypt.compareSync(
        updatePasswordInput.oldPassword,
        user.password
      );
      
      if(isPasswordValid){
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(updatePasswordInput.newPassword, salt);
        user.password = passwordHash
        userUpdated = await user.save()
        return userUpdated
      }{
        throw new BadRequestException("Password invalid");
      }
    }
    return undefined;
  }

  async update(updateUserInput: UpdateUsersInput): Promise<User | undefined> {
    try {
        const user = await this.userModel.findOneAndUpdate(
            { _id: updateUserInput._id },
            updateUserInput,
            { new: true }
        );

        if (user?._id) {
            return user;
        } else {
            throw new Error('User not found');
        }
    } catch (error) {
        console.error('Error updating user:', error);
        return undefined;
    }
  }
  async findById(id: string): Promise<UserDocument | undefined> {
    const user = await this.userModel
      .findOne({ _id: id })
      .exec();
    if (user) return user;
    return undefined;
  }

  async authfindById(user): Promise<UserDocument | undefined> {
    const userModel = await this.userModel
      .findOne({ _id: user._id })
      .exec();
    if (userModel) return userModel;
    return undefined;
  }
  
  // ----------------------------------------------------------
  /**
   * Deletes all the users in the database, used for testing
   *
   * @returns {Promise<void>}
   * @memberof UsersService
   */
  async deleteAllUsers(): Promise<void> {
    await this.userModel.deleteMany({});
  }
}
