// src/components/Footer.js
import React from "react";
import './App.css'; // Import the CSS for styling

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>&copy; {new Date().getFullYear()} Weather Dashboard. All rights reserved.</p>
                <div className="social-links">
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;