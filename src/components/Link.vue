<template>
  <div class="app">
    <img src="../assets/logo.svg" class="logo2" style="cursor: pointer" onclick="location.href='/file'">

    <div v-if="!hasFile" class="container">
      <img src="/static/blank.svg" width="150" height="150">
      <span class="desc">文件不存在或已过期啦</span>
    </div>
    <div class="container" v-if="hasFile">
<!--      判断是否需要提取码-->
      <div v-if="!item.encoded || codeRight">
        <el-row >

          <el-col :span="24">
            <div  v-model="item" style="width: 100%;height: 100%; display: flex; flex-direction: column; justify-content: center;align-items: center">
              <span class="desc">{{ item.userName }}分享给您的:</span>

              <img id="img" ref="typeImg" :src=" supportedTypes.findIndex(type =>type ===item.fileType.toLowerCase()) !== -1 ? '/static/fileType/'+item.fileType.toLowerCase()+'.svg' : '/static/fileType/unknow.svg' "/>
              <span class="fileSpan" ref="fileName" style="display:-webkit-box;overflow:hidden;text-overflow:ellipsis;-webkit-line-clamp:2;-webkit-box-orient:vertical; width: 220px;text-align: center; color: #624679">{{item.fileName}}</span>
              <span class="fileSpan" ref="fileName" style="font-size:0.9rem;margin-top:5px;display:-webkit-box;overflow:hidden;text-overflow:ellipsis;-webkit-line-clamp:2;-webkit-box-orient:vertical; width: 220px;text-align: center; color: rgb(142 142 142)">{{convertSize(item.size)}}</span>
              <span class="desc">有效期至：{{ item.expireTimeStr}}</span>
            </div>

          </el-col>
        </el-row>

        <el-row>
          <button class="grad" @click="preView" style="font-size: 13px">
            <i class="el-icon-view" ></i>  在线预览
          </button>
        </el-row>

        <el-row>
          <button class="grad" @click="download" style="font-size: 13px">
            <i class="el-icon-download" ></i>  下载
          </button>
        </el-row>
        <el-row>
          <el-link  target="_blank" :underline=false style="font-size: 14px; white-space:nowrap;" type="info" @click="transfer">
            <svg t="1640235504228" class="transfer" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2146" width="15" height="15" data-spm-anchor-id="a313x.7781069.0.i7"><path d="M200 834h632v88a8 8 0 0 1-8 8H192v-88a8 8 0 0 1 8-8z m421.053-371.235L352.246 741.123c-9.208 9.535-24.401 9.8-33.936 0.592l-74.811-72.244 278.886-288.796-197.415 0.017c-13.255 0.001-24.001-10.743-24.002-23.998v-0.005l0.02-103.964 423.977-0.036c13.255-0.001 24.001 10.743 24.002 23.998v0.005l-0.02 103.464h0.088l-0.024 295.98c0 13.253-10.743 23.996-23.996 23.998l-103.98 0.022 0.018-237.391z" p-id="2147" fill="#bfbfbf" data-spm-anchor-id="a313x.7781069.0.i6" class="selected"></path></svg>
            <span>转存到我的网盘</span>
          </el-link>
        </el-row>
      </div>
      <div v-if="item.encoded && !codeRight" style="width: 100%;height: 100%; display: flex; flex-direction: column; justify-content: center;align-items: center">
        <span class="desc">{{ item.userName }}分享给您的文件:</span> <br />
        <img src="/static/need_code.svg" width="150" height="150"/>
        <span class="desc">啊欧,还要提取码 :</span>
        <el-input style="margin-bottom:20px;width: 70%; color: #6d6e72" placeholder="请输入提取码" v-model="inputCode"></el-input>
        <el-button type="primary" @click="extractFile" :loading="extractLoading">提取文件</el-button>
      </div>

    </div>
    <el-dialog center title="转存至" :visible.sync="transferVisible" width="30% ">
      <el-container>
        <el-header height="20px">
          <div id="navi">
            <el-breadcrumb separator-class="el-icon-arrow-right" >
              <el-breadcrumb-item @click.native="jumpToDir('')"><a href="javascript:">全部文件</a></el-breadcrumb-item>

              <el-breadcrumb-item @click.native="jumpToDir(item)" v-for="item in prefixList" :key="item"><a href="javascript:">{{item}} </a></el-breadcrumb-item>
            </el-breadcrumb>
          </div>
        </el-header>
        <el-main>
          <el-row style="
 height:51vh ; flex-wrap: wrap; overflow: auto; align-content: flex-start">
              <el-col :disabled="!item.isDir" @click.native="handleClickFile(item)" :class="item.isDir ? 'fileItem' : 'normalFile'" :span="24" v-for="item in files" :key="item.id">
                <img style="margin-right: 10px" width="35px" height="35px" ref="typeImg" :src=" supportedTypes.findIndex(type =>type ===item.type.toLowerCase()) !== -1 ? '/static/fileType/'+item.type+'.svg' : '/static/fileType/unknow.svg' "/>
                <span  ref="fileName" style="display:-webkit-box;overflow:hidden;text-overflow:ellipsis;-webkit-line-clamp:1;-webkit-box-orient:vertical; width: 100%">{{item.name}}</span>

              </el-col>
