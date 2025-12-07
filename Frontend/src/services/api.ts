import axios from 'axios';
import type { Product } from '../types/Product';

const API_URL = 'http://localhost:5000/products';

// Create an axios instance with default config
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const productService = {
    // Fetch all products
    getAll: async (): Promise<Product[]> => {
        const response = await api.get('/');
        return response.data;
    },

    // Create a new product
    create: async (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> => {
        const response = await api.post('/', product);
        return response.data;
    },

    // Update a product
    update: async (id: number, product: Partial<Product>): Promise<Product> => {
        const response = await api.put(`/${id}`, product);
        return response.data;
    },

    // Delete a product
    delete: async (id: number): Promise<void> => {
        await api.delete(`/${id}`);
    },
};
