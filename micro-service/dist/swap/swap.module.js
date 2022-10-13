"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwapModule = void 0;
const common_1 = require("@nestjs/common");
const swap_controller_1 = require("./swap.controller");
const swap_service_1 = require("./swap.service");
let SwapModule = class SwapModule {
};
SwapModule = __decorate([
    (0, common_1.Module)({
        controllers: [swap_controller_1.SwapController],
        providers: [swap_service_1.SwapService],
    })
], SwapModule);
exports.SwapModule = SwapModule;
//# sourceMappingURL=swap.module.js.map