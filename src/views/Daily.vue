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
        </van-card>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Daily',
  data() {
    return {
      musics: []
    }
  },
  methods: {
    getNewSongs() {
      this.axios({
        method: 'get',
        url: 'http://localhost:3000/personalized/newsong'
      }).then((res) => {
        this.musics = res.data.result
        console.log(this.musics)
      })
    }
  },
  created() {
    this.getNewSongs()
  }
}
</script>
<style>
</style>