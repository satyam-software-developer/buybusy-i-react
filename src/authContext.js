// react hooks
import { createContext, useContext, useEffect, useState } from "react";

// firebase database
import { db } from "./firebaseInit";
import { collection, addDoc, onSnapshot } from "firebase/firestore";

// toast notification
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// create contextAPI for authentication
export const authContext = createContext();

// custom context hook to return values
export function useAuthValue() {
  const value = useContext(authContext);
  return value;
}

// custom context Provider
export function AuthContext({ children }) {
  // list of all the users in database
  const [userList, setUserList] = useState([]);
  // loggedIn user's status
  const [isLoggedIn, setLoggedIn] = useState(false);
  // user who is logged in
  const [userLoggedIn, setUserLoggedIn] = useState(null);

  // getting all the users from data base on first render of page
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "buybusy"), (snapShot) => {
      const users = snapShot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setUserList(users);
    });
  }, [isLoggedIn]);

  // creating new user
  async function createUser(data) {
    // checking whether the email address already in use or not
    const index = userList.findIndex((user) => user.email === data.email);

    // if found email display notification
    if (index !== -1) {
      toast.error(
        "Email Address already exist, Try Again or SignIn Instead!!!"
      );
      return;
    }

    // if email not found create new user
    const docRef = await addDoc(collection(db, "buybusy"), {
      name: data.name,
      email: data.email,
      password: data.password,
      cart: [],
      orders: [],
    });
    toast.success("New user Created, Please LogIn to Continue !!");
  }

  // sign IN user
  async function signIn(data) {
    // finding user in database
    const index = userList.findIndex((user) => user.email === data.email);

    // if user not found show notification
    if (index === -1) {
      toast.error("Email does not exist, Try again or SignUp Instead!!!");
      return false;
    }

    // if email found in database then match password
    if (userList[index].password === data.password) {
      toast.success("Sign In Successfully!!!");
      // logging in user and storing its data in local variable
      setLoggedIn(true);
      setUserLoggedIn(userList[index]);
      // generating user's login token and store user's data
      window.localStorage.setItem("token", true);
      window.localStorage.setItem("index", JSON.stringify(userList[index]));
      return true;
    } else {
      // if password doesn't match in database
      toast.error("Wrong UserName/Password, Try Again");
      return false;
    }
  }

  // signout function
  function signOut() {
    // removing user' data and token from local storage
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("index");

    // set loggin status false
    setLoggedIn(false);
    // loggedin user's data
    setUserLoggedIn(null);
    toast.success("Sign Out Successfully!!!!");
  }

  return (
    // context API with values
    <>
      <authContext.Provider
        value={{
          createUser,
          isLoggedIn,
          setLoggedIn,
          signIn,
          userLoggedIn,
          setUserLoggedIn,
          signOut,
        }}
      >
        <ToastContainer />
        {children}
      </authContext.Provider>
    </>
  );
}
