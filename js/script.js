const bubbles = document.getElementById('bubbles');
const apple = document.getElementById('apple');
const appleWrap = document.getElementById('appleWrap');
const esMovil = window.innerWidth < 600;

// Número aleatorio entre a y b
const rand = (a, b) => a + Math.random() * (b - a);

// Req. 2 + 6: burbujas de fondo con tamaño, posición y velocidad aleatorios
function crearBurbuja() {
  const b = document.createElement('div');
  const size = rand(12, 60);
  b.className = 'bubble';
  b.style.width = b.style.height = `${size}px`;
  b.style.left = `${rand(0, 100)}%`;
  b.style.setProperty('--dx', `${rand(-50, 50)}px`);
  b.style.animationDuration = `${rand(8, 16)}s`;
  b.addEventListener('animationend', () => b.remove());
  bubbles.appendChild(b);
}
setInterval(crearBurbuja, esMovil ? 1100 : 600);

// Req. 3 + 6: la manzana se inclina hacia donde apunta el mouse/dedo
window.addEventListener('pointermove', (e) => {
  const nx = e.clientX / window.innerWidth - 0.5;   // -0.5 (izquierda) a 0.5 (derecha)
  const ny = e.clientY / window.innerHeight - 0.5;  // -0.5 (arriba) a 0.5 (abajo)
  const rx = ny * -40; // inclinación arriba/abajo
  const ry = nx * 40;  // inclinación izquierda/derecha
  apple.style.transform =
    `translate(${nx * 30}px, ${ny * 20}px) rotateX(${rx}deg) rotateY(${ry}deg)`;
});

// Req. 3: al hacer clic o tocar, salen burbujas desde ese punto
window.addEventListener('pointerdown', (e) => {
  for (let i = 0; i < 8; i++) {
    const b = document.createElement('div');
    const size = rand(10, 30);
    b.className = 'bubble pop';
    b.style.width = b.style.height = `${size}px`;
    b.style.left = `${e.clientX - size / 2}px`;
    b.style.top = `${e.clientY - size / 2}px`;
    b.style.setProperty('--dx', `${rand(-90, 90)}px`);
    b.style.setProperty('--dy', `${rand(-140, -40)}px`);
    b.addEventListener('animationend', () => b.remove());
    bubbles.appendChild(b);
  }
});

// Req. 4 + 6: al bajar, la manzana rota, se achica y se desvanece
window.addEventListener('scroll', () => {
  const s = window.scrollY;
  const escala = Math.max(0.5, 1 - s * 0.0007);
  appleWrap.style.transform =
    `translateY(${s * 0.4}px) rotate(${s * 0.15}deg) scale(${escala})`;
  appleWrap.style.opacity = Math.max(0, 1 - s / (window.innerHeight * 0.9));
});

// Req. 5: aparición al entrar en pantalla
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.2 });
document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

/* Req. 4 + 6: barra de progreso que crece según el scroll */
const barra = document.createElement('div');
barra.className = 'scroll-bar';
document.body.appendChild(barra);
window.addEventListener('scroll', () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  barra.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
}, {passive : true});

/* Hacer que la luz de la tarjeta siga al cursor */
const tarjetas = document.querySelectorAll('.card');
tarjetas.forEach((tarjeta) => {
  tarjeta.addEventListener('pointermove', (evento) => {
    const rect = tarjeta.getBoundingClientRect();

    const x = ((evento.clientX - rect.left) / rect.width) * 100;
    const y = ((evento.clientY - rect.top) / rect.height) * 100;

    tarjeta.style.setProperty('--luz-x', `${x}%`);
    tarjeta.style.setProperty('--luz-y', `${y}%`);
  });

  tarjeta.addEventListener('pointerleave', () => {
    tarjeta.style.setProperty('--luz-x', '50%');
    tarjeta.style.setProperty('--luz-y', '0%');
  });
});