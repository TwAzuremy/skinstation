const Prototype = {
    $event() {
        Element.prototype.event_on = function (event, handler) {
            this.addEventListener(event, handler)
        }

        Element.prototype.event_off = function (event, handler) {
            this.removeEventListener(event, handler)
        }
    }
}

export default Prototype