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
exports.UserGateway = void 0;
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const typeorm_1 = require("typeorm");
let UserGateway = class UserGateway {
    constructor(userModel) {
        this.userModel = userModel;
        this.logger = new common_1.Logger('AppGateway');
    }
    async handleDisconnect(client) {
        try {
            this.logger.log("Client Disconnected : " + client.id);
            const user = await this.userModel.findOne({ where: { status: client.id } });
            user.status = "offline";
            await this.userModel.save(user);
        }
        catch (error) {
        }
    }
    async handleConnection(client) {
        this.logger.log("Client Connection " + client.id);
        this.SocketID = client.id;
    }
    async handleId(client, id) {
        this.UserID = parseInt(id);
        const user = await this.userModel.findOne({ where: { id: id } });
        user.status = this.SocketID;
        const viewers = JSON.parse(user.viewers);
        if (viewers.length > 0) {
            this.wss.emit('message', viewers);
        }
        else {
            this.wss.emit('message', ["No Viewers"]);
        }
        await this.userModel.save(user);
    }
};
__decorate([
    websockets_1.WebSocketServer(),
    __metadata("design:type", socket_io_1.Server)
], UserGateway.prototype, "wss", void 0);
__decorate([
    websockets_1.SubscribeMessage('user'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", Promise)
], UserGateway.prototype, "handleId", null);
UserGateway = __decorate([
    websockets_1.WebSocketGateway(),
    __param(0, common_1.Inject('USER_REPOSITORY')),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], UserGateway);
exports.UserGateway = UserGateway;
//# sourceMappingURL=user.gateway.js.map