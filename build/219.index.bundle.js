"use strict";(self.webpackChunkscube_v4=self.webpackChunkscube_v4||[]).push([[219],{11219:(e,t,n)=>{n.r(t),n.d(t,{default:()=>F});var a=n(74848),i=n(96540),r=n(2198),s=(n(50513),n(65048),n(95093)),o=n.n(s),l=n(84976),c=n(50461),d=n(59408),u=n(80771),f=n(20114),m=n(1315),p=n(30157),h=n(57217),g=n(2896),x=n(98587),v=n(58168),y=n(34164),b=n(75659),w=n(11848),j=n(15607),A=n(38413),E=n(31609);function S(e){return(0,E.Ay)("MuiDialogActions",e)}(0,A.A)("MuiDialogActions",["root","spacing"]);const k=["className","disableSpacing"],N=(0,w.Ay)("div",{name:"MuiDialogActions",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,!n.disableSpacing&&t.spacing]}})((({ownerState:e})=>(0,v.A)({display:"flex",alignItems:"center",padding:8,justifyContent:"flex-end",flex:"0 0 auto"},!e.disableSpacing&&{"& > :not(style) ~ :not(style)":{marginLeft:8}}))),C=i.forwardRef((function(e,t){const n=(0,j.b)({props:e,name:"MuiDialogActions"}),{className:i,disableSpacing:r=!1}=n,s=(0,x.A)(n,k),o=(0,v.A)({},n,{disableSpacing:r}),l=(e=>{const{classes:t,disableSpacing:n}=e,a={root:["root",!n&&"spacing"]};return(0,b.A)(a,S,t)})(o);return(0,a.jsx)(N,(0,v.A)({className:(0,y.A)(l.root,i),ownerState:o,ref:t},s))}));var D=n(22477),R=n(46831),T=n(37353),O=n(1935),_=n(96852),I=n(44675),Y=n(35186),z=n(93749);const L=["addEndListener","appear","children","container","direction","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"];function M(e,t,n){var a;const i=function(e,t,n){const a=t.getBoundingClientRect(),i=n&&n.getBoundingClientRect(),r=(0,z.A)(t);let s;if(t.fakeTransform)s=t.fakeTransform;else{const e=r.getComputedStyle(t);s=e.getPropertyValue("-webkit-transform")||e.getPropertyValue("transform")}let o=0,l=0;if(s&&"none"!==s&&"string"==typeof s){const e=s.split("(")[1].split(")")[0].split(",");o=parseInt(e[4],10),l=parseInt(e[5],10)}return"left"===e?i?`translateX(${i.right+o-a.left}px)`:`translateX(${r.innerWidth+o-a.left}px)`:"right"===e?i?`translateX(-${a.right-i.left-o}px)`:`translateX(-${a.left+a.width-o}px)`:"up"===e?i?`translateY(${i.bottom+l-a.top}px)`:`translateY(${r.innerHeight+l-a.top}px)`:i?`translateY(-${a.top-i.top+a.height-l}px)`:`translateY(-${a.top+a.height-l}px)`}(e,t,"function"==typeof(a=n)?a():a);i&&(t.style.webkitTransform=i,t.style.transform=i)}const P=i.forwardRef((function(e,t){const n=(0,I.A)(),r={enter:n.transitions.easing.easeOut,exit:n.transitions.easing.sharp},s={enter:n.transitions.duration.enteringScreen,exit:n.transitions.duration.leavingScreen},{addEndListener:o,appear:l=!0,children:c,container:d,direction:u="down",easing:f=r,in:m,onEnter:p,onEntered:h,onEntering:g,onExit:y,onExited:b,onExiting:w,style:j,timeout:A=s,TransitionComponent:E=T.Ay}=e,S=(0,x.A)(e,L),k=i.useRef(null),N=(0,_.A)(c.ref,k,t),C=e=>t=>{e&&(void 0===t?e(k.current):e(k.current,t))},D=C(((e,t)=>{M(u,e,d),(0,Y.q)(e),p&&p(e,t)})),R=C(((e,t)=>{const a=(0,Y.c)({timeout:A,style:j,easing:f},{mode:"enter"});e.style.webkitTransition=n.transitions.create("-webkit-transform",(0,v.A)({},a)),e.style.transition=n.transitions.create("transform",(0,v.A)({},a)),e.style.webkitTransform="none",e.style.transform="none",g&&g(e,t)})),P=C(h),X=C(w),B=C((e=>{const t=(0,Y.c)({timeout:A,style:j,easing:f},{mode:"exit"});e.style.webkitTransition=n.transitions.create("-webkit-transform",t),e.style.transition=n.transitions.create("transform",t),M(u,e,d),y&&y(e)})),$=C((e=>{e.style.webkitTransition="",e.style.transition="",b&&b(e)})),Q=i.useCallback((()=>{k.current&&M(u,k.current,d)}),[u,d]);return i.useEffect((()=>{if(m||"down"===u||"right"===u)return;const e=(0,O.A)((()=>{k.current&&M(u,k.current,d)})),t=(0,z.A)(k.current);return t.addEventListener("resize",e),()=>{e.clear(),t.removeEventListener("resize",e)}}),[u,m,d]),i.useEffect((()=>{m||Q()}),[m,Q]),(0,a.jsx)(E,(0,v.A)({nodeRef:k,onEnter:D,onEntered:P,onEntering:R,onExit:B,onExited:$,onExiting:X,addEndListener:e=>{o&&o(k.current,e)},appear:l,in:m,timeout:A},S,{children:(e,t)=>i.cloneElement(c,(0,v.A)({ref:N,style:(0,v.A)({visibility:"exited"!==e||m?void 0:"hidden"},j,c.props.style)},t))}))}));var X=n(58031),B=n(29729),$=n.n(B),Q=function(){return Q=Object.assign||function(e){for(var t,n=1,a=arguments.length;n<a;n++)for(var i in t=arguments[n])Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e},Q.apply(this,arguments)},U=i.forwardRef((function(e,t){return(0,a.jsx)(P,Q({direction:"up",ref:t},e))}));const F=function(){var e={pagination:!0,paginationPageSize:20,cacheBlockSize:20},t=[{field:"emp_id",headerName:"Employee Id"},{field:"name",headerName:"Name"},{field:"email",headerName:"Email",cellRenderer:function(e){return e.data?e.data.email||"--":null}},{field:"designation",headerName:"Designation",cellRenderer:function(e){return e.data?e.data.designation||"--":null}},{field:"department",headerName:"Department",cellRenderer:function(e){return e.data?e.data.department||"--":null}},{field:"phone",headerName:"Phone",cellRenderer:function(e){return e.data?e.data.phone||"--":null}},{field:"card_status",headerName:"Card Status"},{field:"action",headerName:"Action",width:100,cellRenderer:function(e){var t,n;return e.data?(0,a.jsxs)("div",Q({className:"flex mt-1 items-center gap-3"},{children:[(0,u.OQ)("employees","is_update")&&(0,a.jsx)(l.N_,Q({to:"/admin/employees/edit/".concat((0,c.yv)(null===(t=null==e?void 0:e.data)||void 0===t?void 0:t.id))},{children:(0,a.jsx)("img",{src:"/assets/icons/userEditIcon.svg",alt:"edit"})})),(0,a.jsx)(l.N_,Q({to:"/admin/employees/view/".concat((0,c.yv)(null===(n=null==e?void 0:e.data)||void 0===n?void 0:n.id))},{children:(0,a.jsx)("img",{src:"/assets/icons/viewIcon.svg",alt:"viewIcon"})}))]})):null}}],n={search:"",status:"",from:"",to:""},s=(0,g.d4)((function(e){return e.app_central_store})).clientPrivateKey,x=(0,i.useState)(!1),v=x[0],y=x[1],b=(0,i.useState)({}),w=b[0],j=b[1],A=(0,i.useState)(n),E=A[0],S=A[1],k=(0,i.useState)({email:""}),N=k[0],T=k[1],O=(0,i.useState)({email:""}),_=O[0],I=O[1],Y=(0,i.useState)(!1),z=Y[0],L=Y[1],M=(0,i.useState)(!1),P=M[0],B=M[1],F=(0,i.useState)({addEmployee:!1,addRecord:!1,fileUploader:!1}),V=F[0],W=F[1],q=(0,i.useState)(""),G=q[0],H=q[1],K=(0,i.useState)(""),J=K[0],Z=K[1],ee=(0,i.useState)({grid:void 0,column:void 0}),te=ee[0],ne=ee[1],ae=function(e){var t,n=e.target,a=n.name,i=n.value;S(Q(Q({},E),((t={})[a]=i,t)))},ie=function(e){var t=Q({},V);t[e]=!1,W(t),L(!1)};(0,i.useEffect)((function(){te.grid&&re(E)}),[te.grid]);var re=function(t){var n={getRows:function(n){setTimeout((function(){te.grid.showLoadingOverlay(),te.grid.setRowData([])}),100);var a=n.endRow/e.paginationPageSize;d.S.get("/employees?page=".concat(a,"&search=").concat(null==t?void 0:t.search,"&from=").concat(null==t?void 0:t.from,"&to=").concat(null==t?void 0:t.to,"&status=").concat(null==t?void 0:t.status,"&type=1&size=").concat(null==e?void 0:e.paginationPageSize)).then((function(e){return t=void 0,a=void 0,r=function(){var t,a,i,r,o,l,d,u,f,m,p,h,g,x,v,y,b,w,A;return function(e,t){var n,a,i,r,s={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return r={next:o(0),throw:o(1),return:o(2)},"function"==typeof Symbol&&(r[Symbol.iterator]=function(){return this}),r;function o(o){return function(l){return function(o){if(n)throw new TypeError("Generator is already executing.");for(;r&&(r=0,o[0]&&(s=0)),s;)try{if(n=1,a&&(i=2&o[0]?a.return:o[0]?a.throw||((i=a.return)&&i.call(a),0):a.next)&&!(i=i.call(a,o[1])).done)return i;switch(a=0,i&&(o=[2&o[0],i.value]),o[0]){case 0:case 1:i=o;break;case 4:return s.label++,{value:o[1],done:!1};case 5:s.label++,a=o[1],o=[0];continue;case 7:o=s.ops.pop(),s.trys.pop();continue;default:if(!((i=(i=s.trys).length>0&&i[i.length-1])||6!==o[0]&&2!==o[0])){s=0;continue}if(3===o[0]&&(!i||o[1]>i[0]&&o[1]<i[3])){s.label=o[1];break}if(6===o[0]&&s.label<i[1]){s.label=i[1],i=o;break}if(i&&s.label<i[2]){s.label=i[2],s.ops.push(o);break}i[2]&&s.ops.pop(),s.trys.pop();continue}o=t.call(e,s)}catch(e){o=[6,e],a=0}finally{n=i=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,l])}}}(this,(function(E){switch(E.label){case 0:return t=e.data.data,a=t.data,[4,(0,c.ch)(e.data.x_key,s)];case 1:i=E.sent(),r=0,o=a,E.label=2;case 2:return r<o.length?(l=o[r],d=l,u="name",[4,(0,c.rX)(l.name,i)]):[3,10];case 3:return d[u]=E.sent(),f=l,m="designation",[4,(0,c.rX)(l.designation,i)];case 4:return f[m]=E.sent(),p=l,h="department",[4,(0,c.rX)(l.department,i)];case 5:return p[h]=E.sent(),g=l,x="phone",[4,(0,c.rX)(l.phone,i)];case 6:return g[x]=E.sent(),v=l,y="email",[4,(0,c.rX)(l.email,i)];case 7:return v[y]=E.sent(),b=l,w="emp_id",[4,(0,c.rX)(l.emp_id,i)];case 8:b[w]=E.sent(),E.label=9;case 9:return r++,[3,2];case 10:return n.successCallback(a,null===(A=t.pagination)||void 0===A?void 0:A.total),j(t.pagination),te.grid.setRowData([]),setTimeout((function(){te.column.autoSizeAllColumns(),te.grid.hideOverlay(),t.data.length||te.grid.showNoRowsOverlay()}),100),[2]}}))},new((i=void 0)||(i=Promise))((function(e,n){function s(e){try{l(r.next(e))}catch(e){n(e)}}function o(e){try{l(r.throw(e))}catch(e){n(e)}}function l(t){var n;t.done?e(t.value):(n=t.value,n instanceof i?n:new i((function(e){e(n)}))).then(s,o)}l((r=r.apply(t,a||[])).next())}));var t,a,i,r})).catch((function(e){(0,u.Sx)(e.message,"error"),n.successCallback([],0)}))}};te.grid&&te.grid.setDatasource(n)};return(0,a.jsxs)("div",Q({className:""},{children:[(0,a.jsxs)("div",Q({className:"flex  justify-between flex-col sm:flex-row"},{children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("p",Q({className:"subheading"},{children:"List of Employees"})),(0,a.jsx)("hr",{className:"w-32 md:w-full line"}),(0,a.jsxs)("p",Q({className:"text-xs font-onestRegular mt-1 font-normal text-shadeDarkBlue"},{children:[null==w?void 0:w.total," Employees"]}))]}),(0,a.jsxs)("div",Q({className:" flex-none h-9 flex mt-4 lg:mt-0 gap-4 filters"},{children:[(0,a.jsx)(f.A,{handleClick:function(){y(!v)},text:"Filter",icon:(0,a.jsx)("img",{src:"/assets/icons/filterIcon.svg",alt:"",className:"w-1/2"}),classes:"bg-none border border-black text-black w-fit px-4"}),(0,u.OQ)("employees","is_update")?(0,a.jsx)(f.A,{handleClick:function(){T({email:""}),L(!0)},text:"Add Employee",icon:(0,a.jsx)("img",{src:"/assets/icons/plusIcon.svg",alt:"plus"}),classes:"bg-darkshadeBlue text-white w-fit px-6"}):(0,a.jsx)(a.Fragment,{})]}))]})),v?(0,a.jsxs)("div",Q({className:"w-full flex flex-col lg:flex-row gap-4 items-center mt-4 filters"},{children:[(0,a.jsx)("div",Q({className:"w-full lg:w-2/12"},{children:(0,a.jsx)(m.A,{width:"100%",options:[{name:"REQUESTED"},{name:"NOT_REQUESTED"},{name:"DISABLE"},{name:"ACTIVE"}],handleChange:ae,value:null==E?void 0:E.status,label:"Status",name:"status"})}))," ",(0,a.jsx)(h.U,{label:"Date Created",onChange:function(e){var t=e[0],n=e[1];H(t),Z(n);var a=o()(t).format("YYYY-MM-DD"),i=o()(n).format("YYYY-MM-DD");S(Q(Q({},E),{from:a,to:i}))},startDate:G,endDate:J}),(0,a.jsx)("div",Q({className:"w-full lg:w-3/12"},{children:(0,a.jsx)(p.A,{rows:1,width:"w-full",disabled:!1,readOnly:!1,value:null==E?void 0:E.search,handleChange:ae,label:"Search",name:"search"})})),(0,a.jsxs)("div",Q({className:"w-full lg:w-3/12 flex pl-6 justify-end lg:justify-start items-center gap-2"},{children:[(0,a.jsx)(f.A,{disabled:(0,u.a8)(E)<1,handleClick:function(){re(E)},text:"Apply",classes:"bg-darkshadeBlue text-white w-fit px-4 py-2"}),(0,a.jsx)("button",Q({disabled:!1,className:"w-fit px-2 py-1 border border-black cursor-pointer",onClick:function(){H(""),Z(""),S(n),re(n)}},{children:(0,a.jsx)("img",{src:"/assets/icons/refreshIcon.svg",alt:""})}))]}))]})):null,(0,a.jsx)("div",Q({className:"mt-6"},{children:(0,a.jsx)("div",Q({className:"ag-theme-alpine",style:{height:"70vh"}},{children:(0,a.jsx)(r.W6,Q({rowModelType:"infinite",columnDefs:t,onGridReady:function(e){ne({grid:e.api,column:e.columnApi}),e.columnApi.autoSizeAllColumns()},enableCellTextSelection:!0,ensureDomOrder:!0,onFirstDataRendered:function(){te.column&&te.column.autoSizeAllColumns()},gridOptions:{defaultColDef:{maxWidth:500}}},e))}))})),(0,a.jsxs)(X.A,Q({open:z,TransitionComponent:U,keepMounted:!0,onClose:ie,"aria-describedby":"alert-dialog-slide-description"},{children:[(0,a.jsx)(R.A,{children:"Add New Employee?"}),(0,a.jsx)(D.A,{children:(0,a.jsx)("form",Q({className:"flex flex-col gap-4 mt-2"},{children:(0,a.jsx)(p.A,{rows:1,width:"w-[400px]",disabled:!1,readOnly:!1,handleChange:function(e){var t,n=e.target,a=n.name,i=n.value;T(Q(Q({},N),((t={})[a]=i,t))),I({email:""})},value:null==N?void 0:N.email,error:!!(null==_?void 0:_.email),helperText:(null==_?void 0:_.email)||"Please Enter AD user email to fetch and store business information",label:"Official Email",name:"email"})}))}),(0,a.jsxs)(C,{children:[(0,a.jsx)(f.A,Q({loading:P,handleClick:ie,text:"Cancel",classes:"bg-none border text-black border-black w-fit px-4   py-2"},{children:(0,a.jsx)("p",Q({className:"px-5"},{children:"Cancel"}))})),(0,a.jsx)(f.A,{loading:P,handleClick:function(){var e=N,t=new($())(e,{email:"required|email|max:225"});if(t.fails()){var n={};return Object.keys(t.errors.errors).forEach((function(e){n[e]=t.errors.errors[e][0]})),I(n),!1}B(!0),d.S.post("/employees",N).then((function(e){(0,u.Sx)(e.data.message,"success"),re(E),L(!1),B(!1)})).catch((function(e){B(!1),(0,u.Sx)(null==e?void 0:e.message,"error")}))},text:P?"Loading...":"Submit",classes:"bg-darkshadeBlue text-white w-fit px-6  py-2"})]})]}))]}))}}}]);