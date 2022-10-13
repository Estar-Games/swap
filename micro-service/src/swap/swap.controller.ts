import { Controller, Get } from '@nestjs/common';
import { SwapService } from './swap.service';

@Controller('swap')
export class SwapController {
  constructor(private swapService: SwapService) {}
  @Get('/supply')
  getSupply() {
    return this.swapService.getSupply();
  }
}
