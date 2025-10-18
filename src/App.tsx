import "./App.css";
import { Header } from "./components";
import { PetPage } from "./pages";

function App() {
  return (
    <div className="w-screen h-screen flex flex-col itim-regular primary">
      <Header />
      <div className="flex-1 overflow-y-auto">
        <PetPage />
      </div>
    </div>
  );
}

export default App;
