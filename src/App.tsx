import { Routes, Route } from "react-router-dom";
import {
  Home,
  Cart,
  Login,
  Payment,
  Shipping,
  Placeorder,
  Order,
  Register,
  OrderHistory,
} from "pages";
import Navbar from "components/common/Navbar";
import ProductDetails from "pages/product-details/ProductDetails";
import ProtectedRoute from "components/common/ProtectedRoute";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        {/** Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/" element={<Home />} />
        {/** Protected Routes */}
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="/cart" element={<Cart />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/placeorder" element={<Placeorder />} />
          <Route path="/order/:id" element={<Order />} />
          <Route path="/order-history" element={<OrderHistory />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
