import React, { useState, useEffect, useMemo } from 'react';
import { Plus, Search, Package, DollarSign, AlertTriangle, TrendingUp } from 'lucide-react';
import ProductTable from '../components/Dashboard/ProductTable';
import InventoryCharts from '../components/Dashboard/InventoryCharts';
import ProductModal from '../components/ProductModal/ProductModal';
import { productService } from '../services/api';
import type { Product, ProductFormData } from '../types/Product';

const Dashboard: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const data = await productService.getAll();
            setProducts(data);
        } catch (error) {
            console.error('Failed to fetch products:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleCreate = async (data: ProductFormData) => {
        const payload = {
            ...data,
            price: Number(data.price),
            quantity: Number(data.quantity)
        };
        await productService.create(payload);
        await fetchProducts();
        setIsModalOpen(false);
    };

    const handleUpdate = async (data: ProductFormData) => {
        if (!editingProduct?.id) return;
        const payload = {
            ...data,
            price: Number(data.price),
            quantity: Number(data.quantity)
        };
        await productService.update(editingProduct.id, payload);
        await fetchProducts();
        setIsModalOpen(false);
    };

    const handleDelete = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await productService.delete(id);
                await fetchProducts();
            } catch (error) {
                console.error('Failed to delete product:', error);
            }
        }
    };

    const openCreateModal = () => {
        setEditingProduct(null);
        setIsModalOpen(true);
    };

    const openEditModal = (product: Product) => {
        setEditingProduct(product);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingProduct(null);
    };

    // Filter products based on search term
    const filteredProducts = useMemo(() => {
        if (!searchTerm.trim()) return products;
        const term = searchTerm.toLowerCase();
        return products.filter(product =>
            product.name.toLowerCase().includes(term) ||
            product.description?.toLowerCase().includes(term)
        );
    }, [products, searchTerm]);

    // Calculate statistics
    const stats = useMemo(() => {
        const totalProducts = products.length;
        const totalValue = products.reduce((sum, p) => sum + (Number(p.price) * Number(p.quantity)), 0);
        const lowStockCount = products.filter(p => p.quantity < 5).length;
        const totalQuantity = products.reduce((sum, p) => sum + Number(p.quantity), 0);

        return {
            totalProducts,
            totalValue,
            lowStockCount,
            totalQuantity
        };
    }, [products]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">Inventory Dashboard</h1>
                            <p className="text-gray-600">Manage your products and track inventory levels</p>
                        </div>
                        <button
                            onClick={openCreateModal}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-200 transform hover:scale-105"
                        >
                            <Plus size={20} />
                            Add Product
                        </button>
                    </div>

                    {/* Search Bar */}
                    <div className="relative max-w-md">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search products by name or description..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
                        />
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {/* Total Products Card */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 mb-1">Total Products</p>
                                <p className="text-3xl font-bold text-gray-900">{stats.totalProducts}</p>
                            </div>
                            <div className="p-3 bg-blue-100 rounded-xl">
                                <Package className="text-blue-600" size={24} />
                            </div>
                        </div>
                    </div>

                    {/* Total Value Card */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 mb-1">Total Value</p>
                                <p className="text-3xl font-bold text-gray-900">
                                    ${stats.totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </p>
                            </div>
                            <div className="p-3 bg-green-100 rounded-xl">
                                <DollarSign className="text-green-600" size={24} />
                            </div>
                        </div>
                    </div>

                    {/* Low Stock Card */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 mb-1">Low Stock Items</p>
                                <p className="text-3xl font-bold text-gray-900">{stats.lowStockCount}</p>
                            </div>
                            <div className="p-3 bg-amber-100 rounded-xl">
                                <AlertTriangle className="text-amber-600" size={24} />
                            </div>
                        </div>
                    </div>

                    {/* Total Quantity Card */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 mb-1">Total Units</p>
                                <p className="text-3xl font-bold text-gray-900">{stats.totalQuantity.toLocaleString()}</p>
                            </div>
                            <div className="p-3 bg-purple-100 rounded-xl">
                                <TrendingUp className="text-purple-600" size={24} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Charts Section */}
                {products.length > 0 && (
                    <div className="mb-8">
                        <InventoryCharts products={products} />
                    </div>
                )}

                {/* Products Table Section */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold text-gray-900">
                            Products
                            {searchTerm && (
                                <span className="ml-2 text-sm font-normal text-gray-500">
                                    ({filteredProducts.length} {filteredProducts.length === 1 ? 'result' : 'results'})
                                </span>
                            )}
                        </h2>
                    </div>

                    {loading ? (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12">
                            <div className="flex flex-col items-center justify-center">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                                <p className="text-gray-600">Loading products...</p>
                            </div>
                        </div>
                    ) : (
                        <ProductTable
                            products={filteredProducts}
                            onEdit={openEditModal}
                            onDelete={handleDelete}
                        />
                    )}
                </div>

                {/* Empty State */}
                {!loading && products.length === 0 && (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
                        <div className="max-w-md mx-auto">
                            <div className="p-4 bg-gray-100 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                                <Package className="text-gray-400" size={40} />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">No products yet</h3>
                            <p className="text-gray-600 mb-6">Get started by adding your first product to the inventory.</p>
                            <button
                                onClick={openCreateModal}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-xl transition-all"
                            >
                                <Plus size={20} />
                                Add Your First Product
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Product Modal */}
            <ProductModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onSubmit={editingProduct ? handleUpdate : handleCreate}
                initialData={editingProduct}
            />
        </div>
    );
};

export default Dashboard;
