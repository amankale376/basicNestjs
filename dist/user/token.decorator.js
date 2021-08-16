"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Token = void 0;
require('dotenv').config();
const common_1 = require("@nestjs/common");
const jwt = require("jsonwebtoken");
exports.Token = common_1.createParamDecorator((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const token = request.header('Authorization');
    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        return request.token = decoded;
    }
    catch (error) {
        throw new common_1.BadRequestException(error);
    }
});
//# sourceMappingURL=token.decorator.js.map