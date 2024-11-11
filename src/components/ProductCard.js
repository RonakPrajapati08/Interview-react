// import React from "react";
// import "../../src/index";

// function ProductCard({ product, onAddToCart }) {
//   return (
//     <div className="product-card">
//       <img src={product.image} className="img-fluid rounded-top ronak" alt="" />
//       <h3>{product.title}</h3>
//       <p>₹{product.price}</p>
//       <p>Rate: {product.rating.rate}</p>
//       <button className="px-3 py-2 w-100" onClick={() => onAddToCart(product)}>
//         Add to Cart
//       </button>
//     </div>
//   );
// }

// export default ProductCard;

import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "../index.css";

function ProductCard({ product, onAddToCart }) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const originalPrice = 1999;
  const discountPercentage = 33;
  const discountedPrice = product.price;

  const handleWishlistClick = () => {
    setIsWishlisted(!isWishlisted);
  };

  return (
    <div className="product-card shadow-sm position-relative">
      <div className="mb-4">
        <div className="position-absolute top-0 start-0">
          <span className="badge">{discountPercentage}% Off</span>
        </div>

        <div className="position-absolute m-2 gfe">
          <i
            className="fa-regular fa-heart"
            onClick={handleWishlistClick}
            style={{
              fontSize: "21px",
              color: isWishlisted ? "#EC4E1E" : "#878787",
              cursor: "pointer",
            }}
          ></i>
        </div>
      </div>

      <img
        src={product.image}
        className="img-fluid rounded-top mb-3 ronak"
        alt={product.title}
      />

      <h5 className="product-title">{product.title}</h5>

      <div className="price-details mb-1">
        <span className="discounted-price">₹{discountedPrice}</span>
        <span className="original-price text-muted ms-2">₹{originalPrice}</span>
        <span className="discount-percent text-success ms-2">
          ({discountPercentage}% off)
        </span>
      </div>

      <p className="text-start mb-0">Rate: {product.rating.rate}</p>

      <Button
        variant=""
        className="w-100 mt-3 btn-radi"
        onClick={() => onAddToCart(product)}
      >
        <i className="fa fa-shopping-bag me-2" aria-hidden="true"></i>
        Add to Cart
      </Button>
    </div>
  );
}

export default ProductCard;
