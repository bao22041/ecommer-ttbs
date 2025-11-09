import React, { useEffect, useState } from "react";
import axios from "axios";

export default function VoucherPage() {
  const [vouchers, setVouchers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/vouchers").then((res) => {
      setVouchers(res.data);
    });
  }, []);

  return (
    <div className="container my-5">
      <h3>Mã giảm giá hiện có</h3>
      <div className="row g-3">
        {vouchers.map((v) => (
          <div key={v.id} className="col-md-4">
            <div className="card border-primary">
              <div className="card-body">
                <h5 className="card-title">{v.code}</h5>
                <p className="card-text">Giảm {v.discount}%</p>
                <p className="text-muted">
                  Tạo lúc: {new Date(v.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
