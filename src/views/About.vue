<template>
  <div class="about">
    <van-nav-bar
      title="标题"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    >
      <template #right>
        <van-icon
          name="search"
          size="18"
        />
      </template>
    </van-nav-bar>
    <van-button color="linear-gradient(to right, #4bb0ff, #6149f6)">渐变色按钮</van-button>
    <van-grid>
      <van-grid-item
        icon="photo-o"
        text="文字"
      />
      <van-grid-item
        icon="photo-o"
        text="文字"
      />
      <van-grid-item
        icon="photo-o"
        text="文字"
      />
      <van-grid-item
        icon="photo-o"
        text="文字"
      />
    </van-grid>
    <van-grid
      :border="false"
      :column-num="3"
    >
      <van-grid-item>
        <van-image src="https://img.yzcdn.cn/vant/apple-1.jpg" />
      </van-grid-item>
      <van-grid-item>
        <van-image src="https://img.yzcdn.cn/vant/apple-2.jpg" />
      </van-grid-item>
      <van-grid-item>
        <van-image src="https://img.yzcdn.cn/vant/apple-3.jpg" />
      </van-grid-item>
    </van-grid>
    <van-grid square>
      <van-grid-item
        v-for="value in 8"
        :key="value"
        icon="photo-o"
        text="文字"
      />
    </van-grid>
    <van-grid
      clickable
      :column-num="2"
    >
      <van-grid-item
        icon="home-o"
        text="路由跳转"
        to="/"
      />
      <van-grid-item
        icon="search"
        text="URL 跳转"
        url="/"
      />
    </van-grid>
  </div>
</template>
<script>
import { Toast } from 'vant'
export default {
  methods: {
    onClickLeft() {
      Toast('返回')
    }
  }
}
</script>