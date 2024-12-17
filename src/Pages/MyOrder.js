// react hooks
import { useEffect, useState } from "react";

// react router
import { Link } from "react-router-dom";

// custom context hook for value (product)
import { useProductContext } from "../productContext";

// required component for Order Detail and Loading spinner
import OrderDetail from "../Components/MyOrder/OrderDetail";
import Loader from "../Components/Loader/Loader";

// css styles
import styles from "../styles/myorder.module.css";

// render my order page
export function MyOrder() {
  // getting all order's from custom context hook
  const { myorders } = useProductContext();

  // to show/hide loading spinner on the page
  const [isLoading, setLoading] = useState(true);

  // hide the spinner after given time
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, []);

  return (
    // conditions to show/hide spinner
    <>
      {isLoading ? (
        <Loader />
      ) : (
        // main page container
        <div className={styles.mainContainer}>
          {/* page heading */}
          <h1 className={styles.orderHeading}>My Orders</h1>

          {/* to show message if no order in list */}
          {myorders.length === 0 ? (
            <>
              {/* message of no order */}
              <h1>You haven't placed any order yet !!</h1>
              {/* link to redirect to home page */}
              <Link to="/">!!! Start Shopping !!!</Link>
            </>
          ) : (
            // if contains order than render them one by one
            // order list container
            <div className={styles.orderListContainer}>
              {myorders.map((order, i) => (
                <OrderDetail key={i} order={order} />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
