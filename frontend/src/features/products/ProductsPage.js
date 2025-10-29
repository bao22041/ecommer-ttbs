import { useEffect, useState } from "react";
import { getProducts } from "../../services/productService";

function ProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  return (
    <div>
      <h1>Danh sách sản phẩm</h1>
      <ul>
        {products.map((p) => (
          <li key={p.id}>{p.name} - {p.price}₫</li>
        ))}
      </ul>
    </div>
  );
}

export default ProductsPage;
