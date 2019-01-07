<template>
  <div class="box">
    <el-table
      show-overflow-tooltip="true"
      :data="tables"
      style="width: 100%">
      <el-table-column
        label="名称"
        align="center"
        width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px" v-html="format(scope.row.PApplyFullName)"></span>
        </template>
      </el-table-column>
      <el-table-column
        label="商户名"
        align="center"
        width="180">
        <template slot-scope="scope">
          <span v-html="format(scope.row.PMerchantName)"></span>
        </template>
      </el-table-column>
      <el-table-column
        label="拓展分行"
        align="center"
        width="180">
        <template slot-scope="scope">
          <span v-html="format(scope.row.PBranchName)"></span>
        </template>
      </el-table-column>
      <el-table-column
        label="申请人"
        align="center"
        width="130">
        <template slot-scope="scope">
          <span v-html="format(scope.row.PUserName)"></span>
        </template>
      </el-table-column>
      <el-table-column
        label="商户类型"
        align="center"
        width="130">
        <template slot-scope="scope">
          <span v-html="format(scope.row.PMerchantType)"></span>
        </template>
      </el-table-column>
      <el-table-column
        label="状态"
        align="center"
        width="130">
        <template slot-scope="scope">
          <span style="margin-left: 10px" class="statement" v-html="format(scope.row.CurrStateName)"></span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleHelp(scope.$index, scope.row)">审核</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

  export default {
    props:{
      tableData:Array,
      MPAttachments:Object,
      itemOne:Number,
      fromRe:Boolean,
    },
    data () {
      return {

      }
    },
    watch:{

    },
    mounted(){
      if(!this.fromRe){
        this.successList(this.itemOne)
      }
    },
    computed: {
      tables () {
        var vm = this
        const search = this.search
        if (search) {
          return this.tableData.filter(dataNews => {
            return Object.keys(dataNews).some(key => {
              return String(dataNews[key]).toLowerCase().indexOf(search) > -1
            })
          })
        }
        return this.tableData
      },
    },

    methods: {
      successList(index){
        this.tableData.splice(index,1)
      },
      handleHelp (index, row,src) {
        var src= {}
        for(var key in this.MPAttachments){
          if(row.Id==key){
            src = this.MPAttachments[key].icon
          }
        }
        this.$emit('openHelpView',row,src)
      },
      format (val) {
        if (val.indexOf(this.search) !== -1 && this.search !== '') {
          return val.replace(this.search, '<font color="red">' + this.search + '</font>')
        } else {
          return val
        }
      }
    }

  }
</script>

<style scoped>
  .searchh{
    position: absolute;
    left: 50px;
    top: 143px;
  }
  .stateok{
    color: #259B24;
  }
  .inputsearch{
    width: 343px;
    height: 48px;
    display: flex;
    align-items: center;
    margin: 65px 0 30px 100px;
  }
  .mlist .searchs {
    width: 1054px;
    height: 94px;
    border: none;
  }

  .mlist .searchs div {
    border: none;
    position: absolute;
    right: 20px;
  }
  .searchs{
    position: absolute;
    right: 70px;
    top:130px;
  }
  .searchs span{
    position: relative;
    right: 20px;
    display: inline-block;
  }
  .statenotok{
    color: red;
  }
  .box .el-table__body-wrapper{
    height: 680px;
    overflow-y: auto;
  }
  .el-table::before {
    left: 0;
    bottom: 0;
    width: 100%;
    height: 0;
  }
</style>
<style>

</style>
