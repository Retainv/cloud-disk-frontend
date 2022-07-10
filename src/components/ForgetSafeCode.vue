<template>
  <div>
    <el-dialog @close="closeDialog" center title="重置密码" :visible.sync="forgetSafeCodeVisible" width="30% ">
      <div style="display: flex;flex-direction: column;justify-content: center;align-items: center">
        <el-form :label-position="labelPosition" label-width="80px" >
          <el-form-item required label="手机号">
            <el-input disabled v-model="user.phoneNumber"></el-input>
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
            <el-button @click="sendSmsVerifycode" v-show="canSend">获取验证码</el-button>
            <el-button class="vercode-btn2" v-show="!canSend">{{ time }}秒后重试</el-button>

            <el-button type="primary" @click="changePassword">立即修改</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>

  </div>
</template>

<script>
export default {
  data() {
    return{
      newPassword:'',
      repeatPassword:'',
      verifyCode:'',
      user:{},
      canSend:true,
      labelPosition: 'right',
      size:''
    }
  },
  methods:{
    sendSmsVerifycode() {
      if (!this.user.phoneNumber) {
        this.$message({
          message: '获取手机号出错！',
          type: 'error'
        });
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
          this.$message({
            message: '短信验证码已发送！',
            type: 'success'
          });
          this.canSend = false;
          clearInterval(timer);
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
        this.$message({
          message: '服务异常，请稍后再试',
          type: 'error'
        });
        console.log(e);
      })
    },
    changePassword() {
      if (!this.verifyCode) {
        this.$message({
          message: '请输入验证码！',
          type: 'error'
        });
        return false;
      }
      if (this.newPassword.length < 6) {
        this.$message({
          message: '密码长度需不少于6位！',
          type: 'error'
        });
        return false;
      }
      if (this.newPassword !== this.repeatPassword) {
        this.$message({
          message: '两次密码输入不一致！',
          type: 'error'
        });
        return false;
      }
      this.$axios({
        url: "/user/forgetPassword",
        method:"POST",
        data: {
          phoneNumber: this.user.phoneNumber,
          newPassword: this.newPassword,
          userId: this.user.id,
          verifyCode: this.verifyCode
        }
      }).then(res=>{
        if (res.data.code === 200) {
          this.$message({
            message: '密码重置成功！',
            type: 'success'
          });
        }else {
          this.$message({
            message: res.data.message,
            type: 'error'
          });
        }
      }).catch(e => {
        this.$message({
          message: '服务异常，请稍后再试',
          type: 'error'
        });
        console.log(e);
      })
    },
    currentUser() {
      this.$axios.get("/user/currentUser").then(res => {
        if (res.data.code === 200) {
          this.user = res.data.data
        }
      })
    }
  },
  created() {
    this.currentUser()
  },
  name: "ForgetPassword"
}
</script>

<style scoped>

</style>
