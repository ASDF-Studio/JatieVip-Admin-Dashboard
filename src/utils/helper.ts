/* eslint-disable no-plusplus */
import { IPlan } from 'services/types'

export const getBase64 = (file): Promise<string | ArrayBuffer> => {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)

    reader.onload = () => {
      resolve(reader.result)
    }
  })
}

type ReturnSubsName = {
  title: string
  weight: number
  nickName: string
  planName?: string
}

export const getSubsName = (plan: IPlan): ReturnSubsName => {
  if (plan?.interval === 'year') {
    if (plan.interval_count === 1) {
      return {
        title: '1 Year',
        weight: 12,
        nickName: '1 Year',
        planName: 'year',
      }
    }

    return {
      title: '',
      weight: 0,
      nickName: '',
    }
  }

  if (plan?.interval_count === 1) {
    return {
      title: 'Monthly',
      weight: 1,
      nickName: 'month',
      planName: 'month',
    }
  }

  return {
    title: `${plan?.interval_count}-Months`,
    weight: plan?.interval_count,
    nickName: `${plan?.interval_count}-months`,
    planName: `${plan?.interval_count}months`,
  }
}

export const arrayBufferToBase64 = (buffer) => {
  var binary = ''
  var bytes = new Uint8Array(buffer)
  var len = bytes.byteLength

  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i])
  }

  return window.btoa(binary)
}

export const mobileSub = {
  year: {
    name: 'year',
    interval: 1,
  },
  month: {
    name: 'month',
    interval: 1,
  },
  '3months': {
    name: 'month',
    interval: 3,
  },
  '6months': {
    name: 'month',
    interval: 6,
  },
}
