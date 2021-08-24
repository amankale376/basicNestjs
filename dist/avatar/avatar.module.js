"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvatarModule = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const avatar_controller_1 = require("./avatar.controller");
const multer_1 = require("multer");
let AvatarModule = class AvatarModule {
};
AvatarModule = __decorate([
    common_1.Module({
        imports: [platform_express_1.MulterModule.register({
                storage: multer_1.diskStorage({
                    destination: './uploads',
                    filename(req, file, cb) {
                        cb(null, Date.now() + '-' + file.originalname);
                    },
                }),
                fileFilter(req, file, cb) {
                    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
                        const name = file.originalname;
                        var ext = name.split('.').pop();
                        return cb(new common_1.BadRequestException("file uploaded is of type " + ext), false);
                    }
                    cb(undefined, true);
                }
            })
        ],
        controllers: [avatar_controller_1.AvatarController],
        providers: []
    })
], AvatarModule);
exports.AvatarModule = AvatarModule;
//# sourceMappingURL=avatar.module.js.map