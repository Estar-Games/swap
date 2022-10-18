import { Controller, Get, Param } from '@nestjs/common';
import { SaleService } from './sale.service';

@Controller('sale')
export class SaleController {
  constructor(private saleService: SaleService) {}
  @Get('/supply')
  getSupply() {
    return this.saleService.getSupply();
  }

  @Get('/bought/:address')
  getUserBought(@Param('address') address: string) {
    return this.saleService.getUserBought(address);
  }
}
