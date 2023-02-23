import type { NextPage } from 'next'
import Head from 'next/head'
import Layout from '@components/Layout'
import { Box } from '@mui/material'
import { ForgotPasswordForm } from '@components/ForgotPasswordForm'

const ForgotPasswordPage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Create</title>
        <meta name="description" content="Forgot password" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <Box maxWidth={500} mx="auto">
          <ForgotPasswordForm />
        </Box>
      </Layout>
    </div>
  )
}

export default ForgotPasswordPage
