"use client"

import React from 'react'
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation'

const NotFoundBtn = ({ children }: { children: any }) => {
    const router = useRouter();

  return (
    <Button onClick={() => router.back()}>{children}</Button>
  )
}

export default NotFoundBtn