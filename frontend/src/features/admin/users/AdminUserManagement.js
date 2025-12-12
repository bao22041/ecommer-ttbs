// import { useState, useEffect } from "react";
// //import { getUsers, updateUserRole } from "../../../services/userService";
// import { Table, TableHead, TableRow, TableCell, TableBody, Button } from "@mui/material";

// export default function AdminUserManagement() {
//   const [users, setUsers] = useState([]);

//   const fetchData = async () => {
//     const data = await getUsers();
//     setUsers(data);
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const changeRole = async (id, role) => {
//     await updateUserRole(id, role);
//     fetchData();
//   };

//   return (
//     <div>
//       <h2>Quản lý người dùng</h2>

//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell>ID</TableCell>
//             <TableCell>Email</TableCell>
//             <TableCell>Role</TableCell>
//             <TableCell>Hành động</TableCell>
//           </TableRow>
//         </TableHead>

//         <TableBody>
//           {users.map((u) => (
//             <TableRow key={u.id}>
//               <TableCell>{u.id}</TableCell>
//               <TableCell>{u.email}</TableCell>
//               <TableCell>{u.role}</TableCell>
//               <TableCell>
//                 <Button onClick={() => changeRole(u.id, "user")}>User</Button>
//                 <Button onClick={() => changeRole(u.id, "admin")}>Admin</Button>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </div>
//   );
// }
