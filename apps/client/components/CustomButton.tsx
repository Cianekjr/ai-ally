'use client'

import { Button, ButtonProps } from '@mui/material'
import type { Route } from 'next'
import Link from 'next/link'
import { ReactNode } from 'react'

type CustomButtonProps<T extends string> = Omit<ButtonProps, 'href'> & {
  children: ReactNode
  href?: Route<T> | URL
}

export const CustomButton = <T extends string>({ children, href, ...props }: CustomButtonProps<T>) => {
  return href ? (
    <Link href={href}>
      <Button {...props}>{children}</Button>
    </Link>
  ) : (
    <Button {...props}>{children}</Button>
  )
}
