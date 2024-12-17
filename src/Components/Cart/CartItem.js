// custom context hook for values (product)
import { useProductContext } from "../../productContext";

// css styles from old other file
import oldStyles from "../../styles/home.module.css";
// new css styles
import styles from "../../styles/cart.module.css";
import { CiCircleMinus } from "react-icons/ci";
import { CiCirclePlus } from "react-icons/ci";

// render single cart item
export default function CartItem(props) {
  // product data from props
  const { name, image, price, category, quantity } = props.product;

  // required functions from custom hook (product)
  const { removeFromCart, increaseQuant, decreaseQuant } = useProductContext();

  return (
    <>
      {/* item card container */}
      <div className={oldStyles.cardContainer}>
        {/* image container */}
        <div className={styles.imageContainer}>
          {/* product image */}
          <img src={image} alt={category} />
        </div>

        {/* description of the product name,price, add button */}
        <div className={styles.itemInfo}>
          {/* product name */}
          <div className={styles.namePrice}>{name}</div>

          <div className={styles.priceQuant}>
            {/* price of the product */}
            <div className={styles.price}>₹{price}</div>

            {/* quantity of the product */}
            <div className={styles.quantity}>
              {/* to decrease product quantity */}
              <span className={styles.minus}>
                <CiCircleMinus onClick={() => decreaseQuant(props.product)} />
              </span>
              {/* quantity */}
              &nbsp; {quantity} &nbsp;
              {/* increase product quantity */}
              <span className={styles.plus}>
                <CiCirclePlus onClick={() => increaseQuant(props.product)} />
              </span>
            </div>
          </div>

          {/* remove from cart button */}
          <div className={styles.btnContainer}>
            <button
              className={styles.removeBtn}
              onClick={() => removeFromCart(props.product)}
            >
              Remove From Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
