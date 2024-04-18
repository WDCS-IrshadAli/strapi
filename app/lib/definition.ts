interface ProductFormStateTypeProps {
    message?: null | string, 
    error?: null | string, 
    success?: null | boolean
}

interface ProductsProps {
    id: number,
    title: string,
    price: number,
    description: string,
    category: string,
    image: string,
    rating: {
      rate: number,
      count: number
    }
}

interface UsersProps {
    id: number,
    email: string,
    username: string,
    password: string,
    name: { firstname: string, lastname: string },
    phone: string,
    __v?: number,
    address: {
        geolocation: { lat: string, long: string },
        city: string,
        street: string,
        number: number,
        zipcode: string
    }
}