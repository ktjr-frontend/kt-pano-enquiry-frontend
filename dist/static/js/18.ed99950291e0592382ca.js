webpackJsonp([18,23],{25:function(t,e,r){!function(e,r){t.exports=r()}(this,function(){return function(t){function e(o){if(r[o])return r[o].exports;var a=r[o]={exports:{},id:o,loaded:!1};return t[o].call(a.exports,a,a.exports,e),a.loaded=!0,a.exports}var r={};return e.m=t,e.c=r,e.p="",e(0)}([function(t,e,r){t.exports=r(3)},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=["-moz-box-","-webkit-box-",""];e["default"]={props:{span:[Number,String],order:[Number,String]},methods:{buildWidth:function(t){return"number"==typeof t?t<1?t:t/12:"string"==typeof t?t.replace("px","")/this.bodyWidth:void 0}},computed:{style:function(){var t={},e="horizontal"===this.$parent.orient?"marginLeft":"marginTop";if(t[e]=this.$parent.gutter+"px",this.span)for(var o=0;o<r.length;o++)t[r[o]+"flex"]="0 0 "+100*this.buildWidth(this.span)+"%";return"undefined"!=typeof this.order&&(t.order=this.order),t}},data:function(){return{bodyWidth:document.documentElement.offsetWidth}}}},function(t,e){t.exports=" <div class=vux-flexbox-item :style=style> <slot></slot> </div> "},function(t,e,r){var o,a;o=r(1),a=r(2),t.exports=o||{},t.exports.__esModule&&(t.exports=t.exports["default"]),a&&(("function"==typeof t.exports?t.exports.options||(t.exports.options={}):t.exports).template=a)}])})},26:function(t,e,r){!function(e,r){t.exports=r()}(this,function(){return function(t){function e(o){if(r[o])return r[o].exports;var a=r[o]={exports:{},id:o,loaded:!1};return t[o].call(a.exports,a,a.exports,e),a.loaded=!0,a.exports}var r={};return e.m=t,e.c=r,e.p="",e(0)}([function(t,e,r){t.exports=r(4)},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e["default"]={props:{gutter:{type:Number,"default":8},orient:{type:String,"default":"horizontal"},justify:String,align:String,wrap:String,direction:String},computed:{styles:function(){return{"justify-content":this.justify,"align-items":this.align,"flex-wrap":this.wrap,"flex-direction":this.direction}}}}},function(t,e){},function(t,e){t.exports=" <div class=vux-flexbox :class=\"{'vux-flex-col': orient === 'vertical', 'vux-flex-row': orient === 'horizontal'}\" :style=styles> <slot></slot> </div> "},function(t,e,r){var o,a;r(2),o=r(1),a=r(3),t.exports=o||{},t.exports.__esModule&&(t.exports=t.exports["default"]),a&&(("function"==typeof t.exports?t.exports.options||(t.exports.options={}):t.exports).template=a)}])})},191:function(t,e,r){"use strict";function o(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var a=r(6),n=o(a),i=r(161),c=o(i),d=r(26),s=o(d),f=r(25),l=o(f),u=r(162),p=o(u),v=r(19),m=r(9);e["default"]={components:{Alert:c["default"],Flexbox:s["default"],FlexboxItem:l["default"],Toast:p["default"]},vuex:{getters:{user:v.user}},data:function(){return{card:{file:null,previewUrl:"",previewing:!1,uploading:!1}}},computed:{containerClass:{cached:!1,get:function(){var t="";switch(!0){case this.card.previewing:t="preparing";break;case!!this.card.previewUrl:t="preview";break;case this.card.uploading:t="pending";break;default:t=""}return t}}},methods:{showPreview:function(t){this.card.previewUrl=t,this.card.previewing=!1},cardOnChange:function(t,e){var r=this;this.validate(t);var o=e.target,a=new FileReader;a.addEventListener("load",function(){r.$root.hideLoadingStatus(),r.showPreview(a.result),r.$root.log({name:"上传名片"})}),o.files[0]&&(this.$root.showLoadingStatus(),this.previewing=!0,setTimeout(function(){a.readAsDataURL(o.files[0])},50))},resetForm:function(){this.card.previewUrl="",this.card.file=null,document.forms.namedItem("cardForm").reset(),this.$root.log({name:"重新上传"})},validate:function(t){this.$cardValidation[t].invalid&&this.$cardValidation[t].touched&&this.$validate(t)},onSubmit:function(t){var e=this;t.preventDefault(),this.$validate(!0,function(){if(e.$cardValidation.invalid)e.$root.showToast({text:"请先上传名片"});else{e.$root.showLoadingStatus();var t=document.forms.namedItem("cardForm"),r=new FormData(t);m.cards.save(r).then(function(t){return m.cards.update({content:"confirm"},{})}).then(function(t){e.$root.hideLoadingStatus(),e.$root.updateUser((0,n["default"])({},e.user,t.json().account)),e.$route.query.update?(e.$root.showToast({text:"名片修改成功!",type:"text"}),e.$router.go({name:"settings"})):(e.$root.showAlert({content:"名片上传成功，快去开启您的询价之旅吧！"}),e.$router.go({name:"enquiry"}))})["catch"](function(t){e.$root.hideLoadingStatus(),e.$root.showToast({text:t.json().error||"抱歉，服务器繁忙！"})})}})}}}},234:function(t,e,r){e=t.exports=r(7)(),e.push([t.id,".card-container[_v-1988cf5a]{text-align:center}.card-container .dotting[_v-1988cf5a]{display:inline-block;min-width:.04026rem;min-height:.04026rem;margin-right:.064412rem}.card-container .title[_v-1988cf5a]{font-size:.523349rem;margin:.805153rem auto}.card-container .card-body[_v-1988cf5a]{margin:0 auto}.card-container .card-body .business-card-preview[_v-1988cf5a]{height:4.025765rem;margin:0 auto;border:1px solid #dbe0e7;position:relative}.card-container .card-body .business-card-preview img[_v-1988cf5a]{max-width:98%;max-height:98%;position:absolute;top:50%;left:50%;-webkit-transform:translateX(-50%) translateY(-50%);transform:translateX(-50%) translateY(-50%)}.card-container .card-body .btn-file[_v-1988cf5a]{height:3.623188rem;width:3.623188rem;line-height:3.623188rem;margin:0 auto;position:relative;background:#dbe0e7;border-radius:.080515rem;text-align:center;font-size:300px;color:#fff;overflow:hidden}.card-container .card-body .btn-file[_v-1988cf5a]:after{height:1.851852rem;width:.177134rem}.card-container .card-body .btn-file[_v-1988cf5a]:before{width:1.851852rem;height:.177134rem}.card-container .card-body .btn-file[_v-1988cf5a]:after,.card-container .card-body .btn-file[_v-1988cf5a]:before{content:'';position:absolute;left:50%;top:50%;-webkit-transform:translateX(-50%) translateY(-50%);transform:translateX(-50%) translateY(-50%);background:#fff;border-radius:.080515rem;pointer-events:none}.card-container .card-body .btn-file[_v-1988cf5a]:active:after,.card-container .card-body .btn-file[_v-1988cf5a]:active:before{background:#4380dd}.card-container .card-body .btn-file input[_v-1988cf5a]{position:absolute;opacity:0;left:0;right:0;bottom:0;top:0;width:100%;height:100%}.card-container .card-body .business-card-preview[_v-1988cf5a],.card-container .card-body .form-footer[_v-1988cf5a]{display:none}.card-container .card-body .buttons[_v-1988cf5a]{margin-top:1.207729rem}.card-container .comment[_v-1988cf5a]{margin-top:.402576rem;line-height:1.5em;color:#adb1bc;font-size:.289855rem}.card-container.preparing .card-body .status[_v-1988cf5a],.card-container.preview .card-body .business-card-preview[_v-1988cf5a],.card-container.preview .card-body .form-footer[_v-1988cf5a]{display:block}.card-container.done .card-body .btn-file[_v-1988cf5a],.card-container.done .card-body .business-card-preview[_v-1988cf5a],.card-container.done .card-body .form-footer[_v-1988cf5a],.card-container.done .title[_v-1988cf5a],.card-container.preview .card-body .btn-file[_v-1988cf5a]{display:none}.card-container.done .success[_v-1988cf5a]{display:block}",""])},247:function(t,e,r){var o=r(234);"string"==typeof o&&(o=[[t.id,o,""]]);r(8)(o,{});o.locals&&(t.exports=o.locals)},267:function(t,e){t.exports='<div class=form-container _v-1988cf5a=""><validator name=cardValidation _v-1988cf5a=""><form name=cardForm novalidate="" @submit=onSubmit($event) _v-1988cf5a=""><div :class=containerClass class="form-group card-container" _v-1988cf5a=""><div class=card-body _v-1988cf5a=""><div class=btn-file _v-1988cf5a=""><input id=file v-model=card.file @change="cardOnChange(\'file\', $event)" type=file v-validate:file="{required: true}" name=file _v-1988cf5a=""></div><div v-show=!card.file class=comment _v-1988cf5a=""><p _v-1988cf5a="">请尽快上传与注册手机号一致的名片信息。<br _v-1988cf5a=""> 名片信息仅用于认证审核，我们将对您的个人信息严格保密。</p></div><div class=business-card-preview _v-1988cf5a=""><img alt=名片预览 :src=card.previewUrl _v-1988cf5a=""></div></div></div><div v-show=card.file class=form-group _v-1988cf5a=""><flexbox _v-1988cf5a=""><flexbox-item _v-1988cf5a=""><button @click="$root.log({name: \'完成\'})" class=btn _v-1988cf5a="">完成</button></flexbox-item><flexbox-item _v-1988cf5a=""><button @click.prevent=resetForm() class="btn btn-gray" _v-1988cf5a="">重新上传</button></flexbox-item></flexbox></div></form></validator></div>'},288:function(t,e,r){var o,a;r(247),o=r(191),a=r(267),t.exports=o||{},t.exports.__esModule&&(t.exports=t.exports["default"]),a&&(("function"==typeof t.exports?t.exports.options||(t.exports.options={}):t.exports).template=a)}});