'use client'

import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useResultImagesQuery } from '__generated__/graphql.client'

import * as z from 'zod'

import { TextField, Box, Typography } from '@mui/material'
import { FC } from 'react'
import { toast } from 'react-toastify'
import { CustomButton } from 'components/CustomButton'

const schema = z.object({
  content: z.string().min(1),
})

type SchemaType = z.infer<typeof schema>

export const View: FC = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm<SchemaType>({
    defaultValues: {
      content: '',
    },
    mode: 'onTouched',
    resolver: zodResolver(schema),
  })

  const [{ data }, refetchResultImages] = useResultImagesQuery({
    variables: {
      content: getValues('content') || '',
    },
    pause: true,
  })

  const onSubmit: SubmitHandler<SchemaType> = async () => {
    try {
      refetchResultImages({
        requestPolicy: 'network-only',
      })
    } catch {
      toast.error('Something went wrong')
    }
  }

  return (
    <Box maxWidth={500} mx="auto">
      <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)} display="grid" gap={2}>
        <Typography variant="h2">Images cache</Typography>
        <Box>
          <TextField
            required
            id="input-content"
            label="Content"
            variant="outlined"
            margin="dense"
            fullWidth
            type="content"
            {...register('content')}
            error={Boolean(errors.content)}
            helperText={errors.content?.message}
          />
        </Box>

        <CustomButton variant="contained" aria-label="fetch images" type="submit">
          Fetch
        </CustomButton>
      </Box>
    </Box>
  )
}
