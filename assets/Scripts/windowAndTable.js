// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        window: cc.Node,
        star: cc.Node,
        article7L: cc.Node,
        tools: cc.Node,
        gongJuRen: {
            default: null,
            type: cc.Node,
        },

        audioWindow1: cc.AudioClip,
        audioWindow2: cc.AudioClip,
        audio_bird: cc.AudioClip,
        audio_ding: cc.AudioClip,
    },

    onLoad () {
        this.windowAnim = true;
    },


    onClick() {
        this.gongJuRen.getComponent("GameManager").clearCanvasR();
        if(this.windowAnim){
            let tools = this.tools.getComponent("Tools");
            let anim = this.window.getComponent(cc.Animation);
            if(tools.hldWood){
                anim.play('window_open');
                anim.on('finished', this.showStar, this);
                tools.wood.destroy();
                tools.hldWood = false;
                this.windowAnim = false;
                cc.audioEngine.play(this.audioWindow2, false, 0.8);
                cc.audioEngine.play(this.audio_bird, false, 0.8);
            } else {
                anim.play('window_locked');
                cc.audioEngine.play(this.audioWindow1, false, 0.8);
            }
        }
    },

    showStar() {
        this.star.active = true;
    },

    getStar() {
        if(this.star.active) {
            cc.audioEngine.play(this.audio_ding,false,1);  
            let tools = this.tools.getComponent("Tools");
            tools.star4.active = true;
            this.star.destroy();
        }
    },

    tableOnClick() {
        this.gongJuRen.getComponent("GameManager").clearCanvasR();
        this.article7L.active = true;
    },

    start () {

    },

    // update (dt) {},
});
