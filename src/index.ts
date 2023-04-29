import * as lnBits from './lnBits'

interface Config {
  lnBitsAdminId: string
  lnBitsApiKey: string
  lnBitsURL: string
  lnBitsAdminInvoiceKey: string
  refillAmount: number
  requestCost: number
}

interface DeductBalanceResponse {
  success: boolean
  api_token?: string
  invoice?: string
}

class PayMeForMyAPI {
  private config: Config

  constructor(config: Config) {
    this.config = config
  }

  async generateApiToken(): Promise<DeductBalanceResponse> {
    try {
      // User has not paid yet
      const account = await lnBits.createUserAndWallet({
        url: this.config.lnBitsURL,
        adminId: this.config.lnBitsAdminId,
        apiKey: this.config.lnBitsApiKey,
      })

      const wallet = account.wallets[0]

      const invoice = await lnBits.createInvoice({
        url: this.config.lnBitsURL,
        amount: this.config.refillAmount,
        invoiceKey: wallet.inkey,
        memo: 'api refill',
      })

      const apiToken = `${wallet.adminkey}:${wallet.inkey}:${invoice.payment_hash}`

      return { success: false, api_token: apiToken, invoice: invoice.payment_request }
    } catch (e) {
      console.log('error generating api token', e)
    }

    return { success: false }
  }

  async deductBalance(api_token: string = ''): Promise<DeductBalanceResponse> {
    const [userAdminKey, userInvoiceKey, paymentHash] = api_token.split(':')

    try {
      if (!userAdminKey || !userInvoiceKey || !paymentHash) {
        return this.generateApiToken()
      }

      // Check if original payment for fill-up has been made
      // LNBits displays a user's balance as 0 until they've manually requested the status of a payment_hash???
      const data = await lnBits.checkPaymentHash({
        url: this.config.lnBitsURL,
        paymentHash,
        adminKey: userAdminKey,
      })

      if (!data.paid) {
        // User has not paid yet, return same response as original generateToken
        return { success: false, api_token, invoice: data.details.bolt11 }
      }

      //
      // Create invoice from admin wallet
      // Pay invoice from user wallet
      // If it fails, return a refill invoice
      //
      const invoice = await lnBits.createInvoice({
        url: this.config.lnBitsURL,
        amount: this.config.requestCost,
        invoiceKey: this.config.lnBitsAdminInvoiceKey,
        memo: 'api request',
      })

      await lnBits.payInvoice({
        url: this.config.lnBitsURL,
        bolt11: invoice.payment_request,
        adminKey: userAdminKey,
      })

      return { success: true }
    } catch (e) {
      const error = e as any
      const errorResponseDetail = error.response?.data?.detail || ''
      if (errorResponseDetail.includes('Insufficient balance')) {
        console.log('error generating refill invoice', e)
        return this.generateApiToken()
      }
    }

    // Fallback
    return { success: false }
  }
}

export default PayMeForMyAPI
