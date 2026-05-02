import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { ArrowLeft, BadgeDollarSign, Tags } from 'lucide-react';
import { Helmet } from 'react-helmet-async';


const ProductDetails = () => {
    const { id } = useParams();
    const { token } = useContext(AuthContext);
    const [product, setProduct] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`http://localhost:3010/api/products/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setProduct(res.data);
                // console.log(res.data);
                
            } catch (err) {
                console.error("Error fetching product details", err);
            }
        };
        fetchProduct();
    }, [id, token]);

    if (!product) return <div className="ui-page"><div className="ui-shell text-center text-sm text-slate-600 animate-fade-in">Loading...</div></div>;

    return (
        <div className="ui-page">
          <Helmet>
            <title>{product?.title ? `${product.title} | Qasim's Product App` : "Loading... | Qasim's Product App"}</title>
            <meta name="description" content="Specific Product from the product list." />
            <meta name="keywords" content="react, Product, products, View" />
          </Helmet>
          <div className="ui-shell">
            <div className="mx-auto max-w-3xl animate-fade-up">
              <div className="ui-card overflow-hidden">
                <div className="bg-gradient-to-r from-sky-500/10 via-emerald-500/10 to-rose-500/10 p-6 sm:p-8">
                  <button onClick={() => navigate(-1)} className="ui-btn-secondary">
                    <ArrowLeft className="h-4 w-4" />
                    Back to List
                  </button>

                  <h1 className="mt-6 font-display text-3xl font-semibold tracking-tight sm:text-5xl">
                    {product.title}
                  </h1>

                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <span className="ui-badge">
                      <Tags className="h-3.5 w-3.5" />
                      {product.category || "Uncategorized"}
                    </span>

                    <span className="ui-badge">
                      <BadgeDollarSign className="h-3.5 w-3.5" />
                      ${product.price}
                    </span>
                  </div>
                </div>

                <div className="p-6 sm:p-8">
                  <div className="mb-6 ui-divider" />

                  <h3 className="text-sm font-semibold text-slate-700">Description</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700 sm:text-base">
                    {product.description || "No description available for this product."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
};

export default ProductDetails;

