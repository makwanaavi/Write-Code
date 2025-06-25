'use client'
import { Button } from '@/components/ui/button'
import React from 'react'
import { signOut } from 'next-auth/react'

const DashBoard = () => {
  return (
    <div>DashBoard
      <Button onClick={() => signOut()}>LogOut</Button>
    </div>
  )
}

export default DashBoard