import React, {useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Lock, LogIn, Mail, CheckCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';
import customAPI from '../api/axios';


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const {login} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = async(e) => {
        e.preventDefault();
        
        try {
            const duration = 2500; // Define custom duration

            // 2. States ka data bhejien
            // const res = await axios.post("http://localhost:3010/api/auth/login", { email, password });
            const res = await customAPI.post("/auth/login", { email, password });
            
            // 3. Token context mein bhejein
            login(res.data.token); 
            
            // Notification aur redirect
            toast.success("Login Successful!", {
              duration: duration,
              position: "top-right",
              icon: <CheckCircle size={20} color="#fff" />,
              style: {
                borderRadius: '10px',
                background: '#10B981',
                color: '#fff',
                fontWeight: 'bold'
              },
            });

            setTimeout(() => {
              navigate("/products"); // Products page par bhej dein 
            }, duration); // Redirect after custom duration

        } catch (err) {
            toast.error(err.response?.data?.message || "Login Failed!", {
                duration: 3000,
                position: "top-right",
            });
        }
    }

  return (
    <div className="ui-page">
      <Helmet>
        <title>Login | Qasim's Product App</title>
        <meta name="description" content="Login to manage your products safely." />
        <meta name="keywords" content="react, login, products, admin" />
      </Helmet>
      <div className="ui-shell">
        <div className="mx-auto max-w-md animate-fade-up">
          <div className="ui-card ui-card-hover overflow-hidden">
            <div className="p-6 sm:p-8">
              <div className="flex items-start gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-sky-500 to-emerald-500 text-white shadow-soft">
                  <LogIn className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">Welcome back</h2>
                  <p className="mt-1 text-sm text-slate-600">Sign in to manage your products.</p>
                </div>
              </div>

              <div className="mt-6 ui-divider" />

              <form onSubmit={handleLogin} className="mt-6 space-y-4">
                <label className="block">
                  <span className="text-xs font-semibold text-slate-700">Email</span>
                  <div className="relative mt-2">
                    <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      placeholder="you@example.com"
                      className="ui-input pl-10"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)} // State update
                      required
                    />
                  </div>
                </label>

                <label className="block">
                  <span className="text-xs font-semibold text-slate-700">Password</span>
                  <div className="relative mt-2">
                    <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      type="password"
                      placeholder="Your password"
                      className="ui-input pl-10"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)} // State update
                      required
                    />
                  </div>
                </label>

                <button type="submit" className="ui-btn-primary w-full py-2.5">
                  Login
                  <ArrowRight className="h-4 w-4" />
                </button>

                <div className="mt-3 text-center flex justify-center">
                  <p className='text-gray-400'>Don't have an account?</p>
                  <button onClick={() => navigate("/register")} className="ml-1 text-blue-500 hover:text-blue-300 font-semibold hover:text-sm">
                    Create account
                  </button>
                </div>

                <p className="text-center text-xs text-slate-500">
                  Tip: Use the same credentials you registered with.
                </p>
              </form>
            </div>

            <div className="bg-gradient-to-r from-sky-500/10 via-emerald-500/10 to-rose-500/10 p-4">
              <p className="text-center text-xs font-semibold text-slate-700">
                Product Management • React + Node + MongoDB
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
}

export default Login
