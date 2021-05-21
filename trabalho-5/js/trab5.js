var scene; //mundo virtual
var camera; //area de visualização
var renderer; //responsavel por renderizar tudo

var parametrosGUI = {};

var elementos = [];

var velocidade = 0.07;

var ground;
var geometriaA;


var objLoading = function(){
	
	let loaderFBX = new THREE.FBXLoader();
	
	loaderFBX.load(
		'assets/College_Building_001.fbx',
		function(obj){
			
			elementos['Bull 4'] = obj;

			obj.traverse( function (child){
					if (child instanceof THREE.Mesh){
						child.material = new THREE.MeshStandardMaterial({
							map: new THREE.TextureLoader().load("assets/College_Building_001_diffuse.png")}
						);
					}
				}
			);

			 obj.scale.y = 0.02;
			 obj.scale.z = 0.02;
			 obj.scale.x = 0.02;

			obj.position.y = -7.6;
			obj.position.x = -20;
			obj.position.z = 0;

			obj.rotation.y= 1.65;

			scene.add(obj);
			camera.lookAt(obj.position);
		},
		function(andamento){
			console.log("Carregou: " + (andamento.loaded / andamento.total)*100 + " %" );
		},
		function(error){
			console.log(" Deu merda!: "+ error);
		}
	);

	loaderFBX.load(
		'assets/Police Car.fbx',
		function(obj){
			
			elementos['car'] = obj;

			obj.traverse( function (child){
					if (child instanceof THREE.Mesh){
						child.material = new THREE.MeshStandardMaterial({
							map: new THREE.TextureLoader().load("assets/UVPoliceCar.png")}
						);
					}
				}
			);

			 obj.scale.y = 0.05;
			 obj.scale.z = 0.05;
			 obj.scale.x = 0.05;

			obj.position.y = -3.2;
			obj.position.x = -4;
			obj.position.z = 0;

			obj.rotation.y+= 9.5;

			scene.add(obj);

		},
		function(andamento){
			console.log("Carregou: " + (andamento.loaded / andamento.total)*100 + " %" );
		},
		function(error){
			console.log(" Deu merda!: "+ error);
		}
	);
};

var godSaysLightsOn = function (){
	let spot = new THREE.SpotLight(0xffffff);
	spot.position.set(100,100,100);
	scene.add(spot);

	scene.add(new THREE.AmbientLight(0xffffff));

}

var createGui = function (){
	const gui = new dat.GUI();

	parametrosGUI = {
		scalarPuppet: 1,
		positionX: 0,
		positionY: -6,
		positionZ: 0,

		skyColor : "#000000",
		groundColor: "#006400",

		geometrias: "",
		modelGui: ""
	};


	// let opcoes = ['Sheep 1', 'Sheep 2', 'Bull 1', 'Bull 2', 'Sabertooth 1', 'Sabertooth 2', 'Elephant 1', 'Elephant 2'];
	// let comboChange = gui.add(parametrosGUI, 'geometrias').options(opcoes).name("Objetos");
	// comboChange.onChange(function(parametro){
	// 		camera.lookAt(elementos[parametro].position);
	// 		parametrosGUI.modelGui = parametro;
	// 	}
	// );


	//gui.add(parametrosGUI, 'b').name("Variavel2");

	//scene.add(gui);
	gui.open();

}

var init = function (){
	scene = new THREE.Scene();
	scene.background = new THREE.Color(0x00BFFF)
	
	
//	Camera em perspectiva
	camera = new THREE.PerspectiveCamera(
						50, // view angle
						window.innerWidth/window.innerHeight, //aspect ratio
						1, //near
						300 //far
					);
	
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);
		
	camera.position.z = 50;
	camera.position.x = 0;
	camera.position.y = 1.7;

	// camera.position.z = 100;
	// camera.position.x = 100;
	 camera.position.y = 30.7;
	
	godSaysLightsOn();

	createGui();

	objLoading();

	animation();


	let textureLoad = new THREE.TextureLoader();
	let groundTexture = textureLoad.load("assets/texturas/terrain/Rocks_Dirt01.png"); //busca a imagem
	groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping; //quero que ela se repita
	groundTexture.encoding = THREE.sRGBEncoding; //padrão cores, sempre que existir será informado
	groundTexture.repeat.set(50,50); //número de vezes que ela vai se repetir dentro do nosso chão
	
	let materialGround = new THREE.MeshStandardMaterial({map: groundTexture});
	materialGround.normalMap = textureLoad.load("assets/texturas/terrain/Rocks_Dirt01_normal.png"); //busca a normal, que da noção básica de profundidade
	materialGround.displacementMap = textureLoad.load("assets/texturas/terrain/Rocks_Dirt01_disp.png")


	ground = new THREE.Mesh(
		new THREE.PlaneBufferGeometry(1000,1000),
		materialGround
	);
	ground.rotation.x = - Math.PI/2;
	ground.position.y-=7.5;
	scene.add(ground);



	//document.addEventListener('keydown', apertouButao);
	document.addEventListener('keyup', soltouBotao);

	//metodos do mouser
	// document.addEventListener('mousewheel', onMouseWheel);
	// document.addEventListener('mousemove', onMouseMove);
	// document.addEventListener('mousedown', onMouseClick);
	// document.addEventListener('mouseup', onMouseUp);

	
};

var count =0; 
var velocidadeOmbroDireitoC = -0.01;
var velocidadeOmbroDireitoL = -0.01;
var pulando = false;
var velocidadePulo = 0.5;
var altura = -1;
var animation = function (){
	requestAnimationFrame(animation); //adiciona o método na fila de renderização
	if(elementos['car']!=null)
		//elementos['car'].position.z-=1; aqui
	renderer.render(scene, camera); //tira uma foto do estado e mostra na tela
}

function paraRadianos(angulo){
	return angulo * (Math.PI/180);
}

window.onload = this.init