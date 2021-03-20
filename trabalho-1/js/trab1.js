/**
 * Código escrito por Rodrigo Rech Moraes em 2021 para atividade 1 de Computação Gráfica na Universidade Federação da Fronteira Sul
 */

var scene;
var camera;
var renderer;

var vetorAnel = [];
var vetorCone = [];

var init = function () {

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(40, window.innerWidth/window.innerHeight, 1, 100);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    camera.position.z = 100;

    criaAnel();
    criaCone();
    animation();

}

window.onload = this.init

var criaAnel = function () {
    
    const geometria = new THREE.TorusGeometry(5, 2, 8, 24);
    const material = new THREE.MeshBasicMaterial({color: "blue"});
    vetorAnel["modelo"] = new THREE.Mesh(geometria, material);

    vetorAnel["x"] = Math.random();
    vetorAnel["y"] = Math.random();

    scene.add(vetorAnel["modelo"])
}

var criaCone = function () {

    const geometria = new THREE.ConeGeometry(6, 10, 50);
    const material = new THREE.MeshBasicMaterial({color: "red"});
    vetorCone["modelo"] = new THREE.Mesh(geometria, material);

    vetorCone["x"] = Math.random();
    vetorCone["y"] = Math.random();
    
    scene.add(vetorCone["modelo"])

}

/**
 * Movimenta o modelo
 */
var animation = function() {

    requestAnimationFrame(animation);
    movimentaModelo(vetorAnel)
    movimentaModelo(vetorCone)
    renderer.render(scene, camera);

}

var movimentaModelo = function(vetorModelo) {

    const limiteTelaAltura = 31; //valor válido em monitor 1080x920
    const limiteTelaLargura = 67; //valor válido em monitor 1080x920

    if(vetorModelo["modelo"].position.y >= limiteTelaAltura) {
        vetorModelo["x"] = Math.random();
        vetorModelo["y"] = Math.random() * -1;
    }

    if(vetorModelo["modelo"].position.x >= limiteTelaLargura) {
        vetorModelo["x"] = Math.random() * -1;
        vetorModelo["y"] = Math.random();
    }

    if(vetorModelo["modelo"].position.y <= limiteTelaAltura * -1 || vetorModelo["modelo"].position.x <= limiteTelaLargura * -1) {
        vetorModelo["x"] = Math.random();
        vetorModelo["y"] = Math.random();
    }

    vetorModelo["modelo"].position.x+= vetorModelo["x"];
    vetorModelo["modelo"].position.y+= vetorModelo["y"];

}
