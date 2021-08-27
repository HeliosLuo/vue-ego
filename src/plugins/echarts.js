import echarts from 'echarts'

const install = function (Vue) {
    // Vue.prototype.$echarts=echarts    //全部挂载
    //单个挂载  地图
    Object.defineProperties(Vue.prototype, {
        $echarts: {
            get() {
                return {
                    line(id) {
                        var myChart = echarts.init(document.getElementById(id));

                        // 指定图表的配置项和数据
                        var option = {
                            title: {
                                text: 'ECharts 入门示例'
                            },
                            tooltip: {},
                            legend: {
                                data: ['销量']
                            },
                            xAxis: {
                                data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
                            },
                            yAxis: {},
                            series: [{
                                name: '销量',
                                type: 'bar',
                                data: [5, 20, 36, 10, 10, 20]
                            }]
                        };

                        // 使用刚指定的配置项和数据显示图表。
                        myChart.setOption(option);
                    },
                    bintu(id) {
                        var chartDom = document.getElementById(id);
                        var myChart = echarts.init(chartDom);
                        var option;

                        option = {
                            tooltip: {
                                trigger: 'item'
                            },
                            legend: {
                                top: '5%',
                                left: 'center'
                            },
                            series: [
                                {
                                    name: '访问来源',
                                    type: 'pie',
                                    radius: ['40%', '70%'],
                                    avoidLabelOverlap: false,
                                    label: {
                                        show: false,
                                        position: 'center'
                                    },
                                    emphasis: {
                                        label: {
                                            show: true,
                                            fontSize: '40',
                                            fontWeight: 'bold'
                                        }
                                    },
                                    labelLine: {
                                        show: false
                                    },
                                    data: [
                                        { value: 1048, name: '搜索引擎' },
                                        { value: 735, name: '直接访问' },
                                        { value: 580, name: '邮件营销' },
                                        { value: 484, name: '联盟广告' },
                                        { value: 300, name: '视频广告' }
                                    ]
                                }
                            ]
                        };

                        option && myChart.setOption(option);
                    }
                }
            }
        }
    })
}

export default install