Vue.component('titlebar', {
    template: '<div class="titlebar"><img src="assets/logo.svg"></div>'
})

Vue.component('message', {
    template: '<div :class="sender"><img src="assets/circle.svg"><div><h4>{{time}}</h4><p>{{message}}</p></div></div>',
    data: function () {
        return {
            time: '11:55 AM',
            message: 'You messaged od110510389196784000 the ordered product didnt deliver to me and the delivery boy…',
            sender: 'customer'
        }
    }
})

var app = new Vue({
    el: '#root'
})
