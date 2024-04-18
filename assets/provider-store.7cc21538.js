import{b9 as v,ba as t,bb as g,bc as I,bd as u,be as m,bf as i,bg as b,bh as f}from"./index.f06bc032.js";import{E as n}from"./errortype.7c5c8189.js";const C=v("provider",{state:()=>({providers:[],error:null,isLoading:!1,storeId:""}),actions:{async loadProviders(r){this.storeId=r,this.providers=[],this.isLoading=!0;const e=t(i,"providers"),s=g(e,I("storeId","==",r)),a=await u(s);this.providers=a.docs.map(function(o){var d,c,h,p,l;return{id:o.id,name:(d=o.data())==null?void 0:d.name,phone:(c=o.data())==null?void 0:c.phone,email:(h=o.data())==null?void 0:h.email,storeId:(p=o.data())==null?void 0:p.storeId,lastChangeUserId:(l=o.data())==null?void 0:l.lastChangeUserId}}),this.isLoading=!1},async addProvider(r){try{const e=m(t(i,"providers"));r.id=e.id,await b(e,r),this.providers.push(r)}catch(e){throw{productReference:r.name,errorType:n.Technical,message:e.toString()}}},async editProvider(r){try{const e=m(t(i,"providers"),r.id);await f(e,{name:r.name,email:r.email,phone:r.phone,lastChangeUserId:r.lastChangeUserId});const s=this.providers.findIndex(o=>o.id===r.id&&o.storeId===r.storeId);if(s<0)throw{providerName:r.id,errorType:n.Technical,message:"providerStore.editProvider : cannot find provider in store to edit it"};const a=this.providers[s];a.name=r.name,a.email=r.email,a.phone=r.phone,a.lastChangeUserId=r.lastChangeUserId}catch(e){throw{providerName:r.id,errorType:n.Technical,message:e.toString()}}}}});export{C as u};
