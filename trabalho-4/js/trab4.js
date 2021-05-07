var scene; //mundo virtual
var camera; //area de visualização
var renderer; //responsavel por renderizar tudo

var parametrosGUI = {};

var elementos = [];

var velocidade = 0.07;

var ground;
var geometriaA;


var objLoading = function(){
	loader = new THREE.OBJLoader();
	
	let loaderFBX = new THREE.FBXLoader();
	loaderFBX.load(
		'assets/Sheep.fbx',
		function(obj){
			
			elementos['Sheep 1'] = obj;

			obj.traverse( function (child){
					if (child instanceof THREE.Mesh){
						child.material = new THREE.MeshStandardMaterial({
							map: new THREE.TextureLoader().load("assets/texturas/UVSheep.png")}
						);
					}
				}
			);

			 obj.scale.y = 0.02;
			 obj.scale.z = 0.02;
			 obj.scale.x = 0.02;

			obj.position.y = -7.6;
			obj.position.x = +10;
			obj.position.z = 0;

			

			scene.add(obj);

		},
		function(andamento){
			console.log("Carregou: " + (andamento.loaded / andamento.total)*100 + " %" );
		},
		function(error){
			console.log(" Deu merda!: "+ error);
		}
	);

	loaderFBX.load(
		'assets/Bull.fbx',
		function(obj){
			
			elementos['Bull 1'] = obj;

			obj.traverse( function (child){
					if (child instanceof THREE.Mesh){
						child.material = new THREE.MeshStandardMaterial({
							map: new THREE.TextureLoader().load("assets/texturas/UV-Bull.png")}
						);
					}
				}
			);

			 obj.scale.y = 0.02;
			 obj.scale.z = 0.02;
			 obj.scale.x = 0.02;

			obj.position.y = -7.6;
			obj.position.x = +30;
			obj.position.z = +30;

			

			scene.add(obj);

		},
		function(andamento){
			console.log("Carregou: " + (andamento.loaded / andamento.total)*100 + " %" );
		},
		function(error){
			console.log(" Deu merda!: "+ error);
		}
	);

	loaderFBX.load(
		'assets/Jaguar.fbx',
		function(obj){
			
			elementos['Jaguar 1'] = obj;

			obj.traverse( function (child){
					if (child instanceof THREE.Mesh){
						child.material = new THREE.MeshStandardMaterial({
							map: new THREE.TextureLoader().load("assets/texturas/Jaguar_texture.png")}
						);
					}
				}
			);

			 obj.scale.y = 0.02;
			 obj.scale.z = 0.02;
			 obj.scale.x = 0.02;

			obj.position.y = -7.6;
			obj.position.x = -30;
			obj.position.z = +30;

			

			scene.add(obj);

		},
		function(andamento){
			console.log("Carregou: " + (andamento.loaded / andamento.total)*100 + " %" );
		},
		function(error){
			console.log(" Deu merda!: "+ error);
		}
	);

	loaderFBX.load(
		'assets/Sabertooth.fbx',
		function(obj){
			
			elementos['Sabertooth 1'] = obj;

			obj.traverse( function (child){
					if (child instanceof THREE.Mesh){
						child.material = new THREE.MeshStandardMaterial({
							map: new THREE.TextureLoader().load("assets/texturas/UV-Sabertooth.png")}
						);
					}
				}
			);

			 obj.scale.y = 0.05;
			 obj.scale.z = 0.05;
			 obj.scale.x = 0.05;

			obj.position.y = -7.6;
			obj.position.x = +60;
			obj.position.z = +60;

			

			scene.add(obj);

		},
		function(andamento){
			console.log("Carregou: " + (andamento.loaded / andamento.total)*100 + " %" );
		},
		function(error){
			console.log(" Deu merda!: "+ error);
		}
	);

	loaderFBX.load(
		'assets/Bear.fbx',
		function(obj){
			
			elementos['Bear 1'] = obj;

			obj.traverse( function (child){
					if (child instanceof THREE.Mesh){
						child.material = new THREE.MeshStandardMaterial({
							map: new THREE.TextureLoader().load("assets/texturas/UV Bear.png")}
						);
					}
				}
			);

			 obj.scale.y = 0.005;
			 obj.scale.z = 0.005;
			 obj.scale.x = 0.005;

			obj.position.y = -7.6;
			obj.position.x = -60;
			obj.position.z = +60;
			

			scene.add(obj);

		},
		function(andamento){
			console.log("Carregou: " + (andamento.loaded / andamento.total)*100 + " %" );
		},
		function(error){
			console.log(" Deu merda!: "+ error);
		}
	);

	loaderFBX.load(
		'assets/Elephant.fbx',
		function(obj){
			
			elementos['Elephant 1'] = obj;

			obj.traverse( function (child){
					if (child instanceof THREE.Mesh){
						child.material = new THREE.MeshStandardMaterial({
							map: new THREE.TextureLoader().load("assets/texturas/UV Elephant.png")}
						);
					}
				}
			);

			 obj.scale.y = 0.008;
			 obj.scale.z = 0.008;
			 obj.scale.x = 0.008;

			obj.position.y = -7.6;
			obj.position.x = -100;
			obj.position.z = 0;

			

			scene.add(obj);

		},
		function(andamento){
			console.log("Carregou: " + (andamento.loaded / andamento.total)*100 + " %" );
		},
		function(error){
			console.log(" Deu merda!: "+ error);
		}
	);

	loaderFBX.load(
		'assets/Sheep.fbx',
		function(obj){
			
			elementos['Sheep 2'] = obj;

			obj.traverse( function (child){
					if (child instanceof THREE.Mesh){
						child.material = new THREE.MeshStandardMaterial({
							map: new THREE.TextureLoader().load("assets/texturas/UVSheep.png")}
						);
					}
				}
			);

			 obj.scale.y = 0.02;
			 obj.scale.z = 0.02;
			 obj.scale.x = 0.02;

			obj.position.y = -7.6;
			obj.position.x = -60;
			obj.position.z = 0;

			

			scene.add(obj);

		},
		function(andamento){
			console.log("Carregou: " + (andamento.loaded / andamento.total)*100 + " %" );
		},
		function(error){
			console.log(" Deu merda!: "+ error);
		}
	);

	loaderFBX.load(
		'assets/Bull.fbx',
		function(obj){
			
			elementos['Bull 2'] = obj;

			obj.traverse( function (child){
					if (child instanceof THREE.Mesh){
						child.material = new THREE.MeshStandardMaterial({
							map: new THREE.TextureLoader().load("assets/texturas/UV-Bull.png")}
						);
					}
				}
			);

			 obj.scale.y = 0.02;
			 obj.scale.z = 0.02;
			 obj.scale.x = 0.02;

			obj.position.y = -7.6;
			obj.position.x = -150;
			obj.position.z = 30;

			

			scene.add(obj);

		},
		function(andamento){
			console.log("Carregou: " + (andamento.loaded / andamento.total)*100 + " %" );
		},
		function(error){
			console.log(" Deu merda!: "+ error);
		}
	);

	loaderFBX.load(
		'assets/Jaguar.fbx',
		function(obj){
			
			elementos['Jaguar 2'] = obj;

			obj.traverse( function (child){
					if (child instanceof THREE.Mesh){
						child.material = new THREE.MeshStandardMaterial({
							map: new THREE.TextureLoader().load("assets/texturas/Jaguar_texture.png")}
						);
					}
				}
			);

			 obj.scale.y = 0.02;
			 obj.scale.z = 0.02;
			 obj.scale.x = 0.02;

			obj.position.y = -7.6;
			obj.position.x = -10;
			obj.position.z = 200;

			

			scene.add(obj);

		},
		function(andamento){
			console.log("Carregou: " + (andamento.loaded / andamento.total)*100 + " %" );
		},
		function(error){
			console.log(" Deu merda!: "+ error);
		}
	);

	loaderFBX.load(
		'assets/Sabertooth.fbx',
		function(obj){
			
			elementos['Sabertooth 2'] = obj;

			obj.traverse( function (child){
					if (child instanceof THREE.Mesh){
						child.material = new THREE.MeshStandardMaterial({
							map: new THREE.TextureLoader().load("assets/texturas/UV-Sabertooth.png")}
						);
					}
				}
			);

			 obj.scale.y = 0.05;
			 obj.scale.z = 0.05;
			 obj.scale.x = 0.05;

			obj.position.y = -7.6;
			obj.position.x = 150;
			obj.position.z = -10;

			

			scene.add(obj);

		},
		function(andamento){
			console.log("Carregou: " + (andamento.loaded / andamento.total)*100 + " %" );
		},
		function(error){
			console.log(" Deu merda!: "+ error);
		}
	);

	loaderFBX.load(
		'assets/Bear.fbx',
		function(obj){
			
			elementos['Bear 2'] = obj;

			obj.traverse( function (child){
					if (child instanceof THREE.Mesh){
						child.material = new THREE.MeshStandardMaterial({
							map: new THREE.TextureLoader().load("assets/texturas/UV Bear.png")}
						);
					}
				}
			);

			 obj.scale.y = 0.005;
			 obj.scale.z = 0.005;
			 obj.scale.x = 0.005;

			obj.position.y = -7.6;
			obj.position.x = -100;
			obj.position.z = +100;

			

			scene.add(obj);

		},
		function(andamento){
			console.log("Carregou: " + (andamento.loaded / andamento.total)*100 + " %" );
		},
		function(error){
			console.log(" Deu merda!: "+ error);
		}
	);

	loaderFBX.load(
		'assets/Elephant.fbx',
		function(obj){
			
			elementos['Elephant 2'] = obj;

			obj.traverse( function (child){
					if (child instanceof THREE.Mesh){
						child.material = new THREE.MeshStandardMaterial({
							map: new THREE.TextureLoader().load("assets/texturas/UV Elephant.png")}
						);
					}
				}
			);

			 obj.scale.y = 0.008;
			 obj.scale.z = 0.008;
			 obj.scale.x = 0.008;

			obj.position.y = -7.6;
			obj.position.x = -50;
			obj.position.z = +100;

			

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


	let opcoes = ['Sheep 1', 'Sheep 2', 'Bull 1', 'Bull 2', 'Sabertooth 1', 'Sabertooth 2', 'Jaguar 1', 'Jaguar 2', 'Elephant 1', 'Elephant 2'];
	let comboChange = gui.add(parametrosGUI, 'geometrias').options(opcoes).name("Objetos");
	comboChange.onChange(function(parametro){
			camera.lookAt(elementos[parametro].position);
			parametrosGUI.modelGui = parametro;
		}
	);


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
	
	godSaysLightsOn();

	createGui();

	objLoading();

	animation();


	let textureLoad = new THREE.TextureLoader();
	let groundTexture = textureLoad.load("assets/texturas/terrain/grasslight-big.jpg"); //busca a imagem
	groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping; //quero que ela se repita
	groundTexture.encoding = THREE.sRGBEncoding; //padrão cores, sempre que existir será informado
	groundTexture.repeat.set(25,25); //número de vezes que ela vai se repetir dentro do nosso chão
	
	let materialGround = new THREE.MeshStandardMaterial({map: groundTexture});
	materialGround.normalMap = textureLoad.load("assets/texturas/terrain/grasslight-big-nm.jpg"); //busca a normal, que da noção básica de profundidade


	ground = new THREE.Mesh(
		new THREE.PlaneBufferGeometry(1000,1000),
		materialGround
	);
	ground.rotation.x = - Math.PI/2;
	ground.position.y-=7.5;
	scene.add(ground);



	// document.addEventListener('keydown', apertouButao);
	// document.addEventListener('keyup', soltouBotao);

	// //metodos do mouser
	// document.addEventListener('mousewheel', onMouseWheel);
	// document.addEventListener('mousemove', onMouseMove);
	// document.addEventListener('mousedown', onMouseClick);
	// document.addEventListener('mouseup', onMouseUp);

	
};

var key_r = false;
var key_space = false;
var key_q = false;

var soltouBotao = function(e){

	if (e.keyCode == 82){ //r
		key_r = false;
	}
	if (e.keyCode == 32){ //espaço
		key_space = false;
	}
	if (e.keyCode == 81){ //espaço
		key_q = false;
	}
}

var count =0; 
var velocidadeOmbroDireitoC = -0.01;
var velocidadeOmbroDireitoL = -0.01;
var pulando = false;
var velocidadePulo = 0.5;
var altura = -1;
var animation = function (){
	requestAnimationFrame(animation); //adiciona o método na fila de renderização

	if (key_space){ //movimento frente
		if (elementos["puppet"]["pivotOmbroD"].rotation.x < -2.83 || elementos["puppet"]["pivotOmbroD"].rotation.x > 1.3)
			velocidadeOmbroDireitoC*=-1;

		elementos["puppet"]["pivotOmbroD"].rotation.x += velocidadeOmbroDireitoC;
	}
	if (key_r){
		if (elementos["puppet"]["pivotOmbroD"].rotation.z < 0 || elementos["puppet"]["pivotOmbroD"].rotation.z > 1.4)
			velocidadeOmbroDireitoL*=-1;

		elementos["puppet"]["pivotOmbroD"].rotation.z += velocidadeOmbroDireitoL;
	}
	if (key_q){
		elementos["puppet"]["tronco"].rotation.y += 0.01;
	}

	if (pulando && ++count >= 30 ){
		
		if (altura == -1) altura = elementos['puppet']['tronco'].position.y;
		if (elementos['puppet']['tronco'].position.y >= altura && elementos['puppet']['tronco'].position.y <= altura+3){
			//console.log("-> "+ elementos['puppet']['tronco'].position.y);
			elementos['puppet']['tronco'].position.y+=velocidadePulo;
			if (elementos['puppet']['tronco'].position.y <= altura){
				elementos['puppet']['tronco'].position.y = altura;
				pulando = false;
			}
		} else{
			elementos['puppet']['tronco'].position.y-=velocidadePulo; 	
			velocidadePulo *=-1;
		}
		count =0;
	}

	renderer.render(scene, camera); //tira uma foto do estado e mostra na tela
}

function paraRadianos(angulo){
	return angulo * (Math.PI/180);
}

window.onload = this.init