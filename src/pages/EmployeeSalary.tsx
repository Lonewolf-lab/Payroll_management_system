import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { DashboardCard } from "@/components/ui/dashboard-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  DollarSign,
  Download,
  TrendingUp,
  TrendingDown,
  Calendar,
  FileText
} from "lucide-react";

export default function EmployeeSalary() {
  const currentSalary = {
    basic: 8000,
    allowances: {
      hra: 1200,
      transport: 500,
      medical: 300
    },
    deductions: {
      tax: 400,
      pf: 100
    },
    netPay: 9500
  };

  const salaryHistory = [
    { month: "December 2024", basic: 8000, allowances: 2000, deductions: 500, netPay: 9500, status: "paid" },
    { month: "November 2024", basic: 8000, allowances: 2000, deductions: 500, netPay: 9500, status: "paid" },
    { month: "October 2024", basic: 7500, allowances: 1800, deductions: 450, netPay: 8850, status: "paid" },
    { month: "September 2024", basic: 7500, allowances: 1800, deductions: 450, netPay: 8850, status: "paid" },
    { month: "August 2024", basic: 7500, allowances: 1800, deductions: 450, netPay: 8850, status: "paid" }
  ];

  const totalAllowances = Object.values(currentSalary.allowances).reduce((a, b) => a + b, 0);
  const totalDeductions = Object.values(currentSalary.deductions).reduce((a, b) => a + b, 0);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-hero text-primary-foreground rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-2">Salary Details</h1>
          <p className="text-white/80">View your current salary breakdown and payment history</p>
        </div>

        {/* Current Salary Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-success-light border border-success/20 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-success-foreground/70">Net Salary</p>
                <p className="text-2xl font-bold text-success">${currentSalary.netPay.toLocaleString()}</p>
              </div>
              <DollarSign className="w-8 h-8 text-success" />
            </div>
          </div>
          
          <div className="bg-primary-light border border-primary/20 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-primary-foreground/70">Basic Salary</p>
                <p className="text-2xl font-bold text-primary">${currentSalary.basic.toLocaleString()}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-primary" />
            </div>
          </div>

          <div className="bg-warning-light border border-warning/20 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-warning-foreground/70">Total Allowances</p>
                <p className="text-2xl font-bold text-warning">${totalAllowances.toLocaleString()}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-warning" />
            </div>
          </div>

          <div className="bg-destructive-light border border-destructive/20 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-destructive-foreground/70">Total Deductions</p>
                <p className="text-2xl font-bold text-destructive">${totalDeductions.toLocaleString()}</p>
              </div>
              <TrendingDown className="w-8 h-8 text-destructive" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Current Month Breakdown */}
          <DashboardCard
            title="Current Month Breakdown"
            icon={<DollarSign className="w-5 h-5 text-primary" />}
            variant="gradient"
          >
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-foreground mb-3">Earnings</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Basic Salary</span>
                    <span className="font-semibold">${currentSalary.basic.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">HRA</span>
                    <span className="font-semibold text-success">+${currentSalary.allowances.hra.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Transport Allowance</span>
                    <span className="font-semibold text-success">+${currentSalary.allowances.transport.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Medical Allowance</span>
                    <span className="font-semibold text-success">+${currentSalary.allowances.medical.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-semibold text-foreground mb-3">Deductions</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Tax Deduction</span>
                    <span className="font-semibold text-destructive">-${currentSalary.deductions.tax.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Provident Fund</span>
                    <span className="font-semibold text-destructive">-${currentSalary.deductions.pf.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="flex justify-between items-center text-lg">
                <span className="font-semibold">Net Pay</span>
                <span className="font-bold text-success">${currentSalary.netPay.toLocaleString()}</span>
              </div>
              
              <Button variant="outline" className="w-full">
                <Download className="w-4 h-4 mr-2" />
                Download Current Payslip
              </Button>
            </div>
          </DashboardCard>

          {/* Salary History */}
          <DashboardCard
            title="Salary History"
            icon={<Calendar className="w-5 h-5 text-primary" />}
            variant="highlight"
          >
            <div className="space-y-4">
              <div className="space-y-3">
                {salaryHistory.map((salary, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{salary.month}</p>
                        <p className="text-sm text-muted-foreground">Net: ${salary.netPay.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="default">Paid</Badge>
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button variant="outline" className="w-full">
                View All History
              </Button>
            </div>
          </DashboardCard>
        </div>
      </div>
    </DashboardLayout>
  );
}