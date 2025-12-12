// import { useState, useEffect } from "react";
// import {
//   TextField,
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow,
//   Paper,
//   Box,
// } from "@mui/material";

// import {
//   getVouchers,
//   createVoucher,
//   updateVoucher,
//   deleteVoucher,
// } from "../../../services/voucherService";

// export default function AdminVoucherManagement() {
//   const [vouchers, setVouchers] = useState([]);
//   const [editing, setEditing] = useState(null);

//   const [form, setForm] = useState({
//     code: "",
//     discount: "",
//     expireAt: "",
//   });

//   const fetchData = async () => {
//     const data = await getVouchers();
//     setVouchers(data);
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (editing) {
//       await updateVoucher(editing.id, form);
//       setEditing(null);
//     } else {
//       await createVoucher(form);
//     }

//     setForm({ code: "", discount: "", expireAt: "" });
//     fetchData();
//   };

//   const handleEdit = (voucher) => {
//     setEditing(voucher);
//     setForm({
//       code: voucher.code,
//       discount: voucher.discount,
//       expireAt: voucher.expireAt,
//     });
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Xóa voucher này?")) {
//       await deleteVoucher(id);
//       fetchData();
//     }
//   };

//   return (
//     <Box>
//       <h2>Quản lý Voucher</h2>

//       <Paper sx={{ p: 2, mb: 3 }}>
//         {/* FORM */}
//         <form onSubmit={handleSubmit}>
//           <TextField
//             label="Mã giảm giá"
//             name="code"
//             value={form.code}
//             onChange={handleChange}
//             sx={{ mr: 2 }}
//             required
//           />

//           <TextField
//             label="Phần trăm giảm"
//             name="discount"
//             type="number"
//             value={form.discount}
//             onChange={handleChange}
//             sx={{ mr: 2 }}
//             required
//           />

//           <TextField
//             label="Ngày hết hạn"
//             name="expireAt"
//             type="date"
//             value={form.expireAt}
//             onChange={handleChange}
//             InputLabelProps={{ shrink: true }}
//             required
//           />

//           <Button sx={{ ml: 2 }} type="submit" variant="contained">
//             {editing ? "Cập nhật" : "Thêm mới"}
//           </Button>
//         </form>
//       </Paper>

//       {/* TABLE */}
//       <Paper>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Mã</TableCell>
//               <TableCell>Giảm (%)</TableCell>
//               <TableCell>Hết hạn</TableCell>
//               <TableCell>Hành động</TableCell>
//             </TableRow>
//           </TableHead>

//           <TableBody>
//             {vouchers.map((v) => (
//               <TableRow key={v.id}>
//                 <TableCell>{v.code}</TableCell>
//                 <TableCell>{v.discount}%</TableCell>
//                 <TableCell>{v.expireAt}</TableCell>
//                 <TableCell>
//                   <Button onClick={() => handleEdit(v)}>Sửa</Button>
//                   <Button color="error" onClick={() => handleDelete(v.id)}>
//                     Xóa
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </Paper>
//     </Box>
//   );
// }
