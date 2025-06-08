import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-slate-800 text-white py-5 text-center mt-auto w-full">
      <div className="max-w-screen-xl mx-auto px-5">
        <p className="font-bold text-lg mb-1">Saahi Globals Private Limited</p>
        <p className="text-sm opacity-80">© {currentYear} All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;