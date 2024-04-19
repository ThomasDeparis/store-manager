import{Q as R}from"./QPage.8dded32a.js";import{Q as L}from"./QDrawer.31ff5b98.js";import{d as N,O as A,c as S,w as B,o as M,r as v,_ as k,H as f,S as y,j as s,J as n,P as O,ap as T,Q as U,R as p,M as l,G as h,I as P,U as Y,F as I,L as w,b8 as j,K as G,N as F}from"./index.3e052ca9.js";import{Q as H,a as z,S as J}from"./SidePanel.7e6d8c03.js";import{Q as K,a as W}from"./errortype.8692b588.js";import{u as V,h as X,a as Z}from"./order-error-handler.5b122c7d.js";import{u as q}from"./customer-store.6a5feed2.js";import{u as E}from"./vue-i18n.runtime.e96c4d73.js";import{c as x,b as ee,Q as re,a as b}from"./QItem.0d18ef71.js";import{u as oe}from"./notify-handler.f1c2246c.js";import{u as te}from"./use-dialog-plugin-component.9150cb02.js";import"./product-store.12c5170f.js";import"./index.be4ea036.js";const se=N({name:"SaleGrid",emits:["new-order-click","detail-row-click"],setup(){const{t:e}=E(),r=V(),d=A(),i=q(),c=[{name:"actions",label:"",align:"center"},{name:"reference",label:e("order.reference"),field:"reference",sortable:!0},{name:"Customer",label:e("order.customer"),field:"customerName"},{name:"orderDate",label:e("order.orderDate"),field:"orderDate",sortable:!0,format:o=>X(o).format("DD/MM/YYYY")}],u=()=>{var o,m;(r.customerOrders==null||((o=r.customerOrders)==null?void 0:o.length)===0||r.storeId!==d.currentStore)&&r.loadCustomerOrders(d.currentStore),(i.customers==null||((m=i.customers)==null?void 0:m.length)===0||i.storeId!==d.currentStore)&&i.loadCustomers(d.currentStore)},t=S(()=>i.customers),a=S(()=>r.customerOrders.map(function(o){var m;return{...o,customerName:(m=t.value.find($=>$.id===o.customerId))==null?void 0:m.name,actions:null}}));return B(()=>d.currentStore,()=>{u()}),M(()=>{d.currentStore!=null&&u()}),{filter:v(""),columns:c,rows:a,loading:S(()=>r.isLoading)}}}),ae={class:"q-pa-md"},ne={class:"text-body2"};function le(e,r,d,i,c,u){return f(),y("div",ae,[s(W,{"grid-header":"",bordered:"",rows:e.rows,columns:e.columns,"row-key":"reference",filter:e.filter,"rows-per-page-options":[50,100]},{top:n(()=>[s(O,{color:"primary",label:e.$t("order.newSale"),onClick:r[0]||(r[0]=t=>e.$emit("new-order-click"))},null,8,["label"]),s(H),s(T,{dense:"",debounce:"300",color:"primary",modelValue:e.filter,"onUpdate:modelValue":r[1]||(r[1]=t=>e.filter=t)},{append:n(()=>[s(U,{name:"search"})]),_:1},8,["modelValue"])]),"body-cell-actions":n(t=>[s(K,{props:t},{default:n(()=>[s(O,{"data-testid":"detailorderbtn",class:"q-mr-sm",icon:"visibility",push:"",round:"",color:"primary",size:"sm",onClick:a=>e.$emit("detail-row-click",t.row)},{default:n(()=>[s(z,null,{default:n(()=>[p("div",ne,l(e.$t("buttons.detail")),1)]),_:1})]),_:2},1032,["onClick"])]),_:2},1032,["props"])]),_:1},8,["rows","columns","filter"])])}var de=k(se,[["render",le]]);const ie=N({name:"SaleDetail",components:{SidePanel:J},emits:["close"],props:{modelValue:{type:Object,required:!0}},setup(e){const r=S(()=>e.modelValue),d=q(),i=S(()=>{var u;return(u=d.customers.find(t=>t.id===r.value.customerId))==null?void 0:u.name}),c=S(()=>{var u,t;return(t=(u=r.value)==null?void 0:u.products)==null?void 0:t.reduce((a,o)=>a+o.unitPrice*((o==null?void 0:o.orderedQty)||0),0)});return{order:r,recipientName:i,totalAmount:c}}}),ue={class:"q-my-md q-mx-sm"},ce={class:"q-ma-sm"},me={class:"q-my-md"},pe={class:"row q-mx-sm"},fe={class:"row q-mx-sm text-caption"};function Se(e,r,d,i,c,u){const t=h("side-panel");return f(),P(t,{title:`D\xE9tail de la commande : ${e.order.reference}`,onClose:r[0]||(r[0]=a=>e.$emit("close"))},{default:n(()=>[p("div",null,[p("p",ue,l(e.$t("order.customer"))+" : "+l(e.recipientName),1),p("p",ce,l(e.$t("order.orderDate"))+" : "+l(e.order.orderDate.toLocaleDateString()),1)]),p("div",me,[p("span",pe,l(e.$t("order.totalAmount"))+" : "+l(e.totalAmount)+" \u20AC",1),p("span",fe,l(e.$t("order.cartContent")),1),s(x,{bordered:"",padding:""},{default:n(()=>[(f(!0),y(I,null,Y(e.order.products,(a,o)=>{var m,$;return f(),y("div",{key:a.productId},[s(ee,null,{default:n(()=>[s(re,null,{default:n(()=>[s(b,{overline:""},{default:n(()=>[w(l(a.productReference),1)]),_:2},1024),s(b,{class:"q-mb-sm"},{default:n(()=>[w(l(a.productName),1)]),_:2},1024),s(b,{class:"row"},{default:n(()=>[w(l(e.$t("order.shortQty"))+" : "+l(a.orderedQty),1)]),_:2},1024),s(b,{class:"row"},{default:n(()=>[w(l(e.$t("order.price"))+" : "+l(a.unitPrice)+" \u20AC ",1)]),_:2},1024)]),_:2},1024)]),_:2},1024),o<((($=(m=e.order)==null?void 0:m.products)==null?void 0:$.length)||0)-1?(f(),P(j,{key:0,spaced:""})):G("",!0)])}),128))]),_:1})])]),_:1},8,["title"])}var $e=k(ie,[["render",Se]]);const ge=N({name:"SalesPage",components:{SaleGrid:de,SaleDetail:$e},emits:[...te.emits],setup(){const{t:e}=E(),r=F(),d=v(!1),i=V(),c=oe(),u=()=>{r.push({name:"newsale"})},t={id:"",customerId:"",reference:"",orderDate:new Date,storeId:"",products:[]},a=v(t);var o=v(null);return{dialogOpened:d,editingRow:a,gotoNewOrder:u,sidePanel:o,openSidePanel:(Q,g)=>{var D;try{((D=g==null?void 0:g.products)==null?void 0:D.length)===0&&i.loadOrderProducts(g.id),o.value=Q;const C=i.customerOrders.find(_=>_.id===g.id);if(!C)c.NotifyError(e("common.technicalError"));else{let _=Object.create(C);a.value=_}}catch{c.NotifyError(e("common.technicalError"))}},closeSidePanel:()=>{o.value=null,a.value=t},handleError:Q=>{c.NotifyError(Z(Q))}}}});function we(e,r,d,i,c,u){const t=h("sale-grid"),a=h("sale-detail");return f(),y(I,null,[s(R,null,{default:n(()=>[s(t,{onNewOrderClick:e.gotoNewOrder,onDetailRowClick:r[0]||(r[0]=o=>e.openSidePanel("detail",o))},null,8,["onNewOrderClick"])]),_:1}),s(L,{"model-value":e.sidePanel==="detail",side:"right",bordered:""},{default:n(()=>[s(a,{modelValue:e.editingRow,"onUpdate:modelValue":r[1]||(r[1]=o=>e.editingRow=o),onClose:e.closeSidePanel},null,8,["modelValue","onClose"])]),_:1},8,["model-value"])],64)}var qe=k(ge,[["render",we]]);export{qe as default};