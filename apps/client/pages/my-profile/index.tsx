import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Layout from '@components/Layout'
import { GetProfileDocument, GetProfileQuery } from '__generated__/graphql'
import { urqlClient } from 'integrations/urql'
import { APP_ROUTES } from 'utils/routes'

interface MyProfilePageProps {
  profile: GetProfileQuery['getProfile']
}

const MyProfileMage: NextPage<MyProfilePageProps> = ({ profile }) => {
  
  return (
    <div>
      <Head>
        <title>Profile</title>
        <meta name="description" content="Create new location" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        {profile.email}
      </Layout>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<MyProfilePageProps> = async ({ req }) => {
  try {
    const { data } = await urqlClient.query<GetProfileQuery>(GetProfileDocument, {}, { fetchOptions: { headers: { cookie: req.headers.cookie ?? '' } } }).toPromise()

    console.info(data)
    if (!data) {
      throw new Error('Internal error.')
    }

    const profile = data.getProfile

    return {
      props: {
        profile,
      },
    }
  } catch (e) {
    console.error(e)
    return {
      redirect: {
        destination: `${APP_ROUTES.SIGN_IN}?redirect=${APP_ROUTES.MY_PROFILE}`,
        permanent: false,
      },
    }
  }
}

export default MyProfileMage
