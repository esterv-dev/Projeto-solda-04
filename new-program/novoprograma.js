import { getDatabase } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const db = getDatabase();

let pontos = [];

let posicaoAtual = {
  x: 0,
  y: 0,
  z: 0
};

// ================= UI =================

function atualizarUI() {

  document.getElementById("valorX").innerText = posicaoAtual.x;
  document.getElementById("valorY").innerText = posicaoAtual.y;
  document.getElementById("valorZ").innerText = posicaoAtual.z;

  document.getElementById("posicaoAtual").innerText =
    `X:${posicaoAtual.x} | Y:${posicaoAtual.y} | Z:${posicaoAtual.z}`;

  moverMaquina3D();
}

// ================= CONTROLES =================

document.getElementById("maisX")
.addEventListener("click", () => {

  posicaoAtual.x++;
  atualizarUI();

});

document.getElementById("menosX")
.addEventListener("click", () => {

  posicaoAtual.x--;
  atualizarUI();

});

// ================= Y =================

document.getElementById("maisY")
.addEventListener("click", () => {

  posicaoAtual.y++;
  atualizarUI();

});

document.getElementById("menosY")
.addEventListener("click", () => {

  posicaoAtual.y--;
  atualizarUI();

});

// ================= Z =================

document.getElementById("maisZ")
.addEventListener("click", () => {

  posicaoAtual.z++;
  atualizarUI();

});

document.getElementById("menosZ")
.addEventListener("click", () => {

  posicaoAtual.z--;
  atualizarUI();

});

// ================= SALVAR PONTO =================

document.getElementById("btnSalvarPonto")
.addEventListener("click", () => {

  const ponto = {
    nome: `P${pontos.length + 1}`,
    ...posicaoAtual
  };

  pontos.push(ponto);

  trailPoints.push(
    new THREE.Vector3(
      posicaoAtual.x * 0.2,
      3.5 + posicaoAtual.z * 0.2,
      posicaoAtual.y * 0.2
    )
  );

  atualizarLista();

  desenharTrilha();
});

// ================= LISTA =================

function atualizarLista() {

  const lista =
  document.getElementById("listaPontos");

  lista.innerHTML = "";

  pontos.forEach((p) => {

    const li = document.createElement("li");

    li.innerText =
      `${p.nome} | X:${p.x} Y:${p.y} Z:${p.z}`;

    lista.appendChild(li);

  });

}

// ================= THREE JS =================

const container =
document.getElementById("scene3d");

const scene = new THREE.Scene();

scene.background =
new THREE.Color("#020617");

// ================= CAMERA =================

const camera =
new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.set(7, 5, 7);

camera.lookAt(0, 1.5, 0);

// ================= RENDERER =================

const renderer =
new THREE.WebGLRenderer({
  antialias: true
});

renderer.setPixelRatio(
  window.devicePixelRatio
);

renderer.setSize(
  window.innerWidth - 320,
  window.innerHeight
);

container.appendChild(
  renderer.domElement
);

// ================= LUZES =================

const light =
new THREE.DirectionalLight(
  0xffffff,
  1
);

light.position.set(5, 10, 5);

scene.add(light);

const ambient =
new THREE.AmbientLight(
  0xffffff,
  0.7
);

scene.add(ambient);

// ================= CHÃO =================

const floorGeo =
new THREE.PlaneGeometry(20, 20);

const floorMat =
new THREE.MeshStandardMaterial({
  color: "#111827"
});

const floor =
new THREE.Mesh(
  floorGeo,
  floorMat
);

floor.rotation.x = -Math.PI / 2;

floor.position.y = -0.3;

scene.add(floor);

// ================= BASE =================

const baseGeo =
new THREE.CylinderGeometry(
  2,
  2,
  0.5,
  32
);

const baseMat =
new THREE.MeshStandardMaterial({
  color: "#444"
});

const base =
new THREE.Mesh(
  baseGeo,
  baseMat
);

scene.add(base);

// ================= COLUNA =================

const colunaGeo =
new THREE.BoxGeometry(
  0.5,
  4,
  0.5
);

const colunaMat =
new THREE.MeshStandardMaterial({
  color: "#888"
});

const coluna =
new THREE.Mesh(
  colunaGeo,
  colunaMat
);

coluna.position.y = 2;

scene.add(coluna);

// ================= GUIA SUPERIOR =================

const guiaGeo =
new THREE.BoxGeometry(
  4,
  0.3,
  0.3
);

const guia =
new THREE.Mesh(
  guiaGeo,
  colunaMat
);

guia.position.y = 3.8;

scene.add(guia);

// ================= CABEÇOTE =================

const headGeo =
new THREE.BoxGeometry(
  0.8,
  0.8,
  0.8
);

const headMat =
new THREE.MeshStandardMaterial({
  color: "#ef4444",
  emissive: "#550000"
});

const head =
new THREE.Mesh(
  headGeo,
  headMat
);

head.position.y = 3.5;

scene.add(head);

// ================= BICO =================

const nozzleGeo =
new THREE.CylinderGeometry(
  0.1,
  0.1,
  1,
  16
);

const nozzleMat =
new THREE.MeshStandardMaterial({
  color: "#f97316"
});

const nozzle =
new THREE.Mesh(
  nozzleGeo,
  nozzleMat
);

nozzle.rotation.z = Math.PI / 2;

nozzle.position.x = 0.6;

head.add(nozzle);

// ================= TRILHA =================

let trailPoints = [];

let trailLine;

function desenharTrilha() {

  if (trailLine) {
    scene.remove(trailLine);
  }

  const geometry =
  new THREE.BufferGeometry()
  .setFromPoints(trailPoints);

  const material =
  new THREE.LineBasicMaterial({
    color: "#22d3ee"
  });

  trailLine =
  new THREE.Line(
    geometry,
    material
  );

  scene.add(trailLine);
}

// ================= MOVIMENTO =================

function moverMaquina3D() {

  // lateral
  head.position.x =
    posicaoAtual.x * 0.2;

  // altura
  head.position.y =
    3.5 + posicaoAtual.z * 0.2;

  // profundidade
  head.position.z =
    posicaoAtual.y * 0.2;

}

// ================= ANIMAÇÃO =================

function animate() {

  requestAnimationFrame(animate);

  renderer.render(scene, camera);

}

animate();

// ================= RESIZE =================

window.addEventListener(
  "resize",
  () => {

    camera.aspect =
      window.innerWidth /
      window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
      window.innerWidth - 320,
      window.innerHeight
    );

  }
);

// ================= INIT =================

atualizarUI();