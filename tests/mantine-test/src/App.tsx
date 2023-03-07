import React from "react";
import { JMLRendererSpec, JMLRenderer } from "react-jml";
import "./App.css";

class MantineRenderer extends JMLRendererSpec {}

function App() {
    return (
        <div className="App">
            <JMLRenderer spec={new MantineRenderer()} />
        </div>
    );
}

export default App;
