import { ORG_NAME } from "@/utils/constants";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white px-4 py-8 text-sm text-slate-600">
      <div className="mx-auto flex max-w-7xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p>&copy; 2026 {ORG_NAME}. Mock-first Soroban workflow testing.</p>
        <p>No official affiliation with Stellar or Soroban.</p>
      </div>
    </footer>
  );
}
