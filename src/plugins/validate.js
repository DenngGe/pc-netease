// vee-validate插件：表单验证
import Vue from "vue";
import VeeValidate from "vee-validate";
import zh_CN from "vee-validate/dist/locale/zh_CN";
Vue.use(VeeValidate);

//表单验证
VeeValidate.Validator.localize("zh_CN", {
  messages: {
    ...zh_CN.messages,
  },
  attributes: {
    phone: "手机号",
  },
});

//自定义校验规则
VeeValidate.Validator.extend("tongyi", {
  validate: (value) => {
    return value;
  },
  getMessage: (field) => field + "必须同意",
});
