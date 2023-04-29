import axios from 'axios'

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

import { v4 as uuidv4 } from 'uuid'

interface Config {
  lnBitsAdminKey: string
  lnBitsKey: string
  lnBitsURL: string
  refillAmount: number
  requestCost: number
}

interface DeductBalanceResponse {
  success: boolean
  refillInvoice?: string
}

class PayMeForMyAPI {
  private config: Config

  constructor(config: Config) {
    this.config = config
  }

  async createAccount(): Promise<void> {
    const username = uuidv4()
    // Call lnBits API to create a new user and wallet with the generated username
  }

  async deductBalance(): Promise<DeductBalanceResponse> {
    // Deduct the requestCost from the user's balance
    // If the balance reaches 0, generate a new lightning invoice for refillAmount satoshis and return it

    const success = true // Replace with the actual balance check
    const refillInvoice = '' // Replace with the actual generated invoice

    if (success) {
      return { success }
    } else {
      return { success, refillInvoice }
    }
  }
}

export default PayMeForMyAPI
