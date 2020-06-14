<template>
    <div>
        <div class="frame">
            <div class="toolbar">
                <slot name="toolbarT" :events="events"></slot>
            </div>
            <div class="pagination">
                <el-pagination
                    background
                    :current-page.sync="currentPage"
                    :page-size.sync="size"
                    :page-sizes="limitGroup"
                    :total="total"
                    layout="total, sizes, prev, pager, next, jumper"
                    @size-change="onSize"
                    @current-change="onCurrent"
                ></el-pagination>
            </div>
        </div>
        <el-table v-bind="$attrs" v-on="$listeners">
            <el-table-column
                v-if="checked"
                v-bind="checked.$attrs"
            >
                <template v-slot="scope">
                    <el-checkbox name="type" @change="checkSingle(scope)" :value="scope.row.checked"></el-checkbox>
                </template>
                <template v-slot:header>
                    <el-checkbox name="type" @change="checkAll" :value="isChecked"></el-checkbox>
                </template>
            </el-table-column>
            <el-table-column
                v-for="{id, template, $attrs, header} in column"
                :key="id"
                v-bind="$attrs"
            >
                <template v-slot="scope" v-if="template">
                    <CreateDom  v-on="$listeners" :template="template" :data="scope" />
                </template>
                <template v-slot:header v-if="header">
                    <CreateDom  v-on="$listeners" :template="header"/>
                </template>
            </el-table-column>
        </el-table>
        <div class="frame">
            <div class="toolbar">
                <slot name="toolbarB" :events="events"></slot>
            </div>
            <div class="pagination">
                <el-pagination
                    background
                    :current-page.sync="currentPage"
                    :page-size.sync="size"
                    :page-sizes="limitGroup"
                    :total="total"
                    layout="total, sizes, prev, pager, next, jumper"
                    @size-change="onSize"
                    @current-change="onCurrent"
                ></el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import CreateDom from './CreateDom'
    export default {
        name: "NetTable",
        props: {
            column: {
                type: Array,
                default: () => []
            },
            page: {
                type: Number,
                default: 1
            },
            limit: {
                type: Number,
                default: 10
            },
            limitGroup: {
                type: Array,
                default: () => [10, 20, 30, 50]
            },
            total: {
                required: true,
                type: Number
            },
            checked: {
                type: Object,
                default: () => {}
            }
        },
        data() {
            return {
                isChecked: ''
            }
        },
        computed: {
            size: {
                get() {
                    return this.limit
                },
                set(val) {
                    this.$emit('update:limit', val)
                }
            },
            currentPage: {
                get() {
                    return this.page
                },
                set(val) {
                    this.$emit('update:page', val)
                }
            }
        },
        methods: {
            onSize(val) {
                this.size = val
            },
            onCurrent(val) {
                this.currentPage = val
            },
            checkAll(value) {
                this.$attrs.data.forEach(item => {
                    item.checked = this.isChecked = value
                })
            },
            checkSingle({row}) {
                row.checked = !row.checked
                if (!row.checked) {
                    this.isChecked = false
                } else {
                    this.isChecked = this.$attrs.data.every(item => item.checked)
                }
            },
            events(name) {
                this.$emit(name, [...this.$attrs.data])
            }
        },
        components: {
            CreateDom
        }
    }
</script>

<style scoped>
    .frame {
        display: flex;
        justify-content: space-between;
        padding: 15px 0;
    }
</style>
