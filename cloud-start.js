(() => {
  const ready = document.readyState==='loading'?new Promise(r=>document.addEventListener('DOMContentLoaded',r,{once:true})):Promise.resolve();
  let api=null,connected=false,lastError='',cache=new Map(),pending=new Map();
  const setState=(ok,message)=>{connected=ok;lastError=message;window.dispatchEvent(new CustomEvent('yalla-cloud-state',{detail:{connected:ok,message}}));};
  async function start(){
    await ready;
    if(!window.YALLA_CONFIG?.firebase?.projectId){setState(false,'يلزم إدخال إعدادات Firebase لتشغيل المزامنة.');return null;}
    try {
      const m=await import('./firebase-client.js');api=await m.connect();
      const loaded={products:false,sections:false};
      const done=key=>{loaded[key]=true;if(loaded.products&&loaded.sections)setState(true,'متصل — التعديلات محفوظة ومزامنة');};
      api.watch(rows=>{window.YallaRegistry?.apply(rows);done('products');},e=>{loaded.products=false;setState(false,m.explain(e));});
      api.watchSections(rows=>{window.YallaRegistry?.setSections(rows);done('sections');},e=>{loaded.sections=false;setState(false,m.explain(e));});
      return api;
    } catch(e){setState(false,'تعذر الاتصال بـ Firebase. تحقق من الإنترنت والإعدادات.');return null;}
  }
  const initialization=start();
  async function photo(key){
    if(cache.has(key))return cache.get(key);
    if(pending.has(key))return pending.get(key);
    const request=(async()=>{const a=await initialization;if(!a)return null;const data=await a.photo(key);if(data){cache.set(key,data);}return data;})();
    pending.set(key,request);try{return await request;}finally{pending.delete(key);}
  }
  // Read photo documents only for images approaching a visible viewport.
  const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(!e.isIntersecting)return;observer.unobserve(e.target);const img=e.target,key=img.dataset.cloudPhoto;photo(key).then(src=>{if(src&&img.dataset.cloudPhoto===key){img.src=src;img.style.visibility='';img.style.display='';}}).catch(()=>{});}),{rootMargin:'150px'});
  const scan=()=>document.querySelectorAll('img[src*="placeholder.svg#photo_"]').forEach(img=>{
    const match=img.getAttribute('src').match(/placeholder\.svg#(photo_[a-zA-Z0-9_-]+)/);if(!match||img.dataset.cloudPhoto===match[1])return;
    const key=match[1];img.dataset.cloudPhoto=key;
    // Avoid broken-image handlers in the original store while the photo is fetched.
    img.onerror=null;img.src='data:image/svg+xml,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="94" height="94"><rect width="94" height="94" fill="#e9f0f5"/></svg>');
    observer.observe(img);
  });
  ready.then(()=>{new MutationObserver(scan).observe(document.body,{subtree:true,childList:true,attributes:true,attributeFilter:['src']});scan();});
  window.YallaCloud={
    get api(){return api;},get state(){return {connected,message:lastError};},ready:initialization,photo,
    async ensureFresh(){const a=await initialization;if(!a)return !window.YALLA_CONFIG?.firebase?.projectId&&navigator.onLine;try{const [sections,rows]=await Promise.all([a.refreshSections(),a.refresh()]);window.YallaRegistry.setSections(sections);window.YallaRegistry.apply(rows);setState(true,'متصل');return true;}catch(e){setState(false,'تعذر تأكيد آخر الأسعار');return false;}}
  };
})();
