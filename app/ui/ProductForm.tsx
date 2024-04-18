"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useFormState } from 'react-dom'
import {Toaster, toast} from "sonner";
import { addProduct, editProduct } from '@/app/lib/actions'
import { useRouter } from 'next/navigation'
import UseFormStatusBtn from "./UseFormStatusBtn"
import Image from "next/image"

const ProductForm = ({ children, title, data, formType, userId }: { children: any, title: string, data: any, formType: string, userId: string | null }) => {
  
  // conditions
  const editProductWithId = userId===null ? "" : editProduct.bind(null, Number(userId))
  const serverAction: any = formType==="productAdd" ? addProduct : formType==="productEdit" ? editProductWithId : "";  

  const router  = useRouter();
  const initialState: ProductFormStateTypeProps = { message: null, error: null, success: null };
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
      router.push("/admin/products")
    }, 1000)
  }

  return (
    <>
      <div className="py-3 sm:py-6">
      <Toaster position="top-right" theme="dark" richColors />
        <h1 className="text-2xl px-3 sm:px-6 mb-4">{title}</h1>

        <div className="overflow-x-auto overflow-y-auto w-full h-[75vh] px-3 sm:px-6">

          <form action={dispatch} className="flex flex-col gap-3">

            <div className="grid w-full max-w-sm items-center gap-2">
              <Label htmlFor="title" className="text-xs">Title</Label>
              <Input type="text" id="title" placeholder="Title" name="title" className="font-normal" defaultValue={data===null ? "" : data?.title} />
              <span className="text-xs font-normal text-gray-300">This is your public display title.</span>
            </div>

            <div className="grid w-full max-w-sm items-center gap-2">
              <Label htmlFor="price" className="text-xs">Price</Label>
              <Input type="number" id="price" name="price" placeholder="Price" className="font-normal" defaultValue={data===null ? "" : data?.price} />
            </div>

            <div className="grid w-full max-w-sm items-center gap-2">
              <Label htmlFor="description" className="text-xs">Description</Label>
              <Input type="text" id="description" name="description" placeholder="Description" className="font-normal" defaultValue={data===null ? "" : data?.description} />
            </div>

            <div className="grid w-full max-w-sm items-center gap-2">
              <div className="flex flex-row items-center">
                <Label htmlFor="image" className="text-xs">Image</Label>
                {
                  data===null ? "" : (
                    <>
                      <Image src={data?.image} alt="Image" width={20} height={20} className="ms-3 h-12 w-12 p-2 rounded-full object-contain bg-white" />
                      <Input type="hidden" name="oldImage" className="font-normal" defaultValue={data?.image} />
                    </>
                  )
                }
              </div>
              <Input id="image" type="file" name="image" className="font-normal" />
            </div>

            <div className="grid w-full max-w-sm items-center gap-2">
              <Label htmlFor="image" className="text-xs">Categories</Label>
              {children}
            </div>
            
            <div className="grid w-full max-w-sm items-center gap-2">
              <UseFormStatusBtn>Submit</UseFormStatusBtn>
            </div>

          </form>

        </div>
      </div>
    </>
  )
}

export default ProductForm