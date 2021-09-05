// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        target: cc.Node,
        canvas: cc.Node,
    },

    onLoad() {
        let self = this, parent = this.node.parent
        self.canvas.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            let touches = event.getTouches();
            if (touches.length < 2 || touches.length > 2) {
                return;
            }
            // 双点触控
            let touchOne = touches[0], touchTwo = touches[1];
            let deltaOne = touchOne.getDelta(), deltaTwo = touchTwo.getDelta();
            let touchPointOne = parent.convertToNodeSpaceAR(touchOne.getLocation());
            let touchPointTwo = parent.convertToNodeSpaceAR(touchTwo.getLocation());
            let distance = touchPointOne.sub(touchPointTwo);
            let delta = deltaOne.sub(deltaTwo);
            let scale = 1
            if (Math.abs(distance.x) > Math.abs(distance.y)) {
                scale = (distance.x + delta.x) / distance.x * self.target.scale
            } else {
                scale = (distance.y + delta.y) / distance.y * self.target.scale
            }
            self.target.scale = scale < 0.1 ? 0.1 : scale
        }, self.node)
    },

    start() {

    },

});
