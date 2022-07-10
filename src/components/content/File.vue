<template>
  <div>
    <div class="header">
      <div id="navi">
        <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-left: 50px">
          <el-breadcrumb-item @click.native="jumpToDir('')"l><a href="javascript:">文件</a></el-breadcrumb-item>

          <el-breadcrumb-item @click.native="jumpToDir(item)" v-for="item in prefixList" :key="item"><a href="javascript:">{{item}} </a></el-breadcrumb-item>
        </el-breadcrumb>
      </div>
<!--      <svg @click="drawer = true" t="1636536169596" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5831" width="50" height="50"><path d="M954.5 632.7c-10.5-82-84.4-141.4-167.1-141.4h-42.8V451c0-124.1-93.4-232.6-217.2-240.9-135.8-9.1-249.2 98.8-249.2 232.7v48.5h-42.8c-82.7 0-156.5 59.3-167.1 141.4-12.8 99.3 64.5 184.2 161.3 184.2h563.5c96.8 0 174.1-84.9 161.4-184.2z m-324-68.7l-5.7 5.7c-11.3 11.3-29.6 11.3-40.8 0l-39.2-39.2v165.3c0 18.3-14.8 33.2-33.2 33.2h-0.5c-18.3 0-33.2-14.8-33.2-33.2V530.5l-39.2 39.2c-11.3 11.3-29.6 11.3-40.8 0l-5.7-5.7c-11.3-11.3-11.3-29.6 0-40.8l97.5-97.5c5.9-5.9 13.8-8.8 21.6-8.4 7.8-0.3 15.7 2.5 21.6 8.4l97.5 97.5c11.4 11.2 11.4 29.5 0.1 40.8z" fill="#3259CE" p-id="5832"></path></svg><path d="M894.1 490.5c-32.5-33.7-76.1-52.3-122.9-52.3h-28.8c-2.6 0-5.1-1-6.9-2.9-1.9-1.9-2.9-4.4-2.8-7.1V425c0-128.5-104.5-233-233-233s-233 104.5-233 233v3.2c0 2.7-1 5.2-2.8 7.1-1.8 1.9-4.3 2.9-6.9 2.9h-30.5c-43.7 0-85.2 16.8-116.7 47.2-31.5 30.4-49.7 71-51.3 114.5-1.7 45.7 14.9 89.1 46.9 122.3 32.5 33.7 76.1 52.3 122.9 52.3h544.6c43.7 0 85.2-16.8 116.7-47.2 31.5-30.4 49.7-71 51.3-114.5 1.7-45.7-14.9-89.1-46.8-122.3z m-667.5-12.9h62.7c5.8 0 11.2-2.5 15-6.9s5.4-10.2 4.5-15.9c-1.7-11-2.6-20.8-2.6-29.9 0-106.7 86.8-193.5 193.5-193.5S693.3 318.3 693.3 425c0 9.1-0.8 18.6-2.6 29.9-0.9 5.7 0.8 11.5 4.5 15.8 3.7 4.4 9.2 6.9 15 6.9h62.7c71 0 128.7 57.8 128.7 128.7S843.8 735 772.9 735H226.6c-71 0-128.7-57.8-128.7-128.7s57.7-128.7 128.7-128.7z" fill="#13227a" p-id="3856" data-spm-anchor-id="a313x.7781069.0.i1" class="selected"></path><path d="M772.9 780H228.3c-48.3 0-93.4-19.2-126.9-54-33-34.3-50.2-79.1-48.4-126.3 1.7-44.9 20.5-86.9 53-118.3 32.6-31.4 75.4-48.7 120.5-48.7H257c1.1 0 2.2-0.4 3-1.2 0.8-0.8 1.3-1.9 1.2-3.1v-3.3c0-131.5 107-238.5 238.5-238.5s238.5 107 238.5 238.5v3.3c0 1.2 0.4 2.3 1.2 3.1 0.8 0.8 1.8 1.2 3 1.2h28.8c48.3 0 93.4 19.2 126.9 54 33 34.3 50.2 79.1 48.4 126.3-1.7 44.9-20.5 86.9-53 118.3C860.8 762.7 818 780 772.9 780zM226.6 443.7c-42.3 0-82.4 16.2-112.9 45.7-30.4 29.3-48.1 68.7-49.7 110.7-1.7 44.2 14.4 86.2 45.3 118.3C140.8 751 183 769 228.3 769h544.6c42.3 0 82.4-16.2 112.9-45.7 30.4-29.4 48.1-68.7 49.7-110.8 1.7-44.2-14.4-86.2-45.3-118.3-31.4-32.6-73.7-50.6-118.9-50.6h-28.8c-4.1 0-7.9-1.6-10.8-4.5-2.9-3-4.5-6.9-4.4-11v-3.2c0-125.4-102-227.5-227.5-227.5-125.4 0-227.5 102-227.5 227.5v3.2c0.1 4.2-1.5 8.1-4.4 11-2.9 2.9-6.7 4.5-10.8 4.5h-30.5z m546.3 296.9H226.6c-74 0-134.2-60.2-134.2-134.2s60.2-134.2 134.2-134.2h62.7c4.2 0 8.1-1.8 10.8-5 2.7-3.2 3.9-7.3 3.2-11.4-1.8-11.3-2.6-21.4-2.6-30.7 0-109.8 89.3-199 199-199 109.8 0 199 89.3 199 199 0 9.4-0.8 19.2-2.6 30.8-0.6 4.1 0.5 8.3 3.2 11.4 2.7 3.2 6.6 5 10.8 5h62.7c74 0 134.2 60.2 134.2 134.2s-60.1 134.1-134.1 134.1zM226.6 483.1c-68 0-123.2 55.3-123.2 123.2s55.3 123.2 123.2 123.2h546.3c68 0 123.2-55.3 123.2-123.2s-55.3-123.2-123.2-123.2h-62.7c-7.4 0-14.3-3.2-19.1-8.8-4.8-5.6-6.9-13-5.8-20.3 1.7-11 2.5-20.3 2.5-29.1 0-103.7-84.4-188-188-188s-188 84.4-188 188c0 8.8 0.8 18.3 2.5 29 1.1 7.3-1 14.7-5.7 20.3-4.8 5.6-11.8 8.8-19.1 8.8h-62.9z" fill="#13227a" p-id="3857"></path><path d="M630 516.4l-0.1-0.1-100.5-88.4-0.3-0.3c-8.6-7-16.9-10.2-26-10.2-8.8 0-17.6 3.5-26 10.3L376.6 517l-0.2 0.2c-5.1 4.6-7.8 10.8-7.8 17.9 0 13.4 10.9 24.3 24.3 24.3 8.2 0 14.2-4.7 16.3-6.4l0.4-0.3 69.1-60.3v164c0 13.4 10.9 24.3 24.3 24.3s24.3-10.9 24.3-24.3V491.8l68.7 59.4c4.5 4.7 10.7 7.3 17.5 7.3 13.4 0 24.3-10.9 24.3-24.3 0.2-6.9-2.6-13.2-7.8-17.8z" fill="#1296db" p-id="3858" data-spm-anchor-id="a313x.7781069.0.i2" class=""></path></svg>-->

      <el-tooltip class="item" effect="light" content="上传同名文件会自动覆盖" placement="bottom" style="margin-right: 50px;">
        <el-dropdown split-button type="primary" @click.native="uploadFile" style="">
          <i class="el-icon-upload el-icon--right"></i>  上传
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="newDir">新建文件夹</el-dropdown-item>
            <el-divider style="margin: -10px 0"></el-divider>
            <el-dropdown-item @click.native="uploadFile">上传文件</el-dropdown-item>
            <el-dropdown-item @click.native="uploadDir">上传文件夹</el-dropdown-item>
            <input id="file" ref="files" type="file" style="display: none" @change="getFile" ></input>
            <input id="dir" ref="files" type="file" webkitdirectory style="display: none" @change="getDir"></input>
          </el-dropdown-menu>
        </el-dropdown>
      </el-tooltip>

    </div>
