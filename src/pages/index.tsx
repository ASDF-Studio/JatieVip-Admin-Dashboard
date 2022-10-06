import type { NextPage } from 'next'
import { MainLayout } from 'components'
import { CreateSub } from 'ui/dashboard/'
import { SecurePage } from 'navigation'
// import { withIronSessionSsr } from 'iron-session/next/dist'

const Home: NextPage = () => {
  return (
    <SecurePage>
      <MainLayout className="pt-[66px] px-5">
        <CreateSub className="max-w-screen-move-fit mx-auto flex flex-col mt-[23px] x:mt-[53px] min-h-[calc(100vh-209px)]" />
      </MainLayout>
    </SecurePage>
  )
}

// export const getServerSideProps = withIronSessionSsr(
//   async ({ req }) => {
//     const user = req.session.tok

//     if (user.admin !== true) {
//       return {
//         notFound: true,
//       }
//     }

//     return {
//       props: {
//         user: req.session.user,
//       },
//     }
//   },
//   {
//     cookieName: 'myapp_cookiename',
//     password: 'complex_password_at_least_32_characters_long',
//     // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
//     cookieOptions: {
//       secure: process.env.NODE_ENV === 'production',
//     },
//   },
// )

export default Home
