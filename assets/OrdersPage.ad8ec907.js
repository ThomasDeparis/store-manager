import{Q as j}from"./QPage.759cf554.js";import{Q as B}from"./QDrawer.5e5b8f44.js";import{d as S,c as b,w as L,o as U,r as g,_ as h,H as u,R as v,j as r,J as d,O as p,aj as P,Q as F,P as y,G as w,I as R,L as Q,S as M,F as I,M as V,b5 as T,K as Y,N as z}from"./index.c3a332be.js";import{Q as A,a as N,S as G}from"./SidePanel.3bee2f91.js";import{Q as H,a as J}from"./errortype.0878e387.js";import{u as k,h as K}from"./moment.06562fec.js";import{u as W}from"./user-store.356e8418.js";import{u as D}from"./vue-i18n.runtime.0a778775.js";import{c as X,b as Z,Q as x,a as _}from"./QItem.07b81af3.js";import{Q as ee,u as re}from"./notify-handler.98aeb3f6.js";import{u as oe}from"./use-dialog-plugin-component.211748d6.js";const ne=S({name:"OrderGrid",emits:["new-order-click","confirm-row-click"],setup(){const{t:e}=D(),o=k(),l=W(),s=[{name:"actions",label:"",align:"center"},{name:"reference",label:e("order.reference"),field:"reference",sortable:!0},{name:"provider",label:e("provider.name"),field:"providerId"},{name:"orderDate",label:e("order.orderDate"),field:"orderDate",sortable:!0,format:n=>K(n).format("DD/MM/YYYY")}],a=()=>{var n;(o.orders==null||((n=o.orders)==null?void 0:n.length)===0||o.storeId!==l.currentStore)&&o.loadOrders(l.currentStore)},c=b(()=>o.orders.map(function(n){return{...n,actions:null}}));return L(()=>l.currentStore,()=>{a()}),U(()=>{l.currentStore!=null&&a()}),{filter:g(""),columns:s,rows:c,loadOrders:a,loading:b(()=>o.isLoading)}}}),te={class:"q-pa-md"},de=y("div",{class:"text-body2"},"Finaliser la commande",-1);function le(e,o,l,s,a,c){return u(),v("div",te,[r(J,{"grid-header":"",bordered:"",rows:e.rows,columns:e.columns,"row-key":"reference",filter:e.filter,"rows-per-page-options":[50,100]},{top:d(()=>[r(p,{color:"primary",label:e.$t("order.newOrder"),onClick:o[0]||(o[0]=n=>e.$emit("new-order-click"))},null,8,["label"]),r(A),r(P,{dense:"",debounce:"300",color:"primary",modelValue:e.filter,"onUpdate:modelValue":o[1]||(o[1]=n=>e.filter=n)},{append:d(()=>[r(F,{name:"search"})]),_:1},8,["modelValue"])]),"body-cell-actions":d(n=>[r(H,{props:n},{default:d(()=>[r(p,{class:"q-mr-sm",icon:"check_circle",push:"",round:"",color:"green",size:"sm",onClick:t=>e.$emit("confirm-row-click",n.row)},{default:d(()=>[r(N,null,{default:d(()=>[de]),_:1})]),_:2},1032,["onClick"])]),_:2},1032,["props"])]),_:1},8,["rows","columns","filter"])])}var ae=h(ne,[["render",le]]);const se=S({name:"OrderConfirm",components:{SidePanel:G},emits:["order-confirmed","close"],props:{orderReference:{type:String},orderId:{type:String,required:!0},modelValue:{type:Object,required:!0}},setup(e,o){const l=b(()=>e.modelValue),s=k();return{cartContent:l,confirmOrder:()=>{s.validateReceipt(e.orderId,l.value),o.emit("order-confirmed",l.value)},fillAllQties:()=>{var n;(n=l==null?void 0:l.value)==null||n.forEach(t=>{t.receivedQty=t.orderedQty})}}}}),ie={class:"row justify-center"},ce={class:"col q-pa-md"},me=y("div",{class:"text-body2"},"Quantit\xE9 re\xE7ue conforme",-1);function ue(e,o,l,s,a,c){const n=w("side-panel");return u(),R(n,{title:`R\xE9ception de la commande : ${e.orderReference}`,onClose:o[0]||(o[0]=t=>e.$emit("close"))},{default:d(()=>[r(X,{bordered:"",padding:""},{default:d(()=>[r(ee,{onSubmit:e.confirmOrder},{default:d(()=>[y("div",ie,[r(p,{class:"q-ma-sm",type:"submit",color:"primary"},{default:d(()=>[Q("Confirmer r\xE9ception")]),_:1}),r(p,{class:"q-ma-sm",color:"green",onClick:e.fillAllQties},{default:d(()=>[Q("R\xE9ception compl\xE8te")]),_:1},8,["onClick"])]),(u(!0),v(I,null,M(e.cartContent,(t,i)=>{var $;return u(),v("div",{key:t.productId},[r(Z,null,{default:d(()=>[r(x,null,{default:d(()=>[r(_,{overline:""},{default:d(()=>[Q(V(t.productReference),1)]),_:2},1024),r(_,null,{default:d(()=>[Q(V(t.productName),1)]),_:2},1024),r(_,{class:"row",caption:""},{default:d(()=>[r(P,{class:"q-pa-sm col-8",modelValue:t.receivedQty,"onUpdate:modelValue":m=>t.receivedQty=m,type:"number",label:e.$t("order.receivedQty"),hint:`Quantit\xE9 command\xE9e : ${t.orderedQty}`,dense:"","lazy-rules":"",rules:[m=>m&&m>0||`Quantit\xE9 command\xE9e : ${t.orderedQty}`]},null,8,["modelValue","onUpdate:modelValue","label","hint","rules"]),y("div",ce,[r(p,{class:"",onClick:m=>t.receivedQty=t.orderedQty,round:"",push:"",size:"sm",icon:"assignment_turned_in",color:"green"},{default:d(()=>[r(N,null,{default:d(()=>[me]),_:1})]),_:2},1032,["onClick"])])]),_:2},1024)]),_:2},1024)]),_:2},1024),i<((($=e.cartContent)==null?void 0:$.length)||0)-1?(u(),R(T,{key:0,spaced:""})):Y("",!0)])}),128))]),_:1},8,["onSubmit"])]),_:1})]),_:1},8,["title"])}var fe=h(se,[["render",ue]]);const pe=S({name:"OrdersPage",components:{OrderGrid:ae,OrderConfirm:fe},emits:[...oe.emits],setup(){const{t:e}=D(),o=z(),l=g(!1),s=k(),a=re(),c=()=>{o.push({name:"neworder"})},n={id:"",providerId:"",reference:"",orderDate:new Date,storeId:"",products:[]},t=g(n);var i=g(null);return{dialogOpened:l,editingRow:t,gotoNewOrder:c,sidePanel:i,openSidePanel:(q,f)=>{var E;try{((E=f==null?void 0:f.products)==null?void 0:E.length)===0&&s.loadOrderProducts(f.id),i.value=q;const C=s.orders.find(O=>O.id===f.id);if(!C)a.NotifyError(e("common.technicalError"));else{let O=Object.create(C);t.value=O}}catch{a.NotifyError(e("common.technicalError"))}},closeSidePanel:()=>{i.value=null,t.value=n},handleOrderConfirmed:()=>{console.log("order confirmed handled")}}}});function Qe(e,o,l,s,a,c){const n=w("order-grid"),t=w("order-confirm");return u(),v(I,null,[r(j,null,{default:d(()=>[r(n,{onNewOrderClick:e.gotoNewOrder,onConfirmRowClick:o[0]||(o[0]=i=>e.openSidePanel("confirm",i))},null,8,["onNewOrderClick"])]),_:1}),r(B,{"model-value":e.sidePanel==="confirm",side:"right",bordered:""},{default:d(()=>[r(t,{"order-id":e.editingRow.id,modelValue:e.editingRow.products,"onUpdate:modelValue":o[1]||(o[1]=i=>e.editingRow.products=i),"order-reference":e.editingRow.reference,onOrderConfirmed:e.handleOrderConfirmed,onClose:e.closeSidePanel},null,8,["order-id","modelValue","order-reference","onOrderConfirmed","onClose"])]),_:1},8,["model-value"])],64)}var Ee=h(pe,[["render",Qe]]);export{Ee as default};
