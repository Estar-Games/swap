import { UserService } from './user.service';
import { Controller, Get, Param } from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('/balance/:address/:token/:decimals')
  getUserBalance(
    @Param('address') address: string,
    @Param('token') token: string,
    @Param('decimals') decimals: string,
  ) {
    return this.userService.getUserBalance(address, token, decimals);
  }
}
