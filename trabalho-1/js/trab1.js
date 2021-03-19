var scene;
var camera;
var renderer;

var init = function () {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(40, window.innerWidth/window.innerHeight, 1, 100);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    camera.position.z = 100;

    criaAnel();
    criaCone();

    renderer.render(scene, camera);
}

window.onload = this.init

var criaAnel = function () {
    const geometria = new THREE.TorusGeometry(5, 2, 8, 24);

    const material = new THREE.MeshBasicMaterial({color: "blue"});

    let ModeloAnel = new THREE.Mesh(geometria, material);

    scene.add(ModeloAnel)
}

var criaCone = function () {
    const geometria = new THREE.ConeGeometry(6, 10, 50);

    const material = new THREE.MeshBasicMaterial({color: "red"});

    let hexagono = new THREE.Mesh(geometria, material);

    scene.add(hexagono)
}