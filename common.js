/* progress bar + cursor glow */
window.addEventListener('scroll', ()=>{
  const h = document.documentElement;
  const pct = (h.scrollTop)/(h.scrollHeight-h.clientHeight)*100;
  const p = document.getElementById('progress');
  if(p) p.style.width = pct+'%';
});
window.addEventListener('mousemove', e=>{
  const g = document.getElementById('glow');
  if(g){ g.style.left = e.clientX+'px'; g.style.top = e.clientY+'px'; }
});

/* mark active nav link based on current file */
(function(){
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navlinks a').forEach(a=>{
    const href = a.getAttribute('href').split('#')[0] || 'index.html';
    if(href === path || (href==='' && path==='index.html')) a.classList.add('active');
  });
})();

/* animated counters (elements with data-count) */
document.addEventListener('DOMContentLoaded', ()=>{
  const counters = document.querySelectorAll('[data-count]');
  if(counters.length){
    const io = new IntersectionObserver(entries=>{
      entries.forEach(en=>{
        if(en.isIntersecting){
          const el = en.target, target = +el.dataset.count; let cur=0;
          const step = Math.max(1, target/40);
          const t = setInterval(()=>{ cur+=step; if(cur>=target){cur=target; clearInterval(t);} el.textContent = Math.round(cur); }, 25);
          io.unobserve(el);
        }
      });
    },{threshold:0.5});
    counters.forEach(c=>io.observe(c));
  }
});

/* ---------- projects data (shared across pages via localStorage) ---------- */
const SEED_PROJECTS = [
  {title:"Redesign Aplikasi Perbankan", tag:"ui", desc:"Merombak alur transfer dan onboarding, meningkatkan skor usability sebesar 34%.", link:""},
  {title:"Dashboard Analitik SaaS", tag:"dev", desc:"Membangun dashboard real-time dengan visualisasi data interaktif dari nol.", link:""},
  {title:"Landing Page Produk 3D", tag:"motion", desc:"Hero interaktif dengan objek 3D yang merespons scroll dan gerakan kursor.", link:""},
  {title:"Sistem Desain Multi-Produk", tag:"ui", desc:"Membangun design system terpadu untuk 3 tim produk berbeda.", link:""}
];
const TAG_LABEL = {ui:"UI/UX", dev:"Dev", motion:"Motion"};
let activeFilter = 'all';
function loadProjects(){
  try{
    const raw = localStorage.getItem('portfolio_projects_v2');
    if(!raw){ localStorage.setItem('portfolio_projects_v2', JSON.stringify(SEED_PROJECTS)); return SEED_PROJECTS; }
    return JSON.parse(raw);
  }catch(e){ return SEED_PROJECTS; }
}
function saveProjects(list){ try{ localStorage.setItem('portfolio_projects_v2', JSON.stringify(list)); }catch(e){} }
function escapeHtml(s){ return (s||'').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function renderProjects(){
  const grid = document.getElementById('proj-grid');
  if(!grid) return;
  let list = loadProjects();
  if(activeFilter!=='all') list = list.filter(p=>p.tag===activeFilter);
  if(!list.length){ grid.innerHTML = '<div class="proj-empty">Belum ada proyek di kategori ini.</div>'; return; }
  grid.innerHTML = list.map((p)=>{
    const realIndex = loadProjects().indexOf(p);
    return `<div class="proj-card">
      <button class="del" onclick="deleteProject(${realIndex})" aria-label="Hapus proyek">✕</button>
      <div class="proj-thumb tag-${p.tag}"><span class="shape s1"></span><span class="shape s2"></span></div>
      <div class="proj-body">
        <span class="tag">${escapeHtml(TAG_LABEL[p.tag]||p.tag)}</span>
        <h3>${escapeHtml(p.title)}</h3>
        <p>${escapeHtml(p.desc)}</p>
        ${p.link ? `<a class="link" href="${escapeHtml(p.link)}" target="_blank" rel="noopener">Lihat detail →</a>` : ''}
      </div>
    </div>`;
  }).join('');
}
function addProject(e){
  e.preventDefault();
  const list = loadProjects();
  list.unshift({
    title: document.getElementById('p-title').value,
    tag: document.getElementById('p-tag').value,
    desc: document.getElementById('p-desc').value,
    link: document.getElementById('p-link').value
  });
  saveProjects(list); renderProjects(); closeModal();
  document.getElementById('proj-form').reset();
}
function deleteProject(i){ const list = loadProjects(); list.splice(i,1); saveProjects(list); renderProjects(); }
function openModal(){ const m=document.getElementById('modal-bg'); if(m) m.classList.add('open'); }
function closeModal(){ const m=document.getElementById('modal-bg'); if(m) m.classList.remove('open'); }
document.addEventListener('DOMContentLoaded', ()=>{
  const modalBg = document.getElementById('modal-bg');
  if(modalBg) modalBg.addEventListener('click', e=>{ if(e.target.id==='modal-bg') closeModal(); });
  const filters = document.getElementById('filters');
  if(filters) filters.addEventListener('click', e=>{
    if(e.target.classList.contains('filter-btn')){
      document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
      e.target.classList.add('active');
      activeFilter = e.target.dataset.f;
      renderProjects();
    }
  });
  renderProjects();
});

/* ---------- testimonials ---------- */
const TESTIS = [
  {q:'"Karel jarang sekali sekadar mengirim mockup — dia benar-benar memahami cara kerja produk kami sebelum mendesain apa pun."', w:'Dina Prasetya — Product Lead, Nimbus App', i:'DP'},
  {q:'"Kombinasi desain dan kemampuan coding-nya bikin proses development jadi jauh lebih cepat dari biasanya."', w:'Bimo Saputra — CTO, Loop Studio', i:'BS'},
  {q:'"Detail kecil yang dia perhatikan di interaksi bikin produk kami terasa jauh lebih matang."', w:'Sarah Wijaya — Founder, Hijau Kitchen', i:'SW'}
];
let tIdx=0;
function renderDots(){
  const d = document.getElementById('t-dots');
  if(!d) return;
  d.innerHTML = TESTIS.map((_,i)=>`<span class="tdot ${i===tIdx?'active':''}" onclick="setTesti(${i})"></span>`).join('');
}
function setTesti(i){
  tIdx=i;
  const q = document.getElementById('t-quote'), w = document.getElementById('t-who'), av = document.getElementById('t-avatar');
  if(!q||!w) return;
  q.textContent = TESTIS[i].q;
  w.innerHTML = TESTIS[i].w.replace(/^([^—]+)—/, '<strong>$1</strong>—');
  if(av) av.textContent = TESTIS[i].i;
  renderDots();
}
document.addEventListener('DOMContentLoaded', ()=>{
  if(document.getElementById('t-dots')){
    renderDots();
    setInterval(()=> setTesti((tIdx+1)%TESTIS.length), 5000);
  }
});

/* ---------- contact form ---------- */
function sendMail(e){
  e.preventDefault();
  const name = document.getElementById('c-name').value;
  const email = document.getElementById('c-email').value;
  const msg = document.getElementById('c-msg').value;
  window.location.href = `mailto:halo@karel.dev?subject=${encodeURIComponent('Pesan dari '+name)}&body=${encodeURIComponent(msg+'\n\nBalas ke: '+email)}`;
}
