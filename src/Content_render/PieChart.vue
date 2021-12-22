<script>
import { Pie } from 'vue-chartjs'

export default {
  extends: Pie ,
  props: {
    piedata: {
      type: Object,
      default: null
    },
    options: {
      type: Object,
      default: null
    }
  },
  mounted () {
    this.renderChart(this.piedata, this.options)
  }
}
</script>
