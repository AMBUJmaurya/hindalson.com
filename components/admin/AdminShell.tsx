"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { useAdminAuth } from "@/components/admin/AdminAuthProvider";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { adminNavMain } from "@/components/admin/adminNav";

function titleFromPath(pathname: string) {
  const match = adminNavMain.find(
    (item) => pathname === item.href || pathname.startsWith(`${item.href}/`)
  );
  return match?.label ?? "Admin";
}

export function AdminShell({ children }: { children: ReactNode }) {
  const { token, admin, loading, logout } = useAdminAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileNav, setMobileNav] = useState(false);
  const isLogin = pathname === "/admin";

  useEffect(() => {
    if (loading) return;
    if (!token && !isLogin) {
      router.replace("/admin");
    }
    if (token && isLogin) {
      router.replace("/admin/dashboard");
    }
  }, [loading, token, isLogin, router]);

  useEffect(() => {
    setMobileNav(false);
  }, [pathname]);

  if (loading) {
    return (
      <div className="admin-dash flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="admin-loader mx-auto h-10 w-10 rounded-full border-2 border-cyan/30 border-t-cyan" />
          <p className="mt-4 text-sm text-white/45">Loading console…</p>
        </div>
      </div>
    );
  }

  if (!token || isLogin) {
    return <>{children}</>;
  }

  const pageTitle = titleFromPath(pathname);

  return (
    <div className="admin-dash admin-in flex min-h-screen">
      <AdminSidebar
        adminEmail={admin?.email}
        mobileOpen={mobileNav}
        onCloseMobile={() => setMobileNav(false)}
        onLogout={() => {
          logout();
          router.replace("/admin");
        }}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 border-b border-white/8 bg-[#10151c]/85 backdrop-blur-md">
          <div className="flex h-14 items-center justify-between gap-4 px-4 sm:px-6 lg:h-16">
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/12 text-white/70 lg:hidden"
                aria-label="Open menu"
                onClick={() => setMobileNav(true)}
              >
                ☰
              </button>
              <div>
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-white/35">
                  Hindalson Admin
                </p>
                <p className="display text-lg font-bold text-white">{pageTitle}</p>
              </div>
            </div>
            <div className="hidden items-center gap-3 sm:flex">
              <span className="admin-live inline-flex items-center gap-2 rounded-full border border-cyan/25 bg-cyan/10 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-cyan">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
                Live
              </span>
              <Link
                href="/"
                target="_blank"
                className="text-sm font-medium text-white/45 transition hover:text-cyan"
              >
                View site →
              </Link>
            </div>
          </div>
        </header>

        <main className="admin-main flex-1 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
