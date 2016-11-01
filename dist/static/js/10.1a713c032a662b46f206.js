webpackJsonp([10,22],{15:function(t,e,o){"use strict";function i(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var n=o(5),s=i(n);e["default"]={methods:{clearField:function(t){this.user[t]=""},showError:function(t){var e=this.$validation;this.$root.showToast({text:s["default"].find(e.errors,function(e){return e.field===t}).message})},showFirstError:function(){this.validationFork&&this.updateValidation();var t=this.validationFork||this.$validation;this.$root.showToast({text:t.errors[0].message})},validate:function(t,e){var o=this.$validation;o[t].invalid&&o[t].touched&&this.$validate(t,function(){e&&e()})}}}},28:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e["default"]={methods:{startCountDown:function(){this.captchaCountdown.show=!0,this.captchaCountdown.start=!0,this.captchaCountdown.text="等待"},resetCountDown:function(){this.captchaCountdown.time=59,this.captchaCountdown.show=!1,this.captchaCountdown.start=!1,this.captchaCountdown.text="短信获取"}},data:function(){return{captchaCountdown:{text:"短信获取",show:!1,time:59,start:!1}}}}},37:function(t,e,o){!function(e,o){t.exports=o()}(this,function(){return function(t){function e(i){if(o[i])return o[i].exports;var n=o[i]={exports:{},id:i,loaded:!1};return t[i].call(n.exports,n,n.exports,e),n.loaded=!0,n.exports}var o={};return e.m=t,e.c=o,e.p="",e(0)}([function(t,e,o){t.exports=o(3)},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e["default"]={props:{time:{type:Number,"default":60},start:{type:Boolean,"default":!0}},methods:{tick:function(){var t=this;this.interval=setInterval(function(){t.time>0?t.time--:(t.stop(),t.index++,t.$emit("on-finish",t.index))},1e3)},stop:function(){clearInterval(this.interval)}},watch:{start:function(t,e){t===!0&&e===!1&&this.time>0&&this.tick(),t===!1&&e===!0&&this.stop()}},ready:function(){this.start&&this.tick()},data:function(){return{interval:null,index:0}}}},function(t,e){t.exports=" <span>{{time}}</span> "},function(t,e,o){var i,n;i=o(1),n=o(2),t.exports=i||{},t.exports.__esModule&&(t.exports=t.exports["default"]),n&&(("function"==typeof t.exports?t.exports.options||(t.exports.options={}):t.exports).template=n)}])})},49:function(t,e,o){!function(e,o){t.exports=o()}(this,function(){return function(t){function e(i){if(o[i])return o[i].exports;var n=o[i]={exports:{},id:i,loaded:!1};return t[i].call(n.exports,n,n.exports,e),n.loaded=!0,n.exports}var o={};return e.m=t,e.c=o,e.p="",e(0)}([function(t,e,o){t.exports=o(3)},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=["-moz-box-","-webkit-box-",""];e["default"]={props:{span:[Number,String],order:[Number,String]},methods:{buildWidth:function(t){return"number"==typeof t?t<1?t:t/12:"string"==typeof t?t.replace("px","")/this.bodyWidth:void 0}},computed:{style:function(){var t={},e="horizontal"===this.$parent.orient?"marginLeft":"marginTop";if(t[e]=this.$parent.gutter+"px",this.span)for(var i=0;i<o.length;i++)t[o[i]+"flex"]="0 0 "+100*this.buildWidth(this.span)+"%";return"undefined"!=typeof this.order&&(t.order=this.order),t}},data:function(){return{bodyWidth:document.documentElement.offsetWidth}}}},function(t,e){t.exports=" <div class=vux-flexbox-item :style=style> <slot></slot> </div> "},function(t,e,o){var i,n;i=o(1),n=o(2),t.exports=i||{},t.exports.__esModule&&(t.exports=t.exports["default"]),n&&(("function"==typeof t.exports?t.exports.options||(t.exports.options={}):t.exports).template=n)}])})},50:function(t,e,o){!function(e,o){t.exports=o()}(this,function(){return function(t){function e(i){if(o[i])return o[i].exports;var n=o[i]={exports:{},id:i,loaded:!1};return t[i].call(n.exports,n,n.exports,e),n.loaded=!0,n.exports}var o={};return e.m=t,e.c=o,e.p="",e(0)}([function(t,e,o){t.exports=o(4)},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e["default"]={props:{gutter:{type:Number,"default":8},orient:{type:String,"default":"horizontal"},justify:String,align:String,wrap:String,direction:String},computed:{styles:function(){return{"justify-content":this.justify,"align-items":this.align,"flex-wrap":this.wrap,"flex-direction":this.direction}}}}},function(t,e){},function(t,e){t.exports=" <div class=vux-flexbox :class=\"{'vux-flex-col': orient === 'vertical', 'vux-flex-row': orient === 'horizontal'}\" :style=styles> <slot></slot> </div> "},function(t,e,o){var i,n;o(2),i=o(1),n=o(3),t.exports=i||{},t.exports.__esModule&&(t.exports=t.exports["default"]),n&&(("function"==typeof t.exports?t.exports.options||(t.exports.options={}):t.exports).template=n)}])})},95:function(t,e,o){!function(e,o){t.exports=o()}(this,function(){return function(t){function e(i){if(o[i])return o[i].exports;var n=o[i]={exports:{},id:i,loaded:!1};return t[i].call(n.exports,n,n.exports,e),n.loaded=!0,n.exports}var o={};return e.m=t,e.c=o,e.p="",e(0)}([function(t,e,o){t.exports=o(5)},function(t,e,o){"use strict";function i(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var n=o(2),s=i(n);e["default"]={props:{show:{type:Boolean,twoWay:!0},height:{type:String,"default":"auto"},hideOnBlur:{type:Boolean,"default":!0}},ready:function(){var t=this;this.popup=new s["default"]({container:t.$el,innerHTML:"",hideOnBlur:t.hideOnBlur,onOpen:function(e){t.fixSafariOverflowScrolling("auto"),t.show=!0},onClose:function(e){t.fixSafariOverflowScrolling("touch"),t.show=!1}}),this.$overflowScrollingList=document.querySelectorAll(".vux-fix-safari-overflow-scrolling")},methods:{fixSafariOverflowScrolling:function(t){if(this.$overflowScrollingList.length)for(var e=0;e<this.$overflowScrollingList.length;e++)this.$overflowScrollingList[e].style.webkitOverflowScrolling=t}},data:function(){return{hasFirstShow:!1}},watch:{show:function(t){t?(this.popup.show(),this.$emit("on-show"),this.hasFirstShow||(this.$emit("on-first-show"),this.hasFirstShow=!0)):(this.$emit("on-hide"),this.show=!1,this.popup.hide(!1))}},beforeDestroy:function(){this.popup.destroy()}}},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=function(t){this.uuid=Math.random().toString(36).substring(3,8),this.params={},"[object Object]"===Object.prototype.toString.call(t)&&(this.params={input:t.input||"",container:document.querySelector(t.input)||"",innerHTML:t.innerHTML||"",hideOnBlur:t.hideOnBlur,onOpen:t.onOpen||function(){},onClose:t.onClose||function(){}}),!!document.querySelectorAll(".vux-popup-mask").length<=0&&(this.divMask=document.createElement("a"),this.divMask.className="vux-popup-mask",this.divMask.href="javascript:void(0)",document.body.appendChild(this.divMask));var e=void 0;return e=t.container?t.container:document.createElement("div"),e.className="vux-popup-dialog vux-popup-dialog-"+this.uuid,t.container||document.body.appendChild(e),this.mask=document.querySelector(".vux-popup-mask"),this.container=document.querySelector(".vux-popup-dialog-"+this.uuid),this._bindEvents(),t=null,this};o.prototype.onClickMask=function(){this.hide(!1)},o.prototype._bindEvents=function(){this.params.hideOnBlur&&this.mask.addEventListener("click",this.onClickMask.bind(this),!1)},o.prototype.show=function(){this.mask.classList.add("vux-popup-show"),this.container.classList.add("vux-popup-show"),this.params.onOpen&&this.params.onOpen(this)},o.prototype.hide=function(){var t=arguments.length<=0||void 0===arguments[0]||arguments[0];this.container.classList.remove("vux-popup-show"),document.querySelector(".vux-popup-dialog.vux-popup-show")||this.mask.classList.remove("vux-popup-show"),t===!1&&this.params.onClose&&this.params.onClose(this)},o.prototype.html=function(t){this.container.innerHTML=t},o.prototype.destroy=function(){this.mask.removeEventListener("click",this.onClickMask.bind(this),!1),this.mask&&this.mask.parentNode&&this.mask.parentNode.removeChild(this.mask)},e["default"]=o},function(t,e){},function(t,e){t.exports=" <div v-show=show transition=vux-popup :style={height:height} class=vux-popup> <slot></slot> </div> "},function(t,e,o){var i,n;o(3),i=o(1),n=o(4),t.exports=i||{},t.exports.__esModule&&(t.exports=t.exports["default"]),n&&(("function"==typeof t.exports?t.exports.options||(t.exports.options={}):t.exports).template=n)}])})},240:function(t,e,o){"use strict";function i(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var n=o(25),s=i(n),r=o(30),a=i(r),u=o(27),l=i(u),c=o(50),d=i(c),p=o(49),f=i(p),h=o(95),v=i(h),m=o(37),x=i(m),_=o(15),w=i(_),g=o(28),b=i(g),y=o(4);e["default"]={mixins:[w["default"],b["default"]],components:{Flexbox:d["default"],FlexboxItem:f["default"],Countdown:x["default"],Popup:v["default"]},methods:{checkAgreement:function(){this.$root.log({name:"开通PANO用户协议"}),window.sessionStorage.registerUserCache=(0,a["default"])(this.user),window.open("/static/pano-agreement.htm","_blank")},getCaptcha:function(){var t=this;this.$root.log({name:"短信获取"}),this.$validate("mobile",function(){t.$validation.mobile.invalid?t.$root.showToast({text:"请正确输入11位手机号码"}):(t.startCountDown(),y.registrations.get({content:"captcha",mobile:t.user.mobile,channel:"sms"})["catch"](function(e){t.$root.showToast({text:e.json().error||"获取失败"}),t.resetCountDown()}))})},onSubmit:function(){var t=this;this.$validate(!0,function(){t.$validation.invalid?t.showFirstError():(t.$root.showLoadingStatus(),y.registrations.save({content:"simplify"},t.user).then(function(){return y.sessions.save(t.user)}).then(function(e){var o=window.localStorage.token=e.json().token;l["default"].http.headers.common.Authorization=o,y.sessions.get().then(function(e){t.$root.hideLoadingStatus();var o=e.json().account;t.$root.updateUser(o),t.$router.go({name:"perfect"})})})["catch"](function(e){t.$root.hideLoadingStatus(),t.$root.showToast({text:e.json().error||"抱歉，注册失败！"})}))})}},data:function(){var t=JSON.parse(window.sessionStorage.registerUserCache||"{}");return{user:(0,s["default"])({agreement:!0,mobile:"",captcha:"",introducer:"",password:""},t),fields:[{name:"mobile",placeholder:"您的手机号码",type:"number",comment:"为方便后期实名认证，请使用与名片信息一致的手机号。",iconName:"icon-user",validate:{required:!0,mobile:!0}},{name:"captcha",placeholder:"请输入验证码",type:"number",iconName:"icon-user",validate:{required:!0,pattern:{rule:"/^\\d{4}$/",message:"验证码错误"}}},{name:"password",placeholder:"请输入密码（6~20位，包含字母和数字）",type:"password",iconName:"icon-lock",validate:{password:!0}},{name:"introducer",placeholder:"邀请人（非必填）",type:"text",iconName:"icon-lock",validate:{maxlength:50}}]}}}},303:function(t,e,o){e=t.exports=o(2)(),e.push([t.id,".weui_cells[_v-46412d66]{background:none;overflow:initial}.weui_cells .weui_cell.weui_check_label[_v-46412d66]{padding-left:0}.weui_cells .weui_cell.weui_check_label p[_v-46412d66]{font-size:.289855rem}.weui_cells .weui_cell.weui_check_label a[_v-46412d66]{pointer-events:auto}.weui_cells .weui_cell.weui_check_label .weui_check:checked+.weui_icon_checked[_v-46412d66]:before{color:#737e9c}.weui_cells .weui_cell.weui_check_label .weui_icon_checked[_v-46412d66]:before{font-size:1em;color:#c9cdd5}.weui_cells[_v-46412d66]:after,.weui_cells[_v-46412d66]:before{display:none}",""])},322:function(t,e,o){var i=o(303);"string"==typeof i&&(i=[[t.id,i,""]]);o(3)(i,{});i.locals&&(t.exports=i.locals)},347:function(t,e){t.exports='<div class="form-container register-container" _v-46412d66=""><validator name=validation _v-46412d66=""><form autocomplete=off action="" novalidate="" @submit.prevent=onSubmit($event) _v-46412d66=""><input type=password name=password class=dn _v-46412d66=""><div v-for="field in fields" class=form-group _v-46412d66=""><div v-validate-class="" v-kt-toggle-onfucusblur="" child=input toggle-class=focus :class="{\'not-empty\': !!user[field.name]}" class=input _v-46412d66=""><i :class=field.iconName class=icon-pano _v-46412d66=""></i><input autocomplete=off @input=validate(field.name) initial=off detect-change=off detect-blur=off :type=field.type v-model=user[field.name] :name=field.name :placeholder=field.placeholder :field=field.name v-validate=field.validate _v-46412d66=""><div class=status _v-46412d66=""><button :disabled=captchaCountdown.show v-if="field.name === \'captcha\'" @click.prevent=getCaptcha() class=inset-button _v-46412d66=""><span v-cloak="" _v-46412d66="">{{captchaCountdown.text}}</span><countdown v-show=captchaCountdown.show :start=captchaCountdown.start :time.sync=captchaCountdown.time @on-finish=resetCountDown() _v-46412d66=""></countdown></button><i v-touch:tap=clearField(field.name) class="weui_icon weui_icon_clear" _v-46412d66=""></i><i v-touch:tap=showError(field.name) class="weui_icon weui_icon_warn" _v-46412d66=""></i><i class="weui_icon weui_icon_success" _v-46412d66=""></i></div></div><div v-if=field.comment v-cloak="" class=input-comment _v-46412d66="">{{field.comment}}</div></div><div class=form-group _v-46412d66=""><div class="weui_cells weui_cells_checkbox" _v-46412d66=""><label for=agreement class="weui_cell weui_check_label" _v-46412d66=""><div class=weui_cell_hd _v-46412d66=""><input id=agreement type=checkbox v-model=user.agreement v-validate:agreement="{required:{rule: true, message: \'请确认阅读开通PANO用户服务协议\'}}" class=weui_check _v-46412d66=""><i class=weui_icon_checked _v-46412d66=""></i></div><div class="weui_cell_bd weui_cell_primary" _v-46412d66=""><p _v-46412d66="">我已仔细阅读并同意<em _v-46412d66=""><a href=/static/pano-agreement.htm target=_blank @click.prevent=checkAgreement() _v-46412d66="">开通PANO用户协议</a></em></p></div></label></div></div><div class=form-group _v-46412d66=""><button @click="$root.log({name: \'立即注册\'})" _v-46412d66="">立即注册</button></div><flexbox _v-46412d66=""><flexbox-item _v-46412d66=""><div class=text-right _v-46412d66="">已有账号？<em _v-46412d66=""><a v-link="{name: \'login\'}" @click="$root.log({name: \'请登录\'})" _v-46412d66="">请登录</a></em></div></flexbox-item></flexbox></form></validator></div>'},364:function(t,e,o){var i,n;o(322),i=o(240),n=o(347),t.exports=i||{},t.exports.__esModule&&(t.exports=t.exports["default"]),n&&(("function"==typeof t.exports?t.exports.options||(t.exports.options={}):t.exports).template=n)}});