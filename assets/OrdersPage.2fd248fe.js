import{Q as G}from"./QPage.0f706cc1.js";import{Q as A}from"./QDrawer.a6ea1df3.js";import{d as O,c as Q,w as J,o as K,r as _,_ as k,H as v,R as w,j as o,J as t,O as g,aj as L,Q as W,I as C,P as p,M as s,K as h,G as S,L as $,S as M,F as P,b5 as j,N as X}from"./index.8300ccfe.js";import{Q as Z,a as N,S as U}from"./SidePanel.6b0f7ddc.js";import{Q as x,a as ee}from"./errortype.eab57c96.js";import{u as q,h as Y,a as re}from"./order-error-handler.ad553f26.js";import{u as B}from"./provider-store.27abb774.js";import{u as oe}from"./user-store.7356289a.js";import{u as z}from"./vue-i18n.runtime.3c42af3a.js";import{c as H,b as T,Q as F,a as y}from"./QItem.31c283e7.js";import{Q as te,u as de}from"./notify-handler.25a51192.js";import{u as ne}from"./use-dialog-plugin-component.f583a371.js";import"./product-store.c654f249.js";import"./index.416aadda.js";const le=O({name:"OrderGrid",emits:["new-order-click","confirm-row-click","detail-row-click"],setup(){const{t:e}=z(),r=q(),a=oe(),c=B(),m=[{name:"actions",label:"",align:"center"},{name:"reference",label:e("order.reference"),field:"reference",sortable:!0},{name:"provider",label:e("order.provider"),field:"providerName"},{name:"orderDate",label:e("order.orderDate"),field:"orderDate",sortable:!0,format:d=>Y(d).format("DD/MM/YYYY")},{name:"receiptDate",label:e("order.receiptDate"),field:"receiptDate",sortable:!0,format:d=>d?Y(d).format("DD/MM/YYYY HH:mm"):""}],u=()=>{var d,i;(r.orders==null||((d=r.orders)==null?void 0:d.length)===0||r.storeId!==a.currentStore)&&r.loadOrders(a.currentStore),(c.providers==null||((i=c.providers)==null?void 0:i.length)===0||c.storeId!==a.currentStore)&&c.loadProviders(a.currentStore)},n=Q(()=>c.providers),l=Q(()=>r.orders.map(function(d){var i;return{...d,providerName:(i=n.value.find(f=>f.id===d.providerId))==null?void 0:i.name,actions:null}}));return J(()=>a.currentStore,()=>{u()}),K(()=>{a.currentStore!=null&&u()}),{filter:_(""),columns:m,rows:l,loadOrders:u,loading:Q(()=>r.isLoading)}}}),ae={class:"q-pa-md"},se={class:"text-body2"},ie={class:"text-body2"};function ce(e,r,a,c,m,u){return v(),w("div",ae,[o(ee,{"grid-header":"",bordered:"",rows:e.rows,columns:e.columns,"row-key":"reference",filter:e.filter,"rows-per-page-options":[50,100]},{top:t(()=>[o(g,{color:"primary",label:e.$t("order.newOrder"),onClick:r[0]||(r[0]=n=>e.$emit("new-order-click"))},null,8,["label"]),o(Z),o(L,{dense:"",debounce:"300",color:"primary",modelValue:e.filter,"onUpdate:modelValue":r[1]||(r[1]=n=>e.filter=n)},{append:t(()=>[o(W,{name:"search"})]),_:1},8,["modelValue"])]),"body-cell-actions":t(n=>[o(x,{props:n},{default:t(()=>[n.row.receiptDate===void 0?(v(),C(g,{key:0,class:"q-mr-sm",icon:"check_circle",push:"",round:"",color:"green",size:"sm",onClick:l=>e.$emit("confirm-row-click",n.row)},{default:t(()=>[o(N,null,{default:t(()=>[p("div",se,s(e.$t("order.confirm")),1)]),_:1})]),_:2},1032,["onClick"])):h("",!0),n.row.receiptDate?(v(),C(g,{key:1,"data-testid":"detailorderbtn",class:"q-mr-sm",icon:"visibility",push:"",round:"",color:"primary",size:"sm",onClick:l=>e.$emit("detail-row-click",n.row)},{default:t(()=>[o(N,null,{default:t(()=>[p("div",ie,s(e.$t("buttons.detail")),1)]),_:1})]),_:2},1032,["onClick"])):h("",!0)]),_:2},1032,["props"])]),_:1},8,["rows","columns","filter"])])}var ue=k(le,[["render",ce]]);const me=O({name:"OrderConfirm",components:{SidePanel:U},emits:["order-confirmed","order-confirm-error","close"],props:{orderReference:{type:String},orderId:{type:String,required:!0},modelValue:{type:Object,required:!0}},setup(e,r){const a=Q(()=>e.modelValue),c=q();return{cartContent:a,confirmOrder:async()=>{try{await c.validateReceipt(e.orderId,a.value),r.emit("order-confirmed",a.value)}catch(n){r.emit("order-confirm-error",n)}},fillAllQties:()=>{var n;(n=a==null?void 0:a.value)==null||n.forEach(l=>{l.receivedQty=l.orderedQty})}}}}),fe={class:"row justify-center"},pe={class:"col q-pa-md"},ve=p("div",{class:"text-body2"},"Quantit\xE9 re\xE7ue conforme",-1);function $e(e,r,a,c,m,u){const n=S("side-panel");return v(),C(n,{title:`R\xE9ception de la commande : ${e.orderReference}`,onClose:r[0]||(r[0]=l=>e.$emit("close"))},{default:t(()=>[o(H,{bordered:"",padding:""},{default:t(()=>[o(te,{onSubmit:e.confirmOrder},{default:t(()=>[p("div",fe,[o(g,{class:"q-ma-sm",type:"submit",color:"primary"},{default:t(()=>[$("Confirmer r\xE9ception")]),_:1}),o(g,{class:"q-ma-sm",color:"green",onClick:e.fillAllQties},{default:t(()=>[$("R\xE9ception compl\xE8te")]),_:1},8,["onClick"])]),(v(!0),w(P,null,M(e.cartContent,(l,d)=>{var i;return v(),w("div",{key:l.productId},[o(T,null,{default:t(()=>[o(F,null,{default:t(()=>[o(y,{overline:""},{default:t(()=>[$(s(l.productReference),1)]),_:2},1024),o(y,null,{default:t(()=>[$(s(l.productName),1)]),_:2},1024),o(y,{class:"row",caption:""},{default:t(()=>[o(L,{class:"q-pa-sm col-8",modelValue:l.receivedQty,"onUpdate:modelValue":f=>l.receivedQty=f,modelModifiers:{number:!0},inputmode:"numeric",label:e.$t("order.receivedQty"),hint:`Quantit\xE9 command\xE9e : ${l.orderedQty}`,dense:"","lazy-rules":"",rules:[f=>f>=0||`Quantit\xE9 command\xE9e : ${l.orderedQty}`]},null,8,["modelValue","onUpdate:modelValue","label","hint","rules"]),p("div",pe,[o(g,{class:"",onClick:f=>l.receivedQty=l.orderedQty,round:"",push:"",size:"sm",icon:"assignment_turned_in",color:"green"},{default:t(()=>[o(N,null,{default:t(()=>[ve]),_:1})]),_:2},1032,["onClick"])])]),_:2},1024)]),_:2},1024)]),_:2},1024),d<(((i=e.cartContent)==null?void 0:i.length)||0)-1?(v(),C(j,{key:0,spaced:""})):h("",!0)])}),128))]),_:1},8,["onSubmit"])]),_:1})]),_:1},8,["title"])}var ye=k(me,[["render",$e]]);const Qe=O({name:"OrderDetail",components:{SidePanel:U},emits:["close"],props:{modelValue:{type:Object,required:!0}},setup(e){const r=Q(()=>e.modelValue),a=B(),c=Q(()=>{var u;return(u=a.providers.find(n=>n.id===r.value.providerId))==null?void 0:u.name}),m=Q(()=>{var u,n;return(n=(u=r.value)==null?void 0:u.products)==null?void 0:n.reduce((l,d)=>l+d.unitPrice*((d==null?void 0:d.receivedQty)||0),0)});return{order:r,providerName:c,totalAmount:m}}}),ge={class:"q-my-md q-mx-sm"},we={class:"q-ma-sm"},Ce={class:"q-ma-sm"},be={class:"q-my-md"},Se={class:"row q-mx-sm"},_e={class:"row q-mx-sm text-caption"};function he(e,r,a,c,m,u){const n=S("side-panel");return v(),C(n,{title:`D\xE9tail de la commande : ${e.order.reference}`,onClose:r[0]||(r[0]=l=>e.$emit("close"))},{default:t(()=>{var l;return[p("div",null,[p("p",ge,s(e.$t("order.provider"))+" : "+s(e.providerName),1),p("p",we,s(e.$t("order.orderDate"))+" : "+s(e.order.orderDate.toLocaleDateString()),1),p("p",Ce,s(e.$t("order.receiptDate"))+" : "+s((l=e.order.receiptDate)==null?void 0:l.toLocaleDateString()),1)]),p("div",be,[p("span",Se,s(e.$t("order.totalAmount"))+" : "+s(e.totalAmount)+" \u20AC",1),p("span",_e,s(e.$t("order.cartContent")),1),o(H,{bordered:"",padding:""},{default:t(()=>[(v(!0),w(P,null,M(e.order.products,(d,i)=>{var f,D;return v(),w("div",{key:d.productId},[o(T,null,{default:t(()=>[o(F,null,{default:t(()=>[o(y,{overline:""},{default:t(()=>[$(s(d.productReference),1)]),_:2},1024),o(y,{class:"q-mb-sm"},{default:t(()=>[$(s(d.productName),1)]),_:2},1024),o(y,{class:"row"},{default:t(()=>[$(s(e.$t("order.shortReceivedQty"))+" : "+s(d.receivedQty),1)]),_:2},1024),o(y,{class:"row",caption:""},{default:t(()=>[$(s(e.$t("order.shortQty"))+" : "+s(d.orderedQty),1)]),_:2},1024),o(y,{class:"row"},{default:t(()=>[$(s(e.$t("order.price"))+" : "+s(d.unitPrice)+" \u20AC ",1)]),_:2},1024)]),_:2},1024)]),_:2},1024),i<(((D=(f=e.order)==null?void 0:f.products)==null?void 0:D.length)||0)-1?(v(),C(j,{key:0,spaced:""})):h("",!0)])}),128))]),_:1})])]}),_:1},8,["title"])}var Oe=k(Qe,[["render",he]]);const ke=O({name:"OrdersPage",components:{OrderGrid:ue,OrderConfirm:ye,OrderDetail:Oe},emits:[...ne.emits],setup(){const{t:e}=z(),r=X(),a=_(!1),c=q(),m=de(),u=()=>{r.push({name:"neworder"})},n={id:"",providerId:"",reference:"",orderDate:new Date,storeId:"",products:[]},l=_(n);var d=_(null);const i=(E,b)=>{var I;try{((I=b==null?void 0:b.products)==null?void 0:I.length)===0&&c.loadOrderProducts(b.id),d.value=E;const R=c.orders.find(V=>V.id===b.id);if(!R)m.NotifyError(e("common.technicalError"));else{let V=Object.create(R);l.value=V}}catch{m.NotifyError(e("common.technicalError"))}},f=()=>{d.value=null,l.value=n};return{dialogOpened:a,editingRow:l,gotoNewOrder:u,sidePanel:d,openSidePanel:i,closeSidePanel:f,handleOrderConfirmed:()=>{f(),m.NotifySuccess(e("order.received"))},handleError:E=>{m.NotifyError(re(E))}}}});function De(e,r,a,c,m,u){const n=S("order-grid"),l=S("order-confirm"),d=S("order-detail");return v(),w(P,null,[o(G,null,{default:t(()=>[o(n,{onNewOrderClick:e.gotoNewOrder,onConfirmRowClick:r[0]||(r[0]=i=>e.openSidePanel("confirm",i)),onDetailRowClick:r[1]||(r[1]=i=>e.openSidePanel("detail",i))},null,8,["onNewOrderClick"])]),_:1}),o(A,{"model-value":e.sidePanel==="confirm",side:"right",bordered:""},{default:t(()=>[o(l,{"order-id":e.editingRow.id,modelValue:e.editingRow.products,"onUpdate:modelValue":r[2]||(r[2]=i=>e.editingRow.products=i),"order-reference":e.editingRow.reference,onOrderConfirmed:e.handleOrderConfirmed,onOrderConfirmError:e.handleError,onClose:e.closeSidePanel},null,8,["order-id","modelValue","order-reference","onOrderConfirmed","onOrderConfirmError","onClose"])]),_:1},8,["model-value"]),o(A,{"model-value":e.sidePanel==="detail",side:"right",bordered:""},{default:t(()=>[o(d,{modelValue:e.editingRow,"onUpdate:modelValue":r[3]||(r[3]=i=>e.editingRow=i),onClose:e.closeSidePanel},null,8,["modelValue","onClose"])]),_:1},8,["model-value"])],64)}var He=k(ke,[["render",De]]);export{He as default};