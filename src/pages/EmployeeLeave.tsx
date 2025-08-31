import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { DashboardCard } from "@/components/ui/dashboard-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  Calendar as CalendarIcon,
  Plus,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Clock
} from "lucide-react";
import { useState } from "react";

export default function EmployeeLeave() {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [leaveType, setLeaveType] = useState("");
  const [reason, setReason] = useState("");

  const leaveBalance = {
    annual: { total: 20, used: 8, remaining: 12 },
    sick: { total: 10, used: 2, remaining: 8 },
    personal: { total: 5, used: 1, remaining: 4 },
    maternity: { total: 90, used: 0, remaining: 90 }
  };

  const leaveRequests = [
    { 
      id: 1, 
      type: "Annual Leave", 
      startDate: "2024-12-20", 
      endDate: "2024-12-22", 
      days: 3,
      status: "approved", 
      reason: "Family vacation",
      appliedOn: "2024-12-10"
    },
    { 
      id: 2, 
      type: "Sick Leave", 
      startDate: "2024-11-15", 
      endDate: "2024-11-15", 
      days: 1,
      status: "approved", 
      reason: "Medical appointment",
      appliedOn: "2024-11-14"
    },
    { 
      id: 3, 
      type: "Personal Leave", 
      startDate: "2025-01-10", 
      endDate: "2025-01-12", 
      days: 3,
      status: "pending", 
      reason: "Personal matters",
      appliedOn: "2024-12-15"
    }
  ];

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

  const handleSubmitRequest = () => {
    // Handle form submission
    console.log({ leaveType, startDate, endDate, reason });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-hero text-primary-foreground rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-2">Leave Management</h1>
          <p className="text-white/80">Apply for leave and track your leave balance and requests</p>
        </div>

        {/* Leave Balance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-primary-light border border-primary/20 rounded-lg p-4">
            <div className="text-center">
              <p className="text-sm text-primary-foreground/70">Annual Leave</p>
              <p className="text-2xl font-bold text-primary">{leaveBalance.annual.remaining}</p>
              <p className="text-xs text-primary-foreground/60">of {leaveBalance.annual.total} remaining</p>
            </div>
          </div>
          
          <div className="bg-success-light border border-success/20 rounded-lg p-4">
            <div className="text-center">
              <p className="text-sm text-success-foreground/70">Sick Leave</p>
              <p className="text-2xl font-bold text-success">{leaveBalance.sick.remaining}</p>
              <p className="text-xs text-success-foreground/60">of {leaveBalance.sick.total} remaining</p>
            </div>
          </div>

          <div className="bg-warning-light border border-warning/20 rounded-lg p-4">
            <div className="text-center">
              <p className="text-sm text-warning-foreground/70">Personal Leave</p>
              <p className="text-2xl font-bold text-warning">{leaveBalance.personal.remaining}</p>
              <p className="text-xs text-warning-foreground/60">of {leaveBalance.personal.total} remaining</p>
            </div>
          </div>

          <div className="bg-muted rounded-lg p-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Maternity Leave</p>
              <p className="text-2xl font-bold text-foreground">{leaveBalance.maternity.remaining}</p>
              <p className="text-xs text-muted-foreground">of {leaveBalance.maternity.total} remaining</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Leave Request Form */}
          <DashboardCard
            title="Apply for Leave"
            icon={<Plus className="w-5 h-5 text-primary" />}
            variant="gradient"
          >
            <div className="space-y-4">
              <div>
                <Label htmlFor="leave-type">Leave Type</Label>
                <Select value={leaveType} onValueChange={setLeaveType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select leave type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="annual">Annual Leave</SelectItem>
                    <SelectItem value="sick">Sick Leave</SelectItem>
                    <SelectItem value="personal">Personal Leave</SelectItem>
                    <SelectItem value="maternity">Maternity Leave</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Start Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !startDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={setStartDate}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <Label>End Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !endDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={endDate}
                        onSelect={setEndDate}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div>
                <Label htmlFor="reason">Reason</Label>
                <Textarea
                  id="reason"
                  placeholder="Please provide reason for leave..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  rows={3}
                />
              </div>

              <Button onClick={handleSubmitRequest} className="w-full">
                Submit Leave Request
              </Button>
            </div>
          </DashboardCard>

          {/* Leave Requests History */}
          <DashboardCard
            title="Leave Request History"
            icon={<CalendarIcon className="w-5 h-5 text-primary" />}
            variant="highlight"
          >
            <div className="space-y-4">
              <div className="space-y-3">
                {leaveRequests.map((request) => (
                  <div key={request.id} className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(request.status)}
                        <h4 className="font-medium">{request.type}</h4>
                      </div>
                      <Badge variant={getStatusVariant(request.status)}>
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </Badge>
                    </div>
                    
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p><strong>Duration:</strong> {request.startDate} to {request.endDate} ({request.days} days)</p>
                      <p><strong>Reason:</strong> {request.reason}</p>
                      <p><strong>Applied on:</strong> {request.appliedOn}</p>
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
      </div>
    </DashboardLayout>
  );
}