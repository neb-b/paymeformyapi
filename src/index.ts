import axios from 'axios'

import { v4 as uuidv4 } from 'uuid'

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
  refillInvoice?: string
}

interface CreateAccountResponse {
  api_token: string
}

class PayMeForMyAPI {
  private config: Config

  constructor(config: Config) {
    this.config = config
  }

  async createAccount(): Promise<CreateAccountResponse> {
    const username = uuidv4()
    try {
      const { data } = await axios.post(
        `${this.config.lnBitsURL}/usermanager/api/v1/users`,
        {
          admin_id: this.config.lnBitsAdminId,
          user_name: username,
          wallet_name: `${username}-wallet`,
        },
        {
          headers: {
            'X-Api-Key': this.config.lnBitsApiKey,
            'Content-type': 'application/json',
          },
        }
      )

      const wallet = data.wallets[0]

      return { api_token: data }
    } catch (e) {
      console.error('An error occurred creating account:', e)
      throw e
    }
  }

  async deductBalance(api_token: string): Promise<any> {
    const [adminKey, invoiceKey] = api_token.split(':')

    try {
      //
      // Create invoice from admin wallet
      // Pay invoice from user wallet
      // If it fails, return refill invoice
      //
      // replace this with balance check on user's wallet?
      // const { data } = await axios.get(
      //     `${this.config.lnBitsURL}/api/v1/wallets/${'498a7bb1582748deaa93abca1c466314'}`,
      //     {
      //     headers: {
      //         'Content-Type': 'application/json',
      //         'X-Api-Key': this.config.lnBitsApiKey,
      //     },
      //     }
      // )
      //
      const {
        data: { payment_request },
      } = await axios.post(
        `${this.config.lnBitsURL}/api/v1/payments`,
        {
          memo: 'api request',
          out: false,
          amount: this.config.requestCost,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-Api-Key': this.config.lnBitsApiKey,
          },
        }
      )

      const { data } = await axios.post(
        `${this.config.lnBitsURL}/api/v1/payments`,
        {
          out: true,
          bolt11: payment_request,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-Api-Key': adminKey,
          },
        }
      )

      // Return the payment response from the LNBits API
      return data
    } catch (e) {
      console.log('e', e)
      const error = e as any
      const errorResponseDetail = error.response?.data?.detail || ''
      if (errorResponseDetail.includes('Insufficient balance')) {
        try {
          const {
            data: { payment_request: refillInvoice },
          } = await axios.post(
            `${this.config.lnBitsURL}/api/v1/payments`,
            {
              memo: 'refill',
              out: false,
              amount: this.config.refillAmount,
            },
            {
              headers: {
                'Content-Type': 'application/json',
                'X-Api-Key': invoiceKey,
              },
            }
          )

          return { success: false, refillInvoice }
        } catch (e) {
          console.log('error generating refill invoice', e)
        }
      }
    }
  }
}

export default PayMeForMyAPI
