import * as ko from "knockout";
import { ObservableArray } from "knockout";

import { render_block } from "./blockrender"

let input: HTMLInputElement;

window.onload = function main() {
    //input = <HTMLInputElement> document.getElementById("file-chooser");
    //input.addEventListener("change", add_file);
    
    // Render anything already in the files input, speed testing
    //if (input.files.length > 0) {
    //    add_rendered_image(null);
    //}
    
    document.getElementById("render-type")
        .addEventListener("change", switch_render_type);
    
    document.getElementById("download-button")
        .addEventListener("click", download_current_render);
    
    ko.applyBindings(new ResourceFileViewModel());
    console.log("Bindings applied");
}
/*
class ResourceFile {
    file: File;
    name: string;
    constructor(file: File) {
        this.file = file;
    }
}*/

class ResourceFileViewModel {
    files: ObservableArray<File>;
    
    constructor() {
        this.files = ko.observableArray();
    }
    
    add_file = function(self: ResourceFileViewModel, evnt: Event) {
        let files = (<HTMLInputElement> evnt.target).files;
        
        // FileList is a _very_ slim API...
        for (let file of files)
            self.files.push(file);
    }
    
    remove_file = function(self: ResourceFileViewModel, file: File, evnt: Event) {
        console.log("Removing:", file);
        console.log("Param? ", evnt);
        self.files.remove(file);
    }
}

/// Files list, left hand column
function add_file(evnt: Event) {
    let list = document.getElementById("file-list");
    
    let files = (<HTMLInputElement> event.target).files;
    
    for (let file of files) {
        let file_elem = document.createElement("div");
        file_elem.classList.add("file");
        file_elem.draggable = true;
        file_elem.innerHTML = file.name;
        
        let remove_button = document.createElement("div");
        remove_button.classList.add("file-remove");
        remove_button.innerHTML = " - ";
        remove_button.onclick = function() {
            file_elem.remove();
        };
        
        file_elem.appendChild(remove_button);
        list.appendChild(file_elem);
    }
}

function switch_render_type(evnt: Event) {
    let target_id = (<HTMLSelectElement> event.target).value;
    //TODO: Not really useful with only one render type
}

function download_current_render() {
    
}

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
}
