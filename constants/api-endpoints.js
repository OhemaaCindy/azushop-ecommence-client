 export const BASEURL = process.env.NEXT_PUBLIC_SERVER_URL;

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
myOrder:"/orders/my-orders"
  },
  
    ADDRESS: {
    createAddress: "/address",
    getAddress: "/address",

  },
}