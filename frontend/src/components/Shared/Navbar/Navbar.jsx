import { useState, useEffect } from 'react';
import { Menu, ShoppingCart, X } from 'lucide-react';
import { Link } from 'react-router';
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const navLinks = [{
    href: "/",
    text: "Home"
  }, {
    href: "/all-products",
    text: "Products"
  }, {
    href: "/about-us",
    text: "About Us"
  }, {
    href: "/contact",
    text: "Contact"
  }];
  return <header className={`fixed top-0 left-0 w-full transition-all duration-300 backdrop-blur-md z-50`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="flex h-14 sm:h-16 lg:h-20 items-center justify-between">
          {}
          <div className="flex items-center">
            <a href="/" className="flex items-center space-x-2 group">
              <span className="font-bold text-lg sm:text-xl lg:text-2xl text-gray-900">ProjectName</span>
            </a>
          </div>

          {}
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-6 xl:space-x-8">
            {navLinks.map(link => <a key={link.text} href={link.href} className="text-sm lg:text-base font-medium text-gray-500 hover:text-gray-900 transition-colors relative group">
                {link.text}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gray-900 transition-all duration-300 group-hover:w-full"></span>
              </a>)}
          </nav>

          {}
          <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
            <Link to={"/auth/login"} className="flex items-center space-x-1.5 lg:space-x-2 px-3 lg:px-4 py-1.5 lg:py-2 text-xs lg:text-sm font-medium text-gray-800 border border-gray-300 rounded-md hover:bg-gray-100 transition-all hover:shadow-md">
              <span>Sign in</span>
            </Link>
            <Link to={"/auth/register"} className="px-4 lg:px-6 py-1.5 lg:py-2 text-xs lg:text-sm font-medium bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-all shadow-sm hover:shadow-lg transform hover:scale-105">
              Sign up
            </Link>
            <Link to={"/"}><ShoppingCart /></Link>
          </div>

          {}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors" aria-label="Toggle menu">
            {isMenuOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
          </button>
        </div>

        {}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-1">
              {navLinks.map(link => <a key={link.text} href={link.href} onClick={() => setIsMenuOpen(false)} className="px-3 py-2.5 text-sm sm:text-base font-medium text-gray-600 rounded-md hover:bg-gray-100 transition-colors">
                  {link.text}
                </a>)}
              <div className="pt-4 mt-2 border-t border-gray-200 flex flex-col space-y-2">
                <Link to={"/auth/login"} className="flex items-center justify-center space-x-2 px-3 py-2.5 text-sm font-medium border border-gray-300 rounded-md hover:bg-gray-100 transition-colors">
                  <span>Sign in</span>
                </Link>
                <Link to={"/auth/register"} className="px-3 py-2.5 text-sm font-medium bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors">
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>;
};
export default Navbar;