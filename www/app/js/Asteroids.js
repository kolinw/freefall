var Asteroids = function(){
    if (typeof Asteroids.instance === 'object') {
        return Asteroids.instance;
    }

    
    var asteroids_array = [];

    var asteroids = {};

    asteroids.add = function(){
        var geometry = new THREE.SphereGeometry(50, 8, 6);
        var nbVertices = geometry.vertices.length;
        for(var i = 0; i < nbVertices; i++){
            geometry.vertices[i].x += -20+Math.random()*40;
            geometry.vertices[i].y += -20+Math.random()*40;
            geometry.vertices[i].z += -20+Math.random()*40;
        }
        var material =  new THREE.MeshBasicMaterial({
            //wireframe: true,
            color: 0xffffff,
            transparent: true,
            opacity: 0.5
        });
        var sphere = new THREE.Mesh(geometry, material);
        sphere.position.y = - 4000;
        sphere.position.x = Math.random()*200-100;
        sphere.position.z = Math.random()*200-100;
        console.log(sphere.position.y);

        sphere.scale.x = sphere.scale.y = sphere.scale.z = 0.5;

        scene.add(sphere);
        asteroids_array.push(sphere);
    }

    asteroids.animate = function(){
        var l = asteroids_array.length;
        for ( var i = 0; i < l; i ++ ) {
            if(asteroids_array[i] != undefined && asteroids_array[i].position.y < 100){
                asteroids_array[i].position.y += k.particleSpeed+10;
            } else {
                scene.remove(asteroids_array[i]);
                asteroids_array.splice(i,1);
            }
        }
    }

    asteroids.obj = asteroids_array;


    Asteroids.instance = asteroids;

    return asteroids;
};