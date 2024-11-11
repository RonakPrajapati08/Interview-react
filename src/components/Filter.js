import React, { useState } from "react";
import Accordion from "react-bootstrap/Accordion";

const Filter = ({ onFilter, onPriceFilterChange, onRatingFilterChange }) => {
  const [activeKey, setActiveKey] = useState("0");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);

  const categories = [
    "electronics",
    "jewelery",
    "men's clothing",
    "women's clothing",
  ];
  const priceRanges = [
    { label: "₹0 - ₹100", value: "0-100" },
    { label: "₹100 - ₹300", value: "100-300" },
    { label: "₹300 - ₹600", value: "300-600" },
    { label: "₹600 - ₹1000", value: "600-1000" },
  ];

  const ratings = [4, 3, 2, 1];

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    onFilter(category);
  };

  const handlePriceChange = (range) => {
    const newSelectedPriceRanges = selectedPriceRanges.includes(range)
      ? selectedPriceRanges.filter((r) => r !== range)
      : [...selectedPriceRanges, range];
    setSelectedPriceRanges(newSelectedPriceRanges);
    onPriceFilterChange(newSelectedPriceRanges);
  };

  const handleRatingChange = (rating) => {
    const newSelectedRatings = selectedRatings.includes(rating)
      ? selectedRatings.filter((r) => r !== rating)
      : [...selectedRatings, rating];
    setSelectedRatings(newSelectedRatings);
    onRatingFilterChange(newSelectedRatings);
  };

  const renderStars = (count) => {
    return Array.from({ length: count }, (_, i) => (
      <i key={i} className="fas fa-star starrr"></i>
    ));
  };

  return (
    <>
      <div className="filter">
        <Accordion activeKey={activeKey} onSelect={(key) => setActiveKey(key)}>
          <Accordion.Item className="border-0 rounded-2" eventKey="0">
            <Accordion.Header className="roni">
              <span className="float-end">
                {activeKey === "0" ? (
                  <i className="accordion-arrow fas fa-chevron-up"></i>
                ) : (
                  <i className="accordion-arrow fas fa-chevron-down"></i>
                )}
              </span>
              Category
            </Accordion.Header>
            <Accordion.Body>
              <ul>
                <li onClick={() => handleCategoryChange("all")}>All</li>
                {categories.map((category, index) => (
                  <li
                    key={index}
                    onClick={() => handleCategoryChange(category)}
                    style={{
                      fontWeight:
                        category === selectedCategory ? "bold" : "normal",
                    }}
                  >
                    {category}
                  </li>
                ))}
                <li className="mb-0" style={{ color: "#EC4E1E" }}>
                  See all
                </li>
              </ul>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item className="border-0 rounded-2" eventKey="1">
            <Accordion.Header>
              <span className="float-end">
                {activeKey === "1" ? (
                  <i className="accordion-arrow fas fa-chevron-up"></i>
                ) : (
                  <i className="accordion-arrow fas fa-chevron-down"></i>
                )}
              </span>
              Price
            </Accordion.Header>
            <Accordion.Body>
              <ul>
                {priceRanges.map((range, index) => (
                  <li key={index}>
                    <input
                      type="checkbox"
                      name="price"
                      value={range.value}
                      checked={selectedPriceRanges.includes(range.value)}
                      onChange={() => handlePriceChange(range.value)}
                    />
                    <label>{range.label}</label>
                  </li>
                ))}
                <li className="mb-0" style={{ color: "#EC4E1E" }}>
                  See all
                </li>
              </ul>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item className="border-0 rounded-2" eventKey="2">
            <Accordion.Header>
              <span className="float-end">
                {activeKey === "2" ? (
                  <i className="accordion-arrow fas fa-chevron-up"></i>
                ) : (
                  <i className="accordion-arrow fas fa-chevron-down"></i>
                )}
              </span>
              Rating
            </Accordion.Header>
            <Accordion.Body>
              <ul>
                {ratings.map((rating, index) => (
                  <li className="align-items-center" key={index}>
                    <input
                      type="checkbox"
                      name="rating"
                      value={rating}
                      checked={selectedRatings.includes(rating)}
                      onChange={() => handleRatingChange(rating)}
                    />
                    <label>{renderStars(rating)} & Up</label>
                  </li>
                ))}
              </ul>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </>
  );
};

export default Filter;
