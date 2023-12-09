import ErrorLayout from "features/ErrorLayout";
import HomePage from "features/HomePage";
import RootLayout from "features/RootLayout";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import TrackableComponent from "../src/TrackableComponent/TrackableComponent";


const AppRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<TrackableComponent element={} errorElement={<TrackableComponent element={<ErrorLayout />} />} >
      <Route errorElement={<TrackableComponent element={<div></div>} />} >
        <Route index element={<TrackableComponent element={<HomePage />} />} />
      </Route>
    </Route>
  )
);

export default AppRouter;
