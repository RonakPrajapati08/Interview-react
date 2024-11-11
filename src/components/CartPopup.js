import React from "react";

function CartPopup({ product }) {
  return (
    <div className="cart-popup">
      <p>{product.title} has been added to the cart.</p>
      <p>Price: ${product.price}</p>
    </div>
  );
}

export default CartPopup;
