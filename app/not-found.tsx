import React from 'react'
import NotFoundBtn from './ui/NotFoundBtn'

const NotFound = () => {
  return (
    <>
        <div className="bg-black text-white w-full h-[100dvh] flex flex-col justify-center items-center gap-6">
            <div className="flex flex-row gap-3 justify-center items-center">
              <span className="text-lg">404</span>
              <span className="text-3xl">|</span>
              <span className="text-lg">Not Found</span>
            </div>
            <div>
              <NotFoundBtn>Click here to go back</NotFoundBtn>
            </div>
        </div>
    </>
  )
}

export default NotFound