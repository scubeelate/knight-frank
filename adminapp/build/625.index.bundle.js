"use strict";(self.webpackChunkscube_v4=self.webpackChunkscube_v4||[]).push([[625],{66673:(e,n,t)=>{t.d(n,{A:()=>d});var a=t(76314),r=t.n(a),i=t(4417),l=t.n(i),s=t(66228),o=r()((function(e){return e[1]})),c=l()(s.A);o.push([e.id,".pagination-container {\n    display: flex;\n    list-style-type: none;\n}\n\n    .pagination-container .pagination-item {\n        padding: 0 12px;\n        height: 28px;\n        text-align: center;\n        margin: auto 4px;\n        color: #141c4c;\n        display: flex;\n        box-sizing: border-box;\n        align-items: center;\n        justify-content: center;\n        letter-spacing: 0.01071em;\n        border-radius: 23px;\n        line-height: 1.43;\n        font-size: 16px;\n    }\n\n    .pagination-container .pagination-item.dots:hover {\n            background-color: transparent;\n            cursor: default;\n        }\n\n    .pagination-container .pagination-item:hover {\n            background: #2463eb;\n            border-radius: 4px;\n            color: #ffff;\n            cursor: pointer;\n        }\n\n    .pagination-container .pagination-item.selected {\n            background: #2463eb;\n            border-radius: 4px;\n            color: #ffff;\n        }\n\n    .pagination-container .pagination-item .arrow::before {\n                position: relative;\n                content: '';\n                display: inline-block;\n                width: 0.4em;\n                height: 0.4em;\n                border-right: 0.12em solid #141c4c;\n                border-top: 0.12em solid #141c4c;\n            }\n\n    .pagination-container .pagination-item .arrow.left {\n                transform: rotate(-135deg) translate(-50%);\n            }\n\n    .pagination-container .pagination-item .arrow.right {\n                transform: rotate(45deg);\n            }\n\n    .pagination-container .pagination-item.disabled {\n            pointer-events: none;\n        }\n\n    .pagination-container .pagination-item.disabled .arrow::before {\n                border-right: 0.12em solid rgb(213 207 207 / 43%);\n                border-top: 0.12em solid rgb(213 207 207 / 43%);\n            }\n\n    .pagination-container .pagination-item.disabled:hover {\n                background-color: transparent;\n                cursor: default;\n            }\n\n    .pagination-container .arrow-icon:hover {\n            height: 28px;\n            border-radius: 14px;\n            background: #2463eb;\n            color: #151929;\n        }\n\n    .pagination-container .arrow-icon {\n        color: #151929;\n}\n.pagination-bar {\n    justify-content: center;\n    margin: 20px 0;\n}\n.pagination-goto::before {\n        position: absolute;\n        content: '';\n        height: 25px;\n        width: 1px;\n        left: -11px;\n        background: #404050;\n    }\n.pagination-goto .pagination-input-sec::after {\n            content: '';\n            background-image: url("+c+");\n            background-position: center;\n            background-repeat: no-repeat;\n            width: 10px;\n            height: 10px;\n            position: absolute;\n            right: 10px;\n        }\n",""]);const d=o},66228:(e,n,t)=>{t.d(n,{A:()=>a});const a=t.p+"1f84f8ae04334a3cadcc187e3f92813b.svg"},45625:(e,n,t)=>{t.r(n),t.d(n,{default:()=>M});var a=t(74848),r=t(95093),i=t.n(r),l=t(96540),s=t(47767),o=t(50461),c=t(1124),d=t(57217),u=t(1315),m=t(80771),f=function(){return f=Object.assign||function(e){for(var n,t=1,a=arguments.length;t<a;t++)for(var r in n=arguments[t])Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r]);return e},f.apply(this,arguments)},g=function(e){var n=e.onDateRangeSelect,t=e.id,r=e.defaultValue,s=e.hideAll,o=void 0!==s&&s,c=(0,l.useState)(r||"ALL"),g=c[0],p=c[1],h=(0,l.useState)({start_date:null,end_date:null}),v=h[0],x=h[1];return(0,a.jsxs)("div",f({className:"flex w-full flex-col sm:flex-row justify-end date_range_filter gap-3"},{children:[(0,a.jsx)("div",f({className:"sm:custom-select-input sm:w-44"},{children:(0,a.jsx)(u.A,{bgcolor:"white",width:"100%",options:o?m.K0.filter((function(e){return"ALL"!=e.id})):m.K0,handleChange:function(e){var t=(0,m.Mk)(e.target.value),a=t[0],r=t[1];p(e.target.value),n(a&&r?{start_date:a,end_date:r}:{start_date:"",end_date:""}),x({start_date:null,end_date:null})},value:g,label:"Select Date",name:"Select Date Range",id:t})})),"custom"===g&&(0,a.jsx)("div",f({className:"w-full sm:w-fit"},{children:(0,a.jsx)(d.U,{label:"Select Range",startDate:v.start_date,endDate:v.end_date,onChange:function(e){var t=e[0],a=e[1];x({start_date:t,end_date:a}),n(t&&a?{start_date:i()(t).startOf("day").format("YYYY-MM-DD HH:mm:ss"),end_date:i()(a).endOf("day").format("YYYY-MM-DD HH:mm:ss")}:{start_date:"",end_date:""})},istodaymax:!0})}))]}))},p=function(){return p=Object.assign||function(e){for(var n,t=1,a=arguments.length;t<a;t++)for(var r in n=arguments[t])Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r]);return e},p.apply(this,arguments)},h=[{list:["un_assigned","unassigned","processing"],class:"bg-metallicSilver"},{list:["call_back","call back","inactive","confirmed","dispatching"],class:"bg-yellowOrange"},{list:["linked","interested"],class:"bg-vividYellow"},{list:["dispatched","assigned","order placed","order_placed"],class:"bg-azure"},{list:["delivered","converted","Active"],class:"bg-limeGreen"}],v=function(e){for(var n="bg-carminePink",t=0,a=h;t<a.length;t++){var r=a[t];if(r.list.some((function(n){return e.toLowerCase().includes(n.toLowerCase())}))){n=r.class;break}}return n};const x=function(e){var n=e.isdateFilter,t=e.logs,r=e.onDateSelect;return(0,a.jsxs)(a.Fragment,{children:[n?(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)("div",p({className:"flex justify-between items-center pb-2 "},{children:[(0,a.jsx)("p",{className:"subheading"}),(0,a.jsx)("div",p({className:"filters hidden sm:block"},{children:(0,a.jsx)(g,{onDateRangeSelect:r})}))]})),(0,a.jsxs)("div",p({className:"filters w-full sm:hidden pb-2 "},{children:[(0,a.jsx)("br",{}),(0,a.jsx)(g,{onDateRangeSelect:r})]}))]}):"",(0,a.jsx)("div",p({className:"mobileView rounded-xl border border-[#e5e7eb] "},{children:(0,a.jsxs)("div",p({className:"rounded-md  py-6 px-4 "},{children:[t&&t.length>0&&(null==t?void 0:t.map((function(e){var n;return(0,a.jsx)("div",p({className:" relative mb-3"},{children:"STATUS"!==e.type?(0,a.jsxs)("div",p({className:" flex w-full  gap-2 items-center "},{children:[(null===(n=null==e?void 0:e.user)||void 0===n?void 0:n.image)?(0,a.jsx)("img",{className:" w-8 h-8  rounded-full",src:e.user.image,alt:"blank"}):(0,a.jsx)("div",p({className:"  m-1 mr-1 w-10 h-9 relative flex justify-center\n                                                    items-center rounded-full bg-lightGray text-sm text-Comet uppercase\n                                                    cursor-pointer"},{children:null==e?void 0:e.user_name.charAt(0)})),(0,a.jsxs)("div",p({className:"w-full flex justify-between"},{children:[" ",(0,a.jsxs)("p",p({className:"text-sm md:text-base text-Comet break-word-all"},{children:[e.user_name," ","NOTE"===e.type?(0,a.jsx)("span",p({className:" text-sm text-Comet"},{children:"added notes :"})):""," ",(0,a.jsx)("span",p({className:" text-sm text-Comet "},{children:e.message}))]})),(0,a.jsx)("p",p({className:" text-Comet text-sm ml-10"},{children:i()(e.created_at).format("h:mm A; DD/M/yy")}))]}))]})):(0,a.jsxs)("div",p({className:"flex sm:flex-row flex-col w-full justify-between mt-3 "},{children:[(0,a.jsxs)("div",p({className:" bg-opacity-10 w-fit flex gap-3 items-center px-4 py-2 rounded-lg border-2 border-opacity-20 ".concat(v(e.message)," ").concat(v(e.message).replace("bg","border"))},{children:[(0,a.jsx)("div",{className:" w-2.5 h-2.5  rounded-md border border-black  ".concat(v(e.message)," ").concat(v(e.message).replace("bg","border"))}),(0,a.jsx)("div",{className:"text-sm",dangerouslySetInnerHTML:{__html:e.message.replace("<span>","<span class=".concat(v(e.message).replace("bg","text"),"> "))}})]})),(0,a.jsx)("p",p({className:" text-Comet text-sm"},{children:i()(e.created_at).format("h:mm A; DD/M/yy")}))]}))}),null==e?void 0:e.id)}))),t&&!(null==t?void 0:t.length)||!t?(0,a.jsx)("div",p({className:"flex justify-center items-center flex-col gap-4 mt-6"},{children:(0,a.jsx)("p",p({className:"text-[18px] font-onestBold"},{children:"No Logs found !!"}))})):""]}))}))]})};var b=t(59408),j=function(e,n,t){if(t||2===arguments.length)for(var a,r=0,i=n.length;r<i;r++)!a&&r in n||(a||(a=Array.prototype.slice.call(n,0,r)),a[r]=n[r]);return e.concat(a||Array.prototype.slice.call(n))},y="...",w=function(e,n){var t=n-e+1;return Array.from({length:t},(function(n,t){return t+e}))},N=t(85072),_=t.n(N),k=t(66673);_()(k.A,{insert:"head",singleton:!1}),k.A.locals;var S=function(){return S=Object.assign||function(e){for(var n,t=1,a=arguments.length;t<a;t++)for(var r in n=arguments[t])Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r]);return e},S.apply(this,arguments)};const D=function(e){var n=e.onPageChange,t=e.totalCount,r=e.siblingCount,i=void 0===r?1:r,s=e.currentPage,o=e.pageSize,c=e.className,d=function(e){var n=e.totalCount,t=e.pageSize,a=e.siblingCount,r=void 0===a?1:a,i=e.currentPage;return(0,l.useMemo)((function(){var e=Math.ceil(n/t);if(r+5>=e)return w(1,e);var a=Math.max(i-r,1),l=Math.min(i+r,e),s=a>2,o=l<e-2,c=e;if(!s&&o){var d=w(1,3+2*r);return j(j([],d,!0),[y,e],!1)}if(s&&!o){var u=w(e-(3+2*r)+1,e);return j([1,y],u,!0)}if(s&&o){var m=w(a,l);return j(j([1,y],m,!0),[y,c],!1)}}),[n,t,r,i])}({currentPage:s,totalCount:t,siblingCount:i,pageSize:o});if(0===s||d&&d.length<2)return null;var u=d&&d[d.length-1];return(0,a.jsx)("div",S({className:"flex space-x-4  justify-center"},{children:(0,a.jsxs)("ul",S({className:"pagination-container ".concat(c)},{children:[(0,a.jsx)("li",S({className:"arrow-icon pagination-item ".concat(1===s?"disabled":""),onClick:function(){n(s-1)}},{children:(0,a.jsx)("div",{className:"arrow left"})}),(0,m.uR)()),null==d?void 0:d.map((function(e){return e===y?(0,a.jsx)("li",S({className:"pagination-item dots"},{children:"…"}),(0,m.uR)()):(0,a.jsx)("li",S({className:"pagination-item ".concat(e===s?"selected":""),onClick:function(){return n(e)}},{children:e}),(0,m.uR)())})),(0,a.jsx)("li",S({className:"arrow-icon pagination-item ".concat(s===u?"disabled":""),onClick:function(){n(s+1)}},{children:(0,a.jsx)("div",{className:"arrow right"})}),(0,m.uR)())]}))}))};var C=t(2896),A=function(){return A=Object.assign||function(e){for(var n,t=1,a=arguments.length;t<a;t++)for(var r in n=arguments[t])Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r]);return e},A.apply(this,arguments)},O={start_date:"",end_date:""};const M=function(){(0,C.d4)((function(e){return e.app_central_store})).clientPrivateKey;var e,n,t,r,d,u,f,g=(0,s.g)().id,p=(0,l.useState)(1),h=p[0],v=p[1],j=(0,l.useState)(O),y=j[0],w=j[1],N=(0,l.useState)({}),_=N[0],k=N[1],S=(0,l.useState)(!1),M=S[0],Y=S[1],P=(0,l.useState)({total:0}),L=P[0],R=P[1],z=(0,l.useState)([]),E=z[0],U=z[1],I=[{name:"User ID",value:null!==(e=null==_?void 0:_.id)&&void 0!==e?e:"--"},{name:"Name",value:null!==(n=null==_?void 0:_.name)&&void 0!==n?n:"--"},{name:"Email ID ",value:null!==(t=null==_?void 0:_.email)&&void 0!==t?t:"--"},{name:"Phone Number  ",value:null!==(r=null==_?void 0:_.phone)&&void 0!==r?r:"--"},{name:"Role",value:null!==(d=null==_?void 0:_.email)&&void 0!==d?d:"--"},{name:"Created On ",value:null!==(u=i()(null==_?void 0:_.created_at).format("h:mm A; DD/M/yy"))&&void 0!==u?u:"--"},{name:"Status",value:(null==_?void 0:_.is_active)?"ACTIVE":"DISABLED"}],T=function(e,n){b.S.get("users/logs/".concat(e,"?from=").concat(n.start_date,"&to=").concat(n.end_date,"&page=").concat(h)).then((function(e){var n,t=null===(n=null==e?void 0:e.data)||void 0===n?void 0:n.data;R(t.pagination),U(t.data)})).catch((function(e){}))};return(0,l.useEffect)((function(){g&&function(e){Y(!0),b.S.get("users/".concat(e)).then((function(e){return n=void 0,t=void 0,r=function(){var n,t,a;return function(e,n){var t,a,r,i,l={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return i={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function s(s){return function(o){return function(s){if(t)throw new TypeError("Generator is already executing.");for(;i&&(i=0,s[0]&&(l=0)),l;)try{if(t=1,a&&(r=2&s[0]?a.return:s[0]?a.throw||((r=a.return)&&r.call(a),0):a.next)&&!(r=r.call(a,s[1])).done)return r;switch(a=0,r&&(s=[2&s[0],r.value]),s[0]){case 0:case 1:r=s;break;case 4:return l.label++,{value:s[1],done:!1};case 5:l.label++,a=s[1],s=[0];continue;case 7:s=l.ops.pop(),l.trys.pop();continue;default:if(!((r=(r=l.trys).length>0&&r[r.length-1])||6!==s[0]&&2!==s[0])){l=0;continue}if(3===s[0]&&(!r||s[1]>r[0]&&s[1]<r[3])){l.label=s[1];break}if(6===s[0]&&l.label<r[1]){l.label=r[1],r=s;break}if(r&&l.label<r[2]){l.label=r[2],l.ops.push(s);break}r[2]&&l.ops.pop(),l.trys.pop();continue}s=n.call(e,l)}catch(e){s=[6,e],a=0}finally{t=r=0}if(5&s[0])throw s[1];return{value:s[0]?s[1]:void 0,done:!0}}([s,o])}}}(this,(function(r){return n=null===(a=null==e?void 0:e.data)||void 0===a?void 0:a.data,t=A(A({},n),{status:1===(null==n?void 0:n.status)?"Active":"Disable",password:""}),k(t),[2]}))},new((a=void 0)||(a=Promise))((function(e,i){function l(e){try{o(r.next(e))}catch(e){i(e)}}function s(e){try{o(r.throw(e))}catch(e){i(e)}}function o(n){var t;n.done?e(n.value):(t=n.value,t instanceof a?t:new a((function(e){e(t)}))).then(l,s)}o((r=r.apply(n,t||[])).next())}));var n,t,a,r})).catch((function(e){(0,m.Sx)(e.message,"error"),Y(!1)})).finally((function(){Y(!1)}))}((0,o.a)(g))}),[g]),(0,l.useEffect)((function(){var e=(0,o.a)(g);T(e,y)}),[h]),(0,a.jsxs)("div",A({className:""},{children:[(0,a.jsx)(c.A,{links:[{path:"List Of Users",url:"/admin/user-settings/users"},{path:"View User",url:""}]}),(0,a.jsx)("p",A({className:"text-xl font-extrabold text-shadeDarkBlue font-onestRegular"},{children:"View User"})),(0,a.jsx)("br",{}),M?"Loading...":(0,a.jsxs)("div",A({className:"w-full grid grid-cols-[350px_minmax(700px,_1fr)_0px]   "},{children:[(0,a.jsx)("div",A({className:" bg-white rounded-lg p-3 "},{children:(0,a.jsxs)("div",A({className:"mt-1"},{children:[(0,a.jsx)("p",A({className:" font-semibold text-base pb-2"},{children:"User Basic Information"})),(0,a.jsx)("div",A({className:"bg-lightshadedGray rounded-lg p-4"},{children:(0,a.jsx)("div",A({className:"bg-CalmWaters  flex flex-col gap-y-6 rounded-lg p-4 font-onestRegular "},{children:l.Children.toArray(null==I?void 0:I.map((function(e){return(0,a.jsxs)("div",A({className:"flex justify-between"},{children:[(0,a.jsx)("p",A({className:" text-xs text-bluishGray"},{children:null==e?void 0:e.name})),(0,a.jsx)("p",A({className:"text-sm text-shadeDarkBlue  text-right w-40 break-words "},{children:null==e?void 0:e.value}))]}))})))}))}))]}))})),(0,a.jsxs)("div",A({className:" ml-10 rounded-lg"},{children:[(0,a.jsx)("div",A({className:"w-full bg-white rounded-lg pt-4 pl-4  flex  items-center"},{children:(0,a.jsx)("div",A({className:"w-[100px] flex justify-center items-center font-semibold text-lg  border-b-2 pb-2 border-black text-black"},{children:"Logs"}))})),(0,a.jsx)("div",A({className:"w-full bg-white mt-6 rounded-lg p-4"},{children:(0,a.jsxs)("div",A({className:"default_container bg-white"},{children:[(0,a.jsx)(x,{isdateFilter:!0,logs:E,image:null!==(f=null==_?void 0:_.image)&&void 0!==f?f:"",onDateSelect:function(e){var n=e.start_date,t=e.end_date,a=i()(n).format("YYYY-MM-DD"),r=i()(t).format("YYYY-MM-DD");w(A(A({},y),{start_date:a,end_date:r}));var l=(0,o.a)(g);T(l,A(A({},y),n&&t?{start_date:a,end_date:r}:{start_date:"",end_date:""}))}}),(0,a.jsx)("div",A({className:"w-full p-4 flex justify-center gap-10"},{children:(0,a.jsx)(D,{className:"pagination-bar",currentPage:h,totalCount:null==L?void 0:L.total,pageSize:10,onPageChange:function(e){v(e)}})}))]}))}))]}))]}))]}))}}}]);