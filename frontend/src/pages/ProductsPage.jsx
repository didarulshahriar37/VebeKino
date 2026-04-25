import { useState, useEffect } from "react";
import { Link } from "react-router";
import { 
  Search, 
  Filter, 
  ShoppingCart, 
  Star, 
  Loader2, 
  ChevronRight, 
  Grid2X2, 
  List, 
  ArrowUpDown,
  ArrowRight
} from "lucide-react";

const C = {
  primary: "#1c8079",
  primaryLight: "#2fe0cb",
  bg: "#f0fafa",
  text: "#0d3533",
  textMuted: "#4a8580",
  white: "#ffffff",
  border: "#a8d8d4",
};

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("latest");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 20;

  const categories = ["All", "Electronics", "Clothing", "Home & Kitchen", "Sports & Fitness", "Beauty & Personal Care", "Toys & Games", "Books & Stationery", "Health & Wellness", "Accessories", "Food & Beverages"];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:3000/products/all");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const getFilteredAndSortedProducts = () => {
    let filtered = products.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === "All" || p.category === activeCategory;
      return matchesSearch && matchesCategory;
    });

    if (sortBy === "priceLow") filtered.sort((a, b) => a.price - b.price);
    else if (sortBy === "priceHigh") filtered.sort((a, b) => b.price - a.price);
    else if (sortBy === "rating") filtered.sort((a, b) => b.rating - a.rating);
    else if (sortBy === "latest") filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return filtered;
  };

  const allFilteredProducts = getFilteredAndSortedProducts();
  
  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const displayedProducts = allFilteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(allFilteredProducts.length / productsPerPage);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, activeCategory, sortBy]);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen pt-20 pb-20" style={{ backgroundColor: C.bg }}>
      {/* ── Breadcrumb & Header ── */}
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <nav className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold mb-4" style={{ color: C.textMuted }}>
          <Link to="/" className="hover:text-[#1c8079]">Home</Link>
          <ChevronRight size={10} />
          <span style={{ color: C.primary }}>Catalog</span>
        </nav>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-5xl font-black mb-2" style={{ color: C.text }}>Our <span style={{ color: C.primary }}>Collection</span></h1>
            <p className="text-sm" style={{ color: C.textMuted }}>Browse through our curated selection of premium goods.</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold" style={{ color: C.text }}>{allFilteredProducts.length} Items Found</span>
            <div className="w-px h-4 bg-gray-300" />
            <div className="flex items-center gap-1">
              <button className="p-2 rounded-lg bg-white border" style={{ borderColor: C.border, color: C.primary }}><Grid2X2 size={16} /></button>
            </div>
            
            {/* Top Pagination */}
            {allFilteredProducts.length > productsPerPage && (
              <div className="flex items-center gap-2 ml-4">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`w-8 h-8 flex items-center justify-center rounded-lg border transition-all ${currentPage === 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-[#1c8079] hover:text-white'}`}
                  style={{ borderColor: C.border, backgroundColor: C.white }}
                >
                  <ChevronRight size={14} className="rotate-180" />
                </button>
                <div className="flex items-center gap-1">
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => paginate(i + 1)}
                      className={`w-8 h-8 flex items-center justify-center rounded-lg border text-xs font-bold transition-all ${currentPage === i + 1 ? 'bg-[#1c8079] text-white shadow-md' : 'bg-white hover:bg-gray-50'}`}
                      style={{ 
                        borderColor: currentPage === i + 1 ? '#1c8079' : C.border,
                        color: currentPage === i + 1 ? '#fff' : C.text
                      }}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`w-8 h-8 flex items-center justify-center rounded-lg border transition-all ${currentPage === totalPages ? 'opacity-30 cursor-not-allowed' : 'hover:bg-[#1c8079] hover:text-white'}`}
                  style={{ borderColor: C.border, backgroundColor: C.white }}
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-10">
        {/* ── Sidebar Filters ── */}
        <aside className="w-full lg:w-64 flex-shrink-0 relative z-[60]">
          <div className="sticky top-28 space-y-8">
            {/* Search */}
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] font-bold mb-3" style={{ color: C.text }}>Search</label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2" size={16} style={{ color: C.textMuted }} />
                <input
                  type="text"
                  placeholder="Find something..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border text-sm outline-none transition-all focus:ring-2 focus:ring-[#1c8079]/10"
                  style={{ borderColor: C.border, backgroundColor: C.white }}
                />
              </div>
            </div>

            {/* Categories */}
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] font-bold mb-3" style={{ color: C.text }}>Categories</label>
              <div className="flex flex-wrap lg:flex-col gap-2">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2.5 rounded-xl text-left text-sm font-medium transition-all ${activeCategory === cat ? 'bg-[#1c8079] text-white shadow-lg' : 'bg-white hover:bg-gray-50'}`}
                    style={{ 
                      border: activeCategory === cat ? 'none' : `1px solid ${C.border}`,
                      color: activeCategory === cat ? '#fff' : C.text
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Sorting */}
            <div className="relative">
              <label className="block text-[10px] uppercase tracking-[0.2em] font-bold mb-3" style={{ color: C.text }}>Sort By</label>
              <button 
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl border bg-white text-sm transition-all hover:border-[#1c8079]" 
                style={{ borderColor: C.border }}
              >
                {sortBy === "latest" ? "Latest Arrivals" : sortBy === "priceLow" ? "Price: Low to High" : sortBy === "priceHigh" ? "Price: High to Low" : "Top Rated"}
                <ArrowUpDown size={14} style={{ color: C.textMuted }} />
              </button>
              
              {isSortOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border z-[100] overflow-hidden" style={{ borderColor: C.border }}>
                  {[
                    { id: "latest", label: "Latest Arrivals" },
                    { id: "priceLow", label: "Price: Low to High" },
                    { id: "priceHigh", label: "Price: High to Low" },
                    { id: "rating", label: "Top Rated" }
                  ].map(option => (
                    <button
                      key={option.id}
                      onClick={() => { setSortBy(option.id); setIsSortOpen(false); }}
                      className="w-full text-left px-4 py-3 text-sm hover:bg-gray-50 transition-colors"
                      style={{ color: sortBy === option.id ? C.primary : C.text, fontWeight: sortBy === option.id ? 'bold' : 'normal' }}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* ── Product Grid ── */}
        <div className="flex-1">
          {loading ? (
            <div className="h-96 flex flex-col items-center justify-center">
              <Loader2 className="animate-spin mb-4" style={{ color: C.primary }} size={40} />
              <p className="text-sm font-medium text-gray-400 uppercase tracking-widest">Loading Collection</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {displayedProducts.map(product => (
                <Link
                  key={product._id}
                  to={`/product-details/${product._id}`}
                  className="group bg-white rounded-[2.5rem] p-5 transition-all duration-500 hover:-translate-y-2 flex flex-col"
                  style={{ boxShadow: "0 0 0 0px transparent, 0 10px 40px rgba(0,0,0,0.02)" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = "0 0 0 2px #2fe0cb, 0 20px 50px rgba(0,0,0,0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "0 0 0 0px transparent, 0 10px 40px rgba(0,0,0,0.02)";
                  }}
                >
                  <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-[#f8fcfb] mb-6">
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {!product.availability && (
                      <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px] flex items-center justify-center">
                        <span className="px-3 py-1 rounded-full bg-[#d94f3d] text-white text-[9px] font-black uppercase tracking-widest shadow-lg">
                          Out of Stock
                        </span>
                      </div>
                    )}
                    <div className="absolute top-4 right-4 translate-y-2 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                       <div className="px-3 py-1.5 rounded-full bg-white/90 backdrop-blur text-[9px] font-black uppercase tracking-widest text-[#1c8079] shadow-sm">
                         View Details
                       </div>
                    </div>
                  </div>

                  <div className="px-2 flex-1 flex flex-col">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: C.primary }}>{product.category}</span>
                      <div className="flex items-center gap-1">
                        <Star size={10} fill="#e8a860" stroke="#e8a860" />
                        <span className="text-[10px] font-bold" style={{ color: C.text }}>{product.rating}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-3 line-clamp-2" style={{ color: C.text }}>{product.name}</h3>
                    <div className="mt-auto flex items-center justify-between">
                      <p className="text-2xl font-black" style={{ color: C.text }}>${product.price}</p>
                      <ArrowRight size={18} className="text-[#1c8079] transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* ── Pagination ── */}
          {!loading && allFilteredProducts.length > productsPerPage && (
            <div className="mt-16 flex items-center justify-center gap-2">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className={`w-10 h-10 flex items-center justify-center rounded-xl border transition-all ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#1c8079] hover:text-white hover:shadow-lg'}`}
                style={{ borderColor: C.border, backgroundColor: C.white }}
              >
                <ChevronRight size={16} className="rotate-180" />
              </button>
              
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => paginate(i + 1)}
                  className={`w-10 h-10 flex items-center justify-center rounded-xl border text-sm font-bold transition-all ${currentPage === i + 1 ? 'bg-[#1c8079] text-white shadow-lg' : 'bg-white hover:bg-gray-50'}`}
                  style={{ 
                    borderColor: currentPage === i + 1 ? '#1c8079' : C.border,
                    color: currentPage === i + 1 ? '#fff' : C.text
                  }}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`w-10 h-10 flex items-center justify-center rounded-xl border transition-all ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#1c8079] hover:text-white hover:shadow-lg'}`}
                style={{ borderColor: C.border, backgroundColor: C.white }}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}

          {!loading && displayedProducts.length === 0 && (
            <div className="py-32 text-center">
              <h3 className="text-2xl font-bold mb-2">No products found</h3>
              <p className="text-gray-400">Try adjusting your filters or search terms.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;