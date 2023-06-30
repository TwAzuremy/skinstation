export default {
    namespaced: true,
    state: {
        isLogin: false,
        user: {
            nickname: '天蔚 Azuremy',
            gender: '武装直升机',
            personalizedSignature: 'Cover is a one-page template for building simple and beautiful home pages. Download, edit the text, and add your own fullscreen background photo to make it your own.',
            avatarImgPath: 'img/avatar.jpg',
            country: '中国',
            email: '958559114@qq.com',
            province: '广东 - 佛山',
            birth: '2001 - 09 - 25'
        }
    },
    getters: {},
    mutations: {
        setIsLogin(state, value) {
            state.isLogin = value
        }
    },
    actions: {}
}