import{d as n,r as p,w as o,_ as i,H as d,I as m,aj as c}from"./index.5f0495ac.js";const f=n({name:"PriceInput",emits:["update:modelValue"],props:{modelValue:{type:Number,required:!0},label:{type:String}},setup(e,{emit:a}){const r=l=>{var t;return(t=Number(l))==null?void 0:t.toFixed(2)},s=p(r(e.modelValue));return o(()=>e.modelValue,l=>{s.value=r(l)}),o(()=>s.value,l=>{a("update:modelValue",r(l))}),{price:s}}});function V(e,a,r,s,l,t){return d(),m(c,{suffix:"\u20AC",mask:"#.##","fill-mask":"0","reverse-fill-mask":"","input-class":"text-right",rules:[u=>u>=0||e.$t("order.enterValidBuyPrice")],class:"col-6 q-pa-sm",modelValue:e.price,"onUpdate:modelValue":a[0]||(a[0]=u=>e.price=u),label:e.label,dense:"","lazy-rules":""},null,8,["rules","modelValue","label"])}var k=i(f,[["render",V]]);export{k as P};