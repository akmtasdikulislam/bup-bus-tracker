import { RouterProvider } from "react-router";
import "./assets/styles/global.css";
import router from "./Routes";
const App = () => {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
};

export default App;
