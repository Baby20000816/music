<template>
  <div>
    <van-nav-bar title="主页">
      <template #left>
        <van-grid
          clickable
          :column-num="1"
        >
          <van-grid-item
            text="个人中心"
            to="/user"
          />
        </van-grid>
      </template>
      <template #right>
        <van-grid
          clickable
          :column-num="1"
        >
          <van-grid-item
            text="退出登录"
            @click="onClickLeft"
            url="/"
          />
        </van-grid>
      </template>
    </van-nav-bar>
    <van-swipe
      class="my-swipe"
      :autoplay="3000"
      indicator-color="white"
    >
      <van-swipe-item>1</van-swipe-item>
      <van-swipe-item>2</van-swipe-item>
      <van-swipe-item>3</van-swipe-item>
      <van-swipe-item>4</van-swipe-item>
    </van-swipe>
    <van-grid
      clickable
      :column-num="5"
    >

      <van-grid-item
        text="每日推荐"
        to="/daily"
      />
      <van-grid-item
        text="歌单"
        to="/dailylist"
      />
      <van-grid-item
        text="MV"
        to="/mv"
      />
      <van-grid-item
        text="电台"
        to="/dj"
      />
      <van-grid-item
        text="排行榜"
        to="/list"
      />
    </van-grid>

  </div>
</template>
<script>
import { Toast } from 'vant'
export default {
  name: 'Home',
  methods: {
    onClickLeft() {
      this.$router.push('/login')
      localStorage.removeItem('token')
    }
  }
}
</script>
<style>
.my-swipe .van-swipe-item {
  margin-top: 10px;
  color: #fff;
  font-size: 20px;
  text-align: center;
  line-height: 150px;
  background-color: #39a9ed;
}
</style>