import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { DashboardCard } from "@/components/ui/dashboard-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  User,
  DollarSign,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Building,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle
} from "lucide-react";
import { useEffect, useState } from "react";
import EmployeeService, { Employee as EmployeeType } from "@/services/employee-service";
import SalaryService, { Salary } from "@/services/salary-service";
import LeaveService, { Leave } from "@/services/leave-service";
import AuthService from "@/services/auth-service";
import {useLocation} from "react-router-dom";

export default function EmployeeDashboard() {
  interface EmployeeData {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    department: string;
    position: string;
    joinDate: string;
    address?: string;
  }

  interface SalaryData {
    id?: number;
    basicSalary: number;
    allowances: number;
    deductions: number;
    netSalary: number;
  }

  interface LeaveData {
    id: number;
    leaveType: string;
    startDate: string;
    endDate: string;
    status: string;
    reason: string;
  }

  interface EmployeeState {
    name: string;
    employeeId: string;
    department: string;
    designation: string;
    email: string;
    phone: string;
    location: string;
    joinDate: string;
  }

  interface SalaryState {
    basic: number;
    allowances: number;
    deductions: number;
    netPay: number;
  }

  interface LeaveStatus {
    id: number;
    type: string;
    dates: string;
    status: string;
    reason: string;
  }
  const location = useLocation();
  const {user} = location.state || {};
  const [employee, setEmployee] = useState<EmployeeState>({
    name: "Loading...",
    employeeId: "...",
    department: "...",
    designation: "...",
    email: "...",
    phone: "...",
    location: "...",
    joinDate: "..."
  });

  const [salary, setSalary] = useState<SalaryState>({
    basic: 0,
    allowances: 0,
    deductions: 0,
    netPay: 0
  });

  const [leaveStatus, setLeaveStatus] = useState<LeaveStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const currentUser = AuthService.getCurrentUser();
        
        if (!currentUser) {
          setError("Not authenticated");
          return;
        }
        
        // Fetch employee data
        const employeeResponse = await EmployeeService.getEmployeeByUserId(currentUser.id);
        console.log(employeeResponse);
        const employeeData = employeeResponse;
        
        if (employeeData) {
          setEmployee({
            name: `${employeeData.firstName} ${employeeData.lastName}`,
            employeeId: employeeData.id?.toString() || "N/A",
            department: employeeData.department,
            designation: employeeData.position,
            email: employeeData.email,
            phone: employeeData.phone || "N/A",
            location: employeeData.address || "N/A",
            joinDate: new Date(employeeData.joinDate).toLocaleDateString()
          });
          
          // Fetch salary data
          if (employeeData.id) {
            const salaryResponse = await SalaryService.getSalariesByEmployeeId(employeeData.id);
            const salaryData = salaryResponse.data;
            
            if (Array.isArray(salaryData) && salaryData.length > 0) {
              const latestSalary = salaryData[0]; // Assuming the latest is first
              setSalary({
                basic: latestSalary.basicSalary || 0,
                allowances: latestSalary.allowances || 0,
                deductions: latestSalary.deductions || 0,
                netPay: latestSalary.netSalary || 0
              });
            }
            
            // Fetch leave data
            const leaveResponse = await LeaveService.getLeavesByEmployeeId(employeeData.id);
            const leaveData = leaveResponse.data;
            
            if (Array.isArray(leaveData)) {
              setLeaveStatus(leaveData.map(leave => ({
                id: leave.id,
                type: leave.leaveType,
                dates: `${new Date(leave.startDate).toLocaleDateString()} - ${new Date(leave.endDate).toLocaleDateString()}`,
                status: leave.status.toLowerCase(),
                reason: leave.reason
              })));
            }
          }
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle2 className="w-4 h-4 text-success" />;
      case "rejected":
        return <XCircle className="w-4 h-4 text-destructive" />;
      case "pending":
        return <AlertCircle className="w-4 h-4 text-warning" />;
      default:
        return <Clock className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "approved":
        return "default" as const;
      case "rejected":
        return "destructive" as const;
      case "pending":
        return "secondary" as const;
      default:
        return "outline" as const;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="bg-gradient-hero text-primary-foreground rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-2">Welcome back, {employee.name}!</h1>
          <p className="text-gray-800">Here's an overview of your employment details and recent activity.</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-success-light border border-success/20 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-700 font-medium">Net Salary</p>
                <p className="text-2xl font-bold text-success">${salary.netPay.toLocaleString()}</p>
              </div>
              <DollarSign className="w-8 h-8 text-success" />
            </div>
          </div>
          
          <div className="bg-primary-light border border-primary/20 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-700 font-medium">Employee ID</p>
                <p className="text-lg font-bold text-primary">{employee.employeeId}</p>
              </div>
              <User className="w-8 h-8 text-primary" />
            </div>
          </div>

          <div className="bg-warning-light border border-warning/20 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-700 font-medium">Pending Requests</p>
                <p className="text-2xl font-bold text-warning">1</p>
              </div>
              <Calendar className="w-8 h-8 text-warning" />
            </div>
          </div>

          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Years at Company</p>
                <p className="text-2xl font-bold text-foreground">2.9</p>
              </div>
              <Building className="w-8 h-8 text-muted-foreground" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Personal Information */}
          <DashboardCard
            title="Personal Information"
            icon={<User className="w-5 h-5 text-primary" />}
            variant="gradient"
          >
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Full Name</p>
                  <p className="text-foreground">{employee.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Employee ID</p>
                  <p className="text-foreground">{employee.employeeId}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Department</p>
                  <p className="text-foreground">{employee.department}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Designation</p>
                  <p className="text-foreground">{employee.designation}</p>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{employee.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{employee.phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{employee.location}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Joined {employee.joinDate}</span>
                </div>
              </div>
            </div>
          </DashboardCard>

          {/* Salary Details */}
          <DashboardCard
            title="Current Month Salary"
            icon={<DollarSign className="w-5 h-5 text-primary" />}
            variant="highlight"
          >
            <div className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Basic Salary</span>
                  <span className="font-semibold">${salary.basic.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Allowances</span>
                  <span className="font-semibold text-success">+${salary.allowances.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Deductions</span>
                  <span className="font-semibold text-destructive">-${salary.deductions.toLocaleString()}</span>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex justify-between items-center text-lg">
                <span className="font-semibold">Net Pay</span>
                <span className="font-bold text-success">${salary.netPay.toLocaleString()}</span>
              </div>
              
              <Button variant="outline" className="w-full mt-4">
                Download Payslip
              </Button>
            </div>
          </DashboardCard>
        </div>

        {/* Leave Status */}
        <DashboardCard
          title="Leave Request Status"
          icon={<Calendar className="w-5 h-5 text-primary" />}
        >
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-muted-foreground">Track your leave requests and their approval status</p>
              <Button variant="default" size="sm">
                Request Leave
              </Button>
            </div>
            
            <div className="space-y-3">
              {leaveStatus.map((leave) => (
                <div key={leave.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    {getStatusIcon(leave.status)}
                    <div>
                      <p className="font-medium">{leave.type}</p>
                      <p className="text-sm text-muted-foreground">{leave.dates}</p>
                      <p className="text-sm text-muted-foreground">{leave.reason}</p>
                    </div>
                  </div>
                  <Badge variant={getStatusVariant(leave.status)}>
                    {leave.status.charAt(0).toUpperCase() + leave.status.slice(1)}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </DashboardCard>
      </div>
    </DashboardLayout>
  );
}