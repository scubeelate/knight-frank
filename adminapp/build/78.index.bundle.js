"use strict";(self.webpackChunkscube_v4=self.webpackChunkscube_v4||[]).push([[78],{10423:(e,t,o)=>{o.d(t,{A:()=>S});var l=o(98587),r=o(58168),n=o(96540),i=o(34164),a=o(64111),s=o(75262),c=o(28466),d=o(3541),u=o(11848),b=o(27553),p=o(17245);function f(e){return(0,p.Ay)("MuiTab",e)}const h=(0,b.A)("MuiTab",["root","labelIcon","textColorInherit","textColorPrimary","textColorSecondary","selected","disabled","fullWidth","wrapped","iconWrapper"]);var v=o(74848);const m=["className","disabled","disableFocusRipple","fullWidth","icon","iconPosition","indicator","label","onChange","onClick","onFocus","selected","selectionFollowsFocus","textColor","value","wrapped"],w=(0,u.Ay)(s.A,{name:"MuiTab",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:o}=e;return[t.root,o.label&&o.icon&&t.labelIcon,t[`textColor${(0,c.A)(o.textColor)}`],o.fullWidth&&t.fullWidth,o.wrapped&&t.wrapped]}})((({theme:e,ownerState:t})=>(0,r.A)({},e.typography.button,{maxWidth:360,minWidth:90,position:"relative",minHeight:48,flexShrink:0,padding:"12px 16px",overflow:"hidden",whiteSpace:"normal",textAlign:"center"},t.label&&{flexDirection:"top"===t.iconPosition||"bottom"===t.iconPosition?"column":"row"},{lineHeight:1.25},t.icon&&t.label&&{minHeight:72,paddingTop:9,paddingBottom:9,[`& > .${h.iconWrapper}`]:(0,r.A)({},"top"===t.iconPosition&&{marginBottom:6},"bottom"===t.iconPosition&&{marginTop:6},"start"===t.iconPosition&&{marginRight:e.spacing(1)},"end"===t.iconPosition&&{marginLeft:e.spacing(1)})},"inherit"===t.textColor&&{color:"inherit",opacity:.6,[`&.${h.selected}`]:{opacity:1},[`&.${h.disabled}`]:{opacity:(e.vars||e).palette.action.disabledOpacity}},"primary"===t.textColor&&{color:(e.vars||e).palette.text.secondary,[`&.${h.selected}`]:{color:(e.vars||e).palette.primary.main},[`&.${h.disabled}`]:{color:(e.vars||e).palette.text.disabled}},"secondary"===t.textColor&&{color:(e.vars||e).palette.text.secondary,[`&.${h.selected}`]:{color:(e.vars||e).palette.secondary.main},[`&.${h.disabled}`]:{color:(e.vars||e).palette.text.disabled}},t.fullWidth&&{flexShrink:1,flexGrow:1,flexBasis:0,maxWidth:"none"},t.wrapped&&{fontSize:e.typography.pxToRem(12)}))),S=n.forwardRef((function(e,t){const o=(0,d.A)({props:e,name:"MuiTab"}),{className:s,disabled:u=!1,disableFocusRipple:b=!1,fullWidth:p,icon:h,iconPosition:S="top",indicator:A,label:x,onChange:g,onClick:y,onFocus:C,selected:B,selectionFollowsFocus:M,textColor:I="inherit",value:W,wrapped:E=!1}=o,R=(0,l.A)(o,m),T=(0,r.A)({},o,{disabled:u,disableFocusRipple:b,selected:B,icon:!!h,iconPosition:S,label:!!x,fullWidth:p,textColor:I,wrapped:E}),N=(e=>{const{classes:t,textColor:o,fullWidth:l,wrapped:r,icon:n,label:i,selected:s,disabled:d}=e,u={root:["root",n&&i&&"labelIcon",`textColor${(0,c.A)(o)}`,l&&"fullWidth",r&&"wrapped",s&&"selected",d&&"disabled"],iconWrapper:["iconWrapper"]};return(0,a.A)(u,f,t)})(T),P=h&&x&&n.isValidElement(h)?n.cloneElement(h,{className:(0,i.A)(N.iconWrapper,h.props.className)}):h;return(0,v.jsxs)(w,(0,r.A)({focusRipple:!b,className:(0,i.A)(N.root,s),ref:t,role:"tab","aria-selected":B,disabled:u,onClick:e=>{!B&&g&&g(e,W),y&&y(e)},onFocus:e=>{M&&!B&&g&&g(e,W),C&&C(e)},ownerState:T,tabIndex:B?0:-1},R,{children:["top"===S||"start"===S?(0,v.jsxs)(n.Fragment,{children:[P,x]}):(0,v.jsxs)(n.Fragment,{children:[x,P]}),A]}))}))},81968:(e,t,o)=>{o.d(t,{A:()=>K});var l=o(98587),r=o(58168),n=o(96540),i=(o(20002),o(34164)),a=o(57339),s=o(64111),c=o(73788),d=o(11848),u=o(3541),b=o(44675),p=o(1935);let f;function h(){if(f)return f;const e=document.createElement("div"),t=document.createElement("div");return t.style.width="10px",t.style.height="1px",e.appendChild(t),e.dir="rtl",e.style.fontSize="14px",e.style.width="4px",e.style.height="1px",e.style.position="absolute",e.style.top="-1000px",e.style.overflow="scroll",document.body.appendChild(e),f="reverse",e.scrollLeft>0?f="default":(e.scrollLeft=1,0===e.scrollLeft&&(f="negative")),document.body.removeChild(e),f}function v(e,t){const o=e.scrollLeft;if("rtl"!==t)return o;switch(h()){case"negative":return e.scrollWidth-e.clientWidth+o;case"reverse":return e.scrollWidth-e.clientWidth-o;default:return o}}function m(e){return(1+Math.sin(Math.PI*e-Math.PI/2))/2}var w=o(2778),S=o(93749),A=o(74848);const x=["onChange"],g={width:99,height:99,position:"absolute",top:-9999,overflow:"scroll"};var y=o(75003);const C=(0,y.A)((0,A.jsx)("path",{d:"M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"}),"KeyboardArrowLeft"),B=(0,y.A)((0,A.jsx)("path",{d:"M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"}),"KeyboardArrowRight");var M=o(75262),I=o(27553),W=o(17245);function E(e){return(0,W.Ay)("MuiTabScrollButton",e)}const R=(0,I.A)("MuiTabScrollButton",["root","vertical","horizontal","disabled"]),T=["className","slots","slotProps","direction","orientation","disabled"],N=(0,d.Ay)(M.A,{name:"MuiTabScrollButton",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:o}=e;return[t.root,o.orientation&&t[o.orientation]]}})((({ownerState:e})=>(0,r.A)({width:40,flexShrink:0,opacity:.8,[`&.${R.disabled}`]:{opacity:0}},"vertical"===e.orientation&&{width:"100%",height:40,"& svg":{transform:`rotate(${e.isRtl?-90:90}deg)`}}))),P=n.forwardRef((function(e,t){var o,n;const d=(0,u.A)({props:e,name:"MuiTabScrollButton"}),{className:b,slots:p={},slotProps:f={},direction:h}=d,v=(0,l.A)(d,T),m=(0,c.I)(),w=(0,r.A)({isRtl:m},d),S=(e=>{const{classes:t,orientation:o,disabled:l}=e,r={root:["root",o,l&&"disabled"]};return(0,s.A)(r,E,t)})(w),x=null!=(o=p.StartScrollButtonIcon)?o:C,g=null!=(n=p.EndScrollButtonIcon)?n:B,y=(0,a.Q)({elementType:x,externalSlotProps:f.startScrollButtonIcon,additionalProps:{fontSize:"small"},ownerState:w}),M=(0,a.Q)({elementType:g,externalSlotProps:f.endScrollButtonIcon,additionalProps:{fontSize:"small"},ownerState:w});return(0,A.jsx)(N,(0,r.A)({component:"div",className:(0,i.A)(S.root,b),ref:t,role:null,ownerState:w,tabIndex:null},v,{children:"left"===h?(0,A.jsx)(x,(0,r.A)({},y)):(0,A.jsx)(g,(0,r.A)({},M))}))}));var k=o(83034);function L(e){return(0,W.Ay)("MuiTabs",e)}const F=(0,I.A)("MuiTabs",["root","vertical","flexContainer","flexContainerVertical","centered","scroller","fixed","scrollableX","scrollableY","hideScrollbar","scrollButtons","scrollButtonsHideMobile","indicator"]);var z=o(96248);const j=["aria-label","aria-labelledby","action","centered","children","className","component","allowScrollButtonsMobile","indicatorColor","onChange","orientation","ScrollButtonComponent","scrollButtons","selectionFollowsFocus","slots","slotProps","TabIndicatorProps","TabScrollButtonProps","textColor","value","variant","visibleScrollbar"],H=(e,t)=>e===t?e.firstChild:t&&t.nextElementSibling?t.nextElementSibling:e.firstChild,X=(e,t)=>e===t?e.lastChild:t&&t.previousElementSibling?t.previousElementSibling:e.lastChild,$=(e,t,o)=>{let l=!1,r=o(e,t);for(;r;){if(r===e.firstChild){if(l)return;l=!0}const t=r.disabled||"true"===r.getAttribute("aria-disabled");if(r.hasAttribute("tabindex")&&!t)return void r.focus();r=o(e,r)}},Y=(0,d.Ay)("div",{name:"MuiTabs",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:o}=e;return[{[`& .${F.scrollButtons}`]:t.scrollButtons},{[`& .${F.scrollButtons}`]:o.scrollButtonsHideMobile&&t.scrollButtonsHideMobile},t.root,o.vertical&&t.vertical]}})((({ownerState:e,theme:t})=>(0,r.A)({overflow:"hidden",minHeight:48,WebkitOverflowScrolling:"touch",display:"flex"},e.vertical&&{flexDirection:"column"},e.scrollButtonsHideMobile&&{[`& .${F.scrollButtons}`]:{[t.breakpoints.down("sm")]:{display:"none"}}}))),D=(0,d.Ay)("div",{name:"MuiTabs",slot:"Scroller",overridesResolver:(e,t)=>{const{ownerState:o}=e;return[t.scroller,o.fixed&&t.fixed,o.hideScrollbar&&t.hideScrollbar,o.scrollableX&&t.scrollableX,o.scrollableY&&t.scrollableY]}})((({ownerState:e})=>(0,r.A)({position:"relative",display:"inline-block",flex:"1 1 auto",whiteSpace:"nowrap"},e.fixed&&{overflowX:"hidden",width:"100%"},e.hideScrollbar&&{scrollbarWidth:"none","&::-webkit-scrollbar":{display:"none"}},e.scrollableX&&{overflowX:"auto",overflowY:"hidden"},e.scrollableY&&{overflowY:"auto",overflowX:"hidden"}))),O=(0,d.Ay)("div",{name:"MuiTabs",slot:"FlexContainer",overridesResolver:(e,t)=>{const{ownerState:o}=e;return[t.flexContainer,o.vertical&&t.flexContainerVertical,o.centered&&t.centered]}})((({ownerState:e})=>(0,r.A)({display:"flex"},e.vertical&&{flexDirection:"column"},e.centered&&{justifyContent:"center"}))),V=(0,d.Ay)("span",{name:"MuiTabs",slot:"Indicator",overridesResolver:(e,t)=>t.indicator})((({ownerState:e,theme:t})=>(0,r.A)({position:"absolute",height:2,bottom:0,width:"100%",transition:t.transitions.create()},"primary"===e.indicatorColor&&{backgroundColor:(t.vars||t).palette.primary.main},"secondary"===e.indicatorColor&&{backgroundColor:(t.vars||t).palette.secondary.main},e.vertical&&{height:"100%",width:2,right:0}))),Q=(0,d.Ay)((function(e){const{onChange:t}=e,o=(0,l.A)(e,x),i=n.useRef(),a=n.useRef(null),s=()=>{i.current=a.current.offsetHeight-a.current.clientHeight};return(0,w.A)((()=>{const e=(0,p.A)((()=>{const e=i.current;s(),e!==i.current&&t(i.current)})),o=(0,S.A)(a.current);return o.addEventListener("resize",e),()=>{e.clear(),o.removeEventListener("resize",e)}}),[t]),n.useEffect((()=>{s(),t(i.current)}),[t]),(0,A.jsx)("div",(0,r.A)({style:g,ref:a},o))}))({overflowX:"auto",overflowY:"hidden",scrollbarWidth:"none","&::-webkit-scrollbar":{display:"none"}}),q={},K=n.forwardRef((function(e,t){const o=(0,u.A)({props:e,name:"MuiTabs"}),d=(0,b.A)(),f=(0,c.I)(),{"aria-label":w,"aria-labelledby":x,action:g,centered:y=!1,children:C,className:B,component:M="div",allowScrollButtonsMobile:I=!1,indicatorColor:W="primary",onChange:E,orientation:R="horizontal",ScrollButtonComponent:T=P,scrollButtons:N="auto",selectionFollowsFocus:F,slots:K={},slotProps:_={},TabIndicatorProps:G={},TabScrollButtonProps:U={},textColor:J="primary",value:Z,variant:ee="standard",visibleScrollbar:te=!1}=o,oe=(0,l.A)(o,j),le="scrollable"===ee,re="vertical"===R,ne=re?"scrollTop":"scrollLeft",ie=re?"top":"left",ae=re?"bottom":"right",se=re?"clientHeight":"clientWidth",ce=re?"height":"width",de=(0,r.A)({},o,{component:M,allowScrollButtonsMobile:I,indicatorColor:W,orientation:R,vertical:re,scrollButtons:N,textColor:J,variant:ee,visibleScrollbar:te,fixed:!le,hideScrollbar:le&&!te,scrollableX:le&&!re,scrollableY:le&&re,centered:y&&!le,scrollButtonsHideMobile:!I}),ue=(e=>{const{vertical:t,fixed:o,hideScrollbar:l,scrollableX:r,scrollableY:n,centered:i,scrollButtonsHideMobile:a,classes:c}=e,d={root:["root",t&&"vertical"],scroller:["scroller",o&&"fixed",l&&"hideScrollbar",r&&"scrollableX",n&&"scrollableY"],flexContainer:["flexContainer",t&&"flexContainerVertical",i&&"centered"],indicator:["indicator"],scrollButtons:["scrollButtons",a&&"scrollButtonsHideMobile"],scrollableX:[r&&"scrollableX"],hideScrollbar:[l&&"hideScrollbar"]};return(0,s.A)(d,L,c)})(de),be=(0,a.Q)({elementType:K.StartScrollButtonIcon,externalSlotProps:_.startScrollButtonIcon,ownerState:de}),pe=(0,a.Q)({elementType:K.EndScrollButtonIcon,externalSlotProps:_.endScrollButtonIcon,ownerState:de}),[fe,he]=n.useState(!1),[ve,me]=n.useState(q),[we,Se]=n.useState(!1),[Ae,xe]=n.useState(!1),[ge,ye]=n.useState(!1),[Ce,Be]=n.useState({overflow:"hidden",scrollbarWidth:0}),Me=new Map,Ie=n.useRef(null),We=n.useRef(null),Ee=()=>{const e=Ie.current;let t,o;if(e){const o=e.getBoundingClientRect();t={clientWidth:e.clientWidth,scrollLeft:e.scrollLeft,scrollTop:e.scrollTop,scrollLeftNormalized:v(e,f?"rtl":"ltr"),scrollWidth:e.scrollWidth,top:o.top,bottom:o.bottom,left:o.left,right:o.right}}if(e&&!1!==Z){const e=We.current.children;if(e.length>0){const t=e[Me.get(Z)];o=t?t.getBoundingClientRect():null}}return{tabsMeta:t,tabMeta:o}},Re=(0,k.A)((()=>{const{tabsMeta:e,tabMeta:t}=Ee();let o,l=0;if(re)o="top",t&&e&&(l=t.top-e.top+e.scrollTop);else if(o=f?"right":"left",t&&e){const r=f?e.scrollLeftNormalized+e.clientWidth-e.scrollWidth:e.scrollLeft;l=(f?-1:1)*(t[o]-e[o]+r)}const r={[o]:l,[ce]:t?t[ce]:0};if(isNaN(ve[o])||isNaN(ve[ce]))me(r);else{const e=Math.abs(ve[o]-r[o]),t=Math.abs(ve[ce]-r[ce]);(e>=1||t>=1)&&me(r)}})),Te=(e,{animation:t=!0}={})=>{t?function(e,t,o,l={},r=(()=>{})){const{ease:n=m,duration:i=300}=l;let a=null;const s=t[e];let c=!1;const d=l=>{if(c)return void r(new Error("Animation cancelled"));null===a&&(a=l);const u=Math.min(1,(l-a)/i);t[e]=n(u)*(o-s)+s,u>=1?requestAnimationFrame((()=>{r(null)})):requestAnimationFrame(d)};s===o?r(new Error("Element already at target position")):requestAnimationFrame(d)}(ne,Ie.current,e,{duration:d.transitions.duration.standard}):Ie.current[ne]=e},Ne=e=>{let t=Ie.current[ne];re?t+=e:(t+=e*(f?-1:1),t*=f&&"reverse"===h()?-1:1),Te(t)},Pe=()=>{const e=Ie.current[se];let t=0;const o=Array.from(We.current.children);for(let l=0;l<o.length;l+=1){const r=o[l];if(t+r[se]>e){0===l&&(t=e);break}t+=r[se]}return t},ke=()=>{Ne(-1*Pe())},Le=()=>{Ne(Pe())},Fe=n.useCallback((e=>{Be({overflow:null,scrollbarWidth:e})}),[]),ze=(0,k.A)((e=>{const{tabsMeta:t,tabMeta:o}=Ee();if(o&&t)if(o[ie]<t[ie]){const l=t[ne]+(o[ie]-t[ie]);Te(l,{animation:e})}else if(o[ae]>t[ae]){const l=t[ne]+(o[ae]-t[ae]);Te(l,{animation:e})}})),je=(0,k.A)((()=>{le&&!1!==N&&ye(!ge)}));n.useEffect((()=>{const e=(0,p.A)((()=>{Ie.current&&Re()}));let t;const o=(0,S.A)(Ie.current);let l;return o.addEventListener("resize",e),"undefined"!=typeof ResizeObserver&&(t=new ResizeObserver(e),Array.from(We.current.children).forEach((e=>{t.observe(e)}))),"undefined"!=typeof MutationObserver&&(l=new MutationObserver((o=>{o.forEach((e=>{e.removedNodes.forEach((e=>{var o;null==(o=t)||o.unobserve(e)})),e.addedNodes.forEach((e=>{var o;null==(o=t)||o.observe(e)}))})),e(),je()})),l.observe(We.current,{childList:!0})),()=>{var r,n;e.clear(),o.removeEventListener("resize",e),null==(r=l)||r.disconnect(),null==(n=t)||n.disconnect()}}),[Re,je]),n.useEffect((()=>{const e=Array.from(We.current.children),t=e.length;if("undefined"!=typeof IntersectionObserver&&t>0&&le&&!1!==N){const o=e[0],l=e[t-1],r={root:Ie.current,threshold:.99},n=new IntersectionObserver((e=>{Se(!e[0].isIntersecting)}),r);n.observe(o);const i=new IntersectionObserver((e=>{xe(!e[0].isIntersecting)}),r);return i.observe(l),()=>{n.disconnect(),i.disconnect()}}}),[le,N,ge,null==C?void 0:C.length]),n.useEffect((()=>{he(!0)}),[]),n.useEffect((()=>{Re()})),n.useEffect((()=>{ze(q!==ve)}),[ze,ve]),n.useImperativeHandle(g,(()=>({updateIndicator:Re,updateScrollButtons:je})),[Re,je]);const He=(0,A.jsx)(V,(0,r.A)({},G,{className:(0,i.A)(ue.indicator,G.className),ownerState:de,style:(0,r.A)({},ve,G.style)}));let Xe=0;const $e=n.Children.map(C,(e=>{if(!n.isValidElement(e))return null;const t=void 0===e.props.value?Xe:e.props.value;Me.set(t,Xe);const o=t===Z;return Xe+=1,n.cloneElement(e,(0,r.A)({fullWidth:"fullWidth"===ee,indicator:o&&!fe&&He,selected:o,selectionFollowsFocus:F,onChange:E,textColor:J,value:t},1!==Xe||!1!==Z||e.props.tabIndex?{}:{tabIndex:0}))})),Ye=(()=>{const e={};e.scrollbarSizeListener=le?(0,A.jsx)(Q,{onChange:Fe,className:(0,i.A)(ue.scrollableX,ue.hideScrollbar)}):null;const t=le&&("auto"===N&&(we||Ae)||!0===N);return e.scrollButtonStart=t?(0,A.jsx)(T,(0,r.A)({slots:{StartScrollButtonIcon:K.StartScrollButtonIcon},slotProps:{startScrollButtonIcon:be},orientation:R,direction:f?"right":"left",onClick:ke,disabled:!we},U,{className:(0,i.A)(ue.scrollButtons,U.className)})):null,e.scrollButtonEnd=t?(0,A.jsx)(T,(0,r.A)({slots:{EndScrollButtonIcon:K.EndScrollButtonIcon},slotProps:{endScrollButtonIcon:pe},orientation:R,direction:f?"left":"right",onClick:Le,disabled:!Ae},U,{className:(0,i.A)(ue.scrollButtons,U.className)})):null,e})();return(0,A.jsxs)(Y,(0,r.A)({className:(0,i.A)(ue.root,B),ownerState:de,ref:t,as:M},oe,{children:[Ye.scrollButtonStart,Ye.scrollbarSizeListener,(0,A.jsxs)(D,{className:ue.scroller,ownerState:de,style:{overflow:Ce.overflow,[re?"margin"+(f?"Left":"Right"):"marginBottom"]:te?void 0:-Ce.scrollbarWidth},ref:Ie,children:[(0,A.jsx)(O,{"aria-label":w,"aria-labelledby":x,"aria-orientation":"vertical"===R?"vertical":null,className:ue.flexContainer,ownerState:de,onKeyDown:e=>{const t=We.current,o=(0,z.A)(t).activeElement;if("tab"!==o.getAttribute("role"))return;let l="horizontal"===R?"ArrowLeft":"ArrowUp",r="horizontal"===R?"ArrowRight":"ArrowDown";switch("horizontal"===R&&f&&(l="ArrowRight",r="ArrowLeft"),e.key){case l:e.preventDefault(),$(t,o,X);break;case r:e.preventDefault(),$(t,o,H);break;case"Home":e.preventDefault(),$(t,null,H);break;case"End":e.preventDefault(),$(t,null,X)}},ref:We,role:"tablist",children:$e}),fe&&He]}),Ye.scrollButtonEnd]}))}))}}]);