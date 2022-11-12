/* eslint-disable camelcase */
import { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'
import { buffer } from 'micro'
import dayjs from 'dayjs'
import { getSubsName } from 'utils/helper'
import { CreateSubsTypes } from 'services/subs'
import { IPlan } from 'services/types'
import { isEmpty, isNaN } from 'lodash'
import { createUserSubOnApp, deleteUserSubsOnApp } from 'lib/app'

export const config = { api: { bodyParser: false } }

const stripeWebhook = async (req: NextApiRequest, res: NextApiResponse) => {
  const sig = req.headers['stripe-signature']
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2022-08-01',
  })
  const reqBuffer = await buffer(req)

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(reqBuffer, sig, process.env.STRIPE_WEBHOOKSCRET)
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`)

    return
  }

  if (event.type === 'customer.subscription.created') {
    const subscription = event.data.object as Stripe.Subscription & {
      plan: IPlan
    }

    const customerId = subscription.customer as string
    const { trial_end, trial_start, plan, current_period_end, current_period_start } = subscription
    const { metadata } = (await stripe.customers.retrieve(customerId)) as Stripe.Customer
    const moveUserId = Number(metadata?.moveUserId)
    const subs = getSubsName(plan)

    if (!moveUserId || isNaN(moveUserId)) {
      console.log('user not found!', customerId)
      res.send({ received: true })

      return
    }

    if (subscription.status === 'trialing') {
      await createUserSubOnApp({
        user_id: moveUserId,
        valid_from: dayjs.unix(trial_start).format('YYYY-MM-DD hh:mm:ss'),
        valid_to: dayjs.unix(trial_end).format('YYYY-MM-DD hh:mm:ss'),
        type: subs.planName as CreateSubsTypes,
      })
    }
    if (subscription.status === 'active') {
      await createUserSubOnApp({
        user_id: moveUserId,
        valid_from: dayjs.unix(current_period_start).format('YYYY-MM-DD hh:mm:ss'),
        valid_to: dayjs.unix(current_period_end).format('YYYY-MM-DD hh:mm:ss'),
        type: subs.planName as CreateSubsTypes,
      })
    }

    res.send({ received: true })

    return
  }

  if (event.type === 'customer.subscription.updated') {
    const subscription = event.data.object as Stripe.Subscription & {
      plan: IPlan
    }

    const previousvalues = event.data.previous_attributes as {
      cancel_at: null | number
      schedule: null | string
      plan?: null | Stripe.Plan
      status?: Stripe.Subscription.Status
      current_period_end?: number
      current_period_start?: number
    }

    const customerId = subscription.customer as string
    const { metadata } = (await stripe.customers.retrieve(customerId)) as Stripe.Customer

    const { current_period_end, current_period_start, plan } = subscription
    const subs = getSubsName(plan)
    const moveUserId = Number(metadata?.moveUserId)

    if (!moveUserId || isNaN(moveUserId)) {
      console.log('user not found!', customerId)
      res.send({ received: true })

      return
    }

    if (previousvalues?.cancel_at !== undefined) {
      console.log('subscription canceled or reactivated at end of the current period')
      res.send({ received: true })

      return
    }

    if (previousvalues?.schedule !== undefined) {
      console.log('schedule created or deleted')
      res.send({ received: true })

      return
    }

    if (subscription.status === 'active' && !isEmpty(previousvalues.plan)) {
      await deleteUserSubsOnApp({
        moveUserId,
      })

      await createUserSubOnApp({
        user_id: moveUserId,
        valid_from: dayjs.unix(current_period_start).format('YYYY-MM-DD hh:mm:ss'),
        valid_to: dayjs.unix(current_period_end).format('YYYY-MM-DD hh:mm:ss'),
        type: subs.planName as CreateSubsTypes,
      })

      res.send({ received: true })

      return
    }

    if (subscription.status === 'trialing' && !isEmpty(previousvalues.plan)) {
      await deleteUserSubsOnApp({
        moveUserId,
      })

      await createUserSubOnApp({
        user_id: moveUserId,
        valid_from: dayjs.unix(current_period_start).format('YYYY-MM-DD hh:mm:ss'),
        valid_to: dayjs.unix(current_period_end).format('YYYY-MM-DD hh:mm:ss'),
        type: subs.planName as CreateSubsTypes,
      })

      res.send({ received: true })

      return
    }

    if (subscription.status === 'active' && previousvalues?.status) {
      await deleteUserSubsOnApp({
        moveUserId,
      })

      await createUserSubOnApp({
        user_id: moveUserId,
        valid_from: dayjs.unix(current_period_start).format('YYYY-MM-DD hh:mm:ss'),
        valid_to: dayjs.unix(current_period_end).format('YYYY-MM-DD hh:mm:ss'),
        type: subs.planName as CreateSubsTypes,
      })
      res.send({ received: true })

      return
    }

    if (subscription.status === 'active' && previousvalues?.current_period_end && previousvalues.current_period_start) {
      await deleteUserSubsOnApp({
        moveUserId,
      })

      await createUserSubOnApp({
        user_id: moveUserId,
        valid_from: dayjs.unix(current_period_start).format('YYYY-MM-DD hh:mm:ss'),
        valid_to: dayjs.unix(current_period_end).format('YYYY-MM-DD hh:mm:ss'),
        type: subs.planName as CreateSubsTypes,
      })
      res.send({ received: true })

      return
    }
  }

  if (event.type === 'customer.subscription.deleted') {
    const subscription = event.data.object as Stripe.Subscription & {
      plan: IPlan
    }
    const customerId = subscription.customer as string
    const { metadata } = (await stripe.customers.retrieve(customerId)) as Stripe.Customer
    const moveUserId = Number(metadata?.moveUserId)

    if (!moveUserId || isNaN(moveUserId)) {
      console.log('user not found!', customerId)
      res.send({ received: true })

      return
    }

    if (subscription.status === 'canceled') {
      await deleteUserSubsOnApp({
        moveUserId,
      })
      res.send({ received: true })

      return
    }
  } else {
    console.log(`unhandled event ${event.type}`)
  }

  res.send({ received: true })
}

export default stripeWebhook
