webpackJsonp([14,25],{6:function(t,e,o){/*!
	 * Vux v0.1.3 (https://vux.li)
	 * Licensed under the MIT license
	 */
!function(e,o){t.exports=o()}(this,function(){return function(t){function e(n){if(o[n])return o[n].exports;var i=o[n]={exports:{},id:n,loaded:!1};return t[n].call(i.exports,i,i.exports,e),i.loaded=!0,i.exports}var o={};return e.m=t,e.c=o,e.p="",e(0)}([function(t,e,o){t.exports=o(6)},function(t,e,o){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var i=o(3),r=n(i),s=["android","ios","ios-small","bubbles","circles","crescent","dots","lines","ripple","spiral"];e.default={ready:function(){(0,r.default)(this.$el,this.type)},props:{type:{type:String,default:"ios"}},computed:{className:function(){for(var t={},e=0;e<s.length;e++)t["vux-spinner-"+s[e]]=this.type===s[e];return t}}}},function(t,e){"use strict";for(var o=0,n=["webkit","moz"],i=0;i<n.length&&!window.requestAnimationFrame;++i)window.requestAnimationFrame=window[n[i]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[n[i]+"CancelAnimationFrame"]||window[n[i]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(t,e){var n=(new Date).getTime(),i=Math.max(0,16-(n-o)),r=window.setTimeout(function(){t(n+i)},i);return o=n+i,r}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(t){clearTimeout(t)})},function(t,e,o){"use strict";function n(t,e,o,r){var s,c,a,l=document.createElement(p[t]||t);for(s in e)if("[object Array]"===Object.prototype.toString.call(e[s]))for(c=0;c<e[s].length;c++)if(e[s][c].fn)for(a=0;a<e[s][c].t;a++)n(s,e[s][c].fn(a,r),l,r);else n(s,e[s][c],l,r);else i(l,s,e[s]);o.appendChild(l)}function i(t,e,o){t.setAttribute(p[e]||e,o)}function r(t,e){var o=t.split(";"),n=o.slice(e),i=o.slice(0,o.length-n.length);return o=n.concat(i).reverse(),o.join(";")+";"+o[0]}function s(t,e){return t/=e/2,1>t?.5*t*t*t:(t-=2,.5*(t*t*t+2))}Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(t,e){function o(){x[i]&&(r=x[i](t)())}var i,r;i=e;var s=document.createElement("div");return n("svg",{viewBox:"0 0 64 64",g:[h[i]]},s,i),t.innerHTML=s.innerHTML,o(),t},o(2);var c="translate(32,32)",a="stroke-opacity",l="round",f="indefinite",u="750ms",d="none",p={a:"animate",an:"attributeName",at:"animateTransform",c:"circle",da:"stroke-dasharray",os:"stroke-dashoffset",f:"fill",lc:"stroke-linecap",rc:"repeatCount",sw:"stroke-width",t:"transform",v:"values"},v={v:"0,32,32;360,32,32",an:"transform",type:"rotate",rc:f,dur:u},m={sw:4,lc:l,line:[{fn:function(t,e){return{y1:"ios"===e?17:12,y2:"ios"===e?29:20,t:c+" rotate("+(30*t+(6>t?180:-180))+")",a:[{fn:function(){return{an:a,dur:u,v:r("0;.1;.15;.25;.35;.45;.55;.65;.7;.85;1",t),rc:f}},t:1}]}},t:12}]},h={android:{c:[{sw:6,da:128,os:82,r:26,cx:32,cy:32,f:d}]},ios:m,"ios-small":m,bubbles:{sw:0,c:[{fn:function(t){return{cx:24*Math.cos(2*Math.PI*t/8),cy:24*Math.sin(2*Math.PI*t/8),t:c,a:[{fn:function(){return{an:"r",dur:u,v:r("1;2;3;4;5;6;7;8",t),rc:f}},t:1}]}},t:8}]},circles:{c:[{fn:function(t){return{r:5,cx:24*Math.cos(2*Math.PI*t/8),cy:24*Math.sin(2*Math.PI*t/8),t:c,sw:0,a:[{fn:function(){return{an:"fill-opacity",dur:u,v:r(".3;.3;.3;.4;.7;.85;.9;1",t),rc:f}},t:1}]}},t:8}]},crescent:{c:[{sw:4,da:128,os:82,r:26,cx:32,cy:32,f:d,at:[v]}]},dots:{c:[{fn:function(t){return{cx:16+16*t,cy:32,sw:0,a:[{fn:function(){return{an:"fill-opacity",dur:u,v:r(".5;.6;.8;1;.8;.6;.5",t),rc:f}},t:1},{fn:function(){return{an:"r",dur:u,v:r("4;5;6;5;4;3;3",t),rc:f}},t:1}]}},t:3}]},lines:{sw:7,lc:l,line:[{fn:function(t){return{x1:10+14*t,x2:10+14*t,a:[{fn:function(){return{an:"y1",dur:u,v:r("16;18;28;18;16",t),rc:f}},t:1},{fn:function(){return{an:"y2",dur:u,v:r("48;44;36;46;48",t),rc:f}},t:1},{fn:function(){return{an:a,dur:u,v:r("1;.8;.5;.4;1",t),rc:f}},t:1}]}},t:4}]},ripple:{f:d,"fill-rule":"evenodd",sw:3,circle:[{fn:function(t){return{cx:32,cy:32,a:[{fn:function(){return{an:"r",begin:-1*t+"s",dur:"2s",v:"0;24",keyTimes:"0;1",keySplines:"0.1,0.2,0.3,1",calcMode:"spline",rc:f}},t:1},{fn:function(){return{an:a,begin:-1*t+"s",dur:"2s",v:".2;1;.2;0",rc:f}},t:1}]}},t:2}]},spiral:{defs:[{linearGradient:[{id:"sGD",gradientUnits:"userSpaceOnUse",x1:55,y1:46,x2:2,y2:46,stop:[{offset:.1,class:"stop1"},{offset:1,class:"stop2"}]}]}],g:[{sw:4,lc:l,f:d,path:[{stroke:"url(#sGD)",d:"M4,32 c0,15,12,28,28,28c8,0,16-4,21-9"},{d:"M60,32 C60,16,47.464,4,32,4S4,16,4,32"}],at:[v]}]}},x={android:function(t){function e(){if(!o.stop){var t=s(Date.now()-n,650),f=1,u=0,d=188-58*t,p=182-182*t;r%2&&(f=-1,u=-64,d=128- -58*t,p=182*t);var v=[0,-101,-90,-11,-180,79,-270,-191][r];i(l,"da",Math.max(Math.min(d,188),128)),i(l,"os",Math.max(Math.min(p,182),0)),i(l,"t","scale("+f+",1) translate("+u+",0) rotate("+v+",32,32)"),c+=4.1,c>359&&(c=0),i(a,"t","rotate("+c+",32,32)"),t>=1&&(r++,r>7&&(r=0),n=Date.now()),requestAnimationFrame(e)}}var o=this;this.stop=!1;var n,r=0,c=0,a=t.querySelector("g"),l=t.querySelector("circle");return function(){return n=Date.now(),e(),o}}}},function(t,e){},function(t,e){t.exports="<span class=vux-spinner :class=className></span>"},function(t,e,o){var n,i;o(4),n=o(1),i=o(5),t.exports=n||{},t.exports.__esModule&&(t.exports=t.exports.default),i&&(("function"==typeof t.exports?t.exports.options||(t.exports.options={}):t.exports).template=i)}])})},7:function(t,e,o){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var i=o(6),r=n(i);e.default={props:["visible"],components:{Spinner:r.default},ready:function(){this.$els.flexContainer.addEventListener("touchstart",function(t){t.preventDefault(),t.stopPropagation()})}}},8:function(t,e,o){e=t.exports=o(2)(),e.push([t.id,".flex-container[_v-2ebc82d8]{background:#fff;position:fixed;left:0;right:0;top:0;bottom:0;z-index:9999}",""])},9:function(t,e,o){var n=o(8);"string"==typeof n&&(n=[[t.id,n,""]]);o(3)(n,{});n.locals&&(t.exports=n.locals)},10:function(t,e){t.exports='<div v-el:flex-container="" :style="{height: winH + \'px\'}" v-show=visible class="flex-container kt-loading" _v-2ebc82d8=""><spinner type=ios _v-2ebc82d8=""></spinner></div>'},11:function(t,e,o){var n,i,r={};o(9),n=o(7),i=o(10),t.exports=n||{},t.exports.__esModule&&(t.exports=t.exports.default);var s="function"==typeof t.exports?t.exports.options||(t.exports.options={}):t.exports;i&&(s.template=i),s.computed||(s.computed={}),Object.keys(r).forEach(function(t){var e=r[t];s.computed[t]=function(){return e}})},12:function(t,e,o){/*!
	 * Vux v0.1.3 (https://vux.li)
	 * Licensed under the MIT license
	 */
!function(e,o){t.exports=o()}(this,function(){return function(t){function e(n){if(o[n])return o[n].exports;var i=o[n]={exports:{},id:n,loaded:!1};return t[n].call(i.exports,i,i.exports,e),i.loaded=!0,i.exports}var o={};return e.m=t,e.c=o,e.p="",e(0)}([function(t,e,o){t.exports=o(4)},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{title:String,titleColor:String,labelWidth:String,labelAlign:String,labelMarginRight:String,gutter:String}}},function(t,e){},function(t,e){t.exports='<div> <div class=weui_cells_title v-if=title :style={color:titleColor} v-html=title></div> <div class=weui_cells :class="{\'vux-no-group-title\':!title}" :style="{marginTop: gutter}"> <slot></slot> </div> </div>'},function(t,e,o){var n,i;o(2),n=o(1),i=o(3),t.exports=n||{},t.exports.__esModule&&(t.exports=t.exports.default),i&&(("function"==typeof t.exports?t.exports.options||(t.exports.options={}):t.exports).template=i)}])})},253:function(t,e,o){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var i=o(46),r=n(i),s=o(14),c=n(s),a=o(12),l=n(a),f=o(11),u=n(f),d=o(4);e.default={components:{Group:l.default,KtLoading:u.default},route:{data:function(){var t=this;return d.projects.get({content:"platform_list"}).then(function(t){return{insts:t.json().res}}).catch(function(e){t.$root.showToast({text:e.json().error||"抱歉，服务器繁忙!"})})},activate:function(t){var e=t.to,o=t.from,n=t.next;this.submitRedirect=e.query.redirect_to?decodeURIComponent(e.query.redirect_to):o.path,n()}},methods:{goInstDetail:function(t){this.cacheModel(),this.$root.goInstDetail(t)},next:function(){return this.$root.bdTrack(["对接项目页","点击","下一步","新建"]),this.model.platform_id.length?(this.cacheModel(),void this.$router.go({name:"projectInfo",query:(0,c.default)({},this.model,{asset_type:this.$route.query.asset_type||"",redirect_to:this.submitRedirect||""})})):(this.$root.showToast("请选择一个您想对接的机构！"),!1)},submit:function(){var t=this;return this.$root.bdTrack(["对接项目页","点击","下一步","编辑"]),this.model.platform_id.length?!this.model.platform_id.length>1?(this.$root.showToast("每天最多只能选择一个机构哦！"),!1):(this.$root.showLoadingStatus(),void d.projects.update({},{project_id:this.$route.params.type,platform_id:this.model.platform_id,kaitong_refer:this.model.kaitong_refer}).then(function(e){t.$root.hideLoadingStatus();var n=o(65),i='<div class="text-center">提交成功！如您选择的意向机构对该项目感兴趣，我们会尽快与您沟通。您可联系PANO微信小秘书，随时了解进度情况：<br><img src="'+n+'" width="40%"/></div>';t.$root.showAlert({content:i,onHide:function(){this.$router.go({path:this.submitRedirect||"/quotation/ob"})}.bind(t)})}).catch(function(e){t.$root.hideLoadingStatus(),t.$root.showToast(e.json().error||"抱歉，服务器繁忙！")})):(this.$root.showToast("请选择一个您想对接的机构！"),!1)},moreInst:function(){this.$root.bdTrack(["对接项目页","点击","更多"]),this.model.instShowAll=!this.model.instShowAll},cacheModel:function(){window.sessionStorage[this.$route.path]=(0,r.default)(this.model)}},computed:{instList:function(){return this.insts.slice(0,this.model.instShowAll?void 0:9)}},watch:{"model.kaitong_refer":function(t){this.$root.bdTrack(["对接项目页",t?"使用":"取消","开通资产推介服务"])}},data:function(){var t=JSON.parse(window.sessionStorage[this.$route.path]||'{"instShowAll": false}');return{model:(0,c.default)({instShowAll:!1,kaitong_refer:!0,platform_id:""},t),submitRedirect:"",insts:[]}}}},340:function(t,e,o){e=t.exports=o(2)(),e.push([t.id,'.head[_v-e56fc584]{line-height:1.5em;font-size:.289855rem;color:#adb1bc;padding:.241546rem .402576rem}.load-more[_v-e56fc584]{height:1.046699rem;line-height:1.046699rem;font-size:.354267rem;text-align:center;color:#3bc5ba;display:block}.load-more[_v-e56fc584]:active{background:#f1f6fb}.icon-checkbox[_v-e56fc584]{color:#dde1f0}input[type=checkbox][_v-e56fc584],input[type=radio][_v-e56fc584]{display:none}input[type=checkbox]:checked+label .icon-checkbox[_v-e56fc584],input[type=radio]:checked+label .icon-checkbox[_v-e56fc584]{color:#3bc5ba}.insts[_v-e56fc584]{background:#fff;border-bottom:1px solid #e9ecf1;border-top:1px solid #e9ecf1}.insts ul[_v-e56fc584]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap;position:relative}.insts ul[_v-e56fc584]:after{content:"";position:absolute;width:100%;bottom:0;height:0;border-bottom:1px solid #e9ecf1}.insts li[_v-e56fc584]{width:33.33%;border:1px solid #eff2f7;border-width:0 1px 1px 0;box-sizing:border-box}.insts li.row-last[_v-e56fc584]{border-right:0}.insts li .in[_v-e56fc584]{padding:0 0 .322061rem 1.207729rem;position:relative}.insts li label[_v-e56fc584]{height:100%;width:1.207729rem;left:0;position:absolute}.insts li label .icon-checkbox[_v-e56fc584]{left:.402576rem;top:50%;-webkit-transform:translateY(-50%);-ms-transform:translateY(-50%);transform:translateY(-50%);font-size:.483092rem;position:absolute}.insts li input[type=radio]:checked~.inst p[_v-e56fc584]{color:#474650}.insts li .inst[_v-e56fc584]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;font-size:.322061rem}.insts li .inst p[_v-e56fc584]{color:#737e9c;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;width:100%;text-align:center}.insts li .img-box[_v-e56fc584]{height:1.449275rem;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;overflow:hidden}.insts li img[_v-e56fc584]{max-width:80%;max-height:80%}.kaitong-refer .cell[_v-e56fc584]{color:#adb1bc;font-size:.273752rem;padding:.322061rem .402576rem}.kaitong-refer .checkbox[_v-e56fc584]{margin:1em 0 .5em}.kaitong-refer .checkbox p[_v-e56fc584]{margin-top:.5em;font-size:.289855rem;color:#737e9c}.kaitong-refer .checkbox label[_v-e56fc584]{font-size:.322061rem;color:#737e9c}.kaitong-refer .checkbox .icon-checkbox[_v-e56fc584]{margin-right:.3em}.buttons-footer[_v-e56fc584]{background:none}',""])},367:function(t,e,o){var n=o(340);"string"==typeof n&&(n=[[t.id,n,""]]);o(3)(n,{});n.locals&&(t.exports=n.locals)},403:function(t,e){t.exports='<div class=select-join-inst _v-e56fc584=""><kt-loading :visible=$loadingRouteData _v-e56fc584=""></kt-loading><div class=head _v-e56fc584="">每天可选择一个互金平台，向他们推送您的项目：<br _v-e56fc584="">( 平台以首字母音序排列 )</div><div class=insts _v-e56fc584=""><ul _v-e56fc584=""><li v-for="inst in instList" :class="{&quot;row-last&quot;: $index % 3 === 2}" _v-e56fc584=""><div class=in _v-e56fc584=""><input id=inst{{$index}} name=inst :value=inst.id type=radio v-model=model.platform_id _v-e56fc584=""><label for=inst{{$index}} _v-e56fc584=""><i class="icon-pano icon-checkbox" _v-e56fc584=""></i></label><div class=inst _v-e56fc584=""><div class=img-box _v-e56fc584=""><img :src=inst.logo @click=goInstDetail(inst) _v-e56fc584=""></div><p _v-e56fc584="">{{inst.name}}</p></div></div></li></ul><a @click=moreInst() v-if="insts.length > 9" class=load-more _v-e56fc584="">{{model.instShowAll ? \'收起\' : \'更多\'}}</a></div><group class=kaitong-refer _v-e56fc584=""><div class=cell _v-e56fc584=""><p _v-e56fc584="">想要一次推送多家平台？希望对接流程更高效？获得互金资产专家的全方位服务？选择：</p><div class=checkbox _v-e56fc584=""><input id=kaitongRefer type=checkbox v-model=model.kaitong_refer _v-e56fc584=""><label for=kaitongRefer _v-e56fc584=""><i class="icon-pano icon-checkbox" _v-e56fc584=""></i>开通资产推介服务</label><p _v-e56fc584="">开通金融为您提供专业的金融互联网交易服务，上百个互联网渠道资产项目落地经验，与四十多家主流互金平台开展合作，了解各大平台风控标准与资产偏好。</p></div></div></group><div class=buttons-footer _v-e56fc584=""><button v-if="$route.params.type === &quot;add&quot;" @click=next() _v-e56fc584="">下一步<i class="icon-pano icon-arrow-bold" _v-e56fc584=""></i></button><button v-if="$route.params.type !== &quot;add&quot;" @click=submit() _v-e56fc584="">提交</button></div></div>'},416:function(t,e,o){var n,i,r={};o(367),n=o(253),i=o(403),t.exports=n||{},t.exports.__esModule&&(t.exports=t.exports.default);var s="function"==typeof t.exports?t.exports.options||(t.exports.options={}):t.exports;i&&(s.template=i),s.computed||(s.computed={}),Object.keys(r).forEach(function(t){var e=r[t];s.computed[t]=function(){return e}})}});