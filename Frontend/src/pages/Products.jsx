import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Eye, LogOut, AlertTriangle, Package, PencilLine, Plus, Tag, Trash2, AlertCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';


const Products = () => {

    const {token, logout} = useContext(AuthContext);

    const [products, setProducts] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get("http://localhost:3010/api/products", {
                    headers: {
                        Authorization: `Bearer ${token}` // [cite: 87, 91]
                    }
                });
                setProducts(res.data.data);
                // console.log(res.data.data);
                
            } catch (err) {
                if (err.response?.status === 401) {
                    toast.error("Session expired. Please login again.", {
                        duration: 3000,
                        position: "top-right",
                        icon: <LogOut size={20} color="#fff" />,
                        style: {
                            borderRadius: '10px',
                            background: '#ef4444', // Red for logout/session
                            color: '#fff',
                        },
                    }); 

                    logout();
                } else {
                     toast.error("Failed to fetch products.", {
                        duration: 4000,
                        position: "top-right",
                        icon: <AlertTriangle size={20} color="#fff" />,
                        style: {
                            borderRadius: '10px',
                            background: '#f59e0b', // Amber/Orange for fetch issues
                            color: '#fff',
                        },
                    });
                }
            }
        };

        fetchProducts(); // Function call kar diya
    }, [token, logout]); // Dependency array mein token dalna behtar hai



    const handleDelete = async (id) => {
        if (window.confirm("Are you sure?")) {
            try {
                await axios.delete(`http://localhost:3010/api/products/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                // Delete ke baad list ko update karne ke liye:
                setProducts(products.filter(p => p._id !== id));
                
                toast.success("Product Deleted!", {
                  duration: 3000,
                  position: "top-right",
                  icon: <Trash2 size={20} color="#fff" />, 
                  style: {
                    borderRadius: '10px',
                    background: '#ef4444', // Red background for delete
                    color: '#fff',
                    fontWeight: '500'
                  },
                });
                
            } catch {
                toast.error(err.response?.data?.message || "Failed to delete product", {
                    duration: 4000,
                    position: "top-right",
                    icon: <AlertCircle size={20} color="#fff" />,
                    style: {
                      borderRadius: '10px',
                      background: '#e11d48', // Darker red background
                      color: '#fff',
                      fontWeight: '500',
                    },
                });
            }
        }
    };



  return (
        <div className="ui-page">
          <Helmet>
            <title>Qasim's Products | Qasim's Product App</title>
            <meta name="description" content="Qasim's Product to manage your products." />
            <meta name="keywords" content="react, Dashboard, products, /" />
          </Helmet>
          <div className="ui-shell">
            <div className="ui-header">
              <div>
                <div className="flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-slate-900 to-sky-500 text-white shadow-soft">
                    <Package className="h-5 w-5" />
                  </div>
                  <div>
                    <h1 className="ui-title">Qasim's Products</h1>
                    <p className="ui-subtitle">
                      Manage your items with a clean, animated UI.
                      <span className="ml-2 ui-badge align-middle">
                        {products.length} total
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <button onClick={()=> navigate("/add-product")} className="ui-btn-primary">
                  <Plus className="h-4 w-4" />
                  Add Product
                </button>
                <button onClick={logout} className="ui-btn-danger">
                  <LogOut className="h-4 w-4" />
                  Logout
                </button> {/* [cite: 102] */}
              </div>
            </div>

            {products.length === 0 ? (
              <div className="ui-card p-8 text-center animate-fade-in">
                <p className="font-display text-lg font-semibold tracking-tight">No products yet</p>
                <p className="mt-2 text-sm text-slate-600">Add your first product to see it listed here.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {products.map((product, idx) => (
                  <div
                    key={product._id}
                    className="ui-card ui-card-hover p-5 animate-fade-up"
                    style={{ animationDelay: `${idx * 35}ms` }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="truncate font-display text-lg font-semibold tracking-tight text-slate-900">
                            {product.title}
                          </h3>
                          <span className="ui-badge">
                            <Tag className="h-3.5 w-3.5" />
                            {product.category || "Uncategorized"}
                          </span>
                        </div>
                        <p className="mt-2 text-sm text-slate-600">
                          <span className="font-semibold text-slate-900">${product.price}</span>
                        </p>
                      </div>

                      <div className="flex shrink-0 flex-wrap items-center justify-end gap-2">
                        <button
                          onClick={() => navigate(`/product/${product._id}`)}
                          className="ui-btn-secondary px-3 py-2"
                          title="View"
                        >
                          <Eye className="h-4 w-4" />
                          <span className="hidden sm:inline">View</span>
                        </button>
                        <button
                          onClick={() => navigate(`/edit-product/${product._id}`)}
                          className="ui-btn-warn px-3 py-2"
                          title="Edit"
                        >
                          <PencilLine className="h-4 w-4" />
                          <span className="hidden sm:inline">Edit</span>
                        </button>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="ui-btn-danger px-3 py-2"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="hidden sm:inline">Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
    );
}

export default Products
