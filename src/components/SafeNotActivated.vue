<template>
<div>
  <div style="height:500px;display: flex;flex-direction:column;justify-content: center;align-items: center">
    <div>
      <img width="300px" height="300px" ref="typeImg" :src="'static/safe.svg' "/>
    </div>
    <span style="color: #6d6e72">您暂未开启保险箱，点击下方按钮激活属于您的保险箱吧！</span>
    <button class="safeBtn"  @click="openPop" style="margin-top: 20px; font-size: 13px">
      <i class="el-icon-unlock" ></i>  激活保险箱
    </button>
  </div>
  <el-dialog
    title="设置保险箱专属密钥"
    :visible.sync="setPasswordDialog"
    width="30%"
    center
    >
    <span style="color: #a2a2a2; font-size: 12px">密钥为6-20位，需包含字母和数字</span>
    <div style="height: 200px; display: flex;flex-direction: column;justify-content: space-evenly;align-items: center;flex-wrap: wrap">
      <el-input  placeholder="请输入密钥" v-model="createSafeCode" show-password @change="judge1"></el-input>
      <el-input placeholder="确认密钥" v-model="confirmCode" show-password @change="judge2"></el-input>
      <el-button type="primary" @click="activate" :loading="submit">确 定</el-button>
    </div>

  </el-dialog>
</div>
</template>

<script>

export default {
  data() {
    return{
      submit: false,
      createSafeCode:'',
      confirmCode:'',
      setPasswordDialog: false,
      judgeResult: false,
      judge1Result: false,
    }
  },
  methods:{
    openPop() {
      this.setPasswordDialog = true;
    },
    activate() {
      if (this.judgeResult) {
        this.submit = true;
        this.$axios({
          url: '/safe/activate',
          method: 'POST',
          params: {
            safeCode:this.createSafeCode
          }
        }).then(res => {
          this.$loading.hideLoading();
          if (res.data.code === 200) {
            this.$notifySuccess('激活成功');

            this.setPasswordDialog = false;
            this.$parent.check()
          }
        })
      }
    },
    judge1() {
      const pwdRegex = new RegExp('(?=.*[0-9])(?=.*[a-zA-Z]).{6,20}');
      if (!pwdRegex.test(this.createSafeCode)) {
        this.$notifyWarning('密钥为6-20位，需包含字母和数字');

      }else {
        this.judge1Result = true;
      }
    },
    judge2() {
      if (!this.judge1Result) {
        this.$notifyWarning('密钥为6-20位，需包含字母和数字');

        return;
      }
      if (this.createSafeCode !== this.confirmCode) {
        this.$notifyWarning('两次密钥不一致');

      }else {
        this.judgeResult = true;
      }
    }
  },
  name: "SafeNotActivated"
}
</script>

<style scoped>
.safeBtn {background-image: linear-gradient(to right, #6388ff 0%, #94a8f6 51%, #6388ff 100%)}

.safeBtn {
  /*margin: 10px;*/
  text-align: center;
  /*text-transform: uppercase;*/
  transition: 0.5s;
  background-size: 200% auto;
  color: white;
  /*box-shadow: 0 0 20px #eee;*/
  border-radius: 10px;
  display: block;
  cursor: pointer;
  border: none;
  width: 120px;
  height: 40px;
}

.safeBtn:hover {
  background-position: right center; /* change the direction of the change here */
  color: #fff;
  text-decoration: none;
}

/deep/ .el-input__inner{
  background-color: #e9e9e9;
}
</style>
