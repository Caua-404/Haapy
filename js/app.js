/* ==========================
const fireworksCanvas = document.getElementById('fireworks');


enterBtn.addEventListener('click', () => { cover.style.display = 'none'; app.style.display = 'block'; try{ bgAudio.play(); }catch(e){} });
loginBtn.addEventListener('click', () => { loginModal.style.display='flex'; });


document.addEventListener('contextmenu', e=>e.preventDefault());
document.addEventListener('keydown', e=>{ if(e.key === 'F12' || (e.ctrlKey && e.shiftKey && (e.key==='I' || e.key==='C' || e.key==='J'))) { e.preventDefault(); alert('Acesso não permitido.'); } });


submitLogin.addEventListener('click', async () => {
loginMsg.textContent = '';
const val = passwordInput.value || '';
if (devOpened) { loginMsg.textContent = 'Acesso bloqueado (detecção de ferramentas de desenvolvimento).'; return; }
const derived = await pbkdf2Base64(val, CONFIG.saltStr, CONFIG.iterations);
if (derived === CONFIG.verifierB64) {
loginMsg.textContent = 'Autenticado. Bem-vinda!';
loginModal.style.display='none'; app.style.display='block'; cover.style.display='none';
} else { loginMsg.textContent = 'Senha incorreta.'; }
});


playBtn.addEventListener('click', async ()=>{ if (bgAudio.paused) { await bgAudio.play(); playBtn.textContent='Pausar'; } else { bgAudio.pause(); playBtn.textContent='Play'; } });
toggleSound.addEventListener('click', ()=> { if (bgAudio.paused) { bgAudio.play(); } else bgAudio.pause(); });


/* Render da Timeline */
function fmtDate(ym){ const [y,m] = ym.split('-'); const nomes=['','Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez']; return `${nomes[+m]||''}/${y}`; }


function renderTimeline(){
const byYear = {};
TIMELINE.sort((a,b)=> a.date.localeCompare(b.date)).forEach(it=>{
const y = it.date.slice(0,4);
if(!byYear[y]) byYear[y] = [];
byYear[y].push(it);
});
timelineEl.innerHTML = '';
Object.keys(byYear).sort().forEach(y=>{
const h = document.createElement('div'); h.className='year'; h.textContent=y; timelineEl.appendChild(h);
byYear[y].forEach(it=>{
const card = document.createElement('div'); card.className='card'; card.dataset.title = `${fmtDate(it.date)} — ${it.title}`; card.dataset.text = it.text; if(it.image) card.dataset.image = it.image;
if (it.image) { card.innerHTML = `<img src="${it.image}" alt=""><h3>${it.title}</h3><p>${it.text}</p>`; }
else { card.innerHTML = `<h3>${fmtDate(it.date)} — ${it.title}</h3><p>${it.text}</p>`; }
card.addEventListener('click', ()=>{
storyTitle.textContent = card.dataset.title || it.title;
storyText.textContent = it.text || '';
const src = it.image || '';
storyImg.src = src;
storyImg.style.display = src ? 'block' : 'none';
storyModal.style.display='flex';
});
timelineEl.appendChild(card);
});
});
}


/* Render da Galeria (flip-cards) */
function renderGallery(){
galleryEl.innerHTML = '';
GALLERY.forEach(g=>{
const wrap = document.createElement('div'); wrap.className='flip';
wrap.innerHTML = `<div class="flip__inner">
<figure class="flip__face flip__front"><img src="${g.image}" alt=""></figure>
<div class="flip__face flip__back"><div><strong>${g.title}</strong><p style="margin-top:8px;font-size:13px">${g.text}</p></div></div>
</div>`;
galleryEl.appendChild(wrap);
});
}


closeStory.addEventListener('click', ()=> storyModal.style.display='none');


document.getElementById('easterEggBtn').addEventListener('click', ()=> { confettiBurst(); alert('Surpresa! ❤️'); });
secretEgg.addEventListener('click', ()=> { typeReveal('Meu amor, hoje e sempre. Obrigado por estar comigo.', 40); });


/* Partículas de fundo */
(function initParticles(){ const c = particlesCanvas; const ctx = c.getContext('2d'); function resize(){ c.width = innerWidth; c.height = innerHeight; } window.addEventListener('resize', resize); resize(); const ps = []; for(let i=0;i<80;i++){ ps.push({x:Math.random()*c.width,y:Math.random()*c.height,r:Math.random()*2+0.8,vx:(Math.random()-0.5)*0.4,vy:(Math.random()-0.5)*0.4,a:Math.random()*0.8}); } function tick(){ ctx.clearRect(0,0,c.width,c.height); for(let p of ps){ p.x+=p.vx; p.y+=p.vy; if(p.x<0) p.x = c.width; if(p.x>c.width) p.x=0; if(p.y<0) p.y = c.height; if(p.y>c.height) p.y=0; ctx.beginPath(); ctx.fillStyle = 'rgba(255,255,255,'+ (0.08 + p.a*0.4) +')'; ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill(); } requestAnimationFrame(tick); } tick(); })();


/* Efeitos visuais */
function confettiBurst(){ const c = fireworksCanvas; const ctx = c.getContext('2d'); function resize(){ c.width = innerWidth; c.height = innerHeight; } window.addEventListener('resize', resize); resize(); fireworksCanvas.style.display = 'block'; const sparks = []; for(let i=0;i<200;i++){ sparks.push({x:innerWidth/2 + (Math.random()*200-100), y:innerHeight/3 + (Math.random()*80-40), vx:(Math.random()-0.5)*8, vy:(Math.random()-0.5)*8, r:Math.random()*3+1, life:Math.random()*80+40, color:`hsl(${Math.random()*360},90%,60%)`}); } let t=0; function step(){ ctx.fillStyle='rgba(0,0,0,0.12)'; ctx.fillRect(0,0,c.width,c.height); for(let s of sparks){ if(s.life>0){ s.x+=s.vx; s.y+=s.vy + 0.6; s.vx *= 0.99; s.vy *= 0.99; ctx.beginPath(); ctx.fillStyle = s.color; ctx.arc(s.x,s.y,s.r,0,Math.PI*2); ctx.fill(); s.life--; } } t++; if(t<200) requestAnimationFrame(step); else { fireworksCanvas.style.display='none'; ctx.clearRect(0,0,c.width,c.height); } } step(); }


function typeReveal(text, speed=50){ const div = document.createElement('div'); div.style.position='fixed'; div.style.left='50%'; div.style.top='20%'; div.style.transform='translateX(-50%)'; div.style.background='linear-gradient(180deg, rgba(255,255,255,0.02), rgba(0,0,0,0.4))'; div.style.padding='18px'; div.style.borderRadius='10px'; div.style.zIndex=300; div.style.maxWidth='90%'; div.style.boxShadow='0 20px 50px rgba(0,0,0,0.6)'; document.body.appendChild(div); let i=0; const p = document.createElement('p'); p.style.margin=0; p.style.fontSize='18px'; p.style.color='#fff'; div.appendChild(p); const id = setInterval(()=> { p.textContent = text.slice(0, i++); if (i>text.length) { clearInterval(id); setTimeout(()=>div.remove(), 4000); } }, speed); }


/* Inicialização */
renderTimeline();
renderGallery();