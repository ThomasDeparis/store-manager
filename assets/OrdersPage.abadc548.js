import{Q as J}from"./QPage.f473b792.js";import{Q as Y}from"./QDrawer.8ab07b08.js";import{d as h,O as K,c as Q,w as W,o as X,r as S,_ as k,H as p,S as w,j as o,J as t,P as g,aj as M,Q as Z,I as C,R as f,M as s,K as _,G as O,L as $,U,F as q,b3 as j,N as x}from"./index.5f0495ac.js";import{Q as ee,a as N,S as B}from"./SidePanel.1b2ed46f.js";import{Q as re,a as oe}from"./errortype.a68fff0f.js";import{u as I,h as L,a as te}from"./order-error-handler.765b2f02.js";import{u as z}from"./provider-store.c77133c0.js";import{u as H}from"./vue-i18n.runtime.e2c31dd8.js";import{c as T,b as F,Q as G,a as y}from"./QItem.ed7741b1.js";import{Q as de}from"./QForm.1719482b.js";import{u as ne}from"./notify-handler.9c7effc6.js";import{u as le}from"./use-dialog-plugin-component.935a0585.js";import"./product-store.2678143c.js";import"./index.257e11b4.js";const ie=h({name:"OrderGrid",emits:["new-order-click","confirm-row-click","detail-row-click"],setup(){const{t:e}=H(),r=I(),a=K(),c=z(),m=[{name:"actions",label:"",align:"center"},{name:"reference",label:e("order.reference"),field:"reference",sortable:!0},{name:"provider",label:e("order.provider"),field:"providerName"},{name:"orderDate",label:e("order.orderDate"),field:"orderDate",sortable:!0,format:l=>L(l).format("DD/MM/YYYY")},{name:"receiptDate",label:e("order.receiptDate"),field:"receiptDate",sortable:!0,format:l=>l?L(l).format("DD/MM/YYYY HH:mm"):""}],u=()=>{var l,i;(r.providerOrders==null||((l=r.providerOrders)==null?void 0:l.length)===0||r.storeId!==a.currentStore)&&r.loadProviderOrders(a.currentStore),(c.providers==null||((i=c.providers)==null?void 0:i.length)===0||c.storeId!==a.currentStore)&&c.loadProviders(a.currentStore)},d=Q(()=>c.providers),n=Q(()=>r.providerOrders.map(function(l){var i;return{...l,providerName:(i=d.value.find(v=>v.id===l.providerId))==null?void 0:i.name,actions:null}}));return W(()=>a.currentStore,()=>{u()}),X(()=>{a.currentStore!=null&&u()}),{filter:S(""),columns:m,rows:n,loading:Q(()=>r.isLoading)}}}),ae={class:"q-pa-md"},se={class:"text-body2"},ce={class:"text-body2"};function ue(e,r,a,c,m,u){return p(),w("div",ae,[o(oe,{"grid-header":"",bordered:"",rows:e.rows,columns:e.columns,"row-key":"reference",filter:e.filter,"rows-per-page-options":[50,100]},{top:t(()=>[o(g,{color:"primary",label:e.$t("order.newOrder"),onClick:r[0]||(r[0]=d=>e.$emit("new-order-click"))},null,8,["label"]),o(ee),o(M,{dense:"",debounce:"300",color:"primary",modelValue:e.filter,"onUpdate:modelValue":r[1]||(r[1]=d=>e.filter=d)},{append:t(()=>[o(Z,{name:"search"})]),_:1},8,["modelValue"])]),"body-cell-actions":t(d=>[o(re,{props:d},{default:t(()=>[d.row.receiptDate===void 0?(p(),C(g,{key:0,class:"q-mr-sm",icon:"check_circle",push:"",round:"",color:"green",size:"sm",onClick:n=>e.$emit("confirm-row-click",d.row)},{default:t(()=>[o(N,null,{default:t(()=>[f("div",se,s(e.$t("order.confirm")),1)]),_:1})]),_:2},1032,["onClick"])):_("",!0),d.row.receiptDate?(p(),C(g,{key:1,"data-testid":"detailorderbtn",class:"q-mr-sm",icon:"visibility",push:"",round:"",color:"primary",size:"sm",onClick:n=>e.$emit("detail-row-click",d.row)},{default:t(()=>[o(N,null,{default:t(()=>[f("div",ce,s(e.$t("buttons.detail")),1)]),_:1})]),_:2},1032,["onClick"])):_("",!0)]),_:2},1032,["props"])]),_:1},8,["rows","columns","filter"])])}var me=k(ie,[["render",ue]]);const fe=h({name:"OrderConfirm",components:{SidePanel:B},emits:["order-confirmed","order-confirm-error","close"],props:{orderReference:{type:String},orderId:{type:String,required:!0},modelValue:{type:Object,required:!0}},setup(e,r){const a=Q(()=>e.modelValue),c=I();return{cartContent:a,confirmOrder:async()=>{try{await c.validateReceipt(e.orderId,a.value),r.emit("order-confirmed",a.value)}catch(d){r.emit("order-confirm-error",d)}},fillAllQties:()=>{var d;(d=a==null?void 0:a.value)==null||d.forEach(n=>{n.receivedQty=n.orderedQty})}}}}),pe={class:"row justify-center"},ve={class:"col q-pa-md"},$e=f("div",{class:"text-body2"},"Quantit\xE9 re\xE7ue conforme",-1);function ye(e,r,a,c,m,u){const d=O("side-panel");return p(),C(d,{title:`R\xE9ception de la commande : ${e.orderReference}`,onClose:r[0]||(r[0]=n=>e.$emit("close"))},{default:t(()=>[o(T,{bordered:"",padding:""},{default:t(()=>[o(de,{onSubmit:e.confirmOrder},{default:t(()=>[f("div",pe,[o(g,{class:"q-ma-sm",type:"submit",color:"primary"},{default:t(()=>[$("Confirmer r\xE9ception")]),_:1}),o(g,{class:"q-ma-sm",color:"green",onClick:e.fillAllQties},{default:t(()=>[$("R\xE9ception compl\xE8te")]),_:1},8,["onClick"])]),(p(!0),w(q,null,U(e.cartContent,(n,l)=>{var i;return p(),w("div",{key:n.productId},[o(F,null,{default:t(()=>[o(G,null,{default:t(()=>[o(y,{overline:""},{default:t(()=>[$(s(n.productReference),1)]),_:2},1024),o(y,null,{default:t(()=>[$(s(n.productName),1)]),_:2},1024),o(y,{class:"row",caption:""},{default:t(()=>[o(M,{class:"q-pa-sm col-8",modelValue:n.receivedQty,"onUpdate:modelValue":v=>n.receivedQty=v,modelModifiers:{number:!0},inputmode:"numeric",label:e.$t("order.receivedQty"),hint:`Quantit\xE9 command\xE9e : ${n.orderedQty}`,dense:"","lazy-rules":"",rules:[v=>v>=0||`Quantit\xE9 command\xE9e : ${n.orderedQty}`]},null,8,["modelValue","onUpdate:modelValue","label","hint","rules"]),f("div",ve,[o(g,{class:"",onClick:v=>n.receivedQty=n.orderedQty,round:"",push:"",size:"sm",icon:"assignment_turned_in",color:"green"},{default:t(()=>[o(N,null,{default:t(()=>[$e]),_:1})]),_:2},1032,["onClick"])])]),_:2},1024)]),_:2},1024)]),_:2},1024),l<(((i=e.cartContent)==null?void 0:i.length)||0)-1?(p(),C(j,{key:0,spaced:""})):_("",!0)])}),128))]),_:1},8,["onSubmit"])]),_:1})]),_:1},8,["title"])}var Qe=k(fe,[["render",ye]]);const ge=h({name:"OrderDetail",components:{SidePanel:B},emits:["close"],props:{modelValue:{type:Object,required:!0}},setup(e){const r=Q(()=>e.modelValue),a=z(),c=Q(()=>{var u;return(u=a.providers.find(d=>d.id===r.value.providerId))==null?void 0:u.name}),m=Q(()=>{var u,d;return(d=(u=r.value)==null?void 0:u.products)==null?void 0:d.reduce((n,l)=>n+l.unitPrice*((l==null?void 0:l.receivedQty)||0),0)});return{order:r,recipientName:c,totalAmount:m}}}),we={class:"q-my-md q-mx-sm"},Ce={class:"q-ma-sm"},be={class:"q-ma-sm"},Oe={class:"q-my-md"},Se={class:"row q-mx-sm"},_e={class:"row q-mx-sm text-caption"};function he(e,r,a,c,m,u){const d=O("side-panel");return p(),C(d,{title:`D\xE9tail de la commande : ${e.order.reference}`,onClose:r[0]||(r[0]=n=>e.$emit("close"))},{default:t(()=>{var n,l;return[f("div",null,[f("p",we,s(e.$t("order.provider"))+" : "+s(e.recipientName),1),f("p",Ce,s(e.$t("order.orderDate"))+" : "+s(e.order.orderDate.toLocaleDateString()),1),f("p",be,s(e.$t("order.receiptDate"))+" : "+s((l=(n=e.order)==null?void 0:n.receiptDate)==null?void 0:l.toLocaleDateString()),1)]),f("div",Oe,[f("span",Se,s(e.$t("order.totalAmount"))+" : "+s(e.totalAmount)+" \u20AC",1),f("span",_e,s(e.$t("order.cartContent")),1),o(T,{bordered:"",padding:""},{default:t(()=>[(p(!0),w(q,null,U(e.order.products,(i,v)=>{var D,E;return p(),w("div",{key:i.productId},[o(F,null,{default:t(()=>[o(G,null,{default:t(()=>[o(y,{overline:""},{default:t(()=>[$(s(i.productReference),1)]),_:2},1024),o(y,{class:"q-mb-sm"},{default:t(()=>[$(s(i.productName),1)]),_:2},1024),o(y,{class:"row"},{default:t(()=>[$(s(e.$t("order.shortReceivedQty"))+" : "+s(i.receivedQty),1)]),_:2},1024),o(y,{class:"row",caption:""},{default:t(()=>[$(s(e.$t("order.shortQty"))+" : "+s(i.orderedQty),1)]),_:2},1024),o(y,{class:"row"},{default:t(()=>[$(s(e.$t("order.price"))+" : "+s(i.unitPrice)+" \u20AC ",1)]),_:2},1024)]),_:2},1024)]),_:2},1024),v<(((E=(D=e.order)==null?void 0:D.products)==null?void 0:E.length)||0)-1?(p(),C(j,{key:0,spaced:""})):_("",!0)])}),128))]),_:1})])]}),_:1},8,["title"])}var ke=k(ge,[["render",he]]);const De=h({name:"OrdersPage",components:{OrderGrid:me,OrderConfirm:Qe,OrderDetail:ke},emits:[...le.emits],setup(){const{t:e}=H(),r=x(),a=S(!1),c=I(),m=ne(),u=()=>{r.push({name:"neworder"})},d={id:"",providerId:"",reference:"",orderDate:new Date,storeId:"",products:[]},n=S(d);var l=S(null);const i=(P,b)=>{var A;try{((A=b==null?void 0:b.products)==null?void 0:A.length)===0&&c.loadOrderProducts(b.id),l.value=P;const R=c.providerOrders.find(V=>V.id===b.id);if(!R)m.NotifyError(e("common.technicalError"));else{let V=Object.create(R);n.value=V}}catch{m.NotifyError(e("common.technicalError"))}},v=()=>{l.value=null,n.value=d};return{dialogOpened:a,editingRow:n,gotoNewOrder:u,sidePanel:l,openSidePanel:i,closeSidePanel:v,handleOrderConfirmed:()=>{v(),m.NotifySuccess(e("order.received"))},handleError:P=>{m.NotifyError(te(P))}}}});function Ee(e,r,a,c,m,u){const d=O("order-grid"),n=O("order-confirm"),l=O("order-detail");return p(),w(q,null,[o(J,null,{default:t(()=>[o(d,{onNewOrderClick:e.gotoNewOrder,onConfirmRowClick:r[0]||(r[0]=i=>e.openSidePanel("confirm",i)),onDetailRowClick:r[1]||(r[1]=i=>e.openSidePanel("detail",i))},null,8,["onNewOrderClick"])]),_:1}),o(Y,{"model-value":e.sidePanel==="confirm",side:"right",bordered:""},{default:t(()=>[o(n,{"order-id":e.editingRow.id,modelValue:e.editingRow.products,"onUpdate:modelValue":r[2]||(r[2]=i=>e.editingRow.products=i),"order-reference":e.editingRow.reference,onOrderConfirmed:e.handleOrderConfirmed,onOrderConfirmError:e.handleError,onClose:e.closeSidePanel},null,8,["order-id","modelValue","order-reference","onOrderConfirmed","onOrderConfirmError","onClose"])]),_:1},8,["model-value"]),o(Y,{"model-value":e.sidePanel==="detail",side:"right",bordered:""},{default:t(()=>[o(l,{modelValue:e.editingRow,"onUpdate:modelValue":r[3]||(r[3]=i=>e.editingRow=i),onClose:e.closeSidePanel},null,8,["modelValue","onClose"])]),_:1},8,["model-value"])],64)}var He=k(De,[["render",Ee]]);export{He as default};