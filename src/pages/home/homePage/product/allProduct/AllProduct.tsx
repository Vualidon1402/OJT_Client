import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Pagination } from 'antd';
import './AllProduct.scss';
import api from '@/apis';

import { useSelector } from 'react-redux';
import { StoreType } from '@/store';
import { ProductModel } from '@/store/slices/product.slice';

const AllProducts = () => {
    const [products, setProducts] = useState<ProductModel[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(8);
    const [total, setTotal] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000000]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const categoryStore = useSelector((store: StoreType) => store.categoryStore);

    useEffect(() => {
        fetchProducts(true, currentPage, pageSize);
    }, [currentPage, pageSize, priceRange, searchTerm]);

    const fetchProducts = async (status: boolean, page: number, size: number) => {
        try {
            const response = await api.product.sortProductByStatus(status, page, size);
            const filteredProducts = response.data.content.filter((product: { productDetails: any[]; productName: string; }) => {
                const price = product.productDetails.length > 0
                    ? product.productDetails.reduce((acc: any, curr: any) => acc.discountPrice > curr.discountPrice ? acc : curr).discountPrice
                    : 0;
                const matchesPriceRange = price >= priceRange[0] && price <= priceRange[1];
                const matchesSearchTerm = product.productName.toLowerCase().includes(searchTerm.toLowerCase());
                return matchesPriceRange && matchesSearchTerm;
            });
            setProducts(filteredProducts);
            setTotal(filteredProducts.length);
        } catch (err) {
            console.error("API error:", err);
        }
    };

    const handleCategoryFilter = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const categoryId = event.target.value;
        setSelectedCategory(categoryId);
        if (categoryId) {
            try {
                const response = await api.product.getProductByCategoryAndPagination(categoryId, currentPage, pageSize);
                const filteredProducts = response.data.content.filter((product: { productDetails: any[]; productName: string; }) => {
                    const price = product.productDetails.length > 0
                        ? product.productDetails.reduce((acc: any, curr: any) => acc.discountPrice > curr.discountPrice ? acc : curr).discountPrice
                        : 0;
                    const matchesPriceRange = price >= priceRange[0] && price <= priceRange[1];
                    const matchesSearchTerm = product.productName.toLowerCase().includes(searchTerm.toLowerCase());
                    return matchesPriceRange && matchesSearchTerm;
                });
                setProducts(filteredProducts);
                setTotal(filteredProducts.length);
            } catch (err) {
                console.error("API error:", err);
            }
        } else {
            fetchProducts(true, currentPage, pageSize);
        }
    };

    const handleSeeDetails = (product: ProductModel) => {
        navigate(`/product-details/${product.id}`, { state: { product } });
    };

    const handleSort = (criteria: 'name' | 'price') => {
        const sortedProducts = [...products].sort((a, b) => {
            if (criteria === 'name') {
                return sortOrder === 'asc'
                    ? a.productName.localeCompare(b.productName)
                    : b.productName.localeCompare(a.productName);
            } else if (criteria === 'price') {
                const priceA = a.productDetails.length > 0
                    ? a.productDetails.reduce((acc, curr) => acc.discountPrice > curr.discountPrice ? acc : curr).discountPrice
                    : 0;
                const priceB = b.productDetails.length > 0
                    ? b.productDetails.reduce((acc, curr) => acc.discountPrice > curr.discountPrice ? acc : curr).discountPrice
                    : 0;
                return sortOrder === 'asc' ? priceA - priceB : priceB - priceA;
            }
            return 0;
        });
        setProducts(sortedProducts);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    const handlePriceRange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const [min, max] = event.target.value.split('-').map(Number);
        setPriceRange([min, max]);
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    return (
        <>
            <h1 className='all-products-title'>View All Products</h1>
            <div className="all-products">
                <div className="sidebar">
                    <div className="sort-options">
                        <button className='btn btn-primary' onClick={() => handleSort('name')}>Sort by Name</button>
                        <button className='btn btn-primary' onClick={() => handleSort('price')}>Sort by Price</button>
                    </div>
                    <div className="filter-options">
                        <div>
                            <label>Category:</label>
                            <select onChange={handleCategoryFilter}>
                                <option value="">All</option>
                                {categoryStore.data?.map(category => (
                                    <option key={category.id} value={category.id}>{category.categoryName}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label>Price Range:</label>
                            <select onChange={handlePriceRange}>
                                <option value="0-50000000">All</option>
                                <option value="0-1000000">0 - 1,000,000</option>
                                <option value="1000000-5000000">1,000,000 - 5,000,000</option>
                                <option value="5000000-10000000">5,000,000 - 10,000,000</option>
                                <option value="10000000-50000000">10,000,000 - 50,000,000</option>
                            </select>
                        </div>
                    </div>
                    <div className="search">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                    </div>
                </div>
                <div className="product-grid">
                    {products.map((product) => (
                        <div className="product-card" key={product.id}>
                            <div className="product-image">
                                <img src={product.image} alt={product.productName} />
                                <button
                                    className="add-to-cart"
                                    onClick={() => handleSeeDetails(product)}
                                >
                                    See Details
                                </button>
                            </div>
                            <div className="product-info">
                                <h3>{product.productName}</h3>
                                <p className='price'>
                                    {product.productDetails.length > 0
                                        ? product.productDetails.reduce((acc, curr) =>
                                            acc.discountPrice > curr.discountPrice ? acc : curr
                                        ).discountPrice.toLocaleString()
                                        : "N/A"}
                                    đ
                                </p>
                                <div className='rating'>
                                    <span>⭐⭐⭐⭐⭐</span>
                                    <br />
                                    <span>5.0 (23)</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="pagination">
                <Pagination
                    current={currentPage + 1}
                    pageSize={pageSize}
                    total={total}
                    onChange={(page, pageSize) => {
                        setCurrentPage(page - 1);
                        setPageSize(pageSize);
                    }}
                />
            </div>
        </>
    );
};

export default AllProducts;
