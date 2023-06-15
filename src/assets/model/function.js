/**
 * 防抖
 * @param func{Function}
 * @param wait{Number}
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
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    }

    function handleTouchEnd(e) {
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