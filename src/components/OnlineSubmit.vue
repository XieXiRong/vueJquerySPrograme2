<template>
  <div class="middle_list">
    <div class="list_wrap">
      <div class="mhead">
        <span>提交上线</span>
        <i class="iconfont icon-icon-" @click="closeSubmit"></i>
      </div>
      <div v-loading="loading">
        <div class="seletitem" v-if="onlineData.CurrStateNo%10!=3">
          <span>生产地址</span>
          <el-input size="small"
                    v-model="onlineSubmit.MApplyHome">
          </el-input>
        </div>
        <div class="seletitem" v-if="onlineData.CurrStateNo%10==3">
          <span>生产地址</span>
          <el-input size="small" v-model="onlineData.RApplyHome" value="onlineData.RApplyHome">
          </el-input>
        </div>
        <div class="seletitem" v-if="onlineData.CurrStateNo%10!=3">
          <span>全行通用</span>
          <el-switch
            v-model="onlineSubmit.MIsAllowAllBank">
          </el-switch>
        </div>
        <div class="seletitem" v-if="onlineData.CurrStateNo%10==3">
          <span>全行通用</span>
          <el-switch
            v-model="allBankUse">
          </el-switch>
        </div>
        <div class="seletitem" v-if="!onlineSubmit.MIsAllowAllBank">
          <span>说明原因</span>
          <el-input size="small" v-if="onlineData.CurrStateNo%10!=3" v-model="onlineSubmit.MNotAllowInfo"></el-input>
          <el-input size="small" v-if="onlineData.CurrStateNo%10==3" value="onlineData.MNotAllowInfo"
                    v-model="onlineData.MNotAllowInfo"></el-input>
        </div>
        <div class="seletitem" v-if="onlineData.CurrStateNo%10!=3">
          <span>展示在首页宫格</span>
          <el-switch
            v-model="onlineSubmit.showOnMsite">
          </el-switch>
        </div>
        <div class="seletitem" v-if="onlineData.CurrStateNo%10==3">
          <span>展示在首页宫格</span>
          <el-switch
            v-model="RIsShowHome">
          </el-switch>
        </div>
        <div class="seletitem" v-if="onlineData.CurrStateNo%10==3">
          <span>可搜索</span>
          <el-switch
            v-model="RIsSearch">
          </el-switch>
        </div>
        <div class="seletitem" v-if="onlineData.CurrStateNo%10!=3">
          <span>可搜索</span>
          <el-switch
            v-model="onlineSubmit.searchAble">
          </el-switch>
        </div>
        <div class="seletitem" v-if="onlineData.CurrStateNo%10!=3">
          <span>申请入口</span>
          <el-radio v-for="(entry,index) in entrys" :key="index" v-model="onlineSubmit.MApplyEntryType"
                    :label="entry.RealValue">{{entry.ShowName}}
          </el-radio>
        </div>
        <div class="seletitem" v-if="onlineData.CurrStateNo%10==3">
          <span>申请入口</span>
          <el-radio v-for="(entry,index) in entrys" :key="index" v-model="MEntryType1"
                    :label="entry.ShowName">{{entry.ShowName}}
          </el-radio>
        </div>
        <div class="seletitem">
          <span>分类标签</span>
          <el-input size="small" v-if="onlineData.CurrStateNo%10!=3" v-model="onlineSubmit.MTags"
                    placeholder="选填"></el-input>
          <el-input size="small" v-if="onlineData.CurrStateNo%10==3" value="onlineData.MTags"
                    v-model="onlineData.MTags"></el-input>
        </div>
          <div class="seletitem" v-if="onlineData.CurrStateNo%10==3">
            <span>修改说明</span>
            <el-input size="small" value="onlineData.RChangeInfo" v-model="onlineData.RChangeInfo"></el-input>
          </div>
        <el-row>
          <el-button type="primary" plain @click="subOnline">提交</el-button>
          <el-button type="info" @click="closeSubmit">取消</el-button>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        onlineSubmit: {
          showOnMsite: true,
          searchAble: true,
          MApplyHome: '',
           MApplyEntryType: '',
          MTags: '',
          MIsAllowAllBank: true,
        },
        loading: false,
        entrys: [],
        allBankUse: true,
        RIsShowHome:true,
        RIsSearch:true,
        MEntryType:'',  //申请入口的编号
        MEntryType1:'', //申请入口的名字
      }
    },
    props: {
      onlineData: Object
    },
    mounted() {
      this.loading = true
      var CurUser = JSON.parse(localStorage.getItem("CurUser"));
      var vm = this
      if (this.onlineData.MIsAllowAllBank == 1) {
        this.allBankUse = true
      } else {
        this.allBankUse = false
      }
      if(this.onlineData.RIsShowHome==1){
        this.RIsShowHome = true
      }else {
        this.RIsShowHome = false
      }
      if(this.onlineData.RIsSearch==1){
        this.RIsSearch = true
      }else {
        this.RIsSearch = false
      }

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
          console.log(data)
          vm.entrys = data
          vm.loading = false
          if(vm.onlineData.MApplyEntryType){
            var i = vm.onlineData.MApplyEntryType - 1
            vm.MEntryType1 = vm.entrys[i].ShowName
          }
          //RealValue  bianhao
          //ShowName  mingzi
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
          console.log("err")
        },
        cache: false,
        dataType: 'json'
      });
    },
    methods: {
      closeSubmit() {
        this.$emit('closeOnlineSubmit')
      },
      subOnline() {
        var vm = this
        this.loading = true
        var CurUser = JSON.parse(localStorage.getItem("CurUser"));

        if(this.onlineData.CurrStateNo % 10 == 3){
          if(this.allBankUse){
            this.onlineData.MIsAllowAllBank = 1
          }else{
            this.onlineData.MIsAllowAllBank = 0
          }
          if(this.RIsShowHome){
            this.onlineData.RIsShowHome = 1
          }else{
            this.onlineData.RIsShowHome = 0
          }
          if(this.RIsSearch){
            this.onlineData.RIsSearch = 1
          }else{
            this.onlineData.RIsSearch = 0
          }
          for(var i=0;i<vm.entrys.length;i++){
            if(vm.entrys[i].ShowName==vm.MEntryType1){
              vm.onlineData.MApplyEntryType = i + 1
            }
          }
        }


        if (this.onlineData.CurrStateNo % 10 != 3) {
          vm.onlineData.MApplyEntryType = vm.onlineSubmit.MApplyEntryType
          vm.onlineData.RApplyHome = this.onlineSubmit.MApplyHome
          vm.onlineData.MTags = this.onlineSubmit.MTags
          if (this.onlineSubmit.MIsAllowAllBank) {
            vm.onlineData.MIsAllowAllBank = 1
          } else {
            vm.onlineData.MIsAllowAllBank = 0
          }
          if (this.onlineSubmit.showOnMsite) {
            vm.onlineData.RIsShowHome = 1
          } else {
            vm.onlineData.RIsShowHome = 0
          }
          if (this.onlineSubmit.searchAble) {
            vm.onlineData.RIsSearch = 1
          } else {
            vm.onlineData.RIsSearch = 0
          }

        }
        vm.onlineData.CurrStateNo = 51
        var miniProgram = vm.onlineData
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
            if (result.StateCode) {
              vm.loading = false
              var h = vm.$createElement;
              vm.$notify({
                title: '操作提醒',
                message: h('i', {style: 'color: teal'}, '申请成功')
              });
              vm.onlineData.CurrStateName = result.Data.CurrStateName
              vm.$emit('changeManager', result.Data)
              vm.closeSubmit()
            }
          },
          error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log("err")
          },
          cache: false,
          dataType: 'json'
        });
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-input {
    width: 550px;
  }

  .middle_list {
    z-index: 6;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    position: absolute;
    border: 1px solid rgba(187, 187, 187, 1);
    background-color: rgba(16, 16, 16, 0.44);
  }

  .list_wrap {
    margin: 100px auto;
    height: 640px;
    width: 927px;
    background-color: #fff;
    color: rgba(16, 16, 16, 1);
    font-size: 18px;
    font-family: SourceHanSansSC-regular;
  }

  .mhead {
    background-color: #E0E0E0;
    height: 60px;
    text-align: left;
    border-bottom: 1px solid rgba(187, 187, 187, 1);
    margin-bottom: 50px;
    position: relative;
  }

  .icon-icon- {
    position: absolute;
    right: 40px;
    line-height: 60px;
    font-size: 24px;
    font-weight: bold;
  }

  .mhead span {
    margin-left: 45px;
    line-height: 60px;
    font-size: 20px;
    color: #101010;
  }

  .seletitem {
    text-align: left;
    padding-left: 100px;
    margin-bottom: 30px;
  }

  .seletitem span {
    margin-right: 20px;
  }

  .el-button {
    margin-right: 50px;
  }
</style>
<style>
  .el-form-item__label {
    color: rgba(16, 16, 16, 1);
    font-size: 18px;
    font-family: SourceHanSansSC-regular;
  }

</style>
