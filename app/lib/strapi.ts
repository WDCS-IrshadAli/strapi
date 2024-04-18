"use server";

import { revalidatePath } from "next/cache";

const BearerToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNzEzNDE4MzI0LCJleHAiOjE3MTYwMTAzMjR9.D9NdgUn54iGX551w6r9uGBiulVFrs0N2OlfG8906Xao";
const AppUrl = "http://localhost:1337";

// menus api data
export const getAllMenusData = async () => {
    try {
        let sidebarMenuData = await fetch(`${AppUrl}/api/menus?nested&populate=*`, {
            headers: {
                "Authorization": `Bearer ${BearerToken}`,
            },
            cache: "no-store"
        });
        sidebarMenuData = await sidebarMenuData.json();
        return sidebarMenuData;
    } catch (err) {        
        throw new Error("Error came while fetching menus data");
    }
}

// custom modules get api data
export const getAllModulesData = async (routeParams: any) => {
    let errorMsg = "Error came while fetching modules data";
    try {
        let data: any = await fetch(`${AppUrl}/api/${routeParams}`, {
            headers: {
                "Authorization": `Bearer ${BearerToken}`,
            },
            cache: "no-cache"
        });
        data = await data.json();
        console.log("FOR PAGE NOT FOUND ERROR = ", data);
        if (data?.error?.name === "NotFoundError") {
            errorMsg = "404 Page Not Found";
            console.log("dd");
            
            throw new Error(errorMsg);
        }
        if (data?.error?.name === "ForbiddenError") {
            errorMsg = "You're not authorized to access this page";
            console.log("xx");
            
            throw new Error(errorMsg);
        }
        data = data?.data?.map((item: any) => {
            const { attributes, ...rest } = item;
            const { createdAt, updatedAt, publishedAt, ...attributesWithoutTimestamps } = attributes;
            return { ...rest, attributes: attributesWithoutTimestamps };
        });
        return data;  
    } catch (err) {
        console.log("dddddd");
        
        throw new Error(errorMsg);
    }
};

// dynamic input field form data api
export const getDynamicForm = async (uri: any) => {
    try {
        let dynamicFieldsData = await fetch(`${AppUrl}/api/content-type-builder/content-types/api::${uri}.${uri}`, {
            headers: {
                "Authorization": `Bearer ${BearerToken}`,
            },
            cache: "no-store"
        });
        dynamicFieldsData = await dynamicFieldsData.json();
        return dynamicFieldsData;
    } catch (err) {
        throw new Error("Error came while fetching menus data");
    }
}

// dynamic form (create api)
export const createDynamicModuleData = async (moduleName: string, prevState: ProductFormStateTypeProps, formData: FormData) => {   
    try {
        const rawFormData = Object.fromEntries(formData.entries());                
        let dynamicFieldsData: any = await fetch(`${AppUrl}/api/${moduleName}`, {
            method:"POST",
            body: JSON.stringify(rawFormData),
            headers: {
                "Authorization": `Bearer ${BearerToken}`,
            },
        });        
        dynamicFieldsData = await dynamicFieldsData.json()
        console.log("RESPONSE = ", dynamicFieldsData);
        if (dynamicFieldsData.error) {
            return {
                error: `${dynamicFieldsData?.error?.details?.errors == undefined ? dynamicFieldsData?.error?.message : dynamicFieldsData?.error?.details?.errors[0]?.message}`,
                success: false
            }    
        }
        revalidatePath(`/admin/${moduleName}`);
        return {
            message: `${moduleName} added successfully`,
            success: true
        } 
    } catch (err: any) {
        return {
            error: `Internal Server Error (${err.message})`,
            success: false
        }
    }
}

// dynamic form (delete api)
export const deleteDynamicModuleData = async (delUserId: any, moduleName: any, prevState: ProductFormStateTypeProps, formData: FormData) => {
    try {        
        let dynamicFieldsData: any = await fetch(`${AppUrl}/api/${moduleName}/${delUserId}`, {
            method :"DELETE",
            headers : {
                "Authorization": `Bearer ${BearerToken}`,
            },
        });
        dynamicFieldsData = await dynamicFieldsData.json()
        console.log("RESPONSE = ", dynamicFieldsData);
        if (dynamicFieldsData.error) {
            return {
                error: `${dynamicFieldsData?.error?.details?.errors == undefined ? dynamicFieldsData?.error?.message : dynamicFieldsData?.error?.details?.errors[0]?.message}`,
                success: false
            }    
        }
        revalidatePath(`/admin/${moduleName}`);
        return {
            message: `${moduleName} deleted successfully`,
            success: true
        }
    } catch (err: any) {
        return {
            error: `Internal Server Error (${err.message})`,
            success: false
        }
    }
}

