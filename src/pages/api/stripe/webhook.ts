/* eslint-disable no-case-declarations */
import { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'
import { buffer } from 'micro'
import axios from 'axios'

export const config = { api: { bodyParser: false } }

const stripeWebhook = async (req: NextApiRequest, res: NextApiResponse) => {
  const sig = req.headers['stripe-signature']
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {})
  const reqBuffer = await buffer(req)

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(reqBuffer, sig, process.env.STRIPE_WEBHOOKSCRET)
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`)

    return
  }

  if (event.type === 'invoice.paid') {
    const invoicePaid = event.data.object as Stripe.Invoice
    const customerId = invoicePaid?.customer as string

    try {
      const stripeCustomer = (await stripe.customers.retrieve(customerId)) as Stripe.Customer
      // await axios.post('https://09d2-3-144-33-1.ngrok.io/api/', {
      //   user_id: stripeCustomer?.metadata?.moveUserId,
      //   valid_from: '2022-09-26 10:00:00',
      //   valid_to: '2022-10-26 10:00:00',
      //   type: 'month',
      //   secret_key: process.env.BACK_END_SECRET_KEY,
      // })
    } catch (e) {
      console.log(e)
    }
  } else {
    console.log(`unhandled event ${event.type}`)
  }

  res.send({ received: true })
}

export default stripeWebhook
