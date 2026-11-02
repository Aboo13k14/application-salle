const CACHE="salle-v2";
const FILES=["./", "index.html", "manifest.webmanifest", "icon-192.png", "icon-512.png", "apple-touch-icon.png", "bulgares-1.webp", "bulgares-2.webp", "crunch_inverse-1.webp", "crunch_inverse-2.webp", "crunch_poulie-1.webp", "crunch_poulie-2.webp", "curl_incline-1.webp", "curl_incline-2.webp", "dc_barre-1.webp", "dc_barre-2.webp", "dc_incline-1.webp", "dc_incline-2.webp", "dips-1.webp", "dips-2.webp", "elev_lat_halt-1.webp", "elev_lat_halt-2.webp", "ext_tri_oh-1.webp", "ext_tri_oh-2.webp", "hammer-1.webp", "hammer-2.webp", "leg_curl-1.webp", "leg_curl-2.webp", "leg_ext-1.webp", "leg_ext-2.webp", "mollets_assis-1.webp", "mollets_assis-2.webp", "oiseau_poulie-1.webp", "oiseau_poulie-2.webp", "rdl-1.webp", "rdl-2.webp", "th_poulie-1.webp", "th_poulie-2.webp", "tv_serre-1.webp", "tv_serre-2.webp"];
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
