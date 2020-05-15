<template>
  <div class="about">
    <van-nav-bar title="每日推荐">
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
      </template> <template #right>
        <van-grid
          clickable
          :column-num="1"
        >
          <van-button
            icon="star-o"
            type="primary"
            color="#7232dd"
            @click="showPopup"
          >按钮</van-button>
        </van-grid>
      </template>
    </van-nav-bar>
    <div class="bg">
      <div
        v-for="(item,index) in musics"
        :key="index"
      >
        <van-card
          :title="item.name"
          :thumb="item.picUrl"
        ><template #desc>
            <van-panel>
              <div
                v-for="(user,index1) in item.song.artists"
                :key="index1"
              >
                <div>作者：{{user.name}}</div>
              </div>
              <div>专辑名：{{item.song.album.name}}</div>
            </van-panel>
          </template>
          <template #tag>
            <van-button
              icon="play-circle-o"
              size="primary"
              style="border:none;background-color:rgba(0,0,0,0);margin:50px 0px 0px 70px"
              @click="getPlay(item.id)"
            />
          </template>
        </van-card>
      </div>
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
        <div @click="dolist(item.id)">
          <span>{{item.name}}</span>
          <span style="margin:0px 0px 0px 20px">{{item.ar[0].name}}</span>
        </div>
      </van-cell>
    </van-popup>
    <audio
      ref='audio'
      controls
      autoplay
    >
      您的浏览器不支持 audio 元素。
    </audio>
  </div>
</template>
<script>
export default {
  name: 'Daily',
  data() {
    return {
      musics: [],
      list: [],
      lists: [],
      waitlist: [],
      info: [],
      getprogress: 0,
      count: 0,
      count1: 0,
      show: false
    }
  },
  methods: {
    showPopup() {
      this.show = true
    },
    getNewSongs() {
      this.axios({
        method: 'get',
        url: 'http://localhost:3000/personalized/newsong'
      }).then((res) => {
        this.musics = res.data.result
        console.log(this.musics)
      })
    },
    getPlay(id) {
      this.axios({
        method: 'get',
        url: 'http://localhost:3000/song/url?id=' + id
      }).then((res) => {
        this.list = res.data.data[0].url
        this.getprogress = res.data.data[0].size

        // this.waitlist[this.count1++] = this.list
        this.$refs.audio.src = this.list
        // console.log(this.waitlist)
        // console.log(this.info)
        this.axios({
          method: 'get',
          url: 'http://localhost:3000/song/detail?ids=' + id
        }).then((result) => {
          this.info[this.count++] = result.data.songs[0]
        })
      })
    },
    dolist(id) {
      this.axios({
        method: 'get',
        url: 'http://localhost:3000/song/url?id=' + id
      }).then((res) => {
        this.lists = res.data.data[0].url
        this.getprogress = res.data.data[0].size
        this.$refs.audio.src = this.lists
      })
    }
  },
  created() {
    this.getNewSongs()
  },
  mounted() {}
}
</script>
<style>
</style>