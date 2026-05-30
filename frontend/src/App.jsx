import UserPage from "./page/UserPage";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./http";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AddUserPage from "./page/AddUserPage";
import EditPage from "./page/EditPage";
import RootLayout from "./page/RootLayout";
const router = createBrowserRouter([
  {
    path: "",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <UserPage />,
      },
      {
        path: "add",
        element: <AddUserPage />,
      },
      {
        path: "users/:id/edit",
        element: <EditPage />,
      },
    ],
  },
]);
export default function App() {
  return (
    <div className="max-w-178 mx-auto pt-5 text-white border border-white px-5  py-8 rounded-xl min-h-[80vh] ">
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </div>
  );
}
