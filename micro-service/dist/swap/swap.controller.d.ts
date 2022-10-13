import { SwapService } from './swap.service';
export declare class SwapController {
    private swapService;
    constructor(swapService: SwapService);
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
