<template>
  <div>
    <safe-not-activated v-if="!safeOn"></safe-not-activated>
<!--    <safe-default-page></safe-default-page>-->
    <div v-if="defaultVisible"  style="height:500px;display: flex;flex-direction:column;justify-content: center;align-items: center">
      <div>
        <img width="300px" height="300px" ref="typeImg" :src="'static/safe_default.svg' "/>
      </div>
      <span style="color: #6d6e72">专属于您的保险箱，保障您的文件隐私</span>
      <button class="closeSafeBtn"  @click="enterSafe" style="margin-top: 20px; font-size: 13px">
        <i class="el-icon-unlock" ></i>  进入保险箱
      </button>
    </div>
    <el-dialog
      title="输入保险箱专属密钥"
      :visible.sync="showEnter"
      width="30%"
      :show-close="showCloseDialog"
      center
    >
      <span style="color: #a2a2a2; font-size: 12px;">请输入保险箱密钥</span>
      <div style="height: 200px; display: flex;flex-direction: column;justify-content: space-evenly;align-items: center;flex-wrap: wrap;margin-top: -13px">
        <el-input  placeholder="请输入密钥" v-model="enterSafeCode" show-password ></el-input>
        <el-link @click="forgetSafeCodeVisible = true" type="warning" :underline="false" style="margin: -22px -130px -26px 139px">忘记密码</el-link>
        <el-button type="primary" @click="matchSafeCode" :loading="submit">确 定</el-button>
      </div>

    </el-dialog>

    <div v-if="codeRight">
      <div class="header" >
        <div id="navi">
          <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-left: 50px">
            <el-breadcrumb-item @click.native="jumpToDir('')"><a href="javascript:" >文件</a></el-breadcrumb-item>

            <el-breadcrumb-item @click.native="jumpToDir(item)" v-for="item in prefixList" :key="item"><a href="javascript:">{{item}} </a></el-breadcrumb-item>
          </el-breadcrumb>
        </div>

        <button class="closeSafeBtn"  @click="lockSafe" style="margin-right: 50px;font-size: 13px">
          <i class="el-icon-price-tag" ></i>  锁定保险箱
        </button>
      </div>

      <blank-content v-if="!hasContent"></blank-content>
      <div v-if="hasContent" style="
 height:71vh ;display: flex;flex-direction: row; flex-wrap: wrap; overflow: auto; padding: 30px">
        <div @click="handleClickFile(item)" @contextmenu.prevent="onContextmenu(item)" class="item-box" v-for="item in files" style="display: flex; flex-direction: column; justify-content: space-around;align-items: center">
          <div >
            <img width="65px" height="65px" ref="typeImg" :src=" supportedTypes.findIndex(type =>type ===item.type.toLowerCase()) !== -1 ? 'static/fileType/'+item.type.toLowerCase()+'.svg' : 'static/fileType/unknow.svg' "/>
          </div>
          <div style="display: flex; flex-direction: column; justify-content: center; align-items: center">
            <span class="fileSpan" ref="fileName" style="display:-webkit-box;overflow:hidden;text-overflow:ellipsis;-webkit-line-clamp:2;-webkit-box-orient:vertical; width: 100px">{{item.name}}</span>
            <span style="font-size: 13px; color: #8c939d;margin-top: 5px;" ref="updatedTime">{{ item.lastModified }}</span>
          </div>

        </div>
      </div>
    </div>
    <el-dialog center title="移出保险箱" :visible.sync="outVisible" width="30% ">

      <div  style="display: flex;flex-direction: column; align-items: center;">
        <svg t="1637300192737" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5190" width="64" height="64"><path d="M510.082 510.104m-445.605 0a445.605 445.605 0 1 0 891.21 0 445.605 445.605 0 1 0-891.21 0Z" fill="#FF7A5B" p-id="5191"></path><path d="M686.679 659.47a0.074 0.074 0 0 1-0.021 0H330.145a10.001 10.001 0 0 1-8.784-14.78l178.257-327.597a10 10 0 0 1 17.568 0l177.968 327.066a9.955 9.955 0 0 1 1.525 5.311c0 5.522-4.478 10-10 10z m-339.709-20h322.862L508.401 342.795 346.97 639.47z" fill="#FFFFFF" p-id="5192"></path><path d="M522.466 592.67c2.787 2.705 4.185 6.06 4.185 10.068 0 3.662-1.397 6.89-4.185 9.677-2.791 2.791-6.105 4.185-9.938 4.185-3.837 0-7.106-1.394-9.807-4.185-2.705-2.787-4.054-6.015-4.054-9.677 0-4.009 1.349-7.363 4.054-10.068 2.701-2.701 5.97-4.054 9.807-4.054 3.833 0 7.147 1.353 9.938 4.054z m-2.746-35.046c1.479-1.654 2.223-4.486 2.223-8.499V430.912c0-4.356-0.743-7.278-2.223-8.761-1.483-1.479-3.882-2.223-7.192-2.223-3.314 0-5.712 0.785-7.192 2.354-1.483 1.569-2.223 4.36-2.223 8.369v118.735c0 4.014 0.739 6.8 2.223 8.369 1.479 1.569 3.878 2.354 7.192 2.354 3.311 0 5.709-0.826 7.192-2.485z" fill="#FFFFFF" p-id="5193"></path></svg>
        <span style="color: #6d6e72; margin-top: 20px">确定移出保险箱吗？</span>
        <span style="color: rgb(221 60 60); margin-top: 20px;">移出后会恢复到原文件位置</span>
      </div>

      <div slot="footer" class="dialog-footer">
        <!--        <el-button @click="dialogTableVisible = false">取 消</el-button>-->
        <el-button type="primary" @click="moveOutSafe">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog center title="移入回收站" :visible.sync="binVisible" width="30% ">

      <div  style="display: flex;flex-direction: column; align-items: center;">
        <svg t="1637300192737" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5190" width="64" height="64"><path d="M510.082 510.104m-445.605 0a445.605 445.605 0 1 0 891.21 0 445.605 445.605 0 1 0-891.21 0Z" fill="#FF7A5B" p-id="5191"></path><path d="M686.679 659.47a0.074 0.074 0 0 1-0.021 0H330.145a10.001 10.001 0 0 1-8.784-14.78l178.257-327.597a10 10 0 0 1 17.568 0l177.968 327.066a9.955 9.955 0 0 1 1.525 5.311c0 5.522-4.478 10-10 10z m-339.709-20h322.862L508.401 342.795 346.97 639.47z" fill="#FFFFFF" p-id="5192"></path><path d="M522.466 592.67c2.787 2.705 4.185 6.06 4.185 10.068 0 3.662-1.397 6.89-4.185 9.677-2.791 2.791-6.105 4.185-9.938 4.185-3.837 0-7.106-1.394-9.807-4.185-2.705-2.787-4.054-6.015-4.054-9.677 0-4.009 1.349-7.363 4.054-10.068 2.701-2.701 5.97-4.054 9.807-4.054 3.833 0 7.147 1.353 9.938 4.054z m-2.746-35.046c1.479-1.654 2.223-4.486 2.223-8.499V430.912c0-4.356-0.743-7.278-2.223-8.761-1.483-1.479-3.882-2.223-7.192-2.223-3.314 0-5.712 0.785-7.192 2.354-1.483 1.569-2.223 4.36-2.223 8.369v118.735c0 4.014 0.739 6.8 2.223 8.369 1.479 1.569 3.878 2.354 7.192 2.354 3.311 0 5.709-0.826 7.192-2.485z" fill="#FFFFFF" p-id="5193"></path></svg>
        <span style="color: #6d6e72; margin-top: 20px">确定移动到回收站吗？</span>
        <span style="color: rgb(221 60 60); margin-top: 20px;">移入后可进入回收站恢复该文件</span>
      </div>

      <div slot="footer" class="dialog-footer">
        <!--        <el-button @click="dialogTableVisible = false">取 消</el-button>-->
        <el-button type="primary" @click="moveToBin">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog center title="不支持的文件类型" :visible.sync="notSupportVisible" width="30% ">

      <div  style="display: flex;flex-direction: column; align-items: center;">
        <svg t="1637300192737" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5190" width="64" height="64"><path d="M510.082 510.104m-445.605 0a445.605 445.605 0 1 0 891.21 0 445.605 445.605 0 1 0-891.21 0Z" fill="#FF7A5B" p-id="5191"></path><path d="M686.679 659.47a0.074 0.074 0 0 1-0.021 0H330.145a10.001 10.001 0 0 1-8.784-14.78l178.257-327.597a10 10 0 0 1 17.568 0l177.968 327.066a9.955 9.955 0 0 1 1.525 5.311c0 5.522-4.478 10-10 10z m-339.709-20h322.862L508.401 342.795 346.97 639.47z" fill="#FFFFFF" p-id="5192"></path><path d="M522.466 592.67c2.787 2.705 4.185 6.06 4.185 10.068 0 3.662-1.397 6.89-4.185 9.677-2.791 2.791-6.105 4.185-9.938 4.185-3.837 0-7.106-1.394-9.807-4.185-2.705-2.787-4.054-6.015-4.054-9.677 0-4.009 1.349-7.363 4.054-10.068 2.701-2.701 5.97-4.054 9.807-4.054 3.833 0 7.147 1.353 9.938 4.054z m-2.746-35.046c1.479-1.654 2.223-4.486 2.223-8.499V430.912c0-4.356-0.743-7.278-2.223-8.761-1.483-1.479-3.882-2.223-7.192-2.223-3.314 0-5.712 0.785-7.192 2.354-1.483 1.569-2.223 4.36-2.223 8.369v118.735c0 4.014 0.739 6.8 2.223 8.369 1.479 1.569 3.878 2.354 7.192 2.354 3.311 0 5.709-0.826 7.192-2.485z" fill="#FFFFFF" p-id="5193"></path></svg>
        <span style="color: rgb(221 60 60); margin-top: 20px;">暂不支持该文件类型的在线预览</span>
      </div>

      <div slot="footer" class="dialog-footer">
        <!--        <el-button @click="dialogTableVisible = false">取 消</el-button>-->
        <el-button type="primary" @click.native="closePreviewDialog">确 定</el-button>
      </div>
    </el-dialog>
    <s-share v-if="shareVisible" :item="this.selectedFile" :visible="this.shareVisible" @openShare="closeShare"></s-share>
    <el-dialog  center title="重置密钥" :visible.sync="forgetSafeCodeVisible" width="30% ">
      <div style="display: flex;flex-direction: column;justify-content: center;align-items: center">
        <el-form :label-position="labelPosition" label-width="80px" >
          <el-form-item required label="手机号">
            <el-input disabled v-model="user.phoneNumber"></el-input>
          </el-form-item>

          <el-form-item required label="验证码">
            <el-input v-model="verifyCode">

            </el-input>
          </el-form-item>
          <el-form-item required label="新密钥">
            <el-input v-model="newSafeCode" type="password"></el-input>
          </el-form-item>
          <el-form-item required label="确认密钥" >
            <el-input v-model="repeatSafeCode" type="password">

            </el-input>
          </el-form-item>
          <el-form-item >
            <el-button @click="sendSmsVerifycode" v-show="canSend">获取验证码</el-button>
            <el-button class="vercode-btn2" v-show="!canSend">{{ time }}秒后重试</el-button>

            <el-button type="primary" @click="changeSafeCode">立即修改</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
    <preview-pop :visible.sync="preViewPopUp" :title='selectedFile.name' class="dialog-middle" @close="closePreview">
      　　<div style="height:100%;">
      <iframe id="show-iframe" frameborder="0" scrolling="yes" style="background-color:transparent;width: 100%;
         height:100%; top: 0;left:0;bottom:0;" :src='previewUrl'></iframe>
    </div>

    </preview-pop>
  </div>

