import Link from "next/link";

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
        className="mt-6 rounded-xl bg-medical-blue px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-medical-blue/90"
      >
        Return to Dashboard
      </Link>
    </div>
  );
}