<!--            <div @click="handleClickFile(item)"  class="item-box" v-for="item in files" style="display: flex; flex-direction: column; justify-content: space-around;align-items: center">-->
<!--              <div >-->
<!--                <img width="65px" height="65px" ref="typeImg" :src=" supportedTypes.findIndex(type =>type ===item.type.toLowerCase()) !== -1 ? 'static/fileType/'+item.type+'.svg' : 'static/fileType/unknow.svg' "/>-->
<!--              </div>-->
<!--              <div style="display: flex; flex-direction: column; justify-content: center; align-items: center;flex-wrap: wrap">-->
<!--                <span class="fileSpan" ref="fileName" style="display:-webkit-box;overflow:hidden;text-overflow:ellipsis;-webkit-line-clamp:2;-webkit-box-orient:vertical; width: 100px">{{item.name}}</span>-->
<!--                <span style="font-size: 13px; color: #8c939d;margin-top: 5px;" ref="updatedTime">{{ item.lastModified }}</span>-->
<!--              </div>-->

<!--            </div>-->
          </el-row>
        </el-main>
        <el-footer style="padding: 0 40px">
          <el-row>
            <el-col :span="6"><el-button class="link-btn" @click="newDir">新建文件夹</el-button></el-col>
            <el-col :span="6"></el-col>
            <el-col :span="6"><el-button class="link-btn" @click="transferVisible =  false">取消</el-button></el-col>
            <el-col :span="6"><el-button class="saveBtn" @click="transferToCurrentUser" :loading="transferLoading">保存到此处</el-button></el-col>
          </el-row>

        </el-footer>
      </el-container>


    </el-dialog>


  </div>
</template>

