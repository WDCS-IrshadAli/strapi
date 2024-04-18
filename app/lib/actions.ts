"use server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { cookies } from 'next/headers'
import { redirect } from "next/navigation";
import { signIn, signOut } from '@/auth';
import {AuthError} from 'next-auth';
const PRODUCT_IMG_SIZE = 1024 * 1024 * 1; //1mb
const ACCEPTED_IMG_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

// fetching all products
export const getAllProducts = async () => {
    try {
        let data = await fetch('https://fakestoreapi.com/products');
        data = await data.json();
        return data;    
    } catch (err) {
        throw new Error("Error came while fetching products data");
    }
}

// delete product
export const deleteProduct = async (userId: number, prevState: ProductFormStateTypeProps, formData: FormData) => {
    try {
        let data = await fetch(`https://fakestoreapi.com/products/${userId}`,{ method: "DELETE" });
        data = await data.json();
        console.log(data);
        if (data === null) {
            return {
                success: false,
                error: "Error came while deleting product data"
            }    
        }
        return {
            success: true,
            message: "Product deleted successfully"
        }
    } catch (err) {
        return {
            success: false,
            error: "Internal Server Error (Error came while deleting product data)"
        }
    }
}

// add product
export const addProduct = async (prevState: ProductFormStateTypeProps, formData: FormData) => { 
    // product zod schema validation
    const productSchema = z.object({
        title: z.string().trim().min(3).max(100),
        price: z.number().min(1, "Price is required"),
        description: z.string().min(10).max(250),
        image: z.any()
        .refine((files) => files?.size > 0, "Image is required")
        .refine((files) => files?.size <= PRODUCT_IMG_SIZE, `Image size must be less than or equal to 1mb`)
        .refine(
        (files) => ACCEPTED_IMG_TYPES.includes(files?.type),
        ".jpg, .jpeg, .png and .webp files are accepted."
        ),
        categories: z.string().min(1, "Categories is required"),
    });

    // validating data using zod schema
    const validateFields = productSchema.safeParse({
        title: formData.get("title"),
        price: Number(formData.get("price")),
        description: formData.get("description"),
        image: formData.get("image"),
        categories: formData.get("categories"),
    })

    // check if errors
    if (!validateFields.success) {
        const errorShow: any = validateFields.error.flatten().fieldErrors;
        let key = Object.keys(errorShow)[0]!==undefined ? Object.keys(errorShow)[0] : "error";
        let value = errorShow[Object.keys(errorShow)[0]]!==undefined ? `(${key}) ${errorShow[Object.keys(errorShow)[0]][0]}` : `(${key}) Something went wrong, while validating register form.`;
        return {
            error: value,
            success: false
        }
    }

    // console.log(validateFields.data);
    try {
        for (let i=0; i<100000; i++) {//console.log(i);
        }

        const { title, price, description, image, categories } = validateFields.data;

        let data = await fetch("https://fakestoreapi.com/products", {
            method: "POST", body: JSON.stringify({ title, price, description, image: image.name, categories })
        })
        data = await data.json();
        console.log("Data added successfully = ", data);
        console.log("Data = ", {title, price, description, image: image.name, categories});
        
        
        revalidatePath("/admin/products");
        return {
            message: "Product added successfully",
            success: true
        } 
    } catch (err: any) {
        return {
            error: `Internal Server Error (${err.message})`,
            success: false
        }
    }
}

