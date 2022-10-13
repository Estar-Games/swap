import { UserService } from './user.service';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getUserBalance(address: string, token: string, decimals: string): Promise<{
        status: string;
        message: any;
        data?: undefined;
    } | {
        status: string;
        data: number;
        message?: undefined;
    }>;
}
