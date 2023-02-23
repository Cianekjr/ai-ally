import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Layout from '@components/Layout'
import { Box, Typography } from '@mui/material'
import { APP_ROUTES } from 'utils/routes'
import { ActivationStatus, ActivateDocument, ActivateMutation } from '__generated__/graphql'
import { urqlClient } from 'integrations/urql'
import { CustomLink } from '@components/CustomLink'

interface SignUpActivationPageProps {
  status: ActivationStatus
}

const SignUpActivationPage: NextPage<SignUpActivationPageProps> = ({ status }) => {
  return (
    <div>
      <Head>
        <title>Confirm email</title>
      </Head>

      <Layout>
        <Box textAlign="center" py={6}>
          {status === ActivationStatus.Success && (
            <>
              <Typography component="h1" variant="h2" gutterBottom>
                Thank you for the registration at Infflu
              </Typography>
              <Typography paragraph gutterBottom>
                Your account is now active. Let&apos;s <CustomLink href={APP_ROUTES.SIGN_IN}>sign in</CustomLink> and discover the Infflu world!
              </Typography>
            </>
          )}
          {status === ActivationStatus.Expired && (
            <>
              <Typography component="h1" variant="h2" gutterBottom>
                The activation token has expired!
              </Typography>
              <Typography paragraph gutterBottom>
                Go to <CustomLink href={APP_ROUTES.LANDING}>homepage</CustomLink>.
              </Typography>
            </>
          )}
          {status === ActivationStatus.Used && (
            <>
              <Typography component="h1" variant="h2" gutterBottom>
                This e-mail address has been already confirmed
              </Typography>
              <Typography paragraph gutterBottom>
                You have been already registered. Let&apos;s <CustomLink href={APP_ROUTES.SIGN_IN}>sign in</CustomLink>!
              </Typography>
            </>
          )}
          {status === ActivationStatus.Invalid && (
            <>
              <Typography component="h1" variant="h2" gutterBottom>
                The activation token is invalid!
              </Typography>
              <Typography paragraph gutterBottom>
                Go to <CustomLink href={APP_ROUTES.LANDING}>homepage</CustomLink>.
              </Typography>
            </>
          )}
        </Box>
      </Layout>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<SignUpActivationPageProps> = async (ctx) => {
  try {
    if (typeof ctx.query.token !== 'string') {
      throw new Error('Token is invalid')
    }
    const token = ctx.query.token

    const result = await urqlClient.mutation<ActivateMutation>(ActivateDocument, { token }).toPromise()

    if (!result.data) {
      throw new Error('Internal error. Status cannot be obtained.')
    }

    const status = result.data.activate.status

    return {
      props: {
        status,
      },
    }
  } catch {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    }
  }
}

export default SignUpActivationPage
