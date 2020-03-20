var app = new Vue({
    el: '#app',
    data: {
        message: 'New App' + new Date().toLocaleString(),
        input: 'some input',
        items: [
            {name: 'weee'},
            {name: 'weee2'},
            {name: 'weee3'},
            {name: 'weee4'}
        ]
    },
    methods: {
        clicked: function() {
            console.log('weeeeeee')
            this.items.push({name: this.input});
        }
    }
});
