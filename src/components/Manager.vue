<template>
  <div class="box">
    <div class="searchArea">
      <div class="searchbox">
        <span>名称</span>
        <el-input v-model="search" prefix-icon="el-icon-search" placeholder="请输入名称搜索" class="inputsearch"></el-input>
      </div>
      <div class="searchbox searchbox3">
        <span>开发分行或机构</span>
        <el-input v-model="bankName" prefix-icon="el-icon-search" placeholder="请输入分行名字" class="inputsearch"></el-input>
      </div>
      <div class="searchbox">
        <span>状态</span>
        <el-select v-model="value8" filterable placeholder="请选择" class="inputsearch">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="searchbox searchbox4" id="searchbox2">
        <span>创建时间</span>
        <el-date-picker
          size="small"
          format="yyyy-M-d"
          id="inputsearch2"
          class="inputsearch"
          v-model="value13"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['00:00:00', '23:59:59']">
        </el-date-picker>
      </div>
      <div class="searchbox">
        <el-button type="primary" class="button1" @click="searchInfo">搜索</el-button>
      </div>
    </div>

    <el-table
      v-loading="loading"
      show-overflow-tooltip="true"
      :data="infoData"
      style="width: 100%">
      <el-table-column
        label="名称"
        align="center"
        width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px" class="enterOne" v-html="scope.row.PApplyFullName" @click="handleEdit(scope.$index, scope.row)"></span>
        </template>
      </el-table-column>
      <el-table-column
        label="商户名"
        align="center"
        width="180">
        <template slot-scope="scope">
          <span v-html="scope.row.PMerchantName" @click="handleEdit(scope.$index, scope.row)"></span>
        </template>
      </el-table-column>
      <el-table-column
        label="开发分行或机构"
        align="center"
        width="180">
        <template slot-scope="scope">
          <span v-html="scope.row.PBranchName" @click="handleEdit(scope.$index, scope.row)"></span>
        </template>
      </el-table-column>
      <el-table-column
        label="申请人分行或机构"
        align="center"
        width="140">
        <template slot-scope="scope">
          <span v-html="scope.row.PUserName" @click="handleEdit(scope.$index, scope.row)"></span>
        </template>
      </el-table-column>
      <el-table-column
        label="商户类型"
        align="center"
        width="130">
        <template slot-scope="scope">
          <span v-html="scope.row.PMerchantType" @click="handleEdit(scope.$index, scope.row)"></span>
        </template>
      </el-table-column>
      <el-table-column
        label="状态"
        align="center"
        width="150">
        <template slot-scope="scope">
          <span style="margin-left: 10px" class="statement" :class="{'statenotok':scope.row.CurrStateNo%10==3,'stateok':scope.row.CurrStateNo==12||
                scope.row.CurrStateNo==24||scope.row.CurrStateNo==32||scope.row.CurrStateNo==42||scope.row.CurrStateNo==52,
                'stateing':scope.row.CurrStateNo==22||scope.row.CurrStateNo==54}" @click="handleEdit(scope.$index, scope.row)"
          >{{scope.row.CurrStateName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            @click="openChange(scope.row)"
            size="mini">
            编辑
          </el-button>
          <el-button
            @click="deleteOne(scope.row)"
            size="mini">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      @current-change="clickPage"
      layout="prev, pager, next"
      :current-page.sync="currentPageNow"
      :page-count="Math.ceil(infoCounts/9)">
    </el-pagination>
  </div>
</template>

<script>
  import $ from 'jquery'
  import Vue from 'vue'
  export default {
    data() {
      return {
        loading:false,
        value8: '',
        search: '',
        bankName: '',
        options: [
          {
            value: '',
            label: '请选择'
          }, {
            value: '0',
            label: '全部状态'
          }, {
            value: '11',
            label: '立项申请中'
          }, {
            value: '12',
            label: '立项通过'
          }, {
            value: '13',
            label: '立项不通过'
          }, {
            value: '21',
            label: '商户号申请中'
          },  {
            value: '22',
            label: '测试商户号处理中'
          },{
            value: '24',
            label: '商户号已颁发'
          },{
            value: '23',
            label: '商户号被拒绝'
          },
          {
            value: '31',
            label: '方案审核中'
          },
          {
            value: '32',
            label: '方案通过'
          },
          {
            value: '33',
            label: '方案不通过'
          },
          {
            value: '41',
            label: '测试申请中'
          },
          {
            value: '42',
            label: '测试通过'
          },
          {
            value: '43',
            label: '测试不通过'
          },
          {
            value: '51',
            label: '上线申请中'
          },
          {
            value: '53',
            label: '上线被拒绝'
          },
          {
            value: '54',
            label: '正式商户号配置中'
          },
          {
            value: '52',
            label: '已上线'
          },
        ],
        value13: [],
        infos: [],  //符合条件的全部数据
        infoCounts:0,
        infoData:[],  //当前展示的数据
        currentPage:1,
        currentPageNow:1,
      }
    },
    props: {
      waited: Boolean,
      tableData: Array,  //全部数据
      changeItem:Object,
      AuditMPList:Array,
      MPAttachments:Object,
    },
    watch: {
      changeItem(){
        for (let i = 0; i < this.infoData.length; i++) {
          if (this.infoData[i].Id == this.changeItem.Id) {
            Vue.set(this.infoData, i, this.changeItem)
            //this.infoData[i] = this.changeItem
          }
        }
      },
      search() {
        if (!this.search && !this.value8 && !this.bankName && !this.value13.length) {
          if (!this.waited) {
            this.infos = []
            this.getPageData(this.currentPage)
          }
          if (this.waited) {
            var newArr = this.tableData.filter(dataNews => {
              return dataNews.CurrStateNo % 10 == 1 || dataNews.CurrStateNo == 54
            })
            this.infos = newArr
            this.infoCounts = newArr.length
            this.infoData = newArr.slice(0, 9)
          }
        }
      },
      value8() {
        if (!this.search && !this.value8 && !this.bankName && !this.value13.length) {
          if (!this.waited) {
            //this.infos = this.tableData
            this.infos = []
            this.getPageData(this.currentPage)
          }
          if (this.waited) {
            var newArr = this.tableData.filter(dataNews => {
              return dataNews.CurrStateNo % 10 == 1 || dataNews.CurrStateNo == 54
            })
            this.infos = newArr
            this.infoCounts = newArr.length
            this.infoData = newArr.slice(0, 9)
          }
        }
      },
      bankName() {
        if (!this.search && !this.value8 && !this.bankName && !this.value13.length) {
          if (!this.waited) {
            this.infos = []
            this.getPageData(this.currentPage)

          }
          if (this.waited) {
            var newArr = this.tableData.filter(dataNews => {
              return dataNews.CurrStateNo % 10 == 1 || dataNews.CurrStateNo == 54
            })
            this.infos = newArr
            this.infoCounts = newArr.length
            this.infoData = newArr.slice(0, 9)
          }
        }
      },
      value13() {
        if(this.value13==null){
          this.value13=[]
        }
        if (!this.search && !this.value8 && !this.bankName && !this.value13.length) {
          if (!this.waited) {
            this.infos = []
            this.getPageData(this.currentPage)

          }
          if (this.waited) {
            var newArr = this.tableData.filter(dataNews => {
              return dataNews.CurrStateNo % 10 == 1 || dataNews.CurrStateNo == 54
            })
            this.infos = newArr
            this.infoCounts = newArr.length
            this.infoData = newArr.slice(0,9)
          }
        }
      },
      waited() {
        if (!this.waited) {
          this.infos = []
          // this.infoData = this.tableData.slice(0,9)
          this.getPageData(this.currentPage)
        }
        if (this.waited) {
          this.currentPageNow = 1

          this.infos = this.AuditMPList
          this.infoCounts = this.AuditMPList.length
          this.infoData = this.AuditMPList.slice(0,9)
          this.$emit('changeMPAttachment',this.MPAttachments)

        }
      }
    },
    updated() {
      if(!this.value13){
        this.value13=[]
      }
    },
    mounted() {
      this.getPageData(1)
      // this.infos = this.tableData
      // this.infoData = this.infos.slice(0,9)
      var j = 0
      for (let i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i].CurrStateNo%10==1||this.tableData[i].CurrStateNo==54) {
          j++
        }
      }
      this.$emit('waitCountNum', j)

    },
    computed: {},

    methods: {
      deleteOne(data){
        var vm =this
        this.$confirm('此操作将删除该小程序, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          vm.deleteOneAjax(data)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      deleteOneAjax(data){
        var vm = this
        var CurUser = JSON.parse(localStorage.getItem("CurUser"));
        var formData = new FormData()
        // formData.append("MiniProgram", JSON.stringify(this.showSrManagerInfo1.Id))
        $.ajax({
          url: vm.User.baseUrl + "/api/miniprogram?isDelMPItem=true&MPID="+data.Id,
          type: 'POST',
          beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'BasicAuth ' + CurUser.TICKET)
          },
          xhrFields: {
            withCredentials: true
          },
          success: function (result) {
            console.log(result)
            vm.$message({
              type: 'success',
              message: '删除成功!'
            });
            var index
            for (let a = 0; a < vm.infos.length; a++) {
              if (vm.infos[a].Id == data.Id) {
                index = a
              }
            }
            vm.infoData.splice(index,1)
            vm.infos.splice(index,1)
          },
          error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log("err")
          },
          cache: false,
          dataType: 'json'
        });
      },
      openChange(data){
        this.$emit('openChangeInfo',data)
      },
      getPageData(pageNum){
        var CurUser = JSON.parse(localStorage.getItem("CurUser"));
        var vm =this
        vm.loading = true
        $.ajax({
          url: vm.User.baseUrl+"/api/miniprogram",
          data: {
            userId: CurUser.USID,
            pageIndex: pageNum, //第几页
            pageCount:9, //每页数目
          },
          type: 'Get',
          beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'BasicAuth ' + CurUser.TICKET)
          },
          xhrFields: {
            withCredentials: true
          },
          success: function (result) {
            if(result.StateCode){
              console.log(result)
              vm.loading = false
              vm.infoData = result.Data.MPList
              vm.infoCounts = result.Data.count
              vm.$emit('changeMPAttachment',result.Data.MPAttachments)
            }
            // vm.infoData = this.infos.slice(0,9)
            // vm.infoData = result.Data.MPList;
          },
          error: function (XMLHttpRequest, textStatus, errorThrown) {
            vm.loading = false
            console.log("err")
          },
          cache: false,
          dataType: 'json'
        });
      },
      clickPage(e){
        if(this.infos.length){
          this.infoData = this.infos.slice((e-1)*9,e*9)
        }else{
          this.getPageData(e)
        }
        this.currentPage = e
      },

      showHandling() {
        //待审批列表展示
        if (this.waited) {

        }
      },
      GMTToStr(time){
        let date = new Date(time)
        let Str=date.getFullYear() + '-' +
          (date.getMonth() + 1) + '-' +
          date.getDate() + ' ' +
          date.getHours() + ':' +
          date.getMinutes() + ':' +
          date.getSeconds()
        return Str
      },
      searchInfo() {
        var search = this.search
        var value8 = this.value8
        var bankName = this.bankName
        var value13 = this.value13
        var timeStart,timeEnd
        if(!search&&!value8&&!bankName&&!value13.length){
          return
        }
        if(this.value13.length){
           timeStart = this.GMTToStr(this.value13[0])
           timeEnd = this.GMTToStr(this.value13[1])
        }
        var CurUser = JSON.parse(localStorage.getItem("CurUser"));
        var vm =this
        vm.loading = true
        $.ajax({
          url: vm.User.baseUrl+"/api/miniprogram?isSearchMPItem=true",
          type: 'post',
          data: {
            PApplyFullName:search,
            CurrStateNo: value8, //小程序状态码
            PBranchName: bankName,
            StartDate:timeStart, //创建开始日期
            EndDate: timeEnd//创建结束日期
          },
          beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'BasicAuth ' + CurUser.TICKET)
          },
          xhrFields: {
            withCredentials: true
          },
          success: function (result) {
            console.log(result)
            vm.infos = result.Data
            vm.infoData = result.Data.slice(0,9)
            vm.infoCounts = result.Data.length
            vm.currentPageNow = 1
            vm.$emit('changeMPAttachment',vm.MPAttachments)
            vm.loading = false
          },
          error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log("err")
            vm.loading = false

          },
          cache: false,
          dataType: 'json'
        });
        // this.infos = arr
        // this.infoData = arr.slice(0,9)
        // this.infoCounts = arr.length
      },
      handleEdit(index, row) {
        this.$emit('openSrManager', row)
      },
      // format(val) {
      //   if (val.indexOf(this.search) !== -1 && this.search !== '') {
      //     return val.replace(this.search, '<font color="red">' + this.search + '</font>')
      //   } else {
      //     return val
      //   }
      // }
    }

  }
