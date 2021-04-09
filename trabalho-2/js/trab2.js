/**
 * BOTÕES:
 * 	Scroll do mouse: zoom
 *  q: girar personagem
 * 	r: movimentar braços e pernas
 *  espaço: movimentar braços e pernas
 */
var scene; 
var camera;
var renderer;

var elementos = [];

var velocidade = 0.07;

var init = function (){
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(40, window.innerWidth/window.innerHeight, 1, 150);
	
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);
	
	camera.position.z = 80;
	camera.position.x = 0;
	camera.position.y = 2;
	
	criaModelosPersonagem();
	
	animation();

	document.addEventListener('keydown', apertouBotao);
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

		 let angulosQuaternion = new THREE.Quaternion().setFromEuler(
		 	new THREE.Euler (	paraRadianos(diferencaMovimento.y)*0.5,
		 					    paraRadianos(diferencaMovimento.x)*0.5,
		 						0,
		 						'XYZ')
		 );
		 elementos["puppet"]["tronco"].quaternion.multiplyQuaternions(angulosQuaternion, elementos["puppet"]["tronco"].quaternion);
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


var apertouBotao =  function(e){
	console.log(e.keyCode);

	if (e.keyCode == 82){ //r
		key_r = true;
	}
	if (e.keyCode == 32){ // space
		key_space = true;
	}

	if (e.keyCode == 81){ //q
		key_q = true;		
	}

	if (e.keyCode == 189){ //-
		elementos["terra"].scale.x-=0.1;
		elementos["cubo2"].scale.y-=0.1;
		elementos["cubo2"].scale.z-=0.1;
	}
	if (e.keyCode == 187){ //+
		elementos["terra"].scale.x+=0.1;
		elementos["terra"].scale.y+=0.1;
		elementos["terra"].scale.z+=0.1;
	}
}

var count =0; 
var velocidadeOmbroDireitoC = -0.01;
var velocidadeOmbroDireitoL = -0.01;
var velocidadeOmbroEsquerdoC = -0.01;
var velocidadeOmbroEsquerdoL = -0.01;
var velocidadeCotoveloDireitoC = -0.01;
var velocidadeCotoveloEsquerdoC = -0.01;
var velocidadeBaciaEsquerdaC = -0.01;
var velocidadeBaciaDireitoC = -0.01;
var velocidadeJoelhoDireitoC = -0.01;
var velocidadeJoelhoEsquerdoC = -0.01;

var animation = function (){
	requestAnimationFrame(animation); //adiciona o método na fila de renderização

	//camera
	if (key_q){
		elementos["puppet"]["tronco"].rotation.y += 0.01;
	}

	//braço direito
	if (key_space){ 
		if (elementos["puppet"]["pivotOmbroD"].rotation.x < -2.83 || elementos["puppet"]["pivotOmbroD"].rotation.x > 1.3)
			velocidadeOmbroDireitoC*=-1;

		elementos["puppet"]["pivotOmbroD"].rotation.x += velocidadeOmbroDireitoC;
	}
	if (key_r){
		if (elementos["puppet"]["pivotOmbroD"].rotation.z < 0 || elementos["puppet"]["pivotOmbroD"].rotation.z > 1.4)
			velocidadeOmbroDireitoL*=-1;

		elementos["puppet"]["pivotOmbroD"].rotation.z += velocidadeOmbroDireitoL;
	}
	if (key_r){
		if (elementos["puppet"]["pivotCotoveloD"].rotation.x > 0 || elementos["puppet"]["pivotCotoveloD"].rotation.x < -2.25)
			velocidadeCotoveloDireitoC*=-1;

		elementos["puppet"]["pivotCotoveloD"].rotation.x += velocidadeCotoveloDireitoC;
	}

	//braço esquerdo
	if (key_space){ 
		if (elementos["puppet"]["pivotOmbroE"].rotation.x < -2.83 || elementos["puppet"]["pivotOmbroE"].rotation.x > 1.3)
			velocidadeOmbroEsquerdoC*=-1;

		elementos["puppet"]["pivotOmbroE"].rotation.x += velocidadeOmbroEsquerdoC;
	}
	if (key_r){
		if (elementos["puppet"]["pivotOmbroE"].rotation.z > 0 || elementos["puppet"]["pivotOmbroE"].rotation.z < -1.4)
			velocidadeOmbroEsquerdoL*=-1;

		elementos["puppet"]["pivotOmbroE"].rotation.z += velocidadeOmbroEsquerdoL;
	}
	if (key_r){
		if (elementos["puppet"]["pivotCotoveloE"].rotation.x > 0 || elementos["puppet"]["pivotCotoveloE"].rotation.x < -2.25)
			velocidadeCotoveloEsquerdoC*=-1;

		elementos["puppet"]["pivotCotoveloE"].rotation.x += velocidadeCotoveloEsquerdoC;
	}

	//perna esquerda
	if (key_space){ 
		if (elementos["puppet"]["pivotBaciaE"].rotation.x < -1.8 || elementos["puppet"]["pivotBaciaE"].rotation.x > 0)
			velocidadeBaciaEsquerdaC*=-1;

		elementos["puppet"]["pivotBaciaE"].rotation.x += velocidadeBaciaEsquerdaC;
	}

	if (key_r){ 
		if (elementos["puppet"]["pivotJoelhoE"].rotation.x > 1.8 || elementos["puppet"]["pivotJoelhoE"].rotation.x < 0)
			velocidadeJoelhoEsquerdoC*=-1;

		elementos["puppet"]["pivotJoelhoE"].rotation.x += velocidadeJoelhoEsquerdoC;
		console.log("movimento perna:" + elementos["puppet"]["pivotJoelhoE"].rotation.x);
	}

	//perna direita
	if (key_space){ 
		if (elementos["puppet"]["pivotBaciaD"].rotation.x < -1.8 || elementos["puppet"]["pivotBaciaD"].rotation.x > 0)
			velocidadeBaciaDireitoC*=-1;

		elementos["puppet"]["pivotBaciaD"].rotation.x += velocidadeBaciaDireitoC;
	}

	if (key_r){ 
		if (elementos["puppet"]["pivotJoelhoD"].rotation.x > 1.8 || elementos["puppet"]["pivotJoelhoD"].rotation.x < 0)
			velocidadeJoelhoDireitoC*=-1;

		elementos["puppet"]["pivotJoelhoD"].rotation.x += velocidadeJoelhoDireitoC;
		console.log("movimento perna:" + elementos["puppet"]["pivotJoelhoE"].rotation.x);
	}

	renderer.render(scene, camera); //tira uma foto do estado e mostra na tela
}

