import { useState, useEffect } from 'react';
import { Menu, ShoppingCart, X, ChevronDown, LayoutDashboard, LogOut } from 'lucide-react';
import { Link, NavLink, useNavigate } from 'react-router';
import { useAuth } from "../../../contexts/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
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
  return <header className={`fixed top-0 left-0 w-full transition-all duration-300 backdrop-blur-md z-50 shadow-xl`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="flex h-14 sm:h-16 lg:h-20 items-center justify-between">
          {}
          <div className="flex items-center">
            <a href="/" className="flex items-center space-x-2 group">
              <span className="font-bold text-lg sm:text-xl lg:text-2xl">Vebe<span className='text-[#1c8079]'>Kino</span></span>
            </a>
          </div>

          {}
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-6 xl:space-x-8">
            {navLinks.map(link => (
              <NavLink
                key={link.text}
                to={link.href}
                className={({ isActive }) =>
                  `text-sm lg:text-base font-medium transition-colors duration-300 relative group ${
                    isActive ? 'text-[#1c8079]' : 'text-gray-500 hover:text-[#1c8079]'
                  }`
                }
              >
                {link.text}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#1c8079] transition-all duration-300 group-hover:w-full"></span>
              </NavLink>
            ))}
          </nav>

          {}
          <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors"
                >
                  <span className="font-semibold text-sm">{user.name || user.email}</span>
                  <ChevronDown className="h-4 w-4" />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-50">
                    <Link
                      to={user.role === 'admin' ? "/admin/dashboard" : "/user/dashboard"}
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <LayoutDashboard className="h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setIsUserMenuOpen(false);
                        navigate("/");
                      }}
                      className="flex w-full items-center space-x-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 text-left"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Log out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to={"/auth/login"} className="flex items-center space-x-1.5 lg:space-x-2 px-3 lg:px-4 py-1.5 lg:py-2 text-xs lg:text-sm font-medium text-gray-800 border border-[#2fe0cb] rounded-md hover:bg-gray-100 transition-all hover:shadow-md">
                  <span className='font-semibold'>Sign in</span>
                </Link>
                <Link to={"/auth/register"} className="px-4 lg:px-6 py-1.5 lg:py-2 text-xs lg:text-sm bg-gradient-to-r from-[#2fe0cb] to-[#1c8079] text-black font-semibold rounded-md hover:bg-gray-800 transition-all shadow-sm hover:shadow-lg transform hover:scale-105">
                  Sign up
                </Link>
              </>
            )}
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
              {navLinks.map(link => (
                <NavLink
                  key={link.text}
                  to={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `px-3 py-2.5 text-sm sm:text-base font-medium rounded-md transition-colors duration-300 ${
                      isActive
                        ? 'text-[#1c8079] bg-[#1c8079]/10'
                        : 'text-gray-600 hover:text-[#1c8079] hover:bg-[#1c8079]/10'
                    }`
                  }
                >
                  {link.text}
                </NavLink>
              ))}
              <div className="pt-4 mt-2 border-t border-gray-200 flex flex-col space-y-2">
                {user ? (
                  <>
                    <Link
                      to={user.role === 'admin' ? "/admin/dashboard" : "/user/dashboard"}
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center justify-center space-x-2 px-3 py-2.5 text-sm font-medium border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
                    >
                      <LayoutDashboard className="h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setIsMenuOpen(false);
                        navigate("/");
                      }}
                      className="flex items-center justify-center space-x-2 px-3 py-2.5 text-sm font-medium bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Log out</span>
                    </button>
                  </>
                ) : (
                  <>
                    <Link to={"/auth/login"} className="flex items-center justify-center space-x-2 px-3 py-2.5 text-sm font-medium border border-gray-300 rounded-md hover:bg-gray-100 transition-colors">
                      <span>Sign in</span>
                    </Link>
                    <Link to={"/auth/register"} className="px-3 py-2.5 text-sm font-medium bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors">
                      Sign up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>;
};
export default Navbar;