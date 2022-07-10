<template>
  <div>
    <div class="header">
      <div id="navi">
        <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-left: 50px">
          <el-breadcrumb-item @click.native="jumpToDir('')"><a href="javascript:">文件</a></el-breadcrumb-item>

          <el-breadcrumb-item @click.native="jumpToDir(item)" v-for="item in prefixList" :key="item"><a href="javascript:">{{item}} </a></el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <button class="grad"  @click="newTag" style="margin-right: 50px;font-size: 13px">
        <i class="el-icon-price-tag" ></i>  添加新标签
      </button>
    </div>
<!--    <el-divider></el-divider>-->
    <div style="display: flex; justify-content: left;">


      <el-tabs  @contextmenu.prevent.native="function() { return false;}" :tab-position="tabPosition" v-model="tabs" style="display: flex;padding-top: 30px" @tab-click="changeTag">
          <el-tab-pane   v-for="tag in tags" v-bind:key = "tag.id" :label="tag.name" :name="tag.name">
              <span slot="label" @click.right="onTagMenu(tag)" >{{tag.name}} </span>
          </el-tab-pane>
      </el-tabs>
      <blank-content v-if="!hasContent" style="margin-left: 300px"></blank-content>
      <div v-if="hasContent" style=" height:71vh;display: flex;flex-direction: row; flex-wrap: wrap; overflow: auto;padding: 30px">
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
    <s-share v-if="shareVisible" :item="this.selectedFile" :visible="this.shareVisible" @openShare="closeShare"></s-share>
    <el-dialog center title="移入保险箱" :visible.sync="safeVisible" width="30% ">

      <div  style="display: flex;flex-direction: column; align-items: center;">
        <svg t="1637570144722" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4084" width="64" height="64"><path d="M0 0h1024v1024H0V0z" fill="#15b2dc" opacity=".01" p-id="4085" data-spm-anchor-id="a313x.7781069.0.i15" class="selected"></path><path d="M682.666667 744.106667a375.466667 375.466667 0 0 0 204.8-334.506667c0-207.36-168.106667-375.466667-375.466667-375.466667S136.533333 202.24 136.533333 409.6a375.466667 375.466667 0 0 0 204.8 334.506667V819.2a34.133333 34.133333 0 0 0 34.133334 34.133333h273.066666a34.133333 34.133333 0 0 0 34.133334-34.133333v-75.093333z" fill="#6388ff" p-id="4086" data-spm-anchor-id="a313x.7781069.0.i13" class=""></path><path d="M341.333333 785.066667a34.133333 34.133333 0 0 0-34.133333 34.133333v68.266667a34.133333 34.133333 0 0 0 34.133333 34.133333h68.266667v34.133333a34.133333 34.133333 0 0 0 34.133333 34.133334h136.533334a34.133333 34.133333 0 0 0 34.133333-34.133334v-34.133333h68.266667a34.133333 34.133333 0 0 0 34.133333-34.133333v-68.266667a34.133333 34.133333 0 0 0-34.133333-34.133333H341.333333z" fill="#15b2dc" p-id="4087" data-spm-anchor-id="a313x.7781069.0.i16" class=""></path><path d="M395.946667 348.16a34.133333 34.133333 0 1 0-40.96 54.613333l122.88 92.16V682.666667a34.133333 34.133333 0 0 0 68.266666 0v-187.733334l122.88-92.16a34.133333 34.133333 0 0 0-40.96-54.613333L512 435.2l-116.053333-87.04z" fill="#FFFFFF" p-id="4088"></path></svg>
        <span style="color: #6d6e72; margin-top: 20px">确定移动到保险箱吗？</span>
        <span style="color: rgb(221 60 60); margin-top: 20px;">移入后该文件只会显示在保险箱</span>
      </div>

      <div slot="footer" class="dialog-footer">
        <!--        <el-button @click="dialogTableVisible = false">取 消</el-button>-->
        <el-button type="primary" @click="moveToSafe">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog center title="移出收藏夹" :visible.sync="outTagVisible" width="30% ">

      <div  style="display: flex;flex-direction: column; align-items: center;">
        <svg t="1637300192737" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5190" width="64" height="64"><path d="M510.082 510.104m-445.605 0a445.605 445.605 0 1 0 891.21 0 445.605 445.605 0 1 0-891.21 0Z" fill="#FF7A5B" p-id="5191"></path><path d="M686.679 659.47a0.074 0.074 0 0 1-0.021 0H330.145a10.001 10.001 0 0 1-8.784-14.78l178.257-327.597a10 10 0 0 1 17.568 0l177.968 327.066a9.955 9.955 0 0 1 1.525 5.311c0 5.522-4.478 10-10 10z m-339.709-20h322.862L508.401 342.795 346.97 639.47z" fill="#FFFFFF" p-id="5192"></path><path d="M522.466 592.67c2.787 2.705 4.185 6.06 4.185 10.068 0 3.662-1.397 6.89-4.185 9.677-2.791 2.791-6.105 4.185-9.938 4.185-3.837 0-7.106-1.394-9.807-4.185-2.705-2.787-4.054-6.015-4.054-9.677 0-4.009 1.349-7.363 4.054-10.068 2.701-2.701 5.97-4.054 9.807-4.054 3.833 0 7.147 1.353 9.938 4.054z m-2.746-35.046c1.479-1.654 2.223-4.486 2.223-8.499V430.912c0-4.356-0.743-7.278-2.223-8.761-1.483-1.479-3.882-2.223-7.192-2.223-3.314 0-5.712 0.785-7.192 2.354-1.483 1.569-2.223 4.36-2.223 8.369v118.735c0 4.014 0.739 6.8 2.223 8.369 1.479 1.569 3.878 2.354 7.192 2.354 3.311 0 5.709-0.826 7.192-2.485z" fill="#FFFFFF" p-id="5193"></path></svg>
        <span style="color: #6d6e72; margin-top: 20px">确定移出该收藏夹吗？</span>
        <span style="color: rgb(221 60 60); margin-top: 20px;">移出收藏夹不会对原文件进行任何操作</span>
      </div>

      <div slot="footer" class="dialog-footer">
        <!--        <el-button @click="dialogTableVisible = false">取 消</el-button>-->
        <el-button type="primary" @click="moveOutTag">确 定</el-button>
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
import sShare from "../Share";
import fileDownload from "js-file-download";
import {showLoading} from "../../tools/loading";
import BlankContent from "../BlankContent";
import {Message} from "element-ui";
import PreviewPop from "../PreviewPop";
import Vue from "vue";
export default {
  components:{
    PreviewPop,
    BlankContent,
    sShare
  },
  data(){
    return{
      previewUrl: '',
      preViewPopUp: false,
      notSupportVisible: false,
      hasContent: false,
      outTagVisible: false,
      safeVisible: false,
      shareVisible: false,
      tabs:"",
      currentTag:'',
      tags:[],
      tabPosition: 'left',
      menuVisible:false,
      showProgress: false,
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
      drawer: false,
      direction: 'rtl',
      delete:"delete",
      selectedFile:{},
      previewSupportType:['txt','html','htm','asp','jsp','xml','json','properties','md','gitignore','log','java','py','c','cpp','sql','sh','bat','m','bas','prg','cmd','jpg','jpeg','png','gif','doc','docx','ppt','pptx','pdf','xls','xlsx','zip','rar','jar','tar','gzip','mp3','wav','mp4','flv','CAD',
        'dwg'],
      fileArr: []
    }
  },
  methods: {
    closePreviewDialog() {
      this.notSupportVisible = false
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
        this.$notifyError("获取文件预览地址失败")
      }).catch(e => {
        console.log(e)
        this.$notifyError("获取文件预览地址失败")
      })
    },
    previewFile(url) {
      this.preViewPopUp = true
      let code = encodeURIComponent(Base64.encode(url));
      this.previewUrl = 'https://*:8090/preview/onlinePreview?url='+ code;
    },
    closePreview() {
      this.preViewPopUp = false
    },
    renameFile(item, prefix, type) {
      this.$prompt('<div style="display: flex; justify-content: center"><svg t="1637547340725" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2171" width="150" height="150"><path d="M938.8032 983.04H81.92V40.96h568.32l287.4368 323.9936H590.848V122.88H163.84v778.24h693.0432V482.6112h81.92z m-266.24-699.5968h82.8416L672.768 189.44z" fill="#13227a" p-id="2172" data-spm-anchor-id="a313x.7781069.0.i0" class=""></path><path d="M342.528 470.6304h81.92v329.8304h-81.92z" fill="#3080E9" p-id="2173"></path><path d="M195.7888 395.1616h375.5008v81.92H195.7888zM469.7088 719.0528h81.2032v81.92h-81.2032zM589.1072 719.0528h81.2032v81.92h-81.2032zM708.7104 719.0528h81.3056v81.92h-81.3056z" fill="#3080E9" p-id="2174"></path></svg></div>', '重命名', {
        confirmButtonText: '确定',
        showCancelButton: false,
        dangerouslyUseHTMLString: true,
        inputPattern: /\S/,
        inputErrorMessage: '文件名不能为空！',
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
            this.listTagFiles()

          }else {
            this.$loading.hideLoading();
            this.$notifyError(res.data.message)

          }
        }).catch(e => {
          console.log(e)
          this.$loading.hideLoading();
          this.$notifyError("重命名失败")
        })
      }).catch(() => {
      });
    },
    newTag() {
      this.$prompt('<div style="display: flex; justify-content: center"><svg t="1637210734252" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6855" width="150" height="150"><path d="M244.4 827.4h-13.6v-13.6c0-3.4-2.8-6.2-6.2-6.2-3.4 0-6.2 2.8-6.2 6.2v13.6h-13.6c-3.4 0-6.2 2.8-6.2 6.2s2.8 6.2 6.2 6.2h13.6v13.6c0 3.4 2.8 6.2 6.2 6.2 3.4 0 6.2-2.8 6.2-6.2v-13.6h13.6c3.4 0 6.2-2.8 6.2-6.2s-2.8-6.2-6.2-6.2zM749.9 183.9h-13.6v-13.6c0-3.4-2.8-6.2-6.2-6.2-3.4 0-6.2 2.8-6.2 6.2v13.6h-13.6c-3.4 0-6.2 2.8-6.2 6.2 0 3.4 2.8 6.2 6.2 6.2h13.6v13.6c0 3.4 2.8 6.2 6.2 6.2 3.4 0 6.2-2.8 6.2-6.2v-13.6h13.6c3.4 0 6.2-2.8 6.2-6.2 0-3.4-2.7-6.2-6.2-6.2zM854.3 805.4c-11.6 0-21-9.4-21-21s9.4-21 21-21 21 9.4 21 21-9.4 21-21 21z m0-32c-6.1 0-11 4.9-11 11s4.9 11 11 11 11-4.9 11-11-4.9-11-11-11zM832.6 376.2c-11.6 0-21-9.4-21-21s9.4-21 21-21 21 9.4 21 21-9.4 21-21 21z m0-32c-6.1 0-11 4.9-11 11s4.9 11 11 11 11-4.9 11-11-4.9-11-11-11zM168.2 660.7c-1.7 0-3 1.4-3 3v9.7c0 1.7 1.4 3 3 3s3-1.4 3-3v-9.7c0-1.6-1.3-3-3-3zM168.2 689.8c-1.7 0-3 1.4-3 3v9.7c0 1.7 1.4 3 3 3s3-1.4 3-3v-9.7c0-1.7-1.3-3-3-3zM177.2 687.8c-1.2-1.2-3.1-1.2-4.3 0-1.2 1.2-1.2 3.1 0 4.3l6.8 6.8c0.6 0.6 1.4 0.9 2.1 0.9 0.8 0 1.5-0.3 2.1-0.9 1.2-1.2 1.2-3.1 0-4.3l-6.7-6.8zM156.7 667.3c-1.2-1.2-3.1-1.2-4.3 0-1.2 1.2-1.2 3.1 0 4.3l6.8 6.8c0.6 0.6 1.4 0.9 2.1 0.9 0.8 0 1.5-0.3 2.1-0.9 1.2-1.2 1.2-3.1 0-4.3l-6.7-6.8zM159.2 687.8l-6.8 6.8c-1.2 1.2-1.2 3.1 0 4.3 0.6 0.6 1.4 0.9 2.1 0.9 0.8 0 1.5-0.3 2.1-0.9l6.8-6.8c1.2-1.2 1.2-3.1 0-4.3-1.1-1.2-3-1.2-4.2 0zM175.1 679.3c0.8 0 1.5-0.3 2.1-0.9l6.8-6.8c1.2-1.2 1.2-3.1 0-4.3-1.2-1.2-3.1-1.2-4.3 0l-6.8 6.8c-1.2 1.2-1.2 3.1 0 4.3 0.6 0.6 1.4 0.9 2.2 0.9zM187.6 680.1h-9.7c-1.7 0-3 1.4-3 3s1.4 3 3 3h9.7c1.7 0 3-1.4 3-3s-1.3-3-3-3zM161.6 683.1c0-1.7-1.4-3-3-3h-9.7c-1.7 0-3 1.4-3 3s1.4 3 3 3h9.7c1.6 0 3-1.3 3-3z" fill="#036EB8" p-id="6856"></path><path d="M288 145.2m-8.9 0a8.9 8.9 0 1 0 17.8 0 8.9 8.9 0 1 0-17.8 0Z" fill="#036EB8" p-id="6857"></path><path d="M365.6 793.3m-8.9 0a8.9 8.9 0 1 0 17.8 0 8.9 8.9 0 1 0-17.8 0Z" fill="#036EB8" p-id="6858"></path><path d="M602 253.7m-8.9 0a8.9 8.9 0 1 0 17.8 0 8.9 8.9 0 1 0-17.8 0Z" fill="#036EB8" p-id="6859"></path><path d="M499.1 302l257.4 257.4c10.2 10.2 10.2 26.6 0 36.8l29-29c19.5-19.5 19.5-51.2 0-70.7L547.1 258c-9.4-9.4-22.1-14.6-35.4-14.6H253.6c-21 0-38 17-38 38v258.1c0 13.3 5.3 26 14.6 35.4l238.4 238.4c19.5 19.5 51.2 19.5 70.7 0l27.6-27.6a25.953 25.953 0 0 1-36.8 0L272.8 528.3a25.953 25.953 0 0 1 0-36.8L462.3 302c10.2-10.2 26.7-10.2 36.8 0z m-190.4 4.9c0-0.7 0.1-1.5 0-2.2v2.2z m0-2.4c0-1.5-0.2-2.9-0.4-4.4 0.3 1.5 0.4 2.9 0.4 4.4z m-0.4-4.5c-0.2-1.5-0.6-2.9-1-4.3 0.4 1.4 0.8 2.8 1 4.3z m-1.1-4.5c-0.2-0.7-0.5-1.4-0.7-2.1 0.3 0.7 0.5 1.4 0.7 2.1z m-54.6 30.6c-0.6-0.5-1.1-1-1.7-1.5-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0c0.5 0.5 1 1.1 1.5 1.7 0.6 0.5 1.1 1 1.7 1.5 3.2 3.2 5.6 6.9 7.1 10.9-11.5-4.5-25.1-2.1-34.4 7.1-9.3 9.3-11.7 22.9-7.1 34.4-4-1.6-7.7-3.9-10.9-7.1-0.5-0.5-1-1.1-1.5-1.7z m12.4 8.8c0.7 0.3 1.4 0.5 2.1 0.7-0.7-0.1-1.4-0.4-2.1-0.7z m2.2 0.8c1.4 0.4 2.9 0.8 4.3 1-1.4-0.2-2.9-0.5-4.3-1z m4.5 1.1c1.4 0.2 2.9 0.4 4.4 0.4-1.5-0.1-3-0.2-4.4-0.4z m4.6 0.4h2.2-2.2z m21.5-7.9c0.5-0.5 1.1-1 1.6-1.5s1-1.1 1.5-1.6c-0.5 0.5-1 1.1-1.5 1.6-0.6 0.5-1.1 1-1.6 1.5z m-19.3 7.8c0.7 0 1.4-0.1 2.1-0.2-0.7 0.1-1.4 0.2-2.1 0.2z m2.4-0.2l2.1-0.3-2.1 0.3z m2.1-0.4c0.7-0.1 1.3-0.3 2-0.5-0.6 0.2-1.3 0.4-2 0.5z m2.4-0.5c0.7-0.2 1.4-0.4 2-0.6-0.7 0.2-1.3 0.4-2 0.6z m2.1-0.7c0.6-0.2 1.2-0.5 1.9-0.7-0.7 0.2-1.3 0.5-1.9 0.7z m2.3-0.9c0.6-0.3 1.3-0.6 1.9-0.9-0.7 0.3-1.3 0.6-1.9 0.9z m2-1c0.6-0.3 1.2-0.6 1.7-1-0.6 0.4-1.2 0.7-1.7 1z m2.1-1.2l1.8-1.2-1.8 1.2z m1.8-1.3c0.5-0.4 1.1-0.8 1.6-1.3-0.5 0.5-1 0.9-1.6 1.3z m13-24c0 0.7-0.1 1.4-0.2 2.1 0.1-0.7 0.1-1.4 0.2-2.1z m-0.2 2.4l-0.3 2.1 0.3-2.1z m-0.4 2.2c-0.1 0.7-0.3 1.3-0.5 2 0.2-0.7 0.4-1.4 0.5-2z m-0.6 2.3c-0.2 0.7-0.4 1.4-0.6 2 0.2-0.6 0.4-1.3 0.6-2z m-0.6 2.1c-0.2 0.6-0.5 1.2-0.7 1.9 0.2-0.6 0.4-1.2 0.7-1.9z m-0.9 2.3c-0.3 0.6-0.6 1.3-0.9 1.9 0.3-0.6 0.6-1.2 0.9-1.9z m-1 2c-0.3 0.6-0.6 1.2-1 1.7 0.3-0.5 0.7-1.1 1-1.7z m-1.3 2.2l-1.2 1.8c0.4-0.7 0.8-1.2 1.2-1.8z m-1.2 1.8c-0.4 0.5-0.8 1.1-1.3 1.6 0.4-0.5 0.9-1.1 1.3-1.6z" fill="#F7F8F8" p-id="6860"></path><path d="M756.5 559.4L499.1 302a25.953 25.953 0 0 0-36.8 0L272.8 491.5a25.953 25.953 0 0 0 0 36.8l257.4 257.4c10.2 10.2 26.6 10.2 36.8 0l189.5-189.5c10.2-10.2 10.2-26.7 0-36.8z" fill="#F7F8F8" p-id="6861"></path><path d="M830 541l-44.5-44.5c19.5 19.5 19.5 51.2 0 70.7l-29 29L567 785.7l-27.6 27.6c-19.5 19.5-51.2 19.5-70.7 0l44.5 44.5c19.5 19.5 51.2 19.5 70.7 0L830 611.7c19.6-19.5 19.6-51.2 0-70.7z" fill="#2EA7E0" p-id="6862"></path><path d="M756.5 559.4L499.1 302a25.953 25.953 0 0 0-36.8 0L272.8 491.5a25.953 25.953 0 0 0 0 36.8l257.4 257.4c10.2 10.2 26.6 10.2 36.8 0l189.5-189.5c10.2-10.2 10.2-26.7 0-36.8z" fill="#F7F8F8" p-id="6863"></path><path d="M254.1 282.5c12-12 31-12.5 43.6-1.5-0.5-0.6-1-1.1-1.5-1.7-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3c0.5 0.5 1.1 1 1.7 1.5-11-12.5-10.5-31.6 1.5-43.6z" fill="#F7F8F8" p-id="6864"></path><path d="M317.4 300.6c-3.2-3.2-6.9-5.6-10.9-7.1 4.5 11.5 2.1 25.1-7.1 34.4-9.3 9.3-22.9 11.7-34.4 7.1 1.6 4 3.9 7.7 7.1 10.9 12.5 12.5 32.8 12.5 45.3 0 12.5-12.6 12.5-32.8 0-45.3z" fill="#2EA7E0" p-id="6865"></path><path d="M836.8 533.6l-312-312c-11.3-11.3-26.4-17.6-42.4-17.6h-47.9c-5.5 0-10 4.5-10 10s4.5 10 10 10h47.9c10.7 0 20.7 4.2 28.3 11.7l312 312c15.6 15.6 15.6 41 0 56.6L576.6 850.4c-15.6 15.6-41 15.6-56.6 0L319.4 649.8c-3.9-3.9-10.2-3.9-14.1 0s-3.9 10.2 0 14.1l200.6 200.6c23.4 23.4 61.5 23.4 84.9 0l246.1-246.1c23.3-23.3 23.3-61.4-0.1-84.8zM294 624.3l-17-17c-3.9-3.9-10.2-3.9-14.1 0-3.9 3.9-3.9 10.2 0 14.1l17 17c3.9 3.9 10.2 3.9 14.1 0s3.9-10.2 0-14.1zM252.9 583.3l-45-45c-7.6-7.6-11.7-17.6-11.7-28.3V252c0-15.4 12.6-28 28-28h180c5.5 0 10-4.5 10-10s-4.5-10-10-10h-180c-26.5 0-48 21.5-48 48v258.1c0 16 6.2 31.1 17.6 42.4l45 45c3.9 3.9 10.2 3.9 14.1 0 4-3.9 4-10.3 0-14.2z" fill="#036EB8" p-id="6866"></path><path d="M306.1 275.1c-16.4-16.4-43-16.4-59.4 0s-16.4 43 0 59.4 43 16.4 59.4 0c16.4-16.3 16.4-43 0-59.4z m-45.2 45.3c-8.6-8.6-8.6-22.5 0-31.1 8.6-8.6 22.5-8.6 31.1 0s8.6 22.5 0 31.1-22.6 8.6-31.1 0zM737.1 614.9c3.9 3.9 10.2 3.9 14.1 0l12-12c14-14 14-36.9 0-50.9L505.9 294.6c-14-14-36.9-14-50.9 0L265.4 484.1c-14 14-14 36.9 0 50.9l257.4 257.4c14 14 36.9 14 50.9 0L725 641.1c3.9-3.9 3.9-10.2 0-14.1-3.9-3.9-10.2-3.9-14.1 0L559.6 778.3c-6.2 6.2-16.4 6.2-22.6 0L279.6 520.9c-6.2-6.2-6.2-16.4 0-22.6l189.5-189.5c6.2-6.2 16.4-6.2 22.6 0l257.4 257.4c6.2 6.2 6.2 16.4 0 22.6l-12 12c-3.9 3.9-3.9 10.2 0 14.1z" fill="#036EB8" p-id="6867"></path><path d="M472.6 556.2m-16 0a16 16 0 1 0 32 0 16 16 0 1 0-32 0Z" fill="#3E3A39" p-id="6868"></path><path d="M440.6 582.8m-16 0a16 16 0 1 0 32 0 16 16 0 1 0-32 0Z" fill="#EF6676" p-id="6869"></path><path d="M612.3 582.8m-16 0a16 16 0 1 0 32 0 16 16 0 1 0-32 0Z" fill="#EF6676" p-id="6870"></path><path d="M580.3 556.2m-16 0a16 16 0 1 0 32 0 16 16 0 1 0-32 0Z" fill="#3E3A39" p-id="6871"></path><path d="M551.8 566.8h-50.6c-3.9 0-6.7 3.7-5.8 7.5 1.8 7.5 6.3 14 12.3 18.4 5.3 3.8 11.8 6.1 18.8 6.1s13.5-2.3 18.8-6.1c6.1-4.4 10.5-10.9 12.3-18.4 0.9-3.8-1.9-7.5-5.8-7.5z" fill="#3E3A39" p-id="6872"></path><path d="M526.5 582.8c-7 0-13.3 3.2-17.5 8.2-0.8 0.9-0.5 2.3 0.5 3 4.9 3.1 10.7 4.9 17 4.9s12.1-1.8 17-4.9c1-0.6 1.3-2 0.5-3-4.3-5-10.5-8.2-17.5-8.2z" fill="#E4847F" p-id="6873"></path></svg></div>', '标签名称', {
        confirmButtonText: '确定',
        showCancelButton: false,
        dangerouslyUseHTMLString: true,
        inputValue: '新建标签',
        center: true,
        cancelButtonText: '取消',
        inputPattern: /\S/,
        inputErrorMessage: '标签不能为空！',
        closeOnClickModal: false,
        roundButton: true
      }).then(({value}) => {

        this.$axios({
          url:'/tag/add',
          method: "POST",
          data: {
            name: value
          }
        }).then(res => {
          // console.log(res)
          if (res.data.code === 200) {
            this.$notifySuccess("添加成功！")

            this.getAllTags()
          }else {
            this.$loading.hideLoading();
            this.$notifyError(res.data.message)
          }
        }).catch(e => {
          console.log(e)
          this.$loading.hideLoading();
          this.$notifyError("添加失败！")
        })
      }).catch(() => {
      });
    },
    listFiles() {
      this.$loading.showLoading();
      this.$axios({
        url: '/file/list',
        method: 'GET',
        params: {
          prefix: this.currentPath
        }
      }).then(res => {
        this.$loading.hideLoading();
        if (res.data.code === 200) {
          this.files = res.data.data
          // console.log(this.files);
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

    downloadFile(path, name) {
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
                this.$notifySuccess('正在处理下载,请稍后...')
                this.downloadDir(item)
                // Message.warning("暂不支持下载文件夹");
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
          onClick:() => {
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
          {label: "移到保险箱", icon: "el-icon-lock",
            onClick:() => {
              this.safeVisible = true;
            }},
          {label: "移出收藏夹", icon: "el-icon-delete", customClass:"delete",
          onClick:() => {
            this.outTagVisible = true;
          }}
        ],
        event,
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
    moveOutTag() {
      this.$axios({
        url: "tag/moveOutTag",
        method: "post",
        params:{
          tagName: this.currentTag,
          ossPath: this.selectedFile.ossPath
        }
      }).then(res => {
        if (res.data.code === 200) {
          this.$notifySuccess("移出成功")

          this.outTagVisible = false;
          this.listTagFiles()
        }else {
          this.$notifyError(res.data.message)

        }
      }).catch(e => {
        console.log(e)
        this.$notifyError("网络错误")

      })
    },
    onTagMenu(tag) {
      this.$contextmenu({
        items: [
          {label: "重命名", icon: "el-icon-aim",
          onClick: () => {
            // console.log(tag)
            this.renameTag(tag.id);
          }},
          {label: "删除", icon: "el-icon-delete",
          onClick: () => {
            this.deleteTag(tag.id);
          }}
        ],
        event,
        customClass: "delete",
        zIndex: 3,
        minWidth: 200
      });
      return false;
    },
    jumpToDir(item) {
      if (item === '') {
        this.currentPath = '';
        this.prefixList = [];
        this.listTagFiles()
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
    getAllTags() {
      this.$axios.get("/tag/all").then(res => {
        if (res.data.code === 200) {
          this.tags = res.data.data;
          // console.log(this.tags[0])
          this.tabs = res.data.data[0].name;
          this.changeTag();
        }else {
          this.$notifyError(res.data.message)

        }
      }).catch(e => {
        console.log(e)
        this.$notifyError("网络错误")

      })
    },
    changeTag() {
      this.currentPath = ''
      this.prefixList= []
      this.currentTag = this.tabs
      this.listTagFiles()
    },
    listTagFiles() {
      this.$loading.showLoading();
      this.$axios({
        url: '/tag/list',
        method: 'GET',
        params: {
          tagName: this.currentTag
        }
      }).then(res => {
        this.$loading.hideLoading();
        if (res.data.code === 200) {
          this.files = res.data.data
          this.hasContent = this.files.length > 0
        }
      })
    },

    renameTag(id) {
      this.$prompt('<div style="display: flex; justify-content: center"><svg t="1637210734252" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6855" width="150" height="150"><path d="M244.4 827.4h-13.6v-13.6c0-3.4-2.8-6.2-6.2-6.2-3.4 0-6.2 2.8-6.2 6.2v13.6h-13.6c-3.4 0-6.2 2.8-6.2 6.2s2.8 6.2 6.2 6.2h13.6v13.6c0 3.4 2.8 6.2 6.2 6.2 3.4 0 6.2-2.8 6.2-6.2v-13.6h13.6c3.4 0 6.2-2.8 6.2-6.2s-2.8-6.2-6.2-6.2zM749.9 183.9h-13.6v-13.6c0-3.4-2.8-6.2-6.2-6.2-3.4 0-6.2 2.8-6.2 6.2v13.6h-13.6c-3.4 0-6.2 2.8-6.2 6.2 0 3.4 2.8 6.2 6.2 6.2h13.6v13.6c0 3.4 2.8 6.2 6.2 6.2 3.4 0 6.2-2.8 6.2-6.2v-13.6h13.6c3.4 0 6.2-2.8 6.2-6.2 0-3.4-2.7-6.2-6.2-6.2zM854.3 805.4c-11.6 0-21-9.4-21-21s9.4-21 21-21 21 9.4 21 21-9.4 21-21 21z m0-32c-6.1 0-11 4.9-11 11s4.9 11 11 11 11-4.9 11-11-4.9-11-11-11zM832.6 376.2c-11.6 0-21-9.4-21-21s9.4-21 21-21 21 9.4 21 21-9.4 21-21 21z m0-32c-6.1 0-11 4.9-11 11s4.9 11 11 11 11-4.9 11-11-4.9-11-11-11zM168.2 660.7c-1.7 0-3 1.4-3 3v9.7c0 1.7 1.4 3 3 3s3-1.4 3-3v-9.7c0-1.6-1.3-3-3-3zM168.2 689.8c-1.7 0-3 1.4-3 3v9.7c0 1.7 1.4 3 3 3s3-1.4 3-3v-9.7c0-1.7-1.3-3-3-3zM177.2 687.8c-1.2-1.2-3.1-1.2-4.3 0-1.2 1.2-1.2 3.1 0 4.3l6.8 6.8c0.6 0.6 1.4 0.9 2.1 0.9 0.8 0 1.5-0.3 2.1-0.9 1.2-1.2 1.2-3.1 0-4.3l-6.7-6.8zM156.7 667.3c-1.2-1.2-3.1-1.2-4.3 0-1.2 1.2-1.2 3.1 0 4.3l6.8 6.8c0.6 0.6 1.4 0.9 2.1 0.9 0.8 0 1.5-0.3 2.1-0.9 1.2-1.2 1.2-3.1 0-4.3l-6.7-6.8zM159.2 687.8l-6.8 6.8c-1.2 1.2-1.2 3.1 0 4.3 0.6 0.6 1.4 0.9 2.1 0.9 0.8 0 1.5-0.3 2.1-0.9l6.8-6.8c1.2-1.2 1.2-3.1 0-4.3-1.1-1.2-3-1.2-4.2 0zM175.1 679.3c0.8 0 1.5-0.3 2.1-0.9l6.8-6.8c1.2-1.2 1.2-3.1 0-4.3-1.2-1.2-3.1-1.2-4.3 0l-6.8 6.8c-1.2 1.2-1.2 3.1 0 4.3 0.6 0.6 1.4 0.9 2.2 0.9zM187.6 680.1h-9.7c-1.7 0-3 1.4-3 3s1.4 3 3 3h9.7c1.7 0 3-1.4 3-3s-1.3-3-3-3zM161.6 683.1c0-1.7-1.4-3-3-3h-9.7c-1.7 0-3 1.4-3 3s1.4 3 3 3h9.7c1.6 0 3-1.3 3-3z" fill="#036EB8" p-id="6856"></path><path d="M288 145.2m-8.9 0a8.9 8.9 0 1 0 17.8 0 8.9 8.9 0 1 0-17.8 0Z" fill="#036EB8" p-id="6857"></path><path d="M365.6 793.3m-8.9 0a8.9 8.9 0 1 0 17.8 0 8.9 8.9 0 1 0-17.8 0Z" fill="#036EB8" p-id="6858"></path><path d="M602 253.7m-8.9 0a8.9 8.9 0 1 0 17.8 0 8.9 8.9 0 1 0-17.8 0Z" fill="#036EB8" p-id="6859"></path><path d="M499.1 302l257.4 257.4c10.2 10.2 10.2 26.6 0 36.8l29-29c19.5-19.5 19.5-51.2 0-70.7L547.1 258c-9.4-9.4-22.1-14.6-35.4-14.6H253.6c-21 0-38 17-38 38v258.1c0 13.3 5.3 26 14.6 35.4l238.4 238.4c19.5 19.5 51.2 19.5 70.7 0l27.6-27.6a25.953 25.953 0 0 1-36.8 0L272.8 528.3a25.953 25.953 0 0 1 0-36.8L462.3 302c10.2-10.2 26.7-10.2 36.8 0z m-190.4 4.9c0-0.7 0.1-1.5 0-2.2v2.2z m0-2.4c0-1.5-0.2-2.9-0.4-4.4 0.3 1.5 0.4 2.9 0.4 4.4z m-0.4-4.5c-0.2-1.5-0.6-2.9-1-4.3 0.4 1.4 0.8 2.8 1 4.3z m-1.1-4.5c-0.2-0.7-0.5-1.4-0.7-2.1 0.3 0.7 0.5 1.4 0.7 2.1z m-54.6 30.6c-0.6-0.5-1.1-1-1.7-1.5-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0c0.5 0.5 1 1.1 1.5 1.7 0.6 0.5 1.1 1 1.7 1.5 3.2 3.2 5.6 6.9 7.1 10.9-11.5-4.5-25.1-2.1-34.4 7.1-9.3 9.3-11.7 22.9-7.1 34.4-4-1.6-7.7-3.9-10.9-7.1-0.5-0.5-1-1.1-1.5-1.7z m12.4 8.8c0.7 0.3 1.4 0.5 2.1 0.7-0.7-0.1-1.4-0.4-2.1-0.7z m2.2 0.8c1.4 0.4 2.9 0.8 4.3 1-1.4-0.2-2.9-0.5-4.3-1z m4.5 1.1c1.4 0.2 2.9 0.4 4.4 0.4-1.5-0.1-3-0.2-4.4-0.4z m4.6 0.4h2.2-2.2z m21.5-7.9c0.5-0.5 1.1-1 1.6-1.5s1-1.1 1.5-1.6c-0.5 0.5-1 1.1-1.5 1.6-0.6 0.5-1.1 1-1.6 1.5z m-19.3 7.8c0.7 0 1.4-0.1 2.1-0.2-0.7 0.1-1.4 0.2-2.1 0.2z m2.4-0.2l2.1-0.3-2.1 0.3z m2.1-0.4c0.7-0.1 1.3-0.3 2-0.5-0.6 0.2-1.3 0.4-2 0.5z m2.4-0.5c0.7-0.2 1.4-0.4 2-0.6-0.7 0.2-1.3 0.4-2 0.6z m2.1-0.7c0.6-0.2 1.2-0.5 1.9-0.7-0.7 0.2-1.3 0.5-1.9 0.7z m2.3-0.9c0.6-0.3 1.3-0.6 1.9-0.9-0.7 0.3-1.3 0.6-1.9 0.9z m2-1c0.6-0.3 1.2-0.6 1.7-1-0.6 0.4-1.2 0.7-1.7 1z m2.1-1.2l1.8-1.2-1.8 1.2z m1.8-1.3c0.5-0.4 1.1-0.8 1.6-1.3-0.5 0.5-1 0.9-1.6 1.3z m13-24c0 0.7-0.1 1.4-0.2 2.1 0.1-0.7 0.1-1.4 0.2-2.1z m-0.2 2.4l-0.3 2.1 0.3-2.1z m-0.4 2.2c-0.1 0.7-0.3 1.3-0.5 2 0.2-0.7 0.4-1.4 0.5-2z m-0.6 2.3c-0.2 0.7-0.4 1.4-0.6 2 0.2-0.6 0.4-1.3 0.6-2z m-0.6 2.1c-0.2 0.6-0.5 1.2-0.7 1.9 0.2-0.6 0.4-1.2 0.7-1.9z m-0.9 2.3c-0.3 0.6-0.6 1.3-0.9 1.9 0.3-0.6 0.6-1.2 0.9-1.9z m-1 2c-0.3 0.6-0.6 1.2-1 1.7 0.3-0.5 0.7-1.1 1-1.7z m-1.3 2.2l-1.2 1.8c0.4-0.7 0.8-1.2 1.2-1.8z m-1.2 1.8c-0.4 0.5-0.8 1.1-1.3 1.6 0.4-0.5 0.9-1.1 1.3-1.6z" fill="#F7F8F8" p-id="6860"></path><path d="M756.5 559.4L499.1 302a25.953 25.953 0 0 0-36.8 0L272.8 491.5a25.953 25.953 0 0 0 0 36.8l257.4 257.4c10.2 10.2 26.6 10.2 36.8 0l189.5-189.5c10.2-10.2 10.2-26.7 0-36.8z" fill="#F7F8F8" p-id="6861"></path><path d="M830 541l-44.5-44.5c19.5 19.5 19.5 51.2 0 70.7l-29 29L567 785.7l-27.6 27.6c-19.5 19.5-51.2 19.5-70.7 0l44.5 44.5c19.5 19.5 51.2 19.5 70.7 0L830 611.7c19.6-19.5 19.6-51.2 0-70.7z" fill="#2EA7E0" p-id="6862"></path><path d="M756.5 559.4L499.1 302a25.953 25.953 0 0 0-36.8 0L272.8 491.5a25.953 25.953 0 0 0 0 36.8l257.4 257.4c10.2 10.2 26.6 10.2 36.8 0l189.5-189.5c10.2-10.2 10.2-26.7 0-36.8z" fill="#F7F8F8" p-id="6863"></path><path d="M254.1 282.5c12-12 31-12.5 43.6-1.5-0.5-0.6-1-1.1-1.5-1.7-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3c0.5 0.5 1.1 1 1.7 1.5-11-12.5-10.5-31.6 1.5-43.6z" fill="#F7F8F8" p-id="6864"></path><path d="M317.4 300.6c-3.2-3.2-6.9-5.6-10.9-7.1 4.5 11.5 2.1 25.1-7.1 34.4-9.3 9.3-22.9 11.7-34.4 7.1 1.6 4 3.9 7.7 7.1 10.9 12.5 12.5 32.8 12.5 45.3 0 12.5-12.6 12.5-32.8 0-45.3z" fill="#2EA7E0" p-id="6865"></path><path d="M836.8 533.6l-312-312c-11.3-11.3-26.4-17.6-42.4-17.6h-47.9c-5.5 0-10 4.5-10 10s4.5 10 10 10h47.9c10.7 0 20.7 4.2 28.3 11.7l312 312c15.6 15.6 15.6 41 0 56.6L576.6 850.4c-15.6 15.6-41 15.6-56.6 0L319.4 649.8c-3.9-3.9-10.2-3.9-14.1 0s-3.9 10.2 0 14.1l200.6 200.6c23.4 23.4 61.5 23.4 84.9 0l246.1-246.1c23.3-23.3 23.3-61.4-0.1-84.8zM294 624.3l-17-17c-3.9-3.9-10.2-3.9-14.1 0-3.9 3.9-3.9 10.2 0 14.1l17 17c3.9 3.9 10.2 3.9 14.1 0s3.9-10.2 0-14.1zM252.9 583.3l-45-45c-7.6-7.6-11.7-17.6-11.7-28.3V252c0-15.4 12.6-28 28-28h180c5.5 0 10-4.5 10-10s-4.5-10-10-10h-180c-26.5 0-48 21.5-48 48v258.1c0 16 6.2 31.1 17.6 42.4l45 45c3.9 3.9 10.2 3.9 14.1 0 4-3.9 4-10.3 0-14.2z" fill="#036EB8" p-id="6866"></path><path d="M306.1 275.1c-16.4-16.4-43-16.4-59.4 0s-16.4 43 0 59.4 43 16.4 59.4 0c16.4-16.3 16.4-43 0-59.4z m-45.2 45.3c-8.6-8.6-8.6-22.5 0-31.1 8.6-8.6 22.5-8.6 31.1 0s8.6 22.5 0 31.1-22.6 8.6-31.1 0zM737.1 614.9c3.9 3.9 10.2 3.9 14.1 0l12-12c14-14 14-36.9 0-50.9L505.9 294.6c-14-14-36.9-14-50.9 0L265.4 484.1c-14 14-14 36.9 0 50.9l257.4 257.4c14 14 36.9 14 50.9 0L725 641.1c3.9-3.9 3.9-10.2 0-14.1-3.9-3.9-10.2-3.9-14.1 0L559.6 778.3c-6.2 6.2-16.4 6.2-22.6 0L279.6 520.9c-6.2-6.2-6.2-16.4 0-22.6l189.5-189.5c6.2-6.2 16.4-6.2 22.6 0l257.4 257.4c6.2 6.2 6.2 16.4 0 22.6l-12 12c-3.9 3.9-3.9 10.2 0 14.1z" fill="#036EB8" p-id="6867"></path><path d="M472.6 556.2m-16 0a16 16 0 1 0 32 0 16 16 0 1 0-32 0Z" fill="#3E3A39" p-id="6868"></path><path d="M440.6 582.8m-16 0a16 16 0 1 0 32 0 16 16 0 1 0-32 0Z" fill="#EF6676" p-id="6869"></path><path d="M612.3 582.8m-16 0a16 16 0 1 0 32 0 16 16 0 1 0-32 0Z" fill="#EF6676" p-id="6870"></path><path d="M580.3 556.2m-16 0a16 16 0 1 0 32 0 16 16 0 1 0-32 0Z" fill="#3E3A39" p-id="6871"></path><path d="M551.8 566.8h-50.6c-3.9 0-6.7 3.7-5.8 7.5 1.8 7.5 6.3 14 12.3 18.4 5.3 3.8 11.8 6.1 18.8 6.1s13.5-2.3 18.8-6.1c6.1-4.4 10.5-10.9 12.3-18.4 0.9-3.8-1.9-7.5-5.8-7.5z" fill="#3E3A39" p-id="6872"></path><path d="M526.5 582.8c-7 0-13.3 3.2-17.5 8.2-0.8 0.9-0.5 2.3 0.5 3 4.9 3.1 10.7 4.9 17 4.9s12.1-1.8 17-4.9c1-0.6 1.3-2 0.5-3-4.3-5-10.5-8.2-17.5-8.2z" fill="#E4847F" p-id="6873"></path></svg></div>', '标签名称', {
        confirmButtonText: '确定',
        showCancelButton: false,
        dangerouslyUseHTMLString: true,
        inputValue: '重命名标签',
        center: true,
        // cancelButtonText: '取消',
        // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        // inputErrorMessage: '邮箱格式不正确'
      }).then(({value}) => {

        this.$axios({
          url:'/tag/rename',
          method: "POST",
          params: {
            tagId: id,
            newName: value
          }
        }).then(res => {
          // console.log(res)
          if (res.data.code === 200) {
            this.$notifySuccess("重命名成功")

            this.getAllTags()
          }else {
            this.$loading.hideLoading();
            this.$notifyError(res.data.message)

          }
        }).catch(e => {
          console.log(e)
          this.$notifyError("网络错误")

        })
      }).catch(() => {
      });
    },
    deleteTag(id) {
      this.$confirm('<div style="display: flex;flex-direction: column justify-content: center; align-items: center"><svg t="1637300192737" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5190" width="64" height="64"><path d="M510.082 510.104m-445.605 0a445.605 445.605 0 1 0 891.21 0 445.605 445.605 0 1 0-891.21 0Z" fill="#FF7A5B" p-id="5191"></path><path d="M686.679 659.47a0.074 0.074 0 0 1-0.021 0H330.145a10.001 10.001 0 0 1-8.784-14.78l178.257-327.597a10 10 0 0 1 17.568 0l177.968 327.066a9.955 9.955 0 0 1 1.525 5.311c0 5.522-4.478 10-10 10z m-339.709-20h322.862L508.401 342.795 346.97 639.47z" fill="#FFFFFF" p-id="5192"></path><path d="M522.466 592.67c2.787 2.705 4.185 6.06 4.185 10.068 0 3.662-1.397 6.89-4.185 9.677-2.791 2.791-6.105 4.185-9.938 4.185-3.837 0-7.106-1.394-9.807-4.185-2.705-2.787-4.054-6.015-4.054-9.677 0-4.009 1.349-7.363 4.054-10.068 2.701-2.701 5.97-4.054 9.807-4.054 3.833 0 7.147 1.353 9.938 4.054z m-2.746-35.046c1.479-1.654 2.223-4.486 2.223-8.499V430.912c0-4.356-0.743-7.278-2.223-8.761-1.483-1.479-3.882-2.223-7.192-2.223-3.314 0-5.712 0.785-7.192 2.354-1.483 1.569-2.223 4.36-2.223 8.369v118.735c0 4.014 0.739 6.8 2.223 8.369 1.479 1.569 3.878 2.354 7.192 2.354 3.311 0 5.709-0.826 7.192-2.485z" fill="#FFFFFF" p-id="5193"></path></svg>' +
        '<p style="margin-left: 10px">确定删除标签吗？标签下原文件<span style="color: #07965a">不会</span>被删除</p></div>', '删除标签', {
        confirmButtonText: '确定',
        showCancelButton: true,
        dangerouslyUseHTMLString: true,
        center: true,
        // cancelButtonText: '取消',
        // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        // inputErrorMessage: '邮箱格式不正确'
      }).then(() => {

        this.$axios({
          url:'/tag/delete',
          method: "POST",
          params: {
            tagId: id,
          }
        }).then(res => {
          // console.log(res)
          if (res.data.code === 200) {
            this.$notifySuccess("删除成功")

            this.getAllTags()
          }else {
            this.$loading.hideLoading();
            this.$notifyError(res.data.message)

          }
        }).catch(e => {
          console.log(e)
          this.$notifyError("网络错误")

        })
      }).catch(() => {
      });
    },
    closeShare() {
      this.shareVisible = false;
    },
    moveToSafe() {
      this.$axios({
        url: '/safe/moveToSafe',
        method: "POST",
        params: {
          ossPath: this.selectedFile.ossPath,
        }
      }).then(res => {
        // console.log(res)
        if (res.data.code === 200) {
          this.$notifySuccess("已移入保险箱！")

          this.safeVisible = false
          this.listTagFiles()
        } else {
          this.$loading.hideLoading();
          this.notifyError(res.data.message)
        }
      }).catch(e => {
        console.log(e)
        this.notifyError("网络错误")
      })
    }
  },
  created() {
    this.getAllTags();
    // console.log(this.tags)

  },
  name: "Tag"
}
</script>

<style>



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

.detailTitle{
  margin-top: 20px;
  font-size: 16px;
}
.detailValue{
  margin-top: 7px;
  font-size: 14px;
  color: #2b7a99;
}
.detailDiv{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}
.uploadInfo{
  width: 240px;
  display: flex;
}
.el-dialog {
  border-radius: 15px;
}
.el-message-box {
  border-radius: 15px;
}
.el-button--primary {
  background-color: rgb(140 122 244);
  border: none;
}
.el-button {
  border: 0 solid #DCDFE6;
  border-radius: 10px;
}
.el-tabs--left, .el-tabs--right{
  overflow: visible;
}

</style>
