"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exceptions = void 0;
class exceptions {
    errors(code) {
        switch (code) {
            case 400: {
                return {
                    status: 400,
                    message: 'Bad Request'
                };
            }
            case 401: {
                return { status: 401,
                    message: 'Unauthorized' };
                break;
            }
            case 403: {
                return {
                    status: 403,
                    mesaage: 'forbidden'
                };
                break;
            }
            case 404: {
                return {
                    status: 404,
                    message: 'Not Found'
                };
            }
        }
    }
}
exports.exceptions = exceptions;
//# sourceMappingURL=exception_handler.js.map