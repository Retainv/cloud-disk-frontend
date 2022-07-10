<template>
  <div>
  <div>
    <div v-if="hasContent" style="width: 95%; height: 20px;display: flex; justify-content: flex-end; margin-bottom: 5px">
      <button class="clearBinBtn"  @click="clearBin" style="right: 0px;font-size: 13px">
        <i class="el-icon-price-tag" ></i>  清空回收站
      </button>
    </div>

    <blank-content v-if="!hasContent"></blank-content>
    <div v-if="hasContent" style="
 height:440px ;display: flex;flex-direction: row; flex-wrap: wrap; overflow: auto; padding: 30px">
      <div @click="handleClickFile(item)" @contextmenu.prevent="onContextmenu(item)" class="item-box" v-for="item in files" style="display: flex; flex-direction: column; justify-content: space-around;align-items: center">
        <div >
          <img width="65px" height="65px" ref="typeImg" :src=" supportedTypes.findIndex(type =>type ===item.type.toLowerCase()) !== -1 ? 'static/fileType/'+item.type.toLowerCase()+'.svg' : 'static/fileType/unknow.svg' "/>
        </div>
        <div style="display: flex; flex-direction: column; justify-content: center; align-items: center;flex-wrap: wrap">
          <span class="fileSpan" ref="fileName" style="display:-webkit-box;overflow:hidden;text-overflow:ellipsis;-webkit-line-clamp:2;-webkit-box-orient:vertical; width: 100px">{{item.name}}</span>
          <span style="font-size: 13px; color: #8c939d;margin-top: 5px;" ref="updatedTime">{{ item.lastModified }}</span>
        </div>

      </div>
    </div>
  </div>
  <el-dialog center title="移出回收站" :visible.sync="outVisible" width="30% ">

    <div  style="display: flex;flex-direction: column; align-items: center;">
      <svg t="1637300192737" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5190" width="64" height="64"><path d="M510.082 510.104m-445.605 0a445.605 445.605 0 1 0 891.21 0 445.605 445.605 0 1 0-891.21 0Z" fill="#FF7A5B" p-id="5191"></path><path d="M686.679 659.47a0.074 0.074 0 0 1-0.021 0H330.145a10.001 10.001 0 0 1-8.784-14.78l178.257-327.597a10 10 0 0 1 17.568 0l177.968 327.066a9.955 9.955 0 0 1 1.525 5.311c0 5.522-4.478 10-10 10z m-339.709-20h322.862L508.401 342.795 346.97 639.47z" fill="#FFFFFF" p-id="5192"></path><path d="M522.466 592.67c2.787 2.705 4.185 6.06 4.185 10.068 0 3.662-1.397 6.89-4.185 9.677-2.791 2.791-6.105 4.185-9.938 4.185-3.837 0-7.106-1.394-9.807-4.185-2.705-2.787-4.054-6.015-4.054-9.677 0-4.009 1.349-7.363 4.054-10.068 2.701-2.701 5.97-4.054 9.807-4.054 3.833 0 7.147 1.353 9.938 4.054z m-2.746-35.046c1.479-1.654 2.223-4.486 2.223-8.499V430.912c0-4.356-0.743-7.278-2.223-8.761-1.483-1.479-3.882-2.223-7.192-2.223-3.314 0-5.712 0.785-7.192 2.354-1.483 1.569-2.223 4.36-2.223 8.369v118.735c0 4.014 0.739 6.8 2.223 8.369 1.479 1.569 3.878 2.354 7.192 2.354 3.311 0 5.709-0.826 7.192-2.485z" fill="#FFFFFF" p-id="5193"></path></svg>
      <span style="color: #6d6e72; margin-top: 20px">确定移出回收站吗？</span>
      <span style="color: rgb(221 60 60); margin-top: 20px;">移出后会恢复到原文件位置</span>
    </div>

    <div slot="footer" class="dialog-footer">
      <!--        <el-button @click="dialogTableVisible = false">取 消</el-button>-->
      <el-button type="primary" @click="moveOutBin">确 定</el-button>
    </div>
  </el-dialog>
    <el-dialog center title="清空回收站" :visible.sync="clearVisible" width="30% ">

      <div  style="display: flex;flex-direction: column; align-items: center;">
        <svg t="1637300192737" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5190" width="64" height="64"><path d="M510.082 510.104m-445.605 0a445.605 445.605 0 1 0 891.21 0 445.605 445.605 0 1 0-891.21 0Z" fill="#FF7A5B" p-id="5191"></path><path d="M686.679 659.47a0.074 0.074 0 0 1-0.021 0H330.145a10.001 10.001 0 0 1-8.784-14.78l178.257-327.597a10 10 0 0 1 17.568 0l177.968 327.066a9.955 9.955 0 0 1 1.525 5.311c0 5.522-4.478 10-10 10z m-339.709-20h322.862L508.401 342.795 346.97 639.47z" fill="#FFFFFF" p-id="5192"></path><path d="M522.466 592.67c2.787 2.705 4.185 6.06 4.185 10.068 0 3.662-1.397 6.89-4.185 9.677-2.791 2.791-6.105 4.185-9.938 4.185-3.837 0-7.106-1.394-9.807-4.185-2.705-2.787-4.054-6.015-4.054-9.677 0-4.009 1.349-7.363 4.054-10.068 2.701-2.701 5.97-4.054 9.807-4.054 3.833 0 7.147 1.353 9.938 4.054z m-2.746-35.046c1.479-1.654 2.223-4.486 2.223-8.499V430.912c0-4.356-0.743-7.278-2.223-8.761-1.483-1.479-3.882-2.223-7.192-2.223-3.314 0-5.712 0.785-7.192 2.354-1.483 1.569-2.223 4.36-2.223 8.369v118.735c0 4.014 0.739 6.8 2.223 8.369 1.479 1.569 3.878 2.354 7.192 2.354 3.311 0 5.709-0.826 7.192-2.485z" fill="#FFFFFF" p-id="5193"></path></svg>
        <span style="color: #6d6e72; margin-top: 20px">确定清空回收站吗？</span>
        <span style="color: rgb(221 60 60); margin-top: 20px;">清空后文件无法恢复！</span>
      </div>

      <div slot="footer" class="dialog-footer">
        <!--        <el-button @click="dialogTableVisible = false">取 消</el-button>-->
        <el-button type="primary" @click="clearOutBin" :loading="confirmClear">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog center title="彻底删除" :visible.sync="deleteVisible" width="30% ">

      <div  style="display: flex;flex-direction: column; align-items: center;">
        <svg t="1637300192737" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5190" width="64" height="64"><path d="M510.082 510.104m-445.605 0a445.605 445.605 0 1 0 891.21 0 445.605 445.605 0 1 0-891.21 0Z" fill="#FF7A5B" p-id="5191"></path><path d="M686.679 659.47a0.074 0.074 0 0 1-0.021 0H330.145a10.001 10.001 0 0 1-8.784-14.78l178.257-327.597a10 10 0 0 1 17.568 0l177.968 327.066a9.955 9.955 0 0 1 1.525 5.311c0 5.522-4.478 10-10 10z m-339.709-20h322.862L508.401 342.795 346.97 639.47z" fill="#FFFFFF" p-id="5192"></path><path d="M522.466 592.67c2.787 2.705 4.185 6.06 4.185 10.068 0 3.662-1.397 6.89-4.185 9.677-2.791 2.791-6.105 4.185-9.938 4.185-3.837 0-7.106-1.394-9.807-4.185-2.705-2.787-4.054-6.015-4.054-9.677 0-4.009 1.349-7.363 4.054-10.068 2.701-2.701 5.97-4.054 9.807-4.054 3.833 0 7.147 1.353 9.938 4.054z m-2.746-35.046c1.479-1.654 2.223-4.486 2.223-8.499V430.912c0-4.356-0.743-7.278-2.223-8.761-1.483-1.479-3.882-2.223-7.192-2.223-3.314 0-5.712 0.785-7.192 2.354-1.483 1.569-2.223 4.36-2.223 8.369v118.735c0 4.014 0.739 6.8 2.223 8.369 1.479 1.569 3.878 2.354 7.192 2.354 3.311 0 5.709-0.826 7.192-2.485z" fill="#FFFFFF" p-id="5193"></path></svg>
        <span style="color: #6d6e72; margin-top: 20px">确定彻底删除该文件吗？</span>
        <span style="color: rgb(221 60 60); margin-top: 20px;">彻底删除后文件无法恢复！</span>
      </div>

      <div slot="footer" class="dialog-footer">
        <!--        <el-button @click="dialogTableVisible = false">取 消</el-button>-->
        <el-button type="primary" @click="deleteFile" :loading="confirmClear">确 定</el-button>
      </div>
    </el-dialog>
