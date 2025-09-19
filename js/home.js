/* =============================
   Gate de sessão
   ============================= */
(function gate(){
  try{
    if(!(sessionStorage.getItem('authOK') || localStorage.getItem('authOK'))){
      location.href = 'index.html';
    }
  }catch(e){}
})();

/* =============================
   Dados
   ============================= */
const TIMELINE = [
  { date:'2018-01', title:'Onde tudo começou', text:'Em 2018, nossos caminhos se cruzaram — o início de tudo. Me lembro perfeitamente da nossa primeira conversa no facebook graças a ingridy tive a oprotunidade de te conhecer, no começo tudo nçao passava de trocas de olhares, sorrisos, acenos, apó isso um possivel encontro, onde quase sai na porrada com 2 dos seus parentes!', image:null },
  { date:'2019-01', title:'Primeiras conversas', text:'Por muito pouco um de seus namorado não virou camisa de saudades, ficamos muito mais intimos do que antes, vizitas eram comuns, noites sentados do lado de fora, jogando conversas ao vento, rindo, chorando, sempre tendo algo a dizer um ao outro.', image:null },
  { date:'2020-06', title:'Planos ganhando forma', text:'2 anos depois a gente acabou indo um pouco além do que seria uma amizade normal, eu vivia treinando proximo da sua casa com a esperança de sempre te ver de novo, você havia entrado em um relacionamento e eu não queria estragar nada, mas nunca quis ir embora, pois tinha medo de nunca mais te encontrar de novo.', image:null },
  { date:'2021-02', title:'Primeira foto juntos', text:'Nosso primeiro registro — Eu decidi que queria passar mais tempo com você, entrei na igreja para assim ficar mais proximo e assim fazer parte do que hoje eu tenho a honra de chamar de familia, tivemos a nossa primeira fotos juntos, depois de 3 anos, por incrivel que pareça, eu nunca gostei de sorrir em fotos, mas meu sorriso nunca se escondeu com você por perto.', image:'assets/202102.jpg' },
  { date:'2022-08', title:'Momento especial', text:'Um dia que guardo no coração. A nossa primeira viagem juntos, eu me lembro perfeitamente do meu coração pegando fogo por estar ao seu lado naquele ônibus não consigo tirar da mente as oportunidades que perdemos naquela praia', image:'assets/202208.jpg' },
  { date:'2022-11', title:'Mais memórias', text:'Rimos, viajamos e colecionamos histórias. Esse dia foi como o final de um capitulo de um livro pra mim, meus ultimos dias no senai, eu nunca mais ia te ver, pelo menos, não fora da empresa, aqui nossos caminhos começaram a se dividir e naquela mesma noite eu te acompanhei até em casa como se fosse a ultima vez que nos veriamos, e quase acabou sendo...', image:'assets/202211.jpg' },
  { date:'2023-05', title:'Crescendo juntos', text:'Cada passo ao seu lado vale a pena. Mais uma noite inesquecivel, meu lembro de sentarmos naquele banco no lago verde enquanto comiamos lanche, e você contava sobre tudo que aconteceu na minha ausência, sentimentos, arrependimento, consigo me lembrar de cada palavras, até mesmo das que eu não queria.', image:'assets/202305.jpg' }
];
const GALLERY = TIMELINE.filter(x=>!!x.image).map(x=>({image:x.image,title:x.title,text:x.text}));

/* =============================
   Surpresa: imagens independentes
   ============================= */
const SURPRISE = [
  { image: 'assets/s1.jpg', title: 'Nós',           text: 'Um instante que resume tudo.' },
  { image: 'assets/s2.jpg', title: 'Nosso riso',    text: 'Porque contigo até o silêncio sorri.' },
  { image: 'assets/s3.jpg', title: 'Nosso lugar',   text: 'Onde o tempo fica leve.' },
  { image: 'assets/s4.jpg', title: 'Para sempre',   text: 'Hoje e sempre, eu escolho você.' }
];

function renderGallery(){
  const el = document.getElementById('gallery');
  if (!el) return;

  el.innerHTML = '';
  SURPRISE.forEach(g=>{
    const wrap = document.createElement('div');
    wrap.className = 'flip';
    wrap.innerHTML = `
      <div class="flip__inner">
        <figure class="flip__face flip__front"><img src="${g.image}" alt="${g.title || ''}"></figure>
        <div class="flip__face flip__back">
          <div>
            <strong>${g.title || ''}</strong>
            <p style="margin-top:8px;font-size:13px">${g.text || ''}</p>
          </div>
        </div>
      </div>`;
    el.appendChild(wrap);
  });
}
/* =============================
   Partículas de fundo
   ============================= */
