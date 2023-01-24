import "./App.css";
import { Dropzone1 } from "./dropzone1";
import { Dropzone2 } from "./dropzone2";

function App() {
  return (
    <div className="App">
      <div className="container">
        <h1>useDropzone</h1>
      </div>
      <div className="container">
        <Dropzone1></Dropzone1>
      </div>
    </div>
  );
}

export default App;
