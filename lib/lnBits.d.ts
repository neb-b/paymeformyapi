export declare const createUserAndWallet: ({ url, adminId, apiKey, }: {
    url: string;
    adminId: string;
    apiKey: string;
}) => Promise<any>;
export declare const createInvoice: ({ url, amount, invoiceKey, memo, }: {
    amount: number;
    url: string;
    invoiceKey: string;
    memo: string;
}) => Promise<any>;
export declare const payInvoice: ({ url, bolt11, adminKey, }: {
    url: string;
    bolt11: string;
    adminKey: string;
}) => Promise<any>;
export declare const checkPaymentHash: ({ url, paymentHash, adminKey, }: {
    url: string;
    paymentHash: string;
    adminKey: string;
}) => Promise<any>;
