<template>
<div id="body">
    <img src="../assets/logo.svg" class="logo" alt="">

<!--    <span style="color: white; font-size: 58px;font-family: 'Segoe UI Semibold',serif; margin-right: 500px">Free Space, No Limit</span>-->
    <div class="login-app">
      <!-- 选择登录方式部分 -->
      <div class="login-header" @click="checkRadio()">
        <input type="radio" name="login-opt" id="message" checked="checked">
        <label for="message" class="m-btn">短信登录</label>
        <input type="radio" name="login-opt" id="username">
        <label for="username" class="u-btn">账号登录</label>
        <!--		  <input type="radio" name="login-opt" id="qrcode">-->
        <!--		  <label for="qrcode" class="q-btn">扫码登录</label>-->
      </div>
      <!-- 登录表单部分 -->
      <div class="login-body">
        <div id="form-bar">
          <!-- <form-append></form-append> -->
          <!-- 短信登录表单 -->
          <form action="javascript:" class="m-form">
            <input type="text" v-model = "phoneInput" placeholder="请输入手机号码" onkeypress="if(event.keyCode === 32 || event.keyCode === 13)event.returnValue = false;" onkeydown="if(event.keyCode === 32 || event.keyCode === 13)event.returnValue = false;">
            <input type="text" placeholder="请输入验证码" v-model="code" onkeypress="if(event.keyCode === 32 || event.keyCode === 13)event.returnValue = false;" onkeydown="if(event.keyCode === 32 || event.keyCode === 13)event.returnValue = false;"><button class="vercode-btn" @click="getCode" v-show="canSend">获取验证码</button>
            <el-button class="vercode-btn2" v-show="!canSend">{{ time }}秒后重试</el-button>

            <input type="checkbox" ref="sure" name="" id="sure">
            <label for="sure" class="tobesure"><p>未注册手机登录时会自动创建新账号，我已阅读并同意<a href="">服务协议</a>和<a href="">隐私权条款</a></p></label>
            <button class="login-btn"  @click="smsLogin">
              <span aria-hidden="true" class="circle">
              <span class="icon arrow"></span>
              </span>
              <span class="button-text">登录</span>
            </button>
<!--            <el-button class="login-btn" type="button" :loading="load" @click.prevent="smsLogin" >登录</el-button>-->
          </form>

          <!-- 账号登录表单 -->
          <form action="javascript:" class="u-form">
            <input type="text" placeholder="请输入账号" v-model="account">
            <input type="password" placeholder="请输入密码" v-model="password">
            <el-link @click="forgotPwdVisible = true" type="warning" :underline="false" style="margin: -19px 1px 0px 240px">忘记密码</el-link>
            <slide-verify-p-c  class= "slide"@transferConfirm="getConfirmSuccess" style="margin-bottom: 15px"></slide-verify-p-c>
            <button class="login-btn btn2"  @click="login" style="margin-top: 10px">
              <span aria-hidden="true" class="circle">
              <span class="icon arrow"></span>
              </span>
              <span class="button-text">登录</span>
            </button>
<!--            <el-button class="login-btn" :loading="load" @click="login">登录</el-button>-->
          </form>
          <!-- 扫码登录表单 -->
          <!--			<form action="" class="q-form">-->
          <!--			  <div class="qrcode">-->
          <!--				<img src="qrcode.png" alt="">-->
          <!--			  </div>-->
          <!--			</form>-->
          <!-- <form-append></form-append> -->
        </div>
      </div>
    </div>
  <el-dialog center title="重置密码" :visible.sync="forgotPwdVisible" width="30% ">
    <div style="display: flex;flex-direction: column;justify-content: center;align-items: center">
      <el-form :label-position="labelPosition" label-width="80px" >
        <el-form-item required label="手机号">
          <el-input v-model="user.phoneNumber"></el-input>
        </el-form-item>

        <el-form-item required label="验证码">
          <el-input v-model="verifyCode">

          </el-input>
        </el-form-item>
        <el-form-item required label="新密码">
          <el-input v-model="newPassword" type="password"></el-input>
        </el-form-item>
        <el-form-item required label="确认密码" >
          <el-input v-model="repeatPassword" type="password">

          </el-input>
        </el-form-item>
        <el-form-item >
          <el-button @click="sendSmsVerifycode" v-show="canSend2">获取验证码</el-button>
          <el-button class="vercode-btn2" v-show="!canSend2">{{ time2 }}秒后重试</el-button>

          <el-button type="primary" @click="changePassword">立即修改</el-button>
        </el-form-item>
      </el-form>
    </div>

  </el-dialog>
