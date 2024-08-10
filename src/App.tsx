import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Toaster } from "sonner"

import { Room } from "./pages/room"
import { CreateRoom } from "./pages/create-room"
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "./lib/react-query"

export const App = () => {

  const router  = createBrowserRouter([
    {
      path: "/",
      element: <CreateRoom />,
    },
    {
      path: "/room/:roomId",
      element: <Room />,
    }
  ])

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}/>
      <Toaster invert richColors />
    </QueryClientProvider>
  )
}

