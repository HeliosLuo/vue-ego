import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Element from 'element-ui'
import enLocale1 from './enLocale'
import zhLocale1 from './zhLocale'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
Vue.use(VueI18n)
// 准备翻译的语言环境信息
const messages = {
    en: { //英语
        ...enLocale1,
        ...enLocale
    },
    zh: { //汉语
      ...zhLocale1,
      ...zhLocale
    }
}
// 通过选项创建 VueI18n 实例
const i18n = new VueI18n({
    locale: 'en', // 设置地区
    messages, // 设置地区信息
})
//配置element支持vuei18n 6.X版本
// Vue.use(Element, {
//     i18n: (key, value) => i18n.t(key, value)
//   })
//配置element支持vuei18n 8.x版本
Element.i18n((key, value) => i18n.t(key, value))
export default i18n
