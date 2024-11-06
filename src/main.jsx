import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./assets/scss/app.scss";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Redux/Store.jsx";
import "react-datepicker/dist/react-datepicker.css";
import { AuthProvider } from "./helper/AuthProvider.jsx";
import { CategoryProvider } from "./helper/CategoryProvider.jsx";
import { CommonProvider } from "./helper/CommonProvider.jsx";
import { CMsProvider } from "./helper/CmsProvider.jsx";
import { DashboardProvider } from "./helper/DashboardProvider.jsx";
import { MasterProvider } from "./helper/MasterProvider.jsx";
import { StockProvider } from "./helper/StockManagement.jsx";
import { OrderProvider } from "./helper/OrderProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <AuthProvider>
          <CommonProvider>
            <CategoryProvider>
              <CMsProvider>
                <DashboardProvider>
                  <MasterProvider>
                    <StockProvider>
                      <OrderProvider>
                              <App />
                      </OrderProvider>
                    </StockProvider>
                  </MasterProvider>
                </DashboardProvider>
              </CMsProvider>
            </CategoryProvider>
          </CommonProvider>
        </AuthProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
