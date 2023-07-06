import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import Header from "./components/Header";
import Home from "./pages/Home";

function App() {
  return (
    <div>
      <Header />
      <Home />
    </div>
  );
}

export default App;
