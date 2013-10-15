var Particles = function(){
    if (typeof Particles.instance === 'object') {
        return Particles.instance;
    }

    

    var geometry = new THREE.CylinderGeometry( 0, 1, 10, 3 );
    //geometry.applyMatrix( new THREE.Matrix4().makeRotationFromEuler( new THREE.Vector3( Math.PI / 2, Math.PI, 0 ) ) );

    var material = new THREE.MeshNormalMaterial();

    var obj = [];
    for ( var i = 0; i < 100; i ++ ) {

        var mesh = new THREE.Mesh( geometry, material );
        mesh.position.x = Math.random() * 400 - 200;
        mesh.position.y = Math.random() * 400 - 200;
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
            obj[i].position.y += 1;
        }
    }

    Particles.instance = particles;

    return particles;
};