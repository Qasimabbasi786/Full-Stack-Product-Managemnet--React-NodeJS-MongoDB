import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // URL se ID nikalne ke liye
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { CheckCircle, AlertCircle, RefreshCw, AlignLeft, ArrowLeft, ArrowRight, DollarSign, PencilLine, Type } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';


const EditProduct = () => {
    const { id } = useParams(); // URL se :id pakar li 
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        price: "",
        description: "",
        category: ""
    });

    // 1. Purana data fetch karna 
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`http://localhost:3010/api/products/${id}`, {
                    headers: { Authorization: `Bearer ${token}` } // [cite: 87]
                });
                setFormData(res.data); // Form mein purana data bhar diya
            } catch (err) {
                console.error("Error fetching product", err);
            }
        };
        fetchProduct();
    }, [id, token]);

    // 2. Update karna 
    const handleSubmit = async (e) => {
        e.preventDefault();
        const duration = 2000;

        try {
            await axios.put(`http://localhost:3010/api/products/${id}`, formData, {
                headers: { Authorization: `Bearer ${token}` } // [cite: 87]
            });

            // Success Notification
            toast.success("Product Updated Successfully!", {
                duration: duration,
                position: "top-right",
                icon: <RefreshCw size={20} color="#fff" className="animate-spin-slow" />, // Update icon
                style: {
                    borderRadius: '10px',
                    background: '#0ea5e9', // Sky blue color for "Update"
                    color: '#fff',
                    fontWeight: '600'
                },
            });

            // Navigate after toast duration
            setTimeout(() => {
                navigate("/products");
            }, duration);

        } catch (err) {
            // Error Notification
            toast.error(err.response?.data?.message || "Update failed!", {
                duration: 4000,
                position: "top-right",
                icon: <AlertCircle size={20} color="#fff" />,
                style: {
                    borderRadius: '10px',
                    background: '#EF4444',
                    color: '#fff',
                },
            });
        }
    };

    return (
        <div className="ui-page">
          <Helmet>
            <title>Edit Product | Qasim's Product App</title>
            <meta name="description" content="Edit the product from the products list." />
            <meta name="keywords" content="react, login, products, admin" />
          </Helmet>
          <div className="ui-shell">
            <div className="ui-header">
              <div>
                <h2 className="ui-title">Edit Product</h2>
                <p className="ui-subtitle">Update title, price and description.</p>
              </div>

              <button onClick={() => navigate(-1)} className="ui-btn-secondary">
                <ArrowLeft className="h-4 w-4" />
                Back
              </button>
            </div>

            <div className="mx-auto max-w-2xl animate-fade-up">
              <div className="ui-card ui-card-hover p-6 sm:p-8">
                <div className="mb-5 flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-amber-400 to-rose-500 text-white shadow-soft">
                    <PencilLine className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">Editing</p>
                    <p className="text-xs text-slate-500">ID: <span className="font-mono">{id}</span></p>
                  </div>
                </div>

                <div className="ui-divider mb-6" />

                <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <label className="block sm:col-span-2">
                    <span className="text-xs font-semibold text-slate-700">Title</span>
                    <div className="relative mt-2">
                      <Type className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="ui-input pl-10"
                        required
                      />
                    </div>
                  </label>

                  <label className="block">
                    <span className="text-xs font-semibold text-slate-700">Price</span>
                    <div className="relative mt-2">
                      <DollarSign className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      <input
                        type="number"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        className="ui-input pl-10"
                        required
                      />
                    </div>
                  </label>

                  <div className="hidden sm:block" />

                  <label className="block sm:col-span-2">
                    <span className="text-xs font-semibold text-slate-700">Description</span>
                    <div className="relative mt-2">
                      <AlignLeft className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-slate-400" />
                      <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="ui-textarea pl-10"
                      />
                    </div>
                  </label>

                  <div className="sm:col-span-2 mt-2 flex justify-end">
                    <button type="submit" className="ui-btn-warn">
                      Update Product
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
    );
};

export default EditProduct;
