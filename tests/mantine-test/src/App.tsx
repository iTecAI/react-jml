import { MantineProvider } from "@mantine/core";
import React from "react";
import { JMLRenderer } from "react-jml";
import "./App.css";

function App() {
    return (
        <MantineProvider withGlobalStyles withCSSVariables withNormalizeCSS>
            <div className="App">
                <JMLRenderer
                    renderer={"mantine"}
                    data={{}}
                    spec={{ supertype: "render" }}
                />
            </div>
        </MantineProvider>
    );
}

export default App;
