var Particles = function(){
    if (typeof Particles.instance === 'object') {
        return Particles.instance;
    }

    
    var nbParticles = 150;


    var geometry = new THREE.CylinderGeometry( 1, 0, 30, 5 );
    var material = new THREE.MeshBasicMaterial();

    var obj = [];
    for ( var i = 0; i < nbParticles; i ++ ) {

        var mesh = new THREE.Mesh( geometry, material );
        mesh.position.x = Math.random() * 400 - 200;
        mesh.position.y = Math.random() * 2400 - 2000;
        mesh.position.z = Math.random() * 400 - 200;
        mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 4 + 2;
        scene.add( mesh );
        obj.push(mesh);
    }

    var particles = {
        obj: obj
    };

    particles.animate = function(){
        var l = obj.length;
        for ( var i = 0; i < l; i ++ ) {
            if(obj[i].position.y < 100){
                obj[i].position.y += k.particleSpeed;    
            } else {
                obj[i].position.y = -1000;    
                obj[i].position.x = Math.random() * 400 - 200;
                obj[i].position.z = Math.random() * 400 - 200;
            }
            

        }
    }

    Particles.instance = particles;

    return particles;
};