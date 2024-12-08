import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="container mx-auto px-6 sm:px-10 md:px-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Website Information */}
        <div>
          <h3 className="text-3xl font-extrabold text-white mb-4">AniVerse</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Your ultimate destination for animated movie lovers. Discover,
            explore, and enjoy the world of animated movies with AniVerse.
          </p>
        </div>

        {/* Contact Information */}
        <div>
          <h4 className="text-xl font-bold text-white mb-4">Contact Us</h4>
          <div className="space-y-4">
            <div className="flex items-center">
              <FaEnvelope className="mr-3 text-blue-500" />
              <span className="text-gray-400">support@aniVerse.com</span>
            </div>
            <div className="flex items-center">
              <FaPhoneAlt className="mr-3 text-blue-500" />
              <span className="text-gray-400">+88 0179 9332 841</span>
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div>
          <h4 className="text-xl font-bold text-white mb-4">Connect With Us</h4>
          <div className="flex space-x-4">
            <a
              href="https://www.facebook.com/kirimvesValitsos"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-500 transition-all duration-300"
            >
              <FaFacebook size={20} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-sky-500 text-white rounded-full hover:bg-sky-400 transition-all duration-300"
            >
              <FaXTwitter size={20} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-pink-600 text-white rounded-full hover:bg-pink-500 transition-all duration-300"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-blue-700 text-white rounded-full hover:bg-blue-500 transition-all duration-300"
            >
              <FaLinkedin size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright and Legal */}
      <div className="border-t border-gray-700 mt-8 pt-6 text-center">
        <p className="text-sm text-gray-400">
          © {currentYear} <span className="font-bold text-white">AniVerse</span>
          . All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
