import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import RouteList from './Router/RouteList'
import { RouterProvider } from 'react-router-dom'
import { Provider } from "react-redux";
import store from "./Redux/store";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={RouteList} />
    </Provider>
  </StrictMode>,
);