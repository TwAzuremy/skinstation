/**
 * 防抖
 * @param func{Function}
 * @param wait{Number} ms
 * @returns {(function(...[*]): void)|*}
 */
export function debounce(func, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

/**
 * 添加滑动事件
 * @param direction{String} 方向 left / right / top / bottom
 * @param distance{Number} 最小滑动距离, 当滑动大于该值则触发 callback
 * @param callback{Function}
 * @returns {{cleanup: cleanup}} cleanup 回收事件
 */
export function addSwipeListener(direction, distance, callback) {
    const element = document.documentElement;
    let startX, startY;

    function handleTouchStart(e) {
        if (notSwipeObject(e)) return

        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    }

    function handleTouchEnd(e) {
        if (notSwipeObject(e)) return

        const endX = e.changedTouches[0].clientX;
        const endY = e.changedTouches[0].clientY;
        const dx = endX - startX;
        const dy = endY - startY;
        const absDx = Math.abs(dx);
        const absDy = Math.abs(dy);

        if (absDx > distance || absDy > distance) {
            switch (direction) {
                case 'left':
                    if (dx < 0 && absDx > absDy) {
                        callback();
                    }
                    break;
                case 'right':
                    if (dx > 0 && absDx > absDy) {
                        callback();
                    }
                    break;
                case 'up':
                    if (dy < 0 && absDy > absDx) {
                        callback();
                    }
                    break;
                case 'down':
                    if (dy > 0 && absDy > absDx) {
                        callback();
                    }
                    break;
                default:
                    throw new Error('Invalid direction.');
            }
        }
    }

    function notSwipeObject(e) {
        return e.target.tagName === 'INPUT' && e.target.type === 'range'
    }

    element.addEventListener('touchstart', handleTouchStart);
    element.addEventListener('touchend', handleTouchEnd);

    const cleanup = () => {
        element.removeEventListener('touchstart', handleTouchStart);
        element.removeEventListener('touchend', handleTouchEnd);
    };

    return {cleanup};
}

/**
 * 获取 css root 变量
 * @param property 变量名称
 * @returns {string}
 */
export function getCSSRootValue(property) {
    return getComputedStyle(document.querySelector(':root')).getPropertyValue(property)
}

/**
 * 随机生成一串字符串
 * @param length 生成的位数
 * @returns {string}
 */
export function generateRandomString(length) {
    let result = "";
    const characters =
        "0123456789abcdefghijklmnopqrstuvwxyz";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

/**
 * 获取搜索建议
 * @param searchInput
 * @param stringArray
 * @returns {*}
 */
export function getSearchSuggestions(searchInput, stringArray) {
    if (searchInput === '' || stringArray.length === 0) {
        return []
    }

    // 使用 filter 方法过滤筛选结果
    return stringArray.filter((item) => {
        return item.includes(searchInput); // 判断每个项是否包含搜索字符串
    })
}

/**
 * 在容器展开时隐藏滚动条 (美观)
 * @param refDom
 * @param cssRootValue
 * @param func
 */
export function eliminateScroll(refDom, cssRootValue, func) {
    refDom.value.classList.add('noScroll')

    func()

    const transitionTime = Math.floor(parseFloat(getCSSRootValue(cssRootValue)) * 1000)

    setTimeout(() => {
        refDom.value?.classList.remove('noScroll')
    }, transitionTime)
}

/**
 * 判断是否为偶数
 * @param numb
 * @returns {boolean}
 */
export function isEven(numb) {
    return numb % 2 === 0
}
