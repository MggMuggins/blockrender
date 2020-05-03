import {
    BoxGeometry,
    TextureLoader,
    Mesh,
    MeshStandardMaterial,
    NearestFilter,
    Scene } from "three";

import { block_camera, run_once_render, set_block_lights } from "./utils";

export class BlockFaces {
    top?: URL;
    side?: URL;
    front?: URL;
}

function load_block_materials(faces: BlockFaces): MeshStandardMaterial[] {
    /// Array Layout:
    // posx, negx
    // posy, negy
    // posz, negz
    
    let loader = new TextureLoader();
    
    let top = loader.load(faces.top);
    top.magFilter = NearestFilter;
    
    let list = Array(6).fill(top);
    
    if (faces.front != undefined) {
        let front = loader.load(faces.front);
        front.magFilter = NearestFilter;
        list[0] = front;
    }
    
    if (faces.side != undefined) {
        let side = loader.load(faces.side);
        side.magFilter = NearestFilter;
        list[4] = side;
        if (faces.front == undefined)
            list[0] = side;
    }
    
    return list.map((texture) => new MeshStandardMaterial({ map: texture }));
};

/// Input just `top` for the same texture on all three faces.
/// `top` and `side` renders `side` on both left and right faces, and `top` on top.
/// If all three are passed, `side` renders on the left and `front` on the right.
export function render_block(faces: BlockFaces, canvas?: HTMLCanvasElement) {
    var scene = new Scene();
    
    set_block_lights(scene);
    
    var materials = load_block_materials(faces);
    var geometry = new BoxGeometry(16, 16, 16);
    
    var cube = new Mesh(geometry, materials);
    scene.add(cube);
    
    run_once_render(scene, block_camera(canvas), canvas);
};
