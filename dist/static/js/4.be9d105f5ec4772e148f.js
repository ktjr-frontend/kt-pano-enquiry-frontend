webpackJsonp([4,26],{15:function(t,e,o){!function(e,o){t.exports=o()}(this,function(){return function(t){function e(i){if(o[i])return o[i].exports;var s=o[i]={exports:{},id:i,loaded:!1};return t[i].call(s.exports,s,s.exports,e),s.loaded=!0,s.exports}var o={};return e.m=t,e.c=o,e.p="",e(0)}([function(t,e,o){t.exports=o(6)},function(t,e,o){"use strict";function i(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var s=o(3),n=i(s),a=["android","ios","ios-small","bubbles","circles","crescent","dots","lines","ripple","spiral"];e["default"]={ready:function(){(0,n["default"])(this.$el,this.type)},props:{type:{type:String,"default":"ios"}},computed:{className:function(){for(var t={},e=0;e<a.length;e++)t["vux-spinner-"+a[e]]=this.type===a[e];return t}}}},function(t,e){"use strict";for(var o=0,i=["webkit","moz"],s=0;s<i.length&&!window.requestAnimationFrame;++s)window.requestAnimationFrame=window[i[s]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[i[s]+"CancelAnimationFrame"]||window[i[s]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(t,e){var i=(new Date).getTime(),s=Math.max(0,16-(i-o)),n=window.setTimeout(function(){t(i+s)},s);return o=i+s,n}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(t){clearTimeout(t)})},function(t,e,o){"use strict";function i(t,e,o,n){var a,l,r,c=document.createElement(f[t]||t);for(a in e)if("[object Array]"===Object.prototype.toString.call(e[a]))for(l=0;l<e[a].length;l++)if(e[a][l].fn)for(r=0;r<e[a][l].t;r++)i(a,e[a][l].fn(r,n),c,n);else i(a,e[a][l],c,n);else s(c,a,e[a]);o.appendChild(c)}function s(t,e,o){t.setAttribute(f[e]||e,o)}function n(t,e){var o=t.split(";"),i=o.slice(e),s=o.slice(0,o.length-i.length);return o=i.concat(s).reverse(),o.join(";")+";"+o[0]}function a(t,e){return t/=e/2,t<1?.5*t*t*t:(t-=2,.5*(t*t*t+2))}Object.defineProperty(e,"__esModule",{value:!0}),e["default"]=function(t,e){function o(){g[s]&&(n=g[s](t)())}var s,n;s=e;var a=document.createElement("div");return i("svg",{viewBox:"0 0 64 64",g:[v[s]]},a,s),t.innerHTML=a.innerHTML,o(),t},o(2);var l="translate(32,32)",r="stroke-opacity",c="round",u="indefinite",d="750ms",p="none",f={a:"animate",an:"attributeName",at:"animateTransform",c:"circle",da:"stroke-dasharray",os:"stroke-dashoffset",f:"fill",lc:"stroke-linecap",rc:"repeatCount",sw:"stroke-width",t:"transform",v:"values"},m={v:"0,32,32;360,32,32",an:"transform",type:"rotate",rc:u,dur:d},h={sw:4,lc:c,line:[{fn:function(t,e){return{y1:"ios"===e?17:12,y2:"ios"===e?29:20,t:l+" rotate("+(30*t+(t<6?180:-180))+")",a:[{fn:function(){return{an:r,dur:d,v:n("0;.1;.15;.25;.35;.45;.55;.65;.7;.85;1",t),rc:u}},t:1}]}},t:12}]},v={android:{c:[{sw:6,da:128,os:82,r:26,cx:32,cy:32,f:p}]},ios:h,"ios-small":h,bubbles:{sw:0,c:[{fn:function(t){return{cx:24*Math.cos(2*Math.PI*t/8),cy:24*Math.sin(2*Math.PI*t/8),t:l,a:[{fn:function(){return{an:"r",dur:d,v:n("1;2;3;4;5;6;7;8",t),rc:u}},t:1}]}},t:8}]},circles:{c:[{fn:function(t){return{r:5,cx:24*Math.cos(2*Math.PI*t/8),cy:24*Math.sin(2*Math.PI*t/8),t:l,sw:0,a:[{fn:function(){return{an:"fill-opacity",dur:d,v:n(".3;.3;.3;.4;.7;.85;.9;1",t),rc:u}},t:1}]}},t:8}]},crescent:{c:[{sw:4,da:128,os:82,r:26,cx:32,cy:32,f:p,at:[m]}]},dots:{c:[{fn:function(t){return{cx:16+16*t,cy:32,sw:0,a:[{fn:function(){return{an:"fill-opacity",dur:d,v:n(".5;.6;.8;1;.8;.6;.5",t),rc:u}},t:1},{fn:function(){return{an:"r",dur:d,v:n("4;5;6;5;4;3;3",t),rc:u}},t:1}]}},t:3}]},lines:{sw:7,lc:c,line:[{fn:function(t){return{x1:10+14*t,x2:10+14*t,a:[{fn:function(){return{an:"y1",dur:d,v:n("16;18;28;18;16",t),rc:u}},t:1},{fn:function(){return{an:"y2",dur:d,v:n("48;44;36;46;48",t),rc:u}},t:1},{fn:function(){return{an:r,dur:d,v:n("1;.8;.5;.4;1",t),rc:u}},t:1}]}},t:4}]},ripple:{f:p,"fill-rule":"evenodd",sw:3,circle:[{fn:function(t){return{cx:32,cy:32,a:[{fn:function(){return{an:"r",begin:t*-1+"s",dur:"2s",v:"0;24",keyTimes:"0;1",keySplines:"0.1,0.2,0.3,1",calcMode:"spline",rc:u}},t:1},{fn:function(){return{an:r,begin:t*-1+"s",dur:"2s",v:".2;1;.2;0",rc:u}},t:1}]}},t:2}]},spiral:{defs:[{linearGradient:[{id:"sGD",gradientUnits:"userSpaceOnUse",x1:55,y1:46,x2:2,y2:46,stop:[{offset:.1,"class":"stop1"},{offset:1,"class":"stop2"}]}]}],g:[{sw:4,lc:c,f:p,path:[{stroke:"url(#sGD)",d:"M4,32 c0,15,12,28,28,28c8,0,16-4,21-9"},{d:"M60,32 C60,16,47.464,4,32,4S4,16,4,32"}],at:[m]}]}},g={android:function(t){function e(){if(!o.stop){var t=a(Date.now()-i,650),u=1,d=0,p=188-58*t,f=182-182*t;n%2&&(u=-1,d=-64,p=128- -58*t,f=182*t);var m=[0,-101,-90,-11,-180,79,-270,-191][n];s(c,"da",Math.max(Math.min(p,188),128)),s(c,"os",Math.max(Math.min(f,182),0)),s(c,"t","scale("+u+",1) translate("+d+",0) rotate("+m+",32,32)"),l+=4.1,l>359&&(l=0),s(r,"t","rotate("+l+",32,32)"),t>=1&&(n++,n>7&&(n=0),i=Date.now()),requestAnimationFrame(e)}}var o=this;this.stop=!1;var i,n=0,l=0,r=t.querySelector("g"),c=t.querySelector("circle");return function(){return i=Date.now(),e(),o}}}},function(t,e){},function(t,e){t.exports=" <span class=vux-spinner :class=className></span> "},function(t,e,o){var i,s;o(4),i=o(1),s=o(5),t.exports=i||{},t.exports.__esModule&&(t.exports=t.exports["default"]),s&&(("function"==typeof t.exports?t.exports.options||(t.exports.options={}):t.exports).template=s)}])})},19:function(t,e,o){"use strict";function i(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var s=o(15),n=i(s);e["default"]={props:["visible"],components:{Spinner:n["default"]},ready:function(){this.$els.flexContainer.addEventListener("touchstart",function(t){t.preventDefault(),t.stopPropagation()})}}},21:function(t,e,o){e=t.exports=o(5)(),e.push([t.id,".flex-container[_v-2ebc82d8]{background:#fff;position:fixed;left:0;right:0;top:0;bottom:0;z-index:9999}",""])},22:function(t,e,o){var i=o(21);"string"==typeof i&&(i=[[t.id,i,""]]);o(6)(i,{});i.locals&&(t.exports=i.locals)},23:function(t,e){t.exports='<div v-el:flex-container="" :style="{height: winH + \'px\'}" v-show=visible class=flex-container _v-2ebc82d8=""><spinner type=ios _v-2ebc82d8=""></spinner></div>'},24:function(t,e,o){var i,s;o(22),i=o(19),s=o(23),t.exports=i||{},t.exports.__esModule&&(t.exports=t.exports["default"]),s&&(("function"==typeof t.exports?t.exports.options||(t.exports.options={}):t.exports).template=s)},41:function(t,e,o){"use strict";function i(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var s=o(10),n=i(s),a=o(8),l=o(16),r=i(l),c=o(2),u=i(c),d=o(26),p=i(d),f=o(24),m=i(f);e["default"]={components:{KtLoading:m["default"]},methods:{goInstDetail:function(t){var e=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];this.$root.log((0,n["default"])({name:t},e));var o=r["default"].getEnvParams(),i=u["default"].isEmpty(e)?"":"&"+p["default"].url("",e).split("?")[1];window.open(o.hostName+"/pano/institutions/"+t+"?_t="+o.token+i,"_blank")},toggleAttention:function(t,e,o){var i=this,s=this;t.is_followed?this.$root.showConfirm({content:"确定取消关注？",onConfirm:function(){s.$root.log({name:"确定取消关注",institution:t.name}),s.$root.showLoadingStatus(),a.persons["delete"]({content:"relative_institutions"},{institution_id:t.id}).then(function(){s.$root.hideLoadingStatus(),t.is_followed=!1})["catch"](function(t){s.$root.hideLoadingStatus(),s.$root.showToast({text:t.json().error||"抱歉，服务器繁忙！"})})},onConcel:function(){s.$root.log({name:"取消取消关注",institution:t.name})}}):(this.$root.showLoadingStatus(),a.persons.save({content:"relative_institutions"},{institution_id:t.id}).then(function(){return t.is_followed=!0,i.$root.log({name:"关注机构成功",institution:t.name}),u["default"].isNil(e)?void i.hideLoadingStatus():a.persons.get({content:"relative_institutions",need_all:!1,institution_type:e}).then(function(t){i.$root.hideLoadingStatus(),o&&o(t.json(),e)})})["catch"](function(e){i.$root.hideLoadingStatus(),i.$root.showToast({text:e.json().error||"抱歉，服务器繁忙！"}),i.$root.log({name:"关注机构失败",institution:t.name})}))}}}},42:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e["default"]={props:["title","icon","content","class"],methods:{titleClick:function(t){this.$emit("on-title-click",t)},iconClick:function(t){this.$emit("on-icon-click",t)}}}},45:function(t,e,o){e=t.exports=o(5)(),e.push([t.id,".kt-cell{font-size:.322061rem}.kt-cell.sub-cell{margin-top:0}.kt-cell.sub-cell .title{font-size:.322061rem;border-bottom:.032206rem solid #3bc5ba;color:#29b9ae;height:.805153rem;line-height:.805153rem}.kt-cell+.sub-cell:before{border-top:0}.kt-cell .title{font-size:.402576rem;height:1.046699rem;line-height:1.046699rem;margin:0 .402576rem;border-bottom:1px solid #eff2f7;position:relative}.kt-cell .title .icon-pano{font-size:.6em;color:#29b9ae;padding:1em 0 1em 1em;position:absolute;right:0;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%)}.kt-cell .weui_cell{padding:0}.kt-cell .weui_cell .weui_label{text-align:left}.kt-cell .content{text-align:center;padding:.402576rem}.kt-cell .kt-list{border-bottom:1px solid #eff2f7}.kt-cell .kt-list:last-of-type{border-bottom:0}.kt-cell .default-content{display:inline-block;font-size:.322061rem;border-radius:100px;padding:0 .644122rem;height:.885668rem;line-height:.885668rem;text-align:center;border:1px dashed #29b9ae;color:#29b9ae}.kt-cell .default-content .icon-pano{font-size:.5em;margin-right:.5em;vertical-align:.12em}",""])},46:function(t,e,o){var i=o(45);"string"==typeof i&&(i=[[t.id,i,""]]);o(6)(i,{});i.locals&&(t.exports=i.locals)},48:function(t,e){t.exports='<div :class=class class="kt-cell weui_cells"><div @click=titleClick($event) v-if="title || icon" class=title><slot name=title>{{title}}</slot><slot name=icon><i :class=icon @click=iconClick($event) class=icon-pano></i></slot></div><div class=content><slot></slot>{{content}}</div></div>'},49:function(t,e,o){var i,s;o(46),i=o(42),s=o(48),t.exports=i||{},t.exports.__esModule&&(t.exports=t.exports["default"]),s&&(("function"==typeof t.exports?t.exports.options||(t.exports.options={}):t.exports).template=s)},78:function(t,e,o){!function(e,o){t.exports=o()}(this,function(){return function(t){function e(i){if(o[i])return o[i].exports;var s=o[i]={exports:{},id:i,loaded:!1};return t[i].call(s.exports,s,s.exports,e),s.loaded=!0,s.exports}var o={};return e.m=t,e.c=o,e.p="",e(0)}([function(t,e,o){t.exports=o(5)},function(t,e,o){"use strict";function i(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var s=o(2),n=i(s);e["default"]={props:{show:{type:Boolean,twoWay:!0},height:{type:String,"default":"auto"},hideOnBlur:{type:Boolean,"default":!0}},ready:function(){var t=this;this.popup=new n["default"]({container:t.$el,innerHTML:"",hideOnBlur:t.hideOnBlur,onOpen:function(e){t.fixSafariOverflowScrolling("auto"),t.show=!0},onClose:function(e){t.fixSafariOverflowScrolling("touch"),t.show=!1}}),this.$overflowScrollingList=document.querySelectorAll(".vux-fix-safari-overflow-scrolling")},methods:{fixSafariOverflowScrolling:function(t){if(this.$overflowScrollingList.length)for(var e=0;e<this.$overflowScrollingList.length;e++)this.$overflowScrollingList[e].style.webkitOverflowScrolling=t}},data:function(){return{hasFirstShow:!1}},watch:{show:function(t){t?(this.popup.show(),this.$emit("on-show"),this.hasFirstShow||(this.$emit("on-first-show"),this.hasFirstShow=!0)):(this.$emit("on-hide"),this.show=!1,this.popup.hide(!1))}},beforeDestroy:function(){this.popup.destroy()}}},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=function(t){this.uuid=Math.random().toString(36).substring(3,8),this.params={},"[object Object]"===Object.prototype.toString.call(t)&&(this.params={input:t.input||"",container:document.querySelector(t.input)||"",innerHTML:t.innerHTML||"",hideOnBlur:t.hideOnBlur,onOpen:t.onOpen||function(){},onClose:t.onClose||function(){}}),!!document.querySelectorAll(".vux-popup-mask").length<=0&&(this.divMask=document.createElement("a"),this.divMask.className="vux-popup-mask",this.divMask.href="javascript:void(0)",document.body.appendChild(this.divMask));var e=void 0;return e=t.container?t.container:document.createElement("div"),e.className="vux-popup-dialog vux-popup-dialog-"+this.uuid,t.container||document.body.appendChild(e),this.mask=document.querySelector(".vux-popup-mask"),this.container=document.querySelector(".vux-popup-dialog-"+this.uuid),this._bindEvents(),t=null,this};o.prototype.onClickMask=function(){this.hide(!1)},o.prototype._bindEvents=function(){this.params.hideOnBlur&&this.mask.addEventListener("click",this.onClickMask.bind(this),!1)},o.prototype.show=function(){this.mask.classList.add("vux-popup-show"),this.container.classList.add("vux-popup-show"),this.params.onOpen&&this.params.onOpen(this)},o.prototype.hide=function(){var t=arguments.length<=0||void 0===arguments[0]||arguments[0];this.container.classList.remove("vux-popup-show"),document.querySelector(".vux-popup-dialog.vux-popup-show")||this.mask.classList.remove("vux-popup-show"),t===!1&&this.params.onClose&&this.params.onClose(this)},o.prototype.html=function(t){this.container.innerHTML=t},o.prototype.destroy=function(){this.mask.removeEventListener("click",this.onClickMask.bind(this),!1),this.mask&&this.mask.parentNode&&this.mask.parentNode.removeChild(this.mask)},e["default"]=o},function(t,e){},function(t,e){t.exports=" <div v-show=show transition=vux-popup :style={height:height} class=vux-popup> <slot></slot> </div> "},function(t,e,o){var i,s;o(3),i=o(1),s=o(4),t.exports=i||{},t.exports.__esModule&&(t.exports=t.exports["default"]),s&&(("function"==typeof t.exports?t.exports.options||(t.exports.options={}):t.exports).template=s)}])})},235:function(t,e,o){"use strict";function i(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var s=o(79),n=i(s),a=o(78),l=i(a),r=o(49),c=i(r),u=o(41),d=i(u),p=o(8),f=o(28),m=o(2),h=i(m),v=o(16),g=i(v);e["default"]={mixins:[d["default"]],components:{Popup:l["default"],KtCell:c["default"]},vuex:{getters:{user:f.user}},route:{data:function(){return p.persons.get({content:"info"}).then(function(t){var e=t.json();return e.business_types.selected=e.business_types.selected.map(function(t){return h["default"].find(e.business_types.all,function(e){return t.id===e.id})}),e.asset_types.selected=e.asset_types.selected.map(function(t){return h["default"].find(e.asset_types.all,function(e){return t.id===e.id})}),h["default"].each(e.platforms.institutions,function(t){t.is_followed=!0}),h["default"].each(e.platforms.recommended,function(t){t.is_followed=!1}),h["default"].each(e.institutions.institutions,function(t){t.is_followed=!0}),h["default"].each(e.institutions.recommended,function(t){t.is_followed=!1}),{info:e}})}},watch:{"user.avatar_url":{handler:function(t){var e=this;g["default"].getImageInfo(t).then(function(t){e.model.avatarDirection=t.direction,e.model.avatarStyles={transform:" "+("portrait"===t.direction?"translateY(-":"translateX(-")+100*t.widthHeightDiffPercent/2+"%)"}})["catch"](function(t){console.warn(t)})},immediate:!0},"model.businessTypes":function(t){console.log(t),t.length>2&&this.$root.showToast({text:"不能大于2个"})},"model.assetTypes":function(t){t.length>3&&this.$root.showToast({text:"不能大于3个"})}},methods:{initBAData:function(){var t=this.info;this.model.businessTypes=t.business_types.selected,this.model.assetTypes=t.asset_types.selected},initProductData:function(){this.model.relativeProducts=h["default"].map(this.info.products.selected,"id")},onSubmitIntro:function(){var t=this,e=this.$els.introTextarea.value.length;if(e>40){var o=e-40;this.$root.showToast({text:"不能大于40个字符，您已超出"+o+"个字符"})}else this.$root.showLoadingStatus(),p.accounts.update({content:"intro"},{intro:this.user.intro}).then(function(){t.$root.hideLoadingStatus(),t.editingIntro=!1})["catch"](function(e){t.$root.hideLoadingStatus(),t.$root.showToast({text:e.json().error||"抱歉，服务器繁忙！"})})},editIntro:function(){var t=this;this.$els.iconIntro.classList.contains("icon-ok2")?(this.$root.log({name:"保存个人业务"}),this.onSubmitIntro()):(this.$root.log({name:"编辑个人业务"}),setTimeout(function(){t.$els.introTextarea.focus()},10),this.editingIntro=!0)},openCustomTag:function(t){this.$root.log({name:"新建自定义标签",type:t}),this.popups.customTag.type=t,this.popups.customTag.show=!0},closeCustomTag:function(t){var e=this;if(t)return this.$root.log({name:"取消编辑参与发行的产品"}),void(this.popups.customTag.show=!1);if(!this.model.customTag.length||this.model.customTag.length>10)return void this.$root.showToast({text:"您正确填写标签名称, 不能大于10个字符"});this.$root.log({name:"保存参与发行的产品"}),this.$root.showLoadingStatus();var o=void 0;o="偏好资产"===this.popups.customTag.type?p.assetTypes.save({name:this.model.customTag}).then(function(t){e.$root.hideLoadingStatus(),e.model.customTag="";var o=t.json().asset_type;o.customized=!0,e.info.asset_types.all.push(o),e.popups.customTag.show=!1}):p.businessTypes.save({name:this.model.customTag}).then(function(t){e.$root.hideLoadingStatus(),e.model.customTag="";var o=t.json().business_type;o.customized=!0,e.info.business_types.all.push(o),e.popups.customTag.show=!1}),o["catch"](function(t){e.$root.hideLoadingStatus(),e.$root.showToast({text:t.json().error||"抱歉，服务器繁忙！"})})},deleteTag:function(t){var e=arguments.length<=1||void 0===arguments[1]?"偏好资产":arguments[1],o=this;this.$root.showConfirm({content:"确定删除吗？",onConfirm:function(){o.$root.log({name:"确定删除自定义标签："+t.name}),o.$root.showLoadingStatus();var i=void 0;i="偏好资产"!==e?p.businessTypes["delete"]({id:t.id}).then(function(){o.$root.hideLoadingStatus(),o.info.business_types.all.$remove(t),o.model.businessTypes.$remove(t)}):p.assetTypes["delete"]({id:t.id}).then(function(){o.$root.hideLoadingStatus(),o.info.asset_types.all.$remove(t),o.model.assetTypes.$remove(t)}),i["catch"](function(t){o.$root.hideLoadingStatus(),o.$root.showToast({text:t.json().error||"抱歉，服务器繁忙！"})})},onCancel:function(){o.$root.log({name:"确定取消删除自定义标签："+t.name})}})},openBATypes:function(){this.$root.log({name:"编辑业务偏好和资产类型"}),this.popups.baTypes.show=!0},closeBATypes:function(t){var e=this;if(t)return this.$root.log({name:"取消编辑业务偏好和资产类型"}),void(this.popups.baTypes.show=!1);if(this.model.businessTypes.length>2)return void this.$root.showToast({text:"业务角色不能超过2个"});if(this.model.assetTypes.length>3)return void this.$root.showToast({text:"资产类型不能超过3个"});this.$root.log({name:"保存业务偏好和资产类型"}),this.$root.showLoadingStatus();var o=p.assetTypes.update({},{ids:h["default"].map(this.model.assetTypes,"id")}),i=p.businessTypes.update({},{ids:h["default"].map(this.model.businessTypes,"id")});n["default"].all([o,i]).then(function(){e.$root.hideLoadingStatus(),e.popups.baTypes.show=!1})["catch"](function(t){e.$root.hideLoadingStatus(),e.$root.showToast({text:t.json().error||"抱歉，服务器繁忙！"})})},openRelativeProducts:function(){this.$root.log({name:"编辑参与发行的产品"}),this.popups.relativeProducts.show=!0},closeProducts:function(t){var e=this;return t?(this.$root.log({name:"取消编辑参与发行的产品"}),void(this.popups.relativeProducts.show=!1)):(this.$root.log({name:"保存参与发行的产品"}),this.$root.showLoadingStatus(),void p.persons.save({content:"relative_products"},{ids:this.model.relativeProducts}).then(function(){e.$root.hideLoadingStatus(),e.info.products.selected=e.info.products.all.filter(function(t){return h["default"].includes(e.model.relativeProducts,t.id)}),e.popups.relativeProducts.show=!1})["catch"](function(t){e.$root.showToast({text:t.json().error||"抱歉，服务器繁忙！"})}))},dataAdaptor:function(t){h["default"].each(t.institutions,function(t){t.is_followed=!0}),h["default"].each(t.recommended,function(t){t.is_followed=!1})},update:function(t,e){this.dataAdaptor(t),this.info[e?"institutions":"platforms"].institutions=t.institutions,this.info[e?"institutions":"platforms"].recommended=t.recommended}},computed:{selectedBt:function(){return h["default"].map(this.info.business_types.selected,"name").join("、")},selectedAt:function(){return h["default"].map(this.info.asset_types.selected,"name").join("、")},assetTypesHasCustomTag:function(){return h["default"].some(this.info.asset_types.all,{customized:!0})},businessTypesHasCustomTag:function(){return h["default"].some(this.info.business_types.all,{customized:!0})}},data:function(){return{editingIntro:!1,model:{avatarDirection:"portrait",avatarStyles:{},customTag:"",businessTypes:[],assetTypes:[],relativeProducts:[]},popups:{customTag:{show:!1,height:"100%"},baTypes:{show:!1,height:"100%"},relativeProducts:{show:!1,height:"100%"}},info:{business_types:{all:[],selected:[]},asset_types:{all:[],selected:[]},products:{all:[],selected:[]},platforms:{institutions:[],recommended:[]},institutions:{institutions:[],recommended:[]}}}}}},279:function(t,e,o){e=t.exports=o(5)(),e.push([t.id,".profile{font-size:.322061rem}.profile h2{font-size:.402576rem}.profile .head{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;height:6.441224rem;background:-webkit-linear-gradient(top,#304366,#27719d);background:linear-gradient(180deg,#304366,#27719d)}.profile .head .item{margin-bottom:.161031rem}.profile .head .avatar-container{position:relative}.profile .head .avatar-container .icon-arrow-right{font-size:.402576rem;position:absolute;right:-.805153rem;top:.999184rem;color:#29b9ae}.profile .head .avatar{position:relative;z-index:9;box-sizing:border-box;border:.16103rem solid rgba(52,146,211,.15);overflow:hidden;border-radius:50%;width:2.616747rem;height:2.616747rem}.profile .head .avatar.no-avatar{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:end;-ms-flex-align:end;align-items:flex-end;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}.profile .head .avatar .icon-pano{color:rgba(52,146,211,.15);font-size:1.610306rem}.profile .head .avatar img{position:absolute}.profile .head .avatar.portrait img{width:100%;-webkit-transform:translateY(-20%);transform:translateY(-20%)}.profile .head .avatar.landscape img{-webkit-transform:translateX(-20%);transform:translateX(-20%);height:100%}.profile .head .name{color:#fff}.profile .head .company{color:#29b9ae}.profile .head .dj{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;color:#adc1d2;font-size:.289855rem;padding-top:.161031rem;border-top:1px solid #3378a7}.profile .head .intro-con{width:100%}.profile .head .intro-con form{background:none}.profile .head .intro{position:relative;display:block;margin:0 .805153rem;padding:.080515rem .563607rem;text-align:center;border-radius:.241546rem;background:#2b5b83;color:#e1e6ec;line-height:1.5}.profile .head .intro p{padding-right:.5em}.profile .head .intro.edit{box-shadow:2px 2px 3px #3378a7,-2px -2px 3px #3378a7}.profile .head .intro textarea{width:100%;height:100%;resize:none;vertical-align:top;border:0;background:none;color:#fff;line-height:1;border-radius:0;box-shadow:none;-webkit-appearance:none}.profile .head .intro .icon-pano{padding:1em;position:absolute;right:-.5em;top:1.25em;-webkit-transform:translateY(-50%);transform:translateY(-50%);color:#29b9ae}.profile .head .intro .icon-pano.icon-edit{right:-.5em;top:.95em}",""])},295:function(t,e,o){var i=o(279);"string"==typeof i&&(i=[[t.id,i,""]]);o(6)(i,{});i.locals&&(t.exports=i.locals)},318:function(t,e){t.exports='<div><kt-loading :visible=$loadingRouteData></kt-loading><div class=profile><div class=head><div v-link="{name: &quot;settings&quot;}" class="avatar-container item"><i class="icon-pano icon-arrow-right"></i><div :class="[{&quot;no-avatar&quot;: !user.avatar_url}, model.avatarDirection]" class=avatar><img v-show=user.avatar_url :src=user.avatar_url :style=model.avatarStyles /><i v-else=v-else class="icon-pano icon-man-simple"></i></div></div><div class="name item">{{user.name}}</div><div class="company item">{{user.company}}</div><div v-if="user.department || user.job" class="dj item"><span v-if=user.department :style="{&quot;margin-right&quot;: user.job ? &quot;0.483092rem&quot; : 0}" class=department>{{user.department}}</span><span v-if=user.job class=job>{{user.job}}</span></div><div @click.prevent="" class=intro-con><div :class="{\'edit\': editingIntro}" class=intro><i @click.prevent=editIntro() v-el:icon-intro=v-el:icon-intro :class="{\'icon-edit\': !editingIntro, \'icon-ok2\': editingIntro}" class=icon-pano></i><p v-show=!editingIntro @click.prevent=editIntro()>{{user.intro.trim() || \'介绍我的业务\'}}</p><textarea v-show=editingIntro v-el:intro-textarea=v-el:intro-textarea cols=2 rows=2 v-model=user.intro></textarea></div></div></div><div class=group><kt-cell title=业务偏好 icon=icon-plus @on-icon-click=openBATypes()><div v-if="info.business_types.selected.length || info.asset_types.selected.length" class=kt-list-normal><ul><li v-if=info.business_types.selected.length><h3>业务角色</h3><p>{{selectedBt}}</p></li><li v-if=info.asset_types.selected.length><h3>偏好资产</h3><p>{{selectedAt}}</p></li></ul></div><div @click=openBATypes() v-if="!info.business_types.selected.length &amp;&amp; !info.asset_types.selected.length" class=default-content><i class="icon-pano icon-plus"></i>选择关注的业务范围</div></kt-cell></div><div v-if="user.institution &amp;&amp; info.products.all.length" class=group><kt-cell title=参与发行的产品 icon=icon-plus @on-icon-click=openRelativeProducts()><div v-if=info.products.selected.length class=kt-list-normal><ul><li v-for="item in info.products.selected"><h3>{{item.name}}</h3><p>{{item.desc}}</p></li></ul></div><div @click=openRelativeProducts() v-if=!info.products.selected.length class=default-content><i class="icon-pano icon-plus"></i>参与发行的产品</div></kt-cell></div><div class=group><kt-cell title=关注的互联网金融平台 icon=icon-arrow-right @on-title-click="$router.go({name: &quot;moreInstitutions&quot;})"><div slot=title>关注的互联网金融平台</div><div v-for="item in info.platforms.institutions | limitBy 3" v-if=info.platforms.institutions.length :title=item.name @click=goInstDetail(item.name) class="kt-list one-line-content"><div class=icon><img :src=item.logo :alt=item.name /></div><div class=main><h3>{{item.name}}</h3><p v-if=item.asset_types>已发行资产类型：<br/><span class=gray>{{item.asset_types.join(\' \')}}</span></p></div><div class=right><a @click.stop="toggleAttention(item, 0, update)"><i :class="{&quot;icon-ok2&quot;: item.is_followed, &quot;icon-plus&quot;: !item.is_followed}" class=icon-pano></i>{{item.is_followed ? \'已关注\' : \'关注\'}}</a></div></div><div v-if=!info.platforms.institutions.length v-link="{name: &quot;moreInstitutions&quot;}" class=default-content><i class="icon-pano icon-plus"></i>选择要关注的互联网金融平台</div></kt-cell><kt-cell title=为您推荐 v-if=info.platforms.recommended.length class=sub-cell><div class=kt-list-column><div v-for="item in info.platforms.recommended | limitBy 3" :title=item.name @click=goInstDetail(item.name) class=kt-list-short><div class=icon><img :src=item.logo :alt=item.name /></div><div class=main><h3><div class=ellipsis>{{item.name}}</div></h3><a @click.stop="toggleAttention(item, 0, update)"><i :class="{&quot;icon-ok2&quot;: item.is_followed, &quot;icon-plus&quot;: !item.is_followed}" class=icon-pano></i>{{item.is_followed ? \'已关注\' : \'关注\'}}</a></div></div></div></kt-cell><kt-cell title=关注的挂牌场所 icon=icon-arrow-right @on-title-click="$router.go({name: &quot;moreInstitutions&quot;, query:{dimension: &quot;mapped_exchange&quot;}})"><div slot=title>关注的挂牌场所</div><div v-for="item in info.institutions.institutions | limitBy 3" v-if=info.institutions.institutions.length :title=item.name @click="goInstDetail(item.name, {dimension: &quot;mapped_exchange&quot;})" class="kt-list one-line-content"><div class=icon><img :src=item.logo :alt=item.name /></div><div class=main><h3>{{item.name}}</h3><p v-if=item.partners>主要合作机构：<br/><span class=gray>{{item.partners.join(\' \')}}</span></p></div><div class=right><a @click.stop="toggleAttention(item, 1, update)"><i :class="{&quot;icon-ok2&quot;: item.is_followed, &quot;icon-plus&quot;: !item.is_followed}" class=icon-pano></i>{{item.is_followed ? \'已关注\' : \'关注\'}}</a></div></div><div v-if=!info.institutions.institutions.length v-link="{name: &quot;moreInstitutions&quot;, query:{dimension: &quot;mapped_exchange&quot;}}" class=default-content><i class="icon-pano icon-plus"></i>选择要关注的挂牌场所</div></kt-cell><kt-cell title=为您推荐 v-if=info.institutions.recommended.length class=sub-cell><div class=kt-list-column><div v-for="item in info.institutions.recommended | limitBy 3" :title=item.name @click="goInstDetail(item.name, {dimension: &quot;mapped_exchange&quot;})" class=kt-list-short><div class=icon><img :src=item.logo :alt=item.name /></div><div class=main><h3><div class=ellipsis>{{item.name}}</div></h3><a @click.stop="toggleAttention(item, 1, update)"><i :class="{&quot;icon-ok2&quot;: item.is_followed, &quot;icon-plus&quot;: !item.is_followed}" class=icon-pano></i>{{item.is_followed ? \'已关注\' : \'关注\'}}</a></div></div></div></kt-cell></div></div><a href=javascript:void(0) class=vux-popup-mask></a><popup :show.sync=popups.baTypes.show :height=popups.baTypes.height @on-show=initBAData()><div class=header><a @click=closeBATypes(true) class=cancel>取消</a><a @click=closeBATypes() class=ok>确定</a></div><div class=popup-body><div class=group><kt-cell title=业务角色><div><div class=clfix><div v-for="item in info.business_types.all" class=checkbox-label><input autocomplete=off v-model=model.businessTypes :id="\'bt_\' + item.id" :value=item type=checkbox /><label :for="\'bt_\' + item.id" v-cloak="" :class="{&quot;has-icon-close&quot;: item.customized}">{{item.name}}<i v-if=item.customized @click.stop.prevent="deleteTag(item, &quot;业务角色&quot;)" class="icon-pano icon-plus icon-for-close"></i></label></div><div @click=openCustomTag() v-if=!businessTypesHasCustomTag class=add-button><i class="icon-pano icon-plus"></i>标签</div></div></div></kt-cell></div><div class=group><kt-cell title=偏好资产><div><div class=clfix><div v-for="item in info.asset_types.all" class=checkbox-label><input autocomplete=off v-model=model.assetTypes :id="\'at_\' + item.id" :value=item type=checkbox /><label :for="\'at_\' + item.id" v-cloak="" :class="{&quot;has-icon-close&quot;: item.customized}">{{item.name}}<i v-if=item.customized @click.stop.prevent=deleteTag(item) class="icon-pano icon-plus icon-for-close"></i></label></div><div @click=openCustomTag(&quot;偏好资产&quot;) v-if=!assetTypesHasCustomTag class=add-button><i class="icon-pano icon-plus"></i>标签</div></div></div></kt-cell></div></div></popup><a href=javascript:void(0) class=vux-popup-mask></a><popup :show.sync=popups.relativeProducts.show :height=popups.relativeProducts.height @on-show=initProductData()><div class=header><a @click=closeProducts(true) class=cancel>取消</a><a @click=closeProducts() class=ok>确定</a></div><div class=popup-body><div class=group><kt-cell title=参与发行的产品><div><div class=clfix><div v-for="item in info.products.all" class=checkbox-label><input autocomplete=off v-model=model.relativeProducts :id="\'rp_\' + item.id" :value=item.id type=checkbox /><label :for="\'rp_\' + item.id" v-cloak="">{{item.name}}</label></div></div></div></kt-cell></div></div></popup><a href=javascript:void(0) class=vux-popup-mask></a><popup :show.sync=popups.customTag.show :height=popups.customTag.height><div class=header><a @click=closeCustomTag(true) class=cancel>取消</a><a @click=closeCustomTag() class=ok>确定</a></div><div class=popup-body><div class=group><kt-cell><div class="weui_cell weui_select_after"><div class=wrapper><div class=weui_cell_hd><label class=weui_label>标签名称</label></div><div><input placeholder=自定义标签名称 v-model=model.customTag class=weui_input /></div></div></div></kt-cell></div></div></popup></div>'},352:function(t,e,o){var i,s;o(295),i=o(235),s=o(318),t.exports=i||{},t.exports.__esModule&&(t.exports=t.exports["default"]),s&&(("function"==typeof t.exports?t.exports.options||(t.exports.options={}):t.exports).template=s)}});