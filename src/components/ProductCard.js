import React from "react";
import "../../src/index";

function ProductCard({ product, onAddToCart }) {
  return (
    <div className="product-card">
      <img src={product.image} className="img-fluid rounded-top ronak" alt="" />
      <h3>{product.title}</h3>
      <p>Price: ₹{product.price}</p>
      <p>Rate: {product.rating.rate}</p>
      <button className="px-3 py-2" onClick={() => onAddToCart(product)}>
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;
