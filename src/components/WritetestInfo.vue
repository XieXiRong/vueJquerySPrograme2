<template>
  <div class="middle_list3">
    <div class="mhead">
      <span>填写测试商户号</span>
    </div>
    <el-form label-position="right" label-width="120px" v-if="formLabelAlign.length" v-loading="loading">
      <el-form-item label="应用名称">
        <p>{{formLabelAlign[0].PApplyFullName}}</p>
      </el-form-item>
      <el-form-item label="商户名">
        <p>{{formLabelAlign[0].PMerchantName}}</p>
      </el-form-item>
      <el-form-item label="商户类别">
        <p>{{formLabelAlign[0].PMerchantType}}</p>
      </el-form-item>
      <el-form-item label="申请人">
        <p>{{formLabelAlign[0].PUserName}}</p>
      </el-form-item>
      <el-form-item label="申请人分行">
        <p>{{formLabelAlign[0].PUserBranch}}</p>
      </el-form-item>
      <el-form-item label="申请入口">
        <p>{{entry}}</p>
      </el-form-item>
      <el-form-item label="调用接口">
        <p>{{formLabelAlign[0].MCallInterface}}</p>
      </el-form-item>

      <el-form-item label="测试地址">
        <p>{{formLabelAlign[0].MTestUrl}}</p>
      </el-form-item>

      <el-form-item label="测试商户号">
        <el-input v-model="TTestMerchantNo"></el-input>
      </el-form-item>
      <el-form-item label="测试秘钥">
        <el-input v-model="TTestMerchantPw"></el-input>
      </el-form-item>
      <div class="button5">
        <el-button type="primary" v-if="formLabelAlign[0].CurrStateNo=22" class="sub" plain @click="submitInfo">提交</el-button>
      </div>
    </el-form>
    <div v-if="showSucess">
      <p v-html="showtext"></p>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        formLabelAlign:[],
        TTestMerchantNo:'',
        TTestMerchantPw:'',
        entry:'',
        user:{},
        loading:true,
        showSucess:false,
        showtext:'没有需要验证的小程序'
      }
    },
    props:{

    },
    mounted(){
      var CurUser = JSON.parse(localStorage.getItem("CurUser"));
      var vm =this
      $.ajax({
        url: vm.User.baseUrl + "/api/miniprogram?userId=" + CurUser.USID,
        type: 'Get',
        beforeSend: function (xhr) {
          xhr.setRequestHeader('Authorization', 'BasicAuth ' + CurUser.TICKET)
        },
        xhrFields: {
          withCredentials: true
        },
        crossDomain: true,
        success: function (result) {
          console.log(result)
          if(result.StateCode){
            var data = result.Data;
            vm.formLabelAlign = data.MPList
            vm.getEntrys()
            console.log(data)
            if(!data.MPList.length){
              vm.loading = false
              vm.$alert('没有程序需要填写测试商户号', '提示', {
                confirmButtonText: '确定',
                callback: action => {
                  vm.$message({
                    type: 'info',
                    message: `action: ${ action }`
                  });
                }
              });
            }
          }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
          console.log("err")
        },
        cache: false,
        dataType: 'json'
      });
    },
    watch:{
      showSucess(){
        if(this.showSucess){
          this.formLabelAlign = []
        }
      }
    },
    methods: {
      getEntrys(){
        var vm = this
        var CurUser = JSON.parse(localStorage.getItem("CurUser"));
        //获取入口选项
        $.ajax({
          url: vm.User.baseUrl + "/api/params?id=" + 2001,
          type: 'Get',
          beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'BasicAuth ' + CurUser.TICKET)
          },
          xhrFields: {
            withCredentials: true
          },
          crossDomain: true,
          success: function (result) {
            var data = result.Data;
            var entrys = data
            console.log(data);
            for (var j = 0; j < entrys.length; j++) {
              if(vm.formLabelAlign.length){
                if (vm.formLabelAlign[0].MApplyEntryType == entrys[j].RealValue) {
                  vm.entry = entrys[j].ShowName
                }
              }
            }
            vm.loading = false

            // this.showSrManagerInfo.MCallInterface = JSON.parse(this.showSrManagerInfo.MCallInterface)
          },
          error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log("err")
          },
          cache: false,
          dataType: 'json'
        });
      },
      submitInfo(){
        if(!this.TTestMerchantPw||!this.TTestMerchantNo){
          this.$alert('请将信息填写完整', '提示', {
            confirmButtonText: '确定',
            callback: action => {
              this.$message({
                type: 'info',
                message: `action: ${ action }`
              });
            }
          });
        }else if(this.formLabelAlign[0].CurrStateNo!=22){
          this.$alert('此小程序流程不符合目前程序', '提示', {
            confirmButtonText: '确定',
            callback: action => {
              this.$message({
                type: 'info',
                message: `action: ${ action }`
              });
            }
          });
        }else{
          this.loading = true
          var obj = this.formLabelAlign[0]
          obj.TTestMerchantNo = this.TTestMerchantNo
          obj.TTestMerchantPw = this.TTestMerchantPw
          obj.CurrStateNo = 24
          var vm = this
          var CurUser = JSON.parse(localStorage.getItem("CurUser"));
          var miniProgram = obj
          var formData = new FormData()
          formData.append("MiniProgram", JSON.stringify(miniProgram))
          formData.append("CurUser", JSON.stringify(CurUser))
          $.ajax({
            url: vm.User.baseUrl + "/api/miniprogram",
            type: 'Post',
            data: formData,
            beforeSend: function (xhr) {
              xhr.setRequestHeader('Authorization', 'BasicAuth ' + CurUser.TICKET)
            },
            xhrFields: {
              withCredentials: true
            },
            contentType: false,
            processData: false,
            success: function (result) {
              console.log(result)
              if(result.StateCode){
                vm.loading = false
                var h = vm.$createElement;
                vm.showtext = '提交成功!'
                vm.showSucess = true
              }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
              console.log("err")
              vm.showtext = '提交失败,请重新再试!'
              vm.showSucess = true
            },
            cache: false,
            dataType: 'json'
          });
        }

      },
      logoutInfo(){
        this.$emit('closeshowWrite')
      },

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .middle_list {
    z-index: 6;
    top: 0;
    right: 0;
    position: absolute;
    height: 820px;
    width: 1130px;
    border: 1px solid rgba(187, 187, 187, 1);
    background-color: #fff;
    overflow: auto;
  }
  .middle_list3 {
    z-index: 6;
    position: absolute;
    height: 820px;
    width: 1130px;
    border: 1px solid rgba(187, 187, 187, 1);
    background-color: #fff;
    overflow: auto;
    right: 150px;
  }

  .mhead {
    background-color: #f8f8f8;
    height: 60px;
    text-align: left;
    border-bottom: 1px solid rgba(187, 187, 187, 1);
    margin-bottom: 52px;
  }

  .mhead span {
    margin-left: 45px;
    line-height: 60px;
    font-size: 20px;
    color: #101010;
  }

  .el-input {
    width: 630px;
    height: 40px;
  }

  .el-textarea {
    width: 630px;
    margin-left: -150px;
  }

  .el-select {
    margin-right: 562px;

  }

  .el-form--label-right {
    margin-left: 150px;
  }

  .el-button {
    width: 112px;
    position: relative;
    left: 55px;
    margin-top: 40px;
  }
  .el-form-item {
    margin-bottom: 15px;
  }
  .el-form--label-right[data-v-1493d9bf] {
    width: 800px;
  }
.button5{
  text-align: center;
}
</style>
<style>
  .el-form-item__label {
    color: rgba(16, 16, 16, 1);
    font-size: 18px;
    font-family: SourceHanSansSC-regular;
  }

</style>
