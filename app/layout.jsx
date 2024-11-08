import "./globals.css";
import { Providers } from "@/store/Provider";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Head from "next/head";
import { CategoryProvider } from "./context/CategoryContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CategoryProvider>
    

        <Providers>{children}</Providers>
        <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        draggable
        pauseOnHover
      />
         </CategoryProvider>   
        {/* <ToastContainer /> */}
      </body>
    </html>
  );
}
