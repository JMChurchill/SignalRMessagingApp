import React from "react";
import { Route, Routes as RouteWrapper } from "react-router-dom";
import ChatPage from "../Pages/ChatPage";
import RoomsPage from "../Pages/RoomsPage";

const ContentRoutes = () => {
  return (
    <RouteWrapper>
      <Route index element={<RoomsPage />} />
      <Route path="/Room/:id" element={<ChatPage />} />
    </RouteWrapper>
  );
};

export default ContentRoutes;
