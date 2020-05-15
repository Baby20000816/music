<template>
  <div>
    <van-nav-bar title="排行榜">
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
      <h4 class="about">官方榜</h4>
      <div
        v-for="(item,index) in toplist.slice(0,4)"
        :key="index"
      >
        <van-card
          :thumb="item.coverImgUrl"
          style="background-color:white"
        >
          <template
            #desc
            style="justify-content: center;"
          >
            <div
              v-for="(item1,index1) in item.tracks"
              :key="index1"
              style="margin:10px 0px 0px 0px"
            >{{index1+1}}.{{item1.first}}---{{item1.second}}</div>
          </template>
          <template #tag>
            <div class="tag">{{item.updateFrequency}}</div>
          </template></van-card>
      </div>
    </div>

    <div>
      <h4 class="about">推荐榜</h4>
      <van-list>
        <van-grid
          clickable
          :column-num="3"
          icon-size="100px"
        >
          <van-grid-item
            v-for="(item,index) in toplist.slice(4,10)"
            :key="index"
            :icon="item.coverImgUrl"
            :text="item.name"
          ></van-grid-item>

        </van-grid>
      </van-list>
    </div>
    <div>
      <h4 class="about">全球榜</h4>
      <van-list>
        <van-grid
          clickable
          :column-num="3"
          icon-size="100px"
        >
          <van-grid-item
            v-for="(item,index) in toplist.slice(10,16)"
            :key="index"
            :icon="item.coverImgUrl"
            :text="item.name"
          />
        </van-grid>
      </van-list>
    </div>
    <div>
      <h4 class="about">更多榜单</h4>
      <van-list>
        <van-grid
          clickable
          :column-num="3"
          icon-size="100px"
        >
          <van-grid-item
            v-for="(item,index) in toplist.slice(16)"
            :key="index"
            :icon="item.coverImgUrl"
            :text="item.name"
          />
        </van-grid>
      </van-list>
    </div>
  </div>

</template>
<script>
export default {
  name: 'List',
  data() {
    return {
      toplist: [],
      //赞赏帮
      rewardToplist: [],
      artistToplist: []
    }
  },
  methods: {
    //官方榜详细数据
    getTopList() {
      this.axios({
        method: 'get',
        url: 'http://localhost:3000/toplist/detail'
      }).then((res) => {
        this.toplist = res.data.list
        this.rewardToplist = res.data.rewardToplist
        this.artistToplist = res.data.artistToplist
        console.log(this.toplist)
        console.log(this.rewardToplist)
        console.log(this.artistToplist)
      })
    }
  },
  created() {
    this.getTopList()
  },
  watch: {},
  mounted() {}
}
</script>
<style>
.about {
  /* text-align: center; */
  margin-left: 20px;
}
.tag {
  margin: 66px 0px 0px 6px;
  color: white;
}
</style>