import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { DashboardCard } from "@/components/ui/dashboard-card";
import { 
  Building2, 
  Users, 
  DollarSign, 
  Calendar, 
  Shield, 
  User,
  ArrowRight,
  CheckCircle2 
} from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: "Payroll Management",
      description: "Comprehensive salary and benefits tracking"
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Leave Management", 
      description: "Streamlined leave requests and approvals"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Employee Management",
      description: "Complete employee data and records"
    },
    {
      icon: <CheckCircle2 className="w-6 h-6" />,
      title: "Automated Processing",
      description: "Efficient payroll calculations and reporting"
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-hero text-primary-foreground py-20">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <Building2 className="w-12 h-12" />
              </div>
            </div>
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Professional Payroll
              <br />
              <span className="text-white/90">Management System</span>
            </h1>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Streamline your HR operations with our comprehensive payroll management platform. 
              Handle employee data, salary processing, and leave management with ease.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="professional" 
                size="lg" 
                onClick={() => navigate("/login")}
                className="text-lg px-8 py-6 h-auto"
              >
                Login to Dashboard
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => navigate("/signup")}
                className="text-lg px-8 py-6 h-auto border-white/30 text-primary-foreground hover:bg-white/10"
              >
                Create Account
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Role Selection Section */}
      <section className="py-16 bg-dashboard-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Choose Your Role</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Access your personalized dashboard based on your role in the organization
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <DashboardCard
              title="Employee Access"
              icon={<User className="w-6 h-6 text-primary" />}
              variant="highlight"
              className="text-center hover:scale-105 transition-transform cursor-pointer"
              onClick={() => navigate("/login")}
            >
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  View your salary details, submit leave requests, and track your employment information
                </p>
                <ul className="space-y-2 text-sm text-left">
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-success" />
                    <span>Personal salary breakdown</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-success" />
                    <span>Leave request management</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-success" />
                    <span>Employment history</span>
                  </li>
                </ul>
                <Button variant="default" className="w-full mt-4">
                  Employee Login
                </Button>
              </div>
            </DashboardCard>

            <DashboardCard
              title="Admin Access"
              icon={<Shield className="w-6 h-6 text-primary" />}
              variant="highlight"
              className="text-center hover:scale-105 transition-transform cursor-pointer"
              onClick={() => navigate("/login")}
            >
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Manage employee payroll, approve leave requests, and oversee all HR operations
                </p>
                <ul className="space-y-2 text-sm text-left">
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-success" />
                    <span>Complete payroll management</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-success" />
                    <span>Leave approval workflow</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-success" />
                    <span>Employee data management</span>
                  </li>
                </ul>
                <Button variant="default" className="w-full mt-4">
                  Admin Login
                </Button>
              </div>
            </DashboardCard>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Powerful Features</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to manage payroll and HR operations efficiently
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-lg bg-background shadow-soft hover:shadow-medium transition-all">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
