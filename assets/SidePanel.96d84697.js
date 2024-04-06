import{h as T,k as M,aa as ae,ao as oe,ab as ne,r as E,c as h,ap as se,ac as ie,aq as le,ad as re,ar as ce,w as _,p as x,a9 as H,a4 as q,A as ue,as as de,g as fe,m as me,a0 as ve,d as he,_ as ge,H as pe,R as ye,P as S,M as Se,j as Te,O as be,at as Pe,F as we}from"./index.29b42c02.js";import{u as Oe,v as $,b as ke,p as A,c as Ce,d as Ee,r as j,s as _e,e as xe}from"./errortype.f853be41.js";import{d as D}from"./QItem.e27155fb.js";const He=T("div",{class:"q-space"});var Le=M({name:"QSpace",setup(){return()=>He}}),Ne=M({name:"QTooltip",inheritAttrs:!1,props:{...Oe,...ae,...oe,maxHeight:{type:String,default:null},maxWidth:{type:String,default:null},transitionShow:{default:"jump-down"},transitionHide:{default:"jump-up"},anchor:{type:String,default:"bottom middle",validator:$},self:{type:String,default:"top middle",validator:$},offset:{type:Array,default:()=>[14,14],validator:ke},scrollTarget:{default:void 0},delay:{type:Number,default:0},hideDelay:{type:Number,default:0}},emits:[...ne],setup(e,{slots:u,emit:g,attrs:d}){let s,i;const f=fe(),{proxy:{$q:a}}=f,l=E(null),m=E(!1),Q=h(()=>A(e.anchor,a.lang.rtl)),B=h(()=>A(e.self,a.lang.rtl)),L=h(()=>e.persistent!==!0),{registerTick:N,removeTick:R}=se(),{registerTimeout:v}=ie(),{transitionProps:V,transitionStyle:W}=le(e),{localScrollTarget:b,changeScrollEvent:F,unconfigureScrollTarget:z}=Ce(e,k),{anchorEl:o,canShow:I,anchorEvents:r}=Ee({showing:m,configureAnchorEl:Z}),{show:U,hide:p}=re({showing:m,canShow:I,handleShow:J,handleHide:K,hideOnRouteChange:L,processOnMount:!0});Object.assign(r,{delayShow:X,delayHide:Y});const{showPortal:P,hidePortal:w,renderPortal:G}=ce(f,l,te,"tooltip");if(a.platform.is.mobile===!0){const t={anchorEl:o,innerRef:l,onClickOutside(n){return p(n),n.target.classList.contains("q-dialog__backdrop")&&ve(n),!0}},y=h(()=>e.modelValue===null&&e.persistent!==!0&&m.value===!0);_(y,n=>{(n===!0?xe:j)(t)}),x(()=>{j(t)})}function J(t){P(),N(()=>{i=new MutationObserver(()=>c()),i.observe(l.value,{attributes:!1,childList:!0,characterData:!0,subtree:!0}),c(),k()}),s===void 0&&(s=_(()=>a.screen.width+"|"+a.screen.height+"|"+e.self+"|"+e.anchor+"|"+a.lang.rtl,c)),v(()=>{P(!0),g("show",t)},e.transitionDuration)}function K(t){R(),w(),O(),v(()=>{w(!0),g("hide",t)},e.transitionDuration)}function O(){i!==void 0&&(i.disconnect(),i=void 0),s!==void 0&&(s(),s=void 0),z(),H(r,"tooltipTemp")}function c(){_e({targetEl:l.value,offset:e.offset,anchorEl:o.value,anchorOrigin:Q.value,selfOrigin:B.value,maxHeight:e.maxHeight,maxWidth:e.maxWidth})}function X(t){if(a.platform.is.mobile===!0){D(),document.body.classList.add("non-selectable");const y=o.value,n=["touchmove","touchcancel","touchend","click"].map(C=>[y,C,"delayHide","passiveCapture"]);q(r,"tooltipTemp",n)}v(()=>{U(t)},e.delay)}function Y(t){a.platform.is.mobile===!0&&(H(r,"tooltipTemp"),D(),setTimeout(()=>{document.body.classList.remove("non-selectable")},10)),v(()=>{p(t)},e.hideDelay)}function Z(){if(e.noParentEvent===!0||o.value===null)return;const t=a.platform.is.mobile===!0?[[o.value,"touchstart","delayShow","passive"]]:[[o.value,"mouseenter","delayShow","passive"],[o.value,"mouseleave","delayHide","passive"]];q(r,"anchor",t)}function k(){if(o.value!==null||e.scrollTarget!==void 0){b.value=ue(o.value,e.scrollTarget);const t=e.noParentEvent===!0?c:p;F(b.value,t)}}function ee(){return m.value===!0?T("div",{...d,ref:l,class:["q-tooltip q-tooltip--style q-position-engine no-pointer-events",d.class],style:[d.style,W.value],role:"tooltip"},me(u.default)):null}function te(){return T(de,V.value,ee)}return x(O),Object.assign(f.proxy,{updatePosition:c}),G}});const qe=he({name:"SidePanel",props:{title:{type:String,default:""}},emits:["close"]}),$e={class:"row items-center justify-between q-pa-md bg-primary"},Ae={class:"col-8 text-uppercase text-subtitle2 text-white"},je={class:"col-1"};function De(e,u,g,d,s,i){return pe(),ye(we,null,[S("div",$e,[S("div",Ae,Se(e.title),1),S("div",je,[Te(be,{round:"",push:"",size:"sm",icon:"close",color:"primary",onClick:u[0]||(u[0]=f=>e.$emit("close"))})])]),Pe(e.$slots,"default")],64)}var Re=ge(qe,[["render",De]]);export{Le as Q,Re as S,Ne as a};