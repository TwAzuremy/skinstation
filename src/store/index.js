import {createStore} from 'vuex'
import storeSidebar from "@/store/storeSidebar";
import storeUser from "@/store/storeUser";
import storeLanguage from "@/store/storeLanguage";

export default createStore({
    modules: {
        storeSidebar,
        storeUser,
        storeLanguage
    }
})
