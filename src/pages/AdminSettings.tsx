import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { DashboardCard } from "@/components/ui/dashboard-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Settings,
  User,
  Bell,
  Shield,
  Database,
  Save,
  RefreshCw
} from "lucide-react";
import { useState } from "react";

export default function AdminSettings() {
  const [companySettings, setCompanySettings] = useState({
    companyName: "TechCorp Solutions",
    address: "123 Business Street, Tech City, TC 12345",
    phone: "+1 (555) 123-4567",
    email: "admin@techcorp.com",
    website: "www.techcorp.com"
  });

  const [payrollSettings, setPayrollSettings] = useState({
    payrollCycle: "monthly",
    payrollDay: "25",
    taxRate: "20",
    pfContribution: "12"
  });

  const [leaveSettings, setLeaveSettings] = useState({
    annualLeave: "20",
    sickLeave: "10",
    personalLeave: "5",
    maternityLeave: "90",
    autoApproval: false
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    leaveRequests: true,
    payrollReminders: true,
    systemUpdates: false
  });

  const handleSaveCompanySettings = () => {
    console.log("Saving company settings:", companySettings);
  };

  const handleSavePayrollSettings = () => {
    console.log("Saving payroll settings:", payrollSettings);
  };

  const handleSaveLeaveSettings = () => {
    console.log("Saving leave settings:", leaveSettings);
  };

  const handleSaveNotificationSettings = () => {
    console.log("Saving notification settings:", notificationSettings);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-hero text-primary-foreground rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-2">System Settings</h1>
          <p className="text-white/80">Configure system preferences and company settings</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Company Information */}
          <DashboardCard
            title="Company Information"
            icon={<User className="w-5 h-5 text-primary" />}
            variant="gradient"
          >
            <div className="space-y-4">
              <div>
                <Label htmlFor="company-name">Company Name</Label>
                <Input
                  id="company-name"
                  value={companySettings.companyName}
                  onChange={(e) => setCompanySettings({...companySettings, companyName: e.target.value})}
                />
              </div>
              
              <div>
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={companySettings.address}
                  onChange={(e) => setCompanySettings({...companySettings, address: e.target.value})}
                  rows={3}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={companySettings.phone}
                    onChange={(e) => setCompanySettings({...companySettings, phone: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={companySettings.email}
                    onChange={(e) => setCompanySettings({...companySettings, email: e.target.value})}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  value={companySettings.website}
                  onChange={(e) => setCompanySettings({...companySettings, website: e.target.value})}
                />
              </div>
              
              <Button onClick={handleSaveCompanySettings} className="w-full">
                <Save className="w-4 h-4 mr-2" />
                Save Company Settings
              </Button>
            </div>
          </DashboardCard>

          {/* Payroll Settings */}
          <DashboardCard
            title="Payroll Settings"
            icon={<Database className="w-5 h-5 text-primary" />}
            variant="highlight"
          >
            <div className="space-y-4">
              <div>
                <Label htmlFor="payroll-cycle">Payroll Cycle</Label>
                <Select value={payrollSettings.payrollCycle} onValueChange={(value) => 
                  setPayrollSettings({...payrollSettings, payrollCycle: value})
                }>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="bi-weekly">Bi-weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="payroll-day">Payroll Day of Month</Label>
                <Input
                  id="payroll-day"
                  type="number"
                  min="1"
                  max="31"
                  value={payrollSettings.payrollDay}
                  onChange={(e) => setPayrollSettings({...payrollSettings, payrollDay: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="tax-rate">Default Tax Rate (%)</Label>
                  <Input
                    id="tax-rate"
                    type="number"
                    value={payrollSettings.taxRate}
                    onChange={(e) => setPayrollSettings({...payrollSettings, taxRate: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="pf-contribution">PF Contribution (%)</Label>
                  <Input
                    id="pf-contribution"
                    type="number"
                    value={payrollSettings.pfContribution}
                    onChange={(e) => setPayrollSettings({...payrollSettings, pfContribution: e.target.value})}
                  />
                </div>
              </div>
              
              <Button onClick={handleSavePayrollSettings} className="w-full">
                <Save className="w-4 h-4 mr-2" />
                Save Payroll Settings
              </Button>
            </div>
          </DashboardCard>

          {/* Leave Policy Settings */}
          <DashboardCard
            title="Leave Policy Settings"
            icon={<Settings className="w-5 h-5 text-primary" />}
          >
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="annual-leave">Annual Leave (Days)</Label>
                  <Input
                    id="annual-leave"
                    type="number"
                    value={leaveSettings.annualLeave}
                    onChange={(e) => setLeaveSettings({...leaveSettings, annualLeave: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="sick-leave">Sick Leave (Days)</Label>
                  <Input
                    id="sick-leave"
                    type="number"
                    value={leaveSettings.sickLeave}
                    onChange={(e) => setLeaveSettings({...leaveSettings, sickLeave: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="personal-leave">Personal Leave (Days)</Label>
                  <Input
                    id="personal-leave"
                    type="number"
                    value={leaveSettings.personalLeave}
                    onChange={(e) => setLeaveSettings({...leaveSettings, personalLeave: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="maternity-leave">Maternity Leave (Days)</Label>
                  <Input
                    id="maternity-leave"
                    type="number"
                    value={leaveSettings.maternityLeave}
                    onChange={(e) => setLeaveSettings({...leaveSettings, maternityLeave: e.target.value})}
                  />
                </div>
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="auto-approval">Auto-approve leave requests</Label>
                  <p className="text-sm text-muted-foreground">Automatically approve leave requests under 2 days</p>
                </div>
                <Switch
                  id="auto-approval"
                  checked={leaveSettings.autoApproval}
                  onCheckedChange={(checked) => setLeaveSettings({...leaveSettings, autoApproval: checked})}
                />
              </div>
              
              <Button onClick={handleSaveLeaveSettings} className="w-full">
                <Save className="w-4 h-4 mr-2" />
                Save Leave Settings
              </Button>
            </div>
          </DashboardCard>

          {/* Notification Settings */}
          <DashboardCard
            title="Notification Settings"
            icon={<Bell className="w-5 h-5 text-primary" />}
          >
            <div className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                  </div>
                  <Switch
                    checked={notificationSettings.emailNotifications}
                    onCheckedChange={(checked) => 
                      setNotificationSettings({...notificationSettings, emailNotifications: checked})
                    }
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Leave Request Notifications</Label>
                    <p className="text-sm text-muted-foreground">Get notified of new leave requests</p>
                  </div>
                  <Switch
                    checked={notificationSettings.leaveRequests}
                    onCheckedChange={(checked) => 
                      setNotificationSettings({...notificationSettings, leaveRequests: checked})
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Payroll Reminders</Label>
                    <p className="text-sm text-muted-foreground">Reminders for payroll processing</p>
                  </div>
                  <Switch
                    checked={notificationSettings.payrollReminders}
                    onCheckedChange={(checked) => 
                      setNotificationSettings({...notificationSettings, payrollReminders: checked})
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>System Updates</Label>
                    <p className="text-sm text-muted-foreground">Notifications about system updates</p>
                  </div>
                  <Switch
                    checked={notificationSettings.systemUpdates}
                    onCheckedChange={(checked) => 
                      setNotificationSettings({...notificationSettings, systemUpdates: checked})
                    }
                  />
                </div>
              </div>
              
              <Button onClick={handleSaveNotificationSettings} className="w-full">
                <Save className="w-4 h-4 mr-2" />
                Save Notification Settings
              </Button>
            </div>
          </DashboardCard>
        </div>

        {/* System Actions */}
        <DashboardCard
          title="System Actions"
          icon={<Shield className="w-5 h-5 text-primary" />}
        >
          <div className="flex flex-wrap gap-4">
            <Button variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Backup Database
            </Button>
            <Button variant="outline">
              <Database className="w-4 h-4 mr-2" />
              Export Employee Data
            </Button>
            <Button variant="outline">
              <Settings className="w-4 h-4 mr-2" />
              Reset System Cache
            </Button>
            <Button variant="destructive">
              <Shield className="w-4 h-4 mr-2" />
              Reset All Settings
            </Button>
          </div>
        </DashboardCard>
      </div>
    </DashboardLayout>
  );
}