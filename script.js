const BASE_DOMAIN='greatsolomonmpservices.com';
const META={
  'client-management':{subdomain:'core1',icon:'person_search',accent:'#2563eb',family:'core'},'hris':{subdomain:'core2',icon:'badge',accent:'#4f46e5',family:'core'},'employee-development':{subdomain:'edcb',icon:'school',accent:'#7c3aed',family:'core'},'governance-safety':{subdomain:'core4',icon:'shield_person',accent:'#0891b2',family:'core'},'financial-management':{subdomain:'fm',icon:'account_balance',accent:'#059669',family:'enterprise'},'supply-chain':{subdomain:'scim',icon:'inventory_2',accent:'#d97706',family:'enterprise'},'fleet-management':{subdomain:'ftm',icon:'local_shipping',accent:'#dc2626',family:'enterprise'},'facilities':{subdomain:'fam',icon:'apartment',accent:'#0f766e',family:'enterprise'},'business-intelligence':{subdomain:'bias',icon:'monitoring',accent:'#4338ca',family:'enterprise'},'crm-sales':{subdomain:'crm',icon:'handshake',accent:'#be185d',family:'enterprise'}
};
const escapeHtml=value=>String(value).replace(/[&<>'"]/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));
const dashboardUrl=id=>`https://${META[id].subdomain}.${BASE_DOMAIN}/`;
const grid=document.getElementById('grid'),searchInput=document.getElementById('module-search'),resultCount=document.getElementById('result-count');
let activeFilter='all';
function cardHtml(system,index){const meta=META[system.id];const modules=system.modules.map(item=>`<div class="module">${escapeHtml(typeof item==='string'?item:item.name)}</div>`).join('');const host=`${meta.subdomain}.${BASE_DOMAIN}`;return `<article class="card" tabindex="0" data-url="${dashboardUrl(system.id)}" style="--accent:${meta.accent}"><div class="card-bar"></div><div class="card-body"><div class="card-top"><span class="card-icon material-symbols-outlined">${meta.icon}</span><span class="card-index">${String(index+1).padStart(2,'0')}</span></div><p class="card-category">${escapeHtml(system.category)}</p><h3>${escapeHtml(system.title)}</h3><p class="card-desc">${escapeHtml(system.description)}</p></div><details><summary><span>${system.modules.length} modules</span><span class="material-symbols-outlined">expand_more</span></summary><div class="modules">${modules}</div></details><div class="card-footer"><span class="host">${host}</span><a class="open" href="${dashboardUrl(system.id)}"><span>Open dashboard</span><span class="material-symbols-outlined">arrow_forward</span></a></div></article>`;}
function render(){const query=searchInput.value.trim().toLowerCase();const filtered=SUBSYSTEMS.filter(system=>{const meta=META[system.id];const searchable=[system.title,system.category,system.description,...system.modules.map(item=>typeof item==='string'?item:item.name)].join(' ').toLowerCase();return(activeFilter==='all'||meta.family===activeFilter)&&(!query||searchable.includes(query));});resultCount.textContent=filtered.length===SUBSYSTEMS.length?`Showing all ${filtered.length} systems`:`${filtered.length} system${filtered.length===1?'':'s'} found`;grid.innerHTML=filtered.length?filtered.map((system,index)=>cardHtml(system,index)).join(''):`<div class="empty"><span class="material-symbols-outlined">search_off</span><strong>No matching system found</strong><div>Try a module name such as payroll, applicant, fleet, or report.</div></div>`;}
searchInput.addEventListener('input',render);
document.querySelectorAll('.filter').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('.filter').forEach(item=>item.classList.remove('active'));button.classList.add('active');activeFilter=button.dataset.filter;render();}));
document.addEventListener('keydown',event=>{if(event.key==='/'&&document.activeElement!==searchInput){event.preventDefault();searchInput.focus();}});
grid.addEventListener('click',event=>{const card=event.target.closest('.card');if(card&&!event.target.closest('a,summary,details'))window.location.href=card.dataset.url;});
grid.addEventListener('keydown',event=>{const card=event.target.closest('.card');if(card&&(event.key==='Enter'||event.key===' ')){event.preventDefault();window.location.href=card.dataset.url;}});
render();
function playScrollHint(){
  if(location.hash||window.scrollY>4||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  let cancelled=false;
  const cancel=()=>{cancelled=true;};
  ['wheel','touchstart','pointerdown','keydown'].forEach(type=>window.addEventListener(type,cancel,{once:true,passive:true}));
  setTimeout(()=>{
    if(cancelled||window.scrollY>4)return;
    const systemsTop=document.getElementById('systems').offsetTop;
    const peekDistance=Math.min(180,Math.max(72,systemsTop-window.innerHeight+120));
    window.scrollTo({top:peekDistance,behavior:'smooth'});
    setTimeout(()=>{if(!cancelled)window.scrollTo({top:0,behavior:'smooth'});},750);
  },900);
}
if(document.readyState==='complete')playScrollHint();else window.addEventListener('load',playScrollHint,{once:true});
const mobileMenu=document.querySelector('.mobile-menu');
const topbar=document.querySelector('.topbar');
function setMobileMenu(open){
  topbar.classList.toggle('menu-open',open);
  mobileMenu.setAttribute('aria-expanded',String(open));
  mobileMenu.setAttribute('aria-label',open?'Close navigation':'Open navigation');
  mobileMenu.querySelector('.material-symbols-outlined').textContent=open?'close':'menu';
}
mobileMenu.addEventListener('click',()=>setMobileMenu(!topbar.classList.contains('menu-open')));
document.querySelectorAll('#mobile-navigation a').forEach(link=>link.addEventListener('click',()=>setMobileMenu(false)));
document.addEventListener('click',event=>{if(topbar.classList.contains('menu-open')&&!topbar.contains(event.target))setMobileMenu(false);});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&topbar.classList.contains('menu-open'))setMobileMenu(false);});

