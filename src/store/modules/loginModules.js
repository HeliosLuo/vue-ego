export default {
    namespaced: true,
    state: {
        userinfo: {
            token: '',
            user: ''
        }

    },
    mutations: {
        setStateLogin(state, params) {
            state.userinfo.token = params.token
            state.userinfo.user = params.user
        },
        emptyStateLogin(state){
            state.userinfo={
                token: '',
                user: ''
            }
        }
    }
}


