var Sound = function(){
    if (typeof Sound.instance === 'object') {
        return Sound.instance;
    }

    var sources = [{
    	name: 'fall',
    	src: '/sounds/untitled2.wav'
    },{
        name: 'coyote',
        src: '/sounds/coyote.wav',
        end: function(){
            setTimeout(function(){
                sound.explosion();
                var particles = new Particles();
                particles.end();
                var asteroids = new Asteroids()
                asteroids.end();
                var lines = new Lines();
                lines.end();
                var e = new Explosion();
                e.explode();
                var bd = new Bd();
                bd.pop(window.innerWidth/2, window.innerHeight/2, 3, 300);
            }, 3000);
        }
    },{
        name: 'comet',
        src: '/sounds/comet.mp3',
        volume: 0.3
    },{
        name: 'bam',
        src: 'sounds/bam.wav',
        end: function(){
            console.log('BOOM');

        }
    }];

    // var loaded = {};

    // for(var i = 0; i < sources.length; i++){

    //     var sound = new Howl({
    //         urls: [sources[i].src],
    //         volume: sources[i].volume || 1,
    //         onend: sources[i].end || null,
    //         loop: false
    //     })

    //     loaded[sources[i].name] = sound;
    // }

    var sound = {};

    sound.fall = function(){
        var i = 1;
        var sound = new Howl({
            urls: [sources[i].src],
            volume: sources[i].volume || 1,
            onend: sources[i].end || null,
            loop: false
        });

        setTimeout(function(){
            if(k.sound) sound.play();
        }, 2000);
    }

    sound.explosion = function(){
        var i = 3;
        var sound = new Howl({
            urls: [sources[i].src],
            volume: sources[i].volume || 1,
            onend: sources[i].end || null,
            loop: false
        });

        if(k.sound) sound.play();
    }

    sound.comet = function(){
        var i = 2;
        var sound = new Howl({
            urls: [sources[i].src],
            volume: sources[i].volume || 1,
            onend: sources[i].end || null,
            loop: false
        });

        if(k.sound) sound.play();
    }

    Sound.instance = sound;

    return sound;
};