// Google Analytics 4 Portal Outbound Routing Telemetry
function trackPortalRouting(destination, label) {
  const isGtagReady = typeof gtag === 'function';
  console.log('%c[GA4 Telemetry] Portal Routing Click:', 'color: #2563eb; font-weight: bold;', {
    destination: destination,
    label: label || destination,
    gtagReady: isGtagReady,
    time: new Date().toLocaleTimeString()
  });

  if (isGtagReady) {
    gtag('event', 'portal_route_click', {
      event_category: 'Portal Routing',
      destination: destination,
      event_label: label || destination,
      transport_type: 'beacon'
    });
    console.log('%c[GA4 Telemetry] -> Event sent to Google Analytics (G-ZB2487101N)', 'color: #059669; font-weight: bold;');
  } else {
    console.warn('[GA4 Telemetry] Warning: gtag() is not available (check if blocked by ad-blocker or script error).');
  }
}

// Make accessible globally and in DevTools Console
window.trackPortalRouting = trackPortalRouting;

document.addEventListener('DOMContentLoaded', () => {
  console.log('[GA4 Telemetry] Initialized on page. gtag available:', typeof gtag === 'function');
  // Hero CTA Buttons
  document.querySelectorAll('.hero-actions a').forEach(btn => {
    const text = (btn.textContent || '').toLowerCase();
    if (text.includes('job')) {
      btn.addEventListener('click', () => trackPortalRouting('job_seeker', 'Hero Find a Job'));
    } else if (text.includes('talent')) {
      btn.addEventListener('click', () => trackPortalRouting('employer', 'Hero Hire Talent'));
    }
  });

  // Audience Path Cards
  document.querySelectorAll('.audience-card').forEach(card => {
    const text = (card.textContent || '').toLowerCase();
    if (text.includes('job seeker') || text.includes('applicant')) {
      card.addEventListener('click', () => trackPortalRouting('job_seeker', 'Audience Job Seeker'));
    } else if (text.includes('employer') || text.includes('client')) {
      card.addEventListener('click', () => trackPortalRouting('employer', 'Audience Employer Client'));
    } else if (text.includes('deployed employee')) {
      card.addEventListener('click', () => trackPortalRouting('employee', 'Audience Deployed Employee'));
    } else if (text.includes('staff')) {
      card.addEventListener('click', () => trackPortalRouting('staff', 'Audience Staff Access'));
    }
  });

  // Subsystem Cards in Catalog Grid
  document.getElementById('grid')?.addEventListener('click', event => {
    const card = event.target.closest('.card');
    if (card && card.dataset.url) {
      const title = card.querySelector('h3')?.textContent || 'Subsystem';
      trackPortalRouting('subsystem', title);
    }
  });
});