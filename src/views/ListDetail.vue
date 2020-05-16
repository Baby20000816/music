<template>
  <div class="about">
    <van-nav-bar
      :title="list.name"
      fixed
    >
      <template #left>
        <van-grid
          clickable
          :column-num="1"
        >
          <van-grid-item
            text="返回"
            to="/list"
            @click="clear"
          />
        </van-grid>
      </template>
      <template #right>
        <van-grid
          clickable
          :column-num="1"
        >
          <van-button
            icon="star-o"
            type="primary"
            color="#7232dd"
            @click="showPopup"
          >播放列表</van-button>
        </van-grid>
      </template>
    </van-nav-bar>
    <div class="bg">
      <div
        v-for="(item,index) in list.tracks"
        :key="index"
      >
        <van-card
          :title="item.al.name"
          :thumb="item.al.picUrl"
        ><template #desc>
            <van-panel>
              <div
                v-for="(user,index1) in item.ar.slice(0,2)"
                :key="index1"
              >
                <div>
                  {{user.name}}
                </div>
              </div>
            </van-panel>
          </template>
          <template #tag>
            <van-button
              icon="play-circle-o"
              size="primary"
              style="border:none;background-color:rgba(0,0,0,0);margin:50px 0px 0px 70px"
              @click="getPlay(item.id)"
              v-show="!icon"
            />
            <van-button
              icon="pause-circle-o"
              size="primary"
              style="border:none;background-color:rgba(0,0,0,0);margin:50px 0px 0px 70px"
              @click="getPause(item.id)"
              v-show="icon"
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
    >
      您的浏览器不支持 audio 元素。
    </audio>
  </div>

</template>
<script>
export default {
  name: 'ListDetail',
  data() {
    return {
      toplist: [],
      list: JSON.parse(localStorage.getItem('listdetail')),
      show: false,
      count: 0,
      info: [],
      font: true,
      icon: false,
      now: 0,
      url: []
    }
  },
  methods: {
    clear() {
      localStorage.removeItem('listdetail')
    },
    showPopup() {
      this.show = true
    },
    getPlay(id) {
      this.axios({
        method: 'get',
        url: 'http://localhost:3000/song/url?id=' + id
      }).then((res) => {
        this.toplist = res.data.data[0].url
        this.$refs.audio.src = this.toplist
        this.icon = true
        this.url[this.count] = res.data.data[0].url
        this.axios({
          method: 'get',
          url: 'http://localhost:3000/song/detail?ids=' + id
        }).then((result) => {
          this.info[this.count++] = result.data.songs[0]
        })
      })
    },
    getPause() {
      this.icon = false
      this.$refs.audio.pause()
    },
    dolist(id, now) {
      this.axios({
        method: 'get',
        url: 'http://localhost:3000/song/url?id=' + id
      }).then((res) => {
        this.toplist = res.data.data[0].url
        this.$refs.audio.src = this.toplist
        this.now = now
        console.log(this.now)
      })
    },
    del(id) {
      this.info[id] = this.info
    },
    autonext() {
      console.log(this.url[this.now + 1])
      this.$refs.audio.src = this.url[this.now + 1]
      this.$refs.audio.play()
    },
    playall() {
      this.$refs.audio.src = this.url[this.now + 1]
      this.$refs.audio.play()
    }
  },
  created() {},
  watch: {},
  mounted() {}
}
</script>
<style>
</style>