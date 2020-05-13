<template>
  <div>
    <van-nav-bar title="主页">
      <template #right>
        <van-grid
          clickable
          :column-num="1"
        >
          <van-grid-item
            text="退出登录"
            @click="onClickLeft"
            url="/login"
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
      :column-num="4"
    >
      <van-grid-item
        text="个人中心"
        to="/user"
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
      this.$router.push('/')
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
  line-height: 150px;
  background-color: #39a9ed;
}
</style>