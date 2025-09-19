/* =============================
   Login Exclusivo — Iasmim only
   ============================= */

// Segurança (client-side): PBKDF2 com salt e 200k iterações
const AUTH = {
  salt: 's@lt2025!',
  iters: 200000,
  // Verifier PBKDF2(Base64) para a senha "Eu sinto sua falta"
  verifierB64: '2BhFvIfKCe6BtdKrTPaNGnUY0aR3jTHFOz94TxJoTjI='
};

// Heurística simples p/ detectar DevTools (só aumenta fricção)
let devOpen = false;
setInterval(()=>{
  const t = 160;
  if (window.outerWidth - window.innerWidth > t || window.outerHeight - window.innerHeight > t) devOpen = true;
}, 1000);

// Partículas de fundo
(function particles(){
  const c = document.getElementById('fx-particles');
  if (!c) return;
  const ctx = c.getContext('2d');
  function resize(){ c.width = innerWidth; c.height = innerHeight; }
  addEventListener('resize', resize); resize();
  const dots = Array.from({length:80},()=>({x:Math.random()*c.width,y:Math.random()*c.height,vx:(Math.random()-.5)*.35,vy:(Math.random()-.5)*.35,r:Math.random()*2+0.8,a:Math.random()*0.7}));
  (function tick(){
    ctx.clearRect(0,0,c.width,c.height);
    dots.forEach(p=>{
      p.x+=p.vx; p.y+=p.vy;
      if(p.x<0)p.x=c.width; if(p.x>c.width)p.x=0;
      if(p.y<0)p.y=c.height; if(p.y>c.height)p.y=0;
      ctx.beginPath();
      ctx.fillStyle=`rgba(255,255,255,${0.08+p.a*0.4})`;
      ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fill();
    });
    requestAnimationFrame(tick);
  })();
})();

// Util PBKDF2 -> Base64 (Web Crypto)
async function pbkdf2Base64(text, salt, iterations){
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey('raw', enc.encode(text), {name:'PBKDF2'}, false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits({name:'PBKDF2', salt: enc.encode(salt), iterations, hash:'SHA-256'}, key, 256);
  const arr = new Uint8Array(bits);
  let bin = ''; for (let b of arr) bin += String.fromCharCode(b);
  return btoa(bin);
}

// Elementos
const form = document.getElementById('loginForm');
const nameI = document.getElementById('name');
const passI = document.getElementById('password');
const msg = document.getElementById('message');
const modal = document.getElementById('modal');
const modalText = document.getElementById('modalText');
const modalClose = document.getElementById('modalClose');

if (modal) modal.hidden = true; // garante escondido no load

// Modal helpers
function showModal(text){
  modalText.textContent = '';
  modalText.innerText = text;
  modal.removeAttribute('hidden');
  setTimeout(()=>modalClose.focus(), 0);
}
function hideModal(){ modal.setAttribute('hidden',''); }
modalClose.addEventListener('click', hideModal);
modal.addEventListener('click', (e)=>{ if(e.target===modal) hideModal(); });
document.addEventListener('keydown', (e)=>{ if(!modal.hasAttribute('hidden') && e.key==='Escape') hideModal(); });

// Bloqueio de curiosos
document.addEventListener('contextmenu', e=>e.preventDefault());
document.addEventListener('keydown', e=>{
  if(e.key==='F12' || (e.ctrlKey && e.shiftKey && ['I','C','J'].includes(e.key))) {
    e.preventDefault(); alert('Acesso não permitido.');
  }
});

// Fluxo principal de login
form.addEventListener('submit', async (e)=>{
  e.preventDefault();
  msg.textContent='';
  const name = (nameI.value||'').trim();
  const okName = name.toLowerCase() === 'iasmim';

  if (!okName) {
    showModal('se eu fosse você daria o fora antes que o criador vá atrás de você, esse site é somente para uma pessoa e essa pessoa não é você');
    return;
  }

  if (devOpen) { msg.textContent = 'Acesso bloqueado (DevTools detectado).'; return; }

  const derived = await pbkdf2Base64(passI.value||'', AUTH.salt, AUTH.iters);
  if (derived === AUTH.verifierB64) {
    try { sessionStorage.setItem('authOK','1'); } catch(_){}
    msg.style.color = '#c7ffd9';
    msg.textContent = 'Autenticado. Bem-vinda, Iasmim!';
    setTimeout(()=>location.href='home.html', 350);
  } else {
    msg.textContent = 'Senha incorreta.';
  }
});

// protege AUTH
Object.defineProperty(AUTH, 'verifierB64', {writable:false, configurable:false, enumerable:false});
