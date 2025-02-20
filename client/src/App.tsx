import {
  createRoutesFromElements,
  Route,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { Suspense } from "react";
import ProtectedRoute from "./routes/protectedRoutes";
import NotFound from "./routes/notFound";
import AccessDenied from "./routes/denied";

import {
  publicRoutes,
  doctorRoutes,
  patientRoutes,
} from "./routes/routeConfig";
import Loading from "./components/loader/loader";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Public Routes */}
      {publicRoutes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}



      {/* Doctor Routes */}
      <Route element={<ProtectedRoute allowedRoles={["doctor"]} />}>
        {doctorRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Route>

      {/* Patient Routes */}
      <Route element={<ProtectedRoute allowedRoles={["patient","guest"]} />}>
        {patientRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Route>



      {/* Fallback Routes */}
      <Route path="*" element={<NotFound />} />
      <Route path="/denied" element={<AccessDenied />} />
    </>
  )
);

function App() {
  return (
    <Suspense fallback={<Loading/>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
