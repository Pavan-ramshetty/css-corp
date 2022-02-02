import Product from 'components/Product';
import { CartContext } from 'context/CartContext';
import React, { useContext, useEffect } from 'react';
import { CartResponse } from 'types/CartResponse';
import { ProductResponse } from 'types/ProductResponse';

type Props = {
  products: ProductResponse[];
  cart: CartResponse[];
  loadProducts: () => Promise<void>;
  loadCart: () => Promise<void>;
};

const Home = ({ products, cart, loadProducts, loadCart }: Props) => {
  const {
    loadData,
    handleCart,
    updateCartItem,
    deleteCartItem,
    // products,
    // cart,
    loading,
  } = useContext(CartContext);

  useEffect(() => {
    loadProducts();
    loadCart();
  }, [loadProducts, loadCart]);

  return (
    <>
      {loading['LOAD_DATA'] && (
        <div className="flex justify-center items-center h-screen w-full absolute z-10 bg-gray-600 opacity-60">
          <h1 className="text-white text-4xl">Loading...</h1>
        </div>
      )}
      {products.map((product) => {
        const cartItem = cart.find((x) => x.productId === product.id);
        const addLoading = !!loading[`ADD_CART_${product.id}`];
        const updateLoading = !!loading[`UPDATE_CART_${product.id}`];
        const deleteLoading = !!loading[`DELETE_CART_${product.id}`];
        return (
          <Product
            key={product.id}
            handleCart={handleCart}
            cartItem={cartItem}
            updateCartItem={updateCartItem}
            deleteCartItem={deleteCartItem}
            addLoading={addLoading}
            updateLoading={updateLoading}
            deleteLoading={deleteLoading}
            {...product}
          />
        );
      })}
    </>
  );
};

export default Home;
