var Sound = function(){
    if (typeof Sound.instance === 'object') {
        return Sound.instance;
    }

    var sources = [{
    	name: 'fall',
    	src: '/sounds/untitled2.wav'
    },{
        name: 'coyote',
        src: '/sounds/coyote.wav'
    }];

    var loaded = {};

    for(var i = 0; i < sources.length; i++){
    	var audio = document.createElement('audio');
		var source = document.createElement('source');
		source.src = sources[i].src;
		audio.appendChild(source);

    	loaded[sources[i].name] = audio;
    }

    var sound = {};

    sound.fall = function(){
    	var a = loaded.coyote;

        setTimeout(function(){
            a.play();    
        }, 2000);

        if(!k.sound) a.muted = true;


    	a.addEventListener('ended', function() {
            console.log('THIS IS THE END');
    		sound.explosion();

            var particles = new Particles();
            particles.end();

            var asteroids = new Asteroids()
            asteroids.end();

            var lines = new Lines();
            lines.end();

    	},false);

        return a;
    }

    sound.explosion = function(){
        var a = loaded.coyote;

        a.play();

        if(!k.sound) a.muted = true;

        a.addEventListener('ended', function() {
            console.log('BOOM');
            
            var e = new Explosion();
            e.explode();

        },false);

        return a;
    }

    Sound.instance = sound;

    return sound;
};