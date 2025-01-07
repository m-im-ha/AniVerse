import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Route";
import Movieprovider from "./provider/Movieprovider";
import { ThemeProvider } from "./provider/ThemeProvider";

function App() {
  return (
    <div>
      <ThemeProvider>
        <Movieprovider>
          <RouterProvider router={router} />
        </Movieprovider>
      </ThemeProvider>
    </div>
  );
}

export default App;