<!--    <el-divider class="divider"></el-divider>-->
<!--    <el-alert-->
<!--      title="温馨提示"-->
<!--      type="success"-->
<!--      close-text="知道了"-->
<!--      style="width: 100%;display: flex;align-content: center; border-radius: 20px"-->
<!--      description="①试试对着文件点下右键~    ②上传进度可在左侧上传列表中查看~    ③已知缺陷：a.文件夹暂时无法进行分享和下载"-->
<!--      show-icon>-->
<!--    </el-alert>-->
    <div >
      <transition name="el-fade-in-linear">
      </transition>
    </div>

    <div ref="content" v-if="afterUpload">
      <blank-content v-if="!hasContent"></blank-content>
      <!--    <search_input :isHistory="true" class="search">-->
      <!--      &lt;!&ndash;                    :lists_title="search_result_title"&ndash;&gt;-->
      <!--      &lt;!&ndash;                    :lists_note="search_result_note"&ndash;&gt;-->
      <!--      &lt;!&ndash;                    @parent_get_lists="get_selected_lists"&ndash;&gt;-->
      <!--      &lt;!&ndash;                    @parent_search="finish_search">&ndash;&gt;-->
      <!--    </search_input>-->
      <!--    <div class="fileNav">-->
      <!--      <el-radio v-model="fileCount" label="1">共{{fileCount}}</el-radio>-->
      <!--    </div>-->
      <div v-if="hasContent" style="
 height:71vh ;display: flex;flex-direction: row; flex-wrap: wrap; overflow: auto; padding: 30px">

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

    <el-dialog center title="请选择标签" :visible.sync="dialogTableVisible" width="30% ">

      <div  style="display: flex;flex-direction: column; align-items: center;">
        <svg t="1637210734252" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6855" width="150" height="150"><path d="M244.4 827.4h-13.6v-13.6c0-3.4-2.8-6.2-6.2-6.2-3.4 0-6.2 2.8-6.2 6.2v13.6h-13.6c-3.4 0-6.2 2.8-6.2 6.2s2.8 6.2 6.2 6.2h13.6v13.6c0 3.4 2.8 6.2 6.2 6.2 3.4 0 6.2-2.8 6.2-6.2v-13.6h13.6c3.4 0 6.2-2.8 6.2-6.2s-2.8-6.2-6.2-6.2zM749.9 183.9h-13.6v-13.6c0-3.4-2.8-6.2-6.2-6.2-3.4 0-6.2 2.8-6.2 6.2v13.6h-13.6c-3.4 0-6.2 2.8-6.2 6.2 0 3.4 2.8 6.2 6.2 6.2h13.6v13.6c0 3.4 2.8 6.2 6.2 6.2 3.4 0 6.2-2.8 6.2-6.2v-13.6h13.6c3.4 0 6.2-2.8 6.2-6.2 0-3.4-2.7-6.2-6.2-6.2zM854.3 805.4c-11.6 0-21-9.4-21-21s9.4-21 21-21 21 9.4 21 21-9.4 21-21 21z m0-32c-6.1 0-11 4.9-11 11s4.9 11 11 11 11-4.9 11-11-4.9-11-11-11zM832.6 376.2c-11.6 0-21-9.4-21-21s9.4-21 21-21 21 9.4 21 21-9.4 21-21 21z m0-32c-6.1 0-11 4.9-11 11s4.9 11 11 11 11-4.9 11-11-4.9-11-11-11zM168.2 660.7c-1.7 0-3 1.4-3 3v9.7c0 1.7 1.4 3 3 3s3-1.4 3-3v-9.7c0-1.6-1.3-3-3-3zM168.2 689.8c-1.7 0-3 1.4-3 3v9.7c0 1.7 1.4 3 3 3s3-1.4 3-3v-9.7c0-1.7-1.3-3-3-3zM177.2 687.8c-1.2-1.2-3.1-1.2-4.3 0-1.2 1.2-1.2 3.1 0 4.3l6.8 6.8c0.6 0.6 1.4 0.9 2.1 0.9 0.8 0 1.5-0.3 2.1-0.9 1.2-1.2 1.2-3.1 0-4.3l-6.7-6.8zM156.7 667.3c-1.2-1.2-3.1-1.2-4.3 0-1.2 1.2-1.2 3.1 0 4.3l6.8 6.8c0.6 0.6 1.4 0.9 2.1 0.9 0.8 0 1.5-0.3 2.1-0.9 1.2-1.2 1.2-3.1 0-4.3l-6.7-6.8zM159.2 687.8l-6.8 6.8c-1.2 1.2-1.2 3.1 0 4.3 0.6 0.6 1.4 0.9 2.1 0.9 0.8 0 1.5-0.3 2.1-0.9l6.8-6.8c1.2-1.2 1.2-3.1 0-4.3-1.1-1.2-3-1.2-4.2 0zM175.1 679.3c0.8 0 1.5-0.3 2.1-0.9l6.8-6.8c1.2-1.2 1.2-3.1 0-4.3-1.2-1.2-3.1-1.2-4.3 0l-6.8 6.8c-1.2 1.2-1.2 3.1 0 4.3 0.6 0.6 1.4 0.9 2.2 0.9zM187.6 680.1h-9.7c-1.7 0-3 1.4-3 3s1.4 3 3 3h9.7c1.7 0 3-1.4 3-3s-1.3-3-3-3zM161.6 683.1c0-1.7-1.4-3-3-3h-9.7c-1.7 0-3 1.4-3 3s1.4 3 3 3h9.7c1.6 0 3-1.3 3-3z" fill="#036EB8" p-id="6856"></path><path d="M288 145.2m-8.9 0a8.9 8.9 0 1 0 17.8 0 8.9 8.9 0 1 0-17.8 0Z" fill="#036EB8" p-id="6857"></path><path d="M365.6 793.3m-8.9 0a8.9 8.9 0 1 0 17.8 0 8.9 8.9 0 1 0-17.8 0Z" fill="#036EB8" p-id="6858"></path><path d="M602 253.7m-8.9 0a8.9 8.9 0 1 0 17.8 0 8.9 8.9 0 1 0-17.8 0Z" fill="#036EB8" p-id="6859"></path><path d="M499.1 302l257.4 257.4c10.2 10.2 10.2 26.6 0 36.8l29-29c19.5-19.5 19.5-51.2 0-70.7L547.1 258c-9.4-9.4-22.1-14.6-35.4-14.6H253.6c-21 0-38 17-38 38v258.1c0 13.3 5.3 26 14.6 35.4l238.4 238.4c19.5 19.5 51.2 19.5 70.7 0l27.6-27.6a25.953 25.953 0 0 1-36.8 0L272.8 528.3a25.953 25.953 0 0 1 0-36.8L462.3 302c10.2-10.2 26.7-10.2 36.8 0z m-190.4 4.9c0-0.7 0.1-1.5 0-2.2v2.2z m0-2.4c0-1.5-0.2-2.9-0.4-4.4 0.3 1.5 0.4 2.9 0.4 4.4z m-0.4-4.5c-0.2-1.5-0.6-2.9-1-4.3 0.4 1.4 0.8 2.8 1 4.3z m-1.1-4.5c-0.2-0.7-0.5-1.4-0.7-2.1 0.3 0.7 0.5 1.4 0.7 2.1z m-54.6 30.6c-0.6-0.5-1.1-1-1.7-1.5-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0c0.5 0.5 1 1.1 1.5 1.7 0.6 0.5 1.1 1 1.7 1.5 3.2 3.2 5.6 6.9 7.1 10.9-11.5-4.5-25.1-2.1-34.4 7.1-9.3 9.3-11.7 22.9-7.1 34.4-4-1.6-7.7-3.9-10.9-7.1-0.5-0.5-1-1.1-1.5-1.7z m12.4 8.8c0.7 0.3 1.4 0.5 2.1 0.7-0.7-0.1-1.4-0.4-2.1-0.7z m2.2 0.8c1.4 0.4 2.9 0.8 4.3 1-1.4-0.2-2.9-0.5-4.3-1z m4.5 1.1c1.4 0.2 2.9 0.4 4.4 0.4-1.5-0.1-3-0.2-4.4-0.4z m4.6 0.4h2.2-2.2z m21.5-7.9c0.5-0.5 1.1-1 1.6-1.5s1-1.1 1.5-1.6c-0.5 0.5-1 1.1-1.5 1.6-0.6 0.5-1.1 1-1.6 1.5z m-19.3 7.8c0.7 0 1.4-0.1 2.1-0.2-0.7 0.1-1.4 0.2-2.1 0.2z m2.4-0.2l2.1-0.3-2.1 0.3z m2.1-0.4c0.7-0.1 1.3-0.3 2-0.5-0.6 0.2-1.3 0.4-2 0.5z m2.4-0.5c0.7-0.2 1.4-0.4 2-0.6-0.7 0.2-1.3 0.4-2 0.6z m2.1-0.7c0.6-0.2 1.2-0.5 1.9-0.7-0.7 0.2-1.3 0.5-1.9 0.7z m2.3-0.9c0.6-0.3 1.3-0.6 1.9-0.9-0.7 0.3-1.3 0.6-1.9 0.9z m2-1c0.6-0.3 1.2-0.6 1.7-1-0.6 0.4-1.2 0.7-1.7 1z m2.1-1.2l1.8-1.2-1.8 1.2z m1.8-1.3c0.5-0.4 1.1-0.8 1.6-1.3-0.5 0.5-1 0.9-1.6 1.3z m13-24c0 0.7-0.1 1.4-0.2 2.1 0.1-0.7 0.1-1.4 0.2-2.1z m-0.2 2.4l-0.3 2.1 0.3-2.1z m-0.4 2.2c-0.1 0.7-0.3 1.3-0.5 2 0.2-0.7 0.4-1.4 0.5-2z m-0.6 2.3c-0.2 0.7-0.4 1.4-0.6 2 0.2-0.6 0.4-1.3 0.6-2z m-0.6 2.1c-0.2 0.6-0.5 1.2-0.7 1.9 0.2-0.6 0.4-1.2 0.7-1.9z m-0.9 2.3c-0.3 0.6-0.6 1.3-0.9 1.9 0.3-0.6 0.6-1.2 0.9-1.9z m-1 2c-0.3 0.6-0.6 1.2-1 1.7 0.3-0.5 0.7-1.1 1-1.7z m-1.3 2.2l-1.2 1.8c0.4-0.7 0.8-1.2 1.2-1.8z m-1.2 1.8c-0.4 0.5-0.8 1.1-1.3 1.6 0.4-0.5 0.9-1.1 1.3-1.6z" fill="#F7F8F8" p-id="6860"></path><path d="M756.5 559.4L499.1 302a25.953 25.953 0 0 0-36.8 0L272.8 491.5a25.953 25.953 0 0 0 0 36.8l257.4 257.4c10.2 10.2 26.6 10.2 36.8 0l189.5-189.5c10.2-10.2 10.2-26.7 0-36.8z" fill="#F7F8F8" p-id="6861"></path><path d="M830 541l-44.5-44.5c19.5 19.5 19.5 51.2 0 70.7l-29 29L567 785.7l-27.6 27.6c-19.5 19.5-51.2 19.5-70.7 0l44.5 44.5c19.5 19.5 51.2 19.5 70.7 0L830 611.7c19.6-19.5 19.6-51.2 0-70.7z" fill="#2EA7E0" p-id="6862"></path><path d="M756.5 559.4L499.1 302a25.953 25.953 0 0 0-36.8 0L272.8 491.5a25.953 25.953 0 0 0 0 36.8l257.4 257.4c10.2 10.2 26.6 10.2 36.8 0l189.5-189.5c10.2-10.2 10.2-26.7 0-36.8z" fill="#F7F8F8" p-id="6863"></path><path d="M254.1 282.5c12-12 31-12.5 43.6-1.5-0.5-0.6-1-1.1-1.5-1.7-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3c0.5 0.5 1.1 1 1.7 1.5-11-12.5-10.5-31.6 1.5-43.6z" fill="#F7F8F8" p-id="6864"></path><path d="M317.4 300.6c-3.2-3.2-6.9-5.6-10.9-7.1 4.5 11.5 2.1 25.1-7.1 34.4-9.3 9.3-22.9 11.7-34.4 7.1 1.6 4 3.9 7.7 7.1 10.9 12.5 12.5 32.8 12.5 45.3 0 12.5-12.6 12.5-32.8 0-45.3z" fill="#2EA7E0" p-id="6865"></path><path d="M836.8 533.6l-312-312c-11.3-11.3-26.4-17.6-42.4-17.6h-47.9c-5.5 0-10 4.5-10 10s4.5 10 10 10h47.9c10.7 0 20.7 4.2 28.3 11.7l312 312c15.6 15.6 15.6 41 0 56.6L576.6 850.4c-15.6 15.6-41 15.6-56.6 0L319.4 649.8c-3.9-3.9-10.2-3.9-14.1 0s-3.9 10.2 0 14.1l200.6 200.6c23.4 23.4 61.5 23.4 84.9 0l246.1-246.1c23.3-23.3 23.3-61.4-0.1-84.8zM294 624.3l-17-17c-3.9-3.9-10.2-3.9-14.1 0-3.9 3.9-3.9 10.2 0 14.1l17 17c3.9 3.9 10.2 3.9 14.1 0s3.9-10.2 0-14.1zM252.9 583.3l-45-45c-7.6-7.6-11.7-17.6-11.7-28.3V252c0-15.4 12.6-28 28-28h180c5.5 0 10-4.5 10-10s-4.5-10-10-10h-180c-26.5 0-48 21.5-48 48v258.1c0 16 6.2 31.1 17.6 42.4l45 45c3.9 3.9 10.2 3.9 14.1 0 4-3.9 4-10.3 0-14.2z" fill="#036EB8" p-id="6866"></path><path d="M306.1 275.1c-16.4-16.4-43-16.4-59.4 0s-16.4 43 0 59.4 43 16.4 59.4 0c16.4-16.3 16.4-43 0-59.4z m-45.2 45.3c-8.6-8.6-8.6-22.5 0-31.1 8.6-8.6 22.5-8.6 31.1 0s8.6 22.5 0 31.1-22.6 8.6-31.1 0zM737.1 614.9c3.9 3.9 10.2 3.9 14.1 0l12-12c14-14 14-36.9 0-50.9L505.9 294.6c-14-14-36.9-14-50.9 0L265.4 484.1c-14 14-14 36.9 0 50.9l257.4 257.4c14 14 36.9 14 50.9 0L725 641.1c3.9-3.9 3.9-10.2 0-14.1-3.9-3.9-10.2-3.9-14.1 0L559.6 778.3c-6.2 6.2-16.4 6.2-22.6 0L279.6 520.9c-6.2-6.2-6.2-16.4 0-22.6l189.5-189.5c6.2-6.2 16.4-6.2 22.6 0l257.4 257.4c6.2 6.2 6.2 16.4 0 22.6l-12 12c-3.9 3.9-3.9 10.2 0 14.1z" fill="#036EB8" p-id="6867"></path><path d="M472.6 556.2m-16 0a16 16 0 1 0 32 0 16 16 0 1 0-32 0Z" fill="#3E3A39" p-id="6868"></path><path d="M440.6 582.8m-16 0a16 16 0 1 0 32 0 16 16 0 1 0-32 0Z" fill="#EF6676" p-id="6869"></path><path d="M612.3 582.8m-16 0a16 16 0 1 0 32 0 16 16 0 1 0-32 0Z" fill="#EF6676" p-id="6870"></path><path d="M580.3 556.2m-16 0a16 16 0 1 0 32 0 16 16 0 1 0-32 0Z" fill="#3E3A39" p-id="6871"></path><path d="M551.8 566.8h-50.6c-3.9 0-6.7 3.7-5.8 7.5 1.8 7.5 6.3 14 12.3 18.4 5.3 3.8 11.8 6.1 18.8 6.1s13.5-2.3 18.8-6.1c6.1-4.4 10.5-10.9 12.3-18.4 0.9-3.8-1.9-7.5-5.8-7.5z" fill="#3E3A39" p-id="6872"></path><path d="M526.5 582.8c-7 0-13.3 3.2-17.5 8.2-0.8 0.9-0.5 2.3 0.5 3 4.9 3.1 10.7 4.9 17 4.9s12.1-1.8 17-4.9c1-0.6 1.3-2 0.5-3-4.3-5-10.5-8.2-17.5-8.2z" fill="#E4847F" p-id="6873"></path></svg>
        <el-select v-model="value" placeholder="请选择标签" @change="changeTag">
          <el-option v-for="tag in tags" :key="tag.id" :label="tag.name" :value="tag.name" ></el-option>
        </el-select>
      </div>

      <div slot="footer" class="dialog-footer">
