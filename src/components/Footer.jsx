import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useTheme } from "../provider/ThemeProvider";

function Footer() {
  const currentYear = new Date().getFullYear();
  const { theme } = useTheme();

  return (
    <footer className={`${
      theme === 'dark'
        ? 'bg-gradient-to-r from-black via-purple-950 to-black'
        : 'bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800'
    } text-gray-300 py-10`}>
      <div className="container mx-auto px-6 sm:px-10 md:px-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Website Information */}
        <div>
          <h3 className="text-3xl font-extrabold text-white mb-4 font-mont">
            Ani<span className={theme === 'dark' ? 'text-purple-400' : 'text-teal-400'}>Verse</span>
          </h3>
          <p className="text-gray-300 text-sm leading-relaxed font-mont">
            Your ultimate destination for animated movie lovers. Discover,
            explore, and enjoy the world of animated movies with AniVerse.
          </p>
        </div>

        {/* Contact Information */}
        <div>
          <h4 className="text-xl font-bold text-white mb-4 font-mont">Contact Us</h4>
          <div className="space-y-4 font-mont">
            <div className="flex items-center group">
              <FaEnvelope className={`mr-3 ${
                theme === 'dark' ? 'text-purple-400' : 'text-teal-400'
              } group-hover:scale-110 transition-transform duration-300`} />
              <span className="text-gray-300 group-hover:text-white transition-colors duration-300">
                support@aniVerse.com
              </span>
            </div>
            <div className="flex items-center group">
              <FaPhoneAlt className={`mr-3 ${
                theme === 'dark' ? 'text-purple-400' : 'text-teal-400'
              } group-hover:scale-110 transition-transform duration-300`} />
              <span className="text-gray-300 group-hover:text-white transition-colors duration-300">
                +88 0179 9332 841
              </span>
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div>
          <h4 className="text-xl font-bold text-white mb-4 font-mont">Connect With Us</h4>
          <div className="flex space-x-4">
            <a
              href="https://www.facebook.com/kirimvesValitsos"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 text-white rounded-full transition-all duration-300 ${
                theme === 'dark'
                  ? 'bg-purple-600 hover:bg-purple-500'
                  : 'bg-teal-600 hover:bg-teal-500'
              } hover:scale-110`}
            >
              <FaFacebook size={20} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 text-white rounded-full transition-all duration-300 ${
                theme === 'dark'
                  ? 'bg-purple-600 hover:bg-purple-500'
                  : 'bg-teal-600 hover:bg-teal-500'
              } hover:scale-110`}
            >
              <FaXTwitter size={20} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 text-white rounded-full transition-all duration-300 ${
                theme === 'dark'
                  ? 'bg-purple-600 hover:bg-purple-500'
                  : 'bg-teal-600 hover:bg-teal-500'
              } hover:scale-110`}
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 text-white rounded-full transition-all duration-300 ${
                theme === 'dark'
                  ? 'bg-purple-600 hover:bg-purple-500'
                  : 'bg-teal-600 hover:bg-teal-500'
              } hover:scale-110`}
            >
              <FaLinkedin size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright and Legal */}
      <div className="border-t border-gray-700 mt-8 pt-6 text-center">
        <p className="text-sm text-gray-300 font-mont">
          © {currentYear} <span className={`font-bold ${
            theme === 'dark' ? 'text-purple-400' : 'text-teal-400'
          }`}>AniVerse</span>
          . All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;