<template>
  <div>
    <el-container>
      <el-aside width="260px">
        <el-col :span="24">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#fff"
            text-color="#000"
            active-text-color="#107ab9"
            router>
            <el-row :span="24" class="block"  style="height: 200px;display: flex;flex-direction: column;justify-content: center;align-items: center" >
            <el-avatar @click.native="drawer = true"  :size="0" :src="circleUrl" style="width: 72px; height: 72px;cursor: pointer;"></el-avatar>
              <br>
              <span>{{user.name}}</span>
              <el-tooltip class="item" effect="dark" content="安全退出" placement="top">
                <i class="el-icon-switch-button" @click="logout"></i>
              </el-tooltip>
            </el-row>


            <el-drawer
              title="个人主页"
              :visible.sync="drawer"
              :direction="direction"
              size="25%"
              >
              <el-drawer
                size="35%"
                style="margin-left: 25%"
                title="修改手机号"
                :append-to-body="true"
                :before-close="handleInnerClose"
                :visible.sync="innerDrawer"
                :direction="direction"
                :modal="false">
                <div style="display: flex;flex-direction: column;justify-content: center;align-items: center">
                  <el-form :label-position="labelPosition" label-width="80px" >
                    <el-form-item required label="手机号">
                      <el-input disabled v-model="user.phoneNumber"></el-input>
                    </el-form-item>
                    <el-form-item required label="新手机号">
                      <el-input v-model="newPhoneNumber"></el-input>
                    </el-form-item>
                    <el-form-item required label="验证码">
                      <el-input v-model="changePhoneVerifyCode">

                      </el-input>
                    </el-form-item>

                    <el-form-item >
                      <el-button @click="sendSmsVerifycode" v-show="canSend">获取验证码</el-button>
                      <el-button class="vercode-btn2" v-show="!canSend">{{ time }}秒后重试</el-button>

                      <el-button type="primary" @click="changePhoneNumber">立即修改</el-button>
                    </el-form-item>
                      <el-alert
                        title="注意"
                        type="warning"
                        :closable="false"
                        style="width: 100%;display: flex;align-content: center; border-radius: 20px"
                        description="修改手机号会同时修改登录账号！"
                        show-icon>
                      </el-alert>
                  </el-form>
                </div>
                </el-drawer>

              <el-drawer
                size="35%"
                style="margin-left: 25%"
                title="修改密码"
                :append-to-body="true"
                :before-close="handleInnerClose"
                :visible.sync="passwordDrawer"
                :direction="direction"
                :modal="false">
                <div style="display: flex;flex-direction: column;justify-content: center;align-items: center">
                  <el-form :label-position="labelPosition" label-width="80px" >
                    <el-form-item required label="旧密码" type="password">
                      <el-input v-model="oldPassword"></el-input>
                    </el-form-item>
                    <el-form-item required label="新密码">
                      <el-input v-model="newPassword" type="password"></el-input>
                    </el-form-item>
                    <el-form-item required label="确认密码" >
                      <el-input v-model="repeatPassword" type="password">

                      </el-input>
                    </el-form-item>

                    <el-form-item >
                      <el-button type="primary" @click="changePassword">立即修改</el-button>
                    </el-form-item>
                  </el-form>
                </div>


              </el-drawer>
              <div style="display: flex; flex-direction: column;justify-content: center;align-items: center">
                <el-upload
                  :http-request="uploadAvator"
                  class="avatar-uploader"
                  ref="uploadAvator"
                  action="#"
                  :show-file-list="false"
                  :limit="1"
                  :auto-upload="true">
                  <img v-if="user.avator" :src="user.avator" class="avatar">
                  <i  class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <br />
                <span v-if="!editName">{{user.name}} <i class="el-icon-edit" @click="editNameInput"></i> </span>
                <el-input maxlength="10" show-word-limit @blur="submitEditName" v-if="editName" v-model="user.name" :value="user.name" style="width: 70%"></el-input>
              </div>
              <br />


              <el-descriptions class="margin-top"  :column="1" :size="size" border>
                <el-descriptions-item>

                  <template slot="label">
                    <i class="el-icon-user"></i>
                    账号
                  </template>
                  {{ user.account }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-mobile-phone"></i>
                    手机号
                  </template>
                  {{ user.phoneNumber }}
                  <i class="el-icon-edit" @click="innerDrawer = true" />
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-location-outline"></i>
                    注册时间
                  </template>
                  {{user.createTime == null ? "暂无数据":user.createTimeStr}}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-location-outline"></i>
                    上次登录
                  </template>
                  {{user.lastLoginTimeStr == null ? "暂无数据":user.lastLoginTimeStr}}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-tickets"></i>
                    密码
                  </template>
                  <el-tag size="small" type="success" style="cursor:pointer;" @click="passwordDrawer = true"><i class="el-icon-edit"  />修改密码</el-tag>
                </el-descriptions-item>

              </el-descriptions>


            </el-drawer>

            <el-row>
            <el-menu-item index="/file">
              <i class="el-icon-folder"></i>
              <span slot="title">文件</span>
            </el-menu-item>
<!--            <el-menu-item index="/booth">-->
<!--              <i class="el-icon-picture-outline"></i>-->
<!--              <span slot="title">相册</span>-->
<!--            </el-menu-item>-->

                <el-menu-item index="/upload">
                  <el-badge :value="uploadSize" class="item" type="primary" :hidden="dotHidden">
                    <div>
                      <i class="el-icon-top"></i>
                      <span slot="title">上传列表</span>
                    </div>
                  </el-badge>
                </el-menu-item>
              <el-menu-item index="/tag">
                <i class="el-icon-star-off"></i>
                <span slot="title">收藏夹</span>
              </el-menu-item>
              <el-menu-item index="/my-share">
                <i class="el-icon-share"></i>
                <span slot="title">我的分享</span>
              </el-menu-item>
              <el-menu-item index="/safe">
                <i class="el-icon-lock"></i>
                <span slot="title">保险箱</span>
              </el-menu-item>
              <el-menu-item index="/bin">
                <i class="el-icon-delete"></i>
                <span slot="title">回收站</span>
              </el-menu-item>
              <div class="space">
                <el-progress color="rgb(123, 103, 238)" :percentage="usedSpacePercentage" :format="format" style="margin: 20px 0 0 0; width: 190px;"></el-progress>
                <el-tooltip class="item" effect="dark" content="提升容量" placement="top">
                  <i class="el-icon-circle-plus-outline" @click="extendSpace"></i>
                </el-tooltip>
              </div>

            </el-row>
              <img src="../assets/logo.svg" width="150" alt="" style="position: fixed;bottom: 6%;left: 47px">

          </el-menu>

        </el-col>

      </el-aside>

      <el-main >
        <context-menu></context-menu>
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
      </el-main>
    </el-container>

  </div>


</template>

<script>
import ContextMenu from "./ContextMenu";
export default {
  components: {ContextMenu},
  data() {
    return {
      usedSpacePercentage: 0,
      space: '加载中',
      dotHidden: true,
      oldPassword:'',
      newPassword:'',
      repeatPassword:'',
      passwordDrawer: false,
      canSend: true,
      changePhoneVerifyCode:'',
      newPhoneNumber:'',
      labelPosition: 'right',
      size:'',
      editName: false,
      updateUser:{},
      innerDrawer: false,
      circleUrl: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201608%2F02%2F20160802001436_CtfiH.jpeg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1638626527&t=602b108fc924c9951d6821712bb03b25",
      drawer: false,
      direction: 'ltr',
      user: "admin",
      time: 60,
      uploadSize:0,
    }
  },
  methods:{
    extendSpace() {
      this.$prompt('<div style="display: flex; justify-content: center"><svg t="1648907874660" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3572" width="150" height="150"><path d="M192 344.533333v334.933334a21.333333 21.333333 0 0 0 10.88 18.56l298.666667 168.106666a21.333333 21.333333 0 0 0 21.333333 0l298.666667-167.893333a21.333333 21.333333 0 0 0 10.88-18.56V344.533333a21.333333 21.333333 0 0 0-10.88-18.56l-298.666667-168.106666a21.333333 21.333333 0 0 0-21.333333 0l-298.666667 168.106666a21.333333 21.333333 0 0 0-10.88 18.56z" fill="#D9ECFF" p-id="3573"></path><path d="M512 890.24a42.666667 42.666667 0 0 1-21.333333-5.333333L192 716.8a42.666667 42.666667 0 0 1-21.333333-37.12V344.533333a42.666667 42.666667 0 0 1 21.333333-37.12l298.666667-168.106666a42.666667 42.666667 0 0 1 42.666666 0l298.666667 167.893333a42.666667 42.666667 0 0 1 21.333333 37.12v335.146667a42.666667 42.666667 0 0 1-21.333333 37.12l-298.666667 168.106666a42.666667 42.666667 0 0 1-21.333333 5.546667z m0-713.813333l-298.666667 168.106666v334.933334l298.666667 168.106666 298.666667-167.893333V344.533333z" fill="#409EFF" p-id="3574"></path><path d="M522.24 506.24l279.893333-157.44a20.053333 20.053333 0 0 1 29.866667 17.493333v314.026667a20.053333 20.053333 0 0 1-10.24 17.493333L541.866667 855.253333a20.053333 20.053333 0 0 1-29.866667-17.493333V523.733333a20.053333 20.053333 0 0 1 10.24-17.493333z" fill="#FFFFFF" p-id="3575"></path><path d="M532.053333 879.146667A41.386667 41.386667 0 0 1 490.666667 837.76V523.733333a41.386667 41.386667 0 0 1 21.333333-36.053333l280.106667-157.44A41.386667 41.386667 0 0 1 853.333333 366.293333v314.026667a41.386667 41.386667 0 0 1-21.333333 36.053333L552.32 874.666667a41.386667 41.386667 0 0 1-20.266667 4.48zM533.333333 524.373333v311.253334l277.333334-156.373334V368.64z m0 0z" fill="#409EFF" p-id="3576"></path><path d="M600.106667 561.28l144-80.213333v161.706666l-144 80.213334v-161.706667z" fill="#E6A23C" p-id="3577"></path><path d="M722.773333 517.546667v112l-101.333333 56.96v-112l101.333333-56.96m22.613334-58.88a19.84 19.84 0 0 0-9.813334 2.56l-146.773333 82.56a20.053333 20.053333 0 0 0-10.24 17.493333V725.333333a20.053333 20.053333 0 0 0 29.866667 17.493334l146.773333-82.56a20.053333 20.053333 0 0 0 10.24-17.493334v-164.053333a20.053333 20.053333 0 0 0-20.053333-20.053333z" fill="#E6A23C" p-id="3578"></path><path d="M221.866667 348.8l280.106666 157.44a20.053333 20.053333 0 0 1 10.24 17.493333v314.026667a20.053333 20.053333 0 0 1-29.866666 17.493333L202.24 697.813333a20.053333 20.053333 0 0 1-10.24-17.493333V366.293333a20.053333 20.053333 0 0 1 29.866667-17.493333z" fill="#D9ECFF" p-id="3579"></path><path d="M491.946667 879.146667a41.386667 41.386667 0 0 1-21.333334-5.333334L192 716.373333a41.386667 41.386667 0 0 1-21.333333-36.053333V366.293333a41.386667 41.386667 0 0 1 61.653333-36.053333L512 487.68a41.386667 41.386667 0 0 1 21.333333 36.053333v314.026667a41.386667 41.386667 0 0 1-41.386666 41.386667zM213.333333 368v312.106667l277.333334 155.306666V523.733333z" fill="#409EFF" p-id="3580"></path></svg></div>', '输入暗号', {
        confirmButtonText: '确定',
        showCancelButton: false,
        dangerouslyUseHTMLString: true,
        inputPattern: /\S/,
        inputErrorMessage: '暗号不能为空噢',
        center: true,
        closeOnClickModal: true,
        roundButton: true
      }).then(({value}) => {
        this.$axios({
          url:'/extendCode/match',
          method: "POST",
          params: {
            code: value,
          }
        }).then(res => {
          // console.log(res)
          if (res.data.code === 200) {
            this.$notifySuccess(res.data.data)
            this.getUserSpaceInfo()
          }else {
            this.$notifyWarning(res.data.message)
          }
        }).catch(e => {
          console.log(e)
          this.$notifyError(e.response.message)

        })
      }).catch(() => {
      });
    },
    getUserSpaceInfo() {
      // axios get请求
      this.$axios.get('/file/space').then(res => {
        this.space = res.data.data.spaceStr;
        this.usedSpacePercentage = res.data.data.used / res.data.data.total * 100;
      }).catch(err => {
        console.log(err);
      })
    },
    format() {
      return this.space;
    },
    changePassword() {
      if (!this.oldPassword) {
        this.$notifyWarning('请输入旧密码')

        return false;
      }
      if (this.newPassword.length < 6) {
        this.$notifyWarning('密码长度不能小于6位')

        return false;
      }
      if (this.newPassword !== this.repeatPassword) {
        this.$notifyWarning('两次密码不一致')

        return false;
      }
      this.$axios({
        url: "/user/updatePassword",
        method:"POST",
        params: {
          oldPassword : this.oldPassword,
          newPassword: this.newPassword,
          userId: this.user.id
        }
      }).then(res=>{
        if (res.data.code === 200) {
          this.$notifySuccess('修改成功！请重新登录')

          this.logout();
        }else {
          this.$notifyError(res.data.message)

        }
      }).catch(e => {
        console.log(e)
        this.$notifyError('服务异常，请稍后再试')

        console.log(e);
      })
    },
    changePhoneNumber() {

      if (!this.newPhoneNumber) {
        this.$notifyWarning('请输入新手机号')

        return false;
      }
      if(!/^1[3|4|5|7|8]\d{9}$/.test(this.newPhoneNumber)){
        this.$notifyWarning('请输入正确的手机号')

        return false;
      }
      if(!this.changePhoneVerifyCode){
        this.$notifyWarning('请输入验证码')

        return false;
      }
      this.$axios({
        url: "/user/updatePhoneNumber",
        method:"POST",
        params: {
          phoneNumber : this.newPhoneNumber,
          code: this.changePhoneVerifyCode,
          userId: this.user.id
        }
      }).then(res=>{
        if (res.data.code === 200) {
          this.$notifySuccess('修改成功！请重新登录')

          this.logout();
        }else {
          this.$notifyError(res.data.message)

        }
      }).catch(e => {
        console.log(e)
        this.$notifyError('服务异常，请稍后再试')

      })
    },
    sendSmsVerifycode() {
      if (!this.newPhoneNumber) {
        this.$notifyWarning('请输入新手机号')

        return false;
      }
      if(!/^1[3|4|5|7|8]\d{9}$/.test(this.newPhoneNumber)){
        this.$notifyWarning('请输入正确的手机号')

        return false;
      }
      this.$axios({
        url: "/user/sms/sendCode",
        method:"get",
        params: {
          phoneNumber : this.newPhoneNumber
        }
      }).then(res=>{
        if (res.data.code === 200) {
          this.$notifySuccess('验证码发送成功！')

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
        console.log(e)
        this.$notifyError('服务异常，请稍后再试')

        console.log(e);
      })
    },
    uploadAvator(val) {
      this.$refs.uploadAvator.clearFiles();
      let file = val.file

      const isJPG = file.type === 'image/jpeg';
      const isPNG = file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG && !isPNG) {
        this.$notifyWarning('上传头像图片只能是 JPG/PNG 格式!');
        return
      }
      if (!isLt2M) {
        this.$notifyWarning('上传头像图片大小不能超过 2MB!');
        return;
      }
      let formData = new FormData();
      formData.append("file", file)
      formData.append("userId", this.user.id)
      this.$axios({
        url:"/user/avator",
        method:"POST",
        headers: { "Content-Type": "multipart/form-data" },
        data: formData
      }).then(res => {
        if (res.data.code === 200) {
          this.$notifySuccess('上传成功！')

          this.updateUser.avator = res.data.data
          this.circleUrl = res.data.data
          this.currentUser()
          this.$refs.uploadAvator.clearFiles(); //上传成功之后清除历史记录

        }else {
          this.$notifyError(res.data.message)

        }
      }).catch(e => {
        console.log(e)
        this.$notifyError('服务异常，请稍后再试')

      })
    },
    submitEditName() {
      this.updateUser.name = this.user.name
      this.$axios({
        url:"/user/update",
        method:"POST",
        params: {
          userId: this.user.id
        },
        data: {
          name: this.updateUser.name,
          avator: this.updateUser.avator
        }
      }).then(res => {
        if (res.data.code === 200) {
          this.$notifySuccess('修改成功！')

          this.currentUser();
          this.editName = false
        }
      }).catch(e => {
        console.log(e)
        this.$notifyError('服务异常，请稍后再试')

        this.editName = false

      })
    },
    editNameInput() {
      this.editName = true;
    },
    currentUser() {
      this.$axios.get("/user/currentUser").then(res => {
        if (res.data.code === 200) {
          this.circleUrl = res.data.data.avator,
            this.user = res.data.data
        }

      })
    },
    handleInnerClose(done) {
      done();
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    logout() {
      this.$axios.post("/logout").then(res => {
        if (res.data.code === 200) {
          this.$notifySuccess('退出成功！')

          this.$router.push("/")
        }
      }).catch(e => {
        console.log(e)
        this.$notifyError('服务异常，请稍后再试')

      })
    }


  },
  created() {
    this.currentUser();
    this.getUserSpaceInfo()
    this.$bus.$on('uploadSize', data => {
      // console.log(data)
      if (data === 0) {
        this.dotHidden = true;
      }else {
        this.dotHidden = false;
        this.uploadSize = data;

      }
      // undefined
      // console.log(this.uploadArr.length)
      // if (this.uploadArr.length > 0) {
      //   this.hasProgressContent = true;
      // }
      // console.log(this.hasProgressContent)
      // console.log(this.uploadArr)
    })
    // this.$router.push('/file')
  },
  name: "Main"
}
</script>

<style scoped>
body > .el-container {
  margin-bottom: 40px;
  height: 100%;
}
.aside{
  background-color: #ffffff;
}
.el-aside {
  height: 100vh;
  width: 340px;
  opacity: 1;
  background-color: #ffffff;
  box-shadow: 0.5rem 0 1rem rgba(0,0,0,.1)!important;
}

.el-main {
  height: 100%;
  padding-top: 28px;
  -ms-flex: 1 1;
  flex: 1 1;
  position: relative;
}
.el-icon-switch-button{
  font-size: 1.3em;
  margin-top: 10px;
  cursor: pointer;
}
.el-icon-switch-button:hover{
  color: #e63a62;
}
.el-icon-circle-plus-outline{
  font-size: 1.3em;
  margin-top: 10px;
  cursor: pointer;
}
.el-icon-circle-plus-outline:hover{
  color: rgb(123, 103, 238);
}
.el-icon-switch-button:hover{
  color: #e63a62;
}
.avatar-uploader {
  width: 72px;
  height: 72px;
  border: 1px dashed #d9d9d9;
  border-radius: 100px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader:hover {
  border-color: #13739b;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #273d5c;
  width: 72px;
  height: 72px;
  line-height: 72px;
  text-align: center;
}
.avatar {
  width: 72px;
  height: 72px;
  display: block;
  border-radius: 100px;
}
.el-icon-edit{
  cursor: pointer;
}
.el-icon-edit:hover{
  color: rgb(123, 103, 238);
}
/deep/ .el-badge__content{
  top: 29px;
  right: -6px;
  border: none;
  background: #6388ff;
}
/deep/ .el-menu-item:hover{
  outline: 0 !important;
  background-color: rgb(238, 238, 250) !important;
}

.space{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
/deep/ .el-tag.el-tag--success{
  background-color: #7b67ed;
  border: none;
  color: white;
}
/*/deep/ .el-menu-item.is-active {*/
/*  color: #fff !important;*/
/*  background: #9a1397 !important;*/
/*}*/

</style>

