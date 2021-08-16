require('dotenv').config()
import { BadRequestException, ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { User, UserDocument } from './user.model';
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import * as shortid from 'shortid'

@Injectable()
export class UserService {
   constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async login(body:LoginDto){
        try {
            const user = await this.userModel.findOne({username:body.username})
            if(!user){
                throw new NotFoundException('User not found!')
            }
            const isMatch = await bcrypt.compare(body.password,user.password)
            if(!isMatch){
                throw new ForbiddenException('Authorization failed')
            }
           const token = this.generateToken(user._id)

            await user.save()
            return {
                message:'Login Success',
                token:token
            }

        } catch (error) {
            throw new BadRequestException(error)
        }
   }

   async signup(body:SignupDto){
    try {
        const check = await this.checkDuplicate(body)
        if(check){
            throw new ForbiddenException("username is not Available")
        }
        const newUser = new this.userModel({
            name:body.name,
            username:body.username,
            email:body.email,
            password:body.password,
            employeeID:shortid.generate()

        })
        const user = await newUser.save()
        return {
            username:user.username,
            email:user.email,
            message:'New user created!'
        }
    } catch (error) {
        throw new BadRequestException(error)
    }
        }

    async deleteUser(Token){
            const match = await this.getMatch(Token)
            if(match){
                try {
                    const deleteUser =  await this.userModel.deleteOne({_id:Token._id})
                    if(deleteUser){
                        return {
                            id:match.employeeID,
                            message:"user with this employeeID is deleted"
                        }
                    }
                } catch (error) {
                    throw new BadRequestException(error)
                }
            }else{
                throw new NotFoundException("user not found")
            }

        }
        
        async listUsers(Token , query){
            const match = await this.getMatch(Token)
            if(match){
                const page = parseInt(query.page) || 1
                const limit = parseInt(query.limit) || 5
                const skip = (page-1)*limit
                try {
                    const users = await this.userModel.find({}, ' name , username , email , employeeID , -_id ').skip(skip).limit(limit)
                    if(users.length === 0 ){
                        throw new NotFoundException("user not found")
                    
                    }else{
                        return users
                    }
                } catch (error) {
                    throw new BadRequestException(error)
                }
                    
            }
        }

        async getUser(Token){
            const match = await this.getMatch(Token)
            if(match){
                try {
                    const user = await this.userModel.findOne({_id:Token._id}, ' name , username , email , employeeID, -_id ')    
                    if(user){
                        return {
                            user:user
                        }
                    }
                } catch (error) {
                    throw new BadRequestException(error)
                }
                
            }else{
                throw new UnauthorizedException("Authentication Failed")
            }
        }

        private async getMatch(Token){
              try {
                const match = await this.userModel.findOne({_id:Token._id})
                return match  
              } catch (error) {
                 
              }  
        }

        private async checkDuplicate(body){
            const match = await this.userModel.findOne({username:body.username}) 
            return match
        }

        private generateToken(_id:any){
        return jwt.sign({_id:_id},process.env.SECRET, {expiresIn:"1hr"})
        }
}
