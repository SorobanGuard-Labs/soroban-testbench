import Link from "next/link";
import { Activity, BookOpen, FlaskConical } from "lucide-react";
import { APP_NAME } from "@/utils/constants";

export function Navbar() {
  return (
    <header className="border-b border-slate-200 bg-white/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-semibold text-slate-950">
          <Activity className="h-5 w-5 text-cyan-700" aria-hidden="true" />
          <span>{APP_NAME}</span>
        </Link>
        <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
          <Link className="rounded-md px-3 py-2 hover:bg-slate-100" href="/testbench">
            <FlaskConical className="mr-1 inline h-4 w-4" aria-hidden="true" /> Testbench
          </Link>
          <Link className="rounded-md px-3 py-2 hover:bg-slate-100" href="/docs">
            <BookOpen className="mr-1 inline h-4 w-4" aria-hidden="true" /> Docs
          </Link>
        </div>
      </nav>
    </header>
  );
}
