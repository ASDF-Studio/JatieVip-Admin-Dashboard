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
}

export const getSubsName = (plan: IPlan): ReturnSubsName => {
  if (plan?.interval === 'year') {
    if (plan.interval_count === 1) {
      return {
        title: '1 Year',
        weight: 12,
      }
    }

    return {
      title: '',
      weight: 0,
    }
  }

  if (plan?.interval_count === 1) {
    return {
      title: 'Monthly',
      weight: 1,
    }
  }

  return {
    title: `${plan?.interval_count}-Months`,
    weight: plan?.interval_count,
  }
}
