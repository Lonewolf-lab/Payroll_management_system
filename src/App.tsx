import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import EmployeeProfile from "./pages/EmployeeProfile";
import EmployeeSalary from "./pages/EmployeeSalary";
import EmployeeLeave from "./pages/EmployeeLeave";
import AdminDashboard from "./pages/AdminDashboard";
import AdminEmployees from "./pages/AdminEmployees";
import AdminPayroll from "./pages/AdminPayroll";
import AdminLeave from "./pages/AdminLeave";
import AdminSettings from "./pages/AdminSettings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Protected Employee Routes */}
          <Route element={<ProtectedRoute allowedRoles={['ROLE_EMPLOYEE', 'ROLE_ADMIN']} />}>
            <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
            <Route path="/employee-profile" element={<EmployeeProfile />} />
            <Route path="/employee-salary" element={<EmployeeSalary />} />
            <Route path="/employee-leave" element={<EmployeeLeave />} />
          </Route>
          
          {/* Protected Admin Routes */}
          <Route element={<ProtectedRoute allowedRoles={['ROLE_ADMIN']} />}>
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/admin-employees" element={<AdminEmployees />} />
            <Route path="/admin-payroll" element={<AdminPayroll />} />
            <Route path="/admin-leave" element={<AdminLeave />} />
            <Route path="/admin-settings" element={<AdminSettings />} />
          </Route>
          
          {/* Redirect any unknown routes to the home page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