</div>

</template>
<script>

  import SlideVerifyPC from "./SlideVerifyPC";
  import {hideLoading} from "../tools/loading";
  import ForgetPassword from "./ForgetSafeCode";
  export default {
    components:{
      SlideVerifyPC,
      ForgetPassword
    },
    data(){
      return {
        newPassword:'',
        repeatPassword:'',
        verifyCode:'',
        user:{},
        canSend2:true,
        labelPosition: 'right',
        size:'',
        forgotPwdVisible: false,
        load1: false,
        load2: false,
        confirmSuccess: false,
        canSend: true,
        time: 60,
        time2: 60,
        timer: null,
        timer2: null,
        phoneInput: "",
        code:"",
        account:"",
        password:""
      }
    },
    methods:{
      sendSmsVerifycode() {
        if (!this.user.phoneNumber) {
          this.$notifyWarning("请输入手机号");

          return false;
        }
        if(!/^1[3|4|5|6|7|8|9]\d{9}$/.test(this.user.phoneNumber)){
          this.$notifyWarning("请输入正确的手机号");

          return false;
        }

        this.$axios({
          url: "/user/sms/sendCode",
          method:"get",
          params: {
            phoneNumber : this.user.phoneNumber
          }
        }).then(res=>{
          if (res.data.code === 200) {
            this.$notifySuccess("验证码发送成功");

            this.canSend2 = false;
            clearInterval(timer);
            let timer = setInterval(() => {

              if (this.time2 > 1 && this.time2 <= 60) {
                this.time2--;
              }else {
                this.canSend2 = true;
                this.time2 = 60;
                clearInterval(timer)
              }
            }, 1000)
          }
        }).catch(e => {
          this.$notifyError('服务异常，请稍后再试');

          console.log(e);
        })
      },
      changePassword() {
        if (!this.verifyCode) {
          this.$notifyWarning("请输入验证码");

          return false;
        }
        if (this.newPassword.length < 6) {
          this.$notifyWarning("密码长度不能小于6位");

          return false;
        }
        if (this.newPassword !== this.repeatPassword) {
          this.$notifyWarning("两次密码不一致");

          return false;
        }

        this.$axios({
          url: "/user/forgetPassword",
          method:"POST",
          dataType:'json',
          data: {
            phoneNumber: this.user.phoneNumber,
            newPassword: this.newPassword,
            verifyCode: this.verifyCode
          }
        }).then(res=>{
          if (res.data.code === 200) {
            this.$notifySuccess("密码重置成功");

            this.forgotPwdVisible = false;
          }else {
            this.$notifyError(res.data.message);

          }
        }).catch(e => {
          this.$notifyError('服务异常，请稍后再试');

          console.log(e);
        })
      },
      getConfirmSuccess(success){
        this.confirmSuccess = success;
      },

      checkRadio(){
        let login_opt = document.getElementsByName('login-opt');
        let form_bar = document.getElementById('form-bar');
        for(let i =0; i < login_opt.length; i++){
          if(login_opt[i].checked){
            form_bar.style.transform = 'translateX(' + (-348*i) + 'px)';
          }
        }
      },
      getCode() {
        if (!this.phoneInput) {
          this.$notifyWarning("请输入手机号");

          return false;
        }
        if(!/^1[3|4|5|6|7|8|9]\d{9}$/.test(this.phoneInput)){
          this.$notifyWarning("请输入正确的手机号");

          return false;
        }

        this.$axios({
          url: "/user/sms/sendCode",
          method:"get",
          params: {
            phoneNumber : this.phoneInput
          }
        }).then(res=>{
          if (res.data.code === 200) {
            this.$notifySuccess("验证码发送成功");

            this.canSend = false;
            let timer = setInterval(() => {
              if (this.time > 1 && this.time <= 60) {
                this.time--;
              }else {
                this.canSend = true;
                this.time = 60;
                clearInterval(timer)
              }
            }, 1000)
          }
        }).catch(e => {
          this.$notifyError('服务异常，请稍后再试');

          console.log(e);
        })
      },
      smsLogin() {
        if (!this.phoneInput) {
          this.$notifyWarning("请输入手机号");

          return false;
        }
        if(!/^1[3|4|5|7|8|9]\d{9}$/.test(this.phoneInput)){
          this.$notifyWarning("请输入正确的手机号");

          return false;
        }
        if(!this.code){
          this.$notifyWarning("请输入验证码");

          return false;
        }
        if (!this.$refs.sure.checked) {
          this.$notifyWarning("请勾选同意用户协议");

          return false;
        }
        this.$loading.showLoading();
        this.$axios({
          url: "/sms/login",
          method:"post",
          params: {
            phoneNumber : this.phoneInput,
            code: this.code
          }
        }).then(res=>{
          if (res.data.code === 200) {
            this.$loading.hideLoading();
            this.$notifySuccess("登录成功");
            this.$router.push('/main')
          }else {
            this.$loading.hideLoading();
            this.$notifyError(res.data.message);


          }
        }).catch(e => {
          console.log(e);
          this.$loading.hideLoading();
          this.$notifyError('服务异常，请稍后再试');

        })
      },
      login() {
        if(!this.account){
          this.$notifyWarning("请输入账号");

          return false;
        }
        if(!this.password){
          this.$notifyWarning("请输入密码");

          return false;
        }
        if (!this.confirmSuccess) {
          this.$notifyWarning("请先拖动滑块进行验证");

          return false;
        }
        this.$loading.showLoading();
        this.$axios({
          url: "/login",
          method:"post",
          data: {
            account : this.account,
            password: this.password
          }
        }).then(res=>{
          if (res.data.code === 200) {
            this.$loading.hideLoading();
            this.$notifySuccess("登录成功");

            this.$router.replace('/main')
          }else {
            this.$loading.hideLoading();
            this.$notifyError(res.data.message);

            this.load = false
          }
        }).catch(e => {
          console.log(e);
          this.$loading.hideLoading();
          this.$notifyError('服务异常，请稍后再试');

        })
      },
      checkLogined() {
        this.$axios('/user/currentUser').then(res => {
          if (res.data.data.id != null || res.data.data.id != '') {
            this.$router.push('/main');
          }else {

          }
        }).catch(e => {

        })
      },
      _isMobile() {
        let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
        return flag;
      },

    },
    created() {
      this.checkLogined()
      if (this._isMobile()) {
        this.confirmSuccess = true
      }
    },

  }


