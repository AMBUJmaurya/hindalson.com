"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { adminNavMain, adminNavSoon } from "@/components/admin/adminNav";

function NavLink({
  href,
  label,
  live,
  badge,
  onNavigate,
}: {
  href: string;
  label: string;
  live: boolean;
  badge?: string;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const active = live && (pathname === href || pathname.startsWith(`${href}/`));

  if (!live) {
    return (
      <div className="flex items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-white/30">
        <span className="text-sm font-medium">{label}</span>
        {badge ? (
          <span className="rounded-full border border-white/10 px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-white/25">
            {badge}
          </span>
        ) : null}
      </div>
    );
  }

  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={`group relative flex items-center justify-between gap-2 rounded-xl px-3 py-2.5 transition ${
        active
          ? "bg-cyan/12 text-white"
          : "text-white/55 hover:bg-white/[0.04] hover:text-white"
      }`}
    >
      {active ? (
        <span
          aria-hidden
          className="absolute bottom-2 left-0 top-2 w-0.5 rounded-full bg-cyan shadow-[0_0_12px_rgba(0,200,212,0.8)]"
        />
      ) : null}
      <span className="pl-2 text-sm font-semibold">{label}</span>
      {badge ? (
        <span className="rounded-full bg-cyan/15 px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-cyan">
          {badge}
        </span>
      ) : null}
    </Link>
  );
}

export function AdminSidebar({
  adminEmail,
  onLogout,
  mobileOpen,
  onCloseMobile,
}: {
  adminEmail?: string;
  onLogout: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}) {
  const panel = (
    <div className="flex h-full flex-col">
      <div className="border-b border-white/8 px-5 py-6">
        <Link href="/admin/dashboard" onClick={onCloseMobile} className="block leading-none">
          <span className="brand-mark text-base tracking-[0.14em]">Hindalson</span>
          <span className="brand-sub mt-1.5 block text-[0.55rem] tracking-[0.38em]">
            Admin Console
          </span>
        </Link>
      </div>

      <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-5">
        <div>
          <p className="mb-2 px-3 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-white/30">
            Main
          </p>
          <div className="space-y-1">
            {adminNavMain.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                label={item.label}
                live={item.live}
                onNavigate={onCloseMobile}
              />
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 px-3 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-white/30">
            Coming next
          </p>
          <div className="space-y-1">
            {adminNavSoon.map((item) => (
              <NavLink
                key={item.label}
                href={item.href}
                label={item.label}
                live={item.live}
                badge={item.badge}
              />
            ))}
          </div>
        </div>
      </nav>

      <div className="border-t border-white/8 p-4">
        <p className="truncate px-2 text-xs text-white/35">{adminEmail}</p>
        <div className="mt-3 grid gap-2">
          <Link
            href="/"
            target="_blank"
            className="rounded-lg border border-white/10 px-3 py-2 text-center text-sm text-white/60 transition hover:border-cyan/35 hover:text-cyan"
          >
            View website →
          </Link>
          <button
            type="button"
            onClick={onLogout}
            className="rounded-lg border border-white/10 px-3 py-2 text-sm text-white/60 transition hover:border-red-400/30 hover:text-red-300"
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <aside className="admin-sidebar hidden w-[260px] shrink-0 border-r border-white/8 bg-[#151d25]/95 backdrop-blur-xl lg:block">
        {panel}
      </aside>

      {mobileOpen ? (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={onCloseMobile}
        />
      ) : null}

      <aside
        className={`admin-sidebar fixed inset-y-0 left-0 z-50 w-[280px] border-r border-white/8 bg-[#151d25] shadow-2xl transition-transform duration-300 lg:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {panel}
      </aside>
    </>
  );
}
