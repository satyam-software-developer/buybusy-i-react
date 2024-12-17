
// custom context hook
import { useAuthValue } from "../../authContext";
import { IoHomeOutline } from "react-icons/io5";
import { FaShop } from "react-icons/fa6";
import { FaShoppingBasket } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { GoSignIn } from "react-icons/go";
import { FaSignOutAlt } from "react-icons/fa";

// css styles 
import styles from "../../styles/navbar.module.css";

// import form react router
import { Outlet, NavLink } from "react-router-dom";


// Navbar Component
export default function Navbar(){
    // user's login status
    const {isLoggedIn,signOut}=useAuthValue();

    return(
        <>
            {/* main container */}
            <div className={styles.navbarContainer}> 
                {/* app heading */}
                <div className={styles.appName}>
                    <NavLink to="/">
                        {/* logo of the app */}
                        <FaShop />
                        Buy Busy
                    </NavLink>
                </div>

                {/* all the navigation link */}
                <div className={styles.navLinks}>

                    {/* homepage link */}
                    <NavLink to="/">
                        <span>
                            {/* home logo */}
                            <IoHomeOutline />
                            Home
                        </span>
                    </NavLink>

                    {/* myorder link */}
                    {/* show when user is logged in */}
                    {isLoggedIn && <NavLink to="/myorder">
                        <span>
                            {/* my order logo */}
                            <FaShoppingBasket />
                            My orders
                        </span>
                    </NavLink> }


                    {/* cart link */}
                    {/* show when user is logged in */}
                    {isLoggedIn && <NavLink to="/cart">
                        <span>
                            {/* cart icon */}
                            <FaShoppingCart />
                            Cart
                        </span>
                    </NavLink> }


                    {/* for signIN and signOut */}
                    <NavLink to={!isLoggedIn?"/signin":"/"}>
                        <span>
                            {!isLoggedIn?
                                <>
                                    {/* sign in icon */}
                                    <GoSignIn />
                                    SignIn
                                </>
                                :
                                <>
                                    {/* sign out icon */}
                                    <FaSignOutAlt />
                                    {/* sign out user  */}
                                    <span onClick={signOut}>SignOut</span>
                                </>
                            }
                        </span>
                    </NavLink>
                </div>
            </div>
            {/* render child pages */}
            <Outlet />
        </>
    )
}