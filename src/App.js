// react router
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// custom context provider (authentication and product)
import { AuthContext } from "./authContext";
import { ProductContext } from "./productContext";

// all the pages and component to render
import Navbar from "./Components/Navbar/Navbar";
import { Home } from "./Pages/Home";
import { MyOrder } from "./Pages/MyOrder";
import { Cart } from "./Pages/Cart";
import { SignIn } from "./Pages/SignIn";
import { SignUp } from "./Pages/SignUp";
import { Error } from "./Pages/Error";

// main app function
function App() {
  // all the link routes
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      errorElement: <Error />,
      children: [
        { index: true, element: <Home /> },
        { path: "/myorder", element: <MyOrder /> },
        { path: "/cart", element: <Cart /> },
        { path: "/signin", element: <SignIn /> },
        { path: "/signup", element: <SignUp /> },
      ],
    },
  ]);

  return (
    <>
      {/* custom authContext provider */}
      <AuthContext>
        {/* custom product context provider */}
        <ProductContext>
          {/* routes */}
          <RouterProvider router={router} />
        </ProductContext>
      </AuthContext>
    </>
  );
}

export default App;
