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
var lnBits = require("./lnBits");
var PayMeForMyAPI = /** @class */ (function () {
    function PayMeForMyAPI(config) {
        this.config = config;
    }
    PayMeForMyAPI.prototype.generateApiToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            var account, wallet, invoice, apiToken, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, lnBits.createUserAndWallet({
                                url: this.config.lnBitsURL,
                                adminId: this.config.lnBitsAdminId,
                                apiKey: this.config.lnBitsApiKey,
                            })];
                    case 1:
                        account = _a.sent();
                        wallet = account.wallets[0];
                        return [4 /*yield*/, lnBits.createInvoice({
                                url: this.config.lnBitsURL,
                                amount: this.config.refillAmount,
                                invoiceKey: wallet.inkey,
                                memo: 'api refill',
                            })];
                    case 2:
                        invoice = _a.sent();
                        apiToken = "".concat(wallet.adminkey, ":").concat(wallet.inkey, ":").concat(invoice.payment_hash);
                        return [2 /*return*/, { success: false, updated_api_token: apiToken, invoice: invoice.payment_request }];
                    case 3:
                        e_1 = _a.sent();
                        console.log('error generating api token', e_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PayMeForMyAPI.prototype.deductBalance = function (api_token) {
        var _a, _b;
        if (api_token === void 0) { api_token = ''; }
        return __awaiter(this, void 0, void 0, function () {
            var _c, userAdminKey, userInvoiceKey, paymentHash, e_2, invoice, e_3, error, errorResponseDetail;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _c = api_token.split(':'), userAdminKey = _c[0], userInvoiceKey = _c[1], paymentHash = _c[2];
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 3, , 4]);
                        if (!userAdminKey || !userInvoiceKey || !paymentHash) {
                            throw new Error('Invalid api_token');
                        }
                        // Check if original payment for fill-up has been made
                        // LNBits displays a user's balance as 0 until they've manually requested the status of a payment_hash???
                        return [4 /*yield*/, lnBits.checkPaymentHash({ url: this.config.lnBitsURL, paymentHash: paymentHash, adminKey: userAdminKey })];
                    case 2:
                        // Check if original payment for fill-up has been made
                        // LNBits displays a user's balance as 0 until they've manually requested the status of a payment_hash???
                        _d.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_2 = _d.sent();
                        console.log('error checking payment hash', e_2);
                        return [2 /*return*/, this.generateApiToken()];
                    case 4:
                        _d.trys.push([4, 7, , 8]);
                        return [4 /*yield*/, lnBits.createInvoice({
                                url: this.config.lnBitsURL,
                                amount: this.config.requestCost,
                                invoiceKey: this.config.lnBitsAdminInvoiceKey,
                                memo: 'api request',
                            })];
                    case 5:
                        invoice = _d.sent();
                        return [4 /*yield*/, lnBits.payInvoice({
                                url: this.config.lnBitsURL,
                                bolt11: invoice.payment_request,
                                adminKey: userAdminKey,
                            })];
                    case 6:
                        _d.sent();
                        return [2 /*return*/, { success: true }];
                    case 7:
                        e_3 = _d.sent();
                        error = e_3;
                        errorResponseDetail = ((_b = (_a = error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.detail) || '';
                        if (errorResponseDetail.includes('Insufficient balance')) {
                            try {
                                return [2 /*return*/, { success: false }];
                            }
                            catch (e) {
                                console.log('error generating refill invoice', e);
                            }
                        }
                        return [3 /*break*/, 8];
                    case 8: 
                    // Fallback
                    return [2 /*return*/, { success: false }];
                }
            });
        });
    };
    return PayMeForMyAPI;
}());
exports.default = PayMeForMyAPI;
