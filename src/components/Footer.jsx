import React from 'react';
import { 
  FaFacebook,  
  FaInstagram, 
  FaLinkedin, 
  FaEnvelope, 
  FaPhoneAlt 
} from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-800 text-primary-content py-10">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Website Information */}
        <div>
          <h3 className="text-2xl font-bold mb-4">AniVerse</h3>
          <p className="text-gray-400 text-sm">
            Ultimate destination for animated movie lovers. Discover, explore, and enjoy the world of animated movies.
          </p>
        </div>

        {/* Contact Information */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
          <div className="space-y-2">
            <div className="flex items-center">
              <FaEnvelope className="mr-2 text-blue-500" />
              <span className='text-gray-400'>support@aniVerse.com</span>
            </div>
            <div className="flex items-center">
              <FaPhoneAlt className="mr-2 text-blue-500" />
              <span className='text-gray-400'>+88 0179 9332 841</span>
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
          <div className="flex space-x-4">
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-blue-600 hover:text-blue-400 transition-colors duration-300"
            >
              <FaFacebook size={24} />
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              className="text-sky-500 hover:text-sky-400 transition-colors duration-300"
            >
              <FaXTwitter size={24} />
            </a>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              className="text-pink-600 hover:text-pink-400 transition-colors duration-300"
            >
              <FaInstagram size={24} />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              className="text-blue-700 hover:text-blue-500 transition-colors duration-300"
            >
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright and Legal */}
      <div className="border-t border-gray-700 mt-8 pt-6 text-center">
        <p className="text-sm text-gray-400">
          © {currentYear} AniVerse. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;