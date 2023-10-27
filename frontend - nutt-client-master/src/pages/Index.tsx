import Home from "./Home/Home";
import Welcome from "./Welcome/Welcome";

export default function Index() {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    return <Welcome />;
  }
  return <Home />;
}
