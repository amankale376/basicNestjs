import {Module} from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { WebSocketModule } from "../web-socket/web-socket.module";
import { Sockets, User } from "../user/user.entity";
import { DatabaseService } from "./database.service";

@Module({
    imports: [TypeOrmModule.forFeature([User, Sockets]),WebSocketModule],
    providers:[DatabaseService],
    exports:[DatabaseService]
})

export class DatabaseModule{}