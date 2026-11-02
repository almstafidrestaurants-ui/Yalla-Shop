(() => {
  'use strict';
  const $=id=>document.getElementById(id),R=window.YallaRegistry;
  let base=[],overrides=[],api=null,current=null,newPhoto=null,photoBusy=false,authorized=false,demo=false,limit=40;
  const groupOrder=['market','vegetables','butcher','poultry','library','restaurant0'];
  const fallback={market:['food','drinks','Bakery','dairy','coffee','spices','Snacks','IceCream','Purchases','cleaning'],vegetables:['Vegetables','fruits'],butcher:['meat'],poultry:['poultry'],library:['pens','notebooks','toys','other'],restaurant0:['sandwiches','burgers','meals','pizza','sauces']};
  groupOrder.forEach(g=>{for(const id of ['group','filter']){const o=document.createElement('option');o.value=g;o.textContent=R.labels[g];$(id).append(o);}});
  function refreshGroups(){
    for(const id of ['group','filter']){
      const select=$(id),value=select.value;select.replaceChildren();
      if(id==='filter'){const option=document.createElement('option');option.value='';option.textContent='كل الأقسام';select.append(option);}
      for(const group of [...groupOrder,...R.sections(true).map(s=>s.id)]){const option=document.createElement('option');option.value=group;option.textContent=R.labels[group]+(R.sections(true).find(s=>s.id===group)?.hidden?' (مخفي)':'');select.append(option);}
      if([...select.options].some(o=>o.value===value))select.value=value;
    }
  }
  function items(){const map=new Map(base.map(p=>[p.ysKey,{...p}]));overrides.forEach(p=>map.set(p.ysKey,{...(map.get(p.ysKey)||{}),...p}));return [...map.values()];}
  const notify=(message,error=false)=>{$('cloudState').textContent=message;$('cloudState').classList.toggle('error',error);};
  function render(){
    const query=$('search').value.trim().toLowerCase(),group=$('filter').value;
    const shown=items().filter(p=>(!group||p.group===group)&&(!$('showDeleted').checked?!p.deleted:true)&&p.name.toLowerCase().includes(query));
    $('count').textContent=shown.length.toLocaleString('en-US');$('products').replaceChildren();
    shown.slice(0,limit).forEach(p=>{
      const card=document.createElement('article');card.className='product'+(p.deleted?' deleted':'');
      const img=document.createElement('img');img.alt='';img.loading='lazy';if(p.photoKey)img.src='placeholder.svg#'+p.photoKey;else img.src=p.image||'placeholder.svg';
      const info=document.createElement('div');info.className='info';
      const title=document.createElement('h3');title.textContent=p.name+(p.deleted?' (محذوف)':'');
      const sub=document.createElement('small');sub.textContent=R.labels[p.group]+' · '+p.category+' · '+(p.unit||'');
      const price=document.createElement('b');price.textContent=p.price==null?'السعر عند الطلب':Number(p.price).toLocaleString('en-US')+' ل.ل';
      const edit=document.createElement('button');edit.textContent='تعديل';edit.onclick=()=>open(p);info.append(title,sub,price);card.append(img,info,edit);$('products').append(card);
    });$('more').hidden=shown.length<=limit;
  }
  function categories(selected){const group=$('group').value;const choices=[...new Set([...(fallback[group]||['عام']),...base.filter(p=>p.group===group).map(p=>p.category),selected].filter(Boolean))];$('category').replaceChildren();choices.forEach(v=>{const o=document.createElement('option');o.value=v;o.textContent=v;$('category').append(o);});if(selected)$('category').value=selected;}
  function open(p){
    current=p?{...p}:{ysKey:'new_'+crypto.randomUUID().replace(/-/g,''),id:Date.now()*100+Math.floor(Math.random()*100),group:'market',category:'food',name:'',price:0,unit:'',description:'',image:'',deleted:false};
    newPhoto=null;$('file').value='';$('editTitle').textContent=p?'تعديل الصنف':'إضافة صنف';
    for(const k of ['name','unit','description','image'])$(k).value=current[k]||'';
    $('group').value=current.group;categories(current.category);$('price').value=current.price==null?'':String(current.price);
    $('preview').src=current.image||'placeholder.svg';if(current.photoKey)window.YallaCloud.photo(current.photoKey).then(src=>{if(src&&current?.ysKey===p?.ysKey)$('preview').src=src;}).catch(()=>{});
    $('delete').hidden=!p||!!p.deleted;$('restore').hidden=!p;$('editMessage').textContent=demo?'وضع المعاينة فقط — الحفظ غير متاح.':'';$('save').disabled=demo;$('edit').showModal();
  }
  $('group').onchange=()=>categories();$('close').onclick=()=>$('edit').close();$('add').onclick=()=>open();
  $('search').oninput=$('filter').onchange=$('showDeleted').onchange=()=>{limit=40;render();};$('more').onclick=()=>{limit+=40;render();};
  $('demo').onclick=()=>{demo=true;authorized=false;$('setup').hidden=true;$('dashboard').hidden=false;renderSections();notify('معاينة محلية — لم يتم الاتصال بقاعدة بيانات، ولا يمكن حفظ التعديلات.');render();};
  function digits(v){return v.replace(/[٠-٩]/g,c=>String(c.charCodeAt(0)-1632)).replace(/[۰-۹]/g,c=>String(c.charCodeAt(0)-1776));}
  $('price').oninput=()=>{$('price').value=digits($('price').value);};
  async function compress(file){
    if(!file.type.startsWith('image/'))throw Error('اختر ملف صورة.');
    if(file.size>30*1024*1024)throw Error('اختر صورة أقل من 30 MB.');
    const url=URL.createObjectURL(file);try{
      const img=await new Promise((resolve,reject)=>{const i=new Image();i.onload=()=>resolve(i);i.onerror=()=>reject(Error('تعذر فتح الصورة. جرّب JPG أو PNG أو WebP.'));i.src=url;});
      let side=512;
      for(let n=0;n<10;n++){
        const ratio=Math.min(1,side/Math.max(img.naturalWidth,img.naturalHeight));const c=document.createElement('canvas');c.width=Math.max(1,Math.round(img.naturalWidth*ratio));c.height=Math.max(1,Math.round(img.naturalHeight*ratio));const ctx=c.getContext('2d');ctx.fillStyle='white';ctx.fillRect(0,0,c.width,c.height);ctx.drawImage(img,0,0,c.width,c.height);const data=c.toDataURL('image/jpeg',.76);
        if(data.length<=96000)return data;side=Math.floor(side*.8);
      }throw Error('تعذر ضغط الصورة إلى الحجم المناسب. اختر صورة أخرى.');
    }finally{URL.revokeObjectURL(url);}
  }
  $('file').onchange=async()=>{const file=$('file').files[0];if(!file)return;photoBusy=true;$('save').disabled=true;$('editMessage').textContent='جاري ضغط الصورة…';try{newPhoto=await compress(file);$('preview').src=newPhoto;$('editMessage').textContent='جاهزة للحفظ — '+Math.ceil(newPhoto.length/1024)+' KB تقريبًا داخل قاعدة البيانات.';}catch(e){newPhoto=null;$('editMessage').textContent=e.message;}finally{photoBusy=false;$('save').disabled=demo;}};
  $('removePhoto').onclick=()=>{newPhoto=null;current.photoKey='';current.image='';$('image').value='';$('preview').src='placeholder.svg';$('file').value='';};
  $('image').onchange=()=>{newPhoto=null;current.photoKey='';$('preview').src=$('image').value||'placeholder.svg';};
  async function action(fn){
    if(!authorized||demo){$('editMessage').textContent='ادخل بحساب المالك أولاً.';return;}
    if(photoBusy)return;
    const buttons=[...$('editor').querySelectorAll('button')];buttons.forEach(b=>b.disabled=true);$('editMessage').textContent='جاري الحفظ…';
    try{await fn();$('edit').close();notify('تم حفظ التعديل ومزامنته.');}catch(e){const {explain}=await import('./firebase-client.js');$('editMessage').textContent=e.message||explain(e);}finally{buttons.forEach(b=>b.disabled=false);}
  }
  $('editor').onsubmit=e=>{e.preventDefault();action(async()=>{
    const raw=digits($('price').value).replace(/,/g,'').trim();const group=$('group').value;
    const price=raw===''&&group==='restaurant0'?null:Number(raw);
    if(raw===''&&group!=='restaurant0')throw Error('أدخل السعر.');
    const p={ysKey:current.ysKey,id:current.id,group,category:$('category').value,name:$('name').value.trim(),price,unit:$('unit').value.trim(),description:$('description').value.trim(),image:$('image').value.trim(),photoKey:current.photoKey||'',deleted:false};
    if(!R.valid(p))throw Error('تحقق من السعر والاسم والرابط. لا تستخدم < أو > أو علامات اقتباس مزدوجة في النصوص.');
    const previous=overrides.find(x=>x.ysKey===p.ysKey)?.photoKey;
    await api.save(p,newPhoto,previous);
  });};
  $('delete').onclick=()=>{if(!confirm('إخفاء هذا الصنف عن الزبائن؟'))return;action(()=>api.save({...current,unit:current.unit||'',description:current.description||'',photoKey:current.photoKey||'',deleted:true},null,null));};
  $('restore').onclick=()=>{if(!confirm('إلغاء التعديلات واستعادة الأصل؟ الصنف المضاف حديثًا سيُزال.'))return;action(()=>api.reset(current.ysKey,overrides.find(p=>p.ysKey===current.ysKey)?.photoKey));};
  $('login').onsubmit=async e=>{e.preventDefault();const btn=$('login').querySelector('button');btn.disabled=true;try{await api.login($('password').value);$('password').value='';}catch(e){const {explain}=await import('./firebase-client.js');notify(explain(e),true);}finally{btn.disabled=false;}};
  $('logout').onclick=()=>api.logout();
  window.addEventListener('yalla-cloud-state',e=>{if(!demo)notify(e.detail.message,!e.detail.connected);});
  // Admin uses the same registry merge as the store, with the bundled catalog.
  window.addEventListener('yalla-catalog-change',()=>{overrides=R.rows();if(authorized)render();});
  let editingSection=null,sectionPhoto=null,sectionPhotoBusy=false,sectionOriginalPhoto='',sectionPhotoToken=0;
  function renderSections(){
    $('sectionList').replaceChildren();
    const list=R.sections(true);
    if(!list.length){const p=document.createElement('p');p.textContent='لا توجد أقسام مضافة بعد. الأقسام الأصلية تبقى كما هي.';$('sectionList').append(p);}
    list.forEach(section=>{
      const row=document.createElement('article');row.className='product'+(section.hidden?' deleted':'');
      const img=document.createElement('img');img.alt='';img.src=section.photoKey?'placeholder.svg#'+section.photoKey:(section.image||'placeholder.svg');
      const info=document.createElement('div');info.className='info';const title=document.createElement('h3');title.textContent=section.name+(section.hidden?' (مخفي)':'');
      const count=document.createElement('small');count.textContent=R.all(true).filter(p=>p.group===section.id).length.toLocaleString('en-US')+' أصناف';info.append(title,count);
      const add=document.createElement('button');add.textContent='إضافة صنف';add.className='ghost';add.onclick=()=>{open();$('group').value=section.id;categories();};
      const edit=document.createElement('button');edit.textContent='تعديل القسم';edit.onclick=()=>openSection(section);row.append(img,info,add,edit);$('sectionList').append(row);
    });
  }
  function openSection(section){
    editingSection=section?{...section}:{id:'section_'+crypto.randomUUID().replace(/-/g,''),name:'',image:'',photoKey:'',hidden:false,order:R.sections(true).length};
    sectionPhotoToken++;sectionPhotoBusy=false;sectionOriginalPhoto=editingSection.photoKey||'';sectionPhoto=null;$('sectionFile').value='';
    $('sectionEditTitle').textContent=section?'تعديل القسم':'إضافة قسم';$('sectionName').value=editingSection.name;$('sectionImage').value=editingSection.image;
    $('sectionOrder').value=editingSection.order;$('sectionHidden').checked=editingSection.hidden;
    $('sectionPreview').src=editingSection.image||'placeholder.svg';
    const id=editingSection.id;
    if(editingSection.photoKey)window.YallaCloud.photo(editingSection.photoKey).then(src=>{if(src&&editingSection?.id===id)$('sectionPreview').src=src;}).catch(()=>{});
    $('sectionMessage').textContent=demo?'المعاينة فقط — لا يمكن الحفظ.':'';$('sectionSave').disabled=demo;$('sectionEdit').showModal();
  }
  $('addSection').onclick=()=>openSection();$('sectionClose').onclick=()=>$('sectionEdit').close();
  $('sectionFile').onchange=async()=>{
    const file=$('sectionFile').files[0];if(!file)return;
    const token=++sectionPhotoToken;sectionPhotoBusy=true;$('sectionSave').disabled=true;$('sectionMessage').textContent='جاري ضغط صورة القسم…';
    try{const data=await compress(file);if(token!==sectionPhotoToken)return;sectionPhoto=data;$('sectionPreview').src=sectionPhoto;$('sectionMessage').textContent='الصورة جاهزة للحفظ.';}catch(e){if(token===sectionPhotoToken){sectionPhoto=null;$('sectionMessage').textContent=e.message;}}finally{if(token===sectionPhotoToken){sectionPhotoBusy=false;$('sectionSave').disabled=demo;}}
  };
  $('sectionImage').onchange=()=>{sectionPhoto=null;editingSection.photoKey='';$('sectionPreview').src=$('sectionImage').value||'placeholder.svg';};
  $('sectionRemovePhoto').onclick=()=>{sectionPhoto=null;editingSection.photoKey='';$('sectionImage').value='';$('sectionFile').value='';$('sectionPreview').src='placeholder.svg';};
  $('sectionEditor').onsubmit=async e=>{
    e.preventDefault();if(demo||!authorized){$('sectionMessage').textContent='ادخل بحساب المالك للحفظ.';return;}if(sectionPhotoBusy)return;
    const section={...editingSection,name:$('sectionName').value.trim(),image:$('sectionImage').value.trim(),order:Number($('sectionOrder').value),hidden:$('sectionHidden').checked};
    if(!R.validSection(section)||!Number.isInteger(section.order)){$('sectionMessage').textContent='تحقق من اسم القسم والرابط والترتيب.';return;}
    if(['سوبر ماركت','منظفات','خضرة وفواكه','خضار وفواكه','ملحمة','دواجن','مكتبة','مطاعم','حلويات'].includes(section.name)||Object.values(R.labels).some(name=>name.trim()===section.name&&R.labels[section.id]!==name)){$('sectionMessage').textContent='يوجد قسم بهذا الاسم. اختر اسمًا مختلفًا.';return;}
    const buttons=[...$('sectionEditor').querySelectorAll('button')];buttons.forEach(b=>b.disabled=true);$('sectionMessage').textContent='جاري حفظ القسم…';
    try{await api.saveSection(section,sectionPhoto,sectionOriginalPhoto);$('sectionEdit').close();notify('تم حفظ القسم. يمكنك إضافة الأصناف إليه الآن.');}catch(e){const {explain}=await import('./firebase-client.js');$('sectionMessage').textContent=e.message||explain(e);}finally{buttons.forEach(b=>b.disabled=false);}
  };
  window.addEventListener('yalla-sections-change',()=>{refreshGroups();renderSections();if(authorized||demo)render();});
  window.addEventListener('yalla-catalog-change',()=>{if(authorized||demo)renderSections();});
  async function init(){
    try{const response=await fetch('catalog.json');if(!response.ok)throw Error();base=await response.json();for(const [i,g] of groupOrder.entries()){const list=base.filter(p=>p.group===g);R.register(g,list,g==='restaurant0'?10:i+1);}base=groupOrder.flatMap(g=>R.all(true).filter(p=>p.group===g)).map(p=>({...p}));
      // Preserve published overrides if Firebase connected before catalog loading.
      if(R.rows().length)R.apply(R.rows());
    }catch(e){notify('تعذر تحميل الأصناف. افتح الصفحة من رابط HTTPS أو خادم محلي، وليس file://.',true);return;}
    api=await window.YallaCloud.ready;
    if(!api){$('setup').hidden=false;return;}
    api.observeAuth(user=>{authorized=!!user&&user.uid===window.YALLA_CONFIG.ownerUid;demo=false;$('login').hidden=authorized;$('dashboard').hidden=!authorized;$('logout').hidden=!user;if(user&&!authorized)notify('هذا الحساب ليس حساب المالك المصرّح له.',true);if(authorized){overrides=R.rows();refreshGroups();renderSections();render();}});
  }
  // cloud-start.js is deferred after this script.
  queueMicrotask(()=>window.addEventListener('DOMContentLoaded',init,{once:true}));
})();
