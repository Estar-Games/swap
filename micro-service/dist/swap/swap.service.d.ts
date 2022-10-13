import { ConfigService } from '@nestjs/config';
export declare class SwapService {
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
}
