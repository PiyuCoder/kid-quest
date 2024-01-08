import "./App.css";

import { RouterProvider } from "react-router-dom";
import UserContextProvider from "./context/userContext.js";
import { router } from "./router.js";

function App() {
  return (
    <UserContextProvider>
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </UserContextProvider>
  );
}

export default App;