(function particles(){
  const c = document.getElementById('bgParticles'); 
  if (!c) return;
  const ctx = c.getContext('2d');
  function resize(){ c.width = innerWidth; c.height = innerHeight; }
  addEventListener('resize', resize); resize();
  const ps = Array.from({length:80},()=>({
    x:Math.random()*c.width,y:Math.random()*c.height,
    r:Math.random()*2+0.8,vx:(Math.random()-.5)*.35,vy:(Math.random()-.5)*.35,a:Math.random()*0.7
  }));
  (function tick(){
    ctx.clearRect(0,0,c.width,c.height);
    for(const p of ps){
      p.x+=p.vx; p.y+=p.vy;
      if(p.x<0)p.x=c.width; if(p.x>c.width)p.x=0;
      if(p.y<0)p.y=c.height; if(p.y>c.height)p.y=0;
      ctx.beginPath();
      ctx.fillStyle=`rgba(255,255,255,${0.08+p.a*0.4})`;
      ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fill();
    }
    requestAnimationFrame(tick);
  })();
})();

/* =============================
   Céu Estrelado + Constelações + Cadentes
   ============================= */
(function starfield(){
  const c = document.getElementById('sky');
  if (!c) return;
  const ctx = c.getContext('2d');

  function resize(){ c.width = innerWidth; c.height = innerHeight; }
  addEventListener('resize', resize); resize();

  const STARS = [];
  const COUNT = Math.round((innerWidth*innerHeight)/14000);
  for (let i=0;i<COUNT;i++){
    STARS.push({ x: Math.random()*c.width, y: Math.random()*c.height,
      r: Math.random()*1.3 + 0.3, tw: Math.random()*Math.PI*2, sp: 0.015 + Math.random()*0.02 });
  }

  const D = 90;
  function drawConstellations(){
    ctx.save();
    ctx.strokeStyle = 'rgba(255,255,255,0.12)'; ctx.lineWidth = 0.6;
    for (let i=0;i<STARS.length;i++){
      const a = STARS[i];
      for (let j=i+1;j<STARS.length;j++){
        const b = STARS[j];
        const dx = a.x-b.x, dy = a.y-b.y;
        const dist = Math.hypot(dx,dy);
        if (dist <= D && Math.random() < 0.06){
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }
    }
    ctx.restore();
  }

  const SHOOTERS = [];
  function spawnShooter(){
    const startX = Math.random()*(-100);
    const startY = Math.random()*(-50);
    const speed  = 6 + Math.random()*4;
    SHOOTERS.push({ x: startX, y: startY, vx: speed, vy: speed*0.55, life: 60 + Math.random()*40, maxLife: 80 });
  }
  setInterval(()=>{ if (Math.random()<0.35) spawnShooter(); }, 2200);

  function tick(){
    ctx.clearRect(0,0,c.width,c.height);
    for (const s of STARS){
      s.tw += s.sp;
      const alpha = 0.4 + 0.6*(0.5+0.5*Math.sin(s.tw));
      ctx.beginPath();
      ctx.fillStyle = `rgba(255,255,255,${alpha})`;
      ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
      ctx.fill();
    }
    drawConstellations();

    for (const sh of SHOOTERS){
      if (sh.life>0){
        ctx.save();
        const grad = ctx.createLinearGradient(sh.x, sh.y, sh.x - sh.vx*6, sh.y - sh.vy*6);
        grad.addColorStop(0, `rgba(255,255,255,0.9)`);
        grad.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.strokeStyle = grad; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(sh.x, sh.y); ctx.lineTo(sh.x - sh.vx*6, sh.y - sh.vy*6); ctx.stroke();
        ctx.restore();
        sh.x += sh.vx; sh.y += sh.vy; sh.life--;
      }
    }
    for (let i=SHOOTERS.length-1; i>=0; i--){
      const s = SHOOTERS[i];
      if (s.life<=0 || s.x>c.width+120 || s.y>c.height+120) SHOOTERS.splice(i,1);
    }
    requestAnimationFrame(tick);
  }
  tick();
})();

/* =============================
   Render: Timeline + Galeria
   ============================= */
const elTimeline = document.getElementById('timeline');
const elGallery  = document.getElementById('gallery');

function fmtDate(ym){ 
  const [y,m]=ym.split('-'); 
  const mnames=['','Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez']; 
  return `${mnames[+m]||''}/${y}`; 
}

function renderTimeline(){
  // limpa
  elTimeline.innerHTML = '';

  // agrupa por ano
  const byYear = {};
  TIMELINE
    .slice() // não muta o original
    .sort((a,b)=> a.date.localeCompare(b.date))
    .forEach(it=>{
      const y = it.date.slice(0,4);
      (byYear[y] ||= []).push(it);
    });

  // monta UI
  const monthNames = ['','Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];

  Object.keys(byYear).sort().forEach(year=>{
    // header do ano
    const yearWrap = document.createElement('section');
    yearWrap.className = 'timeline-year';

    const h = document.createElement('h3');
    h.className = 'timeline-year__title';
    h.textContent = year;
    yearWrap.appendChild(h);

    // lista do ano
    const ul = document.createElement('ul');
    ul.className = 'tl';

    byYear[year].forEach((it, idx)=>{
      const [y, m] = it.date.split('-');
      const li = document.createElement('li');
      li.className = `tl__item ${idx % 2 === 0 ? 'is-left' : 'is-right'}`;

      // badge (mês/ano)
      const badge = document.createElement('div');
      badge.className = 'tl__badge';
      badge.textContent = `${monthNames[+m]||''}/${y}`;

      // card
      const card = document.createElement('article');
      card.className = 'tl__card card';
      card.dataset.title = `${monthNames[+m]||''}/${y} — ${it.title}`;
      card.dataset.text  = it.text || '';

      if (it.image){
        card.innerHTML = `
          <figure class="tl__img"><img src="${it.image}" alt=""></figure>
          <div class="tl__content">
            <h4>${it.title}</h4>
            <p>${it.text || ''}</p>
          </div>`;
      } else {
        card.innerHTML = `
          <div class="tl__content only-text">
            <h4>${it.title}</h4>
            <p>${it.text || ''}</p>
          </div>`;
      }

      // clique abre modal
      card.addEventListener('click', ()=> openStory(it));

      // conecta
      const line = document.createElement('span');
      line.className = 'tl__line';

      li.appendChild(badge);
      li.appendChild(card);
      li.appendChild(line);
      ul.appendChild(li);
    });

    yearWrap.appendChild(ul);
    elTimeline.appendChild(yearWrap);
  });
}

/* =============================
   Modal de histórias + Fireworks
   ============================= */
const modal = document.getElementById('storyModal');
const storyImg  = document.getElementById('storyImg');
const storyTitle= document.getElementById('storyTitle');
const storyText = document.getElementById('storyText');
const storyClose= document.getElementById('storyClose');
const fxFire    = document.getElementById('fxFire');

function openStory(it){
  storyTitle.textContent = `${fmtDate(it.date)} — ${it.title}`;
  storyText.textContent  = it.text || '';
  if(it.image){ storyImg.src = it.image; storyImg.style.display='block'; }
  else { storyImg.removeAttribute('src'); storyImg.style.display='none'; }
  modal.removeAttribute('hidden');
}
function closeStory(){ modal.setAttribute('hidden',''); }
if (storyClose) storyClose.addEventListener('click', closeStory);
if (modal) modal.addEventListener('click', e=>{ if(e.target===modal) closeStory(); });
document.addEventListener('keydown', e=>{ if(e.key==='Escape' && !modal.hasAttribute('hidden')) closeStory(); });

/* =============================
   Som + Segredo + Logout (MP3 local)
   ============================= */
const btnPlay    = document.getElementById('btnPlay');
const btnSecret  = document.getElementById('btnSecret');
const btnLogout  = document.getElementById('btnLogout');
const audioEl    = document.getElementById('bgAudio');
const gate       = document.getElementById('audioGate');
const gateBtn    = document.getElementById('gateBtn');

// dois botões de som: header e player
const btnSoundButtons = Array.from(document.querySelectorAll('#btnSound, #btnSound2'));
btnSoundButtons.forEach(btn => btn.addEventListener('click', ()=>{
  if (gate && getComputedStyle(gate).display !== 'none') gate.style.display = 'none';
  toggleMuteMP3();
}));

if (audioEl) {
  audioEl.loop = true;
  audioEl.preload = 'metadata';
  try { audioEl.volume = 0.85; } catch(_){}
}

async function fadeTo(target=1, ms=600){
  if (!audioEl) return;
  const start = audioEl.volume ?? 1;
  const steps = Math.max(1, Math.floor(ms/16));
  const delta = (target - start) / steps;
  for (let i=0;i<steps;i++){
    await new Promise(r=>setTimeout(r,16));
    try { audioEl.volume = Math.max(0, Math.min(1, (audioEl.volume ?? start) + delta)); } catch(_){}
  }
  try { audioEl.volume = target; } catch(_){}
}

async function tryPlayMP3(){
  if (!audioEl) return false;
  try {
    await audioEl.play();
    return true;
  } catch(_){ return false; }
}

function pauseMP3(){
  try { if (audioEl && !audioEl.paused) audioEl.pause(); } catch(_){}
}
function toggleMuteMP3(){
  if (!audioEl) return;
  audioEl.muted = !audioEl.muted;
}

// Botão Play/Pause
if (btnPlay) btnPlay.addEventListener('click', async ()=>{
  if (!audioEl) return;
  if (gate && getComputedStyle(gate).display !== 'none') gate.style.display = 'none';

  if (!audioEl.paused){
    await fadeTo(0.0, 350);
    pauseMP3();
    try { audioEl.currentTime = audioEl.currentTime; } catch(_){}
    try { audioEl.muted = false; } catch(_){}
    try { audioEl.volume = 0.85; } catch(_){}
    btnPlay.textContent = 'Play';
    return;
  }
  const ok = await tryPlayMP3();
  if (ok){
    try { audioEl.muted = false; } catch(_){}
    await fadeTo(0.85, 500);
    btnPlay.textContent = 'Pausar';
  } else {
    btnPlay.textContent = 'Play';
  }
});

// Segredo
if (btnSecret) btnSecret.addEventListener('click', ()=>{
  if (gate && getComputedStyle(gate).display !== 'none') gate.style.display = 'none';
  typeReveal('Meu amor, hoje e sempre. Obrigado por estar comigo.', 40);
});

// Logout
if (btnLogout) btnLogout.addEventListener('click', ()=>{
  try {
    sessionStorage.removeItem('authOK');
    localStorage.removeItem('authOK');
  } catch(_){}
  location.href = 'index.html';
});

// Overlay: 1º gesto do usuário desbloqueia áudio
if (gateBtn) gateBtn.addEventListener('click', async ()=>{
  const ok = await tryPlayMP3();
  if (ok){
    try { audioEl.muted = false; } catch(_){}
    await fadeTo(0.85, 500);
    if (btnPlay) btnPlay.textContent = 'Pausar';
    if (gate) gate.style.display = 'none';
  } else {
    typeReveal('Se o som não iniciar, verifique o arquivo assets/music.mp3 ou tente novamente.', 36);
  }
});

/* =============================
   Fireworks + Typed reveal
   ============================= */
function fireworks(){
  const c = fxFire, ctx = c.getContext('2d');
  function resize(){ c.width = innerWidth; c.height = innerHeight; }
  addEventListener('resize', resize); resize();
  c.removeAttribute('hidden');
  const sparks = [];
  for(let i=0;i<200;i++)
    sparks.push({x:innerWidth/2+(Math.random()*200-100),y:innerHeight/3+(Math.random()*80-40),vx:(Math.random()-.5)*8,vy:(Math.random()-.5)*8,r:Math.random()*3+1,life:Math.random()*80+40,color:`hsl(${Math.random()*360},90%,60%)`});
  let t=0; (function step(){
    ctx.fillStyle='rgba(0,0,0,0.14)'; ctx.fillRect(0,0,c.width,c.height);
    sparks.forEach(s=>{
      if(s.life>0){
        s.x+=s.vx; s.y+=s.vy+0.6; s.vx*=0.99; s.vy*=0.99;
        ctx.beginPath(); ctx.fillStyle=s.color; ctx.arc(s.x,s.y,s.r,0,Math.PI*2); ctx.fill(); s.life--;
      }
    });
    if(t++<200) requestAnimationFrame(step);
    else { c.setAttribute('hidden',''); ctx.clearRect(0,0,c.width,c.height); }
  })();
}

/* =============================
   Scroll-Reveal
   ============================= */
function setupReveal(){
  const obs = new IntersectionObserver((entries)=>{
    for(const e of entries){
      if(e.isIntersecting){
        e.target.classList.add('reveal-in');
        obs.unobserve(e.target);
      }
    }
  }, {threshold: 0.15});
  document.querySelectorAll('.year, .card, .gallery .flip').forEach(el=>{
    el.classList.add('reveal-init');
    obs.observe(el);
  });
}

/* =============================
   Final épico (typing + fireworks)
   ============================= */
let finalTriggered = false;
function runFinal(){
  if (finalTriggered) return;
  finalTriggered = true;

  // 1) Texto digitando
  const box = document.getElementById('finalMsg');
  const text = 'Hoje e sempre, eu escolho você. Ah 2 anos atrás eu saí de paragominas, não tenho nada nessa cidade, exceto você, prometi que um dia voltaria e essa promessa se mantém de pé, assim como toda historia possui um final, nós ainda não terminamos a nossa, não importa o que aconteça, onde esteja, ou com quem, sempre estarei aqui, minha atração e minha paixão vão além dos desejos da carne, amo você de corpo e alma, e anseio por mais momentos com você, espero poder terminar esse livro ao seu lado um dia, sem você essa historia não tem sentido, pois você é o motivo dela existir, esse site ficará no ar por apenas 24 horas, depois disso ele vai desaparecer, mas cada frase dita aqui estará guardada no meu coração, se um dia buscar novamente, sabes onde encontrarás. Feliz aniversário, Iasmim 💖';
  typeInto(box, text, 35);

  // 2) Fogos
  setTimeout(()=>fireworks(), 400);

  // 3) Destrava a surpresa (galeria)
  unlockSurprise();

  // 4) Scroll suave pra galeria quando clicar no botão
  const btn = document.getElementById('btnFinal');
  const wrap = document.getElementById('galleryWrap');
  if (btn && wrap) {
    btn.addEventListener('click', ()=>{
      wrap.scrollIntoView({ behavior:'smooth', block:'start' });
    }, { once:true });
  }
}

function typeInto(container, text, speed=40){
  if (!container) return;
  container.innerHTML = '';
  const p = document.createElement('p');
  p.style.margin = '0';
  container.appendChild(p);
  let i=0;
  const id = setInterval(()=>{
    p.textContent = text.slice(0, ++i);
    if (i >= text.length) clearInterval(id);
  }, speed);
}
function setupFinalEpic(){
  const btnFinal = document.getElementById('btnFinal');

  // só pelo botão (sem sentinel / IntersectionObserver)
  if (btnFinal){
    btnFinal.addEventListener('click', ()=>{
      if (gate && getComputedStyle(gate).display !== 'none') gate.style.display = 'none';
      runFinal();
    });
  }

  if (sentinel){
    const io = new IntersectionObserver((entries)=>{
      if (entries.some(e=>e.isIntersecting)) runFinal();
    }, {threshold: 0.6});
    io.observe(sentinel);
  }
}

/* Tilt 3D leve */
function addTilt(selector, max=8){
  const els = document.querySelectorAll(selector);
  els.forEach(el=>{
    let raf=0;
    function onMove(e){
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width/2, cy = r.top + r.height/2;
      const dx = (e.clientX - cx) / (r.width/2);
      const dy = (e.clientY - cy) / (r.height/2);
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(()=>{
        el.style.transform = `rotateY(${dx*max}deg) rotateX(${-dy*max}deg) translateZ(0)`;
        el.style.boxShadow = `0 24px 60px rgba(0,0,0,.5)`;
      });
    }
    function reset(){
      cancelAnimationFrame(raf);
      el.style.transform = '';
      el.style.boxShadow = '';
    }
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', reset);
  });
}

/* Visualizador de áudio (bars) */
(function musicViz(){
  const canvas = document.getElementById('vizBars');
  const audio = document.getElementById('bgAudio');
  if(!canvas || !audio) return;

  const ctx = canvas.getContext('2d');
  function resize(){ canvas.width = canvas.clientWidth; canvas.height = canvas.clientHeight; }
  addEventListener('resize', resize); resize();

  let audioCtx, analyser, src, data;
  function ensureNodes(){
    if (audioCtx) return;
    audioCtx = new (window.AudioContext||window.webkitAudioContext)();
    analyser = audioCtx.createAnalyser();
    analyser.fftSize = 256;
    data = new Uint8Array(analyser.frequencyBinCount);
    src = audioCtx.createMediaElementSource(audio);
    src.connect(analyser);
    analyser.connect(audioCtx.destination);
  }

  function draw(){
    requestAnimationFrame(draw);
    if(!analyser) return;
    analyser.getByteFrequencyData(data);
    const w = canvas.width, h = canvas.height;
    ctx.clearRect(0,0,w,h);
    const bars = 40;
    const step = Math.floor(data.length / bars);
    const bw = w / bars;
    for(let i=0;i<bars;i++){
      const v = data[i*step] / 255;
      const bh = v * h;
      const x = i*bw; const y = h - bh;
      ctx.globalAlpha = .85;
      ctx.fillStyle = i%2 ? '#ff5ea8' : '#7cf4ff';
      ctx.fillRect(x+2, y, bw-4, bh);
      ctx.globalAlpha = .35;
      ctx.fillRect(x+2, y-6, bw-4, 6);
    }
  }
  draw();

  // liga quando tocar
  audio.addEventListener('play', async ()=>{
    try{
      ensureNodes();
      if (audioCtx.state === 'suspended') await audioCtx.resume();
    }catch(_){}
  });
})();

/* =============================
   Guestbook (envia pro WhatsApp)
   ============================= */
const GUEST_KEY  = 'iasmim_guest_note_v1';
const WHATSAPP_NUMBER = '5591986247025'; // 55 + DDD + número, só dígitos

function openGuest(){ const m = document.getElementById('guestModal'); if(m) m.removeAttribute('hidden'); }
function closeGuest(){ const m = document.getElementById('guestModal'); if(m) m.setAttribute('hidden',''); }

function loadGuest(){
  const box = document.getElementById('guestRender');
  try{
    const raw = localStorage.getItem(GUEST_KEY);
    if (raw && box){
      const data = JSON.parse(raw);
      box.hidden = false;
      box.innerHTML = `<h4>Mensagem da Iasmim</h4><p>${escapeHTML(data.text)}</p>`;
    }
  }catch(_){}
}

function escapeHTML(s=''){
  return s.replace(/[&<>"]/g, c=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;' }[c]));
}
function sendToWhatsApp(text){
  const prefix = `Mensagem da Iasmim 💌%0A%0A`;
  const body   = encodeURIComponent(text);
  const url    = `https://wa.me/${WHATSAPP_NUMBER}?text=${prefix}${body}`;
  const w = window.open(url, '_blank');
  if (!w || w.closed || typeof w.closed === 'undefined'){
    try { window.location.href = url; return; } catch(_){}
  }
  if (navigator.clipboard && text){
    navigator.clipboard.writeText(`Mensagem da Iasmim:\n\n${text}\n\n(Se o WhatsApp não abriu, cole no chat)`).catch(()=>{});
  }
}
function setupGuestbook(){
  loadGuest();

  const btnGuest = document.getElementById('btnGuest');
  if (btnGuest){
    btnGuest.addEventListener('click', ()=>{
      if (gate && getComputedStyle(gate).display !== 'none') gate.style.display = 'none';
      try{
        const raw = localStorage.getItem(GUEST_KEY);
        const txt = document.getElementById('guestText');
        if (txt) txt.value = raw ? (JSON.parse(raw).text || '') : '';
      }catch(_){}
      openGuest();
    });
  }

  const guestSave = document.getElementById('guestSave');
  if (guestSave) guestSave.addEventListener('click', ()=>{
    const txt = document.getElementById('guestText');
    const val = (txt && txt.value ? txt.value : '').trim();
    if (!val){ typeReveal('Escreva algo bonito 🥹', 35); return; }
    try { localStorage.setItem(GUEST_KEY, JSON.stringify({ text: val, ts: Date.now() })); } catch(_){}
    closeGuest();
    loadGuest();
    typeReveal('Mensagem salva com carinho 💖 (também enviei para o WhatsApp)', 35);
    sendToWhatsApp(val);
  });

  const guestCancel = document.getElementById('guestCancel');
  if (guestCancel) guestCancel.addEventListener('click', closeGuest);

  const gm = document.getElementById('guestModal');
  if (gm) gm.addEventListener('click', (e)=>{ if(e.target===gm) closeGuest(); });
}

/* Corações no clique */
(function hearts(){
  const colors = ['#ff5ea8','#ffa6d0','#7cf4ff','#a07cff'];
  document.addEventListener('click', (e)=>{
    // ignora cliques muito perto do topo para não conflitar com header
    if (e.clientY < 60) return;
    for(let i=0;i<6;i++){
      const s = document.createElement('span');
      s.textContent = '❤';
      s.style.cssText = `
        position:fixed; left:${e.clientX}px; top:${e.clientY}px;
        font-size:${12+Math.random()*18}px; color:${colors[i%colors.length]};
        pointer-events:none; z-index:40; filter: drop-shadow(0 2px 8px rgba(0,0,0,.35));
        transform: translate(-50%,-50%) scale(.8);
        opacity:.9; transition: transform 800ms ease, opacity 800ms ease;
      `;
      document.body.appendChild(s);
      requestAnimationFrame(()=>{
        const dx = (Math.random()-.5)*120, dy = - (60 + Math.random()*120);
        s.style.transform = `translate(${dx}px, ${dy}px) scale(1.3)`;
        s.style.opacity = '0';
      });
      setTimeout(()=>s.remove(), 820);
    }
  });
})();

function setupReveal(){
  const obs = new IntersectionObserver((entries)=>{
    for(const e of entries){
      if(e.isIntersecting){
        e.target.classList.add('reveal-in');
        obs.unobserve(e.target);
      }
    }
  }, {threshold: 0.15});

  const items = document.querySelectorAll('.year, .card, .tl__card, .gallery .flip');
  items.forEach((el, i)=>{
    el.classList.add('reveal-init');
    el.style.transitionDelay = `${Math.min(i*0.03, 0.4)}s`; // leve stagger
    obs.observe(el);
  });
}

function unlockSurprise(){
  if (galleryRevealed) return;
  galleryRevealed = true;
  renderGallery();
  addTilt('#gallery .flip', 8);           // <— tilt nas cartas da surpresa

  const wrap = document.getElementById('galleryWrap');
  if (wrap) {
    wrap.hidden = false;
    wrap.style.opacity = '0';
    wrap.style.transform = 'translateY(8px)';
    requestAnimationFrame(()=>{
      wrap.style.transition = 'opacity .45s ease, transform .45s ease';
      wrap.style.opacity = '1';
      wrap.style.transform = 'translateY(0)';
    });
  }
}

/* =============================
   Helpers visuais
   ============================= */
function typeReveal(text, speed=50){
  const box = document.createElement('div');
  Object.assign(box.style,{
    position:'fixed',left:'50%',top:'18%',transform:'translateX(-50%)',
    background:'linear-gradient(180deg, rgba(255,255,255,0.02), rgba(0,0,0,0.4))',
    padding:'16px',borderRadius:'10px',zIndex:30,maxWidth:'90%',
    boxShadow:'0 20px 50px rgba(0,0,0,0.6)'
  });
  const p = document.createElement('p'); Object.assign(p.style,{margin:0,fontSize:'18px',color:'#fff'});
  box.appendChild(p); document.body.appendChild(box);
  let i=0; const id=setInterval(()=>{
    p.textContent = text.slice(0,++i);
    if(i>=text.length){ clearInterval(id); setTimeout(()=>box.remove(), 4000); }
  }, speed);
}

// Destrava a surpresa: renderiza e revela a galeria só uma vez
let galleryRevealed = false;
function unlockSurprise(){
  if (galleryRevealed) return;
  galleryRevealed = true;

  // Renderiza a galeria agora
  renderGallery();

  // Revela com animação suave
  const wrap = document.getElementById('galleryWrap');
  if (wrap) {
    wrap.hidden = false;
    wrap.style.opacity = '0';
    wrap.style.transform = 'translateY(8px)';
    requestAnimationFrame(()=>{
      wrap.style.transition = 'opacity .45s ease, transform .45s ease';
      wrap.style.opacity = '1';
      wrap.style.transform = 'translateY(0)';
    });
  }
}

/* =============================
   Velas flutuantes (Hogwarts vibe)
   ============================= */
(function floatingCandles(){
  const c = document.getElementById('candles'); if(!c) return;
  const ctx = c.getContext('2d');
  function resize(){ c.width = innerWidth; c.height = innerHeight; }
  addEventListener('resize', resize); resize();

  const N = Math.min(36, Math.floor(innerWidth/40));
  const candles = Array.from({length: N}, ()=>spawn());

  function spawn(){
    const x = Math.random()*c.width;
    const y = -20 - Math.random()*c.height*0.5;
    const speed = .15 + Math.random()*.3;
    const sway = .5 + Math.random()*1;
    const base = 12 + Math.random()*8;
    return { x, y, speed, sway, t: Math.random()*Math.PI*2, base };
  }

  function flame(x,y,r){
    const g = ctx.createRadialGradient(x,y, 0, x,y, r);
    g.addColorStop(0, 'rgba(255,240,200,.95)');
    g.addColorStop(.4, 'rgba(255,210,90,.65)');
    g.addColorStop(1, 'rgba(255,150,40,0)');
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2); ctx.fill();
  }

  (function tick(){
    ctx.clearRect(0,0,c.width,c.height);
    for(const cd of candles){
      cd.t += 0.03;
      cd.y += cd.speed;
      const dx = Math.sin(cd.t) * cd.sway;
      const fx = cd.x + dx, fy = cd.y;
      // pavio
      ctx.fillStyle = 'rgba(250,230,180,.55)';
      ctx.fillRect(fx-1, fy+8, 2, cd.base);
      // chama
      flame(fx, fy, 10 + Math.sin(cd.t*3)*2);
      flame(fx, fy-6, 6 + Math.cos(cd.t*2)*1.5);

      if (cd.y - 20 > c.height) {
        const n = spawn(); cd.x=n.x; cd.y=n.y; cd.speed=n.speed; cd.sway=n.sway; cd.t=n.t; cd.base=n.base;
      }
    }
    requestAnimationFrame(tick);
  })();
})();

/* =============================
   Golden Snitch — voo aleatório
   ============================= */
(function snitch(){
  const el = document.getElementById('snitch'); if(!el) return;
  let t = 0, alive = true;
  function pos(t){
    // trajetória (Lissajous leve)
    const w = innerWidth, h = innerHeight;
    const x = w/2 + Math.sin(t*0.0019)*w*0.42 + Math.sin(t*0.013)*40;
    const y = h/3 + Math.cos(t*0.0012)*h*0.28 + Math.sin(t*0.021)*24;
    return {x,y};
  }
  function fly(){
    if(!alive) return;
    t += 16 + Math.random()*6;
    const {x,y} = pos(t);
    el.style.left = x+'px'; el.style.top = y+'px';
    requestAnimationFrame(fly);
  }
  fly();

  el.addEventListener('click', (e)=>{
    // pequeno “feitiço” ao pegar
    spellBurst(e.clientX, e.clientY);
    typeReveal('Você pegou a Snitch! 🧹✨', 36);
  });

  // feitiço (reaproveita seu estilo, mas com estrelinhas)
  function spellBurst(x,y){
    for(let i=0;i<14;i++){
      const s = document.createElement('span');
      s.textContent = '✦';
      s.style.cssText = `
        position:fixed; left:${x}px; top:${y}px; z-index:60; pointer-events:none;
        color:${i%2? '#ffd24d':'#fff'};
        font-size:${10+Math.random()*18}px; text-shadow:0 2px 10px rgba(255,220,90,.55);
        transform: translate(-50%,-50%) scale(.6); opacity:.95;
        transition: transform 900ms ease, opacity 900ms ease;
      `;
      document.body.appendChild(s);
      requestAnimationFrame(()=>{
        const a = Math.random()*Math.PI*2;
        const r = 60 + Math.random()*110;
        s.style.transform = `translate(${Math.cos(a)*r}px, ${Math.sin(a)*r}px) scale(1.2) rotate(${(Math.random()*40-20)}deg)`;
        s.style.opacity = '0';
      });
      setTimeout(()=>s.remove(), 920);
    }
  }
})();

function openStory(it){
  storyTitle.textContent = `${fmtDate(it.date)} — ${it.title}`;
  storyText.textContent  = it.text || '';
  if(it.image){ storyImg.src = it.image; storyImg.style.display='block'; }
  else { storyImg.removeAttribute('src'); storyImg.style.display='none'; }

  // >>> HP: aplica papiro na área de texto
  document.querySelector('#storyModal .modal__body')?.classList.add('parchment');

  modal.removeAttribute('hidden');
}

if (btnSecret) btnSecret.addEventListener('click', (ev)=>{
  if (gate && getComputedStyle(gate).display !== 'none') gate.style.display = 'none';
  // texto que já existia:
  typeReveal('Lumos… que a sua luz esteja sempre comigo. ✨', 38);

  // Glow circular temporário (como uma varinha acendendo)
  const ring = document.createElement('span');
  ring.style.cssText = `
    position:fixed; left:${ev.clientX}px; top:${ev.clientY}px; transform:translate(-50%,-50%);
    width:12px; height:12px; border-radius:50%;
    box-shadow: 0 0 18px 8px rgba(255,210,90,.55), 0 0 60px 18px rgba(255,210,90,.25);
    pointer-events:none; z-index:55; opacity:.9; transition: all 800ms ease;
  `;
  document.body.appendChild(ring);
  requestAnimationFrame(()=>{
    ring.style.width='220px'; ring.style.height='220px'; ring.style.opacity='0';
  });
  setTimeout(()=> ring.remove(), 820);
});

// Após renderTimeline();
document.querySelectorAll('.card').forEach(c=>{
  c.classList.add('footprints'); // dá um toque “Mapa do Maroto”
});

/* =============================
   Init (ordem importa!)
   ============================= */
window.addEventListener('DOMContentLoaded', ()=>{
  try {
    renderTimeline();
    // renderGallery();  // (REMOVIDO) — a galeria só aparece na surpresa
    setupReveal();
    setupGuestbook();
    setupFinalEpic();

    // segurança: canvases não capturam clique
    ['bgParticles','sky','fxFire'].forEach(id=>{
      const el = document.getElementById(id);
      if (el){ el.style.pointerEvents='none'; el.style.zIndex='0'; }
    });
  } catch(e) {
    console.error('Render error:', e);
  }
});
