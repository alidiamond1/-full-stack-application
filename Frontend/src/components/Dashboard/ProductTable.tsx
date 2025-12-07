import React, { useState } from 'react';
import { Edit2, Trash2, AlertCircle, Image as ImageIcon } from 'lucide-react';
import type { Product } from '../../types/Product';

/**
 * ProductTable Component Props
 * 
 * @property products - Array of products to display in the table
 * @property onEdit - Callback function called when edit button is clicked (passes the product)
 * @property onDelete - Callback function called when delete button is clicked (passes the product id)
 */
interface ProductTableProps {
    products: Product[];
    onEdit: (product: Product) => void;
    onDelete: (id: number) => void;
}

/**
 * ProductTable Component
 * 
 * Displays products in a table format with the following features:
 * - Product images with fallback placeholder
 * - Low stock indicators (red background and warning icon for quantity < 5)
 * - Color-coded quantity badges (green for normal, amber for low stock)
 * - Edit and delete action buttons
 * - Responsive design with horizontal scroll on small screens
 * 
 * @param products - Array of products to display
 * @param onEdit - Function to handle edit action
 * @param onDelete - Function to handle delete action
 */
const ProductTable: React.FC<ProductTableProps> = ({ products, onEdit, onDelete }) => {
    /**
     * Tracks which product images have failed to load
     * Key: product ID, Value: true if image failed to load
     * Used to show placeholder icon instead of broken image
     */
    const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

    /**
     * Handles image load errors
     * When an image fails to load, marks it in the imageErrors state
     * so we can show a placeholder icon instead
     * 
     * @param productId - The ID of the product whose image failed to load
     */
    const handleImageError = (productId?: number) => {
        if (productId) {
            setImageErrors(prev => ({ ...prev, [productId]: true }));
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Scrollable container for responsive design */}
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                    {/* Table Header */}
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 font-semibold">Image</th>
                            <th className="px-6 py-4 font-semibold">Product Name</th>
                            <th className="px-6 py-4 font-semibold">Price</th>
                            <th className="px-6 py-4 font-semibold">Quantity</th>
                            <th className="px-6 py-4 font-semibold">Description</th>
                            <th className="px-6 py-4 font-semibold text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {/* Empty State - Show message when no products */}
                        {products.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-6 py-8 text-center text-gray-400">
                                    No products found. Add some inventory!
                                </td>
                            </tr>
                        ) : (
                            // Map through products and render each as a table row
                            products.map((product) => {
                                // Check if product has a valid image URL
                                const hasImage = product.image && product.image.trim() !== '';
                                // Check if the image failed to load (from error tracking)
                                const imageFailed = product.id ? imageErrors[product.id] : false;
                                
                                return (
                                    <tr
                                        key={product.id}
                                        className={`hover:bg-gray-50 transition-colors ${product.quantity < 5 ? 'bg-red-50/50' : ''
                                            }`}
                                    >
                                        <td className="px-6 py-4">
                                            {hasImage && !imageFailed ? (
                                                <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                                                    <img
                                                        src={product.image}
                                                        alt={product.name}
                                                        className="w-full h-full object-cover"
                                                        onError={() => handleImageError(product.id)}
                                                        loading="lazy"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="w-16 h-16 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center">
                                                    <ImageIcon className="text-gray-400" size={24} />
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                {product.quantity < 5 && (
                                                    <div className="text-red-500" title="Low Stock">
                                                        <AlertCircle size={18} />
                                                    </div>
                                                )}
                                                <div>
                                                    <div className="font-medium text-gray-900">{product.name}</div>
                                                    {product.quantity < 5 && (
                                                        <div className="text-xs text-red-500 font-medium">Low Stock</div>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-900">
                                            ${Number(product.price).toFixed(2)}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${product.quantity < 5
                                                        ? 'bg-amber-100 text-amber-800'
                                                        : 'bg-green-100 text-green-800'
                                                    }`}
                                            >
                                                {product.quantity} units
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 max-w-xs truncate text-gray-500">
                                            {product.description || '-'}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    onClick={() => onEdit(product)}
                                                    className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
                                                    title="Edit"
                                                >
                                                    <Edit2 size={16} />
                                                </button>
                                                <button
                                                    onClick={() => product.id && onDelete(product.id)}
                                                    className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProductTable;
