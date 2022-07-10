<template>
  <div id="share">
    <el-table
      :data="tableData"
      style="width: 100%"
      max-height="620px"
      :default-sort = "{prop: 'createTimeStr', order: 'descending'}"
    >
      <el-table-column
        prop="fileName"
        label="文件名"
        sortable
        show-overflow-tooltip
        width="220">
        <template slot-scope="scope">
          <div style="display: flex;align-items: center">
            <img width="30px" height="30px" ref="typeImg" :src=" supportedTypes.findIndex(type =>type ===scope.row.fileType.toLowerCase()) !== -1 ? 'static/fileType/'+scope.row.fileType.toLowerCase()+'.svg' : 'static/fileType/unknow.svg' "/>
            <span style="margin-left: 10px">{{scope.row.fileName}}</span>
          </div>

        </template>

      </el-table-column>
      <el-table-column
        prop="filePath"
        label="文件路径"
        sortable
        show-overflow-tooltip
        width="180">

      </el-table-column>
      <el-table-column
        prop="createTimeStr"
        label="创建时间"
        sortable
        show-overflow-tooltip
        width="150">

      </el-table-column>
      <el-table-column
        prop="expireTimeStr"
        label="过期时间"
        sortable
        show-overflow-tooltip
        width="150">

      </el-table-column>
      <el-table-column
        prop="viewCount"
        label="浏览"
        sortable
        width="70">
      </el-table-column>
      <el-table-column
        prop="downloadCount"
        label="下载"
        sortable
        width="70">
      </el-table-column>
      <el-table-column
        prop="transferCount"
        label="转存"
        sortable
        width="70">
      </el-table-column>
      <el-table-column
        prop="statusDesc"
        label="状态"
        width="160"
        sortable

      >
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.status === 1 ? 'success' : scope.row.status === 2 ? 'warning' : 'danger'"
            disable-transitions>{{scope.row.statusDesc}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="shareUrl"
        label="分享链接"
        width="240"
        show-overflow-tooltip

      >

        <template slot-scope="scope">
          <span style="cursor: pointer" @click="copyLink(scope.row.shareUrl, scope.row.code)">{{scope.row.shareUrl}}</span>
        </template>

      </el-table-column>
      <el-table-column
        prop="code"
        label="提取码"
        width="80"
        show-overflow-tooltip>
      <template slot-scope="scope">
        <el-button
          @click.native.prevent="encode(scope.row.id)"
          style="color: rgb(123, 103, 238)"
          type="text"
          v-if="!scope.row.encoded && scope.row.status === 1"
          size="small">
          生成提取码

        </el-button>
        <span  v-if="scope.row.encoded" >{{scope.row.code}}</span>
      </template>
      </el-table-column>
      <el-table-column
        label="操作"
        fixed="right"
        width="80">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteShare(scope.row.id)"
            style="color: rgb(248,94,124)"
            type="text"
            v-if="scope.row.status === 1 "
            size="small">
            取消分享

          </el-button>
          <el-button
            @click.native.prevent="shareAgain(scope.row)"
            style="color: rgb(123, 103, 238)"
            type="text"
            v-if="scope.row.status !== 1 && scope.row.status !== 4"
            size="small">
            再次分享
          </el-button>
          <el-button
            @click.native.prevent="deleteUnusedShare(scope.row.id)"
            style="color: #fa4242"
            type="text"
            v-if="scope.row.status === 4 "
            size="small">
            删除
          </el-button>
        </template>
      </el-table-column>

    </el-table>
    <s-share v-if="shareVisible" :item="this.selectedFile" :visible="this.shareVisible" @openShare="closeShare"></s-share>

  </div>
</template>

<script>
import moment from "moment";
import sShare from "../Share";


export default {
  components:{
    sShare
  },
  data(){
    return{
      shareVisible: false,
      selectedFile: {},
      tableData: [],
      supportedTypes:['ini','jar','json', 'md', 'properties', 'tar', 'wav', 'xml', 'yaml', 'yml','mp3','3d','pptx','db','dir','exe','gif','jpeg','jpg','png','mp4','pdf','ppt','rar','txt','doc','docx','wps','xls','xlsx','zip',],

    }
  },
  methods:{
    encode(id) {
      this.$axios({
        url: '/share/encode',
        method: 'POST',
        params:{
          id:id
        }
      }).then(res => {
        if (res.data.code === 200) {
          // console.log(res)
          this.listShare()
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
    deleteUnusedShare(id) {
      this.$axios({
        url: "/share/delete",
        method: "POST",
        params:{
          id : id
        }
      }).then(res => {
        if (res.data.code === 200) {
          this.$notifySuccess("删除成功！")

          this.listShare()
        }else {
          this.$notifyError("删除失败！")

        }
      }).catch(e =>  {
        console.log(e)
        this.$notifyError("网络错误！")
      })
    },
    shareAgain(data) {
      this.selectedFile = {
        name: data.fileName,
        type: data.fileType,
        ossPath: data.filePath
      }
      this.shareVisible = true
    },
    closeShare() {
      this.shareVisible = false;
      this.listShare()
    },
    copyLink(url, code) {
      var oInput = document.createElement('input'); //创建一个隐藏input（重要！）
      if (code === null) {
        oInput.value = url;    //赋值
      }else {
        oInput.value = "文件链接：" + url + " 提取码：" + code;    //赋值
      }
      document.body.appendChild(oInput);
      oInput.select(); // 选择对象
      document.execCommand("Copy"); // 执行浏览器复制命令
      oInput.className = 'oInput';
      oInput.style.display = 'none';
      this.$notifySuccess("复制成功！")

    },
    deleteShare(id) {
      this.$confirm('此操作将使该分享失效且不会再显示该分享, 是否继续?', '取消分享', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios({
          url: "/share/delete",
          method: "POST",
          params:{
            id : id
          }
        }).then(res => {
          if (res.data.code === 200) {
            this.$notifySuccess("取消分享成功！")

            this.listShare()
          }else {
            this.$notifyError("取消分享失败！")

          }
        }).catch(e =>  {
          console.log(e)
          this.$notifyError("网络错误！")

        })

      }).catch(() => {

      });
    },
    formatter(row, column) {
      return row.address;
    },
    dateFormat:function(date){
      return moment(date).format("YYYY-MM-DD HH:mm")
    },
    listShare() {
      this.$axios({
        url: "/share/list",
        method: "GET",
      }).then(res => {
        if (res.data.code === 200) {
          this.tableData = res.data.data
        }else {
          this.$notifyError("查询失败！")
        }
      }).catch(e =>  {
        console.log(e)
        this.$notifyError("网络错误！")
      })
    }
  },
  name: "MyShare",
  created() {
  this.listShare()
  }

}
</script>

<style scoped>
#share{
  padding: 20px 20px;
}

/deep/ .cell{
  font-size: 0.8rem;

  color: #727272;
}

/deep/ .cell el-tooltip{
  font-weight: normal;
}
/deep/ .el-table tbody tr:hover>td {
  background-color: rgb(249,249,255) !important;
}
/deep/ .el-tag.el-tag--success{
  background-color: rgb(53 222 194);
  border: none;
  color: white;
}
/deep/ .el-tag.el-tag--warning{
  background-color: rgb(215 201 50);
  border: none;
  color: white;
}
/deep/ .el-tag.el-tag--danger{
  background-color: rgb(222 53 95 / 80%);
  border: none;
  color: white;
}
</style>
