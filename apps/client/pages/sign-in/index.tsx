import type { NextPage } from 'next'
import Head from 'next/head'
import { LoginForm } from '@components/LoginForm'
import Layout from '@components/Layout'
import { Box } from '@mui/material'

const DashboardCreate: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Create</title>
        <meta name="description" content="Create new location" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <Box maxWidth={500} mx="auto">
          <LoginForm />
        </Box>
      </Layout>
    </div>
  )
}

export default DashboardCreate
