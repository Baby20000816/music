<template>
  <div id="appfooter">
    <div class="wrap">
      <div class="image">
        <img :src="image" />
      </div>

      <div>
        <div style="color:rgb(250, 250, 250);">{{msg}}</div>
        <van-icon
          name="play-circle-o"
          class="playicon"
          @click="play"
          v-show="!icon"
        />
        <van-icon
          name="play-circle-o"
          class="playicon"
          @click="play1"
          v-show="icon1"
        />
        <van-icon
          name="pause-circle-o"
          class="playicon"
          @click="pause"
          v-show="icon2"
        />
      </div>
      <van-button
        icon="star-o"
        type="primary"
        color="#7232dd"
        @click="showPopup"
      >播放列表</van-button>

    </div>
    <van-popup
      v-model="show"
      position="bottom"
      :style="{ height: '30%' }"
    >
      <van-cell
        v-for="(item,index) in info"
        :key="index"
      >
        <div @click="dolist(item.id,index)">
          <span>{{item.name}}</span>
          <span style="margin:0px 0px 0px 20px">{{item.ar[0].name}}</span>
        </div>
      </van-cell>
    </van-popup>
    <audio
      ref='audio'
      controls
      autoplay
      @ended="autonext()"
      @paused="restart()"
    >
      您的浏览器不支持 audio 元素。
    </audio>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  props: [],
  data() {
    return {
      show: false,
      toplist: [],
      list: JSON.parse(localStorage.getItem('listdetail')),
      info: JSON.parse(localStorage.getItem('info')),
      nowplay: JSON.parse(localStorage.getItem('nowplay')),
      count: 0,
      font: true,
      icon: false,
      icon1: false,
      icon2: false,
      now: 0,
      url: [],
      msg: '',
      footer: [],
      image: ''
    }
  },
  methods: {
    showPopup() {
      this.show = true
    },
    dolist(id, now) {
      this.axios({
        method: 'get',
        url: 'http://localhost:3000/song/url?id=' + id
      }).then((res) => {
        this.toplist = res.data.data[0].url
        this.$refs.audio.src = this.toplist
        this.icon = true
        this.now = now
        console.log(this.now)
        this.axios({
          method: 'get',
          url: 'http://localhost:3000/song/detail?ids=' + id
        }).then((result) => {
          console.log(result.data)
          this.footer = result.data.songs
          console.log(this.footer)
          this.image = this.footer[0].al.picUrl
          this.msg = this.footer[0].name
          localStorage.removeItem('nowplay')
          localStorage.setItem('nowplay', JSON.stringify(result.data.songs[0]))
        })
      })
    },
    autonext() {
      this.now++
      if (this.now >= this.url.length) {
        this.$refs.audio.src = this.url[0]
        this.$refs.audio.play()
        this.now = 0
      } else {
        this.$refs.audio.src = this.url[this.now]
        this.$refs.audio.play()
      }
    },
    getStatus() {
      if (this.nowplay != '') {
        this.msg = this.nowplay.name
        this.image = this.nowplay.al.picUrl
      } else this.msg == '在线'
    },
    play() {
      this.axios({
        method: 'get',
        url: 'http://localhost:3000/song/url?id=' + this.nowplay.id
      }).then((res) => {
        this.icon2 = true
        this.icon = true
        this.$refs.audio.play()
        this.$refs.audio.src = res.data.data[0].url
      })
    },
    play1() {
      this.icon2 = true
      this.icon1 = false
      this.$refs.audio.play()
    },
    pause() {
      this.icon2 = false
      this.icon1 = true
      this.$refs.audio.pause()
    }
    // restart() {
    //   this.icon1 = true
    //   this.$refs.audio.play()
    // }
  },
  created() {
    this.getStatus()
  }
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
  /* flex-direction: column; */
  justify-content: space-between;
  /* align-content: center; */
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
.playicon {
  font-size: 2rem;
  color: white;
  /* margin: 0px 0px 30px 0px; */
}
.geming {
  margin-top: 200px;
}
</style>
