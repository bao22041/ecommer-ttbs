// import { useEffect, useState } from "react";
// //import { getOrders, updateOrderStatus } from "../../../services/orderService";
// import { Table, TableBody, TableCell, TableHead, TableRow, Button } from "@mui/material";

// export default function AdminOrderManagement() {
//   const [orders, setOrders] = useState([]);

//   const fetchData = async () => {
//     const data = await getOrders();
//     setOrders(data);
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const updateStatus = async (id, status) => {
//     await updateOrderStatus(id, status);
//     fetchData();
//   };

//   return (
//     <div>
//       <h2>Quản lý đơn hàng</h2>

//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell>ID</TableCell>
//             <TableCell>Khách hàng</TableCell>
//             <TableCell>Tổng tiền</TableCell>
//             <TableCell>Trạng thái</TableCell>
//             <TableCell>Hành động</TableCell>
//           </TableRow>
//         </TableHead>

//         <TableBody>
//           {orders.map((o) => (
//             <TableRow key={o.id}>
//               <TableCell>{o.id}</TableCell>
//               <TableCell>{o.customer}</TableCell>
//               <TableCell>{o.total} ₫</TableCell>
//               <TableCell>{o.status}</TableCell>
//               <TableCell>
//                 <Button onClick={() => updateStatus(o.id, "Đang giao")}>Đang giao</Button>
//                 <Button onClick={() => updateStatus(o.id, "Hoàn thành")}>Hoàn thành</Button>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </div>
//   );
// }
