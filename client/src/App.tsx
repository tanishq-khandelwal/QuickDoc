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

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Public Routes */}
      {publicRoutes.map(({ path, element }) => (
        <Route key={path} path={path} element={<Suspense fallback={<div>Loading...</div>}>{element}</Suspense>} />
      ))}

      {/* Doctor Routes */}
      <Route element={<ProtectedRoute allowedRoles={["doctor"]} />}>
        {doctorRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={<Suspense fallback={<div>Loading...</div>}>{element}</Suspense>} />
        ))}
      </Route>

      {/* Patient Routes */}
      <Route element={<ProtectedRoute allowedRoles={["patient"]} />}>
        {patientRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={<Suspense fallback={<div>Loading...</div>}>{element}</Suspense>} />
        ))}
      </Route>

      {/* Fallback Routes */}
      <Route path="*" element={<NotFound />} />
      <Route path="/denied" element={<AccessDenied />} />
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
