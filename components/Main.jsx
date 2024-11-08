'use client';
import React, { Fragment, useState } from "react";
import { Box, CssBaseline, useMediaQuery, styled, useTheme } from "@mui/material";
import DashboardSidebar from "@/components/SideNav/DashboardSidebar"; // Update path as needed
import Header from "@/components/Header"; // Update path as needed
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from "react-redux";

const InnerWrapper = styled(Box)(({ theme }) => ({
  display: "flex", 
  flexDirection: "row",
  width: "100vw",
  height: "100vh", 
  padding: 0, 
  maxWidth: 2120, 
  margin:"0 auto",
}));


const SidebarWrapper = styled(Box)(({ theme }) => ({
  minWidth: 270, // Set the minimum width for the sidebar
  maxWidth: 280, // Set the maximum width for the sidebar
  transition: "width 0.3s", // Smooth transition for width changes
  [theme.breakpoints.down("md")]: { // Adjustments for mobile screens
    minWidth: 0, // Minimum width for mobile
    maxWidth: 40, // Maximum width for mobile
  },
}));

const ContentArea = styled(Box)(({ theme }) => ({
  flexGrow: 1, 
  padding: theme.spacing(2), 
  overflowY: "auto", 
  // minHeight: "calc(100vh - 64px)", 
  // margin: "0 auto", 
  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(1),
  }, 
  [theme.breakpoints.up("xl")]: {
  margin: "0 auto", 
  },
}));

const Main = ({ children }) => {
  const [sidebarCompact, setSidebarCompact] = useState(false);
  const [showMobileSideBar, setShowMobileSideBar] = useState(false);
  const { user_meta } = useSelector((state) => state.auth);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Handlers for sidebar and mobile drawer toggle
  const handleCompactToggle = () => setSidebarCompact((prev) => !prev);
  const handleMobileDrawerToggle = () => setShowMobileSideBar((prev) => !prev);

  return (

    <Fragment>
      
             {/* <ToastContainer /> */}
      <SessionProvider session={user_meta || []}>
        <CssBaseline />
        <InnerWrapper>
          <SidebarWrapper>
            <DashboardSidebar
              sidebarCompact={sidebarCompact}
              showMobileSideBar={showMobileSideBar}
              setSidebarCompact={handleCompactToggle}
              setShowMobileSideBar={handleMobileDrawerToggle}
            />
          </SidebarWrapper>
          <ContentArea>
            <Header onMenuClick={handleMobileDrawerToggle} />
            {children}
          </ContentArea>
        </InnerWrapper>
 
      </SessionProvider>
    </Fragment>
  );
};

export default Main;
