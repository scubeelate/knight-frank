"use strict";(self.webpackChunkscube_v4=self.webpackChunkscube_v4||[]).push([[244],{14244:(e,a,t)=>{t.r(a),t.d(a,{default:()=>h});var s=t(74848),l=t(96540),n=t(2443),r=t(59408),i=t(80771),c=t(1315),o=t(2896),d=function(){return d=Object.assign||function(e){for(var a,t=1,s=arguments.length;t<s;t++)for(var l in a=arguments[t])Object.prototype.hasOwnProperty.call(a,l)&&(e[l]=a[l]);return e},d.apply(this,arguments)},u=[{title:"Total Number of Employees",value:"--"},{title:"Total Number of Active Cards",value:"--"},{title:"Total Number of Inactive Cards",value:"--"}];const h=function(){(0,o.d4)((function(e){return e.app_central_store})).serverPublicKey;var e=(0,l.useState)(u),a=e[0],t=e[1],h=(0,l.useState)([]),v=h[0],f=h[1],m=(0,l.useState)({dateRange:7}),x=m[0],p=m[1],b=function(e){r.S.get("statistics/stats?dateRange=".concat(e.dateRange)).then((function(e){var a=e.data.statistics;f(a)})).catch((function(e){(0,i.Sx)(e.message,"error")}))};return(0,l.useEffect)((function(){r.S.get("statistics").then((function(e){var a=e.data.data,s=function(e,a,t){if(t||2===arguments.length)for(var s,l=0,n=a.length;l<n;l++)!s&&l in a||(s||(s=Array.prototype.slice.call(a,0,l)),s[l]=a[l]);return e.concat(s||Array.prototype.slice.call(a))}([],u,!0);s[0].value=a.total_employees,s[1].value=a.total_active_cards,s[2].value=a.total_inactive_cards,t(s)})).catch((function(e){(0,i.Sx)(e.message,"error")})),b(x)}),[]),(0,s.jsxs)("div",d({className:"w-full"},{children:[(0,s.jsx)("div",d({className:"flex  justify-between flex-col sm:flex-row"},{children:(0,s.jsxs)("div",{children:[(0,s.jsx)("p",d({className:"subheading font-onestRegular"},{children:"Dashboard"})),(0,s.jsx)("hr",{className:"w-32 md:w-full line"})]})})),(0,s.jsx)("div",d({className:"my-4 w-full grid grid-cols-3 gap-6"},{children:l.Children.toArray(a.map((function(e){return(0,s.jsxs)("div",d({className:"border bg-white p-5"},{children:[(0,s.jsx)("p",d({className:"py-2 text-base text-shadeDarkBlue/60"},{children:null==e?void 0:e.title})),(0,s.jsx)("p",d({className:" font-bold text-3xl text-shadeBlue"},{children:null==e?void 0:e.value}))]}))})))})),(0,s.jsxs)("div",d({className:"bg-white"},{children:[(0,s.jsxs)("div",d({className:"flex justify-between items-center p-4 border-b"},{children:[(0,s.jsx)("p",d({className:"font-onestSemiBold font-bold text-base"},{children:"Card Analytics"})),(0,s.jsx)("div",d({className:"w-[250px]"},{children:(0,s.jsx)(c.A,{options:[{name:"Past 24 hours",id:1},{name:"Past 7 days",id:7},{name:"Past 30 days",id:30},{name:"Past 1 year",id:365}],handleChange:function(e){var a,t,s=e.target,l=s.name,n=s.value;p(d(d({},x),((a={})[l]=n,a))),b(d(d({},x),((t={})[l]=n,t)))},value:null==x?void 0:x.dateRange,label:"Select Date",name:"dateRange"})}))]})),(0,s.jsx)("div",d({className:"p-4 mt-4"},{children:(0,s.jsx)("div",{children:(0,s.jsx)(n.QF,{className:"h-[60vh]",data:v,index:"date",categories:["TOTAL_SHARED"],yAxisWidth:60,showLegend:!1,curveType:"monotone",colors:["blue"]})})}))]}))]}))}}}]);