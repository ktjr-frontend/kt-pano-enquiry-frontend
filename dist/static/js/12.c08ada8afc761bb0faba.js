webpackJsonp([12,16],{7:function(e,t,o){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var r=o(2),n=i(r);t["default"]={methods:{clearField:function(e){this.user[e]=""},showError:function(e){var t=this.$validation;this.$root.showToast({text:n["default"].find(t.errors,function(t){return t.field===e}).message})},showFirstError:function(){this.validationFork&&this.updateValidation();var e=this.validationFork||this.$validation;this.$root.showToast({text:e.errors[0].message})},validate:function(e,t){var o=this.$validation;o[e].invalid&&o[e].touched&&this.$validate(e,function(){t&&t()})}}}},39:function(e,t,o){!function(t,o){e.exports=o()}(this,function(){return function(e){function t(i){if(o[i])return o[i].exports;var r=o[i]={exports:{},id:i,loaded:!1};return e[i].call(r.exports,r,r.exports,t),r.loaded=!0,r.exports}var o={};return t.m=e,t.c=o,t.p="",t(0)}([function(e,t,o){e.exports=o(3)},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=["-moz-box-","-webkit-box-",""];t["default"]={props:{span:[Number,String],order:[Number,String]},methods:{buildWidth:function(e){return"number"==typeof e?e<1?e:e/12:"string"==typeof e?e.replace("px","")/this.bodyWidth:void 0}},computed:{style:function(){var e={},t="horizontal"===this.$parent.orient?"marginLeft":"marginTop";if(e[t]=this.$parent.gutter+"px",this.span)for(var i=0;i<o.length;i++)e[o[i]+"flex"]="0 0 "+100*this.buildWidth(this.span)+"%";return"undefined"!=typeof this.order&&(e.order=this.order),e}},data:function(){return{bodyWidth:document.documentElement.offsetWidth}}}},function(e,t){e.exports=" <div class=vux-flexbox-item :style=style> <slot></slot> </div> "},function(e,t,o){var i,r;i=o(1),r=o(2),e.exports=i||{},e.exports.__esModule&&(e.exports=e.exports["default"]),r&&(("function"==typeof e.exports?e.exports.options||(e.exports.options={}):e.exports).template=r)}])})},40:function(e,t,o){!function(t,o){e.exports=o()}(this,function(){return function(e){function t(i){if(o[i])return o[i].exports;var r=o[i]={exports:{},id:i,loaded:!1};return e[i].call(r.exports,r,r.exports,t),r.loaded=!0,r.exports}var o={};return t.m=e,t.c=o,t.p="",t(0)}([function(e,t,o){e.exports=o(4)},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t["default"]={props:{gutter:{type:Number,"default":8},orient:{type:String,"default":"horizontal"},justify:String,align:String,wrap:String,direction:String},computed:{styles:function(){return{"justify-content":this.justify,"align-items":this.align,"flex-wrap":this.wrap,"flex-direction":this.direction}}}}},function(e,t){},function(e,t){e.exports=" <div class=vux-flexbox :class=\"{'vux-flex-col': orient === 'vertical', 'vux-flex-row': orient === 'horizontal'}\" :style=styles> <slot></slot> </div> "},function(e,t,o){var i,r;o(2),i=o(1),r=o(3),e.exports=i||{},e.exports.__esModule&&(e.exports=e.exports["default"]),r&&(("function"==typeof e.exports?e.exports.options||(e.exports.options={}):e.exports).template=r)}])})},210:function(e,t,o){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var r=o(40),n=i(r),s=o(39),a=i(s),l=o(18),u=i(l),d=o(7),c=i(d),f=o(3);t["default"]={mixins:[c["default"]],components:{Flexbox:n["default"],FlexboxItem:a["default"]},methods:{onSubmit:function(){var e=this;this.$validate(!0,function(){e.$validation.invalid?e.showFirstError():(e.$root.showLoadingStatus(),f.sessions.save(e.user).then(function(t){var o=window.localStorage.token=t.json().token;return u["default"].http.headers.common.Authorization=o,e.$root.hideMessage(),f.sessions.get()}).then(function(t){e.$root.hideLoadingStatus();var o=t.json().account;e.$root.updateUser(o),setTimeout(function(){e.$router.go({name:"rejected"===o.status?"settings":"quotationOB"})},10)})["catch"](function(t){e.$root.hideLoadingStatus(),e.$root.showAlert({content:function(){if(t.json().error.indexOf("无权限")>-1){var e=o(194);return'<p style="text-align:center;">很抱歉，您暂无权限查看该页面。</p><p>如有问题可联系『PANO微信小秘书』</p>\n                    <p><img src="'+e+'" width="60%" /></p>'}return t.json().error||"抱歉，服务器繁忙！"}()})}))})}},data:function(){var e=window.localStorage.userMobile||"";return{user:{mobile:e,password:""},fields:[{name:"mobile",text:"手机号",placeholder:"请输入用户名（手机号码）",type:"number",iconName:"icon-man-solid",validate:{required:{rule:!0,message:"请填写您的手机号"},mobile:!0}},{name:"password",text:"密码",placeholder:"请输入密码",type:"password",iconName:"icon-lock-solid",validate:{required:{rule:!0,message:"请输入密码"}}}]}}}},271:function(e,t,o){t=e.exports=o(4)(),t.push([e.id,".forget-password[_v-e33825a2]{color:#737e9c}",""])},284:function(e,t,o){var i=o(271);"string"==typeof i&&(i=[[e.id,i,""]]);o(5)(i,{});i.locals&&(e.exports=i.locals)},302:function(e,t){e.exports='<div class=form-container _v-e33825a2=""><validator name=validation _v-e33825a2=""><form action="" novalidate="" @submit.prevent=onSubmit($event) _v-e33825a2=""><div v-for="field in fields" class=form-group _v-e33825a2=""><div v-validate-class="" v-kt-toggle-onfucusblur="" child=input toggle-class=focus :class="{\'not-empty\': !!user[field.name]}" class="input input-withicon" _v-e33825a2=""><i :class=field.iconName class=icon-pano _v-e33825a2=""></i><input autocomplete=off initial=off @input=validate(field.name) detect-change=off detect-blur=off :type=field.type v-model=user[field.name] :name=field.name :placeholder=field.placeholder :field=field.name v-validate=field.validate _v-e33825a2=""><div class=status _v-e33825a2=""><i v-touch:tap=clearField(field.name) class="weui_icon weui_icon_clear" _v-e33825a2=""></i><i v-touch:tap=showError(field.name) class="weui_icon weui_icon_warn" _v-e33825a2=""></i></div></div></div><div class=form-group _v-e33825a2=""><button type=submit @click="$root.log({name: \'登录\'})" _v-e33825a2="">登录</button></div><flexbox _v-e33825a2=""><flexbox-item _v-e33825a2=""><div class=text-left _v-e33825a2="">没有账号？<em _v-e33825a2=""><a v-link="{name: \'register\'}" @click="$root.log({name: \'立即注册\'})" _v-e33825a2="">立即注册</a></em></div></flexbox-item><flexbox-item _v-e33825a2=""><div class=text-right _v-e33825a2=""><a v-link="{name: \'forgetPassword1\', query:{mobile: user.mobile}}" @click="$root.log({name: \'忘记密码\'})" class=forget-password _v-e33825a2="">忘记密码？</a></div></flexbox-item></flexbox></form></validator></div>'},306:function(e,t,o){var i,r;o(284),i=o(210),r=o(302),e.exports=i||{},e.exports.__esModule&&(e.exports=e.exports["default"]),r&&(("function"==typeof e.exports?e.exports.options||(e.exports.options={}):e.exports).template=r)}});