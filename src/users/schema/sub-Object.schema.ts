import { Field, ObjectType } from "@nestjs/graphql";
import { Prop } from "@nestjs/mongoose";


@ObjectType()
export class PersonnalInfo {
  @Field()
  name: string;

  @Field()
  firstname: string;

  @Field()
  profesionnalName: string;
 
  @Field()
  gender: string;

  @Field()
  adress : string;

  @Field(()=> Date)
  dateOfBirth : Date  
}

// @ObjectType()
// export class Authentification {
//     @Field(() => String)
//     @Prop({
//         required: true,
//         unique: true,
//         validate: { validator: (data)=> /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(data) },
//     })
//     email: string;

//     @Prop({ required: true })
//     password: string;
// }

@ObjectType()
export class Licence {
  @Field()
  NIF_STAT: string;

  @Field()
  deliveryPlace: string;

  @Field(()=> Date)
  deleiveryDate : Date  
}

@ObjectType()
export class AccountSettings {
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
}

