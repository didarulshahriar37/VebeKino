import { useEffect } from "react";

const SEO = ({ title, description }) => {
  useEffect(() => {
    document.title = title ? `${title} | VebeKino` : "VebeKino | Shop Smarter, Not Harder";
    
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = "description";
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", description || "VebeKino helps you overcome impulse buying with our AI-powered Anti-Impulse system. Shop minimalist products with a cooling-off period.");
  }, [title, description]);

  return null;
};

export default SEO;
