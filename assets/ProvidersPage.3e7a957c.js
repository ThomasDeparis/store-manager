import{Q as j}from"./QPage.c6755f67.js";import{d as R}from"./QItem.c376329a.js";import{ai as z,d as $,c as k,r as v,_ as w,H as g,R as N,j as l,J as s,O as y,aj as c,Q as G,P as b,G as h,I as E,ak as L,al as O,am as H,K as J,F as K}from"./index.beef4f09.js";import{E as C,Q as A,a as W,b as X,c as Q,d as Y,S as q}from"./SidePanel.d5d5d966.js";import{c as S,q as Z,w as _,g as x,d as T,a as V,s as ee,b as oe,u as U}from"./user-store.255829b9.js";import{u as M}from"./vue-i18n.runtime.e87ea906.js";import{Q as D,u as re}from"./notify-handler.73e8b582.js";import{t as ae}from"./index.339b6b2d.js";const I=z("provider",{state:()=>({providers:[],error:null,isLoading:!1}),actions:{async loadProviders(e){this.isLoading=!0;const o=S(V,"providers"),n=Z(o,_("storeId","==",e)),d=await x(n);this.providers=d.docs.map(function(a){var t,i,r,m,u;return{id:a.id,name:(t=a.data())==null?void 0:t.name,phone:(i=a.data())==null?void 0:i.phone,email:(r=a.data())==null?void 0:r.email,storeId:(m=a.data())==null?void 0:m.storeId,lastChangeUserId:(u=a.data())==null?void 0:u.lastChangeUserId}}),this.isLoading=!1},async addProvider(e){try{const o=T(S(V,"providers"));e.id=o.id,await ee(o,e),this.providers.push(e)}catch(o){throw{productReference:e.name,errorType:C.Technical,message:o.toString()}}},async editProvider(e){try{const o=T(S(V,"providers"),e.id);await oe(o,{name:e.name,email:e.email,phone:e.phone,lastChangeUserId:e.lastChangeUserId});const n=this.providers.findIndex(a=>a.id===e.id&&a.storeId===e.storeId);if(n<0)throw{providerName:e.id,errorType:C.Technical,message:"providerStore.editProvider : cannot find provider in store to edit it"};const d=this.providers[n];d.name=e.name,d.email=e.email,d.phone=e.phone,d.lastChangeUserId=e.lastChangeUserId}catch(o){throw{providerName:e.id,errorType:C.Technical,message:o.toString()}}}}}),le=$({name:"ProviderGrid",emits:["new-provider-click","edit-row-click","detail-row-click"],setup(){const{t:e}=M(),o=I(),n=U(),d=[{name:"actions",label:"",align:"center"},{name:"name",label:e("provider.name"),field:"name",sortable:!0},{name:"phone",label:"T\xE9l\xE9phone",field:"phone"},{name:"email",label:"email",field:"email",sortable:!0}],a=()=>{o.loadProviders(n.currentStore)},t=k(()=>o.providers.map(function(i){return{...i,actions:null}}));return{filter:v(""),columns:d,rows:t,loadProviders:a,loading:o.isLoading}}}),ne={class:"q-pa-md"},de=b("div",{class:"text-body2"},"\xC9diter",-1),ie=b("div",{class:"text-body2"},"D\xE9tail",-1);function te(e,o,n,d,a,t){return g(),N("div",ne,[l(Y,{"grid-header":"",bordered:"",rows:e.rows,columns:e.columns,"row-key":"reference",filter:e.filter,"rows-per-page-options":[50,100]},{top:s(()=>[l(y,{color:"primary",label:e.$t("provider.newProvider"),onClick:o[0]||(o[0]=i=>e.$emit("new-provider-click"))},null,8,["label"]),l(A),l(c,{dense:"",debounce:"300",color:"primary",modelValue:e.filter,"onUpdate:modelValue":o[1]||(o[1]=i=>e.filter=i)},{append:s(()=>[l(G,{name:"search"})]),_:1},8,["modelValue"])]),"body-cell-actions":s(i=>[l(W,{props:i},{default:s(()=>[l(X),l(y,{class:"q-mr-sm",icon:"edit",push:"",round:"",color:"amber-7",size:"sm",onClick:r=>e.$emit("edit-row-click",i.row)},{default:s(()=>[l(Q,null,{default:s(()=>[de]),_:1})]),_:2},1032,["onClick"]),l(y,{icon:"visibility",class:"q-mr-sm",push:"",round:"",color:"primary",size:"sm",onClick:r=>e.$emit("detail-row-click",i.row)},{default:s(()=>[l(Q,null,{default:s(()=>[ie]),_:1})]),_:2},1032,["onClick"])]),_:2},1032,["props"])]),_:1},8,["rows","columns","filter"]),l(y,{icon:"search",onClick:e.loadProviders},null,8,["onClick"])])}var se=w(le,[["render",te]]);const ue=$({name:"ProviderCreation",emits:["close","provider-created","provider-creation-failed"],components:{SidePanel:q},setup(e,o){const n=v(),d=v(""),a=v(""),t=v(""),i=I(),r=U(),m=()=>{var f;d.value="",a.value="",t.value="",(f=n.value)==null||f.resetValidation()};return{form:n,email:d,phone:a,name:t,onSubmit:async()=>{var f;try{const P={email:d.value,phone:a.value,name:t.value,storeId:r.currentStore,lastChangeUserId:(f=r.userData)==null?void 0:f.uid},p=await i.addProvider(P);o.emit("provider-created",p),m()}catch(P){o.emit("provider-creation-failed",P)}}}}}),me={class:"row justify-center"};function pe(e,o,n,d,a,t){const i=h("side-panel");return g(),E(i,{title:e.$t("provider.newProvider"),onClose:o[3]||(o[3]=r=>e.$emit("close"))},{default:s(()=>[l(D,{onSubmit:e.onSubmit,ref:"form",class:"q-gutter-md q-pa-sm"},{default:s(()=>[l(c,{filled:"",modelValue:e.email,"onUpdate:modelValue":o[0]||(o[0]=r=>e.email=r),label:e.$t("provider.email")},null,8,["modelValue","label"]),l(c,{filled:"",modelValue:e.name,"onUpdate:modelValue":o[1]||(o[1]=r=>e.name=r),label:e.$t("provider.name"),"lazy-rules":"",rules:[r=>r&&r.length>0||e.$t("forms.mandatory")]},null,8,["modelValue","label","rules"]),l(c,{filled:"",prefix:"+33",mask:"# ## ## ## ##","reverse-fill-mask":"",modelValue:e.phone,"onUpdate:modelValue":o[2]||(o[2]=r=>e.phone=r),label:e.$t("provider.phone")},null,8,["modelValue","label"]),b("div",me,[l(y,{label:e.$t("buttons.create"),type:"submit",color:"primary"},null,8,["label"])])]),_:1},8,["onSubmit"])]),_:1},8,["title"])}var ve=w(ue,[["render",pe]]);const ce=$({name:"ProviderEdit",props:{readonlyMode:{type:Boolean,default:!1},modelValue:{type:Object,required:!0}},emits:["close","update:modelValue","update:readonlyMode","provider-edit-failed"],components:{SidePanel:q},setup(e,o){const n=k(()=>e.modelValue),d=L(e.readonlyMode);O(()=>d.value=e.readonlyMode);const a=I(),t=U();return{editing:n,isReadonly:d,onSubmit:async()=>{var r;try{n.value.lastChangeUserId=(r=t.userData)==null?void 0:r.uid,await a.editProvider(n.value),o.emit("update:modelValue",n.value)}catch(m){o.emit("provider-edit-failed",m)}}}}}),fe={class:"row"},ye={class:"row justify-center"};function he(e,o,n,d,a,t){const i=h("side-panel");return g(),E(i,{title:e.$t("provider.detail"),onClose:o[4]||(o[4]=r=>e.$emit("close"))},{default:s(()=>[b("div",fe,[l(H,{class:"","model-value":e.isReadonly,color:"green",label:"mode \xE9dition","true-value":!1,"false-value":!0,"onUpdate:modelValue":o[0]||(o[0]=r=>e.$emit("update:readonlyMode",e.isReadonly))},null,8,["model-value"])]),l(D,{onSubmit:e.onSubmit,ref:"form",class:"q-gutter-md q-pa-sm"},{default:s(()=>[l(c,{filled:"",modelValue:e.editing.email,"onUpdate:modelValue":o[1]||(o[1]=r=>e.editing.email=r),readonly:e.isReadonly,label:e.$t("provider.email")},null,8,["modelValue","readonly","label"]),l(c,{filled:"",modelValue:e.editing.name,"onUpdate:modelValue":o[2]||(o[2]=r=>e.editing.name=r),label:e.$t("provider.name"),readonly:e.isReadonly,"lazy-rules":"",rules:[r=>r&&r.length>0||e.$t("forms.mandatory")]},null,8,["modelValue","label","readonly","rules"]),l(c,{filled:"",prefix:"+33",mask:"# ## ## ## ##","reverse-fill-mask":"",modelValue:e.editing.phone,"onUpdate:modelValue":o[3]||(o[3]=r=>e.editing.phone=r),label:e.$t("provider.phone"),readonly:e.isReadonly},null,8,["modelValue","label","readonly"]),b("div",ye,[e.isReadonly?J("",!0):(g(),E(y,{key:0,label:e.$t("buttons.edit"),type:"submit",color:"primary"},null,8,["label"]))])]),_:1},8,["onSubmit"])]),_:1},8,["title"])}var ge=w(ce,[["render",he]]);function be(e){return console.log(e),ae("common.technicalError")}const Pe=$({name:"ProvidersPage",components:{ProviderGrid:se,ProviderCreation:ve,ProviderEdit:ge},setup(){const{t:e}=M(),o=re(),n={id:"",name:"",storeId:"",lastChangeUserId:"",email:"",phone:""},d=v(n);var a=v(null);const t=(p,B)=>{a.value=p;let F=Object.create(B);d.value=F},i=()=>{a.value=null,d.value=n},r=k(()=>a.value==="detail");return{handleTechnicalError:p=>o.NotifyError(be(p)),handleNewProvider:()=>{o.NotifySuccess(e("provider.created"))},handleProviderEdited:()=>{o.NotifySuccess(e("provider.edited")),i()},sidePanel:a,openSidePanel:t,closeSidePanel:i,emptyRow:n,editingRow:d,readonlyEditMode:r,handleEditModeChanged:p=>{console.log("nouveau mode"),console.log(p),a.value=p?"edit":"detail"}}}});function $e(e,o,n,d,a,t){const i=h("provider-grid"),r=h("provider-creation"),m=h("provider-edit");return g(),N(K,null,[l(j,null,{default:s(()=>[l(i,{onNewProviderClick:o[0]||(o[0]=u=>e.openSidePanel("new",e.emptyRow)),onEditRowClick:o[1]||(o[1]=u=>e.openSidePanel("edit",u)),onDetailRowClick:o[2]||(o[2]=u=>e.openSidePanel("detail",u))})]),_:1}),l(R,{"model-value":e.sidePanel==="new",side:"right",bordered:""},{default:s(()=>[l(r,{onProviderCreated:e.handleNewProvider,onProviderCreationFailed:e.handleTechnicalError,onClose:e.closeSidePanel},null,8,["onProviderCreated","onProviderCreationFailed","onClose"])]),_:1},8,["model-value"]),l(R,{"model-value":e.sidePanel==="edit"||e.sidePanel==="detail",side:"right",bordered:""},{default:s(()=>[l(m,{modelValue:e.editingRow,"onUpdate:modelValue":[o[3]||(o[3]=u=>e.editingRow=u),e.handleProviderEdited],"readonly-mode":e.readonlyEditMode,onClose:e.closeSidePanel,"onUpdate:readonlyMode":e.handleEditModeChanged,onProviderEditFailed:e.handleTechnicalError},null,8,["modelValue","readonly-mode","onClose","onUpdate:modelValue","onUpdate:readonlyMode","onProviderEditFailed"])]),_:1},8,["model-value"])],64)}var Re=w(Pe,[["render",$e]]);export{Re as default};
