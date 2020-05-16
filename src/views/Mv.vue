<template>
  <div>
    <div>
      <van-nav-bar title="mv广场">
        <template #left>
          <van-grid
            clickable
            :column-num="1"
          >
            <van-grid-item
              text="返回"
              to="/home"
            />
          </van-grid>
        </template>
      </van-nav-bar>
      <div>
        <video
          ref="video"
          controls="true"
          poster="images.jpg"
          preload="true"
          webkit-playsinline="true"
          playsinline="true"
          x-webkit-airplay="allow"
          x5-video-player-type="h5"
          x5-video-player-fullscreen="false"
          x5-video-orientation="portraint"
          style="object-fit:fill;height:200px"
        >
        </video>
      </div>
      <van-list>
        <van-grid
          clickable
          :column-num="3"
          icon-size="100px"
        >
          <van-grid-item
            v-for="(item,index) in mv"
            :key="index"
            :icon="item.cover"
            :text="item.name"
            @click="playMv(item.id)"
          />
        </van-grid>
      </van-list>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Mv',
  data() {
    return {
      mv: [],
      playerOptions: {
        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            //类型
            type: 'video/mp4',
            //url地址
            src: ''
          },
          {
            type: 'application/x-mpegURL',
            src: '' //url地址
          }
        ],

        poster: '', //你的封面地址
        // width: document.documentElement.clientWidth,
        notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true //全屏按钮
        }
      }
    }
  },
  methods: {
    getMv() {
      this.axios({
        method: 'get',
        url: 'http://localhost:3000/mv/all'
      }).then((res) => {
        this.mv = res.data.data
        // console.log(res)
      })
    },
    playMv(id) {
      this.axios({
        method: 'get',
        url: 'http://localhost:3000/mv/url?id=' + id
      }).then((res) => {
        // this.playerOptions.sources.src = res.data.data.url
        this.$refs.video.src = res.data.data.url
        // console.log(this.playerOptions.sources.src)
        console.log(this.$refs.video.src)
        this.axios({
          method: 'get',
          url: 'http://localhost:3000/mv/detail?mvid=' + id
        }).then((result) => {
          this.$refs.video.poster = res.data.data.cover
          console.log(result)
        })
      })
    }
  },
  created() {
    this.getMv()
  },
  components: {}
}
</script>
<style>
.video-js .vjs-big-play-button {
}
</style>