<template>
  <div class="about">
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
    ><template #desc>
        <van-panel
          :title="personal.nickname"
          :desc="personal.signature"
        >
          <van-field
            clickable
            label="性别"
            :value="value"
            placeholder="选择性别"
            @click="showPicker = true"
          />
        </van-panel>

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
      currentTime: ''
    }
  },
  methods: {
    onClickLeft() {
      this.$router.push('/home')
      localStorage.removeItem('token')
      console.log('http://localhost:3000/user/detail?uid=1497065990')
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