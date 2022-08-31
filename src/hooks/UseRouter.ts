import { useRouter } from 'next/router'

export const useNavigate = () => {
  const { push } = useRouter()

  const navigateTo = async (path: string) => {
    await push(path)
  }

  return {
    navigateTo,
  }
}
