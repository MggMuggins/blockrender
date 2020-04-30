import * as riot from "riot";
import App from "./components/app.riot";

//

window.onload = function main() {
    riot.component(App)(document.getElementById("root"), {});
    
    console.log("Componenet Applied");
}
/*
export function file_stringify(file: File): string {
    let blob = new Blob(file);
    return JSON.stringify({
        blob: file.text(),
        name: file.name,
    });
}

export function file_from_JSON(json: string): File {
    let jsonobj = JSON.parse(json);
    let file = new File();
    //file.lastModified = jsonobj.lastModified;
    //file.name = jsonobj.name;
    //file.size = jsonobj.size;
    //file.type = jsonobj.type;
    
    return file;
}

/*
function add_rendered_image(_evnt: Event) {
    let reader = new FileReader();
    
    for (let infile of input.files) {
        reader.readAsDataURL(infile);
        reader.onload = async function() {
            let result = <URL> <unknown> reader.result;
            let rendered_uri = await render_block({ top: result });
            
            let link = document.createElement("a");
            link.href = rendered_uri.toString();
            link.download = infile.name;
            link.text = infile.name;
            
            let li = document.createElement("li");
            li.appendChild(link);
            document.getElementById("rendered-list").appendChild(li);
        }
    }
}*/
