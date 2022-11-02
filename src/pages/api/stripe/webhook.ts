/* eslint-disable no-case-declarations */
import { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'
import { buffer } from 'micro'
import { SubsService } from 'services'
import dayjs from 'dayjs'

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
      const { metadata } = stripeCustomer
      const { moveUserId } = metadata || {}

      if (!moveUserId) {
        res.send({ received: true })

        return
      }

      const stripeSubs = await stripe.subscriptions.retrieve(invoicePaid.subscription as string)

      console.log(stripeSubs.status)
      
      console.log(dayjs.unix(invoicePaid.period_start).format('YYYY-MM-DD HH:MM:SS'))

      // await SubsService.createSubs({
      //   user_id: Number(metadata.moveUserId),
      //   valid_from: '',
      //   valid_to: '',
      //   type: 'month',
      //   secret_key: process.env.BACK_END_SECRET_KEY || '',
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
