'use client'

import { Box, IconButton, Modal } from '@mui/material'
import { FC, ReactElement } from 'react'
import { Close as CloseIcon } from '@mui/icons-material'

interface CustomModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactElement
  isCloseButton?: boolean
}

export const CustomModal: FC<CustomModalProps> = ({ isOpen, onClose, children, isCloseButton = true }) => {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      sx={{
        '&.MuiModal-root': { display: 'flex', alignItems: 'center', justifyContent: 'center' },
      }}
    >
      <Box bgcolor="background.paper" borderRadius={1} position="relative">
        {isCloseButton && (
          <IconButton aria-label="close modal" onClick={onClose} sx={{ p: 1, position: 'absolute', right: 0, top: 0 }}>
            <CloseIcon />
          </IconButton>
        )}
        {children}
      </Box>
    </Modal>
  )
}
