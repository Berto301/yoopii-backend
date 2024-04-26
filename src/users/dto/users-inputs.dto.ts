
import { InputType, Field, ObjectType, ArgsType } from "@nestjs/graphql";
import { UsersModel } from "../schema/user.schema";
import { Enterprise } from "../../enterprise/schema/enterprise.schema";
// import {
//   AccountSettings,
//   Licence,
//   PersonnalInfo,
// } from "../schema/sub-Object.schema";
// import {
//   AccountSettingsInput,
//   AuthentificationInput,
//   LicenceInput,
//   PersonnalInfoInput,
// } from "../schema/input-sub-Object.schema";
import { Prop } from "@nestjs/mongoose";
import { IsArray, IsBoolean, IsEmail, IsString, Matches, MaxLength, MinLength, ValidateNested,IsDate,IsAlpha,IsNotEmpty} from "class-validator";


@InputType()
export class CreateUserInput {
  @IsBoolean()
  @Field(() => Boolean)
  enabled: boolean;
  // @Field(() => PersonnalInfoInput)
  // @Type(() => PersonnalInfoInput)
  // @ValidateNested()
  // personnalInfo: PersonnalInfoInput;
  @IsString()
  @IsAlpha()
  @IsNotEmpty({
    always:true,
    message:"Name is required"
  })
  @Field()
  name: string;
  @IsString()
  @Field()
  firstname: string;
  @IsString()
  @Field()
  type: string;
  @IsString()
  @Field()
  profesionnalName: string;
  @IsString()
  @Field()
  gender: string;
  @IsString()
  @Field()
  adress : string;
  @IsDate()
  @Field(()=> Date)
  dateOfBirth : Date 

  @IsEmail()
  @Field(() => String)
  @Prop({
      required: true,
      unique: true,
      validate: { validator: (data)=> /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(data) },
  })
  email: string;
  
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @MaxLength(20, { message: 'Password cannot exceed 20 characters' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
    { message: 'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character' })
  @Field(() => String)
  @Prop({ required: true })
  password: string;
  
  @IsArray()
  @Field(() => [String])
  permissions: string[];

  // @Field(() => LicenceInput)
  // licence: LicenceInput;
  @IsString()
  @Field()
  NIF_STAT: string;
  @IsString()
  @Field()
  deliveryPlace: string;
  @IsDate()
  @Field(()=> Date)
  deliveryDate : Date  

  @IsString()
  @Field()
  phone: string;

  @IsString()
  @Field()
  CIN: string;

  // @Field(() => AccountSettingsInput)
  // accountSettings: AccountSettingsInput;
  @IsString()
  @Field()
  @Prop({
    type:String,
    default:"en"
  })
  language: string;
  @IsString()
  @Field()
  facebookSynchronisation: string;
  @IsString()
  @Field()
  googleSynchronisation : string  
}

@InputType()
export class UpdateUsersInput {
  @IsString()
  @Field()
  _id: string;

  @IsBoolean()
  @Field(() => Boolean)
  enabled: boolean;

  @IsString()
  @IsAlpha()
  @IsNotEmpty({
    always: true,
    message: "Name is required"
  })
  @Field()
  name: string;

  @IsString()
  @Field()
  firstname: string;

  @IsString()
  @Field()
  type: string;

  @IsString()
  @Field()
  profesionnalName: string;

  @IsString()
  @Field()
  gender: string;

  @IsString()
  @Field()
  adress: string;

  @IsDate()
  @Field(() => Date)
  dateOfBirth: Date;

  @IsEmail()
  @Field(() => String)
  email: string;

  @IsString()
  @Field()
  NIF_STAT: string;

  @IsString()
  @Field()
  deliveryPlace: string;

  @IsDate()
  @Field(() => Date)
  deliveryDate: Date;

  @IsString()
  @Field()
  language: string;

  @IsString()
  @Field()
  facebookSynchronisation: string;

  @IsString()
  @Field()
  googleSynchronisation: string;

  @IsString()
  @Field()
  phone: string;

  @IsString()
  @Field()
  CIN: string;
}


@InputType()
export class LoginUserInput {
  @IsEmail()
  @Field(() => String)
  email: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @MaxLength(20, { message: 'Password cannot exceed 20 characters' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
    { message: 'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character' })
  @Field(() => String)
  password: string;
}

@InputType()
export class UpdatePasswordInput {
  @Field(() => String)
  _id: string;
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @MaxLength(20, { message: 'Password cannot exceed 20 characters' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
    { message: 'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character' })
  @Field(() => String)
  oldPassword: string;
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @MaxLength(20, { message: 'Password cannot exceed 20 characters' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
    { message: 'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character' })
  @Field(() => String)
  newPassword: string;
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @MaxLength(20, { message: 'Password cannot exceed 20 characters' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
    { message: 'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character' })
  @Field(() => String)
  confirmPassword: string;
}

@InputType()
export class UpdateUserInput {
  @Field(() => String)
  username?: string;
  @Field(() => String)
  email?: string;
  password?: UpdatePasswordInput;
  @Field(() => Boolean)
  enabled?: boolean;
}

@ObjectType()
export class LoginResult {
  @Field(() => UsersModel)
  user: UsersModel;
  @Field(() => String)
  token: string;
}

@ObjectType()
export class LoginResultEnterprise {
  @Field(() => UsersModel)
  user: UsersModel;
  // @Field(() => Enterprise)
  // enterprise:Enterprise;
  @Field(() => String)
  token: string;
}


@ObjectType()
export class SignOutResult {
  @Field(() => UsersModel)
  user: UsersModel;
  @Field(() => null)
  token: null;
}

@ObjectType()
export class User {
  @Field()
  _id: string;

  @Field(() => Boolean)
  enabled: boolean;

  // @Field(() => PersonnalInfo)
  // personnalInfo: PersonnalInfo;
  @Field()
  name: string;

  @Field()
  firstname: string;
  @Field()
  type: string;

  @Field()
  profesionnalName: string;
 
  @Field()
  gender: string;

  @Field()
  phone: string;

  @Field()
  CIN: string;

  @Field()
  adress : string;

  @Field(()=> Date)
  dateOfBirth : Date  
  // @Field(()=> Date)
  // birthOfDate : Date

  // @Field(() => Authentification)
  // authentification: Authentification;

  @Field(() => [String])
  permissions: string[];

  // @Field(() => Licence)
  // licence: Licence;
  @Field()
  NIF_STAT: string;

  @Field()
  deliveryPlace: string;

  @Field(()=> Date)
  deliveryDate : Date  

  // @Field(() => AccountSettings)
  // accountSettings: AccountSettings;
  @Field()
  @Prop({
    type:String,
    default:"en"
  })
  language: string;

  @Field()
  facebookSynchronisation: string;

  @Field()
  googleSynchronisation : string  

  @Field(() => String)
  email: string;

  @Field()
  password: string;
  
  // @Field(() => Enterprise, { nullable: true })
  // enterprise: Enterprise | null;
}
