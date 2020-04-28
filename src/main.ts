import { render_block } from "./blockrender"

let input: HTMLInputElement;

window.onload = async function main() {
    input = <HTMLInputElement> document.getElementById("file-chooser");
    
    input.addEventListener("change", add_rendered_image);
    
    // Render anything already in the files input, speed testing
    if (input.files.length > 0) {
        add_rendered_image(null);
    }
}

function add_rendered_image(_evnt: Event) {
    let reader = new FileReader();
    
    for (let infile of input.files) {
        console.log(infile);
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
}
