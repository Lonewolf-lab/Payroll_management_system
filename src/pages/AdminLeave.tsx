import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { DashboardCard } from "@/components/ui/dashboard-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Calendar,
  Search,
  Check,
  X,
  Clock,
  Filter,
  CheckCircle2,
  XCircle,
  AlertCircle
} from "lucide-react";
import { useState } from "react";

export default function AdminLeave() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const leaveRequests = [
    {
      id: 1,
      employeeId: "EMP-001",
      name: "John Smith",
      department: "Engineering",
      type: "Annual Leave",
      startDate: "2024-12-20",
      endDate: "2024-12-22",
      days: 3,
      reason: "Family vacation",
      appliedOn: "2024-12-10",
      status: "pending"
    },
    {
      id: 2,
      employeeId: "EMP-003",
      name: "Mike Chen",
      department: "Marketing",
      type: "Sick Leave",
      startDate: "2024-12-15",
      endDate: "2024-12-16",
      days: 2,
      reason: "Medical appointment",
      appliedOn: "2024-12-13",
      status: "pending"
    },
    {
      id: 3,
      employeeId: "EMP-002",
      name: "Sarah Johnson",
      department: "Engineering",
      type: "Personal Leave",
      startDate: "2024-11-20",
      endDate: "2024-11-21",
      days: 2,
      reason: "Personal matters",
      appliedOn: "2024-11-15",
      status: "approved"
    },
    {
      id: 4,
      employeeId: "EMP-004",
      name: "Emily Davis",
      department: "HR",
      type: "Annual Leave",
      startDate: "2024-11-10",
      endDate: "2024-11-12",
      days: 3,
      reason: "Wedding ceremony",
      appliedOn: "2024-11-01",
      status: "approved"
    },
    {
      id: 5,
      employeeId: "EMP-005",
      name: "Robert Wilson",
      department: "Finance",
      type: "Sick Leave",
      startDate: "2024-10-25",
      endDate: "2024-10-25",
      days: 1,
      reason: "Flu symptoms",
      appliedOn: "2024-10-24",
      status: "rejected"
    }
  ];

  const filteredRequests = leaveRequests.filter(request => {
    const matchesSearch = request.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || request.status === statusFilter;
    const matchesType = typeFilter === "all" || request.type.toLowerCase().includes(typeFilter.toLowerCase());
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const pendingCount = leaveRequests.filter(req => req.status === "pending").length;
  const approvedCount = leaveRequests.filter(req => req.status === "approved").length;
  const rejectedCount = leaveRequests.filter(req => req.status === "rejected").length;

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

  const handleApprove = (id: number) => {
    console.log("Approving request:", id);
  };

  const handleReject = (id: number) => {
    console.log("Rejecting request:", id);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-hero text-primary-foreground rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-2">Leave Request Management</h1>
          <p className="text-white/80">Review and manage employee leave requests</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-warning-light border border-warning/20 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-warning-foreground/70">Pending Requests</p>
                <p className="text-2xl font-bold text-warning">{pendingCount}</p>
              </div>
              <Clock className="w-8 h-8 text-warning" />
            </div>
          </div>
          
          <div className="bg-success-light border border-success/20 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-success-foreground/70">Approved</p>
                <p className="text-2xl font-bold text-success">{approvedCount}</p>
              </div>
              <CheckCircle2 className="w-8 h-8 text-success" />
            </div>
          </div>

          <div className="bg-destructive-light border border-destructive/20 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-destructive-foreground/70">Rejected</p>
                <p className="text-2xl font-bold text-destructive">{rejectedCount}</p>
              </div>
              <XCircle className="w-8 h-8 text-destructive" />
            </div>
          </div>

          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Requests</p>
                <p className="text-2xl font-bold text-foreground">{leaveRequests.length}</p>
              </div>
              <Calendar className="w-8 h-8 text-muted-foreground" />
            </div>
          </div>
        </div>

        {/* Leave Requests Management */}
        <DashboardCard 
          title="Leave Requests" 
          icon={<Calendar className="w-5 h-5 text-primary" />}
        >
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search requests..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="annual">Annual Leave</SelectItem>
                  <SelectItem value="sick">Sick Leave</SelectItem>
                  <SelectItem value="personal">Personal Leave</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Clear Filters
              </Button>
            </div>

            {/* Requests Table */}
            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Leave Type</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Days</TableHead>
                    <TableHead>Applied On</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{request.name}</p>
                          <p className="text-sm text-muted-foreground">{request.employeeId} • {request.department}</p>
                        </div>
                      </TableCell>
                      <TableCell>{request.type}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p>{request.startDate}</p>
                          <p className="text-muted-foreground">to {request.endDate}</p>
                        </div>
                      </TableCell>
                      <TableCell>{request.days}</TableCell>
                      <TableCell>{request.appliedOn}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(request.status)}
                          <Badge variant={getStatusVariant(request.status)}>
                            {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="sm">
                                View Details
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Leave Request Details</DialogTitle>
                                <DialogDescription>
                                  Review the complete leave request information.
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <p className="text-sm font-medium text-muted-foreground">Employee</p>
                                    <p>{request.name} ({request.employeeId})</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-muted-foreground">Department</p>
                                    <p>{request.department}</p>
                                  </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <p className="text-sm font-medium text-muted-foreground">Leave Type</p>
                                    <p>{request.type}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-muted-foreground">Duration</p>
                                    <p>{request.days} days</p>
                                  </div>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">Dates</p>
                                  <p>{request.startDate} to {request.endDate}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">Reason</p>
                                  <p>{request.reason}</p>
                                </div>
                                {request.status === "pending" && (
                                  <div>
                                    <p className="text-sm font-medium text-muted-foreground mb-2">Admin Comments</p>
                                    <Textarea placeholder="Add comments (optional)" />
                                  </div>
                                )}
                              </div>
                              {request.status === "pending" && (
                                <DialogFooter>
                                  <Button variant="outline" onClick={() => handleReject(request.id)}>
                                    <X className="w-4 h-4 mr-2" />
                                    Reject
                                  </Button>
                                  <Button onClick={() => handleApprove(request.id)}>
                                    <Check className="w-4 h-4 mr-2" />
                                    Approve
                                  </Button>
                                </DialogFooter>
                              )}
                            </DialogContent>
                          </Dialog>
                          
                          {request.status === "pending" && (
                            <>
                              <Button variant="ghost" size="sm" onClick={() => handleApprove(request.id)}>
                                <Check className="w-4 h-4 text-success" />
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => handleReject(request.id)}>
                                <X className="w-4 h-4 text-destructive" />
                              </Button>
                            </>
                          )}
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