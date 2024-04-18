import React from 'react'
import CategoriesDropdown from '@/app/ui/CategoriesDropdown'
import DynamicForm from '@/app/ui/DynamicForm'
import { getDynamicForm } from '@/app/lib/strapi'

const AddDynamicForm = async ({ params }: { params: any }) => {
  let moduleNameForUri: any = params?.modules.slice(0,-1);  
  const data: any = await getDynamicForm(moduleNameForUri);
  
  return (
    <>
      <DynamicForm data={data} moduleName={params?.modules} /> 
    </>
  )
}

export default AddDynamicForm