<template>
  <div>
    <van-nav-bar title="歌单广场">
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
    <van-swipe
      :autoplay="3000"
      indicator-color="white"
    >
      <van-swipe-item
        v-for="(pic,index) in musiclist.slice(0,7)"
        :key="index"
      >
        <div> <img
            style="height:200px"
            :src="pic.picUrl"
          >
          <p>{{pic.name}}</p>
        </div>
      </van-swipe-item>

    </van-swipe>

    <van-list>

      <van-grid
        id="resultScroll"
        ref="myScrollbar"
        clickable
        :column-num="3"
        icon-size="100px"
      >
        <van-grid-item
          v-for="(item,index) in musiclist.slice(start,end)"
          :key="index"
          :icon="item.picUrl"
          :text="item.name"
        />
      </van-grid>

    </van-list>
  </div>
</template>
<script>
export default {
  name: 'DailyList',
  data() {
    return {
      musiclist: [],
      list: [],
      loading: false,
      finished: false,
      start: 7,
      end: 40
    }
  },
  methods: {
    getSongList() {
      this.axios({
        method: 'get',
        url: 'http://localhost:3000/personalized?limit=100'
      }).then((res) => {
        this.musiclist = res.data.result
        console.log(this.musiclist)
        // console.log(this.musiclist.length)
        this.onLoad()
      })
    },
    onLoad() {
      if (this.end <= 100) {
        this.start = this.start + 10
        this.end = this.end + 10
        this.loading = true
        this.finished = false
      } else {
        this.loading = false
        this.finished = true
      }
    },
    handleScroll() {
      var that = this
      var sh = that.$refs['myScrollbar'].$refs['wrap'].scrollHeight // 滚动条高度
      var st = that.$refs['myScrollbar'].$refs['wrap'].scrollTop // 滚动条距离顶部的距离
      var ch = that.$refs['myScrollbar'].$refs['wrap'].clientHeight // 滚动条外容器的高度
      if (st + ch >= sh) {
        //到底了-业务逻辑
        this.onLoad()
      }
    }
  },
  created() {
    this.getSongList()
  },
  watch: {},
  mounted() {
    var that = this
    // 监听滚动事件
    document.getElementById('resultScroll').addEventListener('scroll', that.handleScroll, true)
  }
}
</script>
<style>
</style>