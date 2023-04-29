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
// This function creates a new wallet for a given user on the LNBits server
// export const giveNewUserWallet = async (username) => {
//   try {
//     const header = {
//       'Content-Type': 'application/json',
//       // Your personal LNBits API key
//       'X-Api-Key': process.env.LN_BITS_KEY,
//     }
//     const body = {
//       user_name: username,
//       wallet_name: `${username}-wallet`,
//       // Your admin_id for the LNBits User Manager API
//       admin_id: process.env.LN_BITS_ADMIN_ID,
//     }
//     const response = await axios.post(
//       // Your LNBits User Manager API endpoint
//       `${process.env.LN_BITS_USER_MANAGER_API}`,
//       body,
//       { headers: header }
//     )
//     // Return the new wallet object from the server's response
//     return response.data.wallets[0]
//   } catch (error) {
//     console.error('An error occurred in giveNewUserWallet:', error)
//     // If an error occurs, log it and re-throw the error
//     throw error
//   }
// }
// // This function creates a lightning invoice for a user with a specified amount and memo
// export const createInvoice = async ({ user, amount = 1, memo = 'tip' }) => {
//   try {
//     const header = {
//       'Content-Type': 'application/json',
//       // The invoice key for the user's personal LNBits wallet needed to create invoices
//       'X-Api-Key': user.in_key,
//     }
//     const body = {
//       memo: memo,
//       out: false,
//       amount: amount,
//     }
//     // Make a POST request to the LNBits API to create a new invoice
//     const response = await axios.post(`${process.env.NEXT_PUBLIC_LN_BITS_DOMAIN}/api/v1/payments`, body, {
//       headers: header,
//     })
//     // Return the payment request for the new invoice
//     return response.data.payment_request
//   } catch (error) {
//     console.error('An error occurred in createInvoice:', error)
//     throw error
//   }
// }
// // This function sends a payment to a lightning invoice
// export const payInvoice = async (invoice, session) => {
//   try {
//     const header = {
//       'Content-Type': 'application/json',
//       // The admin key for the user's personal LNBits wallet needed to spend funds
//       'X-Api-Key': session.user.admin_key,
//     }
//     const body = {
//       out: true,
//       bolt11: invoice,
//     }
//     // Make a POST request to the LNBits API to send a payment for the specified invoice
//     const response = await axios.post(`${process.env.NEXT_PUBLIC_LN_BITS_DOMAIN}/api/v1/payments`, body, {
//       headers: header,
//     })
//     // Return the payment response from the LNBits API
//     return response.data
//   } catch (error) {
//     console.error('An error occurred in payInvoice:', error)
//     throw error
//   }
// }
var uuid_1 = require("uuid");
var PayMeForMyAPI = /** @class */ (function () {
    function PayMeForMyAPI(config) {
        this.config = config;
    }
    PayMeForMyAPI.prototype.createAccount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var username;
            return __generator(this, function (_a) {
                username = (0, uuid_1.v4)();
                return [2 /*return*/];
            });
        });
    };
    PayMeForMyAPI.prototype.deductBalance = function () {
        return __awaiter(this, void 0, void 0, function () {
            var success, refillInvoice;
            return __generator(this, function (_a) {
                success = true // Replace with the actual balance check
                ;
                refillInvoice = '' // Replace with the actual generated invoice
                ;
                if (success) {
                    return [2 /*return*/, { success: success }];
                }
                else {
                    return [2 /*return*/, { success: success, refillInvoice: refillInvoice }];
                }
                return [2 /*return*/];
            });
        });
    };
    return PayMeForMyAPI;
}());
exports.default = PayMeForMyAPI;
