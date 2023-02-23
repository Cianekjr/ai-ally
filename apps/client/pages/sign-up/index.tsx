import type { NextPage } from 'next'
import Head from 'next/head'
import { RegisterForm } from '@components/RegisterForm'
import Layout from '@components/Layout'
import { Box } from '@mui/material'

const DashboardCreate: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Sign up</title>
      </Head>

      <Layout>
        <Box maxWidth={500} mx="auto">
          <RegisterForm />
        </Box>
      </Layout>
    </div>
  )
}

export default DashboardCreate
