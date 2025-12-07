import React, { useState, useEffect } from 'react';
import { X, Image as ImageIcon } from 'lucide-react';
import type { Product, ProductFormData } from '../../types/Product';

/**
 * ProductModal Component
 * 
 * A reusable modal component for creating and editing products.
 * Displays a form with product fields and includes image preview functionality.
 * 
 * @param isOpen - Controls whether the modal is visible
 * @param onClose - Callback function to close the modal
 * @param onSubmit - Callback function to handle form submission (create/update)
 * @param initialData - Product data to populate form when editing (null for new products)
 */
interface ProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: ProductFormData) => Promise<void>;
    initialData?: Product | null;
}

const ProductModal: React.FC<ProductModalProps> = ({ isOpen, onClose, onSubmit, initialData }) => {
    // Form state - stores all product input fields
    const [formData, setFormData] = useState<ProductFormData>({
        name: '',
        description: '',
        price: '',
        image: '',
        quantity: ''
    });
    
    // Loading state - indicates if form submission is in progress
    const [loading, setLoading] = useState(false);
    
    // Error state - stores validation or API error messages
    const [error, setError] = useState<string | null>(null);
    
    // Image error state - tracks if the image URL failed to load
    const [imageError, setImageError] = useState(false);

    /**
     * Effect: Initialize form data when modal opens or initialData changes
     * - If editing: Populates form with existing product data
     * - If creating: Resets form to empty values
     */
    useEffect(() => {
        if (initialData) {
            // Editing mode - populate form with existing product data
            setFormData({
                name: initialData.name,
                description: initialData.description || '',
                price: initialData.price,
                image: initialData.image || '',
                quantity: initialData.quantity
            });
        } else {
            // Create mode - reset form to empty values
            setFormData({
                name: '',
                description: '',
                price: '',
                image: '',
                quantity: ''
            });
        }
        // Reset error states when modal opens/closes
        setError(null);
        setImageError(false);
    }, [initialData, isOpen]);

    /**
     * Effect: Reset image error state when image URL changes
     * This allows users to try different URLs without the error persisting
     */
    useEffect(() => {
        setImageError(false);
    }, [formData.image]);

    // Don't render anything if modal is closed
    if (!isOpen) return null;

    /**
     * Handles form submission
     * - Prevents default form submission behavior
     * - Validates form data
     * - Calls onSubmit callback (which handles API call)
     * - Closes modal on success or displays error on failure
     */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevent page refresh
        setLoading(true);
        setError(null);

        // Form Validation
        // Check if product name is provided
        if (!formData.name.trim()) {
            setError('Product name is required');
            setLoading(false);
            return;
        }
        // Validate price is not negative
        if (Number(formData.price) < 0) {
            setError('Price cannot be negative');
            setLoading(false);
            return;
        }
        // Validate quantity is not negative
        if (Number(formData.quantity) < 0) {
            setError('Quantity cannot be negative');
            setLoading(false);
            return;
        }

        try {
            // Call parent's onSubmit handler (create or update)
            await onSubmit(formData);
            // Close modal on successful submission
            onClose();
        } catch (err: any) {
            // Display error message if submission fails
            setError(err.message || 'Failed to save product');
        } finally {
            // Always reset loading state
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4 animate-in fade-in duration-200 overflow-y-auto">
            <div className="bg-white w-full max-w-lg rounded-xl shadow-xl overflow-hidden animate-in zoom-in-95 duration-200 my-auto max-h-[95vh] flex flex-col">
                {/* Modal Header - Fixed at top */}
                <div className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-100 flex-shrink-0">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-800">
                        {initialData ? 'Edit Product' : 'Add New Product'}
                    </h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors flex-shrink-0">
                        <X size={20} />
                    </button>
                </div>

                {/* Scrollable Form Content */}
                <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-6 overflow-y-auto flex-1">
                    {error && (
                        <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm border border-red-100 font-medium">
                            {error}
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                            placeholder="e.g. Wireless Headphones"
                            autoFocus
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                        />
                    </div>

                    {/* Responsive Grid - Stacks on mobile, side-by-side on larger screens */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Price ($)</label>
                            <input
                                type="number"
                                step="0.01"
                                min="0"
                                value={formData.price}
                                onChange={e => setFormData({ ...formData, price: e.target.value === '' ? '' : parseFloat(e.target.value) })}
                                placeholder="0.00"
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Quantity</label>
                            <input
                                type="number"
                                min="0"
                                value={formData.quantity}
                                onChange={e => setFormData({ ...formData, quantity: e.target.value === '' ? '' : parseInt(e.target.value) })}
                                placeholder="0"
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Image URL</label>
                        <input
                            type="url"
                            value={formData.image}
                            onChange={e => setFormData({ ...formData, image: e.target.value })}
                            placeholder="https://example.com/image.jpg"
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                        />
                        {formData.image && formData.image.trim() !== '' && (
                            <div className="mt-3">
                                <label className="block text-xs font-medium text-gray-600 mb-2">Preview</label>
                                <div className="relative w-full h-32 sm:h-48 rounded-lg overflow-hidden bg-gray-100 border border-gray-200 flex items-center justify-center">
                                    {!imageError ? (
                                        <img
                                            src={formData.image}
                                            alt="Product preview"
                                            className="w-full h-full object-cover"
                                            onError={() => setImageError(true)}
                                            onLoad={() => setImageError(false)}
                                        />
                                    ) : (
                                        <div className="flex flex-col items-center justify-center text-gray-400 p-4">
                                            <ImageIcon size={24} className="mb-2" />
                                            <p className="text-xs text-center">Failed to load image</p>
                                            <p className="text-xs mt-1 text-gray-500 text-center">Please check the URL</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                            rows={3}
                            placeholder="Product details..."
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm resize-none"
                        />
                    </div>

                    {/* Action Buttons - Fixed at bottom, responsive layout */}
                    <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 pt-2 border-t border-gray-100 mt-4 sm:mt-0 flex-shrink-0">
                        <button
                            type="button"
                            onClick={onClose}
                            className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Saving...' : (initialData ? 'Save Changes' : 'Create Product')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductModal;
