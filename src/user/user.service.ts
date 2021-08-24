require('dotenv').config()
import { BadRequestException, ForbiddenException, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
// import { User, UserDocument } from './user.model';
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import { Repository } from 'typeorm';
import { User, Sockets } from './user.entity';
import { WebSocketsGateway } from 'src/web-socket/web-socket.gateway';
import {InjectRepository} from '@nestjs/typeorm'
@Injectable()
export class UserService {
    
//    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Sockets)
     private socketsRepository: Repository<Sockets>,
    private readonly webSocketGateway: WebSocketsGateway
  ) {}

    
    async login(body:LoginDto){
        try {
            const user = await this.userRepository.findOne({where:{username:body.username}})
            if(!user){
                throw new NotFoundException('User not found!')
            }
            const isMatch = await bcrypt.compare(body.password,user.password)
            if(!isMatch){
                throw new ForbiddenException('Authorization failed')
            }
           const token = this.generateToken(user.id)

           await this.userRepository.save(user)
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
        const newuser = new User()
        newuser.name = body.name
        newuser.username = body.username
        newuser.email = body.email
        newuser.password = body.password
       
        const user = await this.userRepository.save(newuser)
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
                    const deleteUser =  await this.userRepository.delete({id:Token.id})
                    if(deleteUser){
                        return {
                            id:match.id,
                            message:"user with this id is deleted"
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
                const page = query.page || 1
                const limit = query.limit || 5
                const skip = (page-1)*limit
                try {
                    const users = await this.userRepository.find({select:['name' , 'username' , 'email'] ,order:{ id:'ASC'}, skip:skip , take:limit})
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
                    const user = await this.userRepository.findOne({where:{id:Token.id}, select:['name' , 'username' , 'email']})    
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

        async getUserById(Token, id){
            const match = await this.getMatch(Token)
            if(match){
                try {
                    const user = await this.socketsRepository.findOne({where:{userId:id}})
                    if(user.ClientId){
                        this.webSocketGateway.wss.emit('message', match.name+" view your details")
                        
                    }
                    return {
                        message:'View Your details'
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
                const match = await this.userRepository.findOne({where:{id:Token.id}})
                return match  
              } catch (error) {
                 
              }  
        }

        private async checkDuplicate(body){
            const match = await this.userRepository.findOne({where:{username:body.username}}) 
            return match
        }

        private generateToken(id:any){
        return jwt.sign({id:id},process.env.SECRET, {expiresIn:"1hr"})
        }
}
