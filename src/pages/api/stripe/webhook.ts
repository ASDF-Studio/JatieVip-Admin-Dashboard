/* eslint-disable camelcase */
import { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'
import { buffer } from 'micro'
import dayjs from 'dayjs'
import { getSubsName } from 'utils/helper'
import { CreateSubsTypes } from 'services/subs'
import { IPlan } from 'services/types'
import { isEmpty, isNaN } from 'lodash'
import { createUserSubOnApp, deleteUserSubsOnAppV2 } from 'lib/app'

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
      const { id = null, error = '' } = await createUserSubOnApp({
        user_id: moveUserId,
        valid_from: dayjs.unix(trial_start).toISOString(),
        valid_to: dayjs.unix(trial_end).toISOString(),
        type: subs.planName as CreateSubsTypes,
      })

      if (!id) {
        res
          .status(500)
          .send({ received: true, message: `subscription creating error for user ${moveUserId}, erroris: ${error}` })

        return
      }

      await stripe.customers.update(customerId, {
        metadata: {
          subscriptionId: id,
        },
      })
    }
    if (subscription.status === 'active') {
      const { id = null, error = '' } = await createUserSubOnApp({
        user_id: moveUserId,
        valid_from: dayjs.unix(current_period_start).toISOString(),
        valid_to: dayjs.unix(current_period_end).toISOString(),
        type: subs.planName as CreateSubsTypes,
      })

      if (!id) {
        res
          .status(500)
          .send({ received: true, message: `subscription creating error for user ${moveUserId}, erroris: ${error}` })

        return
      }

      await stripe.customers.update(customerId, {
        metadata: {
          subscriptionId: id,
        },
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
      latest_invoice?: string
    }

    const customerId = subscription.customer as string
    const { metadata } = (await stripe.customers.retrieve(customerId)) as Stripe.Customer

    const { current_period_end, current_period_start, plan } = subscription
    const subs = getSubsName(plan)
    const moveUserId = Number(metadata?.moveUserId)
    const subscriptionId = Number(metadata?.subscriptionId)

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

    if (
      previousvalues.schedule &&
      previousvalues.current_period_end &&
      previousvalues.current_period_start &&
      previousvalues.latest_invoice
    ) {
      if (subscriptionId) {
        await deleteUserSubsOnAppV2({
          moveUserId,
          subscriptionId,
        })
      }

      const { id = null, error = '' } = await createUserSubOnApp({
        user_id: moveUserId,
        valid_from: dayjs.unix(current_period_start).toISOString(),
        valid_to: dayjs.unix(current_period_end).toISOString(),
        type: subs.planName as CreateSubsTypes,
      })

      if (!id) {
        res
          .status(500)
          .send({ received: true, message: `subscription creating error for user ${moveUserId}, erroris: ${error}` })

        await stripe.customers.update(customerId, {
          metadata: {
            subscriptionId: null,
          },
        })

        return
      }

      await stripe.customers.update(customerId, {
        metadata: {
          subscriptionId: id,
        },
      })
      res.send({ received: true })

      return
    }

    if (previousvalues?.schedule !== undefined) {
      console.log('schedule created or deleted')
      res.send({ received: true })

      return
    }

    if (subscription.status === 'active' && !isEmpty(previousvalues.plan)) {
      if (subscriptionId) {
        await deleteUserSubsOnAppV2({
          moveUserId,
          subscriptionId,
        })
      }

      const { id = null, error = '' } = await createUserSubOnApp({
        user_id: moveUserId,
        valid_from: dayjs.unix(current_period_start).toISOString(),
        valid_to: dayjs.unix(current_period_end).toISOString(),
        type: subs.planName as CreateSubsTypes,
      })

      if (!id) {
        res
          .status(500)
          .send({ received: true, message: `subscription creating error for user ${moveUserId}, erroris: ${error}` })

        await stripe.customers.update(customerId, {
          metadata: {
            subscriptionId: null,
          },
        })

        return
      }

      await stripe.customers.update(customerId, {
        metadata: {
          subscriptionId: id,
        },
      })

      res.send({ received: true })

      return
    }

    if (subscription.status === 'trialing' && !isEmpty(previousvalues.plan)) {
      if (subscriptionId) {
        await deleteUserSubsOnAppV2({
          moveUserId,
          subscriptionId,
        })
      }

      const { id = null, error = '' } = await createUserSubOnApp({
        user_id: moveUserId,
        valid_from: dayjs.unix(current_period_start).toISOString(),
        valid_to: dayjs.unix(current_period_end).toISOString(),
        type: subs.planName as CreateSubsTypes,
      })

      if (!id) {
        res
          .status(500)
          .send({ received: true, message: `subscription creating error for user ${moveUserId}, erroris: ${error}` })

        await stripe.customers.update(customerId, {
          metadata: {
            subscriptionId: null,
          },
        })

        return
      }

      await stripe.customers.update(customerId, {
        metadata: {
          subscriptionId: id,
        },
      })

      res.send({ received: true })

      return
    }

    if (subscription.status === 'active' && previousvalues?.status) {
      if (subscriptionId) {
        await deleteUserSubsOnAppV2({
          moveUserId,
          subscriptionId,
        })
      }

      const { id = null, error = '' } = await createUserSubOnApp({
        user_id: moveUserId,
        valid_from: dayjs.unix(current_period_start).toISOString(),
        valid_to: dayjs.unix(current_period_end).toISOString(),
        type: subs.planName as CreateSubsTypes,
      })

      if (!id) {
        res
          .status(500)
          .send({ received: true, message: `subscription creating error for user ${moveUserId}, erroris: ${error}` })

        await stripe.customers.update(customerId, {
          metadata: {
            subscriptionId: null,
          },
        })

        return
      }

      await stripe.customers.update(customerId, {
        metadata: {
          subscriptionId: id,
        },
      })
      res.send({ received: true })

      return
    }

    if (subscription.status === 'active' && previousvalues?.current_period_end && previousvalues.current_period_start) {
      if (subscriptionId) {
        await deleteUserSubsOnAppV2({
          moveUserId,
          subscriptionId,
        })
      }

      const { id = null, error = '' } = await createUserSubOnApp({
        user_id: moveUserId,
        valid_from: dayjs.unix(current_period_start).toISOString(),
        valid_to: dayjs.unix(current_period_end).toISOString(),
        type: subs.planName as CreateSubsTypes,
      })

      if (!id) {
        res
          .status(500)
          .send({ received: true, message: `subscription creating error for user ${moveUserId}, erroris: ${error}` })

        await stripe.customers.update(customerId, {
          metadata: {
            subscriptionId: null,
          },
        })

        return
      }

      await stripe.customers.update(customerId, {
        metadata: {
          subscriptionId: id,
        },
      })

      // await stripe.customers.update('')
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
    const subscriptionId = Number(metadata?.subscriptionId)

    if (!moveUserId || isNaN(moveUserId)) {
      console.log('user not found!', customerId)
      res.send({ received: true })

      return
    }

    if (subscription.status === 'canceled') {
      if (subscriptionId) {
        await deleteUserSubsOnAppV2({
          moveUserId,
          subscriptionId,
        })
      } else {
        res.status(404).send({
          recieved: true,
          error: `user mobile subscription not found ${moveUserId}`,
        })
      }

      await stripe.customers.update(customerId, {
        metadata: {
          subscriptionId: null,
        },
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
