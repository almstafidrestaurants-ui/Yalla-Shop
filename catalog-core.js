/* Local catalog stays in the site; Firestore holds overrides and small display photos. */
(() => {
  'use strict';
  const bases=new Map(), arrays=new Map(); let cloudRows=[], sectionRows=[];
  const labels={market:'سوبر ماركت / منظفات',vegetables:'خضرة وفواكه',butcher:'ملحمة',poultry:'دواجن',library:'مكتبة',restaurant0:'RAAD Resto Café'};
  function register(group,list,n){
    arrays.set(group,list);
    list.forEach((p,i)=>{p.id=n*100000+i;p.price=p.price==null?null:Number(p.price);p.group=group;p.ysKey=group+'_'+i;if(group==='poultry')p.category='poultry';bases.set(p.ysKey,{...p});});
  }
  const safeText=x=>typeof x==='string'&&x.length<=250&&!/[<>"]/.test(x);
  function valid(p){return p && /^[a-zA-Z0-9_-]{1,100}$/.test(p.ysKey) && Object.hasOwn(labels,p.group) && safeText(p.name)&&p.name.trim()&&safeText(p.unit)&&safeText(p.description)&&safeText(p.category)&&p.category && (Number.isFinite(p.price)&&p.price>=0&&p.price<=1e12 || p.price===null&&p.group==='restaurant0') && Number.isSafeInteger(p.id) && typeof p.image==='string' && /^(images\/[^\n\r"<>\\]*|https:\/\/[^\s"<>]+|)$/.test(p.image) && (!p.photoKey||/^photo_[a-zA-Z0-9_-]+$/.test(p.photoKey));}
  const imageOK=x=>typeof x==='string'&&x.length<=2000&&/^(images\/[^\n\r"<>\\]*|https:\/\/[^\s"<>]+|)$/.test(x);
  function validSection(s){return s&&/^section_[a-zA-Z0-9_-]{1,80}$/.test(s.id)&&safeText(s.name)&&s.name.trim()&&s.name.length<=100&&imageOK(s.image)&&typeof s.hidden==='boolean'&&Number.isFinite(s.order)&&s.order>=0&&s.order<=1000000&&typeof s.photoKey==='string'&&(!s.photoKey||/^photo_[a-zA-Z0-9_-]+$/.test(s.photoKey));}
  function sections(includeHidden=false){return sectionRows.filter(s=>includeHidden||!s.hidden).sort((a,b)=>a.order-b.order||a.name.localeCompare(b.name,'ar'));}
  function active(group){return !group.startsWith('section_')||sectionRows.some(s=>s.id===group&&!s.hidden);}
  function all(includeHidden=false){return [...arrays.values()].flat().filter(p=>includeHidden||active(p.group));}
  function find(key,includeHidden=false){return all(includeHidden).find(p=>p.ysKey===key);}
  function setSections(rows){
    sectionRows=rows.filter(validSection).map(s=>({...s}));
    for(const key of [...arrays.keys()])if(key.startsWith('section_')&&!sectionRows.some(s=>s.id===key)){arrays.delete(key);delete labels[key];}
    for(const s of sectionRows){labels[s.id]=s.name;if(!arrays.has(s.id))arrays.set(s.id,[]);}
    apply(cloudRows);
    window.dispatchEvent(new CustomEvent('yalla-sections-change'));
  }
  function apply(rows){
    cloudRows=rows;
    const merged=new Map([...bases].map(([key,p])=>[key,{...p}]));
    rows.forEach(row=>{
      if(row.deleted===true){merged.delete(row.ysKey);return;}
      if(valid(row))merged.set(row.ysKey,{...(bases.get(row.ysKey)||{}),...row});
    });
    for(const [group,arr] of arrays){
      const next=[...merged.values()].filter(p=>p.group===group);
      // Preserve object identity for any open view with retained product references.
      const old=new Map(arr.map(p=>[p.ysKey,p]));
      arr.splice(0,arr.length,...next.map(p=>{const obj=old.get(p.ysKey)||{};Object.assign(obj,p);if(p.photoKey)obj.image='placeholder.svg#'+p.photoKey;return obj;}));
    }
    window.dispatchEvent(new CustomEvent('yalla-catalog-change'));
    refreshShowcase();
  }
  function refreshShowcase(){
    document.querySelectorAll('[data-ys-key]').forEach(card=>{
      const p=find(card.dataset.ysKey);card.hidden=!p||p.group!==card.dataset.ysGroup||(card.classList.contains('ys-clean-card')&&p.category!=='cleaning');if(!p)return;
      const image=card.querySelector('img');if(image)image.src=p.image;
      const title=card.querySelector('.ys-slide-name, .ys-clean-open strong');if(title)title.textContent=p.name;
      const price=card.querySelector('.ys-slide-price, .ys-clean-open small');if(price)price.textContent=Number(p.price).toLocaleString('en-US')+' ل.ل';
      const heart=card.querySelector('[data-fav-price]');if(heart){heart.dataset.favPrice=p.price;heart.dataset.favName=p.name;heart.dataset.favImg=p.image;}
    });
  }
  window.YallaRegistry={register,all,find,apply,valid,labels,sections,setSections,validSection,base:key=>bases.get(key),rows:()=>cloudRows};
})();
