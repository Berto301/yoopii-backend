import { InputType, Field, ObjectType } from "@nestjs/graphql";
import { UsersModel } from "../schema/user.schema";
import {
  AccountSettings,
  Licence,
  PersonnalInfo,
} from "../schema/sub-Object.schema";
import {
  AccountSettingsInput,
  AuthentificationInput,
  LicenceInput,
  PersonnalInfoInput,
} from "../schema/input-sub-Object.schema";
import { Prop } from "@nestjs/mongoose";
import { IsEmail, IsString, Matches, MaxLength, MinLength} from "class-validator";
@InputType()
export class CreateUserInput {
  @Field(() => Boolean)
  enabled: boolean;

  @Field(() => PersonnalInfoInput)
  personnalInfo: PersonnalInfoInput;

  // @Field(() => AuthentificationInput)
  // authentification: AuthentificationInput;
  @Field(() => String)
  @Prop({
      required: true,
      unique: true,
      validate: { validator: (data)=> /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(data) },
  })
  email: string;
  
  @Field(() => String)
  @Prop({ required: true })
  password: string;

  @Field(() => [String])
  permissions: string[];

  @Field(() => LicenceInput)
  licence: LicenceInput;

  @Field(() => AccountSettingsInput)
  accountSettings: AccountSettingsInput;
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
  oldPassword: string;
  @Field(() => String)
  newPassword: string;
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

  @Field(() => PersonnalInfo)
  personnalInfo: PersonnalInfo;

  // @Field(() => Authentification)
  // authentification: Authentification;

  @Field(() => [String])
  permissions: string[];

  @Field(() => Licence)
  licence: Licence;

  @Field(() => AccountSettings)
  accountSettings: AccountSettings;

  @Field(() => String)
  email: string;

  @Field()
  password: string;
}
