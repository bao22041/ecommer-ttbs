import { useState } from "react";
import { createProduct } from "../../services/productService";

function AddProductForm() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await createProduct({ name, price, stock });
    alert(result.message);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Tên sản phẩm"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Giá"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <input
        type="number"
        placeholder="Số lượng"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
      />
      <button type="submit">Thêm sản phẩm</button>
    </form>
  );
}

export default AddProductForm;
