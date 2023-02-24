'use client';

import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForgotPasswordMutation } from '__generated__/graphql.client'

import * as z from 'zod'

import { TextField, Box, Typography } from '@mui/material'
import { FC } from 'react'
import { toast } from 'react-toastify'
import { CustomButton } from './CustomButton'

const schema = z.object({
  email: z.string().min(1).email(),
})

type SchemaType = z.infer<typeof schema>

export const ForgotPasswordForm: FC = () => {
  const [, forgotPasswordMutation] = useForgotPasswordMutation()

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<SchemaType>({
    defaultValues: {
      email: '',
    },
    mode: 'onTouched',
    resolver: zodResolver(schema),
  })

  const onSubmit: SubmitHandler<SchemaType> = async (data) => {
    try {
      const { error } = await forgotPasswordMutation(data)

      if (error) {
        toast.error(error.message)
        return
      }
      reset()
      toast.success('You have reset your password. Check your email.')
    } catch {
      toast.error('Something went wrong')
    }
  }

  return (
    <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)} display="grid" gap={1.5}>
      <Typography variant="h2">Remind your password</Typography>
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

        <CustomButton variant="contained" aria-label="sign up" type="submit">
          Submit
        </CustomButton>
      </Box>
    </Box>
  )
}
