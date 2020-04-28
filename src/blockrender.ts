import {
    BoxGeometry,
    Camera,
    DirectionalLight,
    Mesh,
    MeshStandardMaterial,
    NearestFilter,
    NoBlending,
    OrthographicCamera,
    Scene,
    Texture,
    TextureLoader,
    WebGLRenderer,
} from "three";

export async function render_block(face_url: URL): Promise<URL> {
    var scene = new Scene();
    
    var direct_light_main = new DirectionalLight(0xffffff, 1);
    direct_light_main.position.set(-1, 2/3, 1);
    scene.add(direct_light_main);
    
    var direct_light_dark = new DirectionalLight(0xffffff, 0.5);
    direct_light_dark.position.set(1, -1/3, 1);
    scene.add(direct_light_dark);
    
    var geometry = new BoxGeometry();
    
    var texture = await load_texture(face_url);
    texture.magFilter = NearestFilter;
    var material = new MeshStandardMaterial({ map: texture });
    material.blending = NoBlending;
    
    var cube = new Mesh(geometry, material);
    cube.rotation.x = Math.PI / 6;
    cube.rotation.y = Math.PI / 4;
    scene.add(cube);
    
    return run_once_render(scene, make_camera());
};

function make_camera(): Camera {
    var dist = 0.80;
    var cam = new OrthographicCamera( -dist, dist, dist, -dist, 1, 1000);
    cam.position.z = 3;
    
    return cam;
}

function load_texture(url: URL): Promise<Texture> {
    return new Promise(resolve => {
        new TextureLoader().load(url, resolve);
    })
}

function run_once_render(scene: Scene, camera: Camera): URL {
    var renderer = new WebGLRenderer({ alpha: true});
    renderer.setSize(512, 512);
    document.body.appendChild(renderer.domElement);
    
    renderer.render(scene, camera);
    
    return renderer.domElement.toDataURL( 'image/png' );
}
