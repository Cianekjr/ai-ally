'use client'

import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCreatePasswordMutation } from '__generated__/graphql.client'

import * as z from 'zod'

import { TextField, Box, Typography, InputAdornment, IconButton } from '@mui/material'
import { VisibilityOff as VisibilityOffIcon, Visibility as VisibilityIcon } from '@mui/icons-material'
import { FC, useState } from 'react'
import { toast } from 'react-toastify'
import { CustomButton } from 'components/CustomButton'
// eslint-disable-next-line import/named
import { useSearchParams } from 'next/navigation'

const schema = z
  .object({
    password: z.string().min(8),
    repeatedPassword: z.string(),
  })
  .refine((data) => data.password === data.repeatedPassword, {
    message: "Passwords don't match",
    path: ['repeatedPassword'],
  })

type SchemaType = z.infer<typeof schema>

export const CreatePasswordForm: FC = () => {
  const params = useSearchParams()
  const [, createPasswordMutation] = useCreatePasswordMutation()

  const [showPassword, setShowPassword] = useState(false)
  const [showRepeatedPassword, setShowRepeatedPassword] = useState(false)

  const toggleShowPassword = (): void => {
    setShowPassword((value) => !value)
  }

  const toggleRepeatedShowPassword = (): void => {
    setShowRepeatedPassword((value) => !value)
  }

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<SchemaType>({
    defaultValues: {
      password: '',
      repeatedPassword: '',
    },
    mode: 'onTouched',
    resolver: zodResolver(schema),
  })

  const onSubmit: SubmitHandler<SchemaType> = async (data) => {
    try {
      const formData = {
        password: data.password,
        forgotPasswordToken: params.get('token') || '',
      }

      const { error } = await createPasswordMutation(formData)

      if (error) {
        toast.error(error.message)
        return
      }
      reset()
      toast.success('Your password has been reset. You can sign in.')
    } catch {
      toast.error('Something went wrong')
    }
  }

  return (
    <Box maxWidth={500} mx="auto">
      <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)} display="grid" gap={1.5}>
        <Typography variant="h2">Create new password</Typography>
        <Box>
          <TextField
            required
            id="input-password"
            label="New password"
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
            label="Repeat new password"
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
          Submit
        </CustomButton>
      </Box>
    </Box>
  )
}
