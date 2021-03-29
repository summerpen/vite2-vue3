<template>
    <h1>{{ msg }}</h1>

    <button @click='count++'>count is: {{ count }}</button>
    <p>{{plusOne}}</p>
    <div>
        <button @click='book.title= (Math.random()*100).toFixed(0)'>&nbsp;更改书名</button>
        {{ book.title}}
    </div>
    <hr />
    <MyBook />
    <MyMarker />
    <button @click='updateLocation'>updateLocation</button>
    <hr />
    <div ref='root'>This is a root element</div>
    <!-- 组合式 API 模板引用在 v-for 内部使用时没有特殊处理。相反，请使用函数引用执行自定义处理： -->
    <div v-for='(item, i) in list' :ref='el => { if (el) divs[i] = el }' :key='i'>{{ item }}</div>
</template>

<script lang="ts">
import { ref, defineComponent, toRefs, reactive, provide, readonly, onMounted, onBeforeUpdate, computed, watchEffect, watch } from 'vue'
import MyBook from './MyBook.vue'
import MyMarker from './MyMarker.vue'
export default defineComponent({
    name: 'HelloWorld',
    props: {
        msg: {
            type: String,
            required: true,
        },
    },
    components: {
        MyBook,
        MyMarker,
    },
    setup(props, ctx) {
        console.log(
            new Map([
                [1, 2],
                [2, 4],
            ])
        )
        const location = ref('North Pole')
        const geolocation = reactive({
            longitude: 90,
            latitude: 135,
        })
        const updateLocation = () => {
            if (Math.random() < 0.5) {
                location.value = 'South Pole'
            } else {
                location.value = 'North Pole'
            }
        }
        provide('location', readonly(location))
        provide('geolocation', readonly(geolocation))
        provide('updateLocation', updateLocation)

        console.log('set up', props, ctx.attrs)
        const { msg } = toRefs(props)
        console.log('msg', msg.value)
        const count = ref(0)
        const plusOne = computed({
            get: () => count.value + 1,
            set: (val) => {},
        })

        // 直接侦听ref
        watch(count, (count, prevCount) => {
            console.log('watch count', count, prevCount)
        })

        // 侦听reactive
        const book = reactive({ title: 'Vue 3 Guide' })
        watch(
            () => book.title,
            (newV, oldV) => {
                console.log('侦听reactive book.title', newV, oldV)
            }
        )
        // 侦听多个数据源
        watch([count, () => book.title], ([newCount, newTitle], [oldCount, odlTitle]) => {
            console.log('侦听多个数据源', ` newCount: ${newCount}, newTitle: ${newTitle}, oldCount: ${oldCount}, odlTitle:${odlTitle}`)
        })
        watchEffect(() => {
            console.log('watchEffect', count.value, book.title)
        })
        // 模板引用
        const root = ref(null)
        onMounted(() => {
            console.log('onMounted')
            // DOM元素将在初始渲染后分配给ref
            console.log(root.value) // <div>这是根元素</div>
        })

        const list = reactive([1, 2, 3])
        const divs = ref([])
        // 确保在每次更新之前重置ref
        onBeforeUpdate(() => {
            divs.value = []
        })

        return { count, plusOne, book, updateLocation, root, list, divs }
    },
    /*  mounted() {
        console.log('mounted')
    }, */
})
</script>

<style scoped>
a {
    color: #42b983;
}

label {
    margin: 0 0.5em;
    font-weight: bold;
}

code {
    background-color: #eee;
    padding: 2px 4px;
    border-radius: 4px;
    color: #304455;
}
</style>
