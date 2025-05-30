import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-background px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <h2 className="text-9xl font-extrabold text-primary">404</h2>
        <h1 className="mt-4 text-3xl font-bold text-text-primary sm:text-4xl">Sahifa topilmadi</h1>
        <p className="mt-6 text-base text-text-secondary">Kechirasiz, siz izlagan sahifani topa olmadik.</p>
        <div className="mt-10">
          <Link to="/" className="btn-primary">
            Bosh sahifaga qaytish
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
