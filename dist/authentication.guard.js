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
exports.AuthenticationGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_model_1 = require("./user/user.model");
let AuthenticationGuard = class AuthenticationGuard {
    constructor(userModel) {
        this.userModel = userModel;
    }
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const token = request.header('Authorization').replace('Bearer', '');
        const decoded = jwt.verify(token, 'this_is_secret');
        const id = mongoose.Types.ObjectId(decoded._id);
        const isValidate = async (id, token) => {
            try {
                const user = await this.userModel.findOne({ _id: id, token: token });
                if (!user) {
                    throw new common_1.HttpException("No user found", 404);
                }
                return true;
            }
            catch (error) {
                throw new common_1.HttpException(error, 400);
            }
        };
        return isValidate(id, token);
    }
};
AuthenticationGuard = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(user_model_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], AuthenticationGuard);
exports.AuthenticationGuard = AuthenticationGuard;
//# sourceMappingURL=authentication.guard.js.map