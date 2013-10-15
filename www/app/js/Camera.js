var Camera = function(){
    if (typeof Camera.instance === 'object') {
        return Camera.instance;
    }

    var camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.set(k.cameraX, k.cameraY, k.cameraZ);
    var startPos = new THREE.Vector3(0,-100,-10);
    camera.lookAt( startPos );


    camera.start = function(){
        var camPos = {
            x: camera.position.x,
            y: camera.position.y,
            z: camera.position.z
        };

        var tweenCameraPosition = function(position){
            var pos;
            var pointAt = new THREE.Vector3(0,0,0);
            // Position the camera to fit
            var tween = new TWEEN.Tween(position).to({
                x: 0,
                y: 100,
                z: 10
            }).easing(TWEEN.Easing.Cubic.In).onUpdate(function () {
                pos = new THREE.Vector3(position.x,position.y,position.z);
                console.log('update', pos);
                camera.position = pos;
                camera.lookAt(startPos);
            }).start();
      
        };
        tweenCameraPosition(camPos);
    };

    

    Camera.instance = camera;

    return camera;
};