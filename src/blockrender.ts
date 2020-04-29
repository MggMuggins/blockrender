import {
    BoxGeometry,
    Camera,
    Texture,
    TextureLoader,
    DirectionalLight,
    Mesh,
    MeshStandardMaterial,
    NearestFilter,
    Scene,
    WebGLRenderer,
} from "three";

import { block_camera, set_rotation } from "./utils";

class BlockFaces {
    top: URL;
    side?: URL;
    front?: URL;
}

function load_texture(faces: BlockFaces): Promise<Texture[]> {
    return new Promise(resolve => {
        /// Array Layout:
        // posx, negx
        // posy, negy
        // posz, negz
        
        let loader = new TextureLoader();
        let top = loader.load(faces.top, resolve);
        top.magFilter = NearestFilter;
        
        let list = Array(6).fill(top);
        
        if (faces.front != undefined) {
            let front = loader.load(faces.front, resolve);
            front.magFilter = NearestFilter;
            list[4] = front;
        }
        
        if (faces.side != undefined) {
            let side = loader.load(faces.side, resolve);
            side.magFilter = NearestFilter;
            list[1] = side;
            if (faces.front == undefined)
                list[4] = list[1];
        }
        
        return list;
    });
};

/// Input just `top` for the same texture on all three faces.
/// `top` and `side` renders `side` on both left and right faces, and `top` on top.
/// If all three are passed, `side` renders on the left and `front` on the right.
export async function render_block(faces: BlockFaces): Promise<URL> {
    var scene = new Scene();
    
    var direct_light_main = new DirectionalLight(0xffffff, 1);
    direct_light_main.position.set(-1, 1, 1);
    scene.add(direct_light_main);
    
    var direct_light_dark = new DirectionalLight(0xffffff, 0.4);
    direct_light_dark.position.set(1, -1/3, 1);
    scene.add(direct_light_dark);
    
    var textures = await load_texture(faces);
    var material = new MeshStandardMaterial({ map: textures });
    
    var geometry = new BoxGeometry(1, 1, 1);
    
    var cube = new Mesh(geometry, material);
    set_rotation(cube);
    scene.add(cube);
    
    return run_once_render(scene, block_camera());
};

function run_once_render(scene: Scene, camera: Camera): URL {
    var renderer = new WebGLRenderer({
        alpha: true,
        canvas: document.getElementById("render-canvas"),
    });
    renderer.setSize(512, 512);
    
    renderer.render(scene, camera);
    
    return renderer.domElement.toDataURL( 'image/png' );
}
