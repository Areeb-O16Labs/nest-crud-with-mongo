// cats.service.ts
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Cat } from './schemas/cat.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CatsService {
    constructor(@InjectModel(Cat.name) private catModel : Model<Cat>) {}
    private readonly cats = [];

    async findAll(): Promise<Cat[]> {
        return this.catModel.find().populate('owner').exec();
        // return this.cats;
    }

    async create(cat: { id: number; name: string }): Promise<Cat> {
        if(cat.name == undefined) {
            return null;
        }
        // let generatedId = Math.round(Math.random() * 1000);
        // this.cats.push({...cat, id: generatedId});
        // return this.cats;

        let newCat = new this.catModel(cat);
        return newCat.save();
    }

    async findOne(id: number): Promise<Cat> {
        const findCat = this.catModel.findOne({ _id: id }).exec();
        // let findCat = this.cats.find(cat => cat.id == id);
        return findCat;
    }

    async update(id: number, cat: { id: number; name: string }): Promise<Cat> {
        // let findCat = this.cats.find(cat => cat.id == id);
        // if(findCat) {
        //     findCat.name = cat.name;
        //     return findCat;
        // }
        const findCat = this.catModel.findOneAndUpdate({ _id: id }, cat).exec();
        return findCat;
    }

    async delete(id: number): Promise<Cat> {
        // let findCat = this.cats.findIndex(cat => cat.id == id);
        // if(findCat != -1) {
        //     // this.cats.splice(findCat, 1);
        //     // return findCat;
        //     const deletedCat = this.catModel.findByIdAndDelete({ _id: id }).exec();
        //     return deletedCat;
        // }
        // return null;
        const deletedCat = this.catModel.findByIdAndDelete({ _id: id }).exec();
        return deletedCat;
    }
}