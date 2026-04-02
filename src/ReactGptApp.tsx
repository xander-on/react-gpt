import { RouterProvider } from "react-router"
import { router } from "./presentation/router/router"

export const ReactGptApp = () => {
  return (
    <RouterProvider router={router} />
  )
}
