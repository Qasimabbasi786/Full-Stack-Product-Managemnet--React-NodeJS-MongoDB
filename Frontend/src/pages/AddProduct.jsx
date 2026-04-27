import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AlignLeft, ArrowLeft, ArrowRight, DollarSign, PackagePlus, Tags, Type } from 'lucide-react';

const AddProduct = () => {
    const { token } = useContext(AuthContext); 
    const navigate = useNavigate();

    // 1. State backend model ke mutabiq (title, price, description, category)
    const [formData, setFormData] = useState({
        title: "",
        price: "",
        description: "",
        category: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // POST request with headers [cite: 80, 86, 91]
            await axios.post("http://localhost:3010/api/products", formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert("Product Added Successfully!");
            navigate("/products"); // Success redirect [cite: 44]
        } catch (err) {
            alert(err.response?.data?.message || "Failed to add product");
        }
    };

    return (
        <div className="ui-page">
          <div className="ui-shell">
            <div className="ui-header">
              <div>
                <h2 className="ui-title">Add New Product</h2>
                <p className="ui-subtitle">Create a new item with title, price, category and description.</p>
              </div>

              <button onClick={() => navigate(-1)} className="ui-btn-secondary">
                <ArrowLeft className="h-4 w-4" />
                Back
              </button>
            </div>

            <div className="mx-auto max-w-2xl animate-fade-up">
              <div className="ui-card ui-card-hover p-6 sm:p-8">
                <div className="mb-5 flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-sky-500 to-slate-900 text-white shadow-soft">
                    <PackagePlus className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">Product Form</p>
                    <p className="text-xs text-slate-500">All fields are stored in your database.</p>
                  </div>
                </div>

                <div className="ui-divider mb-6" />

                <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {/* Title Input [cite: 95] */}
                  <label className="block sm:col-span-2">
                    <span className="text-xs font-semibold text-slate-700">Title</span>
                    <div className="relative mt-2">
                      <Type className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Product Title"
                        className="ui-input pl-10"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                      />
                    </div>
                  </label>

                  {/* Price Input [cite: 95] */}
                  <label className="block">
                    <span className="text-xs font-semibold text-slate-700">Price</span>
                    <div className="relative mt-2">
                      <DollarSign className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      <input
                        type="number"
                        placeholder="0"
                        className="ui-input pl-10"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        required
                      />
                    </div>
                  </label>

                  {/* Category Input [cite: 95] */}
                  <label className="block">
                    <span className="text-xs font-semibold text-slate-700">Category</span>
                    <div className="relative mt-2">
                      <Tags className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        placeholder="e.g. Electronics"
                        className="ui-input pl-10"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      />
                    </div>
                  </label>

                  {/* Description Input [cite: 95] */}
                  <label className="block sm:col-span-2">
                    <span className="text-xs font-semibold text-slate-700">Description</span>
                    <div className="relative mt-2">
                      <AlignLeft className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-slate-400" />
                      <textarea
                        placeholder="Write a short description..."
                        className="ui-textarea pl-10"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      />
                    </div>
                  </label>

                  <div className="sm:col-span-2 mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs text-slate-500">
                      <span className="ui-badge">
                        <Tags className="h-3.5 w-3.5" />
                        Tip: keep category short
                      </span>
                    </p>

                    <button type="submit" className="ui-btn-primary w-full sm:w-auto">
                      Add Product
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

export default AddProduct;
