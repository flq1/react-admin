import Home from "../components/home";
import Category from "../components/category";
import Product from "../components/product";
import AddProduct from "../components/product/add-product";
const routes = [
  {
    path: "/",
    component: Home,
    exact: true
  },
  {
    path: "/category",
    component: Category,
    exact: true
  },
  {
    path: "/product",
    component: Product,
    exact: true
  },
  {
    path: "/product/add",
    component: AddProduct,
    exact: true
  }
];

export default routes;