function paraRadianos(angulo){
	return angulo * (Math.PI/180);
}

var criaModelosPersonagem = function (){
	let puppet=[];

	let red = 	new THREE.Color(1,0,0);
	let green = new THREE.Color(0,1,0);
	let blue = 	new THREE.Color(0,0,1);
	let cores = [red, green, blue];
	let materials = [
		new THREE.MeshBasicMaterial({color: blue}),
		new THREE.MeshBasicMaterial({color: blue}),
		new THREE.MeshBasicMaterial({color: blue}),
		new THREE.MeshBasicMaterial({color: blue}),
		new THREE.MeshBasicMaterial({color: green}),
		new THREE.MeshBasicMaterial({color: blue})
	];

	let tronco = new THREE.Mesh(new THREE.BoxGeometry(4, 7, 2), materials);
	puppet["tronco"] = tronco;

	let cabeca = new THREE.Mesh(new THREE.SphereGeometry(2, 32, 32), new THREE.MeshBasicMaterial({color: blue}));
	puppet["cabeca"] = cabeca;
	tronco.add(cabeca);
	cabeca.position.y=tronco.position.y+6;

	//bracoDireito
	let ombroD = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 32), new THREE.MeshBasicMaterial({color: 0xffffff}));
	puppet["ombroD"] = ombroD;
	tronco.add(ombroD);
	ombroD.position.y= tronco.position.y+3;
	ombroD.position.x= tronco.position.y+3;
	
	let pivotOmbroD = new THREE.Group();
	puppet["pivotOmbroD"] = pivotOmbroD;
	ombroD.add(pivotOmbroD);
	
	let bracoD = new THREE.Mesh(new THREE.BoxGeometry(1, 3, 1), new THREE.MeshBasicMaterial({color: red}));
	puppet["bracoD"] = bracoD;
	pivotOmbroD.add(bracoD)
	bracoD.position.y-=2;

	let cotoveloD = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 32), new THREE.MeshBasicMaterial({color: 0xffffff}));
	puppet["cotoveloD"] = cotoveloD;
	bracoD.add(cotoveloD);
	cotoveloD.position.y-= 2;
	
	let pivotCotoveloD = new THREE.Group();
	puppet["pivotCotoveloD"] = pivotCotoveloD;
	cotoveloD.add(pivotCotoveloD);

	let bracoD2 = new THREE.Mesh(new THREE.BoxGeometry(1, 3, 1), new THREE.MeshBasicMaterial({color: red}));
	puppet["bracoD2"] = bracoD2;
	pivotCotoveloD.add(bracoD2)
	bracoD2.position.y-=2;


	elementos["puppet"] = puppet;
	scene.add(tronco);

	//bracoEsquerdo
	let ombroE = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 32), new THREE.MeshBasicMaterial({color: 0xffffff}));
	puppet["ombroE"] = ombroE;
	tronco.add(ombroE);
	ombroE.position.y= tronco.position.y+3;
	ombroE.position.x= tronco.position.y-3;
	
	let pivotOmbroE = new THREE.Group();
	puppet["pivotOmbroE"] = pivotOmbroE;
	ombroE.add(pivotOmbroE);
	
	let bracoE = new THREE.Mesh(new THREE.BoxGeometry(1, 3, 1), new THREE.MeshBasicMaterial({color: red}));
	puppet["bracoE"] = bracoE;
	pivotOmbroE.add(bracoE)
	bracoE.position.y-=2;

	let cotoveloE = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 32), new THREE.MeshBasicMaterial({color: 0xffffff}));
	puppet["cotoveloE"] = cotoveloE;
	bracoE.add(cotoveloE);
	cotoveloE.position.y-= 2;
	
	let pivotCotoveloE = new THREE.Group();
	puppet["pivotCotoveloE"] = pivotCotoveloE;
	cotoveloE.add(pivotCotoveloE);

	let bracoE2 = new THREE.Mesh(new THREE.BoxGeometry(1, 3, 1), new THREE.MeshBasicMaterial({color: red}));
	puppet["bracoE2"] = bracoE2;
	pivotCotoveloE.add(bracoE2)
	bracoE2.position.y-=2;


	elementos["puppet"] = puppet;
	scene.add(tronco);

	//pernaDireita
	let baciaE = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 32), new THREE.MeshBasicMaterial({color: 0xffffff}));
	puppet["baciaE"] = baciaE;
	tronco.add(baciaE);
	baciaE.position.y= tronco.position.y-4;
	baciaE.position.x= tronco.position.y-1.2;
	
	let pivotBaciaE = new THREE.Group();
	puppet["pivotBaciaE"] = pivotBaciaE;
	baciaE.add(pivotBaciaE);
	
	let pernaE = new THREE.Mesh(new THREE.BoxGeometry(1, 3, 1), new THREE.MeshBasicMaterial({color: red}));
	puppet["pernaE"] = pernaE;
	pivotBaciaE.add(pernaE)
	pernaE.position.y-=2;

	let joelhoE = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 32), new THREE.MeshBasicMaterial({color: 0xffffff}));
	puppet["joelhoE"] = joelhoE;
	pernaE.add(joelhoE);
	joelhoE.position.y-= 2;
	
	let pivotJoelhoE = new THREE.Group();
	puppet["pivotJoelhoE"] = pivotJoelhoE;
	joelhoE.add(pivotJoelhoE);

	let pernaE2 = new THREE.Mesh(new THREE.BoxGeometry(1, 3, 1), new THREE.MeshBasicMaterial({color: red}));
	puppet["pernaE2"] = pernaE2;
	pivotJoelhoE.add(pernaE2)
	pernaE2.position.y-=2;


	elementos["puppet"] = puppet;
	scene.add(tronco);

	//pernaEsquerda
	let baciaD = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 32), new THREE.MeshBasicMaterial({color: 0xffffff}));
	puppet["baciaD"] = baciaD;
	tronco.add(baciaD);
	baciaD.position.y= tronco.position.y-4;
	baciaD.position.x= tronco.position.y+1.2;
	
	let pivotBaciaD = new THREE.Group();
	puppet["pivotBaciaD"] = pivotBaciaD;
	baciaD.add(pivotBaciaD);
	
	let pernaD = new THREE.Mesh(new THREE.BoxGeometry(1, 3, 1), new THREE.MeshBasicMaterial({color: red}));
	puppet["pernaD"] = pernaD;
	pivotBaciaD.add(pernaD)
	pernaD.position.y-=2;

	let joelhoD = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 32), new THREE.MeshBasicMaterial({color: 0xffffff}));
	puppet["joelhoD"] = joelhoD;
	pernaD.add(joelhoD);
	joelhoD.position.y-= 2;
	
	let pivotJoelhoD = new THREE.Group();
	puppet["pivotJoelhoD"] = pivotJoelhoD;
	joelhoD.add(pivotJoelhoD);

	let pernaD2 = new THREE.Mesh(new THREE.BoxGeometry(1, 3, 1), new THREE.MeshBasicMaterial({color: red}));
	puppet["pernaD2"] = pernaD2;
	pivotJoelhoD.add(pernaD2)
	pernaD2.position.y-=2;


	elementos["puppet"] = puppet;
	scene.add(tronco);
};

window.onload = this.init