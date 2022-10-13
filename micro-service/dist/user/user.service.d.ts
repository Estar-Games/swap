import { ConfigService } from '@nestjs/config';
export declare class UserService {
    private readonly configService;
    constructor(configService: ConfigService);
    getUserBalance(address: any, token: any, decimals: any): Promise<{
        status: string;
        message: any;
        data?: undefined;
    } | {
        status: string;
        data: number;
        message?: undefined;
    }>;
}
