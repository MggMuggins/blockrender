import * as riot from "riot";
import App from "./components/app.riot";

window.onload = function main() {
    riot.component(App)(document.getElementById("root"), {});
    
    console.log("Componenet Applied");
}
