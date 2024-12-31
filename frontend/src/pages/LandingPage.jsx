import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div className=" h-screen flex items-center justify-center">
            <div className="text-center text-teal-700">
                <h1 className="text-6xl font-semibold mb-4">Welcome to E-Shop</h1>
                <p className="text-xl mb-8">Your one-stop destination for all your shopping needs. Let's get started!</p>

                <div className="space-x-4">
                    <Link
                        to="/login"
                        className="inline-block px-6 py-3 bg-white text-teal-700 text-lg font-medium rounded-md border border-2 border-teal-700 hover:bg-teal-700 hover:text-white transition-all duration-300"
                    >
                        Login
                    </Link>
                    <Link
                        to="/register"
                        className="inline-block px-6 py-3 bg-transparent border-2 border-white text-teal-700 text-lg font-medium rounded-md border border-2 border-teal-700 hover:bg-teal-700 hover:text-white transition-all duration-300"
                    >
                        Register
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
