import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Route";
import Movieprovider from "./provider/Movieprovider";

function App() {
  return (
    <div>
      <Movieprovider>
        <RouterProvider router={router} />
      </Movieprovider>
    </div>
  );
}

export default App;
