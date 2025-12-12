// import { Outlet, Link } from "react-router-dom";
// import {
//   Box,
//   Drawer,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemText,
//   AppBar,
//   Toolbar,
//   Typography,
// } from "@mui/material";

// const drawerWidth = 240;

// export default function AdminLayout() {
//   return (
//     <Box sx={{ display: "flex" }}>
//       {/* NAVBAR */}
//       <AppBar position="fixed" sx={{ zIndex: 1201 }}>
//         <Toolbar>
//           <Typography variant="h6" noWrap>
//             Admin Dashboard
//           </Typography>
//         </Toolbar>
//       </AppBar>

//       {/* SIDEBAR */}
//       <Drawer
//         variant="permanent"
//         sx={{
//           width: drawerWidth,
//           [`& .MuiDrawer-paper`]: {
//             width: drawerWidth,
//             boxSizing: "border-box",
//           },
//         }}
//       >
//         <Toolbar />
//         <List>
//           <ListItem disablePadding>
//             <ListItemButton component={Link} to="/admin">
//               <ListItemText primary="Dashboard" />
//             </ListItemButton>
//           </ListItem>

//           <ListItem disablePadding>
//             <ListItemButton component={Link} to="/admin/products">
//               <ListItemText primary="Quản lý sản phẩm" />
//             </ListItemButton>
//           </ListItem>

//           <ListItem disablePadding>
//             <ListItemButton component={Link} to="/admin/vouchers">
//               <ListItemText primary="Voucher" />
//             </ListItemButton>
//           </ListItem>

//           <ListItem disablePadding>
//             <ListItemButton component={Link} to="/admin/orders">
//               <ListItemText primary="Đơn hàng" />
//             </ListItemButton>
//           </ListItem>

//           <ListItem disablePadding>
//             <ListItemButton component={Link} to="/admin/users">
//               <ListItemText primary="Người dùng" />
//             </ListItemButton>
//           </ListItem>
//         </List>
//       </Drawer>

//       {/* MAIN CONTENT */}
//       <Box
//         component="main"
//         sx={{ flexGrow: 1, bgcolor: "#f5f5f5", p: 3, ml: `${drawerWidth}px` }}
//       >
//         <Toolbar />
//         <Outlet />
//       </Box>
//     </Box>
//   );
// }
