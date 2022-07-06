import { createStore } from 'vuex';

export default createStore({
    // state : { // 공통변수
    //     logged : false  // 로그인의 상태를 저장
    // },

    state() {
        let tmp = false;
        if(sessionStorage.getItem("TOKEN") !== null){
            tmp = true;
        }
        return {
            logged : tmp
        }
    },

    getters : { //변수의 값을 가지고 감
        getLogged(state) {
            return state.logged;
        }
    },

    mutations : { // 변수 값을 변경함
        setLogged(state, value) {
            state.logged = value;
        }
    },

    actions : { // 비동기 처리

    }
});
