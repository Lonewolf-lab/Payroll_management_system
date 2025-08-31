import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { DashboardCard } from "@/components/ui/dashboard-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LogIn, User, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AuthService from "@/services/auth-service";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please enter both email and password",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsLoading(true);
      
      // Use the AuthService login method
      const response = await AuthService.login(email, password);
      
      if (response.success && response.data) {
        const user = response.data;
        const isAdmin = user.roles.includes('ROLE_ADMIN');
        
        toast({
          title: "Login Successful",
          description: `Welcome back, ${user.username}! Redirecting to dashboard...`,
        });

        // Redirect based on user role
        setTimeout(() => {
          navigate(isAdmin ? "/admin-dashboard" : "/employee-dashboard");
        }, 1500);
      } else {
        throw new Error(response.message || "Invalid credentials");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      toast({
        title: "Login Failed",
        description: error.message || "Invalid credentials. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-80px)] bg-dashboard-background flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <DashboardCard
            title="Login to PayrollPro"
            icon={<LogIn className="w-5 h-5 text-primary" />}
            variant="gradient"
            className="shadow-large"
          >
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <Button type="submit" className="w-full" variant="hero" size="lg">
                Login
              </Button>

              <div className="text-center pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  Don't have an account?{" "}
                  <Button
                    variant="link"
                    className="p-0 h-auto text-primary"
                    onClick={() => navigate("/signup")}
                  >
                    Sign up here
                  </Button>
                </p>
              </div>
            </form>
          </DashboardCard>
        </div>
      </div>
    </Layout>
  );
}