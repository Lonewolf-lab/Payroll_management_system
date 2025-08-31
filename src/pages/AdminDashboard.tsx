import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { DashboardCard } from "@/components/ui/dashboard-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Users,
  DollarSign,
  Calendar,
  UserCheck,
  UserX,
  Search,
  Plus,
  Eye,
  Edit,
  Trash2,
  CheckCircle2,
  XCircle,
  Clock
} from "lucide-react";
import { useEffect, useState } from "react";
import EmployeeService from "@/services/employee-service";
import SalaryService from "@/services/salary-service";
import LeaveService from "@/services/leave-service";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    totalPayroll: 0,
    pendingLeaves: 0,
    activeEmployees: 0
  });

  const [recentEmployees, setRecentEmployees] = useState([]);
  const [pendingLeaves, setPendingLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch employees
        const employeesData = await EmployeeService.getAllEmployees();
        if (employeesData) {
          const activeEmps = employeesData.filter(emp => emp.status === "ACTIVE").length;
          setStats(prev => ({
            ...prev,
            totalEmployees: employeesData.length,
            activeEmployees: activeEmps
          }));
          
          // Set recent employees (last 4)
          setRecentEmployees(employeesData.slice(0, 4).map(emp => ({
            id: emp.id,
            name: emp.name,
            department: emp.department,
            salary: 0, // Will be updated with salary data
            status: emp.status?.toLowerCase() || "active"
          })));
          
          // Fetch all salaries to calculate total payroll
          const salariesData = await SalaryService.getAllSalaries();
          if (salariesData) {
            const totalPayroll = salariesData.reduce((sum, salary) => sum + (salary.netSalary || 0), 0);
            setStats(prev => ({
              ...prev,
              totalPayroll
            }));
            
            // Update employee salaries
            const employeeSalaries = new Map();
            salariesData.forEach(salary => {
              employeeSalaries.set(salary.employeeId, salary.netSalary || 0);
            });
            
            setRecentEmployees(prev => 
              prev.map(emp => ({
                ...emp,
                salary: employeeSalaries.get(emp.id) || 0
              }))
            );
          }
          
          // Fetch leaves
          const leavesData = await LeaveService.getAllLeaves();
          if (leavesData) {
            const pendingLeavesData = leavesData.filter(leave => leave.status === "PENDING");
            setStats(prev => ({
              ...prev,
              pendingLeaves: pendingLeavesData.length
            }));
            
            // Set pending leaves (last 3)
            setPendingLeaves(pendingLeavesData.slice(0, 3).map(leave => ({
              id: leave.id,
              employee: leave.employeeName || "Employee",
              type: leave.leaveType,
              dates: `${new Date(leave.startDate).toLocaleDateString()} - ${new Date(leave.endDate).toLocaleDateString()}`,
              status: "pending"
            })));
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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="default" className="bg-success text-success-foreground">Active</Badge>;
      case "inactive":
        return <Badge variant="secondary">Inactive</Badge>;
      case "pending":
        return <Badge variant="outline" className="border-warning text-warning">Pending</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="bg-gradient-hero text-primary-foreground rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-gray-800">Manage employees, payroll, and leave requests from your central control panel.</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-primary-light border border-primary/20 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-700 font-medium">Total Employees</p>
                <p className="text-2xl font-bold text-primary">{stats.totalEmployees}</p>
              </div>
              <Users className="w-8 h-8 text-primary" />
            </div>
          </div>
          
          <div className="bg-success-light border border-success/20 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-700 font-medium">Monthly Payroll</p>
                <p className="text-2xl font-bold text-success">${stats.totalPayroll.toLocaleString()}</p>
              </div>
              <DollarSign className="w-8 h-8 text-success" />
            </div>
          </div>

          <div className="bg-warning-light border border-warning/20 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-700 font-medium">Pending Leaves</p>
                <p className="text-2xl font-bold text-warning">{stats.pendingLeaves}</p>
              </div>
              <Calendar className="w-8 h-8 text-warning" />
            </div>
          </div>

          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Employees</p>
                <p className="text-2xl font-bold text-foreground">{stats.activeEmployees}</p>
              </div>
              <UserCheck className="w-8 h-8 text-muted-foreground" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Employee Management */}
          <DashboardCard
            title="Employee Management"
            icon={<Users className="w-5 h-5 text-primary" />}
            variant="gradient"
          >
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex-1 mr-4">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                    <Input placeholder="Search employees..." className="pl-10" />
                  </div>
                </div>
                <Button variant="default" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Employee
                </Button>
              </div>

              <div className="space-y-2">
                {recentEmployees.map((employee) => (
                  <div key={employee.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <Users className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{employee.name}</p>
                        <p className="text-sm text-muted-foreground">{employee.department}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-medium">${employee.salary.toLocaleString()}</span>
                      {getStatusBadge(employee.status)}
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Button variant="outline" className="w-full">
                View All Employees
              </Button>
            </div>
          </DashboardCard>

          {/* Leave Requests */}
          <DashboardCard
            title="Pending Leave Requests"
            icon={<Calendar className="w-5 h-5 text-primary" />}
            variant="highlight"
          >
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Review and approve employee leave requests
              </p>

              <div className="space-y-3">
                {pendingLeaves.map((leave) => (
                  <div key={leave.id} className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="font-medium">{leave.employee}</p>
                        <p className="text-sm text-muted-foreground">{leave.type}</p>
                        <p className="text-sm text-muted-foreground">{leave.dates}</p>
                      </div>
                      <Badge variant="outline" className="border-warning text-warning">
                        <Clock className="w-3 h-3 mr-1" />
                        Pending
                      </Badge>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="success" size="sm" className="bg-success text-success-foreground hover:bg-success/90">
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Approve
                      </Button>
                      <Button variant="destructive" size="sm">
                        <XCircle className="w-4 h-4 mr-2" />
                        Reject
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <Button variant="outline" className="w-full">
                View All Requests
              </Button>
            </div>
          </DashboardCard>
        </div>

        {/* Quick Actions */}
        <DashboardCard
          title="Quick Actions"
          icon={<DollarSign className="w-5 h-5 text-primary" />}
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button variant="professional" className="h-auto py-4 flex flex-col items-center space-y-2">
              <Plus className="w-6 h-6" />
              <span>Add New Employee</span>
            </Button>
            <Button variant="professional" className="h-auto py-4 flex flex-col items-center space-y-2">
              <DollarSign className="w-6 h-6" />
              <span>Process Payroll</span>
            </Button>
            <Button variant="professional" className="h-auto py-4 flex flex-col items-center space-y-2">
              <Calendar className="w-6 h-6" />
              <span>Review Leaves</span>
            </Button>
            <Button variant="professional" className="h-auto py-4 flex flex-col items-center space-y-2">
              <Users className="w-6 h-6" />
              <span>Generate Reports</span>
            </Button>
          </div>
        </DashboardCard>
      </div>
    </DashboardLayout>
  );
}