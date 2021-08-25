"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
require('dotenv').config();
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const web_socket_gateway_1 = require("../web-socket/web-socket.gateway");
const typeorm_2 = require("@nestjs/typeorm");
let UserService = class UserService {
    constructor(userRepository, socketsRepository, webSocketGateway) {
        this.userRepository = userRepository;
        this.socketsRepository = socketsRepository;
        this.webSocketGateway = webSocketGateway;
    }
    async login(body) {
        try {
            const user = await this.userRepository.findOne({
                where: { username: body.username },
            });
            if (!user) {
                throw new common_1.NotFoundException('User not found!');
            }
            const isMatch = await bcrypt.compare(body.password, user.password);
            if (!isMatch) {
                throw new common_1.ForbiddenException('Authorization failed');
            }
            const token = this.generateToken(user.id);
            await this.userRepository.save(user);
            return {
                message: 'Login Success',
                token: token,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async signup(body) {
        try {
            const check = await this.checkDuplicate(body);
            if (check) {
                throw new common_1.ForbiddenException('username is not Available');
            }
            const newuser = new user_entity_1.User();
            newuser.name = body.name;
            newuser.username = body.username;
            newuser.email = body.email;
            newuser.password = body.password;
            const user = await this.userRepository.save(newuser);
            return {
                username: user.username,
                email: user.email,
                message: 'New user created!',
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async deleteUser(Token) {
        const match = await this.getMatch(Token);
        try {
            const deleteUser = await this.userRepository.delete({ id: Token.id });
            if (deleteUser) {
                return {
                    message: 'user with ' + match.id + ' is deleted',
                };
            }
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async listUsers(Token, query) {
        await this.getMatch(Token);
        const page = query.page || 1;
        const limit = query.limit || 5;
        const skip = (page - 1) * limit;
        try {
            const users = await this.userRepository.find({
                select: ['name', 'username', 'email'],
                order: { id: 'ASC' },
                skip: skip,
                take: limit,
            });
            if (users.length === 0) {
                throw new common_1.NotFoundException('user not found');
            }
            else {
                return users;
            }
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async getUser(Token) {
        await this.getMatch(Token);
        try {
            const user = await this.userRepository.findOne({
                where: { id: Token.id },
                select: ['name', 'username', 'email'],
            });
            if (user) {
                return user;
            }
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async getUserById(Token, id) {
        const match = await this.getMatch(Token);
        try {
            const user = await this.socketsRepository.findOne({
                where: { userId: id },
            });
            if (user.ClientId) {
                this.webSocketGateway.wss.emit('message', match.name + ' view your details');
            }
            return {
                message: 'You viewed details',
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async getMatch(Token) {
        try {
            const match = await this.userRepository.findOne({
                where: { id: Token.id },
            });
            if (match) {
                return match;
            }
            throw new common_1.UnauthorizedException('Authentication Failed');
        }
        catch (error) { }
    }
    async checkDuplicate(body) {
        const match = await this.userRepository.findOne({
            where: { username: body.username },
        });
        return match;
    }
    generateToken(id) {
        return jwt.sign({ id: id }, process.env.SECRET, { expiresIn: '1hr' });
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_2.InjectRepository(user_entity_1.User)),
    __param(1, typeorm_2.InjectRepository(user_entity_1.Sockets)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        web_socket_gateway_1.WebSocketsGateway])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map