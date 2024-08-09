import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Toaster } from "sonner"

import { Room } from "./pages/room"
import { CreateRoom } from "./pages/create-room"

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
    <>
      <RouterProvider router={router}/>
      <Toaster invert richColors />
    </>
  )
}

