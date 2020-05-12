<template>
  <div class="home">
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
      @touchstart.native.stop="show1 = true,show=false"
    />
    <van-number-keyboard
      v-model="validateForm.password"
      :show="show1"
      :maxlength="11"
      @blur="show1 = false,show=false"
    />

    <van-field
      v-model="verifyCode"
      center
      clearable
      label="验证码"
      placeholder="请输入验证码"
      type="text"
      autocapitalize="on"
    >
      <template #button>
        <img
          ref="image"
          alt
          @click="getVerify()"
        />
      </template>
    </van-field>

    <van-button
      type="primary"
      size="large"
      @click="submit"
    >登录</van-button>

  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import { Toast } from 'vant'

export default {
  name: 'Home',
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
      verifyCode: '',
      validateForm: {
        username: '',
        password: ''
      },
      currentTime: '',
      user: {}
    }
  },
  methods: {
    //获取验证码
    getVerify() {
      //获取当前时间毫秒数作为验证码的key
      this.currentTime = new Date().getTime()
      this.axios({
        method: 'get',
        url: 'http://localhost:8080/captcha',
        // 将请求数据转换为form-data格式
        params: {
          name: this.currentTime
        },
        // 设置请求头Content-Type
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        //后端采用流
        responseType: 'blob'
      }).then((res) => {
        //使用$refs获取网页标签
        let img = this.$refs.image
        //将接收到的数据转成地址
        let url = window.URL.createObjectURL(res.data)
        //赋值给图片标签的src
        img.src = url
      })
    },
    //提交登录信息
    submit() {
      console.log(this.currentTime)
      this.axios({
        method: 'post',
        url: 'http://localhost:8080/sysAdmin/login',
        data: {
          name: this.validateForm.username,
          password: this.validateForm.password,
          verifyCode: this.verifyCode
        },
        headers: {
          Verify: this.currentTime
        }
      }).then((res) => {
        console.log(res.data)
        if (res.data.code == 1) {
          let data = res.data.data
          //登录成功，将返回的token存入localStorage，并且也存入Vuex中
          localStorage.setItem('token', data.token)
          //获取用户角色
          this.roles = data.roles
          //获取用户信息并存入Vuex和localStorage
          localStorage.setItem('user', JSON.stringify(data.user))
          Toast(res.data.msg)
          this.$router.push('/about')
          //再进入主页之前调用查询用户角色的方法，看是否存在多个用户
        } else {
          Toast(res.data.msg)
          Toast(result.data.msg)
        }
      })
      // localStorage.setItem('user', JSON.stringify(user))
      // localStorage.setItem('menuList', JSON.stringify(this.menuList))

      // this.$store.commit('setUser', user)
      // this.$store.commit('setMenuList', this.menuList)
    }
  },
  created() {
    this.getVerify()
  },
  components: {
    HelloWorld
  }
}
</script>
