var Explosion = function(){
    if (typeof Explosion.instance === 'object') {
        return Explosion.instance;
    }
    

    var explosion = {};

    explosion.rays = [];
    explosion.nbRays = 1000;

    explosion.add = function(){
    	this.group = new THREE.Object3D();

    	for (var i = 0; i < this.nbRays; i++) {
	            
	        var geometry = new THREE.Geometry();
	        
	        var vertex = new THREE.Vector3( Math.random() * 2 - 1, Math.random(), Math.random() * 2 - 1 );
	        vertex.normalize();

	        vertex.multiplyScalar( 40 );
	        
	        geometry.vertices.push( vertex );
	        
	        var vertex2 = vertex.clone();
	        vertex2.multiplyScalar( Math.random() * 0.3 + 1 );
	        
	        geometry.vertices.push( vertex2 );

	        line = new THREE.Line( geometry, new THREE.LineBasicMaterial( { color: 0xffffff, opacity: Math.random() } ) );
	        this.rays.push(line);
	        
	        this.group.add( line );
	    }

	    //position on the floor
        this.group.translateY(-2000);
        scene.add(this.group);

        var mask = new THREE.Mesh(new THREE.CircleGeometry(70, 100, 10, 10), new THREE.MeshBasicMaterial({
        	color: 0xffffff,
        	fog: true
        }));
        mask.position = new THREE.Vector3(0,-1900,0);
        mask.rotation.x = -Math.PI*.5
        scene.add(mask);

        this.plane = new THREE.Mesh(new THREE.CircleGeometry(70, 100, 10, 10), new THREE.MeshBasicMaterial({
        	color: 0xffffff,
        	fog: false
        }));
        this.plane.position = new THREE.Vector3(0,-1950,0);
        this.plane.rotation.x = -Math.PI*.5
        scene.add(this.plane);
    };

    

    explosion.explode = function(){
    	var speed = 0.3;

    	var c = new Camera();
        c.shake(10, 100);
    	/*for (var i = 0; i < this.nbRays; i++) {
            this.rays[i].scale.x = this.rays[i].scale.y = this.rays[i].scale.z += speed;
        }*/
        var t1 = new TweenMax(this.group.scale, speed, {
        	x: 15,
        	y: 15,
        	z: 15,
        	ease: Expo.easeOut
        });
        t1.eventCallback("onComplete", function(){
        	scene.remove(explosion.group);
        });

        //this.group.scale.x = this.group.scale.y = this.group.scale.z += speed;
        this.plane.position.y += 500;
        new TweenMax(this.plane.scale, speed+0.1, {
        	x: 20,
        	y: 20,
        	z: 20,
        	ease: Quad.easeOut,
        	delay: speed-0.1
        });

        //this.group.rotation.y += 0.006;

    };

    Explosion.instance = explosion;

    return explosion;
};