</template>

<script>
import {client, getFileNameUUID} from "../../tools/oss";
import fileDownload from "js-file-download";
import {showLoading} from "../../tools/loading";
import sShare from "../Share";
import SafeNotActivated from "../SafeNotActivated";
import BlankContent from "../BlankContent";
import {Message} from "element-ui";
import PreviewPop from "../PreviewPop";
import Vue from "vue";
export default {

  data(){
    return{
      previewUrl: '',
      preViewPopUp: false,
      newSafeCode:'',
      repeatSafeCode:'',
      verifyCode:'',
      user:{},
      time:60,
      canSend:true,
      labelPosition: 'right',
      size:'',
      forgetSafeCodeVisible: false,
      notSupportVisible: false,
      entered: false,
      hasContent: false,
      defaultVisible: true,
      outVisible:false,
      binVisible: false,
      showCloseDialog: false,
      showEnter: false,
      codeRight: false,
      submit: false,
      enterSafeCode: '',
      enterSafeDialog: false,
      safeOn: false,
      shareVisible: false,
      selectedFile: {},
      value:'',
      dialogTableVisible:false,
      menuVisible:false,
      list:3,
      supportedTypes:['ini','jar','json', 'md', 'properties', 'tar', 'wav', 'xml', 'yaml', 'yml','mp3','3d','pptx','db','dir','exe','gif','jpeg','jpg','png','mp4','pdf','ppt','rar','txt','doc','docx','wps','xls','xlsx','zip',],
      files: [],
      fileType:'',
      prefixList:[],
      fileName:'',
      result:{},
      currentPath:'',
      top: 0,
      left: 0,
      previewSupportType:['txt','html','htm','asp','jsp','xml','json','properties','md','gitignore','log','java','py','c','cpp','sql','sh','bat','m','bas','prg','cmd','jpg','jpeg','png','gif','doc','docx','ppt','pptx','pdf','xls','xlsx','zip','rar','jar','tar','gzip','mp3','wav','mp4','flv','CAD',
        'dwg'],
      fileArr: []
    }
  },
  components:{
    PreviewPop,
    BlankContent,
    sShare,SafeNotActivated
  },
  methods: {
    sendSmsVerifycode() {
      if (!this.user.phoneNumber) {
        this.$notifyError('获取手机号出错！');
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
          this.$notifySuccess('验证码发送成功！');

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
        this.$notifyError('网络错误');

        console.log(e);
      })
    },
    changeSafeCode() {
      if (!this.verifyCode) {
        this.$notifyError('请输入验证码');

        return false;
      }
      const pwdRegex = new RegExp('(?=.*[0-9])(?=.*[a-zA-Z]).{6,20}');
      if (!pwdRegex.test(this.newSafeCode)) {
        this.$notifyError('密码必须包含数字和字母，且长度为6-20位');

        return false;
      }
      if (this.newSafeCode !== this.repeatSafeCode) {
        this.$notifyError('两次密码不一致');

        return false;
      }
      this.$axios({
        url: "/user/forgetSafeCode",
        method:"POST",
        data: {
          newSafeCode: this.newSafeCode,
          userId: this.user.id,
          verifyCode: this.verifyCode
        }
      }).then(res=>{
        if (res.data.code === 200) {
          this.$notifySuccess('密钥重置成功！');

          this.forgetSafeCodeVisible = false
        }else {
          this.$notifyError(res.data.message);

        }
      }).catch(e => {
        this.$notifyError('网络错误');

        console.log(e);
      })
    },
    closePreviewDialog() {
      this.notSupportVisible = false
    },
    lockSafe() {
      this.defaultVisible = true;
      this.$axios.post("/safe/lockSafe");
      // this.safeOn = false
      this.codeRight = false
    },
    matchSafeCode() {
      if (this.enterSafeCode.length === 0) {
        this.$notifyError('请输入密钥');
        this.submit = false;
        return
      }
      this.submit = true;
      this.$axios({
        url:'/safe/match',
        method: "POST",
        dataType: "json",
        data: {
          safeCode: this.enterSafeCode
        }
      }).then(res => {
        // console.log(res)
        if (res.data.code === 200) {
          this.codeRight = res.data.data
          if (this.codeRight) {

            this.defaultVisible = false
            this.showEnter = false;
            this.submit = false
            this.listSafeFiles()
          }else {
            this.$notifyError('密钥错误！');

            this.submit = false

          }
        }else {
          this.$loading.hideLoading();
          this.submit = false;
          this.$notifyError(res.data.message);

        }
      }).catch(e => {
        console.log(e)
        this.$loading.hideLoading();
        this.submit = false;
        this.$notifyError('网络错误');

      })
    },

    async check() {
      this.$loading.showLoading();
      await this.$axios({
        url: '/safe/check',
        method: 'GET',
      }).then(async res => {
        this.$loading.hideLoading();
        if (res.data.code === 200) {
          this.safeOn = res.data.data

        }
      })
      await this.checkEntered();


    },
    checkEntered() {
      this.$axios({
        url: '/safe/checkEntered',
        method: 'GET',
      }).then(res => {
        if (res.data.code === 200) {
          this.entered = res.data.data
          // console.log(this.safeOn)
          // console.log(this.entered)
          // console.log(this.defaultVisible)
          // 如果激活保险箱
          if (this.safeOn) {
            // 并且已经进入过，就不需要输入密码
            if (this.entered) {
              this.defaultVisible = false
              this.codeRight = true;
              this.listSafeFiles()
              // 没有进入过，或超过10分钟，需要输入密码
            }else {
              this.showEnter = true;
            }
            // 没有激活保险箱
          } else {
            this.defaultVisible = false
          }
        }
      })
    },
    listSafeFiles() {
      this.$loading.showLoading();
      this.$axios({
        url: '/safe/list',
        method: 'GET',
      }).then(res => {
        this.$loading.hideLoading();
        if (res.data.code === 200) {
          this.files = res.data.data
          this.hasContent = this.files.length > 0
        }
      })
    },
    handleClickFile(item) {
      // console.log(item)
      if (item.isDir === true) {
        this.prefixList = item.ossPath.split("/");
        this.currentPath = item.ossPath;
        // console.log(this.prefixList)
        this.listFiles(this.currentPath)
      }else if (this.previewSupportType.findIndex(type =>type ===item.type.toLowerCase()) === -1){
        this.notSupportVisible = true;
      }else {
        this.selectedFile = item
        this.getUrl();
      }
    },
    listFiles() {
      this.$loading.showLoading();
      this.$axios({
        url: '/file/list',
        method: 'GET',
        params: {
          currentPage: 1,
          size: 20,
          prefix: this.currentPath
        }
      }).then(res => {
        this.$loading.hideLoading();
        if (res.data.code === 200) {
          this.files = res.data.data
          if (this.files.length > 0) {
            this.hasContent = true
          }else {
            this.hasContent = false
          }
          // console.log(this.files);
        }
      })
    },
    downloadFile(path, name) {
      // console.log(path, "===",name);
      this.$axios({
        url: '/file/download',
        method: "POST",
        params: {
          objectPath: path
        },
        responseType: 'arraybuffer',
      }).then(res => {
        if (res.status===200) {
          fileDownload(res.data,name)
        }

      })
    },
    onContextmenu(item) {
      this.selectedFile = item
      this.$contextmenu({
        items: [
          {
            label: "在线预览",
            icon: "el-icon-view",
            onClick: () => {
              if (item.isDir) {
                this.notSupportVisible = true;
              }else if (this.previewSupportType.findIndex(type =>type ===item.type) === -1){
                this.notSupportVisible = true;
              }else {
                this.getUrl();
              }
            }
          },
          {
            label: "下载",
            icon: "el-icon-bottom",
            onClick: () => {
              if (item.isDir) {
                // Message.warning("暂不支持下载文件夹");
                this.$notifySuccess('正在处理下载,请稍后...')
                this.downloadDir(item)
              }else {
                this.$notify({
                  message: '正在唤起下载',
                  type: 'success'
                })
                this.downloadFile(item.ossPath, item.name)
              }
            }
          },
          {label: "分享", icon: "el-icon-link",
            onClick: () => {
              if (item.isDir) {
                Message.warning("暂不支持分享文件夹");
              }else {
                this.shareVisible = true
              }
            }},
          {label: "重命名", icon: "el-icon-aim",
            onClick: () => {
              let index;
              if (item.isDir) {
                index = item.name.length
              }else{
                index = item.name.lastIndexOf('.');
              }
              let prefix = item.name.substring(0, index);
              let type = item.name.substring(index);
              this.renameFile(item, prefix, type)
            }},
          {label: "移出保险箱", icon:"el-icon-delete",
          onClick:() => {
            this.outVisible = true;
          }},
          {label: "移到回收站", icon: "el-icon-delete", customClass:"delete",
            onClick: () => {
            this.binVisible = true;
            }}
        ],
        event,
        //x: event.clientX,
        //y: event.clientY,
        customClass: "delete",
        zIndex: 3,
        minWidth: 200
      });
      return false;
    },
    downloadDir(item) {
      this.$axios({
        url: '/file/downloadDir',
        method: 'POST',
        params:{
          objectPath:item.ossPath
        }
      }).then(res => {
        console.log(res)
        if (res.data.code === 200) {
          this.fileArr = res.data.data

          let packageName = item.name + '.zip';

          Vue.prototype.$downloadDir.downloadFromAliOss(this.fileArr, packageName);
        }
      }).catch(e => {
        console.log(e)
        this.$notifyError(e.response.message)
      }).catch(e => {
        console.log(e)
        this.$notifyError(e.response.message)
      })
    },
    getUrl() {
      this.$axios({
        url: '/file/direct-url',
        method: 'GET',
        params:{
          ossPath:this.selectedFile.ossPath,
          expireTime: new Date().getTime() + 3600 * 1000
        }
      }).then(res => {
        if (res.data.code === 200) {
          // console.log(res)
          this.previewFile(res.data.data)
        }
      }).catch(e => {
        console.log(e)
        this.$notifyError("网络错误")

      }).catch(e => {
        console.log(e)
        this.$notifyError("网络错误")

      })
    },
    previewFile(url) {
      this.preViewPopUp = true
      let code = encodeURIComponent(Base64.encode(url));
      this.previewUrl = 'https://*:8090/preview/onlinePreview?url='+ code;
    },
    jumpToDir(item) {
      if (item === '') {
        this.currentPath = '';
        this.prefixList = [];
        this.listSafeFiles()
        return;
      }
      this.currentPath = '';
      let prefixList = this.prefixList
      for (let i = 0; i < prefixList.length; i++) {
        this.currentPath += prefixList[i] + '/';
        if (item === prefixList[i]) {
          break;
        }
      }
      // console.log(this.currentPath)
      this.prefixList = this.currentPath.split("/");
      this.listFiles()
    },
    renameFile(item, prefix, type) {
      this.$prompt('<div style="display: flex; justify-content: center"><svg t="1637547340725" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2171" width="150" height="150"><path d="M938.8032 983.04H81.92V40.96h568.32l287.4368 323.9936H590.848V122.88H163.84v778.24h693.0432V482.6112h81.92z m-266.24-699.5968h82.8416L672.768 189.44z" fill="#13227a" p-id="2172" data-spm-anchor-id="a313x.7781069.0.i0" class=""></path><path d="M342.528 470.6304h81.92v329.8304h-81.92z" fill="#3080E9" p-id="2173"></path><path d="M195.7888 395.1616h375.5008v81.92H195.7888zM469.7088 719.0528h81.2032v81.92h-81.2032zM589.1072 719.0528h81.2032v81.92h-81.2032zM708.7104 719.0528h81.3056v81.92h-81.3056z" fill="#3080E9" p-id="2174"></path></svg></div>', '重命名', {
        confirmButtonText: '确定',
        showCancelButton: false,
        inputPattern: /\S/,
        inputErrorMessage: '文件名不能为空！',
        dangerouslyUseHTMLString: true,
        inputValue: prefix,
        center: true,
        closeOnClickModal: false,
        roundButton: true
      }).then(({value}) => {

        this.$axios({
          url:'/file/rename',
          method: "POST",
          params: {
            newName: value + type,
            ossPath: item.ossPath
          }
        }).then(res => {
          // console.log(res)
          if (res.data.code === 200) {
            this.$notifySuccess("重命名成功")

            this.listSafeFiles()
          }else {
            this.$loading.hideLoading();
            this.$notifyError(res.data.message)

          }
        }).catch(e => {
          console.log(e)
          this.$loading.hideLoading();
          this.$notifyError("网络错误")

        })
      }).catch(() => {
      });
    },
    closeShare() {
      this.shareVisible = false;
    },
    closePreview() {
      this.preViewPopUp = false
    },
    moveToBin() {
      this.$axios({
        url:'/file/bin',
        method: "POST",
        params: {
          ossPath: this.selectedFile.ossPath,
        }
      }).then(res => {
        // console.log(res)
        if (res.data.code === 200) {
          this.$notifySuccess("移动到回收站成功")

          this.binVisible = false
          this.listSafeFiles()
        }else {
          this.$loading.hideLoading();
          this.$notifyError(res.data.message)

        }
      }).catch(e => {
        console.log(e)
        this.$loading.hideLoading();
        this.$notifyError("网络错误")

      })
    },
    moveOutSafe(){
      this.$axios({
        url:'/safe/moveOutSafe',
        method: "POST",
        params: {
          ossPath: this.selectedFile.ossPath,
        }
      }).then(res => {
        // console.log(res)
        if (res.data.code === 200) {
          this.$notifySuccess("移出保险箱成功")

          this.outVisible = false
          this.listSafeFiles()
        }else {
          this.$loading.hideLoading();
          this.$notifyError(res.data.message)

        }
      }).catch(e => {
        console.log(e)
        this.$loading.hideLoading();
        this.$notifyError("网络错误")

      })
    },
    enterSafe() {
      this.enterSafeCode = ''
      this.showEnter = true
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
    this.check();
    this.currentUser()
    // this.listFiles();

  },
  name: "Safe"
}
</script>

