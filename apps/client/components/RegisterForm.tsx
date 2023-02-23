import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRegisterUserMutation } from '__generated__/graphql'

import * as z from 'zod'

import { TextField, Box, InputAdornment, IconButton, Typography, FormHelperText } from '@mui/material'
import { VisibilityOff as VisibilityOffIcon, Visibility as VisibilityIcon } from '@mui/icons-material'
import { FC, useState } from 'react'
import { toast } from 'react-toastify'
import { APP_ROUTES } from 'utils/routes'
import { CustomButton } from './CustomButton'

const schema = z.object({
  email: z.string().min(1).email(),
  password: z.string().min(8),
  repeatedPassword: z.string(),
}).refine((data) => data.password === data.repeatedPassword, {
  message: "Passwords don't match",
  path: ['repeatedPassword'],
})

type SchemaType = z.infer<typeof schema>

export const RegisterForm: FC = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showRepeatedPassword, setShowRepeatedPassword] = useState(false)

  const toggleShowPassword = (): void => {
    setShowPassword(value => !value)
  }

  const toggleRepeatedShowPassword = (): void => {
    setShowRepeatedPassword(value => !value)
  }

  const [, registerUserMutation] = useRegisterUserMutation()

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
    reset,
    trigger,
  } = useForm<SchemaType>({
    defaultValues: {
      email: '',
      password: '',
      repeatedPassword: '',
    },
    mode: 'onTouched',
    resolver: zodResolver(schema),
  })

  const onSubmit: SubmitHandler<SchemaType> = async (data) => {
    try {
      const { error } = await registerUserMutation(data)

      if (error) {
        toast.error(error.message)
        return
      }
      reset()
      toast.success('You have been registered successfully. Check your email.')
    } catch {
      toast.error('Something went wrong')
    }
  }

  return (
    <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)} display="grid" gap={1.5}>
      <Typography variant="h2">Create account</Typography>
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
        <TextField
          required
          id="input-repeated-password"
          label="Repeat password"
          variant="outlined"
          margin="dense"
          fullWidth
          type={showRepeatedPassword ? 'text' : 'password'}
          {...register('repeatedPassword')}
          error={Boolean(errors.repeatedPassword)}
          helperText={errors.repeatedPassword?.message}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle repeated password visibility"
                  onClick={toggleRepeatedShowPassword}
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

      <CustomButton variant="contained" aria-label="sign up" type="submit">
        Sign up
      </CustomButton>

      <Typography variant="subtitle1" align="center">or</Typography>

      <CustomButton variant="outlined" aria-label="log in" href={APP_ROUTES.SIGN_IN}>
        Log in
      </CustomButton>
    </Box>
  )
}
