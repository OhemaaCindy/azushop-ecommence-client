 export const BASEURL = "http://localhost:4000/api";

 export const apiEndpoints = {
  baseURL: BASEURL,
  AUTH: {
    register: "/user/register",
    login: "/user/login",
    logout: "/user/logout",
   },

   CATEGORY: {
    createCategory: "/categories",
    updateCategory: (id)=>`/categories/${id}`,
    getSingleCategory: (id)=>`/categories/${id}`,
    getAllCategories: "/categories",
    deleteCategory: (id)=>`/categories/${id}`,
  },
  
   PRODUCTS: {
    createProduct: "/products",
    updateProduct:(id)=> `/products/${id}`,
     getSingleProduct: (id)=>`/products/${id}`,
    getAllProduct: "/products",
  },

    ORDERS: {
    createOrder: "/orders",
    payOrder: `/orders/pay`,
    getSingleOrder: (id)=>`/orders/${id}`,
    getAllOrders: "/orders",

  },
}