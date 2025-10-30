export default function Footer() {
return (
    <footer className="bg-light border-top mt-5 py-4">
    <div className="container">
        <div className="row text-muted small">
        <div className="col-md-4 mb-3">
            <h6 className="text-dark fw-bold mb-2">TechZone</h6>
            <p>Chuyên cung cấp thiết bị công nghệ chính hãng, giá tốt, bảo hành uy tín.</p>
        </div>

        <div className="col-md-4 mb-3">
            <h6 className="text-dark fw-bold mb-2">Liên hệ</h6>
            <p>📞 0909 123 456</p>
            <p>📧 support@techzone.vn</p>
            <p>🏢 123 Xô Viết Nghệ Tĩnh, Đà Nẵng</p>
        </div>

        <div className="col-md-4 mb-3">
            <h6 className="text-dark fw-bold mb-2">Kết nối</h6>
            <a href="#" className="me-3 text-primary">Facebook</a>
            <a href="#" className="me-3 text-danger">YouTube</a>
            <a href="#" className="text-dark">Instagram</a>
        </div>
        </div>
        <div className="text-center text-secondary mt-3">
        © {new Date().getFullYear()} TechZone. All rights reserved.
        </div>
    </div>
    </footer>
);
}
