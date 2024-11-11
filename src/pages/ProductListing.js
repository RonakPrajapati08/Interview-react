import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import Filter from "../components/Filter";
import CartPopup from "../components/CartPopup";
import Loader from "../components/Loader";
import { Dropdown, Row, Col } from "react-bootstrap";

function ProductListing() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [popupProduct, setPopupProduct] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [priceFilters, setPriceFilters] = useState([]);
  const [ratingFilter, setRatingFilter] = useState(0);
  const [selectedSortOrder, setSelectedSortOrder] = useState("Featured");

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        setProducts(response.data);
        setFilteredProducts(response.data);
        setIsLoading(false);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const applyFilters = () => {
    let updatedProducts = products;

    if (categoryFilter !== "all") {
      updatedProducts = updatedProducts.filter(
        (product) => product.category === categoryFilter
      );
    }

    if (priceFilters.length > 0) {
      updatedProducts = updatedProducts.filter((product) => {
        return priceFilters.some((range) => {
          const [minPrice, maxPrice] = range.split("-").map(Number);
          return product.price >= minPrice && product.price <= maxPrice;
        });
      });
    }

    if (ratingFilter > 0) {
      updatedProducts = updatedProducts.filter(
        (product) => product.rating.rate >= ratingFilter
      );
    }

    setFilteredProducts(updatedProducts);
  };

  useEffect(() => {
    applyFilters();
  }, [categoryFilter, priceFilters, ratingFilter, products]);

  const handleSort = (order) => {
    setSelectedSortOrder(order === "asc" ? "Low to High" : "High to Low");
    setFilteredProducts(
      [...filteredProducts].sort((a, b) =>
        order === "asc" ? a.price - b.price : b.price - a.price
      )
    );
  };

  const handleAddToCart = (product) => {
    setPopupProduct(product);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);
  };

  return (
    <div className="container-fluid my-3">
      <div className="text p-2 mb-3">
        <h3 className="fw-bold text-white text-center my-2">UMART STORE</h3>
      </div>

      <div className="row">
        <div className="col-sm-12 col-md-4 col-lg-3 mb-4">
          <Filter
            onFilter={(category) => setCategoryFilter(category)}
            onSort={handleSort}
            onPriceFilterChange={(value) => setPriceFilters(value)}
            onRatingFilterChange={(value) => setRatingFilter(value)}
          />
        </div>

        <div className="col-sm-12 col-md-8 col-lg-9">
          <Row className="align-items-center border rounded-3 mb-3 mx-1 py-2">
            <Col>
              <h5 className="mb-0 fw-bold">E-commerce Store</h5>
            </Col>
            <Col xs="auto">
              <Dropdown className="">
                <Dropdown.Toggle
                  className="border"
                  variant="white"
                  id="dropdown-sort"
                >
                  {selectedSortOrder}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => handleSort("asc")}>
                    Low to High
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleSort("desc")}>
                    High to Low
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>

          {isLoading ? (
            <Loader />
          ) : (
            <div className="row">
              {filteredProducts.map((product) => (
                <div
                  className="col-lg-4 col-md-6 col-sm-6 mb-4 d-flex align-items-stretch"
                  key={product.id}
                >
                  <ProductCard
                    product={product}
                    onAddToCart={handleAddToCart}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Cart Popup */}
      {showPopup && popupProduct && <CartPopup product={popupProduct} />}
    </div>
  );
}

export default ProductListing;
