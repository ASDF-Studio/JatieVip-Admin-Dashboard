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
}

export const getSubsName = (plan: IPlan): ReturnSubsName => {
  if (plan?.interval === 'year') {
    if (plan.interval_count === 1) {
      return {
        title: '1 Year',
        weight: 12,
        nickName: '1 Year',
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
    }
  }

  return {
    title: `${plan?.interval_count}-Months`,
    weight: plan?.interval_count,
    nickName: `${plan?.interval_count}-months`,
  }
}
