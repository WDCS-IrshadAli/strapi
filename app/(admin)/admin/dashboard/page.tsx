import React, { Suspense } from 'react'
import {
  BarChartIcon,
  InfoCircledIcon,
  LayersIcon,
  PersonIcon
} from "@radix-ui/react-icons"
import { getAllCategories, getAllProducts, getAllUsers } from '@/app/lib/actions'
import { Skeleton } from "@/components/ui/skeleton"
import { customRouteFaqsCount } from '@/app/lib/strapi'

const Dashboard = () => {
  return (
    <div className="py-3 sm:py-6">
      <div className="flex flex-row justify-between mb-4 px-3 sm:px-6">
        <h1 className="text-2xl">Dashboard</h1>
      </div>

      <div className="overflow-x-auto overflow-y-auto w-full h-[75vh] px-3 sm:px-6 mb-4">

        <div className="flex flex-wrap gap-4">

          <Suspense fallback={<DashboardCardSkeleton />}>
            <FaqsData />
          </Suspense>

          {/* <Suspense fallback={<DashboardCardSkeleton />}>
            <UsersData />
          </Suspense>

          <Suspense fallback={<DashboardCardSkeleton />}>
            <CategoriesData />
          </Suspense>           */}
        
        </div>
  
      </div>
    </div>
  )
}

export default Dashboard

function DashboardCardSkeleton () {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[60px] w-[70vw] sm:w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[70vw] sm:w-[250px]" />
        <Skeleton className="h-4 w-[60vw] sm:w-[200px]" />
      </div>
    </div>
  )
}

async function FaqsData () {
  const FaqsData: any = await customRouteFaqsCount();
  console.log();
  

  return (
    <div className="bg-gray-900 rounded-xl p-4 flex flex-col justify-center">
      <h1 className="text-xs text-gray-500">Total Faqs</h1>
      <p className="text-3xl flex flex-row items-center gap-1 mt-1 mb-2">
        <BarChartIcon className="text-green-500 h-8 w-8" />
        {FaqsData}
      </p>
      <h3 className="text-xs text-gray-500 font-normal flex flex-row gap-2"><InfoCircledIcon /> For visualization (custom route faqs count).</h3>
    </div>
  )
}

async function UsersData () {
  const usersData: any = await getAllUsers();  

  return (
    <div className="bg-gray-900 rounded-xl p-4 flex flex-col justify-center">
      <h1 className="text-xs text-gray-500">Total Users</h1>
      <p className="text-3xl flex flex-row items-center gap-1 mt-1 mb-2">
        <PersonIcon className="text-blue-800 h-8 w-8" />
        {usersData?.length}
      </p>
      <h3 className="text-xs text-gray-500 font-normal flex flex-row gap-2"><InfoCircledIcon /> For visualization (To get more info go to links).</h3>
    </div>
  )
}

async function CategoriesData () {
  const categoriesData: any = await getAllCategories();

  return (
    <div className="bg-gray-900 rounded-xl p-4 flex flex-col justify-center">
      <h1 className="text-xs text-gray-500">Total Categories</h1>
      <p className="text-3xl flex flex-row items-center gap-1 mt-1 mb-2">
        <LayersIcon className="text-orange-700 h-8 w-8" />
        {categoriesData?.length}
      </p>
      <h3 className="text-xs text-gray-500 font-normal flex flex-row gap-2"><InfoCircledIcon /> For visualization (To get more info go to links).</h3>
    </div>
  )
}