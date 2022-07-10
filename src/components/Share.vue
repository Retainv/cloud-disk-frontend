<template>
<div >
  <el-dialog
    title="分享文件"
    :visible.sync="visible_"
    width="30%"
    @close="closeShare"
    center>
   <div style="padding:30px 0px; display: flex; flex-direction: column; justify-content: center; align-items: center;background-image: linear-gradient(to bottom , #9fb6fc, #ffffff);border-radius: 20px">
     <img width="75px" height="75px" ref="typeImg" :src=" supportedTypes.findIndex(type =>type ===item.type) !== -1 ? 'static/fileType/'+item.type.toLowerCase()+'.svg' : 'static/fileType/unknow.svg' "/>
     <span style="font-size: 16px;margin-top: 20px;color: #6d6e72" ref="fileName">{{item.name}}</span>
   </div>
    <div style="margin-top: 50px; display: flex; justify-content: space-around; align-items: center">
      <span>通过链接分享</span>
      <el-select v-model="expireTime"  style="width: 150px;border: none" >
        <el-option value="三十天内有效" @click.native="setTimeExpire"></el-option>
        <el-option value="永久有效" @click.native="setTimeExpire"></el-option>
        <el-divider></el-divider>
        <el-option value="自定义过期时间">
          自定义过期时间
        </el-option>
        <el-date-picker
          @change="setCustomeTime"
          v-show="true"
          v-model="customExpireDate"
          type="datetime"
          :picker-options="pickerOptions"
          placeholder="选择日期时间">
        </el-date-picker>
      </el-select>
      <el-button v-if="codeVisible" type="primary" @click="encode(shareUrl)">生成密钥</el-button>
      <span v-if="!codeVisible" style="width:96px; color: #6388ff; font-size: 16px;text-align: center"> {{code}}</span>
    </div>
    <div style="margin-top:10px;display: flex; flex-direction: column; justify-content: center; align-items: center">
      <el-tooltip class="item" effect="dark" content="点击复制" placement="top">
        <el-input class="url" v-model="shareUrl" readonly="readonly"  @click.native="copy"></el-input>
      </el-tooltip>
      <el-image
        style="margin-top: 20px;width: 200px; height: 200px;  box-shadow: 0 0 0.5rem rgba(0,0,0,.1)!important;"
        :src="qrUrl"
        fit="fill"></el-image>
    </div>

    <span slot="footer" class="dialog-footer">
<!--    <el-button @click="centerDialogVisible = false">取 消</el-button>-->
<!--    <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>-->
  </span>
  </el-dialog>
</div>
</template>

<script>
import Clipboard from 'clipboard';
export default {
  data(){
    return{
      codeVisible: true,
      code: '',
      qrUrl: '',
      show:true,
      shareUrl:'',
      dateShow: false,
      customExpireDate:'',
      expireTime: '三十天内有效',
      expireValue:'',
      supportedTypes:['ini','jar','json', 'md', 'properties', 'tar', 'wav', 'xml', 'yaml', 'yml','mp3','3d','pptx','db','dir','exe','gif','jpeg','jpg','png','mp4','pdf','ppt','rar','txt','doc','docx','wps','xls','xlsx','zip',],
      pickerOptions: {
        // 限制时间
        selectableRange: ['22:00:00 - 23:59:59','00:00:00 - 02:00:00'],
        // 限制日期
        disabledDate: this.disabledDateM
      },
    }
  },
  props:[
    'item','visible'
  ],
  methods:{
    encode(url) {
      let code = url.substring(url.lastIndexOf('/') + 1)
      this.$axios({
        url: '/share/encodeUrl',
        method: 'POST',
        params:{
          code:code
        }
      }).then(res => {
        if (res.data.code === 200) {
          // console.log(res)
          this.code = res.data.data
          this.codeVisible = false
        }else {
          this.$notifyError(res.data.message)

        }
      }).catch(e => {
        console.log(e)
        this.$notifyError('网络错误')

      }).catch(e => {
        console.log(e)
        this.$notifyError('网络错误')
      })
    },
    closeShare() {
      this.visible_ = false;
    },
    openDateSelector() {
      this.dateShow = true
    },
    disabledDateM(time) {
      return time.getTime() < Date.now() - 8.64e7
    },
    setTimeExpire() {
      this.expireValue =new Date().getTime() + 3600 * 1000 * 24 * 3000
      this.getUrl()
    },
    getUrl() {
      this.codeVisible = true
      this.code = ""
      this.$axios({
        url: '/file/url',
        method: 'GET',
        params:{
          ossPath:this.item.ossPath,
          expireTime: this.expireValue
        }
      }).then(res => {
        if (res.data.code === 200) {
          // console.log(res)
          this.shareUrl = res.data.data
          this.createQr()
        }
      }).catch(e => {
        console.log(e)
        this.$notifyError('网络错误')

      }).catch(e => {
        console.log(e)
        this.$notifyError('网络错误')

      })
    },
    createQr() {
      this.$axios({
        url: '/file/share/qr',
        method: 'GET',
        params:{
          shareUrl: this.shareUrl
        }
      }).then(res => {
        if (res.data.code === 200) {
          // console.log(res)
          this.qrUrl = res.data.data
        }
      }).catch(e => {
        console.log(e)
        this.$notifyError('网络错误')

      }).catch(e => {
        console.log(e)
        this.$notifyError('网络错误')

      })
    },
    setCustomeTime() {
      // console.log(this.customExpireDate)
      this.expireValue = this.customExpireDate.getTime() + 1
      this.expireTime = '自定义过期时间'
      this.getUrl()
    },
    copy() {
      var oInput = document.createElement('input'); //创建一个隐藏input（重要！）
      if (this.code.length === 0) {
        oInput.value = this.shareUrl;    //赋值
      }else {
        oInput.value = "文件链接：" + this.shareUrl + " 提取码：" + this.code;    //赋值
      }
      document.body.appendChild(oInput);
      oInput.select(); // 选择对象
      document.execCommand("Copy"); // 执行浏览器复制命令
      oInput.className = 'oInput';
      oInput.style.display = 'none';
      this.$notifySuccess('复制成功')

    },
  },
  name: "Share",
  created() {
    // console.log(this.show)
    // console.log(this.visible_)
    this.expireValue =new Date().getTime() + 3600 * 1000 * 24 * 30
    this.getUrl()
    // console.log(this.expireValue)
  },
  computed:{
    visible_:{
      get() {
        return this.visible;
      },
      set(val) {
        this.$emit("openShare", val)
      }
    }
  }
}
</script>

<style scoped>
.item.el-input >>> .el-input__inner {
  cursor: pointer;
  color: #8c939d;
}
/deep/ .el-dialog {
  border-radius: 15px;
}
</style>
