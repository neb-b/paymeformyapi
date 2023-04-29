"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var uuid_1 = require("uuid");
var PayMeForMyAPI = /** @class */ (function () {
    function PayMeForMyAPI(config) {
        this.config = config;
    }
    PayMeForMyAPI.prototype.createAccount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var username, data, wallet, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        username = (0, uuid_1.v4)();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.config.lnBitsURL, "/usermanager/api/v1/users"), {
                                admin_id: this.config.lnBitsAdminId,
                                user_name: username,
                                wallet_name: "".concat(username, "-wallet"),
                            }, {
                                headers: {
                                    'X-Api-Key': this.config.lnBitsApiKey,
                                    'Content-type': 'application/json',
                                },
                            })];
                    case 2:
                        data = (_a.sent()).data;
                        wallet = data.wallets[0];
                        return [2 /*return*/, { api_token: data }];
                    case 3:
                        e_1 = _a.sent();
                        console.error('An error occurred creating account:', e_1);
                        throw e_1;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PayMeForMyAPI.prototype.deductBalance = function (api_token) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var _c, adminKey, invoiceKey, payment_request, data, e_2, error, errorResponseDetail, refillInvoice, e_3;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _c = api_token.split(':'), adminKey = _c[0], invoiceKey = _c[1];
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 4, , 9]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.config.lnBitsURL, "/api/v1/payments"), {
                                memo: 'api request',
                                out: false,
                                amount: this.config.requestCost,
                            }, {
                                headers: {
                                    'Content-Type': 'application/json',
                                    'X-Api-Key': this.config.lnBitsApiKey,
                                },
                            })];
                    case 2:
                        payment_request = (_d.sent()).data.payment_request;
                        return [4 /*yield*/, axios_1.default.post("".concat(this.config.lnBitsURL, "/api/v1/payments"), {
                                out: true,
                                bolt11: payment_request,
                            }, {
                                headers: {
                                    'Content-Type': 'application/json',
                                    'X-Api-Key': adminKey,
                                },
                            })
                            // Return the payment response from the LNBits API
                        ];
                    case 3:
                        data = (_d.sent()).data;
                        // Return the payment response from the LNBits API
                        return [2 /*return*/, data];
                    case 4:
                        e_2 = _d.sent();
                        console.log('e', e_2);
                        error = e_2;
                        errorResponseDetail = ((_b = (_a = error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.detail) || '';
                        if (!errorResponseDetail.includes('Insufficient balance')) return [3 /*break*/, 8];
                        _d.label = 5;
                    case 5:
                        _d.trys.push([5, 7, , 8]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.config.lnBitsURL, "/api/v1/payments"), {
                                memo: 'refill',
                                out: false,
                                amount: this.config.refillAmount,
                            }, {
                                headers: {
                                    'Content-Type': 'application/json',
                                    'X-Api-Key': invoiceKey,
                                },
                            })];
                    case 6:
                        refillInvoice = (_d.sent()).data.payment_request;
                        return [2 /*return*/, { success: false, refillInvoice: refillInvoice }];
                    case 7:
                        e_3 = _d.sent();
                        console.log('error generating refill invoice', e_3);
                        return [3 /*break*/, 8];
                    case 8: return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    return PayMeForMyAPI;
}());
exports.default = PayMeForMyAPI;
