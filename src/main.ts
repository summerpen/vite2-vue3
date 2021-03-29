import { createApp } from 'vue'
import App from './App.vue'
createApp(App).mount('#app')
/* window.addEventListener('message', () => {
    createApp(App).mount('#app')
})

console.time('start')
setTimeout(() => {
    console.timeEnd('start')
    const myEvent = new CustomEvent('message', {
        detail: {
            title: 'This is message!',
        },
    })
    window.addEventListener('message', function (event) {
        // console.log('message success')
    })
    // 随后在对应的元素上触发该事件
    window.dispatchEvent(myEvent)
}, 0)
 */
