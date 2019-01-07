<template>

  <div class="rightbar">
    <div class="barwrap">
      <div class="butt" @click="togglebar">
        <i class="el-icon-arrow-right" ref="swor"></i>
      </div>
      <div class="bartop">
        <span></span>
      </div>
      <div class="search">

      </div>
      <el-aside width="240">
        <el-menu :default-openeds="['1', '3']">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>我的小程序</template>
            <el-menu-item-group>
              <el-menu-item index="1-1"  @click="showapplynew">新增</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
              <el-menu-item index="1-3">选项3</el-menu-item>
              <el-menu-item index="1-4-1">选项4-1</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-menu"></i>小程序管理</template>
            <el-menu-item-group>
              <el-menu-item index="2-1">选项1</el-menu-item>
              <el-menu-item index="2-2">选项2</el-menu-item>
              <el-menu-item index="1-1">新增</el-menu-item>
              <el-menu-item index="2-3">选项3</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
              <el-menu-item index="1-3">选项3</el-menu-item>
              <el-menu-item index="1-4-1">选项4-1</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-setting"></i>流程</template>
          </el-submenu>
        </el-menu>
      </el-aside>
    </div>

  </div>
</template>

<script>
  export default {
    props:{
      showapply:Boolean
      // showmsite:Function
    },
    data() {
      const item = {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      };
      return {
        tableData: Array(20).fill(item)
      }
    },
    methods:{
      showapplynew(){
        this.$emit('showapplynew')
      },
      togglebar(){

        var barwrap = document.getElementsByClassName('barwrap')[0]
        var swor = this.$refs.swor
        if(barwrap.classList.contains('toggle')){
          barwrap.classList.remove('toggle')
          swor.className = 'el-icon-arrow-right';
        }else {
          barwrap.classList.add('toggle')
         swor.className = 'el-icon-arrow-left';

        }

      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .butt{
    position: absolute;
    top: 48%;
    left: -20px;
    width: 20px;
    height: 80px;
    border-radius: 20px 0 0 20px;
    background-color: white;
    text-align: center;
  }
  .butt i{
    line-height: 80px;
    color: black;
    font-size: 14px;
  }
  .rightbar{

    position: fixed;
    width: 240px;
    height: 100%;
    background-color: #F5F5F5;
    right: 0;
    top: 0;
  }
  .barwrap{
    transition: 0.5s all;
    background-color: white;
    width: 240px;
    height: 100%;
  }
 #app .rightbar .el-aside{
    width: 240px;
    position: absolute;
    top: 110px;
    right: 0;
  }
  .bartop{
    width: 100%;
    text-align: center;
    height: 2px;
  }
  .bartop span{
    margin-top: 80px;
    display: inline-block;
    width: 70%;
    height: 1px;
    background-color: rgba(187, 187, 187, 1);
  }
  .el-menu {
    padding-right: 30px;
  }
  .el-submenu__icon-arrow {
    right: 10px;
  }
.toggle{
  transform: translateX(240px);
}

</style>