// 纯css计划告吹,老老实实js


// 我最开始想到的思路是
// checkRadio0(){
//   if(login_opt[0].checked){
//     form_bar.style.transform = 'translateX(0)';
//     console.log('1')
//   } else if(login_opt[1].checked){
//     form_bar.style.transform = 'translateX(-348px)';
//     console.log('2')
//   } else{
//     form_bar.style.transform = 'translateX(-692px)';
//   }
// }

// //而后我又有这么个思路
// checkRadio(){
//   for(let i =0; i < login_opt.length; i++){
//     if(login_opt[i].checked){
//       form_bar.style.transform = 'translateX(' + (-348*i) + 'px)';
//     }
//   }
// }
//献丑了,大家喜欢哪种呢
</script>

<style>
@media screen and (min-width:1000px) {
  #body {
    background-image: url("../../static/bg4.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    user-select: none;
    /* 这样用户点按钮的时候就不会选中文字, 更有沉浸感 */
    /* 唉, 我没有教人做事的意思 */

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    margin: 0;
  }
  .logo{
    width: 243px;
    margin-bottom: 30px;
    margin-left: 730px;
  }
  .login-btn btn2{
    opacity: 1;
  }
  .login-app{
    border-radius: 50px;
    background: #e0e0e0;
    box-shadow:  7px 14px 13px #bebebe;
    width: 348px;
    margin-bottom: 60px;
    margin-left: 755px;
  }
}


	.login-header{
	  display: flex;
	}
	.login-header input[type="radio"]{
	  display: none;
	}
	.login-header label{
	  background-color: #f5f5f6;
	  font-size: 18px;
	  color: rgba(37, 38, 43, .36);

	  padding: 16px;
	  text-align: center;
	  width: 100%;
	  /* 这里并不是非得100%,利用的是flex的自动收缩,只要大于1/3就好了 */

	  cursor: pointer;
	}
	.login-header .m-btn{
	  border-top-left-radius: 12px;
	}
	.login-header .q-btn{
	  border-top-right-radius: 12px;
	}

	#message:checked + .m-btn,
	#username:checked + .u-btn,
	#qrcode:checked + .q-btn{
	  background-color: #fff;
	  color: #25262b;
	  cursor: default;
	}

	/* 接下来是个悲伤的故事, 我不想重演了 */
	/* #message:checked~#form-bar{
	  left: 0;
	}

	#username:checked~#form-bar{
	  left: 348px;
	}

	#qrcode:checked~#form-bar{
	  left: 696px;
	} */
	/* 又忘了只能影响同级之后的兄弟元素... */
	/* 只能等CSS4了... */

	.login-body{
    height: 350px;
	  overflow: hidden;
	  border-radius: 0 0 20px 20px;
	  background-color: #fff;

	  -webkit-border-radius: 0 0 20px 20px;
	  -moz-border-radius: 0 0 20px 20px;
	  -ms-border-radius: 0 0 20px 20px;
	  -o-border-radius: 0 0 20px 20px;
	}

	#form-bar{
    height: 95%;
    display: flex;
	  transition: transform .5s cubic-bezier(0.175, 0.285, 0.32, 1.275);
	  /* 最初的打算其实本来是cubic-bezier(.25,.01,.25,1.3),但是觉得自己调的没有预设好最后就用了联想出来的 */
	  /* 这里其实是很重要的知识点:贝塞尔曲线. 但是我录视频的时候忘了讲!!! */
	  /* 因为实在是太困了来着,所以为什么录视频和做视频都拖到两天凌晨,太能拖了叭 */
	  /* 括号里的四个数字两两一组,分别是两个控制点的横坐标和纵坐标 */
	  /* 前面那个点和(时间轴和效果轴的起点(0,0))的连线是第一段曲度的控制线 */
	  /* 后面那个点是和(时间轴和效果轴的终点(1,1))连线是第二段曲度的控制线 */
	  /* 用过钢笔工具的话 就会有一个比较直观的理解 */
	  /* 推荐一个网站:https://cubic-bezier.com/   可以直观地看到效果、拖曳式的调整、复制产生的结果 */

	  /* transform: translateX(-100px); */

	  -webkit-transition: transform .5s cubic-bezier(0.175, 0.285, 0.32, 1.275);
	  -moz-transition: transform .5s cubic-bezier(0.175, 0.285, 0.32, 1.275);
	  -ms-transition: transform .5s cubic-bezier(0.175, 0.285, 0.32, 1.275);
	  -o-transition: transform .5s cubic-bezier(0.175, 0.285, 0.32, 1.275);
	}
	/* 这个时候我又有两个思路了 */
	/* 首先想到的是,在两边各加一块白色的东西 */
	/* form-append{
	  width: 100px;
	  flex-shrink: 0;
	} */
	/* 然后想到的是 */
	/* 看上去好像第一种方法完全没必要 */
	/* 但是这实际上是两种思路啊!!! */

	.login-body form{
	  flex-shrink: 0;
	  /* 使之不会被收缩,百度吧我讲不清我太菜了 */
	  width: 100%;

	  box-sizing: border-box;
	  padding: 22px;

	  position: relative;
	}

	.login-body input{
	  outline: none;
	  width: 100%;
	  box-sizing: border-box;
	  height: 46px;
	  margin-bottom: 25px;
	  background-color: rgba(39, 39, 41, .04);
	  border: 1px solid transparent;
	  border-radius: 8px;
	  -webkit-border-radius: 8px;
	  -moz-border-radius: 8px;
	  -ms-border-radius: 8px;
	  -o-border-radius: 8px;
	  /* 这个插件有点烦的, 如果注释多的话 */
	  /* 这次代码也多, 演示的话我就先把它关了 */
	  /* 源代码里兼容性代码会有的 */
	  /* 好家伙我明明应该已经关了来着 */
	  /* 可能这就是老年痴呆吧 */

	  font-size: 14px;
	  padding: 1px 12px;
	  color: #25262b;/* 看不出来变化吧,哎嘿! */
	}
	.login-body input::placeholder{
	  color: rgba(37, 38, 43, .36);
	}
	.login-body input:focus{
	  border: 1px solid rgba(99, 125, 255, .48);
	  background-color: #fff;
	}

	.m-form .vercode-btn{
	  padding: 4px 12px;
	  border-radius: 6px;
	  font-size: 14px;
	  color: #637dff;
	  background-color: transparent;
	  border: 1px solid rgba(99, 125, 255, .24);

	  position: absolute;
	  right: 36px;
	  margin: 8px 0;

	  -webkit-border-radius: 6px;
	  -moz-border-radius: 6px;
	  -ms-border-radius: 6px;
	  -o-border-radius: 6px;
	}
  .m-form .vercode-btn2{

    padding: 4px 12px;
    border-radius: 6px;
    font-size: 14px;
    color: #5e7080;
    background-color: transparent;
    border: 1px solid rgba(99, 125, 255, .24);

    position: absolute;
    right: 36px;
    top: 96px;
    margin: 8px 0 20px 0;

    -webkit-border-radius: 6px;
    -moz-border-radius: 6px;
    -ms-border-radius: 6px;
    -o-border-radius: 6px;
  }
	/*.login-body .login-btn{*/
	/*  width: 100%;*/
	/*  height: 48px;*/
	/*  border: none;*/
	/*  border-radius: 10px;*/
	/*  background: linear-gradient(*/
	/*    129.12deg,!* 沿着这个角度的线渐变 *!*/
	/*    #446dff,!* 渐变起始颜色 *!*/
	/*    rgba(99, 125 ,255, .75)!* 渐变终点颜色 *!*/
	/*  );!* 为什么数值这么奇怪? -因为我直接copy官方的 *!*/

	/*  color: #fff;*/
	/*  font-size: 16px;*/

	/*  margin-top: 16px;*/
	/*  margin-bottom: 60px;*/
	/*}*/

	/*button{*/
	/*  cursor: pointer;*/
	/*}*/

	.m-form #sure{
	  display: none;
	}
	.m-form label.tobesure{
	  position: absolute;
	  border:  2px solid rgba(132, 133, 141, .2);
	  box-sizing: border-box;
	  width: 16px;
	  height: 16px;
	  border-radius: 50%;
	  cursor: pointer;

	  left: 22px;
	}
	#sure:checked + label.tobesure{
	  background-color: #704de5;
	}
	/* 文字位置安排好了, 现在来整个小勾√ */
	label.tobesure::after{
	  content: '';
	  border:  2px solid #fff;
	  position: absolute;
	  width: 6px;
	  height: 3px;
	  border-top: none;
	  border-right: none;
	  transform: translate(-50%, -50%) rotate(-45deg);
	  /* 先平移再旋转好(方便的那个"好")定位... */
	  /* 这样就形成了一个勾勾 */
	  /* 然后定位至圆圈中间 */
	  top: 45%;
	  left: 50%;
	  /* 等于说重新声明了transform, 所以应该放在一起 */

	  -webkit-transform: translate(-50%,-50%) rotate(-45deg);
	  -moz-transform: translate(-50%,-50%) rotate(-45deg);
	  -ms-transform: translate(-50%,-50%) rotate(-45deg);
	  -o-transform: translate(-50%,-50%) rotate(-45deg);
	  -webkit-transform: translate(-50%,-50%) rotate(-45deg);
	}

	#sure:not(:checked) ~ .login-btn{
    margin-top: 10px;
    opacity: .5;
	  cursor: not-allowed;
	  /* 试了:disabled和unchecked和:not(:checked)都不行,就只好让按钮原本半透明,:checked以后不透明 */
	  /* 结果也没用 */
	  /* 哦是因为元素顺序, 又忘了, 真丢人 */
	  /* 这里懒得复现问题了! 所以是这么个呈现形式! 这是当时的注释! */
	}
  #sure:checked ~ .login-btn{
    margin-top: 10px;
    opacity: 1;
    cursor: pointer;

  }
	label.tobesure{
	  bottom: 45px;
	}
	label.tobesure p{
	  margin: 0;
	  margin-left: 20px;
	  width: 280px;

	  font-size: 12px;
	  line-height: 1.5;
	  color: rgba(37, 38, 43, .36);

	  position: relative;
	  bottom: 3px;
	  /* relative是相对自己原本的位置移动 */
	  /* 这里也就是向上移动3px */
	  /* 其实只是为了一点强迫症 */
	}
	label.tobesure p a{
	  text-decoration: none;
	  color: #637dff;
	  padding: 0 5px;
	}

  button {
    position: relative;
    display: inline-block;
    cursor: pointer;
    outline: none;
    border: 0;
    vertical-align: middle;
    text-decoration: none;
    background: transparent;
    padding: 0;
    font-size: inherit;
    font-family: inherit;
  }

  button.login-btn {
    width: 18.8rem;
    height: auto;
  }

  button.login-btn .circle {
    -webkit-transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
    transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
    position: relative;
    display: block;
    margin: 0;
    width: 3rem;
    height: 3rem;
    background: #676fd7;
    border-radius: 1.625rem;
  }

  button.login-btn .circle .icon {
    -webkit-transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
    transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    background: #fff;
  }

  button.login-btn .circle .icon.arrow {
    -webkit-transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
    transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
    left: 0.625rem;
    width: 1.125rem;
    height: 0.125rem;
    background: none;
  }

  button.login-btn .circle .icon.arrow::before {
    position: absolute;
    content: "";
    top: -0.29rem;
    right: 0.0625rem;
    width: 0.625rem;
    height: 0.625rem;
    border-top: 0.125rem solid #fff;
    border-right: 0.125rem solid #fff;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }

  button.login-btn .button-text {
    -webkit-transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
    transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 0.75rem 0;
    margin: 0 0 0 1.85rem;
    color: #676fd7;
    font-weight: 700;
    line-height: 1.6;
    text-align: center;
    text-transform: uppercase;
  }

  button:hover .circle {
    width: 100%;
  }

  button:hover .circle .icon.arrow {
    background: #fff;
    -webkit-transform: translate(1rem, 0);
    -ms-transform: translate(1rem, 0);
    transform: translate(1rem, 0);
  }

  button:hover .button-text {
    color: #fff;
  }
  .el-dialog {
    border-radius: 15px;
  }
  .el-message-box__wrapper {
    border-radius: 15px;
  }
   .el-button--primary {
    background-color: #6388ff;
    border: none;
  }
  .el-button {
    border: 0 solid #DCDFE6;
    border-radius: 10px;
  }
  @media screen and (max-width:960px) {
    .slide{
      display: none;
    }
    #body{
      background-image: url('/static/bg_m.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;

      user-select: none;
      /* 这样用户点按钮的时候就不会选中文字, 更有沉浸感 */
      /* 唉, 我没有教人做事的意思 */


      height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin: 0;
    }

    .logo{
      width: 150px;
      margin-bottom: 30px;
    }
    .login-btn btn2{
      opacity: 1;
    }
    .login-app{
      border-radius: 50px;
      background: #e0e0e0;
      box-shadow:  7px 14px 13px #bebebe;
      width: 348px;
    }

  }
</style>

