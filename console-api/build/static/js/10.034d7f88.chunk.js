(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{131:function(e,a,t){"use strict";var n=t(0),r=t.n(n).a.createContext({sites:[],selectedSite:{},selectSite:function(){}});a.a=r},133:function(e,a,t){"use strict";var n=t(0),r=t.n(n).a.createContext({confirmationModal:{visible:!1,item:"",callback:function(){}},setConfirmationModal:function(){}});a.a=r},134:function(e,a,t){"use strict";t.d(a,"h",function(){return i}),t.d(a,"g",function(){return s}),t.d(a,"c",function(){return p}),t.d(a,"b",function(){return v}),t.d(a,"e",function(){return b}),t.d(a,"a",function(){return y}),t.d(a,"i",function(){return x}),t.d(a,"d",function(){return w}),t.d(a,"j",function(){return k}),t.d(a,"f",function(){return j});var n=t(1),r=t.n(n),l=t(10),c=t(15),o=t(14);function i(){return u.apply(this,arguments)}function u(){return(u=Object(l.a)(r.a.mark(function e(){var a;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=new c.a,e.abrupt("return",a.get(o.e).then(function(e){return e.data},function(e){throw e}));case 2:case"end":return e.stop()}},e)}))).apply(this,arguments)}function s(e){return m.apply(this,arguments)}function m(){return(m=Object(l.a)(r.a.mark(function e(a){var t;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t=new c.a,e.abrupt("return",t.get(o.e,a).then(function(e){return e.data},function(e){throw e}));case 2:case"end":return e.stop()}},e)}))).apply(this,arguments)}function p(e){return d.apply(this,arguments)}function d(){return(d=Object(l.a)(r.a.mark(function e(a){var t;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t=new c.a,e.abrupt("return",t.post(o.e,a).then(function(e){return e.data},function(e){throw e}));case 2:case"end":return e.stop()}},e)}))).apply(this,arguments)}function v(e,a){return f.apply(this,arguments)}function f(){return(f=Object(l.a)(r.a.mark(function e(a,t){var n,l;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=new c.a({headers:{contentType:"multipart/form-data"}}),(l=new FormData).append("plan",t.plan),l.append("name",t.name),l.append("image",t.image),e.abrupt("return",n.post("".concat(o.e,"/").concat(a,"/addLevel"),l).then(function(e){return e.data},function(e){throw e}));case 6:case"end":return e.stop()}},e)}))).apply(this,arguments)}function b(e,a){return E.apply(this,arguments)}function E(){return(E=Object(l.a)(r.a.mark(function e(a,t){var n;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=new c.a,e.abrupt("return",n.delete("".concat(o.e,"/").concat(a,"/addLevel"),t).then(function(e){return e.data},function(e){throw e}));case 2:case"end":return e.stop()}},e)}))).apply(this,arguments)}function y(e,a,t,n,r){return h.apply(this,arguments)}function h(){return(h=Object(l.a)(r.a.mark(function e(a,t,n,l,i){var u;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return u=new c.a,e.abrupt("return",u.post("".concat(o.e,"/").concat(a,"/addCamera"),{siteId:a,camera:t,level:n,cameraPoints:l,floorPlanPoints:i}).then(function(e){return e.data},function(e){throw e}));case 2:case"end":return e.stop()}},e)}))).apply(this,arguments)}function x(e,a,t,n,r){return g.apply(this,arguments)}function g(){return(g=Object(l.a)(r.a.mark(function e(a,t,n,l,i){var u;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return u=new c.a,e.abrupt("return",u.put("".concat(o.e,"/").concat(a,"/addCamera"),{siteId:a,camera:t,level:n,cameraPoints:l,floorPlanPoints:i}).then(function(e){return e.data},function(e){throw e}));case 2:case"end":return e.stop()}},e)}))).apply(this,arguments)}function w(e,a,t){return C.apply(this,arguments)}function C(){return(C=Object(l.a)(r.a.mark(function e(a,t,n){var l;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return l=new c.a,e.abrupt("return",l.delete("".concat(o.e,"/").concat(a,"/addCamera/").concat(t),n).then(function(e){return e.data},function(e){throw e}));case 2:case"end":return e.stop()}},e)}))).apply(this,arguments)}function k(e,a){return O.apply(this,arguments)}function O(){return(O=Object(l.a)(r.a.mark(function e(a,t){var n;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=new c.a,e.abrupt("return",n.put("".concat(o.e,"/").concat(t),a).then(function(e){return e.data},function(e){throw e}));case 2:case"end":return e.stop()}},e)}))).apply(this,arguments)}function j(e){return P.apply(this,arguments)}function P(){return(P=Object(l.a)(r.a.mark(function e(a){var t;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t=new c.a,e.abrupt("return",t.delete(o.e,a).then(function(e){return e.data},function(e){throw e}));case 2:case"end":return e.stop()}},e)}))).apply(this,arguments)}},136:function(e,a,t){},137:function(e,a,t){"use strict";var n=t(0),r=t.n(n),l=t(5),c=t(9),o=t(395),i=t(396),u=t(397),s=t(398),m=t(399),p=t(400),d=t(401),v=t(402),f=t(403),b=t(27),E=t(28),y=(t(136),t(6)),h=t(131),x=function(){var e=r.a.useState(!1),a=Object(c.a)(e,2),t=a[0],n=a[1],l=localStorage.getItem("user")||{};l&&(l=JSON.parse(l));var x=l.role||{};return r.a.createElement("div",{className:"dar-navbar"},r.a.createElement(s.a,{className:"container",color:"faded",expand:"md"},r.a.createElement(m.a,{href:"/",className:"mr-auto"},r.a.createElement("img",{className:"dar-navbar__logo",src:"/images/logo-full.png",alt:"Darvis"})),r.a.createElement(p.a,{onClick:function(){return n(!t)}}),r.a.createElement(d.a,{isOpen:t,navbar:!0},r.a.createElement(h.a.Consumer,null,function(e){var a=e.selectedSite;return r.a.createElement(r.a.Fragment,null,a?function(e){return r.a.createElement(o.a,{className:"mr-auto",navbar:!0},Object(y.d)()&&r.a.createElement(i.a,{className:"dar-navbar__item"},r.a.createElement(b.c,{to:"/console/home",activeClassName:"link-active"},"Site")),Object(y.d)()&&e&&r.a.createElement(i.a,{className:"dar-navbar__item"},r.a.createElement(b.c,{to:"/console/site",activeClassName:"link-active"},e.name)),Object(y.d)()&&r.a.createElement(i.a,{className:"dar-navbar__item"},r.a.createElement(b.c,{to:"/console/cameras",activeClassName:"link-active"},"Cameras")),Object(y.d)()&&r.a.createElement(i.a,{className:"dar-navbar__item"},r.a.createElement(b.c,{to:"/console/explore",activeClassName:"link-active"},"Explore")),Object(y.d)()&&r.a.createElement(i.a,{className:"dar-navbar__item"},r.a.createElement(b.c,{to:"/console/analytics",activeClassName:"link-active"},"Analytics")),(Object(y.e)()||Object(y.c)())&&r.a.createElement(i.a,{className:"dar-navbar__item"},r.a.createElement(b.c,{to:"/console/admin/users",activeClassName:"link-active"},"Admin")))}(a):Object(y.d)()?r.a.createElement(o.a,{className:"mr-auto",navbar:!0},r.a.createElement(u.a,{color:"info",style:{marginBottom:"0",padding:"0.45rem 1.25rem 0.3rem"}},"Select a site to move ahead")):null)}),r.a.createElement("span",{className:"info"},"Hi \xa0",r.a.createElement("b",null,l.name,"\xa0"),r.a.createElement(v.a,{style:{padding:"5px 4px 4px 4px"},color:"dark"},x.name)),r.a.createElement(E.b,null,function(e){var a=e.logout;return r.a.createElement(f.a,{outline:!0,size:"sm",color:"dark",type:"submit",onClick:function(){return a()}},"logout")}))))},g=t(1),w=t.n(g),C=t(20),k=t(10),O=t(134),j=t(26),P=Object(l.f)(function(e){var a=e.history,t=e.children,l=Object(n.useContext)(j.b),o=JSON.parse(localStorage.getItem("selectedSite")),i=Object(n.useState)({selectedSite:o,reset:0,loading:!1}),u=Object(c.a)(i,2),s=u[0],m=u[1];return Object(n.useEffect)(function(){function e(){return(e=Object(k.a)(w.a.mark(function e(){var a;return w.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,m(function(e){return Object(C.a)({},e,{loading:!0})}),e.next=4,Object(O.g)(s.selectedSite._id);case 4:a=e.sent,m(function(e){return Object(C.a)({},e,{selectedSite:a,loading:!1})}),localStorage.setItem("selectedSite",JSON.stringify(a)),e.next=13;break;case 9:e.prev=9,e.t0=e.catch(0),m(function(e){return Object(C.a)({},e,{loading:!1})}),l.setError(e.t0,!0);case 13:case"end":return e.stop()}},e,null,[[0,9]])}))).apply(this,arguments)}s.selectedSite?function(){e.apply(this,arguments)}():a.push("/console/home")},[a,s.reset,l,m]),r.a.createElement(h.a.Provider,{value:{loading:s.loading,selectedSite:s.selectedSite,selectSite:function(e){m({selectSite:e}),localStorage.setItem("selectedSite",JSON.stringify(e)),a.push("/console/site")},reloadSites:function(){m(Object(C.a)({},s,{reset:s.reset+1}))}}},t)}),S=t(422),_=t(404),N=t(405),I=t(406),M=t(133),D={visible:!1,item:void 0,loading:!1,callback:function(){}},F=function(e){var a=e.children,t=Object(n.useState)(D),l=Object(c.a)(t,2),o=l[0],i=l[1];return r.a.createElement(r.a.Fragment,null,r.a.createElement(M.a.Provider,{value:{confirmationModal:o,setConfirmationModal:i,resetConfirmationModal:function(){return i(D)},setLoader:function(e){return i(Object(C.a)({},o,{loading:e}))}}},a),r.a.createElement(S.a,{style:{maxWidth:"250px"},isOpen:o.visible,toggle:function(){return i(Object(C.a)({},o,{visible:!o.visible}))}},r.a.createElement(_.a,null,"This will delete ",r.a.createElement("b",null,"".concat(o.item,", "))," Are you sure you want to?"),r.a.createElement(N.a,null,o.loading?r.a.createElement(I.a,null):r.a.createElement(r.a.Fragment,null,r.a.createElement(f.a,{color:"light",onClick:function(){return i(D)}},"No")," ",r.a.createElement(f.a,{color:"danger",onClick:function(){return o.callback()}},"Yes, Delete!!")))))};a.a=Object(l.f)(function(e){var a,t=e.match,n=e.children;return r.a.createElement(F,null,(a=function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(x,null),r.a.createElement("div",{className:"container camera-system",style:{marginBottom:"30px"}},n))},t.path.includes("admin")?a():r.a.createElement(P,null,a())))})},390:function(e,a,t){e.exports={cameraCard:"styles_cameraCard__XB7TF",activeIcon:"styles_activeIcon__31312",cameraCardBody:"styles_cameraCardBody__3yoh3",cameraCardFooter:"styles_cameraCardFooter__3vpEl",icon:"styles_icon__17zk3",editButton:"styles_editButton__23tHQ"}},391:function(e,a,t){e.exports={cameraCard:"styles_cameraCard__Hz5c8",cameraCardBody:"styles_cameraCardBody__18XH9",cameraCardFooter:"styles_cameraCardFooter__37_H9",icon:"styles_icon__3JujY"}},418:function(e,a,t){"use strict";t.r(a);var n=t(1),r=t.n(n),l=t(10),c=t(20),o=t(9),i=t(0),u=t.n(i),s=t(413),m=t(407),p=t(408),d=t(422),v=t(137),f=t(403),b=t(138),E=t(133),y=t(390),h=t.n(y),x=function(e){var a=e.camera,t=e.level,n=e.onClick,r=e.deleteCamera;return u.a.createElement("div",{className:h.a.cameraCard},u.a.createElement(b.a,{icon:"circle",style:{color:a.isActive?"#0bde0b":"red"},className:h.a.activeIcon}),u.a.createElement("div",{className:h.a.cameraCardBody},u.a.createElement(b.a,{icon:"video",className:h.a.icon})),u.a.createElement("div",{className:h.a.cameraCardFooter},u.a.createElement("span",null,a.name),u.a.createElement(f.a,{onClick:n,color:"default",className:h.a.editButton},u.a.createElement(b.a,{icon:"pen"})),u.a.createElement(E.a.Consumer,null,function(e){var n=e.setConfirmationModal,l=e.resetConfirmationModal,o=e.setLoader;return u.a.createElement(f.a,{onClick:function(){n(function(e){return Object(c.a)({},e,{visible:!0,item:a.name,callback:function(){o(!0),r(a.id,t.levelId,function(){return l()},function(){return o(!1)})}})})},color:"default",className:h.a.editButton,style:{paddingLeft:0,color:"#f35656"}},u.a.createElement(b.a,{icon:"trash"}))})))};x.defaultProps={camera:{}};var g=x,w=t(391),C=t.n(w),k=function(e){var a=e.onClick;return u.a.createElement("div",{className:C.a.cameraCard},u.a.createElement("div",{className:C.a.cameraCardBody},u.a.createElement(f.a,{color:"default",onClick:a},u.a.createElement(b.a,{className:C.a.icon,size:"3x",icon:"plus"}))))};k.defaultProps={onClick:function(){}};var O=k,j=t(131),P=t(245),S=t(156),_=t(247),N=t(404),I=t(409),M=t(410),D=t(411),F=t(412),B=t(405),z=t(406),q=t(148),K=t(246),L=t(43),R=t.n(L);function J(){var e=Object(P.a)(["\n  display: block;\n  width: 100%;\n  height: 285px;\n  background: grey;\n  padding: 33% 23%;\n  font-size: 25px;\n"]);return J=function(){return e},e}var A=q.object().shape({name:q.string().min(3,"Min 3 Characters!!").max(15,"Max 15 allowed").required("Name Required"),url:q.string().required("Camera URL Required"),username:q.string().required("Username Required"),password:q.string().required("Password Required")}),U=K.a.div(J()),W=function(e){var a=e.initialValues,t=void 0===a?{}:a,n=e.modalState,i=e.setModalState,s=u.a.useState(!1),d=Object(o.a)(s,2),v=d[0],b=d[1];return u.a.createElement(S.c,{initialValues:{name:t.name||"",type:t.type||"hd",url:t.url||"",username:t.username||"",password:t.password||""},validationSchema:A,onSubmit:function(){var e=Object(l.a)(r.a.mark(function e(a,t){var l,o;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return l=function(){t.setSubmitting(!1),b(!1)},b(!0),e.next=4,r=a,R.a.post("http://127.0.0.1:8888/api/getSingleFrame",{url:r.url,username:r.username,password:r.password});case 4:(o=e.sent)&&o.data&&o.data.length>1e3?(a.image=o.data,n.camera=a,i(Object(c.a)({},n,{error:void 0,camera:n.camera}))):i(Object(c.a)({},n,{error:o.data})),l();case 7:case"end":return e.stop()}var r},e)}));return function(a,t){return e.apply(this,arguments)}}()},function(e){var a=e.values,r=e.isValid,l=e.isDirty,o=e.errors,s=e.handleSubmit,d=e.handleChange,b=e.isSubmitting;return u.a.createElement(_.a,{onSubmit:s},u.a.createElement(N.a,null,u.a.createElement(m.a,null,u.a.createElement(p.a,{md:6},u.a.createElement(I.a,null,u.a.createElement(M.a,{for:"name"},"Name"),u.a.createElement(D.a,{invalid:!!o.name,id:"name",tag:S.b,name:"name",onChange:d,value:a.name}),u.a.createElement(S.a,{name:"name",component:"div"},function(e){return u.a.createElement(F.a,null,e)})),u.a.createElement(I.a,null,u.a.createElement(M.a,{for:"url"},"URL"),u.a.createElement(D.a,{invalid:!!o.url,id:"url",tag:S.b,name:"url",onChange:d,value:a.url}),u.a.createElement(S.a,{name:"url",component:"div"},function(e){return u.a.createElement(F.a,null,e)})),u.a.createElement(I.a,null,u.a.createElement(M.a,{for:"username"},"Username"),u.a.createElement(D.a,{invalid:!!o.username,id:"username",tag:S.b,name:"username",onChange:d,value:a.username}),u.a.createElement(S.a,{name:"username",component:"div"},function(e){return u.a.createElement(F.a,null,e)})),u.a.createElement(I.a,null,u.a.createElement(M.a,{for:"password"},"Password"),u.a.createElement(D.a,{invalid:!!o.password,id:"password",tag:S.b,name:"password",onChange:d,value:a.password}),u.a.createElement(S.a,{name:"password",component:"div"},function(e){return u.a.createElement(F.a,null,e)}))),u.a.createElement(p.a,null,!n.error&&n.camera&&n.camera.image?u.a.createElement("img",{style:{maxWidth:"385px"},src:"data:image/png;base64, ".concat(n.camera.image),alt:"preview"}):u.a.createElement(U,null,"Camera Preview"))),n.error&&u.a.createElement(m.a,null,u.a.createElement(p.a,null,u.a.createElement("div",{style:{color:"red"}},n.error)))),u.a.createElement(B.a,null,v?u.a.createElement(z.a,null):u.a.createElement(u.a.Fragment,null,u.a.createElement(f.a,{type:"submit",color:"primary",size:"sm",disabled:b||!r||!!l},t._id?"Update":"Connect"," Camera"),!n.error&&n.camera&&n.camera.image&&u.a.createElement(f.a,{color:"primary",size:"sm",onClick:function(){return i(Object(c.a)({},n,{camera:Object(c.a)({},n.camera,a),step:1}))}},"Next"))))})},H=t(3),T={position:"absolute",width:"21px",height:"20px",background:"#000000",border:"1px solid",fontSize:"12px",color:"white",fontWeight:"600",padding:"0px 6px",cursor:"pointer",display:"none"};var V=function(e){var a=e.modalState,t=e.addCamera,n=e.updateCamera,r=e.toggle,l=a.camera,s=Object(i.useState)(!1),d=Object(o.a)(s,2),v=d[0],b=d[1],E=Object(i.useState)({activePoint:1,values:l&&l.cameraPoints?l.cameraPoints:{p1:{x:0,y:0},p2:{x:0,y:0},p3:{x:0,y:0},p4:{x:0,y:0}}}),y=Object(o.a)(E,2),h=y[0],x=y[1],g=Object(i.useState)({activePoint:1,values:l&&l.floorPlanPoints?l.floorPlanPoints:{p1:{x:0,y:0},p2:{x:0,y:0},p3:{x:0,y:0},p4:{x:0,y:0}}}),w=Object(o.a)(g,2),C=w[0],k=w[1];function O(e){var a=e.target.getBoundingClientRect(),t=Math.round(e.clientX-a.left),n=Math.round(e.clientY-a.top);1===h.activePoint&&(h.values.p1={x:t,y:n}),2===h.activePoint&&(h.values.p2={x:t,y:n}),3===h.activePoint&&(h.values.p3={x:t,y:n}),4===h.activePoint&&(h.values.p4={x:t,y:n}),h.activePoint+=1,x(Object(c.a)({},h))}function P(e){var a=e.target.getBoundingClientRect(),t=Math.round(e.clientX-a.left),n=Math.round(e.clientY-a.top);1===C.activePoint&&(C.values.p1={x:t,y:n}),2===C.activePoint&&(C.values.p2={x:t,y:n}),3===C.activePoint&&(C.values.p3={x:t,y:n}),4===C.activePoint&&(C.values.p4={x:t,y:n}),C.activePoint+=1,k(Object(c.a)({},C))}return u.a.createElement(j.a.Consumer,null,function(e){var o=e.selectedSite.structure.dataObjects;if(a&&a.level){var s=(o[0]?o[0].levelDetails:[]).find(function(e){return e.id===a.level.levelId});return u.a.createElement(i.Fragment,null,u.a.createElement(N.a,null,u.a.createElement(m.a,{style:{marginBottom:"10px"}},u.a.createElement(p.a,{md:"6"},u.a.createElement("h4",null,"Camera Preview")),u.a.createElement(p.a,{md:"6"},u.a.createElement("h4",null,"Floor Plan"))),u.a.createElement(m.a,null,u.a.createElement(p.a,{md:"6"},u.a.createElement(m.a,null,u.a.createElement(p.a,null,u.a.createElement("b",null,"P1x:")," ",h.values.p1.x),u.a.createElement(p.a,null,u.a.createElement("b",null,"P1y:")," ",h.values.p1.y)),u.a.createElement(m.a,null,u.a.createElement(p.a,null,u.a.createElement("b",null,"P2x:")," ",h.values.p2.x),u.a.createElement(p.a,null,u.a.createElement("b",null,"P2y:")," ",h.values.p2.y)),u.a.createElement(m.a,null,u.a.createElement(p.a,null,u.a.createElement("b",null,"P3x:")," ",h.values.p3.x),u.a.createElement(p.a,null,u.a.createElement("b",null,"P3y:")," ",h.values.p3.y)),u.a.createElement(m.a,null,u.a.createElement(p.a,null,u.a.createElement("b",null,"P4x:")," ",h.values.p4.x),u.a.createElement(p.a,null,u.a.createElement("b",null,"P4y:")," ",h.values.p4.y))),u.a.createElement(p.a,{md:"6"},u.a.createElement(m.a,null,u.a.createElement(p.a,null,u.a.createElement("b",null,"P1x:")," ",C.values.p1.x),u.a.createElement(p.a,null,u.a.createElement("b",null,"P1y:")," ",C.values.p1.y)),u.a.createElement(m.a,null,u.a.createElement(p.a,null,u.a.createElement("b",null,"P2x:")," ",C.values.p2.x),u.a.createElement(p.a,null,u.a.createElement("b",null,"P2y:")," ",C.values.p2.y)),u.a.createElement(m.a,null,u.a.createElement(p.a,null,u.a.createElement("b",null,"P3x:")," ",C.values.p3.x),u.a.createElement(p.a,null,u.a.createElement("b",null,"P3y:")," ",C.values.p3.y)),u.a.createElement(m.a,null,u.a.createElement(p.a,null,u.a.createElement("b",null,"P4x:")," ",C.values.p4.x),u.a.createElement(p.a,null,u.a.createElement("b",null,"P4y:")," ",C.values.p4.y)))),u.a.createElement("hr",null),u.a.createElement(m.a,null,u.a.createElement(p.a,{md:"6"},a&&a.camera&&a.camera.image&&u.a.createElement("div",{role:"button",tabIndex:0,style:{position:"relative",width:"410px"},onMouseDown:O},u.a.createElement("img",{style:{maxWidth:"410px"},src:"data:image/png;base64, ".concat(a.camera.image),alt:"camera-preview"}),u.a.createElement("span",{role:"button",tabIndex:0,style:Object(c.a)({},T,{left:h.values.p1.x,top:h.values.p1.y,display:h.values.p1.x&&h.values.p1.y?"block":"none",background:1===h.activePoint?"blue":"black"}),onClick:function(){x(Object(c.a)({},h,{activePoint:1}))},onKeyDown:function(){}},"1"),u.a.createElement("span",{role:"button",tabIndex:0,style:Object(c.a)({},T,{left:h.values.p2.x,top:h.values.p2.y,display:h.values.p2.x&&h.values.p2.y?"block":"none",background:2===h.activePoint?"blue":"black"}),onClick:function(){x(Object(c.a)({},h,{activePoint:2}))},onKeyDown:function(){}},"2"),u.a.createElement("span",{role:"button",tabIndex:0,style:Object(c.a)({},T,{left:h.values.p3.x,top:h.values.p3.y,display:h.values.p3.x&&h.values.p3.y?"block":"none",background:3===h.activePoint?"blue":"black"}),onClick:function(){x(Object(c.a)({},h,{activePoint:3}))},onKeyDown:function(){}},"3"),u.a.createElement("span",{role:"button",tabIndex:0,style:Object(c.a)({},T,{left:h.values.p4.x,top:h.values.p4.y,display:h.values.p4.x&&h.values.p4.y?"block":"none",background:4===h.activePoint?"blue":"black"}),onClick:function(){x(Object(c.a)({},h,{activePoint:4}))},onKeyDown:function(){}},"4"))),u.a.createElement(p.a,{md:"6"},u.a.createElement("div",{role:"button",tabIndex:0,style:{position:"relative",width:"410px"},onMouseDown:P},u.a.createElement("img",{style:{maxWidth:"400px"},src:H.e+s.plan,alt:"floor-plan"}),u.a.createElement("span",{role:"button",tabIndex:0,style:Object(c.a)({},T,{left:C.values.p1.x,top:C.values.p1.y,display:C.values.p1.x&&C.values.p1.y?"block":"none",background:1===C.activePoint?"blue":"black"}),onClick:function(){k(Object(c.a)({},C,{activePoint:1}))},onKeyDown:function(){}},"1"),u.a.createElement("span",{role:"button",tabIndex:0,style:Object(c.a)({},T,{left:C.values.p2.x,top:C.values.p2.y,display:C.values.p2.x&&C.values.p2.y?"block":"none",background:2===C.activePoint?"blue":"black"}),onClick:function(){k(Object(c.a)({},C,{activePoint:2}))},onKeyDown:function(){}},"2"),u.a.createElement("span",{role:"button",tabIndex:0,style:Object(c.a)({},T,{left:C.values.p3.x,top:C.values.p3.y,display:C.values.p3.x&&C.values.p3.y?"block":"none",background:3===C.activePoint?"blue":"black"}),onClick:function(){k(Object(c.a)({},C,{activePoint:3}))},onKeyDown:function(){}},"3"),u.a.createElement("span",{role:"button",tabIndex:0,style:Object(c.a)({},T,{left:C.values.p4.x,top:C.values.p4.y,display:C.values.p4.x&&C.values.p4.y?"block":"none",background:4===C.activePoint?"blue":"black"}),onClick:function(){k(Object(c.a)({},C,{activePoint:4}))},onKeyDown:function(){}},"4"))))),u.a.createElement(B.a,null,v?u.a.createElement(z.a,null):u.a.createElement(f.a,{color:"primary",size:"sm",onClick:function(){b(!0),l&&l.id&&l.floorPlanPoints&&l.cameraPoints?n(a.camera,a.level,h.values,C.values,function(){b(!1),r()}):t(a.camera,a.level,h.values,C.values,function(){b(!1),r()})}},l&&l.id&&l.floorPlanPoints&&l.cameraPoints?"Update Camera":"Add Camera")))}return null})},X=t(26),Y=t(134);a.default=function(){var e=Object(i.useState)({camera:void 0,level:void 0,loading:!1,visible:!1,step:0}),a=Object(o.a)(e,2),t=a[0],n=a[1],f=Object(i.useContext)(X.b);function b(e,a,r){var l=Object(c.a)({},t,{camera:a,level:t.visible?void 0:e,visible:!t.visible});l.step=0===r||1===r?r:0,n(l)}return u.a.createElement(v.a,null,u.a.createElement(j.a.Consumer,null,function(e){var a=e.selectedSite,c=e.setSelectedSite,o=e.reloadLevel;function i(){return(i=Object(l.a)(r.a.mark(function e(t,n,l,o,i){var u;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,Object(Y.a)(a._id,t,n,l,o);case 3:u=e.sent,c(u),b(),i(),e.next=13;break;case 9:e.prev=9,e.t0=e.catch(0),i(),f.setError(e.t0,!0);case 13:case"end":return e.stop()}},e,null,[[0,9]])}))).apply(this,arguments)}function v(){return(v=Object(l.a)(r.a.mark(function e(t,n,l,o,i){var u;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,Object(Y.i)(a._id,t,n,l,o);case 3:u=e.sent,c(u),b(),i(),e.next=13;break;case 9:e.prev=9,e.t0=e.catch(0),i(),f.setError(e.t0,!0);case 13:case"end":return e.stop()}},e,null,[[0,9]])}))).apply(this,arguments)}function E(e,a,t,n){return y.apply(this,arguments)}function y(){return(y=Object(l.a)(r.a.mark(function e(t,n,l,c){return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,Object(Y.d)(a._id,t,n);case 3:l&&l(),o(),e.next=11;break;case 7:e.prev=7,e.t0=e.catch(0),c&&c(e.t0),f.setError(e.t0,!0);case 11:case"end":return e.stop()}},e,null,[[0,7]])}))).apply(this,arguments)}var h=a.structure.dataSources[0].levels;return u.a.createElement(u.a.Fragment,null,h.map(function(e){return u.a.createElement(u.a.Fragment,{key:e.levelId},u.a.createElement(m.a,{style:{marginTop:"10px"}},u.a.createElement(p.a,{md:"12"},u.a.createElement("h3",null,e.name))),u.a.createElement(m.a,{style:{marginTop:"10px"}},e.cameras&&!!e.cameras.length&&e.cameras.map(function(a){return u.a.createElement(p.a,{md:"2",key:a.name+a.username+a.type},u.a.createElement(g,{camera:a,level:e,onClick:function(){n(),b(e,a,0)},deleteCamera:E}))}),u.a.createElement(p.a,{md:"2"},u.a.createElement(O,{onClick:function(){return b(e)}}))))}),u.a.createElement(d.a,{isOpen:t.visible,toggle:b,style:{maxWidth:"850px"}},0===t.step?u.a.createElement(s.a,{toggle:b},t.camera&&t.camera.url?"Edit":"Add"," Camera"):1===t.step?t.camera&&t.camera.cameraPoints&&t.camera.floorPlanPoints?u.a.createElement(s.a,{toggle:b},"Edit Draw Points"):u.a.createElement(s.a,{toggle:b},"Draw Points"):u.a.createElement(s.a,{toggle:b},"Camera Connection"),0===t.step&&u.a.createElement(W,{setModalState:n,modalState:t,initialValues:t.camera}),1===t.step&&u.a.createElement(V,{initialValues:t.camera,setModalState:n,modalState:t,addCamera:function(e,a,t,n,r){return i.apply(this,arguments)},updateCamera:function(e,a,t,n,r){return v.apply(this,arguments)},toggle:b})))}))}}}]);
//# sourceMappingURL=10.034d7f88.chunk.js.map