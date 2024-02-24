import{k as E,r as F,x as P,an as A,ao as N,o as B,h as I,l as Q,g as R,ap as V,a6 as C,q as j,aq as k,ar as w,i as D,as as K}from"./index.beef4f09.js";var M=E({name:"QForm",props:{autofocus:Boolean,noErrorFocus:Boolean,noResetFocus:Boolean,greedy:Boolean,onSubmit:Function},emits:["reset","validationSuccess","validationError"],setup(n,{slots:v,emit:f}){const c=R(),s=F(null);let u=0;const i=[];function m(e){const a=typeof e=="boolean"?e:n.noErrorFocus!==!0,d=++u,g=(t,o)=>{f("validation"+(t===!0?"Success":"Error"),o)},S=t=>{const o=t.validate();return typeof o.then=="function"?o.then(r=>({valid:r,comp:t}),r=>({valid:!1,comp:t,err:r})):Promise.resolve({valid:o,comp:t})};return(n.greedy===!0?Promise.all(i.map(S)).then(t=>t.filter(o=>o.valid!==!0)):i.reduce((t,o)=>t.then(()=>S(o).then(r=>{if(r.valid===!1)return Promise.reject(r)})),Promise.resolve()).catch(t=>[t])).then(t=>{if(t===void 0||t.length===0)return d===u&&g(!0),!0;if(d===u){const{comp:o,err:r}=t[0];if(r!==void 0&&console.error(r),g(!1,o),a===!0){const p=t.find(({comp:q})=>typeof q.focus=="function"&&V(q.$)===!1);p!==void 0&&p.comp.focus()}}return!1})}function y(){u++,i.forEach(e=>{typeof e.resetValidation=="function"&&e.resetValidation()})}function b(e){e!==void 0&&C(e);const a=u+1;m().then(d=>{a===u&&d===!0&&(n.onSubmit!==void 0?f("submit",e):e!==void 0&&e.target!==void 0&&typeof e.target.submit=="function"&&e.target.submit())})}function x(e){e!==void 0&&C(e),f("reset"),j(()=>{y(),n.autofocus===!0&&n.noResetFocus!==!0&&l()})}function l(){k(()=>{if(s.value===null)return;const e=s.value.querySelector("[autofocus][tabindex], [data-autofocus][tabindex]")||s.value.querySelector("[autofocus] [tabindex], [data-autofocus] [tabindex]")||s.value.querySelector("[autofocus], [data-autofocus]")||Array.prototype.find.call(s.value.querySelectorAll("[tabindex]"),a=>a.tabIndex>-1);e!=null&&e.focus({preventScroll:!0})})}P(w,{bindComponent(e){i.push(e)},unbindComponent(e){const a=i.indexOf(e);a>-1&&i.splice(a,1)}});let h=!1;return A(()=>{h=!0}),N(()=>{h===!0&&n.autofocus===!0&&l()}),B(()=>{n.autofocus===!0&&l()}),Object.assign(c.proxy,{validate:m,resetValidation:y,submit:b,reset:x,focus:l,getValidationComponents:()=>i}),()=>I("form",{class:"q-form",ref:s,onSubmit:b,onReset:x},Q(v.default))}});function O(){return D(K)}function T(){const n=O();return{NotifySuccess:c=>{n.notify({color:"green-5",textColor:"white",icon:"cloud_done",message:c})},NotifyError:c=>{n.notify({color:"red-5",textColor:"white",icon:"error",message:c})}}}export{M as Q,T as u};
