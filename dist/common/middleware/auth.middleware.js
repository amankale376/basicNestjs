"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
let Auth = class Auth {
    async use(req, res, next) {
        try {
            const user = req.body;
            const password = req.body.password;
            const hashedPassword = await bcrypt.hash(password, 8);
            user.password = hashedPassword;
            req.body = user;
            next();
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
};
Auth = __decorate([
    common_1.Injectable()
], Auth);
exports.Auth = Auth;
//# sourceMappingURL=auth.middleware.js.map