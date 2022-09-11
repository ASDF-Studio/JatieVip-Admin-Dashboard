import { useRouter } from 'next/router'


export const useNavigate = () => {
  const { push, pathname } = useRouter()

  const navigateTo = async (path: string) => {
    await push(path)
  }

  return {
    navigateTo,
    pathname,
  }
}
