import { Category } from "src/category/entities/category.entity";
import { Column, CreateDateColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export class Product {
    @PrimaryGeneratedColumn('uuid')
    productId: string;

    @Column()
    productName: string

    @ManyToOne(() => Category)
    category: Category;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

}
