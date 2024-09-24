import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Owner } from './schemas/owner.schema';
import { Model } from 'mongoose';

@Injectable()
export class OwnerService {
    constructor(@InjectModel(Owner.name) private ownerModel : Model<Owner>) {}

    async findAll(): Promise<Owner[]> {
        return this.ownerModel.find().exec();
    }

    async create(owner: { name: string; age: number }): Promise<Owner> {
        const createdOwner = new this.ownerModel(owner);
        return createdOwner.save();
    }
}
