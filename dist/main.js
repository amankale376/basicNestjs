"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const path_1 = require("path");
const helmet = require("helmet");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(helmet());
    app.enableCors();
    app.useStaticAssets(path_1.join(__dirname, '..', 'public'));
    app.setBaseViewsDir(path_1.join(__dirname, '..', 'views'));
    app.setViewEngine('ejs');
    const options = new swagger_1.DocumentBuilder()
        .setTitle('basic Nest API')
        .setDescription('Basic NestJS API')
        .addBearerAuth()
        .setVersion('1.0.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup('/', app, document);
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map