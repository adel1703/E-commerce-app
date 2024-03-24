import React, { createContext, useContext, useEffect, useState } from "react";
import { authContext } from "./AuthContext";
import axios from "axios";

export const WishlistContext = createContext();

export default function WishlistContextProvider({ children }) {
  const { token ,UserID } = useContext(authContext);

  const [wishlist, setWishlist] = useState(null);
  const [numOfWhishlistItem, setNumOfWhishlistItem] = useState(0);
  const [allProducts, setAllProducts] = useState(null);
  const [cartId, setCartId] = useState(null);

  async function getWishlist() {
    await axios
    .get("https://ecommerce.routemisr.com/api/v1/wishlist", {
      headers:  {token : localStorage.getItem("Token")},
    })
    .then((res) => {
      setNumOfWhishlistItem(res.data.count);
      setAllProducts(res.data.data);
      setCartId(res.data.data._id);
      console.log(res);
      })
      .catch((err) => {
        console.log("in case of error ", err);
      });
  }

  async function addToWishlist(id) {
    try {
      await axios.post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        {
          productId: id,
        },
        {
          headers: { token: localStorage.getItem("Token") },
        }
      );
      // Refresh wishlist after adding
      await getWishlist();
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async function deleteProductFromWhishlist(id){
    try {
      await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
        headers: { token: localStorage.getItem("Token") }
      });
  
      // Fetch wishlist again to update the state
      await getWishlist();
      
      return true;
    } catch (error) {
      console.log("Error deleting product from wishlist:", error);
      return false;
    }
  }
  

  useEffect(() => {
    getWishlist(); // Fetch wishlist on component mount
  }, [token]); // Empty dependency array to run only once

  return (
    <WishlistContext.Provider value={{ addToWishlist, wishlist , numOfWhishlistItem,
      allProducts,
      deleteProductFromWhishlist,
      
      }}>
      {children}
    </WishlistContext.Provider>
  );
}
