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
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_model_1 = require("./user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const shortid = require("shortid");
let UserService = class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async login(body) {
        try {
            const user = await this.userModel.findOne({ username: body.username });
            if (!user) {
                throw new common_1.NotFoundException('User not found!');
            }
            const isMatch = await bcrypt.compare(body.password, user.password);
            if (!isMatch) {
                throw new common_1.ForbiddenException('Authorization failed');
            }
            const token = this.generateToken(user._id);
            await user.save();
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
            const newUser = new this.userModel({
                name: body.name,
                username: body.username,
                email: body.email,
                password: body.password,
                employeeID: shortid.generate()
            });
            const user = await newUser.save();
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
                const deleteUser = await this.userModel.deleteOne({ _id: Token._id });
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
                const users = await this.userModel.find({}, ' name , username , email , employeeID , -_id ').skip(skip).limit(limit);
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
                const user = await this.userModel.findOne({ _id: Token._id }, ' name , username , email , employeeID, -_id ');
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
            const match = await this.userModel.findOne({ _id: Token._id });
            return match;
        }
        catch (error) {
        }
    }
    async checkDuplicate(body) {
        const match = await this.userModel.findOne({ username: body.username });
        return match;
    }
    generateToken(_id) {
        return jwt.sign({ _id: _id }, process.env.SECRET, { expiresIn: "1hr" });
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(user_model_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map