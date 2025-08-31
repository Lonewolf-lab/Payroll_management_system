import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { DashboardCard } from "@/components/ui/dashboard-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  DollarSign,
  Search,
  Edit,
  Download,
  Calculator,
  TrendingUp,
  TrendingDown,
  Users
} from "lucide-react";
import { useState } from "react";

export default function AdminPayroll() {
  const [searchTerm, setSearchTerm] = useState("");
  const [monthFilter, setMonthFilter] = useState("december-2024");

  const payrollData = [
    {
      employeeId: "EMP-001",
      name: "John Smith",
      department: "Engineering",
      basicSalary: 8000,
      allowances: 2000,
      deductions: 500,
      netPay: 9500,
      status: "processed"
    },
    {
      employeeId: "EMP-002",
      name: "Sarah Johnson",
      department: "Engineering",
      basicSalary: 10000,
      allowances: 2500,
      deductions: 750,
      netPay: 11750,
      status: "processed"
    },
    {
      employeeId: "EMP-003",
      name: "Mike Chen",
      department: "Marketing",
      basicSalary: 7000,
      allowances: 1500,
      deductions: 400,
      netPay: 8100,
      status: "pending"
    },
    {
      employeeId: "EMP-004",
      name: "Emily Davis",
      department: "HR",
      basicSalary: 6000,
      allowances: 1200,
      deductions: 350,
      netPay: 6850,
      status: "processed"
    },
    {
      employeeId: "EMP-005",
      name: "Robert Wilson",
      department: "Finance",
      basicSalary: 6500,
      allowances: 1300,
      deductions: 380,
      netPay: 7420,
      status: "pending"
    }
  ];

  const filteredPayroll = payrollData.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPayroll = payrollData.reduce((sum, item) => sum + item.netPay, 0);
  const processedCount = payrollData.filter(item => item.status === "processed").length;
  const pendingCount = payrollData.filter(item => item.status === "pending").length;

  const getStatusVariant = (status: string) => {
    return status === "processed" ? "default" : "secondary";
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-hero text-primary-foreground rounded-lg p-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold mb-2">Payroll Management</h1>
              <p className="text-white/80">Manage employee salaries and process monthly payroll</p>
            </div>
            <div className="flex space-x-2">
              <Button variant="secondary" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                <Calculator className="w-4 h-4 mr-2" />
                Process Payroll
              </Button>
              <Button variant="secondary" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-success-light border border-success/20 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-success-foreground/70">Total Payroll</p>
                <p className="text-2xl font-bold text-success">${totalPayroll.toLocaleString()}</p>
              </div>
              <DollarSign className="w-8 h-8 text-success" />
            </div>
          </div>
          
          <div className="bg-primary-light border border-primary/20 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-primary-foreground/70">Processed</p>
                <p className="text-2xl font-bold text-primary">{processedCount}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-primary" />
            </div>
          </div>

          <div className="bg-warning-light border border-warning/20 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-warning-foreground/70">Pending</p>
                <p className="text-2xl font-bold text-warning">{pendingCount}</p>
              </div>
              <TrendingDown className="w-8 h-8 text-warning" />
            </div>
          </div>

          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg. Salary</p>
                <p className="text-2xl font-bold text-foreground">
                  ${Math.round(totalPayroll / payrollData.length).toLocaleString()}
                </p>
              </div>
              <Users className="w-8 h-8 text-muted-foreground" />
            </div>
          </div>
        </div>

        {/* Payroll Management */}
        <DashboardCard 
          title="Monthly Payroll" 
          icon={<DollarSign className="w-5 h-5 text-primary" />}
        >
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search employees..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={monthFilter} onValueChange={setMonthFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Month" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="december-2024">December 2024</SelectItem>
                  <SelectItem value="november-2024">November 2024</SelectItem>
                  <SelectItem value="october-2024">October 2024</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline">
                Generate Payslips
              </Button>
            </div>

            {/* Payroll Table */}
            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Basic Salary</TableHead>
                    <TableHead>Allowances</TableHead>
                    <TableHead>Deductions</TableHead>
                    <TableHead>Net Pay</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPayroll.map((item) => (
                    <TableRow key={item.employeeId}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">{item.employeeId}</p>
                        </div>
                      </TableCell>
                      <TableCell>{item.department}</TableCell>
                      <TableCell>${item.basicSalary.toLocaleString()}</TableCell>
                      <TableCell className="text-success">+${item.allowances.toLocaleString()}</TableCell>
                      <TableCell className="text-destructive">-${item.deductions.toLocaleString()}</TableCell>
                      <TableCell className="font-semibold">${item.netPay.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusVariant(item.status)}>
                          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <Edit className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Edit Salary - {item.name}</DialogTitle>
                                <DialogDescription>
                                  Update salary components for this employee.
                                </DialogDescription>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="basic" className="text-right">Basic Salary</Label>
                                  <Input id="basic" defaultValue={item.basicSalary} className="col-span-3" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="allowances" className="text-right">Allowances</Label>
                                  <Input id="allowances" defaultValue={item.allowances} className="col-span-3" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="deductions" className="text-right">Deductions</Label>
                                  <Input id="deductions" defaultValue={item.deductions} className="col-span-3" />
                                </div>
                              </div>
                              <DialogFooter>
                                <Button type="submit">Save Changes</Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                          <Button variant="ghost" size="sm">
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </DashboardCard>
      </div>
    </DashboardLayout>
  );
}