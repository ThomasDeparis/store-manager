import{k as _,c as d,h as b,l as te,m as W,r as z,n as ne,o as V,p as N,q as oe,s as G,g as R,t as F,i as le,u as Q,v as j,w as $,x as de,y as ae,z as fe,A as ve,B as me,C as ge,D,E,a as he,d as ie,_ as re,G as M,H as C,I as k,J as h,j as m,Q as se,K as ue,L as B,M as A,N as be,O as pe,P as J,R as X,S as ye,U as we,F as Se,V as ze}from"./index.5f0495ac.js";import{Q as Y,a as I,b as Le,c as $e}from"./QItem.ed7741b1.js";import{Q as _e}from"./QDrawer.8ab07b08.js";import{u as qe}from"./vue-i18n.runtime.e2c31dd8.js";const Ce=["top","middle","bottom"];var Qe=_({name:"QBadge",props:{color:String,textColor:String,floating:Boolean,transparent:Boolean,multiLine:Boolean,outline:Boolean,rounded:Boolean,label:[Number,String],align:{type:String,validator:e=>Ce.includes(e)}},setup(e,{slots:c}){const n=d(()=>e.align!==void 0?{verticalAlign:e.align}:null),t=d(()=>{const o=e.outline===!0&&e.color||e.textColor;return`q-badge flex inline items-center no-wrap q-badge--${e.multiLine===!0?"multi":"single"}-line`+(e.outline===!0?" q-badge--outline":e.color!==void 0?` bg-${e.color}`:"")+(o!==void 0?` text-${o}`:"")+(e.floating===!0?" q-badge--floating":"")+(e.rounded===!0?" q-badge--rounded":"")+(e.transparent===!0?" q-badge--transparent":"")});return()=>b("div",{class:t.value,style:n.value,role:"status","aria-label":e.label},te(c.default,e.label!==void 0?[e.label]:[]))}}),Te=_({name:"QToolbarTitle",props:{shrink:Boolean},setup(e,{slots:c}){const n=d(()=>"q-toolbar__title ellipsis"+(e.shrink===!0?" col-shrink":""));return()=>b("div",{class:n.value},W(c.default))}}),xe=_({name:"QToolbar",props:{inset:Boolean},setup(e,{slots:c}){const n=d(()=>"q-toolbar row no-wrap items-center"+(e.inset===!0?" q-toolbar--inset":""));return()=>b("div",{class:n.value,role:"toolbar"},W(c.default))}});function ke(){const e=z(!ne.value);return e.value===!1&&V(()=>{e.value=!0}),e}const ce=typeof ResizeObserver!="undefined",Z=ce===!0?{}:{style:"display:block;position:absolute;top:0;left:0;right:0;bottom:0;height:100%;width:100%;overflow:hidden;pointer-events:none;z-index:-1;",url:"about:blank"};var U=_({name:"QResizeObserver",props:{debounce:{type:[String,Number],default:100}},emits:["resize"],setup(e,{emit:c}){let n=null,t,o={width:-1,height:-1};function s(a){a===!0||e.debounce===0||e.debounce==="0"?u():n===null&&(n=setTimeout(u,e.debounce))}function u(){if(n!==null&&(clearTimeout(n),n=null),t){const{offsetWidth:a,offsetHeight:i}=t;(a!==o.width||i!==o.height)&&(o={width:a,height:i},c("resize",o))}}const{proxy:v}=R();if(ce===!0){let a;const i=p=>{t=v.$el.parentNode,t?(a=new ResizeObserver(s),a.observe(t),u()):p!==!0&&G(()=>{i(!0)})};return V(()=>{i()}),N(()=>{n!==null&&clearTimeout(n),a!==void 0&&(a.disconnect!==void 0?a.disconnect():t&&a.unobserve(t))}),oe}else{let p=function(){n!==null&&(clearTimeout(n),n=null),i!==void 0&&(i.removeEventListener!==void 0&&i.removeEventListener("resize",s,F.passive),i=void 0)},y=function(){p(),t&&t.contentDocument&&(i=t.contentDocument.defaultView,i.addEventListener("resize",s,F.passive),u())};const a=ke();let i;return V(()=>{G(()=>{t=v.$el,t&&y()})}),N(p),v.trigger=s,()=>{if(a.value===!0)return b("object",{style:Z.style,tabindex:-1,type:"text/html",data:Z.url,"aria-hidden":"true",onLoad:y})}}}}),Be=_({name:"QHeader",props:{modelValue:{type:Boolean,default:!0},reveal:Boolean,revealOffset:{type:Number,default:250},bordered:Boolean,elevated:Boolean,heightHint:{type:[String,Number],default:50}},emits:["reveal","focusin"],setup(e,{slots:c,emit:n}){const{proxy:{$q:t}}=R(),o=le(j,Q);if(o===Q)return console.error("QHeader needs to be child of QLayout"),Q;const s=z(parseInt(e.heightHint,10)),u=z(!0),v=d(()=>e.reveal===!0||o.view.value.indexOf("H")>-1||t.platform.is.ios&&o.isContainer.value===!0),a=d(()=>{if(e.modelValue!==!0)return 0;if(v.value===!0)return u.value===!0?s.value:0;const l=s.value-o.scroll.value.position;return l>0?l:0}),i=d(()=>e.modelValue!==!0||v.value===!0&&u.value!==!0),p=d(()=>e.modelValue===!0&&i.value===!0&&e.reveal===!0),y=d(()=>"q-header q-layout__section--marginal "+(v.value===!0?"fixed":"absolute")+"-top"+(e.bordered===!0?" q-header--bordered":"")+(i.value===!0?" q-header--hidden":"")+(e.modelValue!==!0?" q-layout--prevent-focus":"")),L=d(()=>{const l=o.rows.value.top,w={};return l[0]==="l"&&o.left.space===!0&&(w[t.lang.rtl===!0?"right":"left"]=`${o.left.size}px`),l[2]==="r"&&o.right.space===!0&&(w[t.lang.rtl===!0?"left":"right"]=`${o.right.size}px`),w});function f(l,w){o.update("header",l,w)}function S(l,w){l.value!==w&&(l.value=w)}function O({height:l}){S(s,l),f("size",l)}function P(l){p.value===!0&&S(u,!0),n("focusin",l)}$(()=>e.modelValue,l=>{f("space",l),S(u,!0),o.animate()}),$(a,l=>{f("offset",l)}),$(()=>e.reveal,l=>{l===!1&&S(u,e.modelValue)}),$(u,l=>{o.animate(),n("reveal",l)}),$(o.scroll,l=>{e.reveal===!0&&S(u,l.direction==="up"||l.position<=e.revealOffset||l.position-l.inflectionPoint<100)});const T={};return o.instances.header=T,e.modelValue===!0&&f("size",s.value),f("space",e.modelValue),f("offset",a.value),N(()=>{o.instances.header===T&&(o.instances.header=void 0,f("size",0),f("offset",0),f("space",!1))}),()=>{const l=de(c.default,[]);return e.elevated===!0&&l.push(b("div",{class:"q-layout__shadow absolute-full overflow-hidden no-pointer-events"})),l.push(b(U,{debounce:0,onResize:O})),b("header",{class:y.value,style:L.value,onFocusin:P},l)}}}),Ve=_({name:"QPageContainer",setup(e,{slots:c}){const{proxy:{$q:n}}=R(),t=le(j,Q);if(t===Q)return console.error("QPageContainer needs to be child of QLayout"),Q;ae(fe,!0);const o=d(()=>{const s={};return t.header.space===!0&&(s.paddingTop=`${t.header.size}px`),t.right.space===!0&&(s[`padding${n.lang.rtl===!0?"Left":"Right"}`]=`${t.right.size}px`),t.footer.space===!0&&(s.paddingBottom=`${t.footer.size}px`),t.left.space===!0&&(s[`padding${n.lang.rtl===!0?"Right":"Left"}`]=`${t.left.size}px`),s});return()=>b("div",{class:"q-page-container",style:o.value},W(c.default))}});const{passive:ee}=F,Re=["both","horizontal","vertical"];var Ee=_({name:"QScrollObserver",props:{axis:{type:String,validator:e=>Re.includes(e),default:"vertical"},debounce:[String,Number],scrollTarget:{default:void 0}},emits:["scroll"],setup(e,{emit:c}){const n={position:{top:0,left:0},direction:"down",directionChanged:!1,delta:{top:0,left:0},inflectionPoint:{top:0,left:0}};let t=null,o,s;$(()=>e.scrollTarget,()=>{a(),v()});function u(){t!==null&&t();const y=Math.max(0,me(o)),L=ge(o),f={top:y-n.position.top,left:L-n.position.left};if(e.axis==="vertical"&&f.top===0||e.axis==="horizontal"&&f.left===0)return;const S=Math.abs(f.top)>=Math.abs(f.left)?f.top<0?"up":"down":f.left<0?"left":"right";n.position={top:y,left:L},n.directionChanged=n.direction!==S,n.delta=f,n.directionChanged===!0&&(n.direction=S,n.inflectionPoint=n.position),c("scroll",{...n})}function v(){o=ve(s,e.scrollTarget),o.addEventListener("scroll",i,ee),i(!0)}function a(){o!==void 0&&(o.removeEventListener("scroll",i,ee),o=void 0)}function i(y){if(y===!0||e.debounce===0||e.debounce==="0")u();else if(t===null){const[L,f]=e.debounce?[setTimeout(u,e.debounce),clearTimeout]:[requestAnimationFrame(u),cancelAnimationFrame];t=()=>{f(L),t=null}}}const{proxy:p}=R();return $(()=>p.$q.lang.rtl,u),V(()=>{s=p.$el.parentNode,v()}),N(()=>{t!==null&&t(),a()}),Object.assign(p,{trigger:i,getPosition:()=>n}),oe}}),Ne=_({name:"QLayout",props:{container:Boolean,view:{type:String,default:"hhh lpr fff",validator:e=>/^(h|l)h(h|r) lpr (f|l)f(f|r)$/.test(e.toLowerCase())},onScroll:Function,onScrollHeight:Function,onResize:Function},setup(e,{slots:c,emit:n}){const{proxy:{$q:t}}=R(),o=z(null),s=z(t.screen.height),u=z(e.container===!0?0:t.screen.width),v=z({position:0,direction:"down",inflectionPoint:0}),a=z(0),i=z(ne.value===!0?0:D()),p=d(()=>"q-layout q-layout--"+(e.container===!0?"containerized":"standard")),y=d(()=>e.container===!1?{minHeight:t.screen.height+"px"}:null),L=d(()=>i.value!==0?{[t.lang.rtl===!0?"left":"right"]:`${i.value}px`}:null),f=d(()=>i.value!==0?{[t.lang.rtl===!0?"right":"left"]:0,[t.lang.rtl===!0?"left":"right"]:`-${i.value}px`,width:`calc(100% + ${i.value}px)`}:null);function S(r){if(e.container===!0||document.qScrollPrevented!==!0){const g={position:r.position.top,direction:r.direction,directionChanged:r.directionChanged,inflectionPoint:r.inflectionPoint.top,delta:r.delta.top};v.value=g,e.onScroll!==void 0&&n("scroll",g)}}function O(r){const{height:g,width:q}=r;let x=!1;s.value!==g&&(x=!0,s.value=g,e.onScrollHeight!==void 0&&n("scrollHeight",g),T()),u.value!==q&&(x=!0,u.value=q),x===!0&&e.onResize!==void 0&&n("resize",r)}function P({height:r}){a.value!==r&&(a.value=r,T())}function T(){if(e.container===!0){const r=s.value>a.value?D():0;i.value!==r&&(i.value=r)}}let l=null;const w={instances:{},view:d(()=>e.view),isContainer:d(()=>e.container),rootRef:o,height:s,containerHeight:a,scrollbarWidth:i,totalWidth:d(()=>u.value+i.value),rows:d(()=>{const r=e.view.toLowerCase().split(" ");return{top:r[0].split(""),middle:r[1].split(""),bottom:r[2].split("")}}),header:E({size:0,offset:0,space:!1}),right:E({size:300,offset:0,space:!1}),footer:E({size:0,offset:0,space:!1}),left:E({size:300,offset:0,space:!1}),scroll:v,animate(){l!==null?clearTimeout(l):document.body.classList.add("q-body--layout-animate"),l=setTimeout(()=>{l=null,document.body.classList.remove("q-body--layout-animate")},155)},update(r,g,q){w[r][g]=q}};if(ae(j,w),D()>0){let q=function(){r=null,g.classList.remove("hide-scrollbar")},x=function(){if(r===null){if(g.scrollHeight>t.screen.height)return;g.classList.add("hide-scrollbar")}else clearTimeout(r);r=setTimeout(q,300)},H=function(K){r!==null&&K==="remove"&&(clearTimeout(r),q()),window[`${K}EventListener`]("resize",x)},r=null;const g=document.body;$(()=>e.container!==!0?"add":"remove",H),e.container!==!0&&H("add"),he(()=>{H("remove")})}return()=>{const r=te(c.default,[b(Ee,{onScroll:S}),b(U,{onResize:O})]),g=b("div",{class:p.value,style:y.value,ref:e.container===!0?void 0:o,tabindex:-1},r);return e.container===!0?b("div",{class:"q-layout-container overflow-hidden",ref:o},[b(U,{onResize:P}),b("div",{class:"absolute-full",style:L.value},[b("div",{class:"scroll",style:f.value},[g])])]):g}}});const Oe=ie({name:"EssentialLink",props:{title:{type:String,required:!0},caption:{type:String,default:""},routeName:{type:String,required:!0},icon:{type:String,default:""}}});function Pe(e,c,n,t,o,s){const u=M("router-link");return C(),k(u,{custom:"",to:{name:e.routeName}},{default:h(({href:v})=>[m(Le,{clickable:"",href:v},{default:h(()=>[e.icon?(C(),k(Y,{key:0,avatar:""},{default:h(()=>[m(se,{name:e.icon},null,8,["name"])]),_:1})):ue("",!0),m(Y,null,{default:h(()=>[m(I,null,{default:h(()=>[B(A(e.title),1)]),_:1}),m(I,{caption:""},{default:h(()=>[B(A(e.caption),1)]),_:1})]),_:1})]),_:2},1032,["href"])]),_:1},8,["to"])}var He=re(Oe,[["render",Pe]]);const De=ie({name:"MainLayout",components:{EssentialLink:He},setup(){const{t:e}=qe(),c=be(),n=z(!1),t=pe(),o=d(()=>{var a;return(a=t.userData)==null?void 0:a.email}),s=d(()=>t.isAuthenticated),u=[{title:e("menu.products"),caption:"",icon:"manage_search",routeName:"products"},{title:e("menu.providers"),caption:"",icon:"store",routeName:"providers"},{title:e("menu.orders"),caption:"",icon:"shopping_cart",routeName:"orders"},{title:e("menu.customers"),caption:"",icon:"person",routeName:"customers"},{title:e("menu.sales"),caption:"",icon:"shopping_bag",routeName:"sales"}];V(()=>{t.fetchUser()});const v=d(()=>s.value?{onSign:()=>{t.signOut(),c.push({name:"signin"})},label:e("auth.logoutAction"),icon:"logout"}:{onSign:()=>c.push({name:"signin"}),label:e("auth.loginAction"),icon:"login"});return{essentialLinks:u,leftDrawerOpen:n,toggleLeftDrawer(){n.value=!n.value},userEmail:o,userAuthenticated:s,signButton:v}}}),Fe={class:"text-body2 q-ma-sm"};function Me(e,c,n,t,o,s){const u=M("EssentialLink"),v=M("router-view");return C(),k(Ne,{view:"lHh Lpr lFf"},{default:h(()=>[m(Be,{elevated:""},{default:h(()=>[m(xe,null,{default:h(()=>[m(J,{flat:"",dense:"",round:"",icon:"menu","aria-label":e.$t("menu.menu"),onClick:e.toggleLeftDrawer},null,8,["aria-label","onClick"]),m(Te,null,{default:h(()=>[B("Store Manager "),m(Qe,{outline:"",align:"middle",color:"white"},{default:h(()=>[B(" v0.1.0 ")]),_:1})]),_:1}),e.userEmail?(C(),k(se,{key:0,name:"account_circle",size:"sm"})):ue("",!0),X("p",Fe,A(e.userEmail),1),X("div",null,[m(J,{flat:"",name:"sign-btn","icon-right":e.signButton.icon,label:e.signButton.label,onClick:e.signButton.onSign},null,8,["icon-right","label","onClick"])])]),_:1})]),_:1}),m(_e,{modelValue:e.leftDrawerOpen,"onUpdate:modelValue":c[0]||(c[0]=a=>e.leftDrawerOpen=a),side:"left",bordered:""},{default:h(()=>[m($e,null,{default:h(()=>[m(I,{header:""},{default:h(()=>[B(" Menu ")]),_:1}),(C(!0),ye(Se,null,we(e.essentialLinks,a=>(C(),k(u,ze({key:a.title},a),null,16))),128))]),_:1})]),_:1},8,["modelValue"]),m(Ve,null,{default:h(()=>[m(v)]),_:1})]),_:1})}var je=re(De,[["render",Me]]);export{je as default};
