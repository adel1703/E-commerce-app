import React, { createContext, useContext, useEffect, useState } from "react";
import { authContext } from "./AuthContext";
import axios from "axios";

export const cartContext = createContext();

export default function CartContextProvider({ children }) {
  const { token  } = useContext(authContext);

  const [numOfCarttItem, setNumOfCarttItem] = useState(0);
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [allProducts, setAllProducts] = useState([]);
  const [cartId, setCartId] = useState(null);

 
  
  
  async function getUserCart() {
    await axios
    .get("https://ecommerce.routemisr.com/api/v1/cart", {
      headers:  {token : localStorage.getItem("Token")},
    })
    .then((res) => {
      setNumOfCarttItem(res.data.numOfCartItems);
      setTotalCartPrice(res.data.data.totalCartPrice);
      setAllProducts(res.data.data.products);
      setCartId(res.data.data._id);
      console.log(res);
      console.log("allProducts" , res.data.data.products );
      })
      .catch((err) => {
        console.log("in case of error ", err);
      });
  }

  function addProductToCart(id) {
    return axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          productId: id,
        },
        {
          headers: { token: localStorage.getItem("Token") },
        }
      )
      .then((res) => {
        getUserCart();
        return true; // Return the response data
      })
      .catch(error => {
        console.log(error);
        return false; // Rethrow the error
      });
  }


  async function updateCount(id , newCount){
    const flag = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}` , {   
        "count": newCount  }, {
          headers: { token: localStorage.getItem("Token") }
        }).then((res)=>{
          setTotalCartPrice(res.data.data.totalCartPrice);
          setNumOfCarttItem(res.data.numOfCartItems);
          setAllProducts(res.data.data.products);
          return true;
        }).catch((err)=>{
          console.log("error isssssssssss " , err);
          return false;
        })
        return flag;
  }

  
  async function deleteProduct(id){
    const booleanFlag = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}` , {
      headers: { token: localStorage.getItem("Token") }
    } ).then((res)=>{
      setTotalCartPrice(res.data.data.totalCartPrice);
      setNumOfCarttItem(res.data.numOfCartItems);
      setAllProducts(res.data.data.products);
      return true;
    }).catch((err)=>{
      console.log("error is " , err);
      return false;
    })
    return booleanFlag;
}

async function clearCart() {
  try {
    await axios.delete('https://ecommerce.routemisr.com/api/v1/cart', {
      headers: { token: localStorage.getItem("Token") }
    });

    // Clear the cart data in the component state
    setAllProducts([]);
    setTotalCartPrice(0);
    setNumOfCarttItem(0);
    
    return true;
  } catch (error) {
    console.log("Error clearing cart:", error);
    return false;
  }
}
  useEffect(() => {
    getUserCart();
  }, [token ]);


  return (
    <cartContext.Provider value={{ 
      addProductToCart ,
      numOfCarttItem ,
      allProducts ,
      totalCartPrice ,
      updateCount ,
      deleteProduct ,
      clearCart ,
      cartId ,
      getUserCart
  }}>
    {children}
  </cartContext.Provider>
  );
}
