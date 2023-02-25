'use client'

import { Link, LinkProps } from '@mui/material'
import NextLink from 'next/link'
import { FC, ReactNode } from 'react'

interface CustomLinkProps extends LinkProps {
  children: ReactNode
}

export const CustomLink: FC<CustomLinkProps> = ({ children, ...props }) => {
  return (
    <Link component={NextLink} {...props}>
      {children}
    </Link>
  )
}
