export interface Product {
    id?: number;
    name: string;
    description?: string;
    price: number;
    image: string;
    quantity: number;
    createdAt?: string;
    updatedAt?: string;
}

export interface ProductFormData {
    name: string;
    description: string;
    price: number | '';
    image: string;
    quantity: number | '';
}
