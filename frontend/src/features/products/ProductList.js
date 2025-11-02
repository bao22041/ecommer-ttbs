// src/features/products/ProductList.js
import React, { useEffect, useState } from "react";
import ProductCard from "../../components/common/ProductCard";
import { getProducts } from "../../services/productService";

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts()
      .then((data) => setProducts(data))
      .catch((err) => console.error("Lỗi khi lấy sản phẩm:", err));
  }, []);

  return (
    <div className="product-list">
      {products.length > 0 ? (
        products.map((p) => <ProductCard key={p.id} product={p} />)
      ) : (
        <p>Không có sản phẩm nào.</p>
      )}
    </div>
  );
}
