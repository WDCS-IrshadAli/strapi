import React from 'react'
import CategoriesDropdown from '@/app/ui/CategoriesDropdown'
import DynamicForm from '@/app/ui/DynamicForm'
import { getDynamicForm, getPaticularDynamicModuleData } from '@/app/lib/strapi'
import UpdateDynamicForm from '@/app/ui/UpdateDynamicForm'

const EditDynamicForm = async ({ params }: { params: any }) => {
  let moduleNameForUri: any = params?.modules.slice(0,-1);  
  const data: any = await getDynamicForm(moduleNameForUri);
  
  const particularData: any = await getPaticularDynamicModuleData(params.modules, params);
  console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", particularData);

  return (
    <>
      <UpdateDynamicForm data={data} moduleName={params?.modules} particularData={particularData} userId={params?.id} /> 
    </>
  )
}

export default EditDynamicForm