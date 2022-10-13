import { Address } from '@elrondnetwork/erdjs/out';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class UserService {
  constructor(private readonly configService: ConfigService) {}
  async getUserBalance(address, token, decimals) {
    try {
      new Address(address);
    } catch {
      return { status: 'FAIL', message: 'This is an invalid address.' };
    }

    let decimals_ready = 1;

    for (let i = 0; i < decimals; i++) {
      decimals_ready *= 10;
    }

    const url =
      this.configService.get('ELROND_API') +
      '/accounts/' +
      address +
      '/tokens/' +
      token;
    const response = await axios
      .get(url)
      .then((response) => {
        return response.data;
      })
      .catch(({ response }) => {
        return response.data;
      });
    if (response.statusCode) {
      return { status: 'FAIL', message: response.message };
    }

    return {
      status: 'SUCCESS',
      data: Number(response.balance) / decimals_ready,
    };
  }
}
