<template>
  <div>
    <div style="height:500px;display: flex;flex-direction:column;justify-content: center;align-items: center">
      <div>
        <img width="250px" height="250px" ref="typeImg" :src="'static/blank.svg' "/>
      </div>
      <span style="color: rgb(28 36 66); margin-top: 20px">这里还没有内容呢</span>

    </div>

  </div>
</template>

<script>
export default {
  name: "BlankContent"
}
</script>

<style scoped>

</style>
