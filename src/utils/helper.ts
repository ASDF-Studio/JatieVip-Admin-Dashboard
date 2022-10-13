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

export const getSubsName = (plan: IPlan) => {
  if (plan?.interval === 'year') {
    return `${plan?.interval_count} ${plan?.interval}`
  }

  if (plan?.interval_count === 1) {
    return plan?.interval
  }

  return `${plan?.interval_count}-${plan?.interval}`
}
