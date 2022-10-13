import { Injectable } from '@nestjs/common';
import { ProxyNetworkProvider } from '@elrondnetwork/erdjs-network-providers/out';
import {
  AbiRegistry,
  Address,
  ResultsParser,
  SmartContract,
  SmartContractAbi,
} from '@elrondnetwork/erdjs/out';
import BigNumber from 'bignumber.js';
import * as fs from 'fs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SwapService {
  constructor(private config: ConfigService) {}

  async getSupply() {
    try {
      new Address(this.config.get('SC_ADDRESS'));
    } catch {
      return { status: 'FAIL', message: 'SC Address invalid.' };
    }
    try {
      let abiJson = fs.readFileSync('swap.abi.json');
      let abiObject = JSON.parse(String(abiJson));
      const abiRegistry = AbiRegistry.create(abiObject);
      const abi = new SmartContractAbi(abiRegistry, ['SwapContract']);
      const contract = new SmartContract({
        address: new Address(this.config.get('SC_ADDRESS')),
        abi: abi,
      });

      const networkProvider = new ProxyNetworkProvider(
        this.config.get('ELROND_API'),
      );
      let interaction = contract.methods.GetSupply([]);
      const query = interaction.buildQuery();
      const data = await networkProvider.queryContract(query).then((res) => {
        const endpointDefinition = interaction.getEndpoint();
        const { firstValue, returnCode } =
          new ResultsParser().parseQueryResponse(res, endpointDefinition);
        if (returnCode.toString() !== 'ok')
          return { status: 'FAIL', data: returnCode.toString() };
        return firstValue.valueOf();
      });
      return {
        status: 'SUCCESS',
        data: Number(BigNumber(data)) / 1000000000000000000,
      };
    } catch {
      return {
        status: 'FAIL',
        message: 'Error when trying to interact with sc.',
      };
    }
  }
}
