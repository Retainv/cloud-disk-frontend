<template>
  <div>
    <el-tabs :tab-position="tabPosition" @tab-click="changeTag" v-model="tab" style="margin-left: 20px">
      <el-tab-pane label="进行中" name="0">
<!--        <div class="uploadInfo">-->
<!--          <div>-->
<!--            <el-progress :text-inside="true" :stroke-width="24" :percentage="progressBar" status="success" :color="colors"></el-progress>-->
<!--          </div>-->
<!--        </div>-->
      </el-tab-pane>
      <el-tab-pane label="已完成" name="1"></el-tab-pane>
    </el-tabs>
    <blank-content v-if="(inProgress && !hasProgressContent) || (finished && !hasFinishedContent) || (!hasProgressContent && !hasFinishedContent)"></blank-content>
    <div v-if="inProgress && hasProgressContent" style=" height:70vh ;flex-direction: row; flex-wrap: wrap; overflow: auto;padding: 30px">
      <el-row v-for="(item, index) in uploadArr" v-if="!item.finished" :key="index">
        <el-col :span="24">
          <div  class="task"   style=" border-radius: 20px; width:100%;height: 70px;background-color: #f9f7f7;display: flex; flex-direction: row; justify-content: space-evenly;">
            <div style="width: 10%; display: flex; justify-content: center; align-items: center">
              <img width="45px" height="45px" ref="typeImg" :src=" supportedTypes.findIndex(type =>type ===item.type) !== -1 ? 'static/fileType/'+item.type+'.svg' : 'static/fileType/unknow.svg' "/>
            </div>
            <div style="width: 85%">
              <span class="fileSpan" ref="fileName" style="color: #4b5780;font-size: 14px ">{{item.name}}</span>
              <el-progress :text-inside="false"  :percentage=item.progress  :color="colors" style="width: 95%;margin: 5px 0;"></el-progress>
              <span class="fileSpan" ref="speed" style="color: #6d6e72; margin-bottom: 5px;font-size: 13px">{{item.speed + "    &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp    " + item.presentSize + " / " + item.totalSize}}</span>

            </div>
            <div style="width: 15%;display: flex;justify-content: center;align-items: center;margin-left: -25px">
    <!--/*          <svg style="margin-right: 20px" t="1638183229153" class="upload-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4331" width="20" height="20"><path d="M320 938.666667a21.333333 21.333333 0 0 1-21.333333-21.333334V106.666667a21.333333 21.333333 0 0 1 42.666666 0v810.666666a21.333333 21.333333 0 0 1-21.333333 21.333334z m405.333333-21.333334V106.666667a21.333333 21.333333 0 0 0-42.666666 0v810.666666a21.333333 21.333333 0 0 0 42.666666 0z" fill="#5C5C66" p-id="4332"></path></svg>*/-->
    <!--          <svg t="1638183354806" class="upload-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6130" width="15" height="15"><path d="M540.9792 512l475.2384-475.2384a20.48 20.48 0 0 0-28.9792-28.9792L512 483.0208 36.7616 7.7824a20.48 20.48 0 0 0-28.9792 28.9792L483.0208 512 7.7824 987.2384a20.48 20.48 0 0 0 28.9792 28.9792L512 540.9792l475.2384 475.2384a20.48 20.48 0 0 0 28.9792-28.9792z" p-id="6131"></path></svg>      -->
              <i ref="pause" class="el-icon-video-pause" style="color: #c8ce13" @click="pauseUpload(item)" v-if="!item.pause"></i>
              <i  class="el-icon-video-play" style="color: #69c896" @click="resumeUpload(item)" v-if="item.pause"></i>
              <el-popconfirm @confirm="cancelUpload(item)"
                title="确定取消上传该文件吗？"

              >
                <i  class="el-icon-circle-close" style="cursor: pointer" slot="reference" @click=""></i>
              </el-popconfirm>
            </div>

          </div>
        </el-col>
      </el-row>
    </div>
    <div v-else-if="finished && hasFinishedContent" style=" height:70vh ;flex-direction: row; flex-wrap: wrap; overflow: auto;padding: 30px">
      <el-row>
        <el-col :span="24">

          <div style="width: 95%; height: 30px;display: flex; justify-content: flex-end; margin-bottom: 10px">
            <button class="grad"  @click="showClear" style="position:relative;right: 0px;font-size: 13px">
              <i class="el-icon-price-tag" ></i>  清空
            </button>
          </div>
        </el-col>
      </el-row>
      <el-row v-for="(item, index) in finishedArr" :key="index">
        <el-col :span="24">
          <div  class="task"  >
            <div style="width: 10%; display: flex; justify-content: center; ">
              <img width="45px" height="45px" ref="typeImg" :src=" supportedTypes.findIndex(type =>type ===item.fileType) !== -1 ? 'static/fileType/'+item.fileType.toLowerCase()+'.svg' : 'static/fileType/unknow.svg' "/>
            </div>
            <div style="width: 100%;display: flex;justify-content: space-evenly;align-items: flex-start;flex-direction: column;">
              <span class="fileSpan" ref="fileName" style="color: rgb(66 91 116); margin-bottom: 7px">{{item.fileName}}</span>
              <div style="display: flex;justify-content: space-evenly;align-items: flex-start;flex-direction: row;">
                <span class="fileSpan"  style="font-size: 12px ;color: #6d6e72; margin-bottom: 5px">上传时间：{{item.createTimeStr}}</span>
                <span class="fileSpan"  style="font-size: 12px ;color: #6d6e72; margin-left: 15px">上传路径：{{item.filePath}}</span>
                <span class="fileSpan"  style="font-size: 12px ;color: rgb(5 2 191); margin-left: 15px">文件大小：{{convertSize(item.size)}}</span>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>

    </div>
    <el-dialog center title="清空上传记录" :visible.sync="clearVisible" width="30% ">

      <div  style="display: flex;flex-direction: column; align-items: center;">
        <svg t="1637570144722" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4084" width="64" height="64"><path d="M0 0h1024v1024H0V0z" fill="#15b2dc" opacity=".01" p-id="4085" data-spm-anchor-id="a313x.7781069.0.i15" class="selected"></path><path d="M682.666667 744.106667a375.466667 375.466667 0 0 0 204.8-334.506667c0-207.36-168.106667-375.466667-375.466667-375.466667S136.533333 202.24 136.533333 409.6a375.466667 375.466667 0 0 0 204.8 334.506667V819.2a34.133333 34.133333 0 0 0 34.133334 34.133333h273.066666a34.133333 34.133333 0 0 0 34.133334-34.133333v-75.093333z" fill="#6388ff" p-id="4086" data-spm-anchor-id="a313x.7781069.0.i13" class=""></path><path d="M341.333333 785.066667a34.133333 34.133333 0 0 0-34.133333 34.133333v68.266667a34.133333 34.133333 0 0 0 34.133333 34.133333h68.266667v34.133333a34.133333 34.133333 0 0 0 34.133333 34.133334h136.533334a34.133333 34.133333 0 0 0 34.133333-34.133334v-34.133333h68.266667a34.133333 34.133333 0 0 0 34.133333-34.133333v-68.266667a34.133333 34.133333 0 0 0-34.133333-34.133333H341.333333z" fill="#15b2dc" p-id="4087" data-spm-anchor-id="a313x.7781069.0.i16" class=""></path><path d="M395.946667 348.16a34.133333 34.133333 0 1 0-40.96 54.613333l122.88 92.16V682.666667a34.133333 34.133333 0 0 0 68.266666 0v-187.733334l122.88-92.16a34.133333 34.133333 0 0 0-40.96-54.613333L512 435.2l-116.053333-87.04z" fill="#FFFFFF" p-id="4088"></path></svg>
        <span style="color: #6d6e72; margin-top: 20px">确定清空上传记录吗？</span>
        <span style="color: rgb(221 60 60); margin-top: 20px;">清空后无法恢复</span>
      </div>

      <div slot="footer" class="dialog-footer">
        <!--        <el-button @click="dialogTableVisible = false">取 消</el-button>-->
        <el-button type="primary" @click="clearFinished">确 定</el-button>
      </div>
    </el-dialog>

  </div>


