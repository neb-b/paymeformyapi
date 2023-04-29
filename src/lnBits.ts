import axios from 'axios'

import { v4 as uuidv4 } from 'uuid'

export const createUserAndWallet = async ({
  url,
  adminId,
  apiKey,
}: {
  url: string
  adminId: string
  apiKey: string
}) => {
  const username = uuidv4()

  const { data } = await axios.post(
    `${url}/usermanager/api/v1/users`,
    {
      admin_id: adminId,
      user_name: username,
      wallet_name: `${username}-wallet`,
    },
    {
      headers: {
        'X-Api-Key': apiKey,
        'Content-type': 'application/json',
      },
    }
  )

  return data
}

export const createInvoice = async ({
  url,
  amount,
  invoiceKey,
}: {
  amount: number
  url: string
  invoiceKey: string
}) => {
  const { data } = await axios.post(
    `${url}/api/v1/payments`,
    {
      memo: 'api request',
      out: false,
      amount,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': invoiceKey,
      },
    }
  )

  return data
}

export const payInvoice = async ({
  url,
  bolt11,
  adminKey,
}: {
  url: string
  bolt11: string
  adminKey: string
}) => {
  const { data } = await axios.post(
    `${url}/api/v1/payments`,
    {
      out: true,
      bolt11,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': adminKey,
      },
    }
  )

  return data
}

export const checkPaymentHash = async ({
  url,
  paymentHash,
  adminKey,
}: {
  url: string
  paymentHash: string
  adminKey: string
}) => {
  const { data } = await axios.get(`${url}/api/v1/payments/${paymentHash}`, {
    headers: {
      'X-Api-Key': adminKey,
    },
  })

  return data
}
