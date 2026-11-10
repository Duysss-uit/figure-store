import type { ReactNode } from "react";
import { AccountNav } from "@/components/account-nav";
import { RequireAuth } from "@/components/require-auth";

export default function AccountLayout({ children }: { children: ReactNode }) {
  return (
    <div className="page">
      <RequireAuth>
        <div className="account-layout">
          <AccountNav />
          <div>{children}</div>
        </div>
      </RequireAuth>
    </div>
  );
}
