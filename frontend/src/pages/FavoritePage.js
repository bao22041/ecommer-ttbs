import React from "react";

export default function FavoritePage() {
  const favorites = [
    {
      id: 1,
      name: "Áo thun nam",
      price: 199000,
      image: "https://example.com/images/aothun.jpg",
    },
    {
      id: 2,
      name: "Giày thể thao",
      price: 499000,
      image: "https://example.com/images/giay.jpg",
    },
  ];

  return (
    <div className="container my-5">
      <h3>Sản phẩm yêu thích</h3>
      <div className="row g-4">
        {favorites.map((p) => (
          <div key={p.id} className="col-md-4">
            <div className="card h-100 shadow-sm">
              <img src={p.image} alt={p.name} className="card-img-top" />
              <div className="card-body">
                <h6 className="fw-bold">{p.name}</h6>
                <p className="text-primary">{p.price.toLocaleString()} đ</p>
                <button className="btn btn-outline-danger">Bỏ yêu thích</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
