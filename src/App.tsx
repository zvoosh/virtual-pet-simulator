import "./App.css";
import { Header } from "./components";
import { PetPage } from "./pages";

function App() {
  return (
    <div className="w-screen h-screen flex flex-col caveat-brush-regular primary">
      <Header />
      <main className="flex-1 overflow-y-auto">
        <PetPage />
      </main>
    </div>
  );
}

export default App;
