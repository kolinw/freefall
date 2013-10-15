var Sound = function(){
    if (typeof Sound.instance === 'object') {
        return Sound.instance;
    }

    var sources = [{
    	name: 'fall',
    	src: '/sounds/untitled2.wav'
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
    	var a = loaded.fall;
    	a.play();
    	a.addEventListener('ended', function() {
    		console.log('end sound');
    	},false);
    }

	

    Sound.instance = sound;

    return sound;
};