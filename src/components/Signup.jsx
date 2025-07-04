
import React, { useState } from 'react';
import authService from '../appwrite/auth';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../store/authSlice';
import { Button, Input, Logo } from './index.js';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

function Signup() {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const create = async (data) => {
        setError("");

        try {
            // Step 1: Create user account
            await authService.createAccount(data);

            // Step 2: Login
            await authService.login({ email: data.email, password: data.password });

            // Step 3: Wait for session to persist
            await new Promise(resolve =>setTimeout(resolve, 300));


            const currentUser = await authService.getCurrentUser();

                if (currentUser) {
                    dispatch(login(currentUser));
                    navigate("/");
                } else {
                    setError("Failed to fetch user after signup.");
                }
        // delay helps session settle in Appwrite

        } catch (error) {
            setError(error?.message || "Something went wrong. Please try again.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-white via-gray-100 to-gray-200">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
                <div className="flex justify-center mb-6">
                    <Logo width="80px" />
                </div>
                <h2 className="text-2xl font-bold text-center text-gray-800">Create an Account</h2>
                <p className="text-sm text-center text-gray-500 mt-2">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-600 hover:underline font-medium">
                        Log in
                    </Link>
                </p>

                {error && <p className="text-red-600 text-center mt-4">{error}</p>}

                <form onSubmit={handleSubmit(create)} className="mt-6 space-y-5">
                    <div>
                        <Input
                            label="Full Name"
                            placeholder="Enter your full name"
                            {...register("name", { required: "Name is required" })}
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                    </div>
                    <div>
                        <Input
                            label="Email"
                            type="email"
                            placeholder="Enter your email"
                            {...register("email", {
                                required: "Email is required",
                                validate: {
                                    isValid: (value) =>
                                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Enter a valid email",
                                }
                            })}
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>
                    <div>
                        <Input
                            label="Password"
                            type="password"
                            placeholder="Enter your password"
                            autoComplete="current-password"
                            {...register("password", { required: "Password is required" })}
                        />
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                    </div>

                    <Button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700">
                        Sign Up
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default Signup;
