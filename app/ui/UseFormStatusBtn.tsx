import { Button } from '@/components/ui/button';
import React from 'react'
import { useFormStatus } from 'react-dom'

const UseFormStatusBtn = ({ children }: { children: any }) => {
    const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>{ pending ? "Loading..." : children }</Button>
  )
}

export default UseFormStatusBtn