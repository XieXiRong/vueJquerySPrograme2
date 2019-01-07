<template>
  <div id="app" :style="{'height':screenHeight+'px'}" element-loading-text="正在登陆中..."
       element-loading-spinner="el-icon-loading">
    <Header v-if="showMain&&notBusinessAdd"/>
    <router-view v-if="showMain" :contentHeight="contentHeight"/>
  </div>
</template>

<script>
  import Header from './components/Header'
  import $ from 'jquery'

  export default {
    data() {
      return {
        showMain: false,
        loading: true,
        notBusinessAdd:true,
        screenHeight: '',
        contentHeight:'',
      }
    },
    components: {
      Header: Header
    },
    mounted() {

      var vm = this
      var ticket = "BA10B0BE59C10D0BD2941F050B985B8BCDEE940586D29F94632BFDFB7B164F857A08EB4A26DB6B241E56EE9DACCE9BBA754FAAB08783C7DA519BF05E702E23CC07D7CCF2562599D43B9DA217146BD83E2A345D588E83E415679AFD0C5D9234F9AF8CFEA2400BC15C850D7365F896B85908DEE75404FF6F48CE8316F9CF2E7EB78D920D0271572978987B4C060E5330EA7343F7D18746371D9F0ADD034B6C5DD5CF8BF261AE485DA9E71048AEB71559A0BAEFA85348613F4AF00C8840F102E1BEF784F66D667FA9A33A827F2B4116EC878F68224173AD0802DE497D7C6E11561E"
      var data = 'VVNJRD0yMzQ4NDZ8T1JHSUQ9MTIyMDM1fFRJTUU9MjAxOC0wMS0xMlQxMTo0NDo1NXxJUD05OS4xMi40My4xMjd8U0FQSUQ9ODAyMzQ4NDZ8RU1BSUw9a2Fyc29uNzE4QGNtYmNoaW5hLmNvbXxOQU1FPcDuv7XPzXxCUjE9MTAwMDAzfFBBVEg919zQ0C%2fQxc%2bivLzK9bK%2fL9XQ0vjN%2bMLnv8a8vC%2fR0Lei1tDQxC%2fH%2frXA0rXO8b%2bqt6LNxbbTL7DsuavX1Lavu6%2fSu8rSo6jJ7tvao6l8R1BJRD0wMTAwMDQ1OFM5'
      var token = 'kH5r7BXhcd1q3jgIe2ZPQWEnaAzZb6n8t%2f67D9GIBAcBtL1sP6JCyFz3bAxCHkHwLJTPuyPCHZmXuDCAtSQX%2bJsP1uajVuLangUhbERy9kLB%2fZgUjxZAmpN3i3HrKH9gKlsUzpjkGyt%2bjp8%2fcNB7T578brs8BpwXRnMglE3G5ng%3d'
      //var data ='eyJ5c3RJRCI6IjE5ODcwNyIsInNhcElEIjoiMDEwNDA2MzQiLCJuYW1lIjoi55m96Z2Z5p2wIiwib3JnSUQiOiIxMTA0MjIiLCJvcmdOYW1lIjoi6L%2BQ6KGM6LCD5bqm5a6kIiwicGF0aElEIjoiLzEwMDAwMy8xMDAxNDMvMTEzNDAyLzExMDQyMiIsInBhdGhOYW1lIjoi5oC76KGML%2BS%2FoeaBr%2BaKgOacr%2BmDqC%2FmlbDmja7kuK3lv4Mv6L%2BQ6KGM6LCD5bqm5a6kIiwicGxhdGZvcm0iOiJhbnBob25lIiwib3NWZXJzaW9uIjoiNy4wIiwicHViVmVyc2lvbiI6IlYyLjMuOSIsImRldmljZUlEIjoiNzE5NDE0MzItOEEwRC00MDk4LTlERTUtNzg4MjUxMEUxMzQ0IiwidGltZSI6IjIwMTctMTItMjRUMDk6NDQ6MDYifQ%3D%3D'
      //var token ='a35b823e0b002a14c78c012b70254a6ff9e21f3467ea11d4563be605bfd534e7850264c45a145cdb0ac287f655cd5117284a6abffbd0d8bb5f3cfad0c37211ac82bd868fe8d3e9aae671ec7147cc2ac5481dbe3bf3db5690bedd727f6254f0a9d922e62d9431594616aebc3964537851bee58580b38bb48d15225ab3e1b576de'
      var rol = 0
      rol = this.$route.query.RoleType
      var formData = new FormData();
      formData.append("data", data.replace(/\s/g, ""));
      formData.append("token", token.replace(/\s/g, ""));
      formData.append("isTokenExpired", true); //测试时提交
      formData.append("RoleType", rol) //测试时设置用户角色
      $.ajax({
        url: vm.User.baseUrl + "/api/users?isTokenExpired=true",
        type: 'Post',
        beforeSend: function (xhr) {
          xhr.setRequestHeader('Authorization', 'BasicAuth ' + ticket)
        },
        // async:false,
        data: formData,
        contentType: false,
        xhrFields: {
          withCredentials: true
        },
        processData: false,
        success: function (result) {
          if (result.StateCode) {
            console.log(result.Data);
            var obj = JSON.stringify(result.Data)
            if(result.Data.ROLETYPE ==3){
              vm.notBusinessAdd = false
            }
            localStorage.setItem("CurUser", obj)
            vm.authTest(result.Data.TICKET);
            console.log('登录验证成功')
          } else {
            console.log('登录验证失败')
            vm.$alert('登录超时,请返回一事通重新登录', '提示', {
              confirmButtonText: '确定',
              callback: action => {
                vm.$message({
                  type: 'info',
                  message: `action: ${ action }`
                });
              }
            });
          }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
          console.log("err")
        },
        cache: false,
        dataType: 'json'
      });

      this.screenHeight = document.documentElement.clientHeight
      this.contentHeight = document.documentElement.clientHeight-130
      var vm = this
      window.onresize = function(){
        var h = document.documentElement.clientHeight
        vm.contentHeight =  h-130;
        vm.screenHeight = h
      }
    },
    methods: {

      authTest(ticket) {
        var vm = this
        $.ajax({
          url: vm.User.baseUrl + "/api/values",
          type: 'Get',
          // async:false,
          beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'BasicAuth ' + ticket)
          },
          xhrFields: {
            withCredentials: true
          },
          success: function (result) {
            if (result.length) {
              vm.showMain = true
              vm.loading = false
            }
          },
          error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log("err")
          },
          cache: false,
          dataType: 'json'
        });
      },
      // getHeight(){
      //   this.screenHeight = window.innerHeight-118 + 'px'
      // },
    },
    watch:{

    },


    // var linkStr=window.location.href
    // var queryObj={}
    // var str=linkStr.split("?")[1],
    //   items=str.split("&");
    // var arr,name,value;
    // for(var i = 0, l = items.length; i < l; i++){
    //   arr=items[i].split("=");
    //   name= arr[0];
    //   value= arr[1];
    //   queryObj[name]=value;
    // }
    // var user = JSON.parse(decodeURI((queryObj.userInfo)))
    //var userId = user.USID
    //var userName = user.NAME
    // var data= user.data
    // var token = user.token
    // var ticket = user.TICKET

  }
</script>

<style>

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    height: 930px;
    background-color: #F0F0F2;
    width: 100%;
    margin: 0 auto;
    position: relative;
  }

</style>
