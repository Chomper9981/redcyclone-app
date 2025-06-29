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
import AccountManagerAdmin from "./pages/AccountManagerAdmin";
import LogManagerAdmin from "./pages/LogManagerAdmin";
import EditProfile from "./pages/EditProfile";
import EditBasicInfo from "./pages/EditBasicInfo";
import AccountDeletionQueueAdmin from "./pages/AccountDeletionQueueAdmin";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";
import { SessionProvider } from "./contexts/SessionContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <SessionProvider>
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
            <Route path="/admin/account-manager" element={<AccountManagerAdmin />} />
            <Route path="/admin/log-manager" element={<LogManagerAdmin />} />
            <Route path="/admin/account-deletion-queue" element={<AccountDeletionQueueAdmin />} />
            <Route path="/edit-profile" element={<EditProfile />} />
            <Route path="/edit-profile/basic-info" element={<EditBasicInfo />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </SessionProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;