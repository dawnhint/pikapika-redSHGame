// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        photoL: cc.Node,
        article2: cc.Node,

        shelf2: cc.Node,
        shelf2_pic: cc.SpriteFrame,
        secret: cc.Node,
        booksGame: cc.Node,
        books: {
            default: [],
            type: cc.Node,
        },
        booksContainer: cc.Node,

        key: cc.Node,
        article1: cc.Node,
        article1L: cc.Node,

        shelf3_open: cc.Node,
        wood: cc.Node,

        tools: cc.Node,
        gongJuRen: {
            default: null,
            type: cc.Node,
        },

        audio_ding: cc.AudioClip,
        audio_openSecret: cc.AudioClip,
        audio_wood: cc.AudioClip,
        audio_book: cc.AudioClip,
        audio_knock: cc.AudioClip,

        collection: cc.Node,
        info: cc.Label,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.secret.active = false;
        this.gameOver = false;
        this.lockPhoto = true;
    },


    showBooks() {
        this.gongJuRen.getComponent("GameManager").clearCanvasR();
        this.booksGame.active = true;
        if (!this.gameOver) {
            this.bookGameOn();
        } else {
            this.bookGameOff();
        }
    },
    openSecret() {
        this.booksGame.active = false;
        var pic = this.shelf2.getComponent(cc.Sprite)
        pic.spriteFrame = this.shelf2_pic;
        this.secret.active = true;
    },

    showPhoto() {
        this.gongJuRen.getComponent("GameManager").clearCanvasR();
        this.photoL.active = true;
        if (this.lockPhoto) {
            let cltn = this.collection.getComponent("collection");
            cltn.unlockFlag(5);
            this.info.string = "解锁相片：外滩的和平女神像";
            var anim = this.info.getComponent(cc.Animation);
            anim.play('info');
            this.lockPhoto = false;
        }
    },
    showArticle2() {
        this.article2.active = true;
    },

    showArticle1() {
        this.gongJuRen.getComponent("GameManager").clearCanvasR();
        this.article1L.active = true;
    },

    getKey: function () {
        cc.audioEngine.play(this.audio_ding, false, 0.8);
        let tools = this.tools.getComponent("Tools");
        tools.key.active = true;
        this.key.destroy();
    },

    open: function () {
        this.gongJuRen.getComponent("GameManager").clearCanvasR();
        this.shelf3_open.active = true;
        cc.audioEngine.play(this.audio_knock, false, 1);
    },
    close: function () {
        this.gongJuRen.getComponent("GameManager").clearCanvasR();
        this.shelf3_open.active = false;
        cc.audioEngine.play(this.audio_knock, false, 1);
    },
    getWood: function () {
        let tools = this.tools.getComponent("Tools");
        tools.wood.active = true;
        this.wood.destroy();
        cc.audioEngine.play(this.audio_wood, false, 0.7);
    },

    bookGameOn() {
        // 更新一遍书架
        let layout = this.booksContainer.getComponent(cc.Layout);
        layout.enabled = true;
        for (let i = 0; i < 7; i++) {
            this.books[i].setSiblingIndex(i);
        }
        // 书本容器区间计算的阈值
        const threshold = 10
        // 书本容器 [最左侧书本坐标x + 阈值, 最右侧书本坐标x + 书本本身宽度 + 阈值]
        const minBoundOriginX = this.books[0].x + threshold
        const maxBoundOriginX = this.books[this.books.length - 1].x + this.books[this.books.length - 1].width + threshold
        for (let k = 0; k < 7; k++) {
            ((k) => {
                this.books[k].on('touchstart', function (event) {
                    this.indexOrigin = this.books[k].getSiblingIndex();
                    this.xOrigin = this.books[k].x;
                }, this);

                this.books[k].on('touchmove', function (event) {
                    let layout = this.booksContainer.getComponent(cc.Layout);
                    layout.enabled = false;
                    let delta = event.getDelta();
                    // 移动后的 X 坐标
                    const movedX = this.books[k].x + delta.x;
                    // 如果移动的书本超出了书本容器的最大和最小坐标，放弃移动操作
                    const isBeyondTheBound = movedX <= minBoundOriginX || movedX >= maxBoundOriginX
                    if (isBeyondTheBound) {
                        return;
                    }
                    // 没超出边界
                    this.books[k].x = movedX
                    this.books[k].setSiblingIndex(8);   //让书本位于最前方
                }, this);

                this.books[k].on('touchend', function (event) {
                    cc.audioEngine.play(this.audio_book, false, 0.4);
                    let com = ((this.books[k].x - this.xOrigin) > 0);    //判断书本位移方向
                    this.books[k].setSiblingIndex(this.indexOrigin);
                    let indexNew = this.books[k].getSiblingIndex();
                    // books是当前排好的书本顺序;this.books是一开始的标号
                    let books = this.booksContainer.children;
                    if (com) {
                        // 从左向右作比较，被比较书目的索引号为i
                        for (let i = 0; i < 7; i++) {
                            let det = this.books[k].x - books[i].x + 50;
                            if (det >= 0) {
                                indexNew = i;
                            }
                        }
                    } else {
                        // 从右向左作比较，被比较书目的索引号为6-i
                        for (let i = 0; i < 7; i++) {
                            let det = books[6 - i].x - this.books[k].x + 50;
                            if (det >= 0) {
                                indexNew = 6 - i;
                            }
                        }
                    }
                    books[indexNew].setSiblingIndex(this.indexOrigin);
                    this.books[k].setSiblingIndex(indexNew);
                    let layout = this.booksContainer.getComponent(cc.Layout);
                    layout.enabled = true;
                    // check Finished
                    let cAnswer = [2, 6, 3, 1, 5, 0, 4];
                    let answer = [];
                    for (let i = 0; i < 7; i++) {
                        let index = this.books[i].getSiblingIndex();
                        answer.push(index);
                    }
                    if (answer.join() == cAnswer.join()) {
                        this.gameOver = true;
                        cc.audioEngine.play(this.audio_openSecret, false, 0.5);
                        this.scheduleOnce(function () {
                            this.openSecret();
                        }, 0.5);
                    }
                }, this);
            })(k)
        }
    },
    bookGameOff() {
        for (let k = 0; k < 7; k++) {
            this.books[k].targetOff(this);;
        }
    },
    start() {

    },

    // update (dt) {},
});
