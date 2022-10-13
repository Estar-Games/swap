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
exports.UserService = void 0;
const out_1 = require("@elrondnetwork/erdjs/out");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const axios_1 = require("axios");
let UserService = class UserService {
    constructor(configService) {
        this.configService = configService;
    }
    async getUserBalance(address, token, decimals) {
        try {
            new out_1.Address(address);
        }
        catch (_a) {
            return { status: 'FAIL', message: 'This is an invalid address.' };
        }
        let decimals_ready = 1;
        for (let i = 0; i < decimals; i++) {
            decimals_ready *= 10;
        }
        const url = this.configService.get('ELROND_API') +
            '/accounts/' +
            address +
            '/tokens/' +
            token;
        const response = await axios_1.default
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
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map