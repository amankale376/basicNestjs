import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User{
    @PrimaryGeneratedColumn("increment")
    id:number;

    @Column()
    name:string;
    
    @Column()
    username:string;

    @Column()
    email:string;

    @Column()
    password:string;

    @Column()
    employeeID:string;
}