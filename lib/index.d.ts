interface Config {
    lnBitsAdminId: string;
    lnBitsApiKey: string;
    lnBitsURL: string;
    lnBitsAdminInvoiceKey: string;
    refillAmount: number;
    requestCost: number;
}
interface CreateAccountResponse {
    api_token: string;
}
declare class PayMeForMyAPI {
    private config;
    constructor(config: Config);
    createAccount(): Promise<CreateAccountResponse>;
    deductBalance(api_token: string): Promise<any>;
}
export default PayMeForMyAPI;
