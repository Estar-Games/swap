import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SaleModule } from './sale/sale.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), SaleModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
