import { createFileRoute } from "@tanstack/react-router";
import { ProtectedRoute } from "../components/ProtectedRoute";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <ProtectedRoute>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900">Welcome to HabitCtrl</h1>
          <p className="mt-4 text-lg text-gray-600">
            Start tracking your habits and achieve your goals.
          </p>
        </div>
      </div>
    </ProtectedRoute>
  );
}
