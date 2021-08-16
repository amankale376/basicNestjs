import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Model } from 'mongoose';
import { UserDocument } from './user/user.model';
export declare class AuthenticationGuard implements CanActivate {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
}
