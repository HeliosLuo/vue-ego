<template>
  <div>
    <el-dialog title="查看合同" :visible.sync="dialogVisible" width="70%">
      {{ currentPage }} / {{ pageCount }}
      <pdf :src="src" :page="currentPage" @num-pages="pageCount = $event" ref="myPdfComponent"></pdf>

      <!-- <pdf
			v-for="i in numPages"
			:key="i"
			:src="src"
			:page="i"
			style="display: inline-block; width: 25%"
		></pdf> -->
        <MyPaging :pageSize='currentPage' :total='pageCount' @changeCurrent='changeCurrent'/>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button @click="dialogVisible = false">确定</el-button>
         <el-button @click="printPdf">打印合同</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import MyPaging from '../../components/MyPaging.vue'
import pdf from "vue-pdf";
var loadingTask = pdf.createLoadingTask("./sxt.pdf");
export default {
  components: {
    pdf,
    MyPaging
  },
  data() {
    return {
      dialogVisible: false,
      src: loadingTask,
      currentPage: 1,
      pageCount: 0,
      numPages: undefined,
    };
  },
  methods:{
      changeCurrent(val){
          this.currentPage=val
      },
      printPdf(){
          this.$refs.myPdfComponent.print()
      }
  },
  mounted() {
    this.src.promise.then((pdf) => {
      this.pageCount = pdf.numPages;
    });
  },
};
</script>

<style>
</style>