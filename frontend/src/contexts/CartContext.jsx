import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const { user } = useAuth();

  // Load cart from DB when user changes
  useEffect(() => {
    if (user && user.email) {
      fetch(`http://localhost:3000/cart/${user.email}`)
        .then((res) => res.json())
        .then((data) => setCartItems(data || []))
        .catch((err) => console.error("Error loading cart:", err));
    } else {
      setCartItems([]);
    }
  }, [user]);

  const addToCart = async (product, quantity = 1) => {
    if (!user) return;
    try {
      const res = await fetch("http://localhost:3000/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userEmail: user.email, product, quantity }),
      });
      const data = await res.json();
      setCartItems(data);
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  const removeFromCart = async (productId) => {
    if (!user) return;
    try {
      const res = await fetch(`http://localhost:3000/cart/${user.email}/${productId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      setCartItems(data);
    } catch (err) {
      console.error("Error removing from cart:", err);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (!user) return;
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    try {
      const res = await fetch("http://localhost:3000/cart", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userEmail: user.email, productId, quantity }),
      });
      const data = await res.json();
      setCartItems(data);
    } catch (err) {
      console.error("Error updating quantity:", err);
    }
  };

  const clearCart = async () => {
    if (!user) return;
    try {
      await fetch(`http://localhost:3000/cart/${user.email}`, {
        method: "DELETE",
      });
      setCartItems([]);
    } catch (err) {
      console.error("Error clearing cart:", err);
    }
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartCount, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
};
