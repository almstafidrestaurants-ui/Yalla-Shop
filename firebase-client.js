import {initializeApp} from 'https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js';
import {getAuth,setPersistence,browserSessionPersistence,signInWithEmailAndPassword,signOut,onAuthStateChanged} from 'https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js';
import {getFirestore,collection,doc,onSnapshot,getDocsFromServer,getDoc,writeBatch,serverTimestamp} from 'https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js';
export function explain(e){return ({'permission-denied':'ليس لديك صلاحية. تحقق من UID وقواعد Firestore.','resource-exhausted':'بلغت الخدمة حصتها المجانية. حاول بعد تجدد الحصة.','auth/invalid-credential':'كلمة المرور غير صحيحة أو إعداد حساب المالك غير صحيح.','auth/too-many-requests':'محاولات كثيرة. حاول لاحقاً.','unavailable':'الاتصال بالخدمة غير متاح حالياً.'})[e.code]||'تعذرت العملية. تحقق من الإنترنت وإعدادات Firebase.';}
export async function connect(){
  const app=initializeApp(window.YALLA_CONFIG.firebase),db=getFirestore(app),auth=getAuth(app);
  await setPersistence(auth,browserSessionPersistence);
  const catalog=collection(db,'yallaProducts'),sections=collection(db,'yallaSections');
  const rows=s=>s.docs.map(d=>({...d.data(),ysKey:d.id}));
  return {
    watch:(next,error)=>onSnapshot(catalog,{includeMetadataChanges:true},s=>{if(!s.metadata.hasPendingWrites&&!s.metadata.fromCache)next(rows(s));},error),
    refresh:async()=>rows(await getDocsFromServer(catalog)),
    watchSections:(next,error)=>onSnapshot(sections,{includeMetadataChanges:true},s=>{if(!s.metadata.hasPendingWrites&&!s.metadata.fromCache)next(s.docs.map(d=>({...d.data(),id:d.id})));},error),
    refreshSections:async()=>(await getDocsFromServer(sections)).docs.map(d=>({...d.data(),id:d.id})),
    async saveSection(section,photo,oldPhoto){
      if(!navigator.onLine)throw {code:'unavailable'};
      if(!auth.currentUser||auth.currentUser.uid!==window.YALLA_CONFIG.ownerUid)throw {code:'permission-denied'};
      const b=writeBatch(db),saved={id:section.id,name:section.name,image:section.image||'',photoKey:section.photoKey||'',hidden:!!section.hidden,order:section.order,updatedAt:serverTimestamp()};
      if(photo){saved.photoKey='photo_'+crypto.randomUUID().replace(/-/g,'');b.set(doc(db,'yallaPhotos',saved.photoKey),{data:photo});}
      b.set(doc(db,'yallaSections',saved.id),saved);
      if(oldPhoto&&oldPhoto!==saved.photoKey)b.delete(doc(db,'yallaPhotos',oldPhoto));
      await b.commit();return saved;
    },
    photo:async key=>{const s=await getDoc(doc(db,'yallaPhotos',key));return s.exists()?s.data().data:null;},
    observeAuth:fn=>onAuthStateChanged(auth,fn),
    login:password=>signInWithEmailAndPassword(auth,window.YALLA_CONFIG.ownerEmail,password),
    logout:()=>signOut(auth),
    async save(p,photo,oldPhoto){
      if(!navigator.onLine)throw {code:'unavailable'};
      if(!auth.currentUser||auth.currentUser.uid!==window.YALLA_CONFIG.ownerUid)throw {code:'permission-denied'};
      const b=writeBatch(db);const saved={ysKey:p.ysKey,id:p.id,group:p.group,category:p.category,name:p.name,price:p.price,unit:p.unit||'',description:p.description||'',image:p.image||'',photoKey:p.photoKey||'',deleted:!!p.deleted,updatedAt:serverTimestamp()};
      if(photo){saved.photoKey='photo_'+crypto.randomUUID().replace(/-/g,'');b.set(doc(db,'yallaPhotos',saved.photoKey),{data:photo});}
      b.set(doc(db,'yallaProducts',p.ysKey),saved);
      if(oldPhoto&&oldPhoto!==saved.photoKey)b.delete(doc(db,'yallaPhotos',oldPhoto));
      await b.commit();return saved;
    },
    async reset(key,oldPhoto){if(!navigator.onLine)throw {code:'unavailable'};const b=writeBatch(db);b.delete(doc(db,'yallaProducts',key));if(oldPhoto)b.delete(doc(db,'yallaPhotos',oldPhoto));await b.commit();}
  };
}
