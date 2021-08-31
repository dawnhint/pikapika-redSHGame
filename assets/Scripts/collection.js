// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.director.preloadScene("main", function () {
            console.log("Next scene preloaded");
        });
    },

    btnBack: function () {
        cc.director.loadScene("main");
        // cc.director.loadScene("main");
        // cc.director.runScene("main");
    },

    start () {

    },

    // update (dt) {},
});
