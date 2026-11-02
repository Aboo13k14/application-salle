const CACHE="salle-v1";
const FILES=["./", "index.html", "manifest.webmanifest", "icons/icon-192.png", "icons/icon-512.png", "icons/apple-touch-icon.png", "img/bulgares-1.webp", "img/bulgares-2.webp", "img/crunch_inverse-1.webp", "img/crunch_inverse-2.webp", "img/crunch_poulie-1.webp", "img/crunch_poulie-2.webp", "img/curl_incline-1.webp", "img/curl_incline-2.webp", "img/dc_barre-1.webp", "img/dc_barre-2.webp", "img/dc_incline-1.webp", "img/dc_incline-2.webp", "img/dips-1.webp", "img/dips-2.webp", "img/elev_lat_halt-1.webp", "img/elev_lat_halt-2.webp", "img/ext_tri_oh-1.webp", "img/ext_tri_oh-2.webp", "img/hammer-1.webp", "img/hammer-2.webp", "img/leg_curl-1.webp", "img/leg_curl-2.webp", "img/leg_ext-1.webp", "img/leg_ext-2.webp", "img/mollets_assis-1.webp", "img/mollets_assis-2.webp", "img/oiseau_poulie-1.webp", "img/oiseau_poulie-2.webp", "img/rdl-1.webp", "img/rdl-2.webp", "img/th_poulie-1.webp", "img/th_poulie-2.webp", "img/tv_serre-1.webp", "img/tv_serre-2.webp"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()));});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener("fetch",e=>{const r=e.request;if(r.method!=="GET")return;const u=new URL(r.url);
  if(u.origin===location.origin){
    // page : réseau d'abord (pour recevoir les mises à jour), cache si hors ligne
    if(r.mode==="navigate"){e.respondWith(fetch(r).then(res=>{const cp=res.clone();caches.open(CACHE).then(c=>c.put("index.html",cp));return res;}).catch(()=>caches.match("index.html")));return;}
    e.respondWith(caches.match(r).then(m=>m||fetch(r).then(res=>{const cp=res.clone();caches.open(CACHE).then(c=>c.put(r,cp));return res;})));return;}
  if(u.host.endsWith("fonts.googleapis.com")||u.host.endsWith("fonts.gstatic.com")){
    e.respondWith(caches.match(r).then(m=>m||fetch(r).then(res=>{const cp=res.clone();caches.open(CACHE).then(c=>c.put(r,cp));return res;}).catch(()=>m)));}
});
