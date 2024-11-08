import duotone from "../icons/duotone";
import PackageBox from "../icons/PackageBox";
import Category from "../icons/Category";
import Home from "../icons/Home";
import Living from "../icons/furniture-shop/Living";
import Ecommerce from "../icons/Ecommerce";
export const navigation= [
  {
    type: "label",
    label: "Welcome",



  },
  {
    name: "Home",
    icon: Home,
    path: "/",

    
    },
  
  {
    name: "Business Directory",
    icon: PackageBox,
    children: [
    
      {
        name: "Business Directory",
      
        path: "/business/home",
    
        
        },
      
      {
        name: "All Business",
        path: "/business/allbusiness",
      },
      {
        name: "All Categories",
        path: "/categories/allcategories",
      },
    ],
  },

 
  
  {
    name: "Rent Property",
    icon: Ecommerce,
    children: [
      {
        name: "Rent Property",
        path: "/property/home",
      },
    
      {
        name: "All properties",
        path: "/property/allproperties",
      },
     
    ],
  },
 
  
];

export const navigations = [
  {
    type: "label",
    label: "User",
    icon: Home,

  },
  {
    name: "Home",
    icon: Home,
    path: "/",

    
    },
  {
    name: "Business Directory",
    icon: PackageBox,
    children: [
      {
        name: "Business Directory",
    
        path: "/business/home",
    
        
        },
      {
        name: "Add Business",
        path: "/business/add",
      },
      {
        name: "Manage Business",
        path: "/business/",
      },
      {
        name: "All Business",
        path: "/business/allbusiness",
      },
      {
        name: "All Categories",
        path: "/business/allcategories",
      },
    ],
  },
  {
    name: "Reviews",
    icon: duotone.Review,
    children: [
     
      {
        name: "My Reviews",
        path: "/business/reviews/userreviews",
      },
    ],
  },
 
  
  {
    name: "Rent Property",
    icon: Ecommerce,

    children: [
      {
        name: "Rent Property",
        path: "/property/home",
      },
      {
        name: "Add Property",
        path: "/property/add",
      },
      {
        name: "Manage Property",
        path: "/property",
      },
      {
        name: "All Properties",
        path: "/property/allproperties",
      },
    ],
  },
 
 
];

export const superAdminNavigations = [
  {
    type: "label",
    label: "Super Admin",
  },
  {
    name: "Home",
    icon: Home,
    path: "/",

    
    },
  {
    name: "Users",
    icon: duotone.Customers,
    children: [
      
      {
        name: "Add User",
        path: "/dashboard/users/add",
      },
      {
        name: "Manage Users",
        path: "/dashboard/users",
      },
    ],
  },
  {
    name: "Business Directory",
    icon: PackageBox,
    children: [
      {
        name: "Business Directory",
        path: "/business/home",
    
        
        },
    
      {
        name: "Add Business",
        path: "/business/add",
      },
      {
        name: "Manage Business",
        path: "/business/",
      },
      {
        name: "All Business",
        path: "/business/allbusiness",
      },
      {
        name: "Add Category",
        path: "/business/categories/add",
      },

      {
        name: "Manage Categories",
        path: "/business/categories/",
      },
      {
        name: "Add Sub Category",
        path: "/business/categories/subcategories/add",
      },
      {
        name: "Manage Sub Categories",
        path: "/business/categories/subcategories",
      },
      {
        name: "All Categories",
        path: "/business/allcategories",
      },
    ],
  },

  {
    name: "Reviews",
    icon: duotone.Review,
    children: [
      {
        name: "Manage Reviews",
        path: "/business/reviews",
      },
      {
        name: "All Reviews",
        path: "/business/reviews/userreviews",
      },
    ],
  },
  {
    name: "Rent Property",
    icon: Ecommerce,

    children: [
      {
        name: "Rent Property",
        path: "/property/home",
      },
    
      {
        name: "Add Property",
        path: "/property/add",
      },
      {
        name: "Manage Property",
        path: "/property",
      },
      {
        name: "All Properties",
        path: "/property/allproperties",
      },
    ],
  },
  {
    name: "Property Types",
    icon: Category,
    children: [
      {
        name: "Add Type",
        path: "/property/type/add",
      },
      {
        name: "Add Amenities",
        path: "/property/amenites/add",
      },
      {
        name: "Manage Amenities",
        path: "/property/amenites",
      },
      {
        name: "Manage Types",
        path: "/property/type",
      },
     
    ],
  },
 
];
