//initialise simplex noise instance
var noise = new SimplexNoise();

// the main visualiser function
var visualizer = function () {
    var file = window.document.getElementById("thefile");
    var audio = window.document.getElementById("audio");
    var fileLabel = window.document.querySelector("label.file");
    var searchLabel = window.document.querySelector("label.search");
    // var primaryColor = document.getElementById("primarycolor").value;

    document.onload = function (e) {
        // console.log(e);
        audio.play();
        play();
    }
    file.onchange = function () {
        fileLabel.classList.add('normal');
        // searchLabel.classList.add('normal');
        audio.classList.add('active');
        var files = this.files;

        audio.src = URL.createObjectURL(files[0]);
        audio.load();
        audio.play();
        play();
    }

    function play() {
        var context = new AudioContext();
        var src = context.createMediaElementSource(audio);
        var analyzer = context.createAnalyser();
        src.connect(analyzer);
        analyzer.connect(context.destination);
        analyzer.fftSize = 512;
        var bufferLength = analyzer.frequencyBinCount;
        var dataArray = new Uint8Array(bufferLength);

        //Webgl
        var scene = new THREE.Scene();
        var group = new THREE.Group();
        var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 5000);
        camera.position.set(0, 0, 150);
        camera.lookAt(scene.position);
        scene.add(camera);

        var renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true
        });

        renderer.setSize(window.innerWidth, window.innerHeight);

        var planeGeometry = new THREE.PlaneGeometry(2500, 2500, 15, 15);
        var planeMaterial = new THREE.MeshLambertMaterial({
            color: 0x8736D8,
            side: THREE.BackSide,
            wireframe: true
        });

        var icosahedronGeometry = new THREE.IcosahedronGeometry(11, 4);
        var icosahedronGeometry2 = new THREE.IcosahedronGeometry(20, 4);
        var icosahedronGeometry3 = new THREE.IcosahedronGeometry(40, 4);
        var icosahedronGeometry4 = new THREE.IcosahedronGeometry(60, 4);
        var icosahedronGeometry5 = new THREE.IcosahedronGeometry(70, 4);
        var icosahedronGeometry6 = new THREE.IcosahedronGeometry(75, 4);


        var innerNormalMaterial = new THREE.MeshNormalMaterial({
            transparent: true,
            // color: 0x31ACCE,
            transparent: true,
            opacity: 0.1,
        })

        var lambertMaterial = new THREE.MeshLambertMaterial({
            transparent: true,
            color: 0xd5f5ff,
            wireframe: true,
            opacity: 0.09,
        });

        var innermostMaterial = new THREE.MeshLambertMaterial({
            transparent: true,
            color: 0x70d4ff,
            wireframe: true,
            opacity: 0.07,
        });

        var ball = new THREE.Mesh(icosahedronGeometry, innermostMaterial);
        ball.position.set(0, 0, 0);
        group.add(ball);


        var ball2 = new THREE.Mesh(icosahedronGeometry2, innerNormalMaterial);
        ball2.position.set(0, 0, 0);
        group.add(ball2);

        var ball3 = new THREE.Mesh(icosahedronGeometry3, innerNormalMaterial);
        ball3.position.set(0, 0, 0);
        group.add(ball3);

        var ball4 = new THREE.Mesh(icosahedronGeometry4, innerNormalMaterial);
        ball4.position.set(0, 0, 0);
        group.add(ball4);

        var ball5 = new THREE.Mesh(icosahedronGeometry5, innerNormalMaterial);
        ball5.position.set(0, 0, 0);
        group.add(ball5);

        var ball6 = new THREE.Mesh(icosahedronGeometry5, innermostMaterial);
        ball6.position.set(0, 0, 0);
        group.add(ball6);

        var loader = new THREE.TextureLoader();

        var earth = new THREE.Mesh(
            new THREE.SphereGeometry(9, 32, 32),
            new THREE.MeshPhongMaterial({
                map: loader.load('assets/2k_earth_daymap.jpg'),
                bumpMap: loader.load('assets/elev_bump_4k.jpg'),
                bumpScale: 0.010,
                specularMap: loader.load('assets/water_4k.png'),
                specular: new THREE.Color('grey')
            })
        );

        earth.position.set(0, 0, 0);
        group.add(earth);

        var space = new THREE.Mesh(
            new THREE.SphereGeometry(500, 64, 64),
            new THREE.MeshBasicMaterial({
                map: loader.load('assets/2k_stars_milky_way.jpg'),
                side: THREE.BackSide
            })
        );
        
        space.position.set(0, 0, 0);
        group.add(space);

        var ambientLight = new THREE.AmbientLight(0xffffff);
        ambientLight.intensity = 0.08;
        ambientLight.castShadow = false;
        scene.add(ambientLight);


        var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.intensity = 0.6;
        directionalLight.position.set(-100, 100, 100);
        directionalLight.castShadow = false;
        directionalLight.lookAt(earth);
        scene.add(directionalLight);

        var orbitControls = new THREE.OrbitControls(camera);
        orbitControls.autoRotate = true;
        orbitControls.minDistance = 25;
        orbitControls.maxDistance = 200;

        scene.add(group);

        document.getElementById('out').appendChild(renderer.domElement);

        window.addEventListener('resize', onWindowResize, false);

        render();

        function render() {
            analyzer.getByteFrequencyData(dataArray);

            var lowerFreqs = dataArray.slice(0, (dataArray.length / 2) - 1);
            var upperFreqs = dataArray.slice((dataArray.length / 2) - 1, dataArray.length - 1);

            var overallAvg = avg(dataArray);
            var lowerMax = max(lowerFreqs);
            var lowerAvg = avg(lowerFreqs);
            var upperMax = max(upperFreqs);
            var upperAvg = avg(upperFreqs);

            var lowerMaxFreq = lowerMax / lowerFreqs.length;
            var upperAvgFreq = upperAvg / upperFreqs.length;
            // var lowerAvgFr = lowerAvg / lowerHalfArray.length;
            // var upperMaxFr = upperMax / upperHalfArray.length;


            makeRough(ball, modulate(Math.pow(lowerMaxFreq, 0.8), 0, 1, 0, 1), modulate(upperAvgFreq, 0, 1, 0, 1.5));
            makeRough(ball2, modulate(Math.pow(lowerMaxFreq, 0.8), 0, 1, 0, 1.4), modulate(upperAvgFreq, 0, 1, 0, 2));
            makeRough(ball3, modulate(Math.pow(lowerMaxFreq, 0.8), 0, 1, 0, 1.8), modulate(upperAvgFreq, 0, 1, 0, 2.5));
            makeRough(ball4, modulate(Math.pow(lowerMaxFreq, 0.8), 0, 1, 0, 2.2), modulate(upperAvgFreq, 0, 1, 0, 3));
            makeRough(ball5, modulate(Math.pow(lowerMaxFreq, 0.8), 0, 1, 0, 2.6), modulate(upperAvgFreq, 0, 1, 0, 3.5));
            makeRough(ball6, modulate(Math.pow(lowerMaxFreq, 0.8), 0, 1, 0, 3.0), modulate(upperAvgFreq, 0, 1, 0, 4));
            makeRough(earth, modulate(Math.pow(lowerMaxFreq, 0.8), 0, 1, 0.1, 0.2), modulate(upperAvgFreq, 0, 1, 0, 0.2));

            group.rotation.y += 0.002;


            renderer.render(scene, camera);
            requestAnimationFrame(render);
        }

        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }

        function makeRough(mesh, bassFr, treFr) {
            mesh.geometry.vertices.forEach(function (vtx, i) {
                var radius = mesh.geometry.parameters.radius;
                var amplitude = 6;
                var time = window.performance.now();
                vtx.normalize();
                var rf = 0.00001;
                var distance = (radius + bassFr) + noise.noise3D(vtx.x + time * rf * 7,
                    vtx.y + time * rf * 8,
                    vtx.z + time * rf * 9) * amplitude * treFr;
                vtx.multiplyScalar(distance);
            });
            mesh.geometry.normalsNeedUpdate = true;
            mesh.geometry.verticesNeedUpdate = true;
            mesh.geometry.computeVertexNormals();
            mesh.geometry.computeFaceNormals();
        }

        audio.play();

    };
}

window.onload = function () {
    window.onload = visualizer();
}

document.body.addEventListener('touchend', function (ev) { context.resume(); });


// Helper Functions

function fraction(val, minVal, maxVal) {
    return (val - minVal) / (maxVal - minVal);
}

function modulate(val, minVal, maxVal, outMin, outMax) {
    var frac = fraction(val, minVal, maxVal);
    var delta = outMax - outMin;
    return outMin + (frac * delta);
}

function avg(arr) {
    var total = arr.reduce(function (sum, b) { return sum + b; });
    return (total / arr.length);
}

function max(arr) {
    return arr.reduce(function (a, b) { return Math.max(a, b); })
}