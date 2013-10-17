var Stars = function(){
    if (typeof Stars.instance === 'object') {
        return Stars.instance;
    }

    var geometry = new THREE.Geometry();

    var stars = {};

    stars.add = function(){
    	for ( i = 0; i < 10000; i ++ ) {
        
	        var vertex = new THREE.Vector3();
	        vertex.x = Math.random() * 2000 - 1000;
	        vertex.y = Math.random() * 2000 - 1000;
	        vertex.z = Math.random() * 2000 - 1000;
	        
	        geometry.vertices.push( vertex );
	    }
	    
	    
	    var material = new THREE.ParticleBasicMaterial({
	    	size: 5
	    });
	    
	    this.obj = new THREE.ParticleSystem(geometry, material);
	    
	    scene.add(this.obj);
    }

    stars.animate = function(){
    	this.obj.rotation.y -= 0.00005;
        this.obj.rotation.x -= 0.00005;
    }
    

    Stars.instance = stars;

    return stars;
};