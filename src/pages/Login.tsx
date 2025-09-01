import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { DashboardCard } from "@/components/ui/dashboard-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import AuthService from "@/services/auth-service";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      toast({
        title: "Error",
        description: "Please enter both username and password",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);

      const response = await AuthService.login(username, password);

      if (response.success && response.data) {
        const user = response.data;
        console.log('Login response data:', user);

        // Ensure roles is an array and convert to uppercase for comparison
        const userRoles = Array.isArray(user.roles) 
          ? user.roles.map(role => role.toUpperCase())
          : [];
        
        console.log('User roles after processing:', userRoles);

        // Show success toast
        toast({
          title: "Login Successful",
          description: `Welcome back, ${user.username}!`,
        });

        // Immediate redirect without setTimeout
        if (userRoles.includes('ROLE_ADMIN')) {
          console.log('Redirecting to admin dashboard');
          navigate('/admin-dashboard');
        } else if (userRoles.some(role => ['ROLE_EMPLOYEE', 'ROLE_USER'].includes(role))) {
          console.log('Redirecting to employee dashboard');
          navigate('/employee-dashboard', {
            state: {
              user: user
            }
          });
        } else {
          console.warn('No valid role found, redirecting to home');
          navigate('/');
        }
      } else {
        throw new Error(response.message || "Invalid credentials");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      toast({
        title: "Login Failed",
        description: error.message || "Invalid credentials. Please try again.",
        variant: "destructive",
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
                variant="gradient"
                className="shadow-large"
            >
              <form onSubmit={handleLogin} className="space-y-6">

                {/* Username Input */}
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                      id="username"
                      type="text"
                      placeholder="Enter your username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                  />
                </div>

                {/* Password Input */}
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

                {/* Submit Button */}
                <Button
                    type="submit"
                    variant="hero"
                    size="lg"
                    className="w-full"
                    disabled={isLoading}
                >
                  {isLoading ? "Logging in..." : "Login"}
                </Button>

                {/* Signup Link */}
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
