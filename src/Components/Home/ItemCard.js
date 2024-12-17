// import the custom Context hook for values
import { useProductContext } from "../../productContext";

// css styles
import styles from "../../styles/home.module.css";

// component to render single product item on the screen
export default function ItemCard(props) {
  // getting all the value of product from props
  const { name, image, price, category } = props.item;

  // function to add item's to cart
  const { addToCart } = useProductContext();

  return (
    <>
      {/* main container */}
      <div className={styles.cardContainer}>
        {/* image container */}
        <div className={styles.imageContainer}>
          <img src={image} alt={category} />
        </div>

        {/* description of the product name,price, add button */}
        <div className={styles.itemInfo}>
          <div className={styles.namePrice}>
            {/* name of product */}
            <div className={styles.name}>{name}</div>

            {/* price of the product */}
            <div className={styles.price}>₹{price}</div>
          </div>

          {/* add to cart button */}
          <div className={styles.btnContainer}>
            <button
              className={styles.addBtn}
              onClick={() => addToCart(props.item)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
