 export const BASEURL = "http://localhost:4000/api";

 export const apiEndpoints = {
  baseURL: BASEURL,
  AUTH: {
    register: "/users/register",
    login: "/users/login",
    checkAuth: "/users/check-auth",
   logout: "/users/logout",
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
    deleteProduct: (id)=>`/products/${id}`,
  },

    ORDERS: {
    createOrder: "/orders",
    payOrder: `/orders/pay`,
    getSingleOrder: (id)=>`/orders/${id}`,
    getAllOrders: "/orders",

  },
  
    ADDRESS: {
    createAddress: "/address",
    getAddress: "/address",

  },
}