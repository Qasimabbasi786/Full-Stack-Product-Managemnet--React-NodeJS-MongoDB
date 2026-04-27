import React, { useState } from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Lock, Mail, User, UserPlus } from 'lucide-react';


const Register = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        try {
            const res = await axios.post("http://localhost:3010/api/auth/register", formData);
            console.log(res.data);
            alert("Registration Successful!"); // On success [cite: 33]
            navigate("/login"); // Redirect to login [cite: 33]
        } catch (err) {
            console.error(err);
        }
    };

  return (
    <div className="ui-page">
      <div className="ui-shell">
        <div className="mx-auto max-w-md animate-fade-up">
          <div className="ui-card ui-card-hover overflow-hidden">
            <div className="p-6 sm:p-8">
              <div className="flex items-start gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-rose-500 to-amber-400 text-white shadow-soft">
                  <UserPlus className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">Create account</h2>
                  <p className="mt-1 text-sm text-slate-600">Register to start adding and managing products.</p>
                </div>
              </div>

              <div className="mt-6 ui-divider" />

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <label className="block">
                  <span className="text-xs font-semibold text-slate-700">Name</span>
                  <div className="relative mt-2">
                    <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Your name"
                      className="ui-input pl-10"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                </label>

                <label className="block">
                  <span className="text-xs font-semibold text-slate-700">Email</span>
                  <div className="relative mt-2">
                    <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      placeholder="you@example.com"
                      className="ui-input pl-10"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                      placeholder="Create a password"
                      className="ui-input pl-10"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                    />
                  </div>
                </label>

                <button type="submit" className="ui-btn-primary w-full py-2.5">
                  Register
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>

              <div className="mt-3 text-center flex justify-center">
                <p className='text-gray-400'>Already a member?</p>
                <button onClick={() => navigate("/login")} className="ml-1 text-blue-500 hover:text-blue-300 font-semibold hover:text-sm">
                  Login
                </button>
              </div>
            </div>

            <div className="bg-gradient-to-r from-rose-500/10 via-amber-400/10 to-sky-500/10 p-4">
              <p className="text-center text-xs font-semibold text-slate-700">
                Fast setup • Clean UI • Smooth animations
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
