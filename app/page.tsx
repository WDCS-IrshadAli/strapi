import React from 'react';
import { getAllProducts } from './lib/actions';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

const Home = async () => {
  const data: any = await getAllProducts();
  
  return (
    <>
      <div className="">
        <div className="px-4 pb-10 pt-8">

          <div className="text-4xl text-gray-500 font-semibold mb-8 italic flex flex-row items-center">
            <span className="mr-4">Products</span>
            <Button>
              <Link href="/authadmin/login">Admin</Link>
            </Button>          
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 xl:gap-x-8">
            
            {
              data?.map((curElem: any, index: number) => {
                return (
                  <Link key={index} href="#" className="group">
                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                      <Image 
                        src={curElem?.image} 
                        height="100" 
                        width="100" 
                        alt="Tall slender porcelain bottle with natural clay textured body and cork stopper." 
                        className="h-60 w-full object-contain p-8 md:p-10 object-center group-hover:opacity-75" />
                    </div>
                    <div className="px-2">
                      <h4 className="mt-4 text-[12px] font-semibold text-gray-500">{curElem?.category}</h4>
                      <h2 className="text-sm text-gray-900">{curElem?.title}</h2>
                      <p className="mt-1 text-sm font-semibold text-gray-900">${curElem?.price}</p>
                    </div>
                  </Link>
                )
              })
            }

          </div>
        </div>
      </div>
    </>
  )
}

export default Home