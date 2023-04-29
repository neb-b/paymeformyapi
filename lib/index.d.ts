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
    updated_api_token?: string;
    invoice?: string;
}
declare class PayMeForMyAPI {
    private config;
    constructor(config: Config);
    generateApiToken(): Promise<any>;
    deductBalance(api_token?: string): Promise<DeductBalanceResponse>;
}
export default PayMeForMyAPI;
