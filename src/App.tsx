import "./styles.css";
import CreateZebra from "./components/CreateZebra.tsx";

export default function App() {
  return (
    <div className="App">
        <h1>ZEBRA ICE</h1>

      <div className="game">
        <CreateZebra />
      </div>
    </div>
  );
}
