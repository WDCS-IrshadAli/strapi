import { getAllModulesData } from '@/app/lib/strapi';
import AdminModulesTable from '@/app/ui/AdminModulesTable';
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const DynamicPages = async ({ params }: {params: any}) => {
    const routeParams = params.modules;    
    const data: any = await getAllModulesData(routeParams);    

  return (
    <>
      <div className="py-3 sm:py-6">
          <div className="flex flex-row justify-between mb-4 px-3 sm:px-6">
            <h1 className="text-2xl">{routeParams.charAt(0).toUpperCase() + routeParams.slice(1)}</h1>
            <Button>
              <Link href={`/admin/${routeParams}/add`}>Add {routeParams.charAt(0).toUpperCase() + routeParams.slice(1)}</Link>
            </Button>
          </div>

          <div className="overflow-x-auto overflow-y-auto w-full h-[75vh] px-3 sm:px-6">
                <AdminModulesTable data={data} params={routeParams} />          
          </div>
      </div>
    </>
  )
}

export default DynamicPages