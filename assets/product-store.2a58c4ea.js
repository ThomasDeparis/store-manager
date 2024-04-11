import{b4 as g,b5 as c,b6 as h,b7 as f,b8 as l,b9 as d,ba as a,bb as m,bc as w,bd as b,be as E}from"./index.d9beb1c5.js";import{E as n}from"./errortype.28c52496.js";var y=(e=>(e[e.ReferenceExists=0]="ReferenceExists",e))(y||{});const P=g("product",{state:()=>({products:[],error:null,isLoading:!1,storeId:""}),actions:{async loadProducts(e){this.storeId=e,this.products=[],this.isLoading=!0;const s=c(a,"products"),t=h(s,f("storeId","==",e)),o=await l(t);this.products=o.docs.map(function(r){return{id:r.id,name:r.data().name,quantity:r.data().quantity,sellPrice:r.data().sellPrice,reference:r.data().reference,providerReference:r.data().providerReference,storeId:r.data().storeId,lastChangeUserId:r.data().lastChangeUserId}}),this.isLoading=!1},async referenceExists(e,s){const t=c(a,"products"),o=h(t,f("storeId","==",e),f("reference","==",s));return!(await l(o)).empty},async addProduct(e){if(await this.referenceExists(e.storeId,e.reference))throw{messageKey:y.ReferenceExists,productReference:e.reference,errorType:n.Business};try{const t=d(c(a,"products"));return e.id=t.id,await m(t,e),this.products.push(e),e}catch(t){throw{productReference:e.reference,errorType:n.Technical,message:t.toString()}}},async editProduct(e){try{const s=d(c(a,"products"),e.id);await w(s,{name:e.name,providerReference:e.providerReference,sellPrice:e.sellPrice,lastChangeUserId:e.lastChangeUserId});const t=this.products.findIndex(r=>r.id===e.id&&r.storeId===e.storeId);if(t<0)throw{productReference:e.reference,errorType:n.Technical,message:"productStore.editProduct : cannot find product in store to edit it"};const o=this.products[t];o.name=e.name,o.providerReference=e.providerReference,o.sellPrice=e.sellPrice,o.lastChangeUserId=e.lastChangeUserId}catch(s){throw{productReference:e.reference,errorType:n.Technical,message:s.toString()}}},async updateStock(e,s,t){var o;try{const r=d(a,"products",e),i=await b(r),u=t||E(a),p=d(c(a,"products",e,"stockLogs"));s.id=p.id,s.initialQuantity=Number(((o=i==null?void 0:i.data())==null?void 0:o.quantity)||0),u.set(p,s),u.update(r,{quantity:s.initialQuantity+s.adjustment}),t===void 0&&await u.commit()}catch(r){throw{productReference:e,errorType:n.Technical,message:r.toString()}}}}});export{y as P,P as u};
