'use client' // Error components must be Client Components
 
import { useEffect } from 'react'
import { Button } from "@/components/ui/button"
 
export default function Error({ error, reset }: {error: Error & { digest?: string }, reset: () => void }) {
  
  // useEffect Hook
  useEffect(() => {
    console.error(error);
  }, [error])
 
  return (
    <div className="bg-black text-white p-3 sm:p-28 w-full flex justify-center items-center flex-col h-[100vh]">
        <h1 className="text-2xl mb-4 text-center">Something went wrong! ({error?.message})</h1>
        <Button onClick={() => reset()} variant="secondary">Try again</Button>
    </div>
  )
}