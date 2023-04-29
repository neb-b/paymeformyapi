# Pay Me For My API

Add lightning paywalls to your api

## How to use

[You can view this commit to see paymeformyapi being added to a next.js project](https://github.com/neb-b/usdebt.wtf/commit/9e09741a11b9d9e9e2bbc059d6527cfb46a6479d)

```
npm i --save paymeformyapi
```

- Generate an LNBits instance and install the User Manager extension
- Create a new user & wallet, this will be the user that receives payments for every api request
- Save the `inkey` from this user's wallet

```
// Initialize the package

import PayMeForMyAPI from 'paymeformyapi'

const paywall = new PayMeForMyAPI({
  lnBitsAdminId: process.env.LN_BITS_ADMIN_ID,
  lnBitsApiKey: process.env.LN_BITS_API_KEY,
  lnBitsURL: process.env.LN_BITS_URL,
  lnBitsAdminInvoiceKey: process.env.LN_BITS_ADMIN_INVOICE_KEY,
  refillAmount: 50, // number of satoshis to refill
  requestCost: 1, // number of satoshis per API call
})
```

```
// Add a paywall to an API route

const { api_token } = req.query // Get the api_token from the request somehow

const {
    success,           // User successfully paid for this request
    updated_api_token, // User has never paid for api access, or is out of sats, generate a new api token for them
    invoice            // Lightning invoice to refill their API access
} = await paywall.deductBalance(api_token)

if (!success) {
    res.status(402).json({
        message: 'Payment required. Please pay the invoice and update your api token.',
        updated_api_token,
        invoice,
    })

    return
}
```
