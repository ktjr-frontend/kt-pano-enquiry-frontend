webpackJsonp([10,18],{8:function(t,o,e){"use strict";function i(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(o,"__esModule",{value:!0});var n=e(1),s=i(n);o["default"]={methods:{clearField:function(t){this.user[t]=""},showError:function(t){var o=this.$validation;this.$root.showToast({text:s["default"].find(o.errors,function(o){return o.field===t}).message})},showFirstError:function(){this.validationFork&&this.updateValidation();var t=this.validationFork||this.$validation;this.$root.showToast({text:t.errors[0].message})},validate:function(t,o){var e=this.$validation;e[t].invalid&&e[t].touched&&this.$validate(t,function(){o&&o()})}}}},20:function(t,o,e){!function(o,e){t.exports=e()}(this,function(){return function(t){function o(i){if(e[i])return e[i].exports;var n=e[i]={exports:{},id:i,loaded:!1};return t[i].call(n.exports,n,n.exports,o),n.loaded=!0,n.exports}var e={};return o.m=t,o.c=e,o.p="",o(0)}([function(t,o,e){t.exports=e(3)},function(t,o){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var e=["-moz-box-","-webkit-box-",""];o["default"]={props:{span:[Number,String],order:[Number,String]},methods:{buildWidth:function(t){return"number"==typeof t?t<1?t:t/12:"string"==typeof t?t.replace("px","")/this.bodyWidth:void 0}},computed:{style:function(){var t={},o="horizontal"===this.$parent.orient?"marginLeft":"marginTop";if(t[o]=this.$parent.gutter+"px",this.span)for(var i=0;i<e.length;i++)t[e[i]+"flex"]="0 0 "+100*this.buildWidth(this.span)+"%";return"undefined"!=typeof this.order&&(t.order=this.order),t}},data:function(){return{bodyWidth:document.documentElement.offsetWidth}}}},function(t,o){t.exports=" <div class=vux-flexbox-item :style=style> <slot></slot> </div> "},function(t,o,e){var i,n;i=e(1),n=e(2),t.exports=i||{},t.exports.__esModule&&(t.exports=t.exports["default"]),n&&(("function"==typeof t.exports?t.exports.options||(t.exports.options={}):t.exports).template=n)}])})},21:function(t,o,e){!function(o,e){t.exports=e()}(this,function(){return function(t){function o(i){if(e[i])return e[i].exports;var n=e[i]={exports:{},id:i,loaded:!1};return t[i].call(n.exports,n,n.exports,o),n.loaded=!0,n.exports}var e={};return o.m=t,o.c=e,o.p="",o(0)}([function(t,o,e){t.exports=e(4)},function(t,o){"use strict";Object.defineProperty(o,"__esModule",{value:!0}),o["default"]={props:{gutter:{type:Number,"default":8},orient:{type:String,"default":"horizontal"},justify:String,align:String,wrap:String,direction:String},computed:{styles:function(){return{"justify-content":this.justify,"align-items":this.align,"flex-wrap":this.wrap,"flex-direction":this.direction}}}}},function(t,o){},function(t,o){t.exports=" <div class=vux-flexbox :class=\"{'vux-flex-col': orient === 'vertical', 'vux-flex-row': orient === 'horizontal'}\" :style=styles> <slot></slot> </div> "},function(t,o,e){var i,n;e(2),i=e(1),n=e(3),t.exports=i||{},t.exports.__esModule&&(t.exports=t.exports["default"]),n&&(("function"==typeof t.exports?t.exports.options||(t.exports.options={}):t.exports).template=n)}])})},81:function(t,o,e){"use strict";function i(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(o,"__esModule",{value:!0});var n=e(19),s=i(n),r=e(50),a=i(r),u=e(21),l=i(u),c=e(20),d=i(c),p=e(51),f=i(p),h=e(178),v=i(h),m=e(176),x=i(m),w=e(8),g=i(w),y=e(9);o["default"]={mixins:[g["default"]],components:{Alert:a["default"],Flexbox:l["default"],FlexboxItem:d["default"],Toast:f["default"],Countdown:x["default"],Popup:v["default"]},methods:{startCountDown:function(){this.captchaCountdown.show=!0,this.captchaCountdown.start=!0,this.captchaCountdown.text="等待"},resetCountDown:function(){this.captchaCountdown.time=59,this.captchaCountdown.show=!1,this.captchaCountdown.start=!1,this.captchaCountdown.text="短信获取"},getCaptcha:function(){var t=this;this.$root.log({name:"短信获取"}),this.$validate("mobile",function(){t.$validation.mobile.invalid?t.$root.showToast({text:"请正确输入11位手机号码"}):(t.startCountDown(),y.registrations.get({content:"captcha",mobile:t.user.mobile,channel:"sms"})["catch"](function(o){t.$root.showToast({text:o.json().error||"获取失败"}),t.resetCountDown()}))})},onRegisterSuccess:function(){var t=this;y.sessions.save({mobile:this.user.mobile,password:this.user.password}).then(function(o){var e=o.json().account;t.$root.updateUser(e),t.$router.go({name:"enquiry"})})},onSubmit:function(){var t=this;this.$validate(!0,function(){t.$validation.invalid?t.showFirstError():(t.$root.showLoadingStatus(),y.registrations.save({content:"simplify"},t.user).then(function(){y.sessions.save(t.user).then(function(o){var e=window.localStorage.token=o.json().token;s["default"].http.headers.common.Authorization=e,y.sessions.get().then(function(o){t.$root.hideLoadingStatus();var e=o.json().account;t.$root.updateUser(e),t.$router.go({name:"perfect"})})},function(o){t.$root.hideLoadingStatus(),t.$root.showToast({text:o.json().error||"抱歉，注册失败！"})})},function(o){t.$root.hideLoadingStatus(),t.$root.showToast({text:o.json().error||"抱歉，注册失败！"})}))})}},data:function(){return{user:{mobile:"",captcha:"",password:""},captchaCountdown:{text:"短信获取",show:!1,time:59,start:!1},fields:[{name:"mobile",placeholder:"您的手机号码",type:"number",comment:"为方便后期实名认证，请使用与名片信息一致的手机号。",iconName:"icon-user",validate:{required:!0,mobile:!0}},{name:"captcha",placeholder:"请输入验证码",type:"number",iconName:"icon-user",validate:{required:!0,pattern:{rule:"/^\\d{4}$/",message:"验证码错误"}}},{name:"password",placeholder:"请输入密码（6~20位，包含字母和数字）",type:"password",iconName:"icon-lock",validate:{pattern:{rule:"/^(?=.*\\d)(?=.*[a-z]).{6,20}$/",message:"不能小于6个字符，需包含字母和数字"}}}]}}}},120:function(t,o,e){o=t.exports=e(6)(),o.push([t.id,"",""])},132:function(t,o,e){var i=e(120);"string"==typeof i&&(i=[[t.id,i,""]]);e(7)(i,{});i.locals&&(t.exports=i.locals)},148:function(t,o){t.exports=' <div class="form-container register-container" _v-46412d66=""> <validator name=validation _v-46412d66=""> <form autocomplete=off action="" novalidate="" @submit.prevent=onSubmit($event) _v-46412d66=""> <input type=password class=dn name=password _v-46412d66=""> <div class=form-group v-for="field in fields" _v-46412d66=""> <div class=input v-validate-class="" v-kt-toggle-onfucusblur="" child=input toggle-class=focus :class="{\'not-empty\': !!user[field.name]}" _v-46412d66=""> <i class=icon-pano :class=field.iconName _v-46412d66=""></i> <input autocomplete=off @input=validate(field.name) initial=off detect-change=off detect-blur=off :type=field.type v-model=user[field.name] :name=field.name :placeholder=field.placeholder :field=field.name v-validate=field.validate _v-46412d66=""> <div class=status _v-46412d66=""> <button :disabled=captchaCountdown.show v-if="field.name === \'captcha\'" class=inset-button @click.prevent=getCaptcha() _v-46412d66=""> <span v-cloak="" _v-46412d66="">{{captchaCountdown.text}}</span> <countdown v-show=captchaCountdown.show :start=captchaCountdown.start :time.sync=captchaCountdown.time @on-finish=resetCountDown() _v-46412d66=""></countdown> </button> <i class="weui_icon weui_icon_clear" @click=clearField(field.name) _v-46412d66=""></i> <i class="weui_icon weui_icon_warn" @click=showError(field.name) _v-46412d66=""></i> <i class="weui_icon weui_icon_success" _v-46412d66=""></i> </div> </div> <div class=input-comment v-if=field.comment v-cloak="" _v-46412d66="">{{field.comment}}</div> </div> <div class=form-group _v-46412d66=""> <button @click="$root.log({name: \'立即注册\'})" _v-46412d66="">立即注册</button> </div> <flexbox _v-46412d66=""> <flexbox-item _v-46412d66=""> <div class=text-right _v-46412d66=""> 已有账号？<em _v-46412d66=""><a v-link="{name: \'login\'}" @click="$root.log({name: \'请登录\'})" _v-46412d66="">请登录</a></em> </div> </flexbox-item> </flexbox> </form> </validator> </div> '},167:function(t,o,e){var i,n;e(132),i=e(81),n=e(148),t.exports=i||{},t.exports.__esModule&&(t.exports=t.exports["default"]),n&&(("function"==typeof t.exports?t.exports.options||(t.exports.options={}):t.exports).template=n)},176:function(t,o,e){!function(o,e){t.exports=e()}(this,function(){return function(t){function o(i){if(e[i])return e[i].exports;var n=e[i]={exports:{},id:i,loaded:!1};return t[i].call(n.exports,n,n.exports,o),n.loaded=!0,n.exports}var e={};return o.m=t,o.c=e,o.p="",o(0)}([function(t,o,e){t.exports=e(3)},function(t,o){"use strict";Object.defineProperty(o,"__esModule",{value:!0}),o["default"]={props:{time:{type:Number,"default":60},start:{type:Boolean,"default":!0}},methods:{tick:function(){var t=this;this.interval=setInterval(function(){t.time>0?t.time--:(t.stop(),t.index++,t.$emit("on-finish",t.index))},1e3)},stop:function(){clearInterval(this.interval)}},watch:{start:function(t,o){t===!0&&o===!1&&this.time>0&&this.tick(),t===!1&&o===!0&&this.stop()}},ready:function(){this.start&&this.tick()},data:function(){return{interval:null,index:0}}}},function(t,o){t.exports=" <span>{{time}}</span> "},function(t,o,e){var i,n;i=e(1),n=e(2),t.exports=i||{},t.exports.__esModule&&(t.exports=t.exports["default"]),n&&(("function"==typeof t.exports?t.exports.options||(t.exports.options={}):t.exports).template=n)}])})},178:function(t,o,e){!function(o,e){t.exports=e()}(this,function(){return function(t){function o(i){if(e[i])return e[i].exports;var n=e[i]={exports:{},id:i,loaded:!1};return t[i].call(n.exports,n,n.exports,o),n.loaded=!0,n.exports}var e={};return o.m=t,o.c=e,o.p="",o(0)}([function(t,o,e){t.exports=e(5)},function(t,o,e){"use strict";function i(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(o,"__esModule",{value:!0});var n=e(2),s=i(n);o["default"]={props:{show:{type:Boolean,twoWay:!0},height:{type:String,"default":"auto"},hideOnBlur:{type:Boolean,"default":!0}},ready:function(){var t=this;this.popup=new s["default"]({container:t.$el,innerHTML:"",hideOnBlur:t.hideOnBlur,onOpen:function(o){t.fixSafariOverflowScrolling("auto"),t.show=!0},onClose:function(o){t.fixSafariOverflowScrolling("touch"),t.show=!1}}),this.$overflowScrollingList=document.querySelectorAll(".vux-fix-safari-overflow-scrolling")},methods:{fixSafariOverflowScrolling:function(t){if(this.$overflowScrollingList.length)for(var o=0;o<this.$overflowScrollingList.length;o++)this.$overflowScrollingList[o].style.webkitOverflowScrolling=t}},data:function(){return{hasFirstShow:!1}},watch:{show:function(t){t?(this.popup.show(),this.$emit("on-show"),this.hasFirstShow||(this.$emit("on-first-show"),this.hasFirstShow=!0)):(this.$emit("on-hide"),this.show=!1,this.popup.hide(!1))}},beforeDestroy:function(){this.popup.destroy()}}},function(t,o){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var e=function(t){this.uuid=Math.random().toString(36).substring(3,8),this.params={},"[object Object]"===Object.prototype.toString.call(t)&&(this.params={input:t.input||"",container:document.querySelector(t.input)||"",innerHTML:t.innerHTML||"",hideOnBlur:t.hideOnBlur,onOpen:t.onOpen||function(){},onClose:t.onClose||function(){}}),!!document.querySelectorAll(".vux-popup-mask").length<=0&&(this.divMask=document.createElement("a"),this.divMask.className="vux-popup-mask",this.divMask.href="javascript:void(0)",document.body.appendChild(this.divMask));var o=void 0;return o=t.container?t.container:document.createElement("div"),o.className="vux-popup-dialog vux-popup-dialog-"+this.uuid,t.container||document.body.appendChild(o),this.mask=document.querySelector(".vux-popup-mask"),this.container=document.querySelector(".vux-popup-dialog-"+this.uuid),this._bindEvents(),t=null,this};e.prototype.onClickMask=function(){this.hide(!1)},e.prototype._bindEvents=function(){this.params.hideOnBlur&&this.mask.addEventListener("click",this.onClickMask.bind(this),!1)},e.prototype.show=function(){this.mask.classList.add("vux-popup-show"),this.container.classList.add("vux-popup-show"),this.params.onOpen&&this.params.onOpen(this)},e.prototype.hide=function(){var t=arguments.length<=0||void 0===arguments[0]||arguments[0];this.container.classList.remove("vux-popup-show"),document.querySelector(".vux-popup-dialog.vux-popup-show")||this.mask.classList.remove("vux-popup-show"),t===!1&&this.params.onClose&&this.params.onClose(this)},e.prototype.html=function(t){this.container.innerHTML=t},e.prototype.destroy=function(){this.mask.removeEventListener("click",this.onClickMask.bind(this),!1),this.mask&&this.mask.parentNode&&this.mask.parentNode.removeChild(this.mask)},o["default"]=e},function(t,o){},function(t,o){t.exports=" <div v-show=show transition=vux-popup :style={height:height} class=vux-popup> <slot></slot> </div> "},function(t,o,e){var i,n;e(3),i=e(1),n=e(4),t.exports=i||{},t.exports.__esModule&&(t.exports=t.exports["default"]),n&&(("function"==typeof t.exports?t.exports.options||(t.exports.options={}):t.exports).template=n)}])})}});