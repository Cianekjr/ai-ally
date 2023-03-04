'use client'

import Image from 'next/image'
import NextLink from 'next/link'

import React, { FC, MouseEvent, useEffect, useState } from 'react'

import { Close as CloseIcon, Menu as MenuIcon, Logout as LogoutIcon } from '@mui/icons-material'
import { ListItemIcon, MenuItem, IconButton, Drawer, Box, Container, ListItemText, Divider, Avatar, Menu } from '@mui/material'
import { useLogoutQuery } from '__generated__/graphql.client'
import { toast } from 'react-toastify'
import { HEADER_HEIGHT } from 'utils/styles'
import { APP_ROUTES } from 'utils/routes'
import { CustomButton } from './CustomButton'
import { useUser } from 'context/user/useUser'

export const Header: FC = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false)
  const [isScrolled, setScrolled] = useState(false)

  const { user } = useUser()

  const [{ data, error }, reexecuteLogoutUser] = useLogoutQuery({ pause: true })

  useEffect(() => {
    const handleScroll = (): void => {
      setScrolled(window.pageYOffset > 50)
    }
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const isMenuOpened = Boolean(anchorEl)

  const openMenu = (event: MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget)
  }
  const closeMenu = (): void => {
    setAnchorEl(null)
  }

  const handleDrawerToggle = (): void => {
    setDrawerOpen(!isDrawerOpen)
  }

  const handleLogout = (): void => {
    reexecuteLogoutUser()
  }

  useEffect(() => {
    if (data?.logout) {
      // dispatch(logoutUser())

      toast.success('You have successfully been logged out')
    }
    if (error) {
      toast.error('Cannot logout user')
    }
  }, [data, error])

  return (
    <Box
      component="header"
      position="sticky"
      top="0"
      height={HEADER_HEIGHT}
      sx={{
        boxShadow: isScrolled ? '"0 4px 18px 0px rgba(0, 0, 0, 0.12), 0 7px 10px -5px rgba(0, 0, 0, 0.15)"' : '0 4px 18px 0px rgba(0, 0, 0, 0), 0 7px 10px -5px rgba(0, 0, 0, 0)',
      }}
    >
      <Container>
        <Box display="grid" alignItems="center" gridTemplateColumns="auto 1fr auto">
          <NextLink href="/">
            <Image src="/logo.png" alt="logo" width={100} height={40} />
          </NextLink>

          <Box height="100%" width="100%"></Box>

          <Box justifySelf="end" display="flex" alignItems="center" sx={{ visibility: user.isFetched ? 'visible' : 'hidden' }}>
            {user.isUserLoggedIn ? (
              <IconButton onClick={openMenu}>
                <Avatar variant="rounded" color="secondary" sx={{ bgcolor: 'text.primary' }} />
              </IconButton>
            ) : (
              <CustomButton sx={{ textTransform: 'uppercase' }} href={APP_ROUTES.SIGN_IN}>
                Sign in
              </CustomButton>
            )}
            <Divider orientation="vertical" variant="middle" flexItem light />
            <IconButton aria-label="open drawer" onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
          </Box>
        </Box>
        <Box>
          <Drawer
            variant="temporary"
            anchor="right"
            open={isDrawerOpen}
            sx={{
              '& .MuiDrawer-paper': {
                backgroundImage: 'none',
              },
            }}
            onClose={handleDrawerToggle}
          >
            <IconButton aria-label="close drawer" onClick={handleDrawerToggle} sx={{ alignSelf: 'end', m: 1 }}>
              <CloseIcon />
            </IconButton>

            {/* <MenuList>
              <NextLink href="/dashboard">
                <MenuItem sx={{ py: 1.5 }}>
                  <ListItemIcon>
                    <ExploreIcon fontSize="medium" />
                  </ListItemIcon>
                  <ListItemText>Explore locations</ListItemText>
                </MenuItem>
              </NextLink>
            </MenuList> */}
          </Drawer>
        </Box>

        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={isMenuOpened}
          onClose={closeMenu}
          onClick={closeMenu}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <NextLink href={APP_ROUTES.MY_PROFILE}>
            <MenuItem sx={{ py: 1.5 }}>
              <ListItemIcon>
                <Avatar variant="rounded" />
              </ListItemIcon>
              <ListItemText>Profile</ListItemText>
            </MenuItem>
          </NextLink>

          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </Container>
    </Box>
  )
}
