interface Config {
    lnBitsAdminId: string;
    lnBitsApiKey: string;
    lnBitsURL: string;
    lnBitsAdminInvoiceKey: string;
    refillAmount: number;
    requestCost: number;
}
interface DeductBalanceResponse {
    success: boolean;
    api_token?: string;
    invoice?: string;
}
declare class PayMeForMyAPI {
    private config;
    constructor(config: Config);
    generateApiToken(): Promise<DeductBalanceResponse>;
    deductBalance(api_token?: string): Promise<DeductBalanceResponse>;
}
export default PayMeForMyAPI;
