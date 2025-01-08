import { Routes as RRDRoutes, Route } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Products from "../pages/Products";
import About from "../pages/About";
import Home from "../pages/Home";
import MainLayout from "../layouts/MainLayout";

const Routes = () => {
  return (
    <RRDRoutes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="about" element={<About />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </RRDRoutes>
  );
};

export default Routes;
