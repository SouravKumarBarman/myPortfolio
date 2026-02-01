"use client";

import { useState } from "react";
import { useAdmin } from "@/lib/admin-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Lock, LogOut, AlertCircle } from "lucide-react";

interface AdminLoginProps {
  trigger?: React.ReactNode;
  onSuccess?: () => void;
}

export function AdminLogin({ trigger, onSuccess }: AdminLoginProps) {
  const { login } = useAdmin();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (login(password)) {
      setPassword("");
      setOpen(false);
      onSuccess?.();
    } else {
      setError("Invalid password");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm" className="sm:px-3 px-2">
            <Lock className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">Admin Login</span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Admin Login</DialogTitle>
          <DialogDescription>
            Enter the admin password to access blog management features.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
              />
            </div>
            {error && (
              <div className="flex items-center gap-2 text-sm text-destructive">
                <AlertCircle className="h-4 w-4" />
                {error}
              </div>
            )}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Login</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function AdminLogout() {
  const { logout, isAdmin } = useAdmin();

  if (!isAdmin) return null;

  return (
    <Button variant="ghost" size="sm" onClick={logout} className="sm:px-3 px-2">
      <LogOut className="h-4 w-4 sm:mr-2" />
      <span className="hidden sm:inline">Logout</span>
    </Button>
  );
}
