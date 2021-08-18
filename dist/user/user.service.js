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
const shortid = require("shortid");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
let UserService = class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async login(body) {
        try {
            const user = await this.userModel.findOne({ where: { username: body.username } });
            if (!user) {
                throw new common_1.NotFoundException('User not found!');
            }
            const isMatch = await bcrypt.compare(body.password, user.password);
            if (!isMatch) {
                throw new common_1.ForbiddenException('Authorization failed');
            }
            const token = this.generateToken(user.id);
            return {
                message: 'Login Success',
                token: token
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
                throw new common_1.ForbiddenException("username is not Available");
            }
            const newuser = new user_entity_1.User();
            newuser.name = body.name;
            newuser.username = body.username;
            newuser.email = body.email;
            newuser.password = body.password;
            newuser.employeeID = shortid.generate();
            const user = await this.userModel.save(newuser);
            return {
                username: user.username,
                email: user.email,
                message: 'New user created!'
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async deleteUser(Token) {
        const match = await this.getMatch(Token);
        if (match) {
            try {
                const deleteUser = await this.userModel.delete({ id: Token.id });
                if (deleteUser) {
                    return {
                        id: match.employeeID,
                        message: "user with this employeeID is deleted"
                    };
                }
            }
            catch (error) {
                throw new common_1.BadRequestException(error);
            }
        }
        else {
            throw new common_1.NotFoundException("user not found");
        }
    }
    async listUsers(Token, query) {
        const match = await this.getMatch(Token);
        if (match) {
            const page = query.page || 1;
            const limit = query.limit || 5;
            const skip = (page - 1) * limit;
            try {
                const users = await this.userModel.find({ select: ['name', 'username', 'email', 'employeeID'], order: { id: 'ASC' }, skip: skip, take: limit });
                if (users.length === 0) {
                    throw new common_1.NotFoundException("user not found");
                }
                else {
                    return users;
                }
            }
            catch (error) {
                throw new common_1.BadRequestException(error);
            }
        }
    }
    async getUser(Token) {
        const match = await this.getMatch(Token);
        if (match) {
            try {
                const user = await this.userModel.findOne({ where: { id: Token.id }, select: ['name', 'username', 'email', 'employeeID'] });
                if (user) {
                    return {
                        user: user
                    };
                }
            }
            catch (error) {
                throw new common_1.BadRequestException(error);
            }
        }
        else {
            throw new common_1.UnauthorizedException("Authentication Failed");
        }
    }
    async getMatch(Token) {
        try {
            const match = await this.userModel.findOne({ where: { id: Token.id } });
            return match;
        }
        catch (error) {
        }
    }
    async checkDuplicate(body) {
        const match = await this.userModel.findOne({ where: { username: body.username } });
        return match;
    }
    generateToken(id) {
        return jwt.sign({ id: id }, process.env.SECRET, { expiresIn: "1hr" });
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject('USER_REPOSITORY')),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map