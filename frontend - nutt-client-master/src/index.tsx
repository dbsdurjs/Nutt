import ReactDOM from "react-dom/client";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider } from "@chakra-ui/react";
import Fonts from "./fonts";
import theme from "./theme";
import "./styles/index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import SignUp from "./pages/SignUp/SignUp";
import SignIn from "./pages/SignIn/SignIn";
import DietAnalysisPage from "./pages/Analysis/DietAnalysisPage";
import Chat from "./pages/Chat/Chat";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import Index from "./pages/Index";
import { useEffect } from "react";
import MealRecord from "./pages/MealRecord/MealRecord";
import Setting from "./pages/Setting/Setting";
import PhotoRecognition from "./pages/PhotoRecognition/PhotoRecognition";

function ProtectedRoute(props: { children: any }) {
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      console.error("ACCESS_DENIED: 로그인이 필요한 페이지입니다.");
      navigate("/");
    }
  }, [navigate]);

  return props.children;
}

function ForbiddenRoute(props: { children: any }) {
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      console.error(
        "ACCESS_DENIED: 로그인 상태에서 접근할 수 없는 페이지입니다."
      );
      navigate("/");
    }
  }, [navigate]);

  return props.children;
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<ErrorPage />}>
      <Route index element={<Index />} />
      <Route
        path="signup"
        element={
          <ForbiddenRoute>
            <SignUp />
          </ForbiddenRoute>
        }
      />
      <Route
        path="login"
        element={
          <ForbiddenRoute>
            <SignIn />
          </ForbiddenRoute>
        }
      />
      <Route
        path="analysis"
        element={
          <ProtectedRoute>
            <DietAnalysisPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="chat"
        element={
          <ProtectedRoute>
            <Chat />
          </ProtectedRoute>
        }
      />
      <Route
        path="meal-record"
        element={
          <ProtectedRoute>
            <MealRecord />
          </ProtectedRoute>
        }
      />
      <Route
        path="setting"
        element={
          <ProtectedRoute>
            <Setting />
          </ProtectedRoute>
        }
      />
      <Route
        path="photo-recognition"
        element={
          <ProtectedRoute>
            <PhotoRecognition />
          </ProtectedRoute>
        }
      />
    </Route>
  )
);

const root = document.getElementById("root") as HTMLElement;

ReactDOM.createRoot(root).render(
  <Provider store={configureStore()}>
    <ChakraProvider theme={theme}>
      <Fonts />
      <RouterProvider router={router} />
    </ChakraProvider>
  </Provider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