// edit product
export const editProduct = async (userId: number, prevState: ProductFormStateTypeProps, formData: FormData) => {
    // product zod schema validation
    const productSchema = z.object({
        title: z.string().trim().min(3).max(100),
        price: z.number().min(1, "Price is required"),
        description: z.string().min(10).max(250),
        image: z.any(),
        oldImage: z.string(),
        categories: z.string().min(1, "Categories is required"),
    });

    // validating data using zod schema
    const validateFields = productSchema.safeParse({
        title: formData.get("title"),
        price: Number(formData.get("price")),
        description: formData.get("description"),
        image: formData.get("image"),
        oldImage: formData.get("oldImage"),
        categories: formData.get("categories"),
    });

    // check if errors
    if (!validateFields.success) {
        const errorShow: any = validateFields.error.flatten().fieldErrors;
        let key = Object.keys(errorShow)[0]!==undefined ? Object.keys(errorShow)[0] : "error";
        let value = errorShow[Object.keys(errorShow)[0]]!==undefined ? `(${key}) ${errorShow[Object.keys(errorShow)[0]][0]}` : `(${key}) Something went wrong, while validating register form.`;
        return {
            error: value,
            success: false
        }
    }

    console.log(validateFields.data);

    // image validation
    let imageString = "";
    let {oldImage, image} = validateFields.data;
    if (oldImage.length < 1) {
        if (image?.size > 0) {
            if (image?.size >= PRODUCT_IMG_SIZE) {
                return {
                    error: "Image size must be less than or equal to 1mb",
                    success: false,
                }
            } else if (!ACCEPTED_IMG_TYPES.includes(image?.type)) {
                return {
                    error: ".jpg, .jpeg, .png and .webp files are accepted",
                    success: false,
                }
            }
            imageString = image?.name;
        } else {
            return {
                error: "Image is required",
                success: false,
            }
        }
    } else if (image.size > 0) {
        if (image?.size > 0) {
            if (image?.size >= PRODUCT_IMG_SIZE) {
                return {
                    error: "Image size must be less than or equal to 1mb",
                    success: false,
                }
            } else if (!ACCEPTED_IMG_TYPES.includes(image?.type)) {
                return {
                    error: ".jpg, .jpeg, .png and .webp files are accepted",
                    success: false,
                }
            }
            imageString = image?.name;
        }
    } else {
        imageString = oldImage;
    }    

    try {
        const { title, price, description, categories } = validateFields.data;

        let data = await fetch(`https://fakestoreapi.com/products/${userId}`, {
            method: "PUT", body: JSON.stringify({ title, price, description, image: imageString, categories })
        })
        data = await data.json();
        console.log("Data updated successfully = ", data);
        console.log("Data = ", {title, price, description, categories, image: imageString});
        
        revalidatePath("/admin/products");
        return {
            message: "Product updated successfully",
            success: true
        } 
    } catch (err: any) {
        return {
            error: `Internal Server Error (${err.message})`,
            success: false
        }
    }
}

// get single product
export const getSingleProduct = async (userId: number) => {
    try {
        let data = await fetch(`https://fakestoreapi.com/products/${userId}`);
        data = await data.json();
        return data;
    } catch (err) {
        throw new Error("Error came while fetching single products data")
    }
}

// fetching all categories ---------------------------------------------------
export const getAllCategories = async () => {
    try {
        let data = await fetch('https://fakestoreapi.com/products/categories');
        data = await data.json();
        return data;
    } catch (err) {
        throw new Error("Error came while fetching categories data");
    }
}

// fetch all users -----------------------------------------------------------
export const getAllUsers = async () => {
    try {
        let data = await fetch('https://fakestoreapi.com/users');
        data = await data.json();
        return data;
    } catch (err) {
        throw new Error("Error came while fetching users data");
    }
}

// delete users
export const deleteUsers = async (userId: number, prevState: ProductFormStateTypeProps, formData: FormData) => {
    try {
        let data = await fetch(`https://fakestoreapi.com/users/${userId}`,{ method: "DELETE" });
        data = await data.json();
        console.log(data);
        if (data === null) {
            return {
                success: false,
                error: "Error came while deleting user data"
            }    
        }
        return {
            success: true,
            message: "User deleted successfully"
        }
    } catch (err) {
        return {
            success: false,
            error: "Internal Server Error (Error came while deleting user data)"
        }
    }
}

// user login 
// export const userLogin = async (prevState: ProductFormStateTypeProps, formData: FormData) => {
//     // product zod schema validation
//     const userSchema = z.object({
//         username: z.string().trim().min(3),
//         password: z.string(),
//     });

