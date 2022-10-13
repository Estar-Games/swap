import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SwapModule } from './swap/swap.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule, ConfigModule.forRoot({ isGlobal: true }), SwapModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
