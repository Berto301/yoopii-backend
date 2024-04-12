import { Injectable } from '@nestjs/common';
// import { Resolver } from '@nestjs/graphql';
import { InjectModel } from '@nestjs/mongoose';
import { Enterprise, EnterpriseDocument } from './schema/enterprise.schema';
import { Model } from 'mongoose';
import { CreateEnterpiseDto } from './dto/enterprise.dto';
// import { CurrentUser } from 'src/decorators/get-user-id.decorator';
// import { UsersModel } from 'src/users/schema/user.schema';

@Injectable()
export class EnterpriseService {
  constructor(
    @InjectModel(Enterprise.name) private enterpriseModel: Model<EnterpriseDocument>,
  ) {}
  async create(createOrderDto: CreateEnterpiseDto): Promise<Enterprise> {
    const created = new this.enterpriseModel({
      ...createOrderDto,
      // owner: user._id,
    });
    console.log(created);
    return created.save();
  }

  async findAll(): Promise<Enterprise[]> {
    return this.enterpriseModel.find().exec();
  }
}
