interface Config {
    lnBitsAdminKey: string;
    lnBitsKey: string;
    lnBitsURL: string;
    refillAmount: number;
    requestCost: number;
}
interface DeductBalanceResponse {
    success: boolean;
    refillInvoice?: string;
}
declare class PayMeForMyAPI {
    private config;
    constructor(config: Config);
    createAccount(): Promise<void>;
    deductBalance(): Promise<DeductBalanceResponse>;
}
export default PayMeForMyAPI;
