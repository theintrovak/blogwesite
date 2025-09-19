import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <footer className="bg-white border-none text-black py-10">
            {/* Container */}
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-1 gap-8">

                {/* Left section */}
                <div>
                    <h2 className="text-2xl font-bold text-white">MyWebsite</h2>
                    <p className="mt-3 text-black">
                        Building modern web apps with clean and simple designs.
                    </p>
                </div>

                {/* Middle section */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
                    <ul className="space-y-2">
                        <li><Link to="/" className="hover:text-white">Home</Link></li>
                        <li><Link to="/about" className="hover:text-white">About</Link></li>
                        <li><Link to="/blog" className="hover:text-white">Blog</Link></li>
                        <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
                    </ul>
                </div>

                {/* Right section */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Follow Us</h3>
                    <div className="flex space-x-4 text-xl">
                        <a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-white"
                        >
                            🐦
                        </a>
                        <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-white"
                        >
                            📘
                        </a>
                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-white"
                        >
                            📸
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="mt-10 border-t border-gray-700 pt-5 text-center text-gray-400 text-sm">
                &copy; {new Date().getFullYear()} MyWebsite. All rights reserved.
            </div>
        </footer>
    );
}

export default Footer