</script>

<style scoped>
  .searchArea {
    width: 88%;
    margin: 30px auto 0;
    text-align: left;
  }
.enterOne{
  cursor: pointer;
}
  .searchbox {
    display: inline-block;
    width: 400px;
  }
.searchbox3{
  width: 430px;
}
.searchbox4{
  margin-left: 48px;
}

  .searchh {
    position: absolute;
    left: 70px;
    top: 99px;
  }

  .stateok {
    color: green;
  }

  .inputsearch {
    display: inline-block;
    width: 300px;
    height: 44px;
    margin-bottom: 10px;
  }

  #inputsearch2 {
    display: inline-flex;
    align-items: center;
    height: 42px;
  }
  .mlist .searchs {
    width: 1054px;
    height: 94px;
    border: none;
  }

  .searchbox span {
    margin-right: 10px;
  }

  .mlist .searchs div {
    border: none;
    position: absolute;
    right: 20px;
  }

  .searchs span {
    position: relative;
    right: 20px;
    display: inline-block;
  }

  .statenotok {
    color: red;
  }

  .el-table::before {
    left: 0;
    bottom: 0;
    width: 100%;
    height: 0;
  }

  .stateing {
    color: blue;
  }

  .button1 {
    width: 100px;
    margin-left: 47px;
  }
  .el-date-editor--daterange.el-input, .el-date-editor--daterange.el-input__inner, .el-date-editor--timerange.el-input, .el-date-editor--timerange.el-input__inner {
    width: 300px;
  }
  .el-range-editor--small.el-input__inner {
    height: 40px;
    display: inline-flex;
    align-items: center;
  }
  .el-table span{
    cursor: pointer;
  }
  .el-table .el-button{
    margin-left: 0;
  }
</style>
<style>
  .box .el-range-editor--small .el-range-separator {
    line-height: 35px;
    font-size: 13px;
  }

  .el-table__body-wrapper {
    height: 500px;
    overflow: hidden;
  }

  #app .el-table thead {
    color: black;
    font-weight: 500;
  }

  .el-table::before {
    left: 0;
    bottom: 0;
    width: 100%;
    height: 0;
  }

  .box .el-icon-search {
    position: relative;
    bottom: 3px;
  }
</style>
