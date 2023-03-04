'use client'

import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useLoginUserMutation } from '__generated__/graphql.client'

import * as z from 'zod'

import { TextField, Box, InputAdornment, IconButton, Typography } from '@mui/material'
import { VisibilityOff as VisibilityOffIcon, Visibility as VisibilityIcon } from '@mui/icons-material'
import { FC, useState } from 'react'
import { toast } from 'react-toastify'
import { APP_ROUTES } from 'utils/routes'
import { CustomButton } from '../../components/CustomButton'
import { useRouter } from 'next/navigation'
import { useUser } from 'context/user/useUser'

const schema = z.object({
  email: z.string().min(1).email(),
  password: z.string().min(1),
})

type SchemaType = z.infer<typeof schema>

export const LoginForm: FC = () => {
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const { updateUser } = useUser()

  const toggleShowPassword = (): void => {
    setShowPassword((value) => !value)
  }

  const [, loginUserMutation] = useLoginUserMutation()

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SchemaType>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onTouched',
    resolver: zodResolver(schema),
  })

  const onSubmit: SubmitHandler<SchemaType> = async (values) => {
    try {
      const { data, error } = await loginUserMutation({ ...values })

      if (error) {
        toast.error(error.message)
        return
      }
      toast.success('You have been logged successfully.')

      if (data) {
        const profile = data.login

        updateUser({
          id: profile.id,
          email: profile.email,
          isFetched: true,
          isUserLoggedIn: true,
        })

        await router.push(APP_ROUTES.LANDING)
      }
    } catch {
      toast.error('Something went wrong')
    }
  }

  return (
    <Box maxWidth={500} mx="auto">
      <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)} display="grid" gap={2}>
        <Typography variant="h2">Log in</Typography>
        <Box>
          <TextField
            required
            id="input-email"
            label="Email"
            variant="outlined"
            margin="dense"
            fullWidth
            type="email"
            {...register('email')}
            error={Boolean(errors.email)}
            helperText={errors.email?.message}
          />
          <TextField
            required
            id="input-password"
            label="Password"
            variant="outlined"
            margin="dense"
            fullWidth
            type={showPassword ? 'text' : 'password'}
            {...register('password')}
            error={Boolean(errors.password)}
            helperText={errors.password?.message}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={toggleShowPassword}
                    onMouseDown={(e) => {
                      e.preventDefault()
                    }}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <CustomButton aria-label="forgot password" href={APP_ROUTES.FORGOT_PASSWORD}>
          Forgot your password?
        </CustomButton>

        <CustomButton variant="contained" aria-label="log in" type="submit">
          Log in
        </CustomButton>

        <Typography variant="subtitle1" align="center">
          or
        </Typography>

        <CustomButton variant="outlined" aria-label="sign up" href={APP_ROUTES.SIGN_UP}>
          Sign up
        </CustomButton>
      </Box>
    </Box>
  )
}
