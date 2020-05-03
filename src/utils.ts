import {
    Camera,
    DefaultLoadingManager,
    DirectionalLight,
    OrthographicCamera,
    Scene,
    WebGLRenderer } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const BLOCK_SIDE_LEN = 16;

// Standard isometric camera for pretty much any block 16x16 in a scene at 0,0,0
// Top of the block is pos y, side is pos z, and front is pos x
export function block_camera(canvas: HTMLCanvasElement): Camera {
    let dist_factor = 0.80;
    let dist = dist_factor * BLOCK_SIDE_LEN;
    let cam = new OrthographicCamera( -dist, dist, dist, -dist, 1, 1000);
    
    let controls = new OrbitControls(cam, canvas);
    
    cam.position.set(
        BLOCK_SIDE_LEN * 3,
        BLOCK_SIDE_LEN * 3 * (Math.PI / 4),
        BLOCK_SIDE_LEN * 3);
    controls.update();
    
    return cam;
}

// Add two directional lights to scene to simulate inventory render lighting
export function set_block_lights(scene: Scene) {
    var direct_light_main = new DirectionalLight(0xffffff, 1);
    direct_light_main.position.set(0, 1+1/3, 1);
    scene.add(direct_light_main);
    
    var direct_light_dark = new DirectionalLight(0xffffff, 0.4);
    direct_light_dark.position.set(1, 0, 0);
    scene.add(direct_light_dark);
}

// Render the scene to the canvas with camera
export function run_once_render(scene: Scene, camera: Camera, canvas?: HTMLCanvasElement) {
    canvas.getContext("webgl", { preserveDrawingBuffer: true });
    
    var renderer = new WebGLRenderer({
        alpha: true,
        canvas: canvas,
    });
    renderer.setSize(512, 512);
    
    DefaultLoadingManager.onLoad = function() {
        renderer.render(scene, camera);
    }
}
