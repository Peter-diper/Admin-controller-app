import UserPage from "./page/UserPage";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./http";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <UserPage />,
  },
]);
export default function App() {
  return (
    <div className="max-w-178 mx-auto pt-5 text-white">
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </div>
  );
}
