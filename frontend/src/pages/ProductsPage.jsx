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
  ArrowUpDown 
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

  const categories = ["All", "Electronics", "Audio", "Photography", "Gaming", "Home Decor"];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:3000/products");
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

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || p.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

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
            <span className="text-xs font-bold" style={{ color: C.text }}>{filteredProducts.length} Items Found</span>
            <div className="w-px h-4 bg-gray-300" />
            <div className="flex items-center gap-1">
              <button className="p-2 rounded-lg bg-white border" style={{ borderColor: C.border, color: C.primary }}><Grid2X2 size={16} /></button>
              <button className="p-2 rounded-lg text-gray-400"><List size={16} /></button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-10">
        {/* ── Sidebar Filters ── */}
        <aside className="w-full lg:w-64 flex-shrink-0">
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

            {/* Price Range (Mock) */}
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] font-bold mb-3" style={{ color: C.text }}>Sort By</label>
              <button className="w-full flex items-center justify-between px-4 py-3 rounded-xl border bg-white text-sm" style={{ borderColor: C.border }}>
                Latest Arrivals
                <ArrowUpDown size={14} style={{ color: C.textMuted }} />
              </button>
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
              {filteredProducts.map(product => (
                <Link
                  key={product._id}
                  to={`/product-details/${product._id}`}
                  className="group bg-white rounded-[2.5rem] p-5 transition-all duration-500 hover:-translate-y-2 border border-transparent hover:border-[#1c8079]/20"
                  style={{ boxShadow: "0 10px 40px rgba(0,0,0,0.02)" }}
                >
                  <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-[#f8fcfb] mb-6">
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {product.is_popular && (
                      <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-[#1c8079] text-white text-[9px] font-black uppercase tracking-widest shadow-lg">
                        Popular
                      </div>
                    )}
                    <div className="absolute inset-x-4 bottom-4 translate-y-12 transition-transform duration-500 group-hover:translate-y-0">
                      <button className="w-full py-3 rounded-2xl bg-[#0d3533] text-white text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-2xl">
                        <ShoppingCart size={14} /> Add To Cart
                      </button>
                    </div>
                  </div>

                  <div className="px-2">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: C.primary }}>{product.category}</span>
                      <div className="flex items-center gap-1">
                        <Star size={10} fill="#e8a860" stroke="#e8a860" />
                        <span className="text-[10px] font-bold" style={{ color: C.text }}>{product.rating}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-1 truncate" style={{ color: C.text }}>{product.name}</h3>
                    <p className="text-2xl font-black" style={{ color: C.text }}>${product.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {!loading && filteredProducts.length === 0 && (
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