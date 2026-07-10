import Link from "next/link";
import { buttonStyles } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      <p className="text-6xl font-bold text-navy">404</p>
      <h1 className="mt-4 text-xl font-semibold text-navy">Case not found</h1>
      <p className="mt-2 text-sm text-muted">
        The case you are looking for does not exist in the queue.
      </p>
      <Link
        href="/"
        className={buttonStyles({ variant: "primary", size: "md", className: "mt-6" })}
      >
        Return to Dashboard
      </Link>
    </div>
  );
}
