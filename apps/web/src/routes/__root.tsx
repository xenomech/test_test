import { createRootRoute, Outlet } from "@tanstack/react-router";
import { useAuthStore } from "../stores/auth";
import { useCurrentUser } from "../hooks/useAuth";

export const Route = createRootRoute({
  component: Root,
});

function Root() {
  const { isAuthenticated } = useAuthStore();
  const { isLoading } = useCurrentUser();

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-xl font-bold text-indigo-600">HabitCtrl</span>
              </div>
            </div>
            <div className="flex items-center">
              {!isLoading && (
                <>
                  {isAuthenticated ? (
                    <button
                      onClick={() => useAuthStore.getState().logout()}
                      className="ml-4 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                    >
                      Sign out
                    </button>
                  ) : (
                    <div className="flex space-x-4">
                      <a
                        href="/auth/login"
                        className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                      >
                        Sign in
                      </a>
                      <a
                        href="/auth/signup"
                        className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                      >
                        Sign up
                      </a>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
