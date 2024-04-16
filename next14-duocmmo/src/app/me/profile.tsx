'use client'
import { useAppContext } from '@/app/app-provider'
import React from 'react'


export default function Profile() {
   const {sessionToken} = useAppContext()
  return (
    <div>Profile</div>
  )
}
