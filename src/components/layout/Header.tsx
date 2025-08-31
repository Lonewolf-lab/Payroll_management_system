import { Building2 } from "lucide-react";

export const Header = () => {
  return (
    <header className="bg-card border-b border-border shadow-soft">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">PayrollPro</h1>
              <p className="text-xs text-muted-foreground">Management System</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};