// dynamic form (get particulat id data)
export const getPaticularDynamicModuleData = async (moduleName: any, params: any) => {
    try {
        let dynamicFieldsData = await fetch(`${AppUrl}/api/${moduleName}/${params.id}`, {
            headers: {
                "Authorization": `Bearer ${BearerToken}`,
            },
            cache: "no-store"
        });
        dynamicFieldsData = await dynamicFieldsData.json();
        return dynamicFieldsData;
    } catch (err) {
        throw new Error("Error came while fetching menus data");
    }
}

// dynamic form (create api)
export const updateDynamicModuleData = async (moduleName: string, userId: any, prevState: ProductFormStateTypeProps, formData: FormData) => {   
    try {
        const rawFormData = Object.fromEntries(formData.entries());                
        let dynamicFieldsData: any = await fetch(`${AppUrl}/api/${moduleName}/${userId}`, {
            method: "PUT",
            body: JSON.stringify(rawFormData),
            headers: {
                "Authorization": `Bearer ${BearerToken}`,
            },
        });        
        dynamicFieldsData = await dynamicFieldsData.json()
        console.log("RESPONSE = ", dynamicFieldsData);
        if (dynamicFieldsData.error) {
            return {
                error: `${dynamicFieldsData?.error?.details?.errors == undefined ? dynamicFieldsData?.error?.message : dynamicFieldsData?.error?.details?.errors[0]?.message}`,
                success: false
            }    
        }
        revalidatePath(`/admin/${moduleName}`);
        return {
            message: `${moduleName} updated successfully`,
            success: true
        } 
    } catch (err: any) {
        return {
            error: `Internal Server Error (${err.message})`,
            success: false
        }
    }
}

// custom routes (faq count)
export const customRouteFaqsCount = async () => {
    try {
        let faqsCount = await fetch(`${AppUrl}/api/faqs/count`, {
            headers: {
                "Authorization": `Bearer ${BearerToken}`,
            },
            cache: "no-store"
        });
        faqsCount = await faqsCount.json();
        return faqsCount;
    } catch (err) {
        throw new Error("Error came while fetching menus data");
    }
}


// export const getDynamicForm = async (uidx: any) => {
//     try {
//         let labelField = await fetch(`http://localhost:1337/content-manager/content-types/${uidx}/configuration`, {
//             headers: {
//                 "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzExMDg4NzcyLCJleHAiOjE3MTM2ODA3NzJ9.YaTeOI9TTO7OaeF-sXoJuGNA1BM79NXOt9DifSVgpog"
//             }
//         });
//         labelField = await labelField.json();

//         let inputValidation = await fetch(`http://localhost:1337/content-type-builder/content-types/${uidx}`, {
//             headers: {
//                 "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzExMDg4NzcyLCJleHAiOjE3MTM2ODA3NzJ9.YaTeOI9TTO7OaeF-sXoJuGNA1BM79NXOt9DifSVgpog"
//             }
//         });
//         inputValidation = await inputValidation.json();

//         console.log("kkkkkkkkkkkkkkk", uidx);
        
//         const labelAttributes = inputValidation.data.schema.attributes;
//         console.log("ccccccccccccc", labelAttributes);

//         const data = {
//             uid: inputValidation.data.uid,
//             apiID: inputValidation.data.apiID,
//             formFields: Object.keys(labelAttributes).map(key => {
//                 const attribute = labelAttributes[key];
//                 const metadata = labelField.data.contentType.metadatas[key];
            
//                 return {
//                     name: key,
//                     type: attribute.type,
//                     required: attribute.required || false,
//                     maxLength: attribute.maxLength || null,
//                     minLength: attribute.minLength || null,
//                     label: metadata.edit.label,
//                     description: metadata.edit.description || "",
//                     placeholder: metadata.edit.placeholder || "",
//                     visible: metadata.edit.visible || false,
//                     editable: metadata.edit.editable || false
//                 };
//             })
//         }

//         return data;    
//     } catch (err) {
//         throw new Error("Error came while fetching dynamic form data");
//     }
// }
