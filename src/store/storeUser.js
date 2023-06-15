export default {
    namespaced: true,
    state: {
        isLogin: false,
        user: {
            avatarImgPath: 'img/avatar.jpg'
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