import { SaleService } from './sale.service';
export declare class SaleController {
    private saleService;
    constructor(saleService: SaleService);
    getSupply(): Promise<{
        status: string;
        message: string;
        data?: undefined;
    } | {
        status: string;
        data: number;
        message?: undefined;
    }>;
    getUserBought(address: string): Promise<{
        status: string;
        message: string;
        data?: undefined;
    } | {
        status: string;
        data: number;
        message?: undefined;
    }>;
}
