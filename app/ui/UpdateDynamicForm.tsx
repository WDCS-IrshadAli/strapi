"use client"
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from '@/components/ui/textarea'
import { updateDynamicModuleData } from '../lib/strapi'
import { useFormState } from 'react-dom'
import { Toaster, toast } from 'sonner'
import { useRouter } from 'next/navigation'


const UpdateDynamicForm = ({ data, moduleName, particularData, userId }: { data: any, moduleName: any, particularData: any, userId: any }) => {
      const router  = useRouter();

      // dynamic form handling
      const formElements = Object.keys(data?.data.schema.attributes).map(
        (fieldName, index) => {            
          const fieldData = data.data.schema.attributes[fieldName];
          let inputElement = null;          
    
          switch (fieldData.type) {
            case "string":
            case "email":
            case "password":
              inputElement = (
                <Input
                  className="placeholder:font-normal font-normal"
                  type={
                    fieldData.type === "password"
                      ? "password"
                      : fieldData.type === "email"
                      ? "email"
                      : "text"
                  }
                  name={fieldName}
                  placeholder={fieldName.charAt(0).toUpperCase()+fieldName.slice(1) || ""}
                  required={fieldData.required}
                  minLength={fieldData.minLength}
                  maxLength={fieldData.maxLength}
                  defaultValue={
                    particularData && fieldName in particularData.data.attributes
                        ? particularData.data.attributes[fieldName]
                        : ""
                  }
                  id={fieldName}
                  // onChange={handleChange}
                />
              );
              break;

            case "enumeration":
              inputElement = (
                  <Select name={fieldName} defaultValue={
                    particularData && fieldName in particularData.data.attributes
                        ? particularData.data.attributes[fieldName]
                        : ""
                    }>
                    <SelectTrigger id={fieldName} name={fieldName} className="w-full">
                      <SelectValue placeholder={`Select ${fieldName}`} />
                    </SelectTrigger>
                  
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>{`Select ${fieldName}`}</SelectLabel>
                          {fieldData.enum.map((option: any, index: any) => (
                            <SelectItem key={index} value={option}>{option}</SelectItem>
                          ))}
                      </SelectGroup>
                    </SelectContent>
                </Select>
              );
              break;

            case "boolean":
              inputElement = (
                  <RadioGroup id={fieldName} name={fieldName} required={fieldData.required} 
                    defaultValue={
                        particularData && fieldName in particularData.data.attributes
                            ? `${particularData.data.attributes[fieldName]}`
                            : "null"
                    }>
                    {/* <div className="flex items-center space-x-2">
                      <RadioGroupItem value={"null"} id="r1" />
                      <Label htmlFor="r1">Null</Label>
                    </div> */}
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value={"true"} id="r2" />
                      <Label htmlFor="r2">True</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value={"false"} id="r3" />
                      <Label htmlFor="r3">False</Label>
                    </div>
                  </RadioGroup>
              );
              break;

            case "decimal":
            case "integer":
            case "big integer":
            case "float":
              inputElement = (
                <Input
                  className="placeholder:font-normal font-normal"
                  type="number"
                  placeholder={fieldName}
                  name={fieldName}
                  required={fieldData.required}
                  defaultValue={
                    particularData && fieldName in particularData.data.attributes
                        ? particularData.data.attributes[fieldName]
                        : ""
                  }
                  id={fieldName}
                  //   onChange={handleChange}
                />
              );
              break;

            case "date":
            case "datetime":
              inputElement = (
                <Input
                  className="placeholder:font-normal font-normal"
                  type="date"
                  name={fieldName}
                  required={fieldData.required}
                  defaultValue={
                    particularData && fieldName in particularData.data.attributes
                        ? particularData.data.attributes[fieldName]
                        : ""
                  }
                  id={fieldName}
                  //   onChange={handleChange}
                />
              );
              break;

            case "text":
            case "richtext":
              inputElement = (
                <Textarea
                  className="placeholder:font-normal font-normal"
                  placeholder={fieldName}
                  required={fieldData.required}
                  name={fieldName}
                  minLength={fieldData.minLength}
                  maxLength={fieldData.maxLength}
                  defaultValue={
                    particularData && fieldName in particularData.data.attributes
                        ? particularData.data.attributes[fieldName]
                        : ""
                  }
                  id={fieldName}
                  rows={5}
                  //  onChange={handleChange}
                />
              );
              break;

            case "media":
              inputElement = (
                  <Input
                    type="file"
                    id={fieldName}
                    accept={fieldData.allowedTypes.join(",")}
                    multiple={fieldData.multiple}
                    name={fieldName}
                    required={fieldData.required}
                    // onChange={handleFileChange}
                  />
              );
              break;

            default:
              inputElement = null;
          }
    
          return (
            fieldData.type !== "relation" && (
              <div key={index}>
                <Label htmlFor={fieldName} className="text-xs text-gray-600">{fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}</Label>
                {inputElement}
              </div>
            ))
        }
      );

      const initialState: ProductFormStateTypeProps = { message: null, error: null, success: null };
      const updateDataWithModuleName = moduleName===null ? "" : updateDynamicModuleData.bind(null, moduleName, userId);
      const serverAction: any = updateDataWithModuleName;  
      const [state, dispatch] = useFormState(serverAction, initialState);

      // error handling 
      if (state.success === false) {
        toast.error(state.error);
        state.success = null;
        state.error = null;
      } else if (state.success === true) {
        toast.success(state.message);
        state.success = null;
        state.message = null;
        setTimeout(() => {
          router.push(`/admin/${moduleName}`)
        }, 1000)
      }
    
      return (
        <>
          <div className="py-3 sm:py-6 pb-10 relative">
              <Toaster position="top-right" theme="dark" richColors />
              <h1 className="text-2xl px-3 sm:px-6 mb-4">Update {moduleName.charAt(0).toUpperCase() + moduleName.slice(1)}</h1>
              
              <div className="overflow-x-auto overflow-y-auto w-full h-[75vh] px-3 sm:px-6">

                <form action={dispatch} className="flex flex-col gap-3">
                  {formElements.map((curElem, index) => (

                    <div key={index} className="grid w-full max-w-sm items-center gap-2">
                      {curElem}
                    </div>
                  ))}

                  <div className="grid w-full max-w-sm items-center gap-2">
                    <Button type="submit">Submit</Button>
                  </div>        
                </form>

              </div>
          </div>
        </>
      );
}

export default UpdateDynamicForm
