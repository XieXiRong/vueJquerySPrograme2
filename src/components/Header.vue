<template>
<div class="header">
  <div class="header1">
    <div class="headl">
      <span>小程序管理平台</span>
    </div>
    <div class="headr">
      <img src="../../static/images/wallhaven-665333.jpg" alt="">
      <span class="hname">{{name}}</span>
      <i class="iconfont icon-tuichu" v-if="showLogout" @click="logout"></i>
      <span class="tuichu" v-if="showLogout" @click="logout">退出</span>
    </div>
  </div>

</div>

</template>

<script>
  export default {
    data(){
      return{
        name:'',
        showLogout:false,
      }
    },
    mounted(){
      var CurUser = JSON.parse(localStorage.getItem("CurUser"));
      if(CurUser){
        this.showLogout = true
        this.name = CurUser.NAME
      }
    },
    methods:{
      logout(){
        var vm =this
        this.$confirm('确认退出登录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          localStorage.removeItem("CurUser")
          vm.name = '请返回一事通登录'
          vm.showLogout = false
          this.$message({
            type: 'info',
            message: '退出登录成功'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消退出登录'
          });
        });

      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .header{
    height: 65px;
    background-color: white;
    display: flex;
    align-items: center;
    position: relative;
    width: 100%;
    margin-bottom: 25px;
  }
  .header1{
    height: 65px;
    background-color: white;
    display: flex;
    align-items: center;
    position: relative;
    width: 1415px;
    margin: 0 auto;
  }
  .headr{
    position: absolute;
    right: 0;
    display: flex;
    align-items: center;
  }
  .hname{
    font-size: 16px;
    color: #101010;
  }
  .headl{
    display: flex;
    align-items: center;
  }
  .headl span{
    font-size: 22px;
    color: black;
  }
  .hname{
    margin-right: 40px;
  }
  .headr img{
    width: 32px;
    height: 32px;
    border-radius: 50%;
    margin-right: 10px;
  }
  .icon-tuichu{
    margin-right: 10px;
    color: #E51C23;
    font-size: 30px;
    font-weight: bold;
    cursor: pointer;

  }
  .tuichu{
   cursor: pointer;
    font-size: 16px;
    color: #E51C23;
    font-family: SourceHanSansSC-bold;
  }
</style>
