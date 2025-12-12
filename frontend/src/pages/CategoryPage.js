import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function CategoryPage() {
  const { slug } = useParams(); // lấy tên danh mục từ URL
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = 1; // giả định userId, sau này lấy từ AuthContext

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // gọi API lấy sản phẩm theo category
        const res = await axios.get(
          `http://localhost:5000/api/products/category/${slug}`
        );
        setProducts(res.data || []);
      } catch (err) {
        console.error("❌ Lỗi tải sản phẩm:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [slug]);

  // 👉 Hàm thêm sản phẩm vào giỏ
  const addToCart = async (productId) => {
    try {
      await axios.post("http://localhost:5000/api/cart/add", {
        user_id: userId,
        product_id: productId,
        quantity: 1, // mặc định thêm 1 sản phẩm
      });
      alert("✅ Đã thêm sản phẩm vào giỏ hàng!");
    } catch (err) {
      console.error("❌ Lỗi thêm vào giỏ:", err);
      alert("Không thể thêm sản phẩm vào giỏ hàng.");
    }
  };

  return (
    <div className="container my-5">
      <h3>📂 Danh mục: {slug}</h3>
      {loading ? (
        <p>Đang tải sản phẩm...</p>
      ) : products.length === 0 ? (
        <p>Không có sản phẩm nào trong danh mục này.</p>
      ) : (
        <div className="row">
          {products.map((p) => (
            <div className="col-md-3 mb-4" key={p.id}>
              <div className="card h-100">
                {p.image_url && (
                  <img
                    src={p.image_url}
                    alt={p.name}
                    className="card-img-top"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                )}
                <div className="card-body">
                  <h6 className="card-title">{p.name}</h6>
                  <p className="card-text text-danger">
                    {Number(p.price).toLocaleString()} đ
                  </p>
                  <button
                    className="btn btn-primary w-100"
                    onClick={() => addToCart(p.id)}
                  >
                    🛒 Thêm vào giỏ
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
