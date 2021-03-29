<script lang="ts">
import { h, ref, reactive } from 'vue'
export default {
    setup() {
        const readersNumber = ref(10)
        const book = reactive({ title: 'hhhhh' })
        return () => h('div', [readersNumber.value, book.title])
    },
}
</script>

<style></style>