<!--        <el-button @click="dialogTableVisible = false">取 消</el-button>-->
        <el-button type="primary" @click="addFileToTag">确 定</el-button>
      </div>
    </el-dialog>

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


    <el-dialog
      title="文件详情"
      :visible.sync="detailVisible"
      width="25%"
      center>
      <div style="padding:20px 0px; display: flex; flex-direction: column; justify-content: center; align-items: center;border-radius: 20px">
        <img width="65px" height="65px" ref="typeImg" :src=" supportedTypes.findIndex(type =>type ===this.selectedFile.type) !== -1 ? 'static/fileType/'+this.selectedFile.type+'.svg' : 'static/fileType/unknow.svg' "/>
        <span style="font-size: 16px;margin-top: 20px;color: #6d6e72" ref="fileName">{{selectedFile.name}}</span>
      </div>
      <div class="detailDiv">
        <span class="detailTitle">文件名称</span>
        <span class="detailValue">{{detailFile.name}}</span>
      </div>
      <div class="detailDiv">
        <span class="detailTitle">文件大小</span>
        <span class="detailValue">{{calSize}}</span>
      </div>
      <div class="detailDiv">
        <span class="detailTitle">文件类型</span>
        <span class="detailValue">{{detailFile.type}}</span>
      </div>
      <div class="detailDiv">
        <span class="detailTitle">创建时间</span>
        <span class="detailValue">{{detailFile.createTimeStr}}</span>
      </div>
      <div class="detailDiv">
        <span class="detailTitle">最后更新时间</span>
        <span class="detailValue">{{detailFile.lastModified}}</span>
      </div>
      <div class="detailDiv">
        <span class="detailTitle">文件路径</span>
        <span class="detailValue">{{detailFile.ossPath }}</span>
      </div>
    </el-dialog>
    <s-share v-if="shareVisible" :item="this.selectedFile" :visible="this.shareVisible" @openShare="closeShare"></s-share>
    <preview-pop :visible.sync="preViewPopUp" :title='selectedFile.name' class="dialog-middle" @close="closePreview">
    　　<div style="height:100%;">
      <iframe  id="show-iframe" frameborder="0" scrolling="yes" style="background-color:transparent;width: 100%;
         height:100%; top: 0;left:0;bottom:0;" :src='previewUrl'></iframe>
    </div>

    </preview-pop>

  </div>


