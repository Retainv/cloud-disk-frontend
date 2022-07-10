<template>
  <transition name="fullscreen" @after-enter="afterEnter"
              @after-leave="afterLeave">//动画
    <div v-if="visible" class="fullscreen-dialog-wrapper" >
      <div ref="dialog" class="fullscreen-dialog">
        <div ref="header" class="dialog-header">
          <span class="dialog-title">{{ title }}</span>
          <a aria-label="Close" class="dialog-headerbtn">
            <i class="dialog-close el-icon el-icon-close" @click="closeMyself"></i>
          </a>
        </div>
          <div  v-loading="previewLoading" :class="customClass" class="dialog-body" >
            <!--弹窗的内容-->
            <slot ></slot>
          </div>


<!--        &lt;!&ndash;弹窗关闭按钮&ndash;&gt;-->
<!--        <div ref="footer" class="dialog-footer">-->
<!--          <slot name="footer"></slot>-->
<!--        </div>-->
      </div>

    </div>
  </transition>
</template>

<script>
export default {
  name: 'PreviewPop',
  props: {
    title: {
      type: String,
      default: ''
    },
    visible: {
      type: Boolean,
      default: false
    },
    customClass: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      closed: false,
      appendToBody: true,
      previewLoading: false
    }
  },
  watch: {
    visible (val) {
      if (val) {
        this.closed = false
        this.$emit('open')
        this.$nextTick(() => {
          this.$refs.dialog.scrollTop = 0
        })
        document.getElementsByTagName('body')[0].className = 'el-popup-parent--hidden'
        if (this.appendToBody) {
          document.body.appendChild(this.$el)
        }
      } else {
        if (!this.closed) this.$emit('close')
        document.getElementsByTagName('body')[0].className = ''
      }


    }
  },
  mounted () {
    if (this.visible) {
      if (this.appendToBody) {
        //将dom添加在body下面
        document.body.appendChild(this.$el)
      }
    }

  },
  methods: {
    closeMyself () {
      this.$emit('close')
      //右上角关闭X号的事件
    },
    afterEnter () {
      this.$emit('opened')
      this.previewLoading = true
      let iframe = document.getElementById('show-iframe')
      let that = this;
      if (!/*@cc_on!@*/0) { //如果不是IE，IE的条件注释
        iframe.onload = function(){
          that.previewLoading = false
        };
      } else
        iframe.onreadystatechange = function(){ // IE下的节点都有onreadystatechange这个事件
          if (iframe.readyState === "complete"){
            this.previewLoading = false
          }
        };
      // iframe.onload = function () {
      //   console.log("iframe加载完成");
      //   this.previewLoading = false
      // }
    },
    afterLeave () {
      this.$emit('closed')
    }
  }
}
</script>

<style lang="scss" scoped>
.fullscreen-dialog-wrapper{
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  margin: 0;
  z-index: 1001;
  opacity: 1;
}
.fullscreen-dialog{
  position:relative;
  margin:0 auto 50px;
  background:#fff;
  box-sizing:border-box;
  width:100%;
  margin-top:0;
  margin-bottom:0;
  height:100%;
  overflow-y:auto
}
.dialog-header{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20px;
  padding:14px 18px 12px;
  line-height: 24px;
  font-size: 18px;
  color: #fff;
  background-color: #1d2438;
}
.dialog-header .dialog-title{
  line-height:24px;
  font-size:18px;
  color:#fff
}
.dialog-headerbtn{
  position:absolute;
  top:15px;
  right:15px;
  padding:0;
  background:0 0;
  border:none;
  outline:0;
  cursor:pointer;
  font-size:20px
}
.dialog-headerbtn .dialog-close{
  color:#fff
}
.dialog-headerbtn:focus .dialog-close,
.dialog-headerbtn:hover .dialog-close{
  color:#409EFF
}

.dialog-body{
  height: calc(100% - 45px);
  color:#606266;
  line-height:24px;
  font-size:14px;
  overflow-y: auto;
}
//.dialog-footer{
//  height: 53px;
//  padding: 10px 30px;
//  text-align:right;
//  -webkit-box-sizing:border-box;
//  box-sizing:border-box;
//  border-top: 1px solid #ddd;
//  background-color: #fff;
//}
.el-popup-parent--hidden{
  overflow: hidden
}
//动画过程
.fullscreen-enter{
  animation:fullscreen-dialog-fade-in .3s ease;
}
.fullscreen-leave{
  animation:fullscreen-dialog-fade-out .3s ease forwards;
}
.fullscreen-enter-active{
  animation:fullscreen-dialog-fade-in .3s ease
}
.fullscreen-leave-active{
  animation:fullscreen-dialog-fade-out .3s ease forwards
}

@keyframes fullscreen-dialog-fade-in {
  0% {
    transform: translate3d(0, 100%, 0);
    opacity: 1;
  }
  100% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}

@keyframes fullscreen-dialog-fade-out {
  0% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
  100% {
    transform: translate3d(0, 100%, 0);
    opacity: 1;
  }
}

</style>
