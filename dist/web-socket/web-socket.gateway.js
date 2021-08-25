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
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebSocketsGateway = void 0;
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../user/user.entity");
let WebSocketsGateway = class WebSocketsGateway {
    constructor() {
        this.logger = new common_1.Logger('AppGateway');
    }
    async handleDisconnect(client) {
        try {
            this.logger.log('Client Disconnected : ' + client.id);
            await typeorm_1.getRepository(user_entity_1.Sockets).delete({ ClientId: client.id });
        }
        catch (error) {
            this.logger.log(error);
        }
    }
    async handleConnection(client) {
        this.logger.log('Client Connection ' + client.id);
        this.SocketID = client.id;
        client.on('user', async (user) => {
            await typeorm_1.getRepository(user_entity_1.Sockets).insert({
                userId: user.id,
                ClientId: client.id,
            });
        });
    }
};
__decorate([
    websockets_1.WebSocketServer(),
    __metadata("design:type", socket_io_1.Server)
], WebSocketsGateway.prototype, "wss", void 0);
WebSocketsGateway = __decorate([
    websockets_1.WebSocketGateway()
], WebSocketsGateway);
exports.WebSocketsGateway = WebSocketsGateway;
//# sourceMappingURL=web-socket.gateway.js.map