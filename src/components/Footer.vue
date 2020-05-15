<template>
  <div id="appfooter">
    <div class="wrap">
      <div class="image">
        <img src="https://p1.music.126.net/3HhEbj07nv4uHRSq3gWAig==/109951164970852718.jpg" />
      </div>
      <div
        class="geming"
        style="color:rgb(250, 250, 250);
        margin-top:-30px;"
      >正在播放</div>
      <div class="playicon">
        <van-icon
          name="play-circle-o"
          class="playicon"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'appfooter',
  props: [
    {
      avatar: String
    }
  ]
}
</script>

<style scoped>
#appfooter {
  width: 100%;
  height: 60px;
}
.wrap {
  background-color: rgb(42, 41, 48);
  width: 100%;
  height: 60px;
  display: flex;
  flex-direction: column;
  align-content: center;
  text-align: center;
}
/* 歌的图像 */
.image {
  width: 3rem;
  height: 3rem;
}
.image img {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
}
/* 开始播放icon */
.palyicon {
  font-size: 2rem;
}
</style>
