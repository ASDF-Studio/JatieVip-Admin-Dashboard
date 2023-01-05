import { Typography } from '@mui/material'
import { Title, Heading1, Card } from 'components'
import { CardReview } from 'components/card-review'
import { useEffect, useState } from 'react'

export const Reviews: React.FC = (): React.ReactElement => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const slides = [
    {
      url: '/assets/landing/reviews/customer-rev-1@3x.webp',
      title: 'I saw INCREDIBLE results',
      desc: `I started following Katie and Josh workout videos on YouTube 
      after I had my first 2 kids. Within 3 months I saw INCREDIBLE results. 
      I started looking better and most importantly FEELING better!!! 
      Working out isn't just for physical health, it's also for mental health.  
      Since then, I had a 3rd baby and knew just who to go to if I wanted to get  
      my body and mind back! Now that Josh and Katie have made the move app I can 
      have a whole variety  of workouts to chose from to reach my fitness goals. 
      The app is affordable,  easy to navigate, and IT WORKS!!! I will never go 
      back to another workout program.`,
      authorName: 'Anna Hauger',
    },
    {
      url: '/assets/landing/reviews/customer-rev-2@3x.webp',
      title: 'I just love the Move App',
      desc: `I can’t thank @j80fit ( @katiebrueckner & @joshbrueckner ) enough for 
      creating such an awesome program!!!! So excited to continue my fitness journey 
      with the @moveapp since it’s SO easy to use and the programs ACTUALLY work!!!!`,
      authorName: 'Anna Hauger',
    },
    // {
    //   url: 'https://images.unsplash.com/photo-1661961112951-f2bfd1f253ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2672&q=80',
    // },
  ]

  const slidePointer = [
    {
      pointer: 'before',
    },
    {
      pointer: 'after',
    },
  ]

  useEffect(() => {
    const autoChange = () => {
      const isLastSlide = currentIndex === slides.length - 1
      const newIndex = isLastSlide ? 0 : currentIndex + 1
      setCurrentIndex(newIndex)
    }
    const interval = setInterval(() => {
      autoChange()
    }, 4000)

    return () => clearInterval(interval)
  }, [currentIndex, slides.length])

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)
  }

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1
    const newIndex = isLastSlide ? 0 : currentIndex + 1
    setCurrentIndex(newIndex)
  }

  // const goToSlide = (slideIndex) => {
  //   setCurrentIndex(slideIndex)
  // }

  return (
    <div
      id="habit-tracking"
      className="relative flex -top-[70px] h-[1100px] sm:h-[800px] x:h-[800px]
      bg-[url('/assets/landing/reviews/review-bg.svg')]"
    >
      <div className="xl:max-w-[302px]  w-full hidden xl:flex" />
      <div
        className="max-w-[420px] mt-[52px] sm:mt-[115px] x:mt-[84px] w-full mx-auto 
        relative sm:max-w-[768px] x:max-w-[1024px] x:px-[61.3px] xl:px-0 xl:max-w-[900px]  
        2xl:max-w-[995px]"
      >
        <div
          className="flex flex-col px-[30px] sm:pl-[41.5px] sm:pr-[39px] x:pr-0 x:pl-0 
          w-full x:mx-auto"
        >
          <div className="flex flex-col gap-[2px]">
            <Title className="text-center sm:text-left text-[#191b1c]/60">Customer Reviews</Title>
            <Heading1 className="text-center sm:text-left text-[#191b1c] sm:max-w-[515px]">
              <span className="text-[#86949F]">Don’t just take our words </span>
              Our users ❤️ love us
            </Heading1>
          </div>
        </div>
        <div
          className="flex flex-wrap gap-x-[43.5px] sm:gap-x-[23px] x:gap-x-[23px] 2xl:gap-x-[23px] 
          mt-[20px] sm:mt-[40px] px-[30px] sm:px-0 sm:pl-[41.5px] sm:pr-[39px] x:pr-0 x:pl-0 
           x:mt-[72px] 2xl:mt-[61px] mb-60"
        >
          <div className="order-1 sm:order-1 max-w-[380px] h-[274px] w-full relative mb-20 z-10">
            <div
              style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
              className="w-full h-full rounded-2xl bg-center bg-cover duration-500 "
            />
            <div className="hidden sm:flex mt-10 flex items-center gap-x-3">
              {/* Left Arrow */}
              <div
                className="rounded-full p-2 bg-[#19a3d1] text-white 
              text-2xl cursor-pointer"
              >
                <svg
                  onClick={prevSlide}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </div>
              {/* Right Arrow */}
              <div
                className="rounded-full  p-2 bg-[#19a3d1] 
              text-2xl text-white cursor-pointer"
              >
                <svg
                  onClick={nextSlide}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </div>
              <hr
                className={`w-[240px] p-1 bg-[#e2fcff] relative rounded-full 
                after:absolute after:block after:inline-block after:-inset-1 
                after:bg-[#19a3d1] after:w-[120px] ${slidePointer[currentIndex].pointer}:left-[120px]`}
              />
              {/* <hr
                className="w-[240px] p-1 bg-[#e2fcff] relative rounded-full 
                after:absolute after:block after:inline-block after:-inset-1 
                after:bg-[#19a3d1] after:w-[120px] after:left-[120px]"
              /> */}
              {/* <div className="flex  bg-[#e2fcff] w-[240px]">
                {slides.map((slide, slideIndex) => (
                  <div
                    key={slideIndex}
                    onClick={() => goToSlide(slideIndex)}
                    className="text-[1opx] cursor-pointer text-[#19a3d1] w-[120px]"
                  >
                    _
                  </div>
                ))}
              </div> */}
            </div>
          </div>

          <img
            src="/assets/landing/reviews/double-quote.svg"
            alt="star icon"
            className="absolute flex w-[86px] h-[60px] -mt-[25px] ml-[303px] z-0"
          />

          <CardReview
            className="order-2 sm:order-2 -mt-[70px] sm:-mt-[0px]"
            icons={[
              <img src="/assets/landing/reviews/star@3x.webp" alt="star icon" className="w-[25px] h-[25px]" />,
              <img src="/assets/landing/reviews/star@3x.webp" alt="star icon" className="w-[25px] h-[25px]" />,
              <img src="/assets/landing/reviews/star@3x.webp" alt="star icon" className="w-[25px] h-[25px]" />,
              <img src="/assets/landing/reviews/star@3x.webp" alt="star icon" className="w-[25px] h-[25px]" />,
              <img src="/assets/landing/reviews/star@3x.webp" alt="star icon" className="w-[25px] h-[25px]" />,
            ]}
            title={slides[currentIndex].title}
            desc={slides[currentIndex].desc}
            authorName={slides[currentIndex].authorName}
          />

          <div className="sm:hidden order-3 sm:order-3 mt-10 flex items-center gap-x-3">
            {/* Left Arrow */}
            <div
              className="rounded-full p-2 bg-[#19a3d1] text-white 
              text-2xl cursor-pointer"
            >
              <svg
                onClick={prevSlide}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </div>
            {/* Right Arrow */}
            <div
              className="rounded-full  p-2 bg-[#19a3d1] 
              text-2xl text-white cursor-pointer"
            >
              <svg
                onClick={nextSlide}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </div>
            <hr
              className={`w-[240px] p-1 bg-[#e2fcff] relative rounded-full 
                after:absolute after:block after:inline-block after:-inset-1 
                after:bg-[#19a3d1] after:w-[120px] ${slidePointer[currentIndex].pointer}:left-[120px]`}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
