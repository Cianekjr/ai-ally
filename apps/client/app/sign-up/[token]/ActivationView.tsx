'use client'

import { FC } from 'react'

import { Box, Typography } from '@mui/material'

import { ActivationStatus } from '__generated__/graphql.server'
import { CustomLink } from '@components/CustomLink'

import { APP_ROUTES } from 'utils/routes'

interface ActivationViewProps {
  status: ActivationStatus
}

const ActivationView: FC<ActivationViewProps> = ({ status }) => {
  return (
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
  )
}

export default ActivationView
