<template>
   <div>
       <el-tooltip v-bind:$attrs="attrs" v-if="type === 'tooltip'">
           <div slot="content">{{content}}</div>
           {{ value }}
       </el-tooltip>
   </div>
</template>

<script>

export default  {
    name: "FormComponent",
    props: {
       type: {
           required: true
       },
       attrs: {
           type: Object,
           default: () => {}
       },
        content: {
           default: ''
        }
    }
}
</script>
<style lang="scss" scoped>

</style>

