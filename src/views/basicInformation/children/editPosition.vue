<template>

  <div>
    {{ruleForm.name}}
  </div>

</template>

<script>

  export default {
    props: [ 'PositionRow' ],
    name: 'editPosition',
    data(){
      return{
        msg: '这是编辑页面',
        ruleForm:{
          positionID: this.PositionRow.positionID,
          name: this.PositionRow.name,
          code: this.PositionRow.code
        }
      }
    },




    watch: {
      PositionRow: function (value) {
        this.ruleForm.positionID = value.positionID
        this.ruleForm.name = value.name
        this.ruleForm.code = value.code
      }
    }
  }
</script>

<style scoped>

</style>
