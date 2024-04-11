import{Q as F}from"./QPage.846a834e.js";import{Q as U}from"./QDrawer.db020ac2.js";import{d as C,O as E,w as j,o as B,c as g,r as m,_ as S,H as w,S as M,j as l,J as a,P as y,aj as c,Q as D,R as $,M as V,G as b,I as k,ak as z,al as G,am as H,K as J,N as K,F as L}from"./index.d9beb1c5.js";import{Q as A,a as h,S as N}from"./SidePanel.71ad6aca.js";import{Q as W,a as X}from"./errortype.28c52496.js";import{u as R}from"./provider-store.98d21276.js";import{u as I}from"./vue-i18n.runtime.3500c6ba.js";import{Q as q}from"./QForm.61e588dd.js";import{t as Y}from"./index.161d8075.js";import{u as Z}from"./notify-handler.6890384d.js";import{u as _}from"./use-dialog-plugin-component.c68be17c.js";import"./QItem.a08691c9.js";const x=C({name:"ProviderGrid",emits:["new-provider-click","edit-row-click","detail-row-click","order-row-click"],setup(){const{t:e}=I(),o=R(),d=E(),s=[{name:"actions",label:"",align:"center"},{name:"name",label:e("provider.name"),field:"name",sortable:!0},{name:"phone",label:e("provider.phone"),field:"phone"},{name:"email",label:e("provider.email"),field:"email",sortable:!0}],i=()=>{o.loadProviders(d.currentStore)};j(()=>d.currentStore,()=>{i()}),B(()=>{d.currentStore!=null&&i()});const t=g(()=>o.providers.map(function(n){return{...n,actions:null}}));return{filter:m(""),columns:s,rows:t,loadProviders:i,loading:g(()=>o.isLoading)}}}),ee={class:"q-pa-md"},oe={class:"text-body2"},re={class:"text-body2"},le={class:"text-body2"};function ne(e,o,d,s,i,t){return w(),M("div",ee,[l(X,{"grid-header":"",bordered:"",rows:e.rows,columns:e.columns,"row-key":"reference",filter:e.filter,"rows-per-page-options":[50,100]},{top:a(()=>[l(y,{color:"primary",label:e.$t("provider.newProvider"),onClick:o[0]||(o[0]=n=>e.$emit("new-provider-click"))},null,8,["label"]),l(A),l(c,{dense:"",debounce:"300",color:"primary",modelValue:e.filter,"onUpdate:modelValue":o[1]||(o[1]=n=>e.filter=n)},{append:a(()=>[l(D,{name:"search"})]),_:1},8,["modelValue"])]),"body-cell-actions":a(n=>[l(W,{props:n},{default:a(()=>[l(y,{class:"q-mr-sm",icon:"edit",push:"",round:"",color:"amber-7",size:"sm",onClick:r=>e.$emit("edit-row-click",n.row)},{default:a(()=>[l(h,null,{default:a(()=>[$("div",oe,V(e.$t("buttons.edit")),1)]),_:1})]),_:2},1032,["onClick"]),l(y,{icon:"visibility",class:"q-mr-sm",push:"",round:"",color:"primary",size:"sm",onClick:r=>e.$emit("detail-row-click",n.row)},{default:a(()=>[l(h,null,{default:a(()=>[$("div",re,V(e.$t("buttons.detail")),1)]),_:1})]),_:2},1032,["onClick"]),l(y,{icon:"shopping_cart",class:"q-mr-sm",push:"",round:"",color:"green",size:"sm",onClick:r=>e.$emit("order-row-click",n.row)},{default:a(()=>[l(h,null,{default:a(()=>[$("div",le,V(e.$t("buttons.order")),1)]),_:1})]),_:2},1032,["onClick"])]),_:2},1032,["props"])]),_:1},8,["rows","columns","filter"])])}var de=S(x,[["render",ne]]);const ae=C({name:"ProviderCreation",emits:["close","provider-created","provider-creation-failed"],components:{SidePanel:N},setup(e,o){const d=m(),s=m(""),i=m(""),t=m(""),n=R(),r=E(),p=()=>{var v;s.value="",i.value="",t.value="",(v=d.value)==null||v.resetValidation()};return{form:d,email:s,phone:i,name:t,onSubmit:async()=>{var v;try{const P={email:s.value,phone:i.value,name:t.value,storeId:r.currentStore,lastChangeUserId:(v=r.userData)==null?void 0:v.uid},Q=await n.addProvider(P);o.emit("provider-created",Q),p()}catch(P){o.emit("provider-creation-failed",P)}}}}}),ie={class:"row justify-center"};function te(e,o,d,s,i,t){const n=b("side-panel");return w(),k(n,{title:e.$t("provider.newProvider"),onClose:o[3]||(o[3]=r=>e.$emit("close"))},{default:a(()=>[l(q,{onSubmit:e.onSubmit,ref:"form",class:"q-gutter-md q-pa-sm"},{default:a(()=>[l(c,{filled:"",modelValue:e.email,"onUpdate:modelValue":o[0]||(o[0]=r=>e.email=r),label:e.$t("provider.email")},null,8,["modelValue","label"]),l(c,{filled:"",modelValue:e.name,"onUpdate:modelValue":o[1]||(o[1]=r=>e.name=r),label:e.$t("provider.name"),"lazy-rules":"",rules:[r=>r&&r.length>0||e.$t("forms.mandatory")]},null,8,["modelValue","label","rules"]),l(c,{filled:"",prefix:"+33",mask:"# ## ## ## ##","reverse-fill-mask":"",modelValue:e.phone,"onUpdate:modelValue":o[2]||(o[2]=r=>e.phone=r),label:e.$t("provider.phone")},null,8,["modelValue","label"]),$("div",ie,[l(y,{label:e.$t("buttons.create"),type:"submit",color:"primary"},null,8,["label"])])]),_:1},8,["onSubmit"])]),_:1},8,["title"])}var se=S(ae,[["render",te]]);const ue=C({name:"ProviderEdit",props:{readonlyMode:{type:Boolean,default:!1},modelValue:{type:Object,required:!0}},emits:["close","update:modelValue","update:readonlyMode","provider-edit-failed"],components:{SidePanel:N},setup(e,o){const d=g(()=>e.modelValue),s=z(e.readonlyMode);G(()=>s.value=e.readonlyMode);const i=R(),t=E();return{editing:d,isReadonly:s,onSubmit:async()=>{var r;try{d.value.lastChangeUserId=(r=t.userData)==null?void 0:r.uid,await i.editProvider(d.value),o.emit("update:modelValue",d.value)}catch(p){o.emit("provider-edit-failed",p)}}}}}),me={class:"row"},pe={class:"row justify-center"};function ve(e,o,d,s,i,t){const n=b("side-panel");return w(),k(n,{title:e.$t("provider.detail"),onClose:o[4]||(o[4]=r=>e.$emit("close"))},{default:a(()=>[$("div",me,[l(H,{class:"","model-value":e.isReadonly,color:"green",label:e.$t("forms.editMode"),"true-value":!1,"false-value":!0,"onUpdate:modelValue":o[0]||(o[0]=r=>e.$emit("update:readonlyMode",e.isReadonly))},null,8,["model-value","label"])]),l(q,{onSubmit:e.onSubmit,ref:"form",class:"q-gutter-md q-pa-sm"},{default:a(()=>[l(c,{filled:"",modelValue:e.editing.email,"onUpdate:modelValue":o[1]||(o[1]=r=>e.editing.email=r),readonly:e.isReadonly,label:e.$t("provider.email")},null,8,["modelValue","readonly","label"]),l(c,{filled:"",modelValue:e.editing.name,"onUpdate:modelValue":o[2]||(o[2]=r=>e.editing.name=r),label:e.$t("provider.name"),readonly:e.isReadonly,"lazy-rules":"",rules:[r=>r&&r.length>0||e.$t("forms.mandatory")]},null,8,["modelValue","label","readonly","rules"]),l(c,{filled:"",mask:"+33# ## ## ## ##","reverse-fill-mask":"",modelValue:e.editing.phone,"onUpdate:modelValue":o[3]||(o[3]=r=>e.editing.phone=r),label:e.$t("provider.phone"),readonly:e.isReadonly},null,8,["modelValue","label","readonly"]),$("div",pe,[e.isReadonly?J("",!0):(w(),k(y,{key:0,label:e.$t("buttons.edit"),type:"submit",color:"primary"},null,8,["label"]))])]),_:1},8,["onSubmit"])]),_:1},8,["title"])}var fe=S(ue,[["render",ve]]);function ce(e){return console.log(e),Y("common.technicalError")}const ye=C({name:"ProvidersPage",components:{ProviderGrid:de,ProviderCreation:se,ProviderEdit:fe},emits:[..._.emits],setup(){const{t:e}=I(),o=K(),d=Z(),s=m(!1),i=m(),t={id:"",name:"",storeId:"",lastChangeUserId:"",email:"",phone:""},n=m(t);var r=m(null);const p=(f,O)=>{r.value=f;let T=Object.create(O);n.value=T},u=()=>{r.value=null,n.value=t},v=g(()=>r.value==="detail");return{handleTechnicalError:f=>d.NotifyError(ce(f)),handleNewProvider:()=>{d.NotifySuccess(e("provider.created"))},handleProviderEdited:()=>{d.NotifySuccess(e("provider.edited")),u()},sidePanel:r,openSidePanel:p,closeSidePanel:u,emptyRow:t,editingRow:n,readonlyEditMode:v,handleEditModeChanged:f=>{r.value=f?"edit":"detail"},dialogOpened:s,selectedProvider:i,openNewOrder:f=>{o.push({name:"provider-neworder",params:{providerId:f.id}})}}}});function $e(e,o,d,s,i,t){const n=b("provider-grid"),r=b("provider-creation"),p=b("provider-edit");return w(),M(L,null,[l(F,null,{default:a(()=>[l(n,{onNewProviderClick:o[0]||(o[0]=u=>e.openSidePanel("new",e.emptyRow)),onEditRowClick:o[1]||(o[1]=u=>e.openSidePanel("edit",u)),onDetailRowClick:o[2]||(o[2]=u=>e.openSidePanel("detail",u)),onOrderRowClick:o[3]||(o[3]=u=>e.openNewOrder(u))})]),_:1}),l(U,{"model-value":e.sidePanel==="new",side:"right",bordered:""},{default:a(()=>[l(r,{onProviderCreated:e.handleNewProvider,onProviderCreationFailed:e.handleTechnicalError,onClose:e.closeSidePanel},null,8,["onProviderCreated","onProviderCreationFailed","onClose"])]),_:1},8,["model-value"]),l(U,{"model-value":e.sidePanel==="edit"||e.sidePanel==="detail",side:"right",bordered:""},{default:a(()=>[l(p,{modelValue:e.editingRow,"onUpdate:modelValue":[o[4]||(o[4]=u=>e.editingRow=u),e.handleProviderEdited],"readonly-mode":e.readonlyEditMode,onClose:e.closeSidePanel,"onUpdate:readonlyMode":e.handleEditModeChanged,onProviderEditFailed:e.handleTechnicalError},null,8,["modelValue","readonly-mode","onClose","onUpdate:modelValue","onUpdate:readonlyMode","onProviderEditFailed"])]),_:1},8,["model-value"])],64)}var Ie=S(ye,[["render",$e]]);export{Ie as default};
