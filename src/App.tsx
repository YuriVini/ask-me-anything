import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { CreateRoom } from "./pages/create-room"
import { Room } from "./pages/room"

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
    <RouterProvider router={router}/>
  )
}

