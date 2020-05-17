<template>
  <div>
    <van-nav-bar title="登陆界面" />
    <van-field
      label="手机号"
      type="tel"
      clickable
      :value="validateForm.username"
      @touchstart.native.stop="show = true,show1=false"
    />
    <van-number-keyboard
      v-model="validateForm.username"
      :show="show"
      :maxlength="11"
      @blur="show = false,show1=false"
    />
    <van-field
      label="密码"
      type="password"
      clickable
      :value="validateForm.password"
      v-model="validateForm.password"
    />
    <van-button
      type="primary"
      size="large"
      @click="submit"
    >登录</van-button>
    <router-link to="/sign">
      <div>没有账号？点这儿注册</div>
    </router-link>
  </div>
</template>
<script>
import { Toast } from 'vant'
export default {
  name: 'Login',
  data() {
    return {
      tel: '',
      text: '',
      digit: '',
      number: '',
      password: '',
      show: false,
      show1: false,
      show2: false,
      value: '',
      passvalue: '',
      validateForm: {
        username: '',
        password: ''
      },
      currentTime: '',
      user: {},
      info: [],
      nowplay: [],
      url: []
    }
  },
  methods: {
    submit() {
      this.axios({
        method: 'post',
        url: 'http://localhost:3000/login/cellphone?phone=' + this.validateForm.username + '&password=' + this.validateForm.password
      }).then((res) => {
        console.log(res.data)
        if (res.data.code == 200) {
          let data = res.data
          localStorage.setItem('token', data.token)
          localStorage.setItem('profile', JSON.stringify(data.profile))
          localStorage.setItem('account', JSON.stringify(data.account))
          localStorage.setItem('info', JSON.stringify(this.info))
          localStorage.setItem('url', JSON.stringify(this.url))
          localStorage.setItem('nowplay', JSON.stringify(this.nowplay))
          Toast('登陆成功')

          this.$router.push('/home')
        } else {
          Toast(res.data.msg)
          Toast(result.data.msg)
        }
      })
    }
  },
  created() {},
  components: {}
}
</script>
