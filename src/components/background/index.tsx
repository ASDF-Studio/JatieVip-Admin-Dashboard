import { useMediaQuery } from 'hooks'

export const Bg = () => {
    const isMobile = useMediaQuery(768)
  
    return (
      <img
        src={`${isMobile ? '/assets/landing/hero-2-phone.webp' : '/assets/landing/bg-720.webp'}`}
        alt="phone front"
        className="absolute top-[149px] sm:hidden"
      />
    )
  }