<script>
import {get} from 'vue-cookies'
import Vue from "vue";
export default {

  data() {
    return{
      extractLoading: false,
      codeRight: false,
      inputCode: '',
      files:[],
      prefixList:[],
      currentPath:'',
      transferVisible: false,
      currentUser: {},
      hasFile: true,
      notSupport: false,
      item:{},
      shareCode:'',
      shareId:'',
      supportedTypes:['ini','jar','json', 'md', 'properties', 'tar', 'wav', 'xml', 'yaml', 'yml','mp3','3d','pptx','db','dir','exe','gif','jpeg','jpg','png','mp4','pdf','ppt','rar','txt','doc','docx','wps','xls','xlsx','zip',],
      previewSupportType:['txt','html','htm','asp','jsp','xml','json','properties','md','gitignore','log','java','py','c','cpp','sql','sh','bat','m','bas','prg','cmd','jpg','jpeg','png','gif','doc','docx','ppt','pptx','pdf','xls','xlsx','zip','rar','jar','tar','gzip','mp3','wav','mp4','flv','CAD',
        'dwg'],
      fileArr: [],
      transferLoading: false,
    }
  },
  methods: {
    extractFile() {
      if (this.inputCode.length === 0) {
        this.$notifyWarning('请输入提取码')
        return
      }

      this.extractLoading = true
      this.$axios({
        url: '/share/extract',
        method: 'GET',
        params: {
          id: this.shareId,
          code: this.inputCode
        }
      }).then(res => {
        this.$loading.hideLoading();
        if (res.data.code === 200) {
          if (res.data.data) {
            this.codeRight = true
          }else {
            this.$notifyError('提取码错误')
          }
          this.extractLoading = false

        }else{
          this.$notifyError("网络错误")
          this.extractLoading = false
        }
      }).catch(e => {
        console.log(e);
        this.$notifyError("网络错误")
        this.extractLoading = false
      })
    },
    transferToCurrentUser() {
      this.transferLoading = true
      this.$axios({
        url: '/share/transfer',
        method: 'POST',
        params: {
          shareId: this.shareId,
          savePath: this.currentPath,
        }
      }).then(res => {
        this.$loading.hideLoading();
        if (res.data.code === 200) {
          this.$notifySuccess('转存成功')
          this.transferVisible = false;

        }else{
          this.$notifyError(res.data.message)
        }
      }).catch(e => {
        console.log(e);
        this.$notifyError("网络错误")
      })
      this.transferLoading = true
    },
    transfer() {
      let token = get('COOKIE-TOKEN')
      // 未登录
      if (!token) {
        this.$notifyWarning('请先登录')
        let routeUrl = this.$router.resolve({
          path: "/"
        });
        setTimeout(() => {
          window.open(routeUrl.href, '_blank');
        }, 1000)
      }else {
        this.transferVisible= true;
        this.getUserDirList()
      }
    },
    async getUserDirList() {
      await this.$axios('/user/currentUser').then(res => {
        if (res.data.data.id != null || res.data.data.id != '') {
          this.currentUser = res.data.data
          this.listFiles()
        }else {
          this.$notifyError("获取用户信息失败！")
        }
      }).catch(e => {
        console.log(e)
        this.$notifyError("网络错误")
      })


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
          // if (this.files.length > 0) {
          //   this.hasContent = true
          // }else {
          //   this.hasContent = false
          // }
        }
      })
    },
    getShareId() {
      let id = this.$route.params.id
      // let url = window.location.href;//获取当前url
      // let dz_url = url.split('#')[0]; //获取#/之前的字符串
      // let cs = dz_url.split('?')[1]; //获取?之后的参数字符串
      // console.log(cs)
      // let id = cs.substring(8);
      // 恶意改变地址栏,显示无文件
      // console.log(id)
      if (id.length <= 10) {
        this.hasFile = false;
        return false;
      }
      this.shareCode = id
      // console.log(this.shareId)
      this.getShareDetail()
    },
    convertSize(value) {
      if(null===value||value==='' || value === 0){
        return "0 B";
      }
      var unitArr = ["B","KB","MB","GB","TB","PB","EB","ZB","YB"];
      var index=0;
      var srcsize = parseFloat(value);
      index=Math.floor(Math.log(srcsize)/Math.log(1024));
      var size =srcsize/Math.pow(1024,index);
      size=size.toFixed(2);//保留的小数位数
      return  size+unitArr[index];
    },
    getShareDetail() {
      this.$axios({
        url:"/share/getShareDetail",
        method: "get",
        params:{
          shareCode: this.shareCode
        }
      }).then(res => {
        if (res.data.code === 200) {
          // console.log(res)
          this.item = res.data.data
          this.shareId = res.data.data.id
          // 如果分享未过期，原用户删除文件，仍无法查看
          this.checkDeleted()
        }else {
          this.hasFile = false;
        }
      }).catch(e => {
        this.hasFile = false;
        console.log(e)
      })
    },
    checkDeleted() {
      this.$axios({
        url: "/share/exist",
        method: "GET",
        params:{
          shareId: this.shareId
        }
      }).then(res => {
        if (res.data.code === 200 && res.data.data === true) {
          this.hasFile = true;
        }else {
          this.hasFile = false;
        }
      })
    },
    preView() {
      if (this.previewSupportType.findIndex(type =>type ===this.item.fileType.toLowerCase()) === -1) {
        this.$notifyError("暂不支持该类型文件预览！")
        return false;
      }
      let url = this.item.url;
      let code = encodeURIComponent(Base64.encode(url));
      window.open('https://*:8090/preview/onlinePreview?url='+ code );
    },
    downloadDir() {
      this.$notifySuccess('后台正在处理下载,请不要重复点击，请稍等...')
      this.$axios({
        url: '/file/downloadDir',
        method: 'POST',
        params:{
          shareId: this.item.id,
          objectPath:this.item.url
        }
      }).then(res => {
        // console.log(res)
        if (res.data.code === 200) {
          this.fileArr = res.data.data

          let packageName = this.item.fileName + '.zip';

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
    download() {
      // console.log(this.item)
      if (this.item.fileType === 'dir') {
        this.downloadDir()
      }else {
        window.open(this.item.url)
      }
      this.$axios({
        url: "/share/download",
        method: "POST",
        params:{
          shareId: this.shareId
        }
      }).then(res => {
      })

    },
    jumpToDir(item) {
      if (item === '') {
        this.currentPath = '';
        this.prefixList = [];
        this.listFiles()
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
    handleClickFile(item) {
      if (item.isDir) {
        this.prefixList = item.ossPath.split("/");
        this.currentPath = item.ossPath;
        // console.log(this.prefixList)
        this.listFiles(this.currentPath)
      }
    },
    newDir() {
      this.$prompt('<div><img src="/static/fileType/dir.svg"/></div>', '文件夹名称', {
        confirmButtonText: '确定',
        showCancelButton: false,
        dangerouslyUseHTMLString: true,
        inputValue: '新建文件夹',
        center: true,
        closeOnClickModal: false,
        roundButton: true,
        // cancelButtonText: '取消',
        inputPattern: /\S/,
        inputErrorMessage: '文件夹名称不能为空！',
        customClass: 'newDirClass'
      }).then(({value}) => {

        this.$axios({
          url:'/file/createDir',
          method: "POST",
          params: {
            prefix: this.currentPath,
            dirName: value
          }
        }).then(res => {
          // console.log(res)
          if (res.data.code === 200) {
            this.$notifySuccess('新建文件夹成功！')

            this.listFiles()
          }else {
            this.$loading.hideLoading();
            this.$notifyError(res.data.message)

          }
        }).catch(e => {
          console.log(e)
          this.$notifyError('网络错误')

        })
      }).catch(() => {
      });
    },
  },
  created() {
    this.getShareId()
  },
  name: "Link"

}
</script>

<style scoped>
.el-row{
  display: flex;
  justify-content: center;
  margin: 10px 0;
}
.grad {
  background-image: linear-gradient(to right, #8dabfd 0%, #94bbf6 51%, #8dabfd 100%);
}

.grad {
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
.logo2{
  width: 178px;
}
.grad:hover {
  background-position: right center; /* change the direction of the change here */
  color: #ffffff;
  text-decoration: none;
}
.app{
  height:100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

  background-image: url("/static/wave2.png");
  background-repeat: no-repeat;
  background-size: 100% auto;
  background-position: 0 100%;
}
@media screen and (min-width:1000px) {
  #img{
    width: 50%;
    height: 50%;
  }
  .container{
    width: 320px;
    height: 460px;
    box-shadow: 1px -2px 23px 3px #8dabfd;
    border-radius: 20px;
    background-color: #FFFFFF76;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 999;
  }
  .desc{
    font-size: 1rem;
    color: #8c939d;
    margin: 10px 0;
  }

}
@media screen and (max-width:960px){
  #img{
    width: 40%;
    height: 40%;
  }

  .container{
    width: 278px;
    height: 427px;
    border-radius: 20px;
    box-shadow: 1px -2px 23px 3px #8dabfd;
    background-color: #FFFFFF76;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .desc{
    font-size: 0.7rem;
    color: #8c939d;
    margin: 10px 0;

  }
}

#navi{
  display: flex;
  justify-content: flex-start;
}
.normalFile{
  opacity: 0.5;
  border-radius: 10px;
  display: flex;
  align-items: center;
  font-size: 14px;
  cursor: not-allowed;
  height: 45px;
  line-height: 1.5;
  padding: 0 12px;
  margin: 0 8px
}
.fileItem{
  border-radius: 10px;
  display: flex;
  align-items: center;
  font-size: 14px;
  cursor: pointer;
  height: 45px;
  line-height: 1.5;
  padding: 0 12px;
  margin: 0 8px
}
.fileItem:hover{
  background-color: rgba(132,133,141,0.08);
}
.el-main{
  padding: 0;
}
/deep/ .el-dialog{
  border-radius: 15px;
}

.saveBtn {
  border-radius: 10px;
  background-color: #6388ff;
  border: none;
  color: white;
}
.saveBtn:hover{
  background-color: #7695f8;
}
.link-btn{
  border: none;
  border-radius: 10px;
}

.newDirClass{
  border-radius: 15px;
}
.el-button--primary {
  background-color: rgb(123, 103, 238);
  border-radius: 15px;
  border: none;
}
/deep/ .el-input__inner {
  color: #8c939d;
}
</style>
