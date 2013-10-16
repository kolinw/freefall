var Constantes = function () {
    if (typeof Constantes.instance === 'object') {
        return Constantes.instance;
    }

    this.debug = true;
    
    this.cameraX = 0;
    this.cameraY = 300;
    this.cameraZ = 500;

    this.animParticles = false;
    this.animAsteroids = false;
    this.animIntro = false;
    this.sound = true;

    this.shake = false;
    this.explode = false;

    this.particleSpeed = 20;
    this.particleOpacity = 0;
    
    Constantes.instance = this;
};

var k = new Constantes();
var first = true;

var launchExperiment = function(){
    if(first){
        // mouvement de caméra
        var cam = new Camera();
        cam.start();
        var part = new Particles();
        var sounds = new Sound();
        var lines = new Lines();
        var asteroids = new Asteroids();

        // Lecture son
        sounds.fall();

        // animation des particules
        var delayParticles = 1000;
        setTimeout(function(){
            k.animParticles = true;
            k.animAsteroids = true;
        }, delayParticles);

            

        setTimeout(function(){
            part.speedUp();
        },2000);

        setTimeout(function(){
            lines.animate();
            cam.fall();
        }, 3000);

        setTimeout(function(){
            // random shake camera
            setInterval(function(){
                if(Math.random() > 0.5){
                    
                    asteroids.add();                    
                    setTimeout(function(){
                        sounds.comet();
                    },500)
                    setTimeout(function(){
                        cam.shake();
                    }, 1000);
                }
            }, 2000);
        }, 4000);
            

        first = false;

    }
}

window.onload = function(){

    var link = document.getElementById("go");
    link.addEventListener("click",function(e){
        e.preventDefault();
        launchExperiment();
        e.currentTarget.className += "exit";
    },false);


    var gui = new dat.GUI(); 
    
    var control_intro = gui.add(k, 'animIntro').name('Launch Intro').listen();
    control_intro.onChange(function(value){
        launchExperiment();
    });

    var control_sound = gui.add(k, 'sound').name('sound');

    var control_particles = gui.add(k, 'animParticles').name('anim particles').listen();
    var control_asteroids = gui.add(k, 'animAsteroids').name('anim asteroids').listen();
    var controle_speed = gui.add(k, 'particleSpeed', 0, 70).name('particles speed').step(1).listen();

    var control_shake = gui.add(k, 'shake').listen();
    control_shake.onChange(function(value) {
        var cam = new Camera();
        cam.shake();
    });

    var control_explode = gui.add(k, 'explode').listen();
    control_explode.onChange(function(value){
        var e = new Explosion();
        e.explode();
    });

    var control_cameraZ = gui.add(k, 'cameraZ', -500, 1000).step(1).name('camera z');
    control_cameraZ.onChange(function(value) {
        var cam = new Camera();
        cam.position.z = value;
    });
    var control_cameraY = gui.add(k, 'cameraY', -500, 500).step(1).name('camera y').listen();
    control_cameraY.onChange(function(value) {
        var cam = new Camera();
        cam.position.y = value;
    });
    var control_cameraX = gui.add(k, 'cameraX', -500, 500).step(1).name('camera x');
    control_cameraX.onChange(function(value) {
        var cam = new Camera();
        cam.position.x = value;
    });
};

var Freefall = (function(){

	if( !init() )   animate();

	function init(){

		window.sounds = new Sound();

		renderer = new THREE.WebGLRenderer({
            antialias       : true, // to get smoother output
            preserveDrawingBuffer   : true,  // to allow screenshot
            clearAlpha: 0
        });
		renderer.setSize(window.innerWidth, window.innerHeight);
		document.body.appendChild(renderer.domElement);

		// add Stats.js - https://github.com/mrdoob/stats.js
        stats = new Stats();
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.bottom   = '0px';
        document.body.appendChild( stats.domElement );

        // create a scene
        scene = new THREE.Scene();
        scene.fog = new THREE.Fog( 0x6DD5F7, 600, 1600 );

        this.scene = scene;

        // put a camera in the scene
        var camera = new Camera();
        scene.add(camera);

        // LIGHT
        var light   = new THREE.AmbientLight( 0x0000FF );
        scene.add( light );

        // ADD PARTICLES TO THE SCENE
		var particles = new Particles();

        // LINES
        var lines = new Lines();

        
		// ADD PLAN TO THE SCENE
        var plane = new THREE.Mesh(new THREE.CircleGeometry(7000, 100, 10, 10), new THREE.MeshBasicMaterial({color: 0x6DD5F7}));
        plane.position = new THREE.Vector3(0,-5000,0);
        plane.rotation.x = -Math.PI*.5
        scene.add(plane);

        // EXPLOSION
        var explosion = new Explosion();
        explosion.add();


        // ASTEROiDS
        var asteroids = new Asteroids();

		/*composer = new THREE.EffectComposer( renderer );
		renderer.autoClear = false;

		var renderModel = new THREE.RenderPass( scene, camera );
		composer.addPass( renderModel );*/

	};

	// animation loop
    function animate() {

        // loop on request animation loop
        // - it has to be at the begining of the function
        // - see details at http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
        requestAnimationFrame( animate );

        // do the render
        render();

        // update stats
        stats.update();
    }

	// render the scene
    function render() {
        // variable which is increase by Math.PI every seconds - usefull for animation
        var PIseconds   = Date.now() * Math.PI;

        // animation of particles
        if(k.animParticles){
            var particles = new Particles();
            particles.animate();
        }

        if(k.animAsteroids){
            var asteroids = new Asteroids();
            asteroids.animate();
        }

        // actually render the scene
        /*renderer.clear();
        composer.render();*/

        var cam = new Camera();
        renderer.render(scene, cam);

    }

	render();
})();

