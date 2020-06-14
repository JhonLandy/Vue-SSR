<script>
    import Vue from  'vue'
    export default {
        name: "CreateDom",
        computed: {
            scope() {
                return this.$attrs.data
            }
        },
        methods: {
            events(name, data) {
                this.$emit(name, data)
            }
        },
        render() {
            let {template, data, instance} = this.$attrs
            if (typeof template === 'function') {
                template = template(data)
            }
            if (!template) {
                console.error("CreateDom组件找不到模版内容template，请检查！")
                return
            }
            return Vue.compile(template).render.call(instance || this)
        }
    }
</script>
