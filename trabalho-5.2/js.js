var scene; //mundo virtual
var camera; //area de visualização
var renderer; //responsavel por renderizar tudo

var parametrosGUI = {};
var animationFolder;

var elementos = [];
var lights = [];
var velocidade = 0.07;

var ground;
var geometriaA;


//variaveis p animacao


var objLoading = function(){
//carrega o astronauta
let loaderFBX = new THREE.FBXLoader();
	loaderFBX.load(
		'assets/astronauta.fbx',//arquivo que vamos buscar
		function(obj){
			//atribui a cena, colore, reposiciona, rotaciona
			elementos['astro'] = obj;

			


			obj.traverse( function (child){
					if (child instanceof THREE.Mesh){
						child.material = new THREE.MeshStandardMaterial({

						map: new THREE.TextureLoader().load("assets/texturas/UVastronaut.png")

						})
						child.castShadow = true
					}
				}
			);

			 obj.scale.y = 0.02;
			 obj.scale.z = 0.02;
			 obj.scale.x = 0.02;

			obj.position.y = 2;
			obj.position.x = 0;
			obj.position.z = 15;

			//obj.rotation.x-=1.35;

			scene.add(obj);
			console.log("Carregou astronauta");
			loadFinished = true;

		},//Oque acontece quando terminar!
		function(andamento){
			console.log("Carregou: " + (andamento.loaded / andamento.total)*100 + " %" );
		},//O que acontece enquanto esta carregando
		function(error){
			console.log(" Deu merda!: "+ error);
		}//o que acontece se der merda.
	);
};




var createGui = function (){
	const gui = new dat.GUI();

	parametrosGUI = {

		ambientLight: 1,
		DirectionalLight: 1,

		skyColor : "#000000",

		geometrias: "",
		modelGui: "",


	};


	let Luz = gui.add(parametrosGUI, 'ambientLight').min(0).max(0.6).step(0.1).name("luz ambiente");
	Luz.onChange(function (parametro){
			lights['ambient']. intensity = parametro;
		}
	);

	let LuzS = gui.add(parametrosGUI, 'DirectionalLight').min(0).max(0.6).step(0.1).name("luz do sol");
	LuzS.onChange(function (parametro){
			lights['directional']. intensity = parametro;
		}
	);

	let opcoes = ['Astronauta'];
	let comboChange = gui.add(parametrosGUI, 'geometrias').options(opcoes).name("Objetos");
	comboChange.onChange(function(parametro){
			if (parametro == 'Astronauta'){
			 camera.lookAt(elementos["astro"].position);
			 parametrosGUI.modelGui = "astro";
		 }
		}
	);


	let colorFolder = gui.addFolder('Coloros');
	let sColor = colorFolder.addColor(parametrosGUI, 'skyColor').name("SkyColor");
	sColor.onChange(function (parametro){
			scene.background= new THREE.Color(parametro);
		}
	);

	animationFolder = gui.addFolder('Animations');

	//gui.add(parametrosGUI, 'b').name("Variavel2");

	//scene.add(gui);
	gui.open();

}

var ambientLightOn = function(){
	lights['ambient'] = new THREE.AmbientLight(0xffffff, 0.7);
	scene.add(lights['ambient']);
}

var directionalLigthOn = function(){
	let light = new THREE.DirectionalLight(0xffffff, 1);
	light.castShadow = true;
	light.shadow.mapSize.width = 4096;//define os pixeis da sombra, quanto mais pixeis mais qualidade
	light.shadow.mapSize.height = 4096;
	light.shadow.camera.left = 1000
	light.shadow.camera.bottom = 1000;
	light.shadow.camera.right = -1000
	light.shadow.camera.top = -1000;

	light.position.y = 200;
	light.position.x = 100;
	light.target = ground;


	scene.add(light);
	scene.add(light.target);
	lights['directional'] = light;

}


var godSaysLightsOn = function (){
	directionalLigthOn();
	ambientLightOn();

}




var init = function (){
	scene = new THREE.Scene();
	scene.background = new THREE.Color(0x000000)


//	Camera em perspectiva
	camera = new THREE.PerspectiveCamera(
						50, // view angle
						window.innerWidth/window.innerHeight, //aspect ratio
						1, //near
						300 //far
					);



	renderer = new THREE.WebGLRenderer();
	renderer.shadowMap.enable = true;
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	camera.position.z = 50;
	camera.position.x = 0;
	camera.position.y = 1.7;





	objLoading();

	createGui();


	animation();


	//criar um piso.
	let textureLoad = new THREE.TextureLoader();
	let groundTexture = textureLoad.load("assets/texturas/terrain/lua.jpg");
	groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
	groundTexture.encoding = THREE.sRGBEncoding;
	groundTexture.repeat.set(7, 7);

	let materialGround = new THREE.MeshStandardMaterial({map: groundTexture});
	materialGround.normalMap = textureLoad.load("assets/texturas/terrain/grasslight-big-nm.jpg");


	ground = new THREE.Mesh(
		new THREE.PlaneBufferGeometry(1000,1000),
		materialGround
	);
	ground.receiveShadow = true;
	ground.rotation.x = - Math.PI/2;
	ground.position.y-=7.5;
	scene.add(ground);

	godSaysLightsOn();

	document.addEventListener('keydown', apertouButao);
	document.addEventListener('keyup', soltouBotao);

	//metodos do mouser
	document.addEventListener('mousewheel', onMouseWheel);
	document.addEventListener('mousemove', onMouseMove);
	document.addEventListener('mousedown', onMouseClick);
	document.addEventListener('mouseup', onMouseUp);


};
var clicando = false;
var mouserPosAnterior = {
	x:0,
	y:0
}

var onMouseMove = function(e){
	let diferencaMovimento = {
		x: e.offsetX - mouserPosAnterior.x,
		y: e.offsetY - mouserPosAnterior.y
	}

	if (clicando){

		//  let angulosQuaternion = new THREE.Quaternion().setFromEuler(
		//  	new THREE.Euler (	paraRadianos(diferencaMovimento.y)*0.5,
		//  					    paraRadianos(diferencaMovimento.x)*0.5,
		//  						0,
		//  						'XYZ')
		//  );
		//  elementos["puppet"]["tronco"].quaternion.multiplyQuaternions(angulosQuaternion, elementos["puppet"]["tronco"].quaternion);

		//camera.rotation.x += paraRadianos(diferencaMovimento.y)*0.1;
		camera.rotation.y += paraRadianos(diferencaMovimento.x)*0.1;


	}
	mouserPosAnterior = {
		x: e.offsetX,
		y: e.offsetY
	}
};

var onMouseClick = function(e){
	clicando = true;
};

var onMouseUp = function(e){
	clicando = false;
};

var onMouseWheel = function (e){
	elementos["puppet"]["tronco"].scale.x+= (e.deltaY > 0)?-0.1:0.1;
	elementos["puppet"]["tronco"].scale.y+= (e.deltaY > 0)?-0.1:0.1;
	elementos["puppet"]["tronco"].scale.z+= (e.deltaY > 0)?-0.1:0.1;

}



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



var animation = function (){
	requestAnimationFrame(animation); //adiciona o método na fila de renderização





	renderer.render(scene, camera); //tira uma foto do estado e mostra na tela
}

function paraRadianos(angulo){
	return angulo * (Math.PI/180);
}

window.onload = this.init