//     // validating data using zod schema
//     const validateFields = userSchema.safeParse({
//         username: formData.get("username"),
//         password: formData.get("password"),
//     })

//     // check if errors
//     if (!validateFields.success) {
//         const errorShow: any = validateFields.error.flatten().fieldErrors;
//         let key = Object.keys(errorShow)[0]!==undefined ? Object.keys(errorShow)[0] : "error";
//         let value = errorShow[Object.keys(errorShow)[0]]!==undefined ? `(${key}) ${errorShow[Object.keys(errorShow)[0]][0]}` : `(${key}) Something went wrong, while validating login form.`;
//         return {
//             error: value,
//             success: false
//         }
//     }

//     // console.log(validateFields.data);
//     try {
//         const { username, password } = validateFields.data;

//         let data = await fetch("https://fakestoreapi.com/auth/login", {
//             method: "POST",
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 username, password
//             })
//         })
//         data = await data.json();
//         if (!data?.token) {
//             return {
//                 error: `Token not generated`,
//                 success: false
//             }
//         } 
//         // const oneHour = 1 * 60 * 60 * 1000
//         cookies().set({
//             name: 'currentUser',
//             value: data?.token,
//             httpOnly: true,
//             path: '/',
//             // expires: Date.now() - oneHour,
//         });
//         console.log("User login successfully = ", data?.token);
//         console.log("Data = ", {username, password});
        
//         revalidatePath("/admin/dashboard");
//         return {
//             message: "User Login successfully",
//             success: true
//         } 
//     } catch (err: any) {        
//         return {
//             error: `Internal Server Error (${err.message})`,
//             success: false
//         }
//     }
// }

// logout user
// export const userLogout = async () => {
//     const cookiesList = cookies();
//     const hasCookie = cookiesList.has('currentUser');

//     if (hasCookie) {
//         cookies().delete('currentUser');
//         // return {
//         //     message: "User logged out successfully.",
//         //     success: true
//         // }
//         redirect("/authadmin/login");
//     } else {
//         // return {
//         //     error: "There is no cookie 404 error",
//         //     success: false
//         // }
//         redirect("/authadmin/login");
//     }
// }

// login using next-auth authentication (credentials)
export const authenticate = async (prevState: any, formData: FormData) => {
        // product zod schema validation
        const userSchema = z.object({
            username: z.string().trim().min(3),
            password: z.string(),
        });
    
        // validating data using zod schema
        const validateFields = userSchema.safeParse({
            username: formData.get("username"),
            password: formData.get("password"),
        })
    
        // check if errors
        if (!validateFields.success) {
            const errorShow: any = validateFields.error.flatten().fieldErrors;
            let key = Object.keys(errorShow)[0]!==undefined ? Object.keys(errorShow)[0] : "error";
            let value = errorShow[Object.keys(errorShow)[0]]!==undefined ? `(${key}) ${errorShow[Object.keys(errorShow)[0]][0]}` : `(${key}) Something went wrong, while validating login form.`;
            return {
                error: value,
                success: false
            }
        }
    
        console.log(validateFields.data);
        try {
            await signIn("credentials", validateFields.data);
        } catch (error: any) {                    
            if (error instanceof AuthError) {
                switch (error.type) {
                    
                  case 'CredentialsSignin':
                    return {
                        error: "Invalid credentials.",
                        success: false,
                    }
                  default:
                    console.log(error.type, "llllllllllllllllllllllllllll");
                    return {
                        error: "Something went wrong while validating user.",
                        success: false,
                    }
                }
            }
            // return {
            //     error: `Internal Server Error (${error.message})`,
            //     success: false,
            // }
            throw error;

        }
}

export const userLogout = async () => {
    await signOut();
}

export const githubLogin = async () => {
    await signIn("github");
}

export const googleLogin = async () => {
    await signIn("google");
}

// Home Page -------------------------------------------------------------
// export const 