</template>

<script>
import {client, getFileNameUUID} from "../../tools/oss";
import sShare from "../Share";
import BlankContent from "../BlankContent";
import {Message} from "element-ui";
import {getCookie, setCookie} from "../../tools/cookie";
import PreviewPop from "../PreviewPop";
import SparkMD5 from 'spark-md5'
import Vue from "vue";
export default {

  data(){
    return{
      previewUrl: '',
      preViewPopUp: false,
      afterUpload: true,
      notSupportVisible: false,
      hasContent: false,
      calSize:'',
      detailFile: {},
      detailVisible: false,
      binVisible: false,
      shareVisible: false,
      selectedFile: {},
      value:'',
      selectedTag: '',
      dialogTableVisible:false,
      tags:[],
      menuVisible:false,
      showProgress: false,
      progressBar: 0,
      list:3,
      colors: [
        {color: '#ff8080', percentage: 20},
        {color: '#90d965', percentage: 40},
        {color: '#a2ff80', percentage: 60},
        {color: '#5eee4d', percentage: 80},
        {color: '#3cf877', percentage: 100}
      ],
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
      safeVisible: false,
      uploadArr:[],
      idx: 0,
      previewSupportType:['txt','html','htm','asp','jsp','xml','json','properties','md','gitignore','log','java','py','c','cpp','sql','sh','bat','m','bas','prg','cmd','jpg','jpeg','png','gif','doc','docx','ppt','pptx','pdf','xls','xlsx','zip','rar','jar','tar','gzip','mp3','wav','mp4','flv','CAD',
      'dwg'],
      user: {},
      fileArr: []
    }
  },
  components:{
    PreviewPop,
    BlankContent,
    sShare
  },
  methods: {
    closePreview() {
      this.preViewPopUp = false
    },
    closePreviewDialog() {
      this.notSupportVisible = false
    },
    getFile(e) {
      if (e.target.files[0] != null) {
        this.$notifySuccess('已提交任务！进度可点击左侧上传列表查看')
        // this.$message({
        //   message: '已提交任务！进度可点击左侧上传列表查看',
        //   type: 'success'
        // });
        // console.log(e.target.files[0])
        this.upload(e.target.files[0])
        // this.md5(e.target.files[0])
        document.getElementById("file").value = null;
      }
    },
    md5 (file) {
      return new Promise((resolve, reject) => {
        let blobSlice =
          File.prototype.slice ||
          File.prototype.mozSlice ||
          File.prototype.webkitSlice;
        let chunks = Math.ceil(file.size / 200)
        let currentChunk = 0;
        let spark = new SparkMD5.ArrayBuffer();
        let fileReader = new FileReader();
        fileReader.onload = function (e) {
          spark.append(e.target.result);
          currentChunk++;
          if (currentChunk < chunks) {
            loadNext();
          } else {
            let _md5 = spark.end();
            console.log(_md5)
            resolve(_md5);
          }
        };
        function loadNext() {
          let start = currentChunk * 200;
          let end = start + 200;
          (end > file.size) && (end = file.size);
          fileReader.readAsArrayBuffer(blobSlice.call(file, start, end)); // 这样才可以正常运行
        }
        loadNext();
      });
    },
    uploadFile() {
      document.getElementById("file").click();
    },
    getDir(e) {
      let files = e.target.files;
      if (files.length > 0) {
        // console.log(files);
        this.$notifySuccess('已提交任务！可点击左侧上传列表查看进度')

        for (let file of files) {
          // console.log(file)
          this.upload(file, true);
        }
        document.getElementById("dir").value = null;

      }
    },
    uploadDir() {

      document.getElementById("dir").click();
    },
    // getFileExist(e) {
    //   let file = e.target.files[0];
    //   this.$axios({
    //     url: '/file/exist',
    //     method: "GET",
    //     params: {
    //       filePath: this.currentPath + file.name
    //     }
    //   }).then(res => {
    //     if (res.data.code === 200) {
    //       this.getFile(file)
    //     }else {
    //       this.$message({
    //         message: '文件已存在于保险箱或回收站！',
    //         type: 'error'
    //       });
    //       return 500
    //     }
    //   })
    // },
    submitTask(file, fileName) {
      this.$axios({
        url: '/task/add',
        method: "POST",
        params: {
          userId : this.user.id
        },
        data: {
          isFinished: false,
          size: file.size,
          filePath: this.currentPath + fileName,
          fileName: file.name,
          fileType: file.name.substr(file.name.lastIndexOf(".") + 1)
        }
      }).then(res => {
        if (res.data.code === 200) {

          return res.data.code
        }
      }).catch(e => {
        this.$notifyError('提交任务失败！请稍后再试')
        // this.$message({
        //   message: '提交任务失败！请稍后再试',
        //   type: 'error'
        // });
        return 500
      })

    },
    upload: function (file, dir) {
      // let randomStr = this.randomStr(10);
      let fileName;
      if (dir) {
        fileName = file.webkitRelativePath
      } else {
        fileName = file.name
      }
      // console.log(file)
      this.submitTask(file, fileName);
      let idx = this.idx;
      this.idx++;
      let totalSize = this.convertSize2(file.size);
      this.uploadArr[idx] = {
        name: file.name.substring(file.name.lastIndexOf("/" + 1)),
        type: file.name.substr(file.name.lastIndexOf(".") + 1),
        totalSize: totalSize, // 文件总大小
        presentSize: 0,   // 已上传大小
        speed: 0,         // 网速
        progress: 0,      // 上传进度条
        finished: false,  // 是否已完成
        // 以下用于断点续传
        client: {},       // 用于暂停、恢复和取消
        checkpoint:{},    // 记录上传进度
        pause: false,     // 切换暂停、恢复按钮,
        idx: idx,          // 上传列表索引
        fileName: fileName, // 文件名
        uploadPath : this.currentPath + fileName,  // 上传路径,

      }
      const that = this
      let checkpoint //断点续传的关键变量
      let uploadPath = that.currentPath + fileName
      async function multipartUpload() {

        let stsParameter = Base64.decode(getCookie("sts"));
        // console.log("sts:" + stsParameter)
        if (stsParameter.length === 0) {
          // console.log("sts")
          await that.$axios.get("/user/sts").then(res => {
            stsParameter = res.data.data
            setCookie("sts", Base64.encode(JSON.stringify(stsParameter)), 60 * 60 * 2)
            // console.log(Base64.encode(JSON.stringify(stsParameter)))
          })
        }else {
          stsParameter = JSON.parse(stsParameter)
        }
        // let ossFileName = randomStr +'.'+file.name.substr(file.name.lastIndexOf(".") + 1);
        // 支持断点续传，只尝试600次，
        // for (let i = 0; i < 5; i++) {
          try {
          let lastProgress = 0;
          let cli = client(stsParameter);
          const result = await cli.multipartUpload(uploadPath, file, {
            checkpoint,
            async progress(p, cpt) {
              if (p === 1) {
                // console.log(that.result)
                // that.uploadSuccess();
                that.uploadArr[idx].progress = Math.floor(p * 100);
                return
              }
              // console.log(that.uploadArr([idx]))
              // p进度条的值
              checkpoint = cpt
              // 发送给上传列表
              let sizePerSec = Math.round((p * 10000 - lastProgress * 10000) / 10000 * file.size) * 8;
              that.uploadArr[idx].speed = that.convertSize2(sizePerSec) + "/s"
              that.uploadArr[idx].progress = Math.floor(p * 100)
              that.uploadArr[idx].presentSize = that.convertSize2(p * file.size)
              that.uploadArr[idx].client = cli
              that.uploadArr[idx].checkPoint = checkpoint;
              lastProgress = p

              that.$bus.$emit("uploadArr", that.uploadArr)
              // 发送给主界面标签
              let rest = that.calculateRestTask(that.uploadArr);
              that.$bus.$emit("uploadSize", rest)
            },
            parallel: 4,
            partSize: 1024 * 1024
          })
          // that.ruleForm.v_url = 'https://oss-cn-chengdu.aliyuncs.com/' + result.name
          // console.log(result);
          // 上传完成
          that.uploadArr[idx].finished = true;
          // 通过总线发送给上传列表
          that.$bus.$emit("uploadArr", that.uploadArr)
          let rest = that.calculateRestTask(that.uploadArr);
          // 通过总线发送给侧边栏气泡
          that.$bus.$emit("uploadSize", rest)
          that.result = result;
          // 提交服务器
          that.finishTask(file, fileName, uploadPath)
          that.uploadSuccess(result, file);
        } catch (e) {
          setTimeout(function () {
          }, 1000)
          // console.log(e)
        }
      }
      // }

      multipartUpload()
    },
    resumeUpload(uploadItem) {
      let checkpoint = uploadItem.checkPoint
      let idx = uploadItem.idx


      let file = checkpoint.file
      let fileName = uploadItem.fileName
      const that = this
      let uploadPath = uploadItem.uploadPath
      async function resumeUploadAsync() {

        let stsParameter = Base64.decode(getCookie("sts"));
        // console.log("sts:" + JSON.stringify(stsParameter))
        if (stsParameter == null) {
          // console.log("sts")
          await that.$axios.get("/user/sts").then(res => {
            stsParameter = res.data.data
            setCookie("sts", JSON.stringify(stsParameter), 60 * 60 * 2)
          })
        }else {
          stsParameter = JSON.parse(stsParameter)
        }

        // console.log(ossParameter)

        // let ossFileName = randomStr +'.'+file.name.substr(file.name.lastIndexOf(".") + 1);
        // 支持断点续传，只尝试600次，
        // for (let i = 0; i < 5; i++) {
        try {
          let lastProgress = 0;
          let cli = client(stsParameter);
          const result = await cli.multipartUpload(uploadPath, file, {
            checkpoint,
            async progress(p, cpt) {
              if (p === 1) {
                // console.log(that.result)
                // that.uploadSuccess();
                that.uploadArr[idx].progress = Math.floor(p * 100);
                return
              }
              // console.log(that.uploadArr([idx]))
              // p进度条的值
              checkpoint = cpt
              // 发送给上传列表
              let sizePerSec = Math.round((p * 100000 - lastProgress * 100000) / 100000 * file.size);
              that.uploadArr[idx].speed = that.convertSize2(sizePerSec) + "/s"
              that.uploadArr[idx].progress = Math.floor(p * 100)
              that.uploadArr[idx].presentSize = that.convertSize2(p * file.size)
              that.uploadArr[idx].client = cli
              that.uploadArr[idx].checkPoint = checkpoint;
              lastProgress = p

              that.$bus.$emit("uploadArr", that.uploadArr)
              // 发送给主界面标签
              let rest = that.calculateRestTask(that.uploadArr);
              that.$bus.$emit("uploadSize", rest)
            },
            parallel: 4,
            partSize: 1024 * 1024
          })
          // 上传完成
          that.uploadArr[idx].finished = true;
          // 通过总线发送给上传列表
          that.$bus.$emit("uploadArr", that.uploadArr)
          let rest = that.calculateRestTask(that.uploadArr);
          // 通过总线发送给侧边栏气泡
          that.$bus.$emit("uploadSize", rest)
          that.result = result;
          // 提交服务器
          that.finishTask(file, fileName, uploadPath)
          that.uploadSuccess(result, file);
        } catch (e) {
          setTimeout(function () {
          }, 500)
          // console.log(e)
        }
      }
      resumeUploadAsync()
    },
    calculateRestTask(arr) {
      let rest =  0;
      for (let i = 0; i < arr.length; i++) {
        if (!arr[i].finished) {
          rest++;
        }
      }
      // console.log("剩余" + rest)
      return rest;
    },
    uploadSuccess(result, file) {
      this.uploadToServer(result, file);
      // this.$message({
      //   message: '上传成功！',
      //   type: 'success'
      // });
    },
    uploadToServer(result, file) {
      this.$axios({
        url: '/file/uploadFile',
        method: "POST",
        params: {
          userId : this.user.id
        },
        data: {
          ossPath: result.name,
          size: file.size,
          requestUrl: result.res.requestUrls[0],
          name: file.name.substring(file.name.lastIndexOf("/" + 1))
        }
      }).then(res => {
        if (res.data.code === 200) {
          // this.$message({
          //   message: '上传成功！',
          //   type: 'success'
          // });
          // this.listFiles();
        }
      })
    },
    newDir() {
      this.$prompt('<div><img src="static/fileType/dir.svg"/></div>', '文件夹名称', {
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
            this.$notifySuccess('新建文件夹成功！');
            // this.$message({
            //   message: '创建成功',
            //   type: "success"
            // })
            this.listFiles()
          }else {
            this.$loading.hideLoading();
            this.$notifyError(res.data.message);
            // this.$message({
            //   message: res.data.message,
            //   type: 'error'
            // });
          }
        }).catch(e => {
          console.log(e)
          this.$notifyError(e.response.message);

          // this.$message({
          //   message: e.response.message,
          //   type: 'error'
          // });
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
        }
      })
    },
    handleClickFile(item) {
      if (item.isDir) {
        this.prefixList = item.ossPath.split("/");
        this.currentPath = item.ossPath;
        console.log(this.prefixList)
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
      }).then(res => {
          // fileDownload(res.data,name)
        window.open(res.data.data)
        // if (res.data.code === 200) {
        //   console.log(res.data.data)
        //   this.$axios({
        //     url: res.data.data,
        //     method: "GET"
        //   }).then(res => {
        //   })
        // }
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
              }else if (this.previewSupportType.findIndex(type =>type ===item.type.toLowerCase()) === -1){
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
              // console.log(item.ossPath);
            }
          },
          {label: "分享", icon: "el-icon-link",
          onClick: () => {
            // if (item.isDir) {
            //   Message.warning("暂不支持分享文件夹");
            // }else {
              this.shareVisible = true
            // }
          }},
          {label: "收藏", divided: true, icon: "el-icon-star-off",
          children:[{
            label: "选择标签",
            onClick: () => {
              this.dialogTableVisible = true;
              this.getAllTags()
            }
          },
            {
              label: "创建新标签",
              onClick: () => {
                this.newTag();
              }
            }]
          },
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
          {label: "查看详细信息", icon:"el-icon-view", divided: true,
          onClick:() => {
            this.showDetail(item);

          }},
          // {
          //   label: "使用网页翻译(T)",
          //   divided: true,
          //   minWidth: 0,
          //   children: [{label: "翻译成简体中文"}, {label: "翻译成繁体中文"}]
          // }
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
        this.$notifyError(e.response.message)
        // this.$message({
        //   message: e.response.message,
        //   type: 'error'
        // });
      }).catch(e => {
        console.log(e)
        this.$notifyError(e.response.message)
      //   this.$message({
      //     message: e.response.message,
      //     type: 'error'
      //   });
      })
    },
    previewFile(url) {
      this.preViewPopUp = true
      let code = encodeURIComponent(Base64.encode(url));
      this.previewUrl = 'https://*:8090/preview/onlinePreview?url='+ code;
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

    showDetail() {
      this.$axios({
        url:'/file/detail',
        method: "GET",
        params: {
          ossPath: this.selectedFile.ossPath,
        }
      }).then(res => {
        if (res.data.code === 200) {
          this.detailFile = res.data.data
          if (this.detailFile.size === 0) {
            this.calSize = 0 + "B"
          }else {
            this.convertSize(this.detailFile.size)
          }
          this.detailVisible = true;
        }else {
          this.$loading.hideLoading();
          this.$notifyError(res.data.message)
          // this.$message({
          //   message: res.data.message,
          //   type: 'error'
          // });
        }
      }).catch(e => {
        console.log(e)
        this.$notifyError(e.response.message)
        // this.$message({
        //   message: e.response.message,
        //   type: 'error'
        // });
      })
    },
    moveToSafe() {
        this.$axios({
          url:'/safe/moveToSafe',
          method: "POST",
          params: {
            ossPath: this.selectedFile.ossPath,
          }
        }).then(res => {
          // console.log(res)
          if (res.data.code === 200) {
            this.$notifySuccess('已移入保险箱！')
            // this.$message({
            //   message: '已移入保险箱！',
            //   type: "success"
            // })
            this.safeVisible = false
            this.listFiles()
          }else {
            this.$loading.hideLoading();
            this.$notifyError(res.data.message)
            // this.$message({
            //   message: res.data.message,
            //   type: 'error'
            // });
          }
        }).catch(e => {
          console.log(e)
          this.$notifyError(e.response.message)

          // this.$message({
          //   message: e.response.message,
          //   type: 'error'
          // });
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
            this.$notifySuccess('重命名成功！')
            // this.$message({
            //   message: '修改成功',
            //   type: "success"
            // })
            this.listFiles()
          }else {
            this.$loading.hideLoading();
            this.$notifyError(res.data.message)
            // this.$message({
            //   message: res.data.message,
            //   type: 'error'
            // });
          }
        }).catch(e => {
          console.log(e)
          this.$notifyError("网络错误")
          // this.$message({
          //   message: e.response.message,
          //   type: 'error'
          // });
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
        inputPattern: /\S/,
        inputErrorMessage: '标签不能为空！',
        closeOnClickModal: false,
        roundButton: true
        // cancelButtonText: '取消',
        // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        // inputErrorMessage: '邮箱格式不正确'
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
            this.$notifySuccess('创建成功')
            // this.$message({
            //   message: '创建成功',
            //   type: "success"
            // })
            this.getAllTags()
          }else {
            this.$loading.hideLoading();
            this.$notifyError(res.data.message)
            // this.$message({
            //   message: res.data.message,
            //   type: 'error'
            // });
          }
        }).catch(e => {
          console.log(e)
          this.$notifyError('网络错误')
        })
      }).catch(() => {
      });
    },
    getAllTags() {
      this.$axios.get("/tag/all").then(res => {
        if (res.data.code === 200) {
          this.tags = res.data.data;

        }else {
          this.$notifyError(res.data.message)
        }
      }).catch(e => {
        console.log(e)
        this.$notifyError('网络错误')
      })
    },
    changeTag(tagName) {
      this.selectedTag = tagName
    },
    addFileToTag() {
      if (!this.selectedTag) {
        this.$notifyError('请选择标签')
        return;
      }
      this.$axios({
        url: "/tag/add/file",
        method:"POST",
        params: {
          tagName: this.selectedTag,
          ossPath: this.selectedFile.ossPath
        }
      }).then(res => {
        if (res.data.code === 200) {
          this.$notifySuccess('添加成功')
          this.dialogTableVisible = false
        }else {
          this.$notifyError(res.data.message)

        }
      }).catch(e => {
        console.log(e)
        this.$notifyError('网络错误')
      })
    },
    closeShare() {
      this.shareVisible = false;
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
            this.$notifySuccess('移动成功')
            this.binVisible = false
            this.listFiles()
          }else {
            this.$notifyError(res.data.message)

          }
        }).catch(e => {
          console.log(e)
          this.$notifyError('网络错误')

        })
    },
    convertSize2(value) {
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
      this.calSize = size;
    },
    finishTask(file, fileName, uploadPath) {
      this.$axios({
        url: "/task/update",
        method:"POST",
        params:{
          userId: this.user.id,
          finished: true
        },
        data: {
          isFinished: false,
          size: file.size,
          filePath: uploadPath,
          fileName: file.name,
          fileType: file.name.substr(file.name.lastIndexOf(".") + 1)
        }
      }).then(res => {
        if (res.data.code === 200) {
          // this.$message({
          //   message: "上传成功！",
          //   type: 'success'
          // });
        }else {
          this.$notifyError(res.data.message)

        }
      }).catch(e => {
        console.log(e)
        this.$notifyError('网络错误')

      })
    },
    randomStr(len){
      //母串
      const mStr = "0123456789qwertyuiopasdfghjklzxcvbnm";
      //母串的长度
      const mStr_len = mStr.length;
      let tmp = "";
      //获取当前时间戳
      const timestamp = new Date().getTime();
      for (let i=0; i < len ; i++){
        //Math.ceil(x)取不小于x的最小整数
        //str.charAt(x)返回str中下标为x的元素
        //Math.random()返回0~1之间的随机数
        tmp += mStr.charAt(Math.ceil(Math.random()*100000000) % mStr_len);

      }
      return timestamp+tmp;
    },
    currentUser() {
      this.$axios('/user/currentUser').then(res => {
        if (res.data.data.id != null || res.data.data.id != '') {
          this.user = res.data.data
        }else {

        }
      }).catch(e => {

      })
    },

  },
  created() {
    this.listFiles();
    // 监听恢复上传
    this.$bus.$on('resumeUpload', data => {
      // console.log(data)
      let uploadItem = Object.assign({}, data);
      this.resumeUpload(uploadItem)
    })
    this.$bus.$on('uploadSize', data => {
      // 优化点：如果每次上传完成后都刷新文件列表，会增加服务器负担，使用总线监控上传完成后再刷新文件列表
      if (data === 0) {
        // 由于缓存的是整个页面，这里上传完成后局部刷新文件列表dom，实现了切换标签仍缓存当前路径
        this.$bus.$emit("uploadArr", [])
        // 等待1000ms待文件信息上传至服务器
        setTimeout(() => {
          this.listFiles()
          this.afterUpload = false;
          // 清空上传列表
          this.afterUpload = true;
        },1000)


      }
    })
    this.currentUser()
  },
  name: "File"
}

</script>

<style >

.delete{
  color: #f56c6c;
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
    /*background-color: rgba(132,133,141,0.08);*/
    /*background-color: rgb(245,245,255);*/
    transform: translateX(-1px);
  box-shadow: -1px 7px 15px -1px rgb(0 0 0 / 10%)

    /*transform: perspective(500px) translateZ(10px);*/
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

/*.fileNav{*/
/*  display: flex;*/
/*  justify-content: space-evenly;*/
/*  align-items: center;*/
/*  height: 20px;*/
/*  background-color: #f56c6c;*/
/*}*/
.uploadInfo{
  width: 240px;
  display: flex;
}
.el-dialog {
  border-radius: 15px;
}
.el-message-box__wrapper {
  border-radius: 15px;
}
.el-button--primary {
  background-color: rgb(123, 103, 238);
  border: none;
}
.el-button {
  border: 0 solid #DCDFE6;
  border-radius: 10px;
}

.el-alert--success.is-light{
  color: #31c77b;
}
.el-alert--success.is-light .el-alert__description {
  color: #31c77b;
}
.el-alert.is-light .el-alert__closebtn{
  color: #31c77b;
  line-height: 42px;
  margin-right: 20px;
}


</style>
