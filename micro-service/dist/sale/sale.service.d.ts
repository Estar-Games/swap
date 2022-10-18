import { ConfigService } from '@nestjs/config';
export declare class SaleService {
    private config;
    constructor(config: ConfigService);
    getSupply(): Promise<{
        status: string;
        message: string;
        data?: undefined;
    } | {
        status: string;
        data: number;
        message?: undefined;
    }>;
    getUserBought(address: any): Promise<{
        status: string;
        message: string;
        data?: undefined;
    } | {
        status: string;
        data: number;
        message?: undefined;
    }>;
}
