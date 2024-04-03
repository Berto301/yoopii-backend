import { Field, InputType  } from "@nestjs/graphql";
import { Prop } from "@nestjs/mongoose";
import { IsAlpha, IsDate, IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";


@InputType()
export class PersonnalInfoInput {
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
}

@InputType()
export class AuthentificationInput {
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
}

@InputType()
export class LicenceInput {
  @IsString()
  @Field()
  NIF_STAT: string;
  @IsString()
  @Field()
  deliveryPlace: string;
  @IsDate()
  @Field(()=> Date)
  deliveryDate : Date  
}

@InputType()
export class AccountSettingsInput {
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