</div>
</template>

<script>
import BlankContent from "../BlankContent";
import fileDownload from "js-file-download";
export default {
  data() {
    return{
      confirmClear: false,
      deleteVisible: false,
      hasContent: false,
      clearVisible: false,
      outVisible: false,
      supportedTypes:['ini','jar','json', 'md', 'properties', 'tar', 'wav', 'xml', 'yaml', 'yml','mp3','3d','pptx','db','dir','exe','gif','jpeg','jpg','png','mp4','pdf','ppt','rar','txt','doc','docx','wps','xls','xlsx','zip',],
      files:[],
      selectedFile: {}
    }
  },
  methods: {
    deleteFile() {
      this.confirmClear = true
      if (!this.selectedFile.isDir) {
        this.$axios({
          url: '/file/delete',
          method: 'POST',
          params:{
            filePath: this.selectedFile.ossPath
          }
        }).then(res => {
          if (res.data.code === 200) {
            this.$notifySuccess('删除成功')

            this.confirmClear = false
            this.deleteVisible = false;
            this.listBinFiles()
          }else {
            this.confirmClear = false
            this.deleteVisible = false;
            this.$notifyError(res.data.message)

            this.deleteVisible = false;
          }
        }).catch(e => {
          this.$notifyError("删除失败！")

          this.confirmClear = false
          this.deleteVisible = false;
        })
      }else {
        this.$axios({
          url: '/file/deleteDir',
          method: 'POST',
          params:{
            filePath: this.selectedFile.ossPath
          }
        }).then(res => {
          if (res.data.code === 200) {
            this.$notifySuccess("删除成功")

            this.confirmClear = false
            this.deleteVisible = false;
            this.listBinFiles()
          }else {
            this.deleteVisible = false;
            this.$notifyError(res.data.message)

            this.confirmClear = false
            this.deleteVisible = false;

          }
        }).catch(e => {
          this.$notifyError("删除失败！")

          this.confirmClear = false
          this.deleteVisible = false;

        })
      }

    },
    clearOutBin() {
      this.confirmClear = true
      this.$axios({
        url: '/file/clear',
        method: 'POST',

      }).then(res => {
        if (res.data.code === 200) {
          this.$notifySuccess("清空成功")

          this.confirmClear = false
          this.clearVisible = false;
          this.listBinFiles()
        }
      }).catch(e => {
        this.$notifyError("清空失败！")

        this.confirmClear = false
      })
    },
    clearBin() {
      this.clearVisible = true
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
      }).catch(e => {
        this.$loading.hideLoading();
        this.$notifyError("网络错误")
      })
    },
    handleClickFile(item) {
      // console.log(item)
      if (item.isDir === true) {
        this.prefixList = item.ossPath.split("/");
        this.currentPath = item.ossPath;
        // console.log(this.prefixList)
        this.listFiles(this.currentPath)
      }
    },
    onContextmenu(item) {
      this.selectedFile = item
      this.$contextmenu({
        items: [
          {label: "移出回收站", icon:"el-icon-delete",
            onClick:() => {
              this.outVisible = true;
            }},
          {label: "彻底删除", icon:"el-icon-delete",
            onClick:() => {
              this.deleteVisible = true;
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


    moveOutBin(){
      this.$axios({
        url:'/file/withdraw',
        method: "POST",
        params: {
          ossPath: this.selectedFile.ossPath,
        }
      }).then(res => {
        // console.log(res)
        if (res.data.code === 200) {
          this.$notifySuccess("移出成功")

          this.outVisible = false
          this.listBinFiles()
        }else {
          this.$notifyError("移出回收站失败！")

        }
      }).catch(e => {
        console.log(e)
        this.$notifyError("网络错误")

      })
    },
    listBinFiles() {
      this.$loading.showLoading();
      this.$axios({
        url:'/file/list/bin',
        method: "GET",
      }).then(res => {
        // console.log(res)
        if (res.data.code === 200) {
          // console.log(res)
          this.files = res.data.data
          this.hasContent = this.files.length > 0
        }else {
          this.$notifyError(res.data.message)

        }
        this.$loading.hideLoading();

      }).catch(e => {
        console.log(e)
        this.$loading.hideLoading();
        this.$notifyError("网络错误")


      })
    }
  },
  created() {
    this.listBinFiles();
  },
  name: "Bin",
  components: {BlankContent}
}
</script>
<style scoped>
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
.clearBinBtn {background-image: linear-gradient(to right, rgb(140 122 244) 0%, #A498F5FF 51%, rgb(140 122 244) 100%)}

.clearBinBtn {
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

.clearBinBtn:hover {
  background-position: right center; /* change the direction of the change here */
  color: #fff;
  text-decoration: none;
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
</style>
