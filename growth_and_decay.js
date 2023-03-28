const canvas = document.getElementById('simulationCanvas');
const renderer = new THREE.WebGLRenderer({ canvas: canvas });
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

scene.background = new THREE.Color(0x000000);
camera.position.z = 2;

renderer.setSize(window.innerWidth, window.innerHeight);

// マイクロオーガニズムを表現するドットを作成
const geometry = new THREE.CircleGeometry(0.01, 32);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, transparent: false });
const microbe = new THREE.Mesh(geometry, material);

// シーンにマイクロオーガニズムを追加
scene.add(microbe);

function animate() {
    requestAnimationFrame(animate);

    // 増殖と死滅のロジックを実装
    updateMicrobes();

    // レンダリング
    renderer.render(scene, camera);
}
animate();

// ウィンドウサイズ変更時のイベントリスナー
window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

let microbes = [microbe];

function updateMicrobes() {
    for (let i = 0; i < microbes.length; i++) {
        const microbe = microbes[i];

        // 増殖のロジック
        if (shouldReproduce(microbe)) {
            const newMicrobe = reproduce(microbe);
            scene.add(newMicrobe);
            microbes.push(newMicrobe);
        }

        // 死滅のロジック
        if (shouldDie(microbe)) {
            scene.remove(microbe);
            microbes.splice(i, 1);
            i--;
        }
    }
}

function shouldReproduce(microbe) {
    // 増殖条件を定義
    // 例: 一定の確率で増殖する
    const reproductionProbability = 0.01;
    return Math.random() < reproductionProbability;
}

function reproduce(microbe) {
    // 新しいマイクロオーガニズムを作成し、位置を親の近くに設定
    const newMicrobe = new THREE.Mesh(geometry, material);
    newMicrobe.position.copy(microbe.position);
    newMicrobe.position.x += (Math.random() - 0.5) * 0.02;
    newMicrobe.position.y += (Math.random() - 0.5) * 0.02;
    return newMicrobe;
}

function shouldDie(microbe) {
    // 死滅条件を定義
    // 例: 一定の確率で死滅する
    const deathProbability = 0.005;
    return Math.random() < deathProbability;
}
