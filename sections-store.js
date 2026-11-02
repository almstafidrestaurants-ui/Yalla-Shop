/* New owner-created sections use one reusable customer view and the shared cart. */
document.addEventListener('DOMContentLoaded',()=>{
  'use strict';
  const R=window.YallaRegistry,home=document.getElementById('homeScreen');let current=null;
  const screen=document.createElement('section');screen.id='dynamicSectionScreen';screen.className='supermarket-screen';screen.hidden=true;
  screen.innerHTML='<header class="dynamic-header"><button type="button" id="dynamicBack">❮ رجوع</button><h2 id="dynamicTitle"></h2><button type="button" id="dynamicCart">السلة</button></header><div class="dynamic-tools"><input id="dynamicSearch" placeholder="ابحث داخل القسم" aria-label="بحث داخل القسم"><small id="dynamicCount"></small></div><div class="dynamic-scroll"><img id="dynamicBanner" alt=""><div id="dynamicProducts"></div><p id="dynamicEmpty">لا توجد أصناف في هذا القسم بعد.</p></div>';
  home.append(screen);
  const $=id=>document.getElementById(id);
  const picture=s=>s.photoKey?'placeholder.svg#'+s.photoKey:(s.image||'placeholder.svg');
  function close(){screen.hidden=true;current=null;home.classList.remove('market-open');}
  function open(id,push=true){
    const section=R.sections().find(s=>s.id===id);if(!section)return;
    home.querySelectorAll('section.supermarket-screen').forEach(s=>s.hidden=true);
    document.getElementById('ysCategoriesModal').hidden=true;document.getElementById('ysFavorites').hidden=true;
    home.classList.add('market-open');current=id;$('dynamicSearch').value='';screen.hidden=false;
    if(push)history.pushState({ysDynamicSection:id},'',location.href);renderProducts();screen.querySelector('.dynamic-scroll').scrollTop=0;
  }
  function renderProducts(){
    if(!current)return;const section=R.sections().find(s=>s.id===current);
    if(!section){close();return;}
    $('dynamicTitle').textContent=section.name;$('dynamicBanner').src=picture(section);
    const query=$('dynamicSearch').value.trim().toLowerCase();const products=R.all().filter(p=>p.group===current&&p.name.toLowerCase().includes(query));
    $('dynamicCount').textContent=products.length.toLocaleString('en-US')+' أصناف';$('dynamicEmpty').hidden=products.length>0;$('dynamicProducts').replaceChildren();
    products.forEach(p=>{
      const card=document.createElement('article');card.className='dynamic-product';card.dataset.ysKey=p.ysKey;card.dataset.ysGroup=p.group;
      const img=document.createElement('img');img.src=p.image||'placeholder.svg';img.alt=p.name;img.loading='lazy';
      const title=document.createElement('h3');title.textContent=p.name;const unit=document.createElement('p');unit.textContent=[p.unit,p.description].filter(Boolean).join(' · ');
      const price=document.createElement('strong');price.className='dynamic-price';price.textContent=Number(p.price).toLocaleString('en-US')+' ل.ل';
      const add=document.createElement('button');add.type='button';add.className='dynamic-add';add.textContent='+ إضافة';add.setAttribute('aria-label','إضافة '+p.name+' للسلة');add.onclick=()=>window.yallaAddDynamicProduct(p.ysKey);
      const fav=document.createElement('button');fav.type='button';fav.className='ys-fav-toggle';fav.textContent='♡';fav.setAttribute('aria-label','إضافة للمفضلة');
      Object.assign(fav.dataset,{favId:p.ysKey,favName:p.name,favPrice:String(p.price),favImg:p.image||'placeholder.svg',favCategory:section.name});
      card.append(img,title,unit,price,add,fav);$('dynamicProducts').append(card);
    });
  }
  function sectionTile(section,modal=false){
    const tile=document.createElement('button');tile.type='button';tile.dataset.dynamicSection=section.id;tile.dataset.category=section.name;
    tile.className=modal?'ys-premium-tile ys-dynamic-tile':'category-card category-visible pro-visible';
    if(modal)tile.dataset.search=section.name;
    const pictureBox=document.createElement('div');pictureBox.className='category-picture';const img=document.createElement('img');img.alt='';img.loading='lazy';img.src=picture(section);
    const label=document.createElement(modal?'strong':'span');label.textContent=section.name;
    if(modal){tile.append(img,label);}else{pictureBox.append(img);tile.append(pictureBox,label);}
    tile.addEventListener('click',()=>open(section.id));return tile;
  }
  function renderSections(){
    document.querySelectorAll('[data-dynamic-section]').forEach(el=>el.remove());
    for(const section of R.sections()){
      document.getElementById('categoriesGrid').append(sectionTile(section));
      document.getElementById('ysCategoriesModalGrid').append(sectionTile(section,true));
    }
    const premiumSearch=$('ysPremiumCategorySearch');if(premiumSearch)premiumSearch.dispatchEvent(new Event('input'));
    renderProducts();appendSearch();
  }
  function appendSearch(){
    const results=$('globalSearchResults'),query=$('searchInput').value.trim().toLowerCase();if(!results)return;
    results.querySelectorAll('.dynamic-search-result').forEach(e=>e.remove());if(!query)return;
    const matches=[...R.sections().filter(s=>s.name.toLowerCase().includes(query)).map(s=>({id:s.id,name:s.name,image:picture(s)})),...R.all().filter(p=>p.group.startsWith('section_')&&p.name.toLowerCase().includes(query)).map(p=>({id:p.group,name:p.name+' · '+Number(p.price).toLocaleString('en-US')+' ل.ل',image:p.image}))];
    matches.slice(0,50).forEach(match=>{
      const button=document.createElement('button');button.type='button';button.className='dynamic-search-result';
      const img=document.createElement('img');img.src=match.image||'placeholder.svg';img.alt='';img.loading='lazy';const text=document.createElement('span');text.textContent=match.name;
      button.append(img,text);button.onclick=e=>{e.stopImmediatePropagation();results.hidden=true;$('searchInput').value='';open(match.id);};results.append(button);
    });if(matches.length){results.hidden=false;results.querySelector('.global-search-empty')?.remove();}
  }
  $('dynamicSearch').oninput=renderProducts;
  $('dynamicBack').onclick=()=>{close();history.replaceState({ysHome:true},'',location.href);};
  $('dynamicCart').onclick=()=>document.querySelector('.bottom-nav [data-page="السلة"]').click();
  $('searchInput').addEventListener('input',appendSearch);$('searchForm').addEventListener('submit',appendSearch);
  window.addEventListener('yalla-sections-change',renderSections);window.addEventListener('yalla-catalog-change',()=>{renderProducts();appendSearch();});
  window.addEventListener('popstate',e=>{if(e.state?.ysDynamicSection)open(e.state.ysDynamicSection,false);else close();});
  document.querySelector('.bottom-nav [data-page="الرئيسية"]')?.addEventListener('click',close,true);
  window.YallaSectionView={open,close};renderSections();
});
