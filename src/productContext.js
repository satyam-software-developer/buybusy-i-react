// react hooks
import { createContext, useContext, useEffect, useState } from "react";

// database
import { db } from "./firebaseInit";
import {
  updateDoc,
  doc,
  arrayUnion,
  onSnapshot,
  arrayRemove,
} from "firebase/firestore";

// importing list of all the products
import { data } from "./Assets/data";

// values from custom hook (authentication)
import { useAuthValue } from "./authContext";

// toast notification
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

// create contextAPI for product
export const productContext = createContext();

// custom context hook
export function useProductContext() {
  const value = useContext(productContext);
  return value;
}

// custom Provider
export function ProductContext({ children }) {
  // user's login status and loggedIn user
  const { isLoggedIn, userLoggedIn, setLoggedIn, setUserLoggedIn } =
    useAuthValue();
  // number of items in cart
  const [itemInCart, setItemInCart] = useState(0);
  // all products in cart
  const [cart, setCart] = useState([]);
  // all order placed by user
  const [myorders, setMyOrders] = useState([]);
  // total amount of user's cart
  const [total, setTotal] = useState(0);

  // return date in yy/mm/dd format
  function getDate() {
    // getting current date
    const date = new Date();
    // day
    let day = date.getDate();
    // month
    let month = date.getMonth() + 1;
    // year
    let year = date.getFullYear();

    // yy/mm/dd format
    return `${year}-${month}-${day}`;
  }

  // to check if the user is still logged in on page refresh
  useEffect(() => {
    // getting user authentication token from local storage
    const token = window.localStorage.getItem("token");
    if (token) {
      // loggedIn user's data
      const index = window.localStorage.getItem("index");
      const user = JSON.parse(index);
      setLoggedIn(token);
      setUserLoggedIn(user);
    }
  }, []);

  // getting real time update of user's cart
  useEffect(() => {
    // check whether user is logged in or not
    if (isLoggedIn) {
      // getting real-time update of data
      const unsub = onSnapshot(doc(db, "buybusy", userLoggedIn.id), (doc) => {
        // storing all the data in cart
        setCart(doc.data().cart);
        setMyOrders(doc.data().orders);
      });
      // total amount of products in cart
      let sum = 0;
      cart.map((item) => Number((sum += item.price)));
      setTotal(sum);
      setItemInCart(cart.length);
    }
  }, [userLoggedIn]);

  // to increase item's quantity
  async function increaseQuant(product) {
    // finding item's index in cart array
    const index = cart.findIndex((item) => item.name === product.name);
    // increase product quantity and update in useState
    cart[index].quantity++;
    setCart(cart);

    // update cart in firebase database
    const userRef = doc(db, "buybusy", userLoggedIn.id);
    await updateDoc(userRef, {
      cart: cart,
    });
    // increase itemCount and total amount
    setItemInCart(itemInCart + 1);
    setTotal(Number(total + cart[index].price));
  }

  // to decrease item's quantity
  async function decreaseQuant(product) {
    // finding item's index
    const index = cart.findIndex((item) => item.name === product.name);
    // reduce total amount
    setTotal(Number(total - cart[index].price));

    // change quantity of product and update cart array
    if (cart[index].quantity > 1) {
      cart[index].quantity--;
    } else {
      cart.splice(index, 1);
    }

    // update cart and item Count
    setCart(cart);
    setItemInCart(itemInCart - 1);

    // update cart in array
    const userRef = doc(db, "buybusy", userLoggedIn.id);
    await updateDoc(userRef, {
      cart: cart,
    });
  }

  // function to add product to cart
  async function addToCart(product) {
    // check whether user is logged in or not
    if (!isLoggedIn) {
      toast.error("Please first Login !!!");
      return;
    }

    // checking whether the product already in the cart
    const index = cart.findIndex((item) => item.name === product.name);
    if (index !== -1) {
      // if product already in cart then increase quantity
      increaseQuant(cart[index]);
      toast.success("Product Quantity Increased!!");
      return;
    }

    // add product to the cart of loggedIn user
    const userRef = doc(db, "buybusy", userLoggedIn.id);
    await updateDoc(userRef, {
      cart: arrayUnion({ quantity: 1, ...product }),
    });
    // increase item  count and total amount
    setTotal(Number(total + product.price));
    setItemInCart(itemInCart + 1);
    toast.success("Added to your Cart!!");
  }

  // remove a single product from cart
  async function removeFromCart(product) {
    // update database
    const userRef = doc(db, "buybusy", userLoggedIn.id);
    await updateDoc(userRef, {
      cart: arrayRemove(product),
    });
    // reduce item count and total amount
    setTotal(Number(total - product.quantity * product.price));
    setItemInCart(itemInCart - product.quantity);
    toast.success("Removed from Cart!!");
  }

  // function to remove all product from cart
  async function clearCart() {
    // if no item in cart then return with message
    if (itemInCart === 0) {
      toast.error("Nothing to remove in Cart!!");
      return;
    }

    // empty cart array in database
    const userRef = doc(db, "buybusy", userLoggedIn.id);
    await updateDoc(userRef, {
      cart: [],
    });

    // set item count and total amount
    setTotal(0);
    setItemInCart(0);
    toast.success("Empty Cart!!");
  }

  // function to purchase all the items in cart
  async function purchaseAll() {
    // get current data from function
    const currentDate = getDate();

    // adding order to database
    const userRef = doc(db, "buybusy", userLoggedIn.id);
    await updateDoc(userRef, {
      orders: arrayUnion({ date: currentDate, list: cart, amount: total }),
    });

    // empty cart
    clearCart();
  }

  return (
    <productContext.Provider
      value={{
        data,
        addToCart,
        cart,
        total,
        setTotal,
        removeFromCart,
        clearCart,
        purchaseAll,
        myorders,
        increaseQuant,
        decreaseQuant,
        itemInCart,
      }}
    >
      {children}
    </productContext.Provider>
  );
}
