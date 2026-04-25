import { useState, useEffect } from "react";
import { Link } from "react-router";
import { ShoppingCart, Star, ArrowRight, Loader2 } from "lucide-react";

const C = {
  primary: "#1c8079",
  primaryLight: "#2fe0cb",
  primaryDark: "#155f5a",
  bg: "#f0fafa",
  text: "#0d3533",
  textMuted: "#4a8580",
  white: "#ffffff",
  accent: "#e8a860",
};

const PopularProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPopular = async () => {
      try {
        const res = await fetch("http://localhost:3000/products/popular");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch popular products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPopular();
  }, []);

  if (loading) {
    return (
      <div className="py-24 flex flex-col items-center justify-center">
        <Loader2 className="animate-spin mb-4" style={{ color: C.primary }} size={40} />
        <p className="text-sm font-medium uppercase tracking-widest" style={{ color: C.textMuted }}>Loading Trends</p>
      </div>
    );
  }

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.3em] mb-3" style={{ color: C.primary }}>
            Curated Selection
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight" style={{ color: C.text }}>
            Popular <span style={{ color: C.primary }}>Products</span>
          </h2>
        </div>
        <Link
          to="/all-products"
          className="group flex items-center gap-2 text-sm font-bold transition-all duration-300"
          style={{ color: C.text }}
        >
          Explore All
          <div className="w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 group-hover:bg-[#1c8079] group-hover:border-[#1c8079] group-hover:text-white" style={{ borderColor: C.primary }}>
            <ArrowRight size={14} />
          </div>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div
            key={product._id}
            className="group relative bg-white rounded-[2rem] p-4 transition-all duration-500 hover:-translate-y-2"
            style={{ 
              boxShadow: "0 10px 40px rgba(0,0,0,0.03)",
              border: "1px solid rgba(28,128,121,0.08)"
            }}
          >
            {/* Image Container */}
            <div className="relative aspect-square rounded-[1.5rem] overflow-hidden bg-[#f8fcfb] mb-6">
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute top-3 right-3">
                <button className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center shadow-sm transition-colors hover:bg-white text-[#1c8079]">
                  <ShoppingCart size={18} />
                </button>
              </div>
              <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-white/80 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider" style={{ color: C.text }}>
                {product.category}
              </div>
            </div>

            {/* Content */}
            <div className="px-2">
              <div className="flex items-center gap-1 mb-2">
                <Star size={12} fill={C.accent} stroke={C.accent} />
                <span className="text-xs font-bold" style={{ color: C.text }}>{product.rating}</span>
              </div>
              <h3 className="text-lg font-bold mb-1 truncate" style={{ color: C.text }}>{product.name}</h3>
              <p className="text-xs mb-4 line-clamp-1" style={{ color: C.textMuted }}>{product.description}</p>
              
              <div className="flex items-center justify-between mt-auto">
                <p className="text-xl font-black" style={{ color: C.primary }}>
                  ${product.price}
                </p>
                <Link
                  to={`/product-details/${product._id}`}
                  className="text-xs font-bold underline underline-offset-4 decoration-2 decoration-[#2fe0cb] hover:text-[#1c8079] transition-colors"
                  style={{ color: C.text }}
                >
                  Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularProducts;