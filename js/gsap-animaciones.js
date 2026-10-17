gsap.registerPlugin(ScrollTrigger);

const entrada = gsap.timeline({
  defaults: { ease: 'power3.out', clearProps: 'transform,opacity' }
});

entrada
  .from('.nav', { y: -70, opacity: 0, duration: 0.8 })
  .from('.apple-intro', {
    scale: 0, rotation: -180, opacity: 0,
    duration: 1.2, ease: 'back.out(1.7)'
  }, '-=0.3')
  .from('.title', { y: 30, opacity: 0, duration: 0.7 }, '-=0.5')
  .from('.subtitle', { opacity: 0, duration: 0.6 }, '-=0.4')
  .from('.hero .btn', { opacity: 0, duration: 0.6 }, '-=0.4');

document.querySelectorAll('.stats strong').forEach((el) => {
  const final = parseFloat(el.dataset.valor);   
  const sufijo = el.dataset.sufijo || '';       
  const contador = { n: 0 };

  el.textContent = '0' + sufijo;               

  gsap.to(contador, {
    n: final,
    duration: 2,
    ease: 'power1.out',
    scrollTrigger: { trigger: el, start: 'top 85%', once: true }, 
    onUpdate: () => { el.textContent = Math.round(contador.n) + sufijo; }
  });
});