</template>

<script>
import Vue from "vue";
import BlankContent from "../BlankContent";
export default {
  components: {BlankContent},
  data() {
    return {
      hasProgressContent: true,
      hasFinishedContent: false,
      clearVisible: false,
      tab:'0',
      inProgress: true,
      finished:false,
      uploadArr:[
        // {
        //   name: "aaa.zip",
        //   type:"zip",
        //   "progress": 65,
        //   totalSize:128.65+"MB",
        //   presentSize: 65 + "MB",
        //   speed: 1201.32 + "KB/s"
        // },
        // {
        //   name: "aaa.zip",
        //   type:"zip",
        //   "progress": 65,
        //   totalSize:128.65+"MB",
        //   presentSize: 65 + "MB",
        //   speed: 1201.32 + "KB/s"
        // }
      ],
      finishedArr: [],

      currentTag:'',
      tags:[],
      supportedTypes:['ini','jar','json', 'md', 'properties', 'tar', 'wav', 'xml', 'yaml', 'yml','mp3','3d','pptx','db','dir','exe','gif','jpeg','jpg','png','mp4','pdf','ppt','rar','txt','doc','docx','wps','xls','xlsx','zip',],
      fileType:'',
      fileName:'',
      result:{},
      currentPath:'',
      top: 0,
      left: 0,
      selectedFile:{},
      tabPosition: 'top',
      colors: [
        {color: '#ffad32', percentage: 20},
        {color: '#fff246', percentage: 40},
        {color: '#d6e44d', percentage: 60},
        {color: '#a3d76e', percentage: 80},
        {color: '#69c896', percentage: 100}
      ],
    }
  },methods:{
    cancelUpload(item) {
      item.client.cancel()
      item.finished = true;
      let rest = this.calculateRestTask(this.uploadArr);
      this.$bus.$emit("uploadSize", rest)
    },
    resumeUpload(item) {
      item.pause = false
      this.$bus.$emit("resumeUpload", item)
    },
    pauseUpload(item) {
      item.pause = true
      item.client.cancel()
    },
    showClear() {
      this.clearVisible = true
    },
    clearFinished() {
      this.$axios({
        url:'/task/clear',
        method: "POST",
      }).then(res => {
        // console.log(res)
        if (res.data.code === 200) {
          this.$notifySuccess("已清空！")
          this.clearVisible = false;
          this.getFinishedTasks()
        }else {
          this.$notifyError(res.data.message)
          // this.$message({
          //   message: res.data.message,
          //   type: 'error'
          // });
        }
      }).catch(e => {
        console.log(e)
        this.$notifyError("网络错误")
        this.$loading.hideLoading();
      })
    },
    getTasks() {
      // console.log(this.uploadArr)
    },
    getFinishedTasks() {
      this.$loading.showLoading();
      this.$axios({
        url:'/task/list/finished',
        method: "GET",
      }).then(res => {
        // console.log(res)
        if (res.data.code === 200) {
          this.finishedArr = res.data.data
          this.hasFinishedContent = this.finishedArr.length > 0;
          // console.log(this.finishedArr)
          this.$loading.hideLoading();
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
    convertSize(limit) {
      var size = "";
      if( limit < 0.1 * 1024 ){ //如果小于0.1KB转化成B
        size = limit.toFixed(2) + "B";
      }else if(limit < 0.1 * 1024 * 1024 ){//如果小于0.1MB转化成KB
        size = (limit / 1024).toFixed(2) + "KB";
      }else if(limit < 0.1 * 1024 * 1024 * 1024){ //如果小于0.1GB转化成MB
        size = (limit / (1024 * 1024)).toFixed(2) + "MB";
      }else{ //其他转化成GB
        size = (limit / (1024 * 1024 * 1024)).toFixed(2) + "GB";
      }

      var sizestr = size + "";
      var len = sizestr.indexOf("\.");
      var dec = sizestr.substr(len + 1, 2);
      if(dec === "00"){//当小数点后为00时 去掉小数部分
        return sizestr.substring(0,len) + sizestr.substr(len + 3,2);
      }
      return  size;
    },
    changeTag() {
      this.currentTag = this.tab
      if (this.currentTag === '0') {
        this.inProgress = true;
        this.finished = false;
      }else if (this.currentTag === '1') {
        this.getFinishedTasks()
        this.inProgress = false;
        this.finished = true;

      }
      // console.log(this.currentTag)
    },
    calculateRestTask(arr) {
        let rest =  0;
        for (let i = 0; i < arr.length; i++) {
          if (!arr[i].finished) {
            rest++;
          }
        }
        return rest;


    }
  },created() {
    this.$bus.$on('uploadArr', data => {
      // console.log(data)
        this.uploadArr = Object.assign([], this.uploadArr, data);
    })

    // 计算剩余任务
    let rest = this.calculateRestTask(this.uploadArr);
    this.$bus.$emit("uploadSize", rest)


  },
  name: "Upload"
}
</script>

<style scoped>
.grad {background-image: linear-gradient(to right, rgb(140 122 244) 0%, #A498F5FF 51%, rgb(140 122 244) 100%)}


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

.grad:hover {
  background-position: right center; /* change the direction of the change here */
  color: #fff;
  text-decoration: none;
}

.task{
  margin-top: 10px;
  border-radius: 20px;
  width:100%;
  height: 70px;
  /*background-image: linear-gradient(to right, #63e8ff 0%, #94a8f6 51%, #ae63ff 100%);*/
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  background: rgb(245,245,255) !important;
  /*box-shadow: 0.5rem -0.5rem 1.5rem rgba(0,0,0,.1)!important;*/
  /*background: -webkit-linear-gradient(to right, #96f1c3, #ffffff  ); !* Chrome 10-25, Safari 5.1-6 *!*/
  /*background: linear-gradient(to right, #96f1c3,#ffffff  );*/
}
/deep/ .el-dialog {
  border-radius: 15px;
}
/deep/ .el-message-box__wrapper {
  border-radius: 15px;
}
/deep/ .el-button--primary {
  background-color: #6388ff;
  border: none;
}
/deep/ .el-button {
  border: 0 solid #DCDFE6;
  border-radius: 10px;
}

.upload-icon{
  cursor: pointer;
}
.upload-icon:hover{
  color: #f56c6c;
}
.task i{
  color: #f56c6c;
  font-size: 27px;
  width: 35px;
  cursor: pointer;
}
</style>
