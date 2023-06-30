import {createStore} from 'vuex'
import storeSidebar from "@/store/storeSidebar";
import storeUser from "@/store/storeUser";
import storeLanguage from "@/store/storeLanguage";
import storeSkin from "@/store/storeSkin";
import storeFavSkin from "@/store/storeFavSkin";

export default createStore({
    modules: {
        storeSidebar,
        storeUser,
        storeLanguage,
        storeSkin,
        storeFavSkin
    }
})
