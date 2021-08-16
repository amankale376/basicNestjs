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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const login_dto_1 = require("./dto/login.dto");
const signup_dto_1 = require("./dto/signup.dto");
const token_decorator_1 = require("./token.decorator");
const user_service_1 = require("./user.service");
const query_dto_1 = require("./dto/query.dto");
const swagger_1 = require("@nestjs/swagger");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    login(user) {
        return this.userService.login(user);
    }
    signup(user) {
        return this.userService.signup(user);
    }
    deleteUser(token) {
        return this.userService.deleteUser(token);
    }
    listUsers(token, query) {
        return this.userService.listUsers(token, query);
    }
    getUser(token) {
        return this.userService.getUser(token);
    }
};
__decorate([
    swagger_1.ApiOkResponse({ description: 'User Login' }),
    swagger_1.ApiUnauthorizedResponse({ description: 'Invalid Credentials' }),
    swagger_1.ApiBody({ type: login_dto_1.LoginDto }),
    common_1.Post('login'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto]),
    __metadata("design:returntype", Object)
], UserController.prototype, "login", null);
__decorate([
    swagger_1.ApiBody({ type: signup_dto_1.SignupDto }),
    swagger_1.ApiCreatedResponse({ description: 'User registeration' }),
    common_1.Post('signup'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signup_dto_1.SignupDto]),
    __metadata("design:returntype", Object)
], UserController.prototype, "signup", null);
__decorate([
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiOkResponse({ description: 'User deletion' }),
    common_1.Delete('deleteUser'),
    __param(0, token_decorator_1.Token()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], UserController.prototype, "deleteUser", null);
__decorate([
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiOkResponse({ description: 'Listing Users' }),
    common_1.Get('users'),
    __param(0, token_decorator_1.Token()),
    __param(1, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, query_dto_1.QueryDto]),
    __metadata("design:returntype", Object)
], UserController.prototype, "listUsers", null);
__decorate([
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiOkResponse({ description: 'User information' }),
    common_1.Get('user'),
    __param(0, token_decorator_1.Token()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], UserController.prototype, "getUser", null);
UserController = __decorate([
    common_1.Controller('/'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map