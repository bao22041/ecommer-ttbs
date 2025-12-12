import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { Link } from "react-router-dom";
import "./HomePage.css";

// Map ID danh mục sang Tên (Vì DB chỉ trả về category_id)
const CATEGORY_MAP = {
  1: "Điện tử",
  2: "Điện lạnh",
  3: "Gia dụng",
  4: "Điện thoại",
  5: "Kỹ thuật số",
  6: "Sức khỏe",
  7: "Phụ kiện"
};

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [ratings, setRatings] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 10;

  // --- State Chatbot ---
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { from: "bot", text: "Xin chào 👋! \nBạn cần tìm thông tin sản phẩm nào?" }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);

  // 1. Load sản phẩm
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => {
        setProducts(res.data);
        setFiltered(res.data);
        
        // Tạo danh sách category từ dữ liệu thật
        const uniqueCats = ["Tất cả", ...new Set(res.data.map((p) => p.category_id))];
        setCategories(uniqueCats);
        
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Không thể tải sản phẩm. Vui lòng kiểm tra Server Backend.");
        setLoading(false);
      });
  }, []);

  // 2. Load đánh giá
  useEffect(() => {
    axios.get("http://localhost:5000/api/reviews").then((res) => {
      const grouped = {};
      res.data.forEach((r) => {
        if (!grouped[r.product_id]) grouped[r.product_id] = [];
        grouped[r.product_id].push(r.rating);
      });
      const avg = {};
      for (let pid in grouped) {
        const arr = grouped[pid];
        avg[pid] = (arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(1);
      }
      setRatings(avg);
    }).catch(err => console.log("Chưa có review hoặc lỗi load review"));
  }, []);

  const handleSearch = (keyword) => {
    if (!keyword) return setFiltered(products);
    const result = products.filter((p) =>
      p.name.toLowerCase().includes(keyword.toLowerCase())
    );
    setFiltered(result);
    setPage(1);
  };

  const handleFilter = (catId) => {
    setSelectedCategory(catId);
    if (catId === "Tất cả") {
      setFiltered(products);
    } else {
      // So sánh category_id
      setFiltered(products.filter((p) => p.category_id === catId));
    }
    setPage(1);
  };

  const sendChatMessage = async () => {
    const message = chatInput.trim();
    if (!message) return;

    const newMessages = [...chatMessages, { from: "user", text: message }];
    setChatMessages(newMessages);
    setChatInput("");
    setChatLoading(true);

    const BASE_URL = "http://localhost:5000/api/chatbot";
    let apiEndpoint = `${BASE_URL}/chat`;
    const lowerMsg = message.toLowerCase();

    if (/voucher|mã|khuyến mãi|discount/i.test(lowerMsg)) {
      apiEndpoint = `${BASE_URL}/chat/voucher`;
    } else if (/giá|mua|cấu hình|tìm/i.test(lowerMsg)) {
      apiEndpoint = `${BASE_URL}/chat/product`;
    }

    try {
      const res = await axios.post(apiEndpoint, { message });
      const reply = res.data.reply || "Xin lỗi, tôi không hiểu yêu cầu.";
      setChatMessages((prev) => [...prev, { from: "bot", text: reply }]);
    } catch (err) {
      console.error(err);
      let errorMsg = "Máy chủ đang bận, vui lòng thử lại sau.";
      setChatMessages((prev) => [...prev, { from: "bot", text: errorMsg }]);
    } finally {
      setChatLoading(false);
    }
  };

  const handleAddToCart = async (product, qty = 1) => {
    try {
      // Gửi user_id: 1 (User này phải tồn tại trong DB nhờ bước chạy SQL ở trên)
      await axios.post(`http://localhost:5000/api/cart/add`, {
        user_id: 1, 
        product_id: product.id,
        quantity: qty,
      });
      alert(`✅ Đã thêm ${qty} x ${product.name} vào giỏ hàng`);
    } catch (err) {
      console.error("Lỗi thêm giỏ hàng:", err);
      // Hiển thị thông báo lỗi chi tiết hơn
      if (err.response && err.response.status === 500) {
        alert("Lỗi Server (500): Kiểm tra xem User ID 1 đã có trong Database chưa?");
      } else {
        alert("Lỗi thêm giỏ hàng. Vui lòng thử lại.");
      }
    }
  };

  const featured = [...products].sort((a, b) => b.price - a.price).slice(0, 5);
  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <>
      <Header onSearch={handleSearch} onFilter={handleFilter} />

      <div className="container mt-4">
        <div className="tech-banner-card">
          {/* Lưu ý: File ảnh banner cũng cần nằm trong public/pictures */}
          <img
            src="/pictures/TTBS.png"
            alt="Banner"
            className="tech-banner-img"
            onError={(e) => e.target.style.display = 'none'} // Ẩn nếu lỗi ảnh
          />
        </div>
      </div>

      <div className="container my-4">
        <div className="d-flex justify-content-center flex-wrap gap-2">
          {categories.map((cat, index) => (
            <button
              key={index}
              className={`btn btn-category ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => handleFilter(cat)}
            >
              {/* Hiển thị tên thay vì số ID */}
              {cat === "Tất cả" ? "Tất cả" : (CATEGORY_MAP[cat] || `Danh mục ${cat}`)}
            </button>
          ))}
        </div>
      </div>

      <div className="container my-5">
        <h4 className="section-title">🔥 Sản phẩm nổi bật</h4>
        <div className="tech-grid">
          {featured.map((p) => (
            <div key={p.id} className="tech-card">
              <div className="tech-card-img-wrapper">
                {/* SỬA LỖI ẢNH Ở ĐÂY: Thêm dấu / và dùng image_url */}
                <img 
                  src={`/${p.image_url}`} 
                  alt={p.name} 
                  className="tech-card-img" 
                  onError={(e) => { e.target.src = "https://placehold.co/300x200?text=No+Image" }} // Ảnh thế mạng nếu lỗi
                />
              </div>
              <div className="tech-card-body">
                <h6 className="product-name" title={p.name}>{p.name}</h6>
                <p className="product-price">
                  {Number(p.price).toLocaleString()} đ
                </p>
                {ratings[p.id] ? (
                  <div className="rating-stars">⭐ {ratings[p.id]} / 5</div>
                ) : (
                  <div className="rating-stars text-muted">Chưa có đánh giá</div>
                )}
                
                <Link
                  to={`/product/${p.id}`}
                  className="btn btn-tech-outline w-100 mt-auto"
                >
                  Xem chi tiết
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container my-4">
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" />
            <p className="mt-3 text-muted">Đang tải dữ liệu công nghệ...</p>
          </div>
        ) : error ? (
          <div className="alert alert-danger text-center">{error}</div>
        ) : paginated.length === 0 ? (
          <div className="alert alert-warning text-center">
            Không tìm thấy sản phẩm nào.
          </div>
        ) : (
          <>
            <div className="tech-grid">
              {paginated.map((p) => (
                <div key={p.id} className="tech-card">
                  <div className="tech-card-img-wrapper">
                    {/* SỬA LỖI ẢNH Ở ĐÂY NỮA */}
                    <img 
                      src={`/${p.image_url}`} 
                      alt={p.name} 
                      className="tech-card-img" 
                      onError={(e) => { e.target.src = "https://placehold.co/300x200?text=No+Image" }}
                    />
                  </div>
                  <div className="tech-card-body">
                    <h6 className="product-name" title={p.name}>{p.name}</h6>
                    <p className="product-price">
                      {Number(p.price).toLocaleString()} đ
                    </p>
                    {ratings[p.id] && (
                      <small className="rating-stars d-block">
                        ⭐ {ratings[p.id]}
                      </small>
                    )}

                    <div className="mt-auto pt-3">
                      <div className="d-flex align-items-center mb-2">
                        <input
                          type="number"
                          min="1"
                          defaultValue="1"
                          className="form-control qty-input"
                          id={`qty-${p.id}`}
                        />
                        <button
                          className="btn btn-tech-primary flex-grow-1"
                          onClick={() =>
                            handleAddToCart(
                              p,
                              parseInt(document.getElementById(`qty-${p.id}`).value)
                            )
                          }
                        >
                          + Giỏ hàng
                        </button>
                      </div>
                      <Link
                        to={`/product/${p.id}`}
                        className="btn btn-tech-outline w-100"
                      >
                        Chi tiết
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="tech-pagination">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  className={`btn btn-tech-page ${page === i + 1 ? "active" : ""}`}
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      <button className="chatbot-trigger" onClick={() => setShowChat(!showChat)}>
        💬
      </button>

      {showChat && (
        <div className="chat-window">
          <div className="chat-header">
            <div>
              <span className="fw-bold fs-5">🤖 Trợ lý ảo lỏ Bảo</span>
              <div className="small opacity-75">Luôn sẵn sàng hỗ trợ</div>
            </div>
            <button
              className="btn-close btn-close-white"
              onClick={() => setShowChat(false)}
            />
          </div>

          <div className="chat-body">
            {chatMessages.map((msg, idx) => (
              <div
                key={idx}
                className={`chat-message-row ${msg.from === "user" ? "user" : "bot"}`}
              >
                <div className={`chat-bubble ${msg.from === "user" ? "user" : "bot"}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {chatLoading && (
              <div className="text-muted small ms-2 fst-italic">Đang nhập...</div>
            )}
          </div>

          <div className="chat-footer">
            <div className="input-group align-items-center">
              <input
                type="text"
                className="form-control chat-input"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendChatMessage()}
                placeholder="Hỏi về sản phẩm..."
              />
              <button
                className="btn btn-chat-send"
                onClick={sendChatMessage}
                disabled={chatLoading}
              >
                ➤
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}