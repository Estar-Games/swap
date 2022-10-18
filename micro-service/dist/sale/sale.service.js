"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaleService = void 0;
const common_1 = require("@nestjs/common");
const out_1 = require("@elrondnetwork/erdjs-network-providers/out");
const out_2 = require("@elrondnetwork/erdjs/out");
const bignumber_js_1 = require("bignumber.js");
const fs = require("fs");
const config_1 = require("@nestjs/config");
let SaleService = class SaleService {
    constructor(config) {
        this.config = config;
    }
    async getSupply() {
        try {
            new out_2.Address(this.config.get('SC_ADDRESS'));
        }
        catch (_a) {
            return { status: 'FAIL', message: 'SC Address invalid.' };
        }
        try {
            let abiJson = fs.readFileSync('estar-sale.abi.json');
            let abiObject = JSON.parse(String(abiJson));
            const abiRegistry = out_2.AbiRegistry.create(abiObject);
            const abi = new out_2.SmartContractAbi(abiRegistry, ['SwapContract']);
            const contract = new out_2.SmartContract({
                address: new out_2.Address(this.config.get('SC_ADDRESS')),
                abi: abi,
            });
            const networkProvider = new out_1.ProxyNetworkProvider(this.config.get('ELROND_API'));
            let interaction = contract.methods.getTokenBalance([]);
            const query = interaction.buildQuery();
            const data = await networkProvider.queryContract(query).then((res) => {
                const endpointDefinition = interaction.getEndpoint();
                const { firstValue, returnCode } = new out_2.ResultsParser().parseQueryResponse(res, endpointDefinition);
                if (returnCode.toString() !== 'ok')
                    return { status: 'FAIL', data: returnCode.toString() };
                return firstValue.valueOf();
            });
            return {
                status: 'SUCCESS',
                data: Number((0, bignumber_js_1.default)(data)) / 1000000000000000000,
            };
        }
        catch (_b) {
            return {
                status: 'FAIL',
                message: 'Error when trying to interact with sc.',
            };
        }
    }
    async getUserBought(address) {
        try {
            new out_2.Address(address);
        }
        catch (_a) {
            return { status: 'FAIL', message: 'Address invalid.' };
        }
        try {
            let abiJson = fs.readFileSync('estar-sale.abi.json');
            let abiObject = JSON.parse(String(abiJson));
            const abiRegistry = out_2.AbiRegistry.create(abiObject);
            const abi = new out_2.SmartContractAbi(abiRegistry, ['SwapContract']);
            const contract = new out_2.SmartContract({
                address: new out_2.Address(this.config.get('SC_ADDRESS')),
                abi: abi,
            });
            const networkProvider = new out_1.ProxyNetworkProvider(this.config.get('ELROND_API'));
            let interaction = contract.methods.getClientBoughtValue([address]);
            const query = interaction.buildQuery();
            const data = await networkProvider.queryContract(query).then((res) => {
                const endpointDefinition = interaction.getEndpoint();
                const { firstValue, returnCode } = new out_2.ResultsParser().parseQueryResponse(res, endpointDefinition);
                if (returnCode.toString() !== 'ok')
                    return { status: 'FAIL', data: returnCode.toString() };
                return firstValue.valueOf();
            });
            return {
                status: 'SUCCESS',
                data: Number((0, bignumber_js_1.default)(data)) / 1000000000000000000,
            };
        }
        catch (_b) {
            return {
                status: 'FAIL',
                message: 'Error when trying to interact with sc.',
            };
        }
    }
};
SaleService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], SaleService);
exports.SaleService = SaleService;
//# sourceMappingURL=sale.service.js.map