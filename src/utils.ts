import { Camera, Mesh, OrthographicCamera } from "three";

// Pretty much every ISO rendering is done with the same rotation
// transformation, 45 degrees right and 30 degrees down.
export function set_rotation(mesh: Mesh) {
    mesh.rotation.x = Math.PI / 6;
    mesh.rotation.y = Math.PI / 4;
} 

// Standard isometric camera for pretty much any block 1x1 in a scene
export function block_camera(): Camera {
    var dist = 0.80;
    var cam = new OrthographicCamera( -dist, dist, dist, -dist, 1, 1000);
    cam.position.z = 3;
    
    return cam;
}
