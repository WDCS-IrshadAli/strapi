import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { getAllCategories } from "../lib/actions";

const CategoriesDropdown = async ({ data }: { data: any }) => {    
    const catData: any = await getAllCategories();
    return (
    <>
        <Select name="categories" defaultValue={data===null ? undefined : data}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Categories" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Select Categories</SelectLabel>
                    {
                        catData?.map((curElem: string, index: number) => {                            
                            return (
                                <SelectItem key={index} value={curElem} className="capitalize">{curElem}</SelectItem>
                            )
                        })
                    }
                </SelectGroup>
            </SelectContent>
        </Select>
    </>
  )
}

export default CategoriesDropdown