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
  updated_api_token?: string
  invoice?: string
}

class PayMeForMyAPI {
  private config: Config

  constructor(config: Config) {
    this.config = config
  }

  async generateApiToken(): Promise<any> {
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

      return { success: false, updated_api_token: apiToken, invoice: invoice.payment_request }
    } catch (e) {
      console.log('error generating api token', e)
    }
  }

  async deductBalance(api_token: string = ''): Promise<DeductBalanceResponse> {
    const [userAdminKey, userInvoiceKey, paymentHash] = api_token.split(':')

    try {
      if (!userAdminKey || !userInvoiceKey || !paymentHash) {
        throw new Error('Invalid api_token')
      }

      // Check if original payment for fill-up has been made
      // LNBits displays a user's balance as 0 until they've manually requested the status of a payment_hash???
      await lnBits.checkPaymentHash({ url: this.config.lnBitsURL, paymentHash, adminKey: userAdminKey })
    } catch (e) {
      console.log('error checking payment hash', e)
      return this.generateApiToken()
    }

    try {
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
        try {
          return { success: false }
        } catch (e) {
          console.log('error generating refill invoice', e)
        }
      }
    }

    // Fallback
    return { success: false }
  }
}

export default PayMeForMyAPI
