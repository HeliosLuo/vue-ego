<template>
  <div class="advert">
    <AdvertTree @getTreeData='getTreeData'/>
    <AdvertContent :treeData='treeData' />
  </div>
</template>

<script>
import AdvertContent from "./AdvertContent.vue";
import AdvertTree from "./AdvertTree.vue";
export default {
  components: {
    AdvertContent,
    AdvertTree,
  },
  data(){
    return{
       treeData:{name:'按钮'}
    }
  },
  methods:{
    getTreeData(val){
      // console.log(val);
      this.treeData=val
    }
  }
};
</script>

<style lang='scss' scoped>
.advert{
  margin: 20px;
}
  .advert-left{
    width: 300px;
    float: left;
  }
  .advert-content{
    float: left;
  }
</style>