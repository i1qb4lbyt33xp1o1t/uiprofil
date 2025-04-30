'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { FaShoppingCart, FaDollarSign, FaTrash } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => {
        const productsWithStock = data.map(p => ({
          ...p,
          stock: Math.floor(Math.random() * 5) + 1,
        }));
        setProducts(productsWithStock);
      });
  }, []);

  const toggleCart = () => setShowCart(!showCart);

  const addToCart = (product) => {
    if (cart[product.id]?.quantity >= product.stock) return;
    setCart(prev => ({
      ...prev,
      [product.id]: {
        ...product,
        quantity: prev[product.id] ? prev[product.id].quantity + 1 : 1,
      }
    }));
  };

  const removeFromCart = (id) => {
    const newCart = { ...cart };
    delete newCart[id];
    setCart(newCart);
  };

  const updateQuantity = (id, newQty) => {
    const product = cart[id];
    if (newQty < 1 || newQty > product.stock) return;
    setCart(prev => ({
      ...prev,
      [id]: {
        ...product,
        quantity: newQty,
      }
    }));
  };

  const isInCart = (id) => !!cart[id];
  const totalItems = Object.values(cart).reduce((sum, p) => sum + p.quantity, 0);

  return (
    <div className="container mx-auto px-4 py-8 relative">
      {/* Header */}
      <div className="mb-6 text-center relative">
        <h1 className="text-3xl font-bold">Our Products</h1>
        <motion.button
          onClick={toggleCart}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="absolute right-0 top-1/2 -translate-y-1/2"
        >
          <FaShoppingCart size={28} />
          {totalItems > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2 py-0.5"
            >
              {totalItems}
            </motion.span>
          )}
        </motion.button>
      </div>

      {/* Produk */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(product => {
          const inCart = isInCart(product.id);
          return (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow border border-gray-200"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-contain p-4"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1 line-clamp-1">{product.title}</h3>
                <div className="flex items-center text-green-600 mb-2">
                  <FaDollarSign className="mr-1" />
                  <span className="text-lg font-bold">{product.price}</span>
                </div>
                <p className="text-gray-600 text-sm line-clamp-2 mb-2">{product.description}</p>
                <p className="text-sm text-gray-500 mb-2">Stok: {product.stock}</p>
                <motion.button
                  onClick={() => inCart ? removeFromCart(product.id) : addToCart(product)}
                  disabled={product.stock === 0}
                  whileTap={{ scale: 0.97 }}
                  className={`w-full flex items-center justify-center px-4 py-2 text-sm font-semibold rounded-md transition 
                    ${product.stock === 0 
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                      : inCart 
                        ? 'bg-red-500 hover:bg-red-600 text-white' 
                        : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
                >
                  <FaShoppingCart className="mr-2" />
                  {inCart ? 'Remove from Cart' : 'Add to Cart'}
                </motion.button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Cart Drawer */}
      <AnimatePresence>
        {showCart && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 h-full w-full md:w-[400px] bg-white shadow-lg border-l border-gray-200 z-50 overflow-y-auto"
          >
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-bold">Your Cart</h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleCart}
                className="text-sm text-gray-600"
              >
                Close
              </motion.button>
            </div>
            <div className="p-4 space-y-4">
              {totalItems === 0 ? (
                <p className="text-gray-500 text-center">Cart is empty</p>
              ) : (
                Object.values(cart).map(item => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="border rounded-lg p-3 shadow-sm"
                  >
                    <h3 className="font-semibold mb-1">{item.title}</h3>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-700">Price: ${item.price}</span>
                      <span className="text-sm text-gray-500">Stok: {item.stock}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-2 py-1 bg-gray-200 rounded"
                      >-</motion.button>
                      <span>{item.quantity}</span>
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-1 bg-gray-200 rounded"
                      >+</motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => removeFromCart(item.id)}
                        className="ml-auto text-red-500 hover:text-red-700"
                      >
                        <FaTrash />
                      </motion.button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