<style scoped>

.closeSafeBtn {background-image: linear-gradient(to right, rgb(140 122 244) 0%, #A498F5FF 51%, rgb(140 122 244) 100%)}

.closeSafeBtn {
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

.closeSafeBtn:hover {
  background-position: right center; /* change the direction of the change here */
  color: #fff;
  text-decoration: none;
}
.header{
  height: 70px;
  width: 100%;
  /*position: absolute;*/
  margin: 0;
  top: 0;
  right: 0;
  /*height: 120px;*/
  display: flex;
  /*background-color: #5daf34;*/
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 0 0.5rem rgba(0,0,0,.1)!important;
}

#navi{
  justify-content: flex-start;
}

.item-box{
  color: #25262b;
  border-radius: 20px;
  cursor: pointer;
  /*background-color: #8cc5ff;*/
  width: 100px;
  height: 117px;
  margin: 0 20px 0 20px;
  transition: 0.2s;
  padding: 8px 4px 10px;
}
.item-box:hover{
  background-color: rgba(132,133,141,0.08);
}

.fileSpan{
  font-size: 14px;
  text-align: center;
  color: #606266;
}


.icon{
  margin-top: 5px;
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
}

/deep/ .el-dialog {
  border-radius: 15px;
}
/deep/ .el-message-box__wrapper {
  border-radius: 15px;
}

/deep/ .el-button--primary {
  background-color: rgb(123, 103, 238);
  border: none;
}
/deep/ .el-button {
  border: 0 solid #DCDFE6;
  border-radius: 10px;
}
</style>
