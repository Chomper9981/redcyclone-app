import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import MenuGuest from "./pages/MenuGuest";
import MenuUser from "./pages/MenuUser";
import ProfileUser from "./pages/ProfileUser";
import ProfileOtherUser from "./pages/ProfileOtherUser";
import ProfileOtherUserForGuest from "./pages/ProfileOtherUserForGuest";
import AccountManagerAdmin from "./pages/AccountManagerAdmin"; // Import AccountManagerAdmin
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/menu-guest" element={<MenuGuest />} />
          <Route path="/menu-user" element={<MenuUser />} />
          <Route path="/profile-user" element={<ProfileUser />} />
          <Route path="/profile-other-user" element={<ProfileOtherUser />} />
          <Route path="/profile-other-user-for-guest" element={<ProfileOtherUserForGuest />} />
          <Route path="/admin/account-manager" element={<AccountManagerAdmin />} /> {/* Thêm route mới */}
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;