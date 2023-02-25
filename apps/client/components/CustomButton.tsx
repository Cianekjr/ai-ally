'use client'

import { Button, ButtonProps } from '@mui/material'
import Link from 'next/link'
import { FC, ReactNode } from 'react'

interface CustomButtonProps extends ButtonProps {
  children: ReactNode
}

export const CustomButton: FC<CustomButtonProps> = ({ children, href, ...props }) => {
  return href ? (
    <Link href={href}>
      <Button {...props}>{children}</Button>
    </Link>
  ) : (
    <Button {...props}>{children}</Button>
  )
}
