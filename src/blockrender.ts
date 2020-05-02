import {
    BoxGeometry,
    Color,
    TextureLoader,
    DirectionalLight,
    Mesh,
    MeshStandardMaterial,
    NearestFilter,
    Scene } from "three";

import { block_camera, set_rotation, run_once_render } from "./utils";

class BlockFaces {
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
        list[4] = front;
    }
    
    if (faces.side != undefined) {
        let side = loader.load(faces.side);
        side.magFilter = NearestFilter;
        list[1] = side;
        if (faces.front == undefined)
            list[4] = side;
    }
    
    return list.map((texture) => new MeshStandardMaterial({ map: texture }));
};

/// Input just `top` for the same texture on all three faces.
/// `top` and `side` renders `side` on both left and right faces, and `top` on top.
/// If all three are passed, `side` renders on the left and `front` on the right.
export function render_block(faces: BlockFaces, canvas?: HTMLCanvasElement) {
    var scene = new Scene();
    
    var direct_light_main = new DirectionalLight(0xffffff, 1);
    direct_light_main.position.set(-1, 1, 1);
    scene.add(direct_light_main);
    
    var direct_light_dark = new DirectionalLight(0xffffff, 0.4);
    direct_light_dark.position.set(1, -1/3, 1);
    scene.add(direct_light_dark);
    
    var materials = load_block_materials(faces);
    var geometry = new BoxGeometry(1, 1, 1);
    
    var cube = new Mesh(geometry, materials);
    set_rotation(cube);
    scene.add(cube);
    
    run_once_render(scene, block_camera(), canvas);
};
