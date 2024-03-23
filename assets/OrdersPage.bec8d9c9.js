import{Q as G}from"./QPage.14ee8e33.js";import{Q as Y}from"./QDrawer.ed1306a0.js";import{d as k,c as Q,w as J,o as K,r as S,_ as h,H as p,R as b,j as t,J as d,O as g,aj as j,Q as W,I as C,P as v,M as u,K as O,G as _,L as y,S as M,F as V,b5 as U,N as X}from"./index.c32bac98.js";import{Q as Z,a as R,S as B}from"./SidePanel.346b96b4.js";import{Q as x,a as ee}from"./errortype.c16f0b54.js";import{u as I,h as L,a as re}from"./order-error-handler.d52a1750.js";import{u as z}from"./provider-store.2ffaa569.js";import{u as oe}from"./user-store.bebc76ac.js";import{u as A}from"./vue-i18n.runtime.27bfa109.js";import{c as H,b as T,Q as F,a as $}from"./QItem.e5706ad0.js";import{Q as te,u as de}from"./notify-handler.7ea7425e.js";import{u as ne}from"./use-dialog-plugin-component.e1f21ed8.js";import"./product-store.b2e85d44.js";import"./index.b86b291e.js";const le=k({name:"OrderGrid",emits:["new-order-click","confirm-row-click","detail-row-click"],setup(){const{t:e}=A(),o=I(),a=oe(),s=z(),c=[{name:"actions",label:"",align:"center"},{name:"reference",label:e("order.reference"),field:"reference",sortable:!0},{name:"provider",label:e("order.provider"),field:"providerName"},{name:"orderDate",label:e("order.orderDate"),field:"orderDate",sortable:!0,format:n=>L(n).format("DD/MM/YYYY")},{name:"receiptDate",label:e("order.receiptDate"),field:"receiptDate",sortable:!0,format:n=>n?L(n).format("DD/MM/YYYY HH:mm"):""}],f=()=>{var n,i;(o.orders==null||((n=o.orders)==null?void 0:n.length)===0||o.storeId!==a.currentStore)&&o.loadOrders(a.currentStore),(s.providers==null||((i=s.providers)==null?void 0:i.length)===0||s.storeId!==a.currentStore)&&s.loadProviders(a.currentStore)},l=Q(()=>s.providers),r=Q(()=>o.orders.map(function(n){var i;return{...n,providerName:(i=l.value.find(m=>m.id===n.providerId))==null?void 0:i.name,actions:null}}));return J(()=>a.currentStore,()=>{f()}),K(()=>{a.currentStore!=null&&f()}),{filter:S(""),columns:c,rows:r,loadOrders:f,loading:Q(()=>o.isLoading)}}}),ae={class:"q-pa-md"},ie={class:"text-body2"},se={class:"text-body2"};function ue(e,o,a,s,c,f){return p(),b("div",ae,[t(ee,{"grid-header":"",bordered:"",rows:e.rows,columns:e.columns,"row-key":"reference",filter:e.filter,"rows-per-page-options":[50,100]},{top:d(()=>[t(g,{color:"primary",label:e.$t("order.newOrder"),onClick:o[0]||(o[0]=l=>e.$emit("new-order-click"))},null,8,["label"]),t(Z),t(j,{dense:"",debounce:"300",color:"primary",modelValue:e.filter,"onUpdate:modelValue":o[1]||(o[1]=l=>e.filter=l)},{append:d(()=>[t(W,{name:"search"})]),_:1},8,["modelValue"])]),"body-cell-actions":d(l=>[t(x,{props:l},{default:d(()=>[l.row.receiptDate===void 0?(p(),C(g,{key:0,class:"q-mr-sm",icon:"check_circle",push:"",round:"",color:"green",size:"sm",onClick:r=>e.$emit("confirm-row-click",l.row)},{default:d(()=>[t(R,null,{default:d(()=>[v("div",ie,u(e.$t("order.confirm")),1)]),_:1})]),_:2},1032,["onClick"])):O("",!0),l.row.receiptDate?(p(),C(g,{key:1,"data-testid":"detailorderbtn",class:"q-mr-sm",icon:"visibility",push:"",round:"",color:"primary",size:"sm",onClick:r=>e.$emit("detail-row-click",l.row)},{default:d(()=>[t(R,null,{default:d(()=>[v("div",se,u(e.$t("buttons.detail")),1)]),_:1})]),_:2},1032,["onClick"])):O("",!0)]),_:2},1032,["props"])]),_:1},8,["rows","columns","filter"])])}var ce=h(le,[["render",ue]]);const me=k({name:"OrderConfirm",components:{SidePanel:B},emits:["order-confirmed","order-confirm-error","close"],props:{orderReference:{type:String},orderId:{type:String,required:!0},modelValue:{type:Object,required:!0}},setup(e,o){const a=Q(()=>e.modelValue),s=I();return{cartContent:a,confirmOrder:async()=>{const l=a.value.map(function(r){return{id:r.id,productId:r.productId,productName:r.productName,productReference:r.productReference,orderedQty:Number(r.orderedQty),receivedQty:Number(r.receivedQty),unitPrice:Number(r.unitPrice)}});try{await s.validateReceipt(e.orderId,l),o.emit("order-confirmed",a.value)}catch(r){o.emit("order-confirm-error",r)}},fillAllQties:()=>{var l;(l=a==null?void 0:a.value)==null||l.forEach(r=>{r.receivedQty=r.orderedQty})}}}}),fe={class:"row justify-center"},pe={class:"col q-pa-md"},ve=v("div",{class:"text-body2"},"Quantit\xE9 re\xE7ue conforme",-1);function ye(e,o,a,s,c,f){const l=_("side-panel");return p(),C(l,{title:`R\xE9ception de la commande : ${e.orderReference}`,onClose:o[0]||(o[0]=r=>e.$emit("close"))},{default:d(()=>[t(H,{bordered:"",padding:""},{default:d(()=>[t(te,{onSubmit:e.confirmOrder},{default:d(()=>[v("div",fe,[t(g,{class:"q-ma-sm",type:"submit",color:"primary"},{default:d(()=>[y("Confirmer r\xE9ception")]),_:1}),t(g,{class:"q-ma-sm",color:"green",onClick:e.fillAllQties},{default:d(()=>[y("R\xE9ception compl\xE8te")]),_:1},8,["onClick"])]),(p(!0),b(V,null,M(e.cartContent,(r,n)=>{var i;return p(),b("div",{key:r.productId},[t(T,null,{default:d(()=>[t(F,null,{default:d(()=>[t($,{overline:""},{default:d(()=>[y(u(r.productReference),1)]),_:2},1024),t($,null,{default:d(()=>[y(u(r.productName),1)]),_:2},1024),t($,{class:"row",caption:""},{default:d(()=>[t(j,{class:"q-pa-sm col-8",modelValue:r.receivedQty,"onUpdate:modelValue":m=>r.receivedQty=m,mask:"#","fill-mask":"0",type:"number",label:e.$t("order.receivedQty"),hint:`Quantit\xE9 command\xE9e : ${r.orderedQty}`,dense:"","lazy-rules":"",rules:[m=>m&&m>0||`Quantit\xE9 command\xE9e : ${r.orderedQty}`]},null,8,["modelValue","onUpdate:modelValue","label","hint","rules"]),v("div",pe,[t(g,{class:"",onClick:m=>r.receivedQty=r.orderedQty,round:"",push:"",size:"sm",icon:"assignment_turned_in",color:"green"},{default:d(()=>[t(R,null,{default:d(()=>[ve]),_:1})]),_:2},1032,["onClick"])])]),_:2},1024)]),_:2},1024)]),_:2},1024),n<(((i=e.cartContent)==null?void 0:i.length)||0)-1?(p(),C(U,{key:0,spaced:""})):O("",!0)])}),128))]),_:1},8,["onSubmit"])]),_:1})]),_:1},8,["title"])}var $e=h(me,[["render",ye]]);const Qe=k({name:"OrderDetail",components:{SidePanel:B},emits:["close"],props:{modelValue:{type:Object,required:!0}},setup(e){const o=Q(()=>e.modelValue),a=z(),s=Q(()=>{var c;return(c=a.providers.find(f=>f.id===o.value.providerId))==null?void 0:c.name});return{order:o,providerName:s}}}),ge={class:"q-my-md q-mx-sm"},be={class:"q-ma-sm"},Ce={class:"q-ma-sm"},we={class:"q-my-md"},_e={class:"q-ma-sm text-caption"};function Se(e,o,a,s,c,f){const l=_("side-panel");return p(),C(l,{title:`D\xE9tail de la commande : ${e.order.reference}`,onClose:o[0]||(o[0]=r=>e.$emit("close"))},{default:d(()=>{var r;return[v("div",null,[v("p",ge,u(e.$t("order.provider"))+" : "+u(e.providerName),1),v("p",be,u(e.$t("order.orderDate"))+" : "+u(e.order.orderDate.toLocaleDateString()),1),v("p",Ce,u(e.$t("order.receiptDate"))+" : "+u((r=e.order.receiptDate)==null?void 0:r.toLocaleDateString()),1)]),v("div",we,[v("span",_e,u(e.$t("order.cartContent")),1),t(H,{bordered:"",padding:""},{default:d(()=>[(p(!0),b(V,null,M(e.order.products,(n,i)=>{var m,E;return p(),b("div",{key:n.productId},[t(T,null,{default:d(()=>[t(F,null,{default:d(()=>[t($,{overline:""},{default:d(()=>[y(u(n.productReference),1)]),_:2},1024),t($,{class:"q-mb-sm"},{default:d(()=>[y(u(n.productName),1)]),_:2},1024),t($,{class:"row"},{default:d(()=>[y(" Qt\xE9 re\xE7ue : "+u(n.receivedQty),1)]),_:2},1024),t($,{class:"row",caption:""},{default:d(()=>[y(" Qt\xE9 command\xE9e : "+u(n.orderedQty),1)]),_:2},1024),t($,{class:"row"},{default:d(()=>[y(" Prix d'achat : "+u(n.unitPrice)+" \u20AC ",1)]),_:2},1024)]),_:2},1024)]),_:2},1024),i<(((E=(m=e.order)==null?void 0:m.products)==null?void 0:E.length)||0)-1?(p(),C(U,{key:0,spaced:""})):O("",!0)])}),128))]),_:1})])]}),_:1},8,["title"])}var Oe=h(Qe,[["render",Se]]);const ke=k({name:"OrdersPage",components:{OrderGrid:ce,OrderConfirm:$e,OrderDetail:Oe},emits:[...ne.emits],setup(){const{t:e}=A(),o=X(),a=S(!1),s=I(),c=de(),f=()=>{o.push({name:"neworder"})},l={id:"",providerId:"",reference:"",orderDate:new Date,storeId:"",products:[]},r=S(l);var n=S(null);const i=(D,w)=>{var q;try{((q=w==null?void 0:w.products)==null?void 0:q.length)===0&&s.loadOrderProducts(w.id),n.value=D;const N=s.orders.find(P=>P.id===w.id);if(!N)c.NotifyError(e("common.technicalError"));else{let P=Object.create(N);r.value=P}}catch{c.NotifyError(e("common.technicalError"))}},m=()=>{n.value=null,r.value=l};return{dialogOpened:a,editingRow:r,gotoNewOrder:f,sidePanel:n,openSidePanel:i,closeSidePanel:m,handleOrderConfirmed:()=>{m(),c.NotifySuccess(e("order.received"))},handleError:D=>{c.NotifyError(re(D))}}}});function he(e,o,a,s,c,f){const l=_("order-grid"),r=_("order-confirm"),n=_("order-detail");return p(),b(V,null,[t(G,null,{default:d(()=>[t(l,{onNewOrderClick:e.gotoNewOrder,onConfirmRowClick:o[0]||(o[0]=i=>e.openSidePanel("confirm",i)),onDetailRowClick:o[1]||(o[1]=i=>e.openSidePanel("detail",i))},null,8,["onNewOrderClick"])]),_:1}),t(Y,{"model-value":e.sidePanel==="confirm",side:"right",bordered:""},{default:d(()=>[t(r,{"order-id":e.editingRow.id,modelValue:e.editingRow.products,"onUpdate:modelValue":o[2]||(o[2]=i=>e.editingRow.products=i),"order-reference":e.editingRow.reference,onOrderConfirmed:e.handleOrderConfirmed,onOrderConfirmError:e.handleError,onClose:e.closeSidePanel},null,8,["order-id","modelValue","order-reference","onOrderConfirmed","onOrderConfirmError","onClose"])]),_:1},8,["model-value"]),t(Y,{"model-value":e.sidePanel==="detail",side:"right",bordered:""},{default:d(()=>[t(n,{modelValue:e.editingRow,"onUpdate:modelValue":o[3]||(o[3]=i=>e.editingRow=i),onClose:e.closeSidePanel},null,8,["modelValue","onClose"])]),_:1},8,["model-value"])],64)}var Ae=h(ke,[["render",he]]);export{Ae as default};
