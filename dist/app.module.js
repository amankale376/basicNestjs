"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
require('dotenv').config();
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const auth_middleware_1 = require("./common/middleware/auth.middleware");
const user_module_1 = require("./user/user.module");
const path_1 = require("path");
const web_socket_module_1 = require("./web-socket/web-socket.module");
console.log(path_1.join(__dirname, '**', '*.entity{.ts,.js}'));
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(auth_middleware_1.Auth)
            .forRoutes({ path: '/signup', method: common_1.RequestMethod.POST });
    }
};
AppModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: 'localhost',
                port: 3306,
                username: 'root',
                password: 'password',
                database: 'nestjsusers',
                synchronize: true,
                entities: [path_1.join(__dirname, '**', '*.entity{.ts,.js}')]
            }),
            user_module_1.UserModule, web_socket_module_1.WebSocketModule],
        controllers: [],
        providers: [],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map