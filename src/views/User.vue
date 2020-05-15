<template>
  <div class="about">
    <div>
      <van-nav-bar title="个人中心">
        <template #right>
          <van-image
            round
            width="50px"
            height="50px"
            :src="user.avatarUrl"
          />
        </template>
      </van-nav-bar>
      <p>欢迎使用本产品，{{user.nickname}}</p>
    </div>

    <van-grid
      clickable
      :column-num="2"
    >
      <van-grid-item
        text="主页"
        to="/home"
      />
      <van-grid-item
        text="退出登录"
        @click="onClickLeft"
        url="/"
      />
    </van-grid>

    <van-card
      title="个人资料"
      :thumb="user.avatarUrl"
      :style="{backgroundImage: 'url(' + coverImgUrl + ')', backgroundSize:'contain'}"
    >
      <template #desc>
        <div class="card">
          <div>昵称：{{personal.nickname}}</div>
          <div>个签：{{personal.signature}}</div>
          <div>性别：{{value}}</div>
          <div>被关注：{{user.followeds}}</div>
          <div>喜欢：{{user.follows}}</div>
          <!-- <van-field
            clickable
            label="性别"
            :value="value"
            placeholder="选择性别"
            @click="showPicker = true"
          /> -->
        </div>
      </template>
    </van-card>
    <van-popup
      v-model="showPicker"
      round
      position="bottom"
    >
      <van-picker
        show-toolbar
        :columns="columns"
        @cancel="showPicker = false"
        @confirm="onConfirm"
      />
    </van-popup>
    <van-button
      color="linear-gradient(to right, #4bb0ff, #6149f6)"
      @click="updateAccount"
    >修改资料</van-button>
  </div>
</template>
<script>
import { Toast } from 'vant'
export default {
  name: 'User',
  data() {
    return {
      account: JSON.parse(localStorage.getItem('account')),
      user: {},
      activeNames: ['1'],
      personal: {
        gender: 0,
        signature: '',
        city: 0,
        nickname: '',
        birthday: '',
        province: 0,
        avatarImgId: '0'
      },
      value: '',
      showPicker: false,
      columns: ['保密', '男', '女'],
      currentTime: '',
      coverImgUrl: ''
    }
  },
  methods: {
    onClickLeft() {
      this.$router.push('/home')
      localStorage.removeItem('token')
      // console.log('http://localhost:3000/user/detail?uid=1497065990')
    },
    getAccount() {
      this.axios({
        method: 'get',
        url: 'http://localhost:3000/user/detail?uid=' + this.account.id
      }).then((res) => {
        console.log(res.data)
        this.user = res.data.profile
        this.personal.gender = this.user.gender
        this.personal.signature = this.user.signature
        this.personal.city = this.user.city
        this.personal.nickname = this.user.nickname
        this.personal.birthday = this.user.birthday
        this.personal.province = this.user.province
        console.log(this.user)
        this.coverImgUrl = this.user.backgroundUrl
        this.gender()
      })
    },
    // getInfo() {
    //   this.axios({
    //     method: 'get',
    //     url: 'http://localhost:3000/user/subcount'
    //   }).then((res) => {
    //     console.log(res.data)
    //   })
    // },
    updateAccount() {
      var getTimestamp = new Date().getTime()
      this.axios({
        method: 'post',
        url:
          'http://localhost:3000/user/update?gender=' +
          this.personal.gender +
          '&signature=111' +
          this.personal.signature +
          '&city=' +
          this.personal.city +
          '&nickname=' +
          this.personal.nickname +
          '&birthday=' +
          this.personal.birthday +
          '&province=' +
          this.personal.province
      }).then((res) => {
        console.log(res)
        this.getAccount()
      })
    },
    onConfirm(value) {
      this.value = value
      if (this.value == '保密') {
        this.personal.gender = 0
      } else if (this.value == '男') {
        this.personal.gender = 1
      } else this.personal.gender = 2

      this.showPicker = false
    },
    gender() {
      if (this.personal.gender == 0) {
        this.value = '保密'
      } else if (this.personal.gender == 1) {
        this.value = '男'
      } else this.value = '女'
    }
  },
  created() {
    // this.getInfo()

    this.getAccount()
  }
}
</script>
<style>
.card {
  /* height: 300px; */
  width: 200px;
  background-color: #ffffff;
  /* box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.05); */
  border-radius: 5px;
  overflow: hidden;
}
.about {
  text-align: center;
}
</style>