import{Q as I}from"./QPage.380899da.js";import{Q as U}from"./QDrawer.644b8a8c.js";import{d as V,w as F,o as j,c as k,r as p,_ as w,H as v,R as Q,j as r,J as a,O as b,aj as c,Q as B,P,G as $,I as R,ak as D,al as A,am as G,K,F as O}from"./index.763f224d.js";import{Q as H,a as C,S as q}from"./SidePanel.b192e918.js";import{Q as J,a as L,E as W}from"./errortype.de26a0c9.js";import{u as h,P as X}from"./product-store.7424b107.js";import{u as E}from"./user-store.d4083d07.js";import{u as M}from"./vue-i18n.runtime.fe1e0126.js";import{Q as N,u as Y}from"./notify-handler.373517b4.js";import{t as S}from"./index.6da9593d.js";import"./QItem.7ed9533f.js";const Z=V({name:"ProductGrid",emits:["new-product-click","edit-row-click","detail-row-click"],setup(){const{t:e}=M(),l=h(),d=E(),s=[{name:"actions",label:"",align:"center"},{name:"reference",label:e("product.reference"),field:"reference",sortable:!0},{name:"providerreference",label:e("product.providerRef"),field:"providerReference",sortable:!0},{name:"name",label:e("product.name"),field:"name",sortable:!0},{name:"quantity",label:e("product.quantity"),field:"quantity",sortable:!0},{name:"sellprice",label:e("product.sellPrice"),field:"sellPrice",format:t=>`${t} \u20AC`}],n=()=>{l.loadProducts(d.currentStore)};F(()=>d.currentStore,()=>{n()}),j(()=>{d.currentStore!=null&&n()});const u=k(()=>l.products.map(function(t){return{...t,actions:null}}));return{filter:p(""),columns:s,rows:u,loadProducts:n,loading:l.isLoading}}}),_={class:"q-pa-md"},x=P("div",{class:"text-body2"},"\xC9diter",-1),ee=P("div",{class:"text-body2"},"D\xE9tail",-1),le=P("div",{class:"text-body2"},"Dupliquer",-1);function oe(e,l,d,s,n,u){return v(),Q("div",_,[r(L,{class:"body--light","grid-header":"",bordered:"",rows:e.rows,columns:e.columns,"row-key":"reference",filter:e.filter,"rows-per-page-options":[50,100]},{top:a(()=>[r(b,{color:"primary",label:e.$t("product.newProduct"),onClick:l[0]||(l[0]=t=>e.$emit("new-product-click"))},null,8,["label"]),r(H),r(c,{dense:"",debounce:"300",color:"primary",modelValue:e.filter,"onUpdate:modelValue":l[1]||(l[1]=t=>e.filter=t)},{append:a(()=>[r(B,{name:"search"})]),_:1},8,["modelValue"])]),"body-cell-actions":a(t=>[r(J,{props:t},{default:a(()=>[r(b,{class:"q-mr-sm",icon:"edit",push:"",round:"",color:"amber-7",size:"sm",onClick:o=>e.$emit("edit-row-click",t.row)},{default:a(()=>[r(C,null,{default:a(()=>[x]),_:1})]),_:2},1032,["onClick"]),r(b,{icon:"visibility",class:"q-mr-sm",push:"",round:"",color:"primary",size:"sm",onClick:o=>e.$emit("detail-row-click",t.row)},{default:a(()=>[r(C,null,{default:a(()=>[ee]),_:1})]),_:2},1032,["onClick"]),r(b,{icon:"copy_all",round:"",push:"",color:"grey",size:"sm"},{default:a(()=>[r(C,null,{default:a(()=>[le]),_:1})]),_:1})]),_:2},1032,["props"])]),_:1},8,["rows","columns","filter"])])}var re=w(Z,[["render",oe]]);const te=V({name:"ProductCreation",emits:["close","product-created","product-creation-failed"],components:{SidePanel:q},setup(e,l){const d=p(),s=p(""),n=p(""),u=p(0),t=p(""),o=h(),f=E(),i=()=>{var y;s.value="",n.value="",u.value=0,t.value="",(y=d.value)==null||y.resetValidation()};return{form:d,reference:s,providerReference:n,sellPrice:u,name:t,onSubmit:async()=>{var y;try{const m={reference:s.value,providerReference:n.value,sellPrice:u.value,name:t.value,quantity:0,storeId:f.currentStore,lastChangeUserId:(y=f.userData)==null?void 0:y.uid},g=await o.addProduct(m);l.emit("product-created",g),i()}catch(m){l.emit("product-creation-failed",m)}}}}}),de={class:"row justify-center"};function ne(e,l,d,s,n,u){const t=$("side-panel");return v(),R(t,{title:e.$t("product.newProduct"),onClose:l[4]||(l[4]=o=>e.$emit("close"))},{default:a(()=>[r(N,{onSubmit:e.onSubmit,ref:"form",class:"q-gutter-md q-pa-sm"},{default:a(()=>[r(c,{filled:"",modelValue:e.reference,"onUpdate:modelValue":l[0]||(l[0]=o=>e.reference=o),label:e.$t("product.reference"),"lazy-rules":"",rules:[o=>o&&o.length>0||e.$t("forms.mandatory")]},null,8,["modelValue","label","rules"]),r(c,{filled:"",modelValue:e.providerReference,"onUpdate:modelValue":l[1]||(l[1]=o=>e.providerReference=o),label:e.$t("product.providerReference")},null,8,["modelValue","label"]),r(c,{filled:"",modelValue:e.name,"onUpdate:modelValue":l[2]||(l[2]=o=>e.name=o),label:e.$t("product.name"),"lazy-rules":"",rules:[o=>o&&o.length>0||e.$t("forms.mandatory")]},null,8,["modelValue","label","rules"]),r(c,{filled:"",suffix:"\u20AC",mask:"#.##","fill-mask":"0","reverse-fill-mask":"",modelValue:e.sellPrice,"onUpdate:modelValue":l[3]||(l[3]=o=>e.sellPrice=o),"input-class":"text-right",label:e.$t("product.sellPrice"),"lazy-rules":"",rules:[o=>o!==null&&o!==""&&o>0||e.$t("product.enterValidSellPrice")]},null,8,["modelValue","label","rules"]),P("div",de,[r(b,{label:e.$t("buttons.create"),type:"submit",color:"primary"},null,8,["label"])])]),_:1},8,["onSubmit"])]),_:1},8,["title"])}var ae=w(te,[["render",ne]]);const se=V({name:"ProductEdit",props:{readonlyMode:{type:Boolean,default:!1},modelValue:{type:Object,required:!0}},emits:["close","update:modelValue","update:readonlyMode","product-edit-failed"],components:{SidePanel:q},setup(e,l){const d=k(()=>e.modelValue),s=D(e.readonlyMode);A(()=>s.value=e.readonlyMode);const n=h(),u=E();return{editing:d,isReadonly:s,onSubmit:async()=>{var o;try{d.value.lastChangeUserId=(o=u.userData)==null?void 0:o.uid,await n.editProduct(d.value),l.emit("update:modelValue",d.value)}catch(f){l.emit("product-edit-failed",f)}}}}}),ue={class:"row"},ie={class:"row justify-center"};function me(e,l,d,s,n,u){const t=$("side-panel");return v(),R(t,{title:e.$t("product.detail"),onClose:l[5]||(l[5]=o=>e.$emit("close"))},{default:a(()=>[P("div",ue,[r(G,{class:"","model-value":e.isReadonly,color:"green",label:e.$t("forms.editMode"),"true-value":!1,"false-value":!0,"onUpdate:modelValue":l[0]||(l[0]=o=>e.$emit("update:readonlyMode",e.isReadonly))},null,8,["model-value","label"])]),r(N,{onSubmit:e.onSubmit,ref:"form",class:"q-gutter-md q-pa-sm"},{default:a(()=>[r(c,{filled:"",modelValue:e.editing.reference,"onUpdate:modelValue":l[1]||(l[1]=o=>e.editing.reference=o),label:e.$t("product.reference"),readonly:"","lazy-rules":"",rules:[o=>o&&o.length>0||e.$t("forms.mandatory")]},null,8,["modelValue","label","rules"]),r(c,{filled:"",modelValue:e.editing.providerReference,"onUpdate:modelValue":l[2]||(l[2]=o=>e.editing.providerReference=o),readonly:e.isReadonly,label:e.$t("product.providerReference")},null,8,["modelValue","readonly","label"]),r(c,{filled:"",modelValue:e.editing.name,"onUpdate:modelValue":l[3]||(l[3]=o=>e.editing.name=o),label:e.$t("product.name"),readonly:e.isReadonly,"lazy-rules":"",rules:[o=>o&&o.length>0||e.$t("forms.mandatory")]},null,8,["modelValue","label","readonly","rules"]),r(c,{filled:"",suffix:"\u20AC",mask:"#.##","fill-mask":"0","reverse-fill-mask":"",modelValue:e.editing.sellPrice,"onUpdate:modelValue":l[4]||(l[4]=o=>e.editing.sellPrice=o),"input-class":"text-right",label:e.$t("product.sellPrice"),readonly:e.isReadonly,"lazy-rules":"",rules:[o=>o!==null&&o!==""&&o>0||e.$t("product.enterValidSellPrice")]},null,8,["modelValue","label","readonly","rules"]),P("div",ie,[e.isReadonly?K("",!0):(v(),R(b,{key:0,label:e.$t("buttons.edit"),type:"submit",color:"primary"},null,8,["label"]))])]),_:1},8,["onSubmit"])]),_:1},8,["title"])}var ce=w(se,[["render",me]]);function pe(e){return e.errorType===W.Technical?(console.log(e),S("common.technicalError")):(e==null?void 0:e.messageKey)===X.ReferenceExists?S("product.referenceExists"):S("common.technicalError")}const fe=V({name:"ProductsPage",components:{ProductGrid:re,ProductCreation:ae,ProductEdit:ce},setup(){const{t:e}=M(),l=Y(),d={id:"",name:"",quantity:0,sellPrice:0,reference:"",storeId:"",providerReference:"",lastChangeUserId:""},s=p(d);var n=p(null);const u=(m,g)=>{n.value=m;let z=Object.create(g);s.value=z},t=()=>{n.value=null,s.value=d},o=k(()=>n.value==="detail");return{handleTechnicalError:m=>l.NotifyError(pe(m)),handleNewProduct:()=>{l.NotifySuccess(e("product.created"))},handleProductEdited:()=>{l.NotifySuccess(e("product.edited")),t()},sidePanel:n,openSidePanel:u,closeSidePanel:t,emptyRow:d,editingRow:s,readonlyEditMode:o,handleEditModeChanged:m=>{n.value=m?"edit":"detail"}}}});function ye(e,l,d,s,n,u){const t=$("product-grid"),o=$("product-creation"),f=$("product-edit");return v(),Q(O,null,[r(I,null,{default:a(()=>[r(t,{onNewProductClick:l[0]||(l[0]=i=>e.openSidePanel("new",e.emptyRow)),onEditRowClick:l[1]||(l[1]=i=>e.openSidePanel("edit",i)),onDetailRowClick:l[2]||(l[2]=i=>e.openSidePanel("detail",i))})]),_:1}),r(U,{"model-value":e.sidePanel==="new",side:"right",bordered:""},{default:a(()=>[r(o,{onProductCreated:e.handleNewProduct,onProductCreationFailed:e.handleTechnicalError,onClose:e.closeSidePanel},null,8,["onProductCreated","onProductCreationFailed","onClose"])]),_:1},8,["model-value"]),r(U,{"model-value":e.sidePanel==="edit"||e.sidePanel==="detail",side:"right",bordered:""},{default:a(()=>[r(f,{modelValue:e.editingRow,"onUpdate:modelValue":[l[3]||(l[3]=i=>e.editingRow=i),e.handleProductEdited],"readonly-mode":e.readonlyEditMode,onClose:e.closeSidePanel,"onUpdate:readonlyMode":e.handleEditModeChanged,onProductEditFailed:e.handleTechnicalError},null,8,["modelValue","readonly-mode","onClose","onUpdate:modelValue","onUpdate:readonlyMode","onProductEditFailed"])]),_:1},8,["model-value"])],64)}var he=w(fe,[["render",ye]]);export{he as default};
