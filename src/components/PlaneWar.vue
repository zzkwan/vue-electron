<!--
 * @Author: 卓智锴
 * @Date: 2021-12-16 16:46:29
 * @LastEditTime: 2021-12-26 15:28:29
 * @LastEditors: Please set LastEditors
 * @FilePath: \vue-electron\src\components\PlaneWar.vue
 * 衣带渐宽终不悔，bug寻得人憔悴
-->
<template>
    <div>
        <canvas id='canvas'>
            您的浏览器不支持canvas绘图！
        </canvas>
        <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="30%">
            <div>你的小宝贝没了！！！！</div>
            <div>最终成绩：{{ gameScore }}</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="upload">上传分数</el-button>
                <el-button @click="closeGame">更换游戏</el-button>
                <el-button type="primary" @click="start">重新开始</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    props: {
        chosePlane: {
            required: true,
            type: Number
        },
        planeLevel: { // 飞机难度
            required: true,
            type: Number
        }
    },
    data() {
        return {
            dialogVisible: false,
            width: 0,// 画布宽度
            height: 0,// 画布高度
            canvas: {},// 画布
            ctx: {},// 画布2d
            // 游戏状态
            PHASE_DOWNLOAD: 1,
            PHASE_READY: 2,
            PHASE_LOADING: 3,
            PHASE_PLAY: 4,
            PHASE_PAUSE: 5,
            PHASE_GAMEOVER: 6,
            // 游戏当前状态
            curPhase: this.PHASE_DOWNLOAD,
            gameScore: 0,
            // 所有图片
            imgName: ['background.png', 'game_pause_nor.png', 'm1.png', 'start.png', 
                // 敌机1
                ['enemy1.png', 'enemy1_down1.png', 'enemy1_down2.png', 'enemy1_down3.png', 'enemy1_down4.png'],
                // 敌机2
                ['enemy2.png', 'enemy2_down1.png', 'enemy2_down2.png', 'enemy2_down3.png', 'enemy2_down4.png'],
                // 敌机3
                ['enemy3_n1.png', 'enemy3_n2.png', 'enemy3_hit.png', 'enemy3_down1.png', 'enemy3_down2.png', 'enemy3_down3.png', 'enemy3_down4.png', 'enemy3_down5.png', 'enemy3_down6.png', ],
                // 游戏loading图
                ['game_loading1.png', 'game_loading2.png', 'game_loading3.png', 'game_loading4.png'],
                // 玩家飞机图
                ['hero1.png', 'p1.png', 'p2.png', 'hero2.png', 'hero_blowup_n1.png', 'hero_blowup_n2.png', 'hero_blowup_n3.png', 'hero_blowup_n4.png'],
                // 增加子弹数或增加攻速
                'm.png'
            ],
            // 存储不同类型图片
            bg: null,
            pause: null,
            m: null,
            startImg: null,
            up: null,
            enemy1: [],
            enemy2: [],
            enemy3: [],
            gameLoad: [],
            heroImg: [],
            // 加载图片进度
            progress: 1,
            position: 0,// 加载小图标的位置
            // 函数中的全局属性
            img: {},
            text: '',
            tw: 0,
            x: 0,// hero坐标
            y: 0,
            index: 0,// 
            count: 0,// 控制hero图片切换的频率
            hCount: 0,// 控制子弹发射
            hC: 1,// 控制子弹发射的频率
            eCount: 0,// 控制敌机发射
            eC: 1,// 控制敌机出现频率
            upCount: 0,// 控制奖励出现
            uC: 1, // 控制奖励出现的频率
            tims: 0,// 计算整体经过的时间
            controller: 0,// 控制小中大型飞机出现几率
            subWidth: 0,// 控制战机碰到敌机的大小
            isUpload: true,// 是否允许上传
            n: 0,
            life: 0,
            d: 0,
            px: 0,
            py: 0,
            pBg: {},
            load: {},
            // 战机
            level: 0,
            hero: {},
            offsetX: 0,
            offsetY: 0,
            w: 0,
            h: 0,
            nx: 0,
            ny: 0,
            // 敌机
            hullet: [],
            mx: 0,
            my: 0,
            removable: true,
            ups: [], // 画布中显示的所有奖励
            liveEnemy: [],// 用于存储画布上的所有敌机
            enemy: {},// 保存敌机图片的数组
            speed: 0,// 敌机速度
            lifes: 2,// 敌机生命
            die: false,// 敌机是否死亡

        }
    },
    methods: {
        // 鼠标移动
        move(e) {
            if (this.curPhase == this.PHASE_PLAY || this.curPhase == this.PHASE_PAUSE) {
                this.curPhase = this.PHASE_PLAY;
                this.offsetX = e.offsetX || e.touches[0].pageX;
                this.offsetY = e.offsetY || e.touches[0].pageY;
                this.w = this.heroImg[0].width
                this.h = this.heroImg[0].height
                this.nx = this.offsetX - this.w / 2,
                this.ny = this.offsetY - this.h / 2;
                this.nx < 20 - this.w / 2 ? this.nx = 20 - this.w / 2 : this.nx > (this.canvas.width - this.w / 2 - 20) ? this.nx = (this.canvas.width - this.w / 2 - 20) : 0;
                this.ny < 0 ? this.ny = 0 : this.ny > (this.canvas.height - this.h / 2) ? this.y = (this.canvas.height - this.h / 2) : 0;
                this.x = this.nx;
                this.y = this.ny;
                this.count = 2;
            }
        },
        // 初始化战机
        drawHero() {
            this.ctx.drawImage(this.heroImg[this.chosePlane], this.x, this.y);
            this.ctx.fillText('SCORE:' + this.gameScore, 10, 30);
            this.hCount += this.hC;
            if (this.level === 0 && this.hCount / (this.planeLevel === 0 ? 5 : this.planeLevel === 1 ? 6 : this.planeLevel === 2 ? 7 : this.planeLevel === 3 ? 8 : 10) >= 1) { // 同时生成一颗子弹
                this.n == 32 && (this.n = 0); 
                this.hullet.push(this.createHullet(this.n))
                this.n = 32
                this.hCount = 0;
            }
            if (this.level === 1 && this.hCount / (this.planeLevel === 0 ? 5 : this.planeLevel === 1 ? 6 : this.planeLevel === 2 ? 7 : this.planeLevel === 3 ? 8 : 10) >= 1) { // 同时生成两颗子弹
                this.n == 32 && (this.n = -32); 
                this.hullet.push(this.createHullet(this.n))
                this.n == -32 && (this.n = 32);
                this.hullet.push(this.createHullet(this.n))
                this.n == 32
                this.hCount = 0;
            }
            if (this.level === 2 && this.hCount / (this.planeLevel === 0 ? 5 : this.planeLevel === 1 ? 6 : this.planeLevel === 2 ? 7 : this.planeLevel === 3 ? 8 : 10) >= 1) { // 同时生成三颗子弹
                this.n == 32 && (this.n = 0); 
                this.hullet.push(this.createHullet(this.n));
                this.n == 0 && (this.n = -32);
                this.hullet.push(this.createHullet(this.n));
                this.n == -32 && (this.n = 32);
                this.hullet.push(this.createHullet(this.n));
                this.hCount = 0;
            }
            this.eCount += this.eC
            if (this.eCount / (this.planeLevel === 0 ? 12 : this.planeLevel === 1 ? 10 : this.planeLevel === 2 ? 8 : this.planeLevel === 3 ? 7 : 6) >= 1) { //生成敌机
                this.liveEnemy.push(this.createEnemy());
                this.eCount = 0;
            }
            this.upCount += this.uC
            if (this.upCount / 100 >= 1) {
                this.ups.push(this.createUp())
                this.upCount = 0
            }
        },
        // 创建奖励
        createUp() {
            let u = new Object()
            u.x = parseInt(Math.random() * (this.canvas.width - this.up.width))
            u.y = -this.up.height
            u.speed = 3
            u.removable = false
            u.width = this.up.width
            u.height = this.up.height
            u.draw = (u, that) => {
                this.ctx.drawImage(this.up, u.x, u.y);
                u.y += u.speed; // 移动奖励
                u.hit(u, that); //判断是否击中敌机
                if (u.y > this.canvas.height) { // 若敌机飞出画布，就标识可移除(让你不长眼！)
                    u.removable = true;
                }
            }
            u.hit = (u, that) => {
                // 战机与奖励的碰撞检测
                if (u.x + u.width >= that.x && that.x + that.heroImg[this.chosePlane].width >= u.x &&
                    that.y + that.heroImg[this.chosePlane].height >= u.y && u.height + u.y >= that.y) {
                    if (Math.random() * 3 > 1) {
                        if (that.planeLevel === 0) {
                            that.hC += 1.5
                        } else if (that.planeLevel === 1) {
                            that.hC += 1.3
                        } else if (that.planeLevel === 2) {
                            that.hC += 1
                        } else {
                            that.hC += 0.5
                        }
                    } else {
                        that.level < 2 && that.level++
                    }
                    that.gameScore += 300
                    u.removable = true; // 碰撞后的奖励标识为可移除
                }
            }
            return u
        },
        // 画出所有奖励
        drawUp() {
            for (let i = 0; i < this.ups.length; i++) {
                if (this.ups[i].removable) {
                    this.ups.splice(i, 1);
                }
            }
            for (let i = 0; i < this.ups.length; i++) {
                this.ups[i].draw(this.ups[i], this);
            }
        },
        // 创建敌机
        createEnemy() {
            let E = new Object()
            E.n = Math.random() * 20;
            E.enemy = null; // 保存敌机图片
            E.speed = 0; // 敌机的速度
            E.lifes = 2; // 敌机的生命值
            if (E.n < 1 && this.controller >= 2) { // 不同大小的敌机随机出现
                E.enemy = this.enemy3[0]; 
                E.speed = 2;
                E.lifes = 50;
            } else if (E.n < 6 && this.controller >= 1) {
                E.enemy = this.enemy2[0];
                E.speed = 4;
                E.lifes = 10;
            } else {
                E.enemy = this.enemy1[0];
                E.speed = 6;
            }
            E.x = parseInt(Math.random() * (this.canvas.width - E.enemy.width));
            E.y = -E.enemy.height;
            E.width = E.enemy.width;
            E.height = E.enemy.height;
            E.index = 0;
            E.removable = false;
            // 标识敌机是否狗带，若狗带就画它的爆炸图(也就是遗像啦)
            E.die = false;
            E.draw = (E, that) => {
                // 处理不同敌机的爆炸图轮番上阵
                if (E.speed == 2) {
                    if (E.die) {
                        if (E.index < 2) { E.index = 3; }
                        if (E.index < this.enemy3.length) {
                            E.enemy = this.enemy3[E.index++];
                        } else {
                            E.removable = true;
                        }
                    } else {
                        E.enemy = this.enemy3[E.index];
                        E.index == 0 ? E.index = 1 : E.index = 0;
                    }
                } else if (E.die) {
                    if (E.index < this.enemy1.length) {
                        if (E.speed == 6) {
                            E.enemy = this.enemy1[E.index++];
                        } else {
                            E.enemy = this.enemy2[E.index++];
                        }
                    } else {
                        E.removable = true;
                    }
                }
                this.ctx.drawImage(E.enemy, E.x, E.y);
                E.y += E.speed; // 移动敌机
                E.hit(E, that); //判断是否击中敌机
                if (E.y > this.canvas.height) { // 若敌机飞出画布，就标识可移除(让你不长眼！)
                    E.removable = true;
                }
            }
            E.hit = (E, that) => { //判断是否击中敌机
                for (let i = 0; i < that.hullet.length; i++) {
                    let h = that.hullet[i];
                    // 敌机与子弹的碰撞检测，自己体会吧
                    if (E.x + E.width >= h.mx && h.mx + h.width >= E.x &&
                        h.my + h.height >= E.y && E.height + E.y >= h.my) {
                        if (--E.lifes == 0) { // 若生命值为零，标识为死亡
                            E.die = true;
                            // 计分
                            that.gameScore += E.speed == 6 ? 10 : E.speed == 4 ? 20 : 100;
                        }
                        h.removable = true; // 碰撞后的子弹标识为可移除
                    }
                }
                // 敌机与战机的碰撞检测
                if (E.x + E.width >= that.x + that.subWidth && that.x + that.heroImg[that.chosePlane].width - that.subWidth >= E.x &&
                    that.y + that.heroImg[that.chosePlane].height - that.subWidth >= E.y && E.height + E.y >= that.y + that.subWidth) {
                    that.curPhase = that.PHASE_GAMEOVER; // 碰撞后游戏结束
                }
            }
            return E
        },
        // 画出所有敌机
        drawEnemy() {
            for (let i = 0; i < this.liveEnemy.length; i++) {
                if (this.liveEnemy[i].removable) {
                    this.liveEnemy.splice(i, 1);
                }
            }
            for (let i = 0; i < this.liveEnemy.length; i++) {
                this.liveEnemy[i].draw(this.liveEnemy[i], this);
            }
        },
        // 创建子弹
        createHullet(n) {
            let h = new Object()
            h.n = n
            // 子弹的坐标
            h.mx = this.x + (this.heroImg[this.chosePlane].width - this.m.width) / 2 + n; 
            h.my = n == 0 ? this.y - this.m.height : this.y + this.m.height;
            h.width = this.m.width;  // 子弹的宽和高
            h.height = this.m.height;
            h.removable = false; // 标识子弹是否可移除了\
            h.draw = (h) => {
                this.ctx.drawImage(this.m, h.mx, h.my);
                h.my -= 20;
                h.mx += h.n == 32 ? 3 : h.n == -32 ? -3 : 0;
                if (h.my < -this.m.height) {  // 如果子弹飞出画布，就标记为可移除
                    h.removable = true;
                }
            }
            return h
        },
        // 初始化子弹
        drawHullet() {
            for (let i = 0; i < this.hullet.length; i++) { //在画布上画出所以子弹
                this.hullet[i].draw(this.hullet[i]);
                if (this.hullet[i].removable) { // 如果为true就移除这颗子弹
                    this.hullet.splice(i, 1);
                }
            }
        },
        // 初始化画布
        init() {
            this.width = window.innerWidth > 480 ? 480 : window.innerWidth
            this.height = window.innerHeight > 650 ? 650 : window.innerHeight - 20
            this.canvas = document.getElementById('canvas')
            this.canvas.width = this.width
            this.canvas.height = this.height
            this.ctx = this.canvas.getContext('2d')
            this.curPhase = this.PHASE_DOWNLOAD
            this.download()
            this.pBg = this.paintBg()
            this.load = this.loading()
            // 绑定鼠标移动和手指触摸事件，控制hero移动
            this.canvas.addEventListener("mousemove", this.move, false);
            this.canvas.addEventListener("touchmove", this.move, false);
            // 鼠标移除时游戏暂停
            this.canvas.onmouseout = () => {
                if (this.curPhase == this.PHASE_PLAY) {
                    this.curPhase = this.PHASE_PAUSE;
                }
            }
            setInterval(this.gameEngine, 50);
        },
        // 上传分数
        upload() {
            if (this.isUpload) {
                const Store = require('electron-store')
                const store = new Store()
                let data = store.get('planeList', {low:[],low_mid:[],mid:[],high:[]})
                if (this.planeLevel === 0) {
                    data.low.sort(function(a, b){return b - a})
                    if (data.low.length >= 10) {
                        if (data.low[data.low.length-1] > this.gameScore) {
                            data.low[data.low.length-1] = this.gameScore
                        }
                    } else {
                        data.low[data.low.length] = this.gameScore
                    }
                } else if (this.planeLevel === 1) {
                    data.low_mid.sort(function(a, b){return b - a})
                    if (data.low_mid.length >= 10) {
                        if (data.low_mid[data.low_mid.length-1] > this.gameScore) {
                            data.low_mid[data.low_mid.length-1] = this.gameScore
                        }
                    } else {
                        data.low_mid[data.low_mid.length] = this.gameScore
                    }
                } else if (this.planeLevel === 2) {
                    data.mid.sort(function(a, b){return b - a})
                    if (data.mid.length >= 10) {
                        if (data.mid[data.mid.length-1] > this.gameScore) {
                            data.mid[data.mid.length-1] = this.gameScore
                        }
                    } else {
                        data.mid[data.mid.length] = this.gameScore
                    }
                } else if (this.planeLevel === 3) {
                    data.high.sort(function(a, b){return b - a})
                    if (data.high.length >= 10) {
                        if (data.high[data.high.length-1] > this.gameScore) {
                            data.high[data.high.length-1] = this.gameScore
                        }
                    } else {
                        data.high[data.high.length] = this.gameScore
                    }
                }
                store.set('planeList', data)
                this.isUpload = false
                this.$message({
                    message: '恭喜你，纪录上传成功',
                    type: 'success'
                });
            } else {
                this.$message({
                    message: '请勿重复上传哦',
                    type: 'warning'
                });
            }
            this.dialogVisible = true
        },
        // 加载所有图片
        download() {
            this.bg = this.nImg(this.imgName[0]);
            this.pause = this.nImg(this.imgName[1]);
            this.m = this.nImg(this.imgName[2]);
            this.startImg = this.nImg(this.imgName[3]);
            for (let i = 0; i < this.imgName[4].length; i++) {
                this.enemy1[i] = this.nImg(this.imgName[4][i]);
            }
            for (let i = 0; i < this.imgName[5].length; i++) {
                this.enemy2[i] = this.nImg(this.imgName[5][i]);
            }
            for (let i = 0; i < this.imgName[6].length; i++) {
                this.enemy3[i] = this.nImg(this.imgName[6][i]);
            }
            for (let i = 0; i < this.imgName[7].length; i++) {
                this.gameLoad[i] = this.nImg(this.imgName[7][i]);
            }
            for (let i = 0; i < this.imgName[8].length; i++) {
                this.heroImg[i] = this.nImg(this.imgName[8][i]);
            }
            this.up = this.nImg(this.imgName[9])
        },
        nImg(src) {
            this.img = new Image();
            this.img.src = 'img/' + src;
            this.img.onload = this.imgLoad;
            return this.img;
        },
        // 绘制游戏加载进度画面
        imgLoad() {
            this.progress += 3;
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            var text = this.progress + '%';
            var tw = this.ctx.measureText(text).width;
            this.ctx.font = '60px arial';
            this.ctx.fillStyle = 'red';
            this.ctx.lineWidth = '0';
            this.ctx.strokeStyle = '#888';
            //ctx.strokeText(text,(width-tw)/2,height/2);
            this.ctx.fillText(text, (this.width - tw) / 2, this.height / 2);
            if (this.progress >= 100) {
                this.start();
            }
        },
        // 开始游戏
        start() {
            this.isUpload = true
            this.gameScore = 0
            this.level = 0
            this.tims = 0
            this.hC = 1
            this.eC = 1
            this.uC = 1
            this.controller = 0
            this.position = 0
            this.liveEnemy = []
            this.ups = []
            this.hullet = []
            this.dialogVisible = false
            this.curPhase = this.PHASE_READY;
            this.planeLevel === 0 ? this.subWidth = 20 : this.planeLevel === 1 ? this.subWidth = 15 : this.planeLevel === 2 ? this.subWidth = 12 : this.planeLevel === 3 ? this.subWidth = 8 : this.subWidth = 5
            this.canvas.onclick = () => {
                this.curPhase == this.PHASE_READY && (this.curPhase = this.PHASE_LOADING);
            }
            this.ctx.fillStyle = '#963';
            this.ctx.font = '24px arial';
            this.gameEngine();
        },
        // 画背景
        paintBg() {
            this.y = 0;
            function paintBg() {
                this.ctx.drawImage(this.bg, 0, this.y);
                this.ctx.drawImage(this.bg, 0, this.y - 852);
                this.y++ == 852 && (this.y = 0);
            }
            return paintBg;
        },
        // 画game开始图
        paintLogo() {
            this.ctx.drawImage(this.startImg, 40, 0);
        },
        // loading
        loading() {
            let index = 0;
            function loading() {
                this.ctx.drawImage(this.gameLoad[Math.floor(index)], this.position, this.canvas.height - this.gameLoad[0].height)
                index += 0.1
                this.position += (this.canvas.width - this.gameLoad[0].width) / 30
                if (index > 3) {
                    this.curPhase = this.PHASE_PLAY
                    index = 0
                }
            }
            return loading;
        },
        // 游戏暂停
        drawPause() {
            this.ctx.drawImage(this.pause, (this.width - this.pause.width) / 2, (this.height - this.pause.height) / 2);
        },
        // 游戏结束
        gameover(){
            this.dialogVisible = true
            this.curPhase =this.PHASE_READY;  
        },
        // 游戏引擎
        gameEngine() {
            switch (this.curPhase) {
                case this.PHASE_READY:
                    this.pBg();
                    this.paintLogo();
                    break;
                case this.PHASE_LOADING:
                    this.pBg();
                    this.load();
                    break;
                case this.PHASE_PLAY:
                    if (this.tims > 100) {
                        this.tims = 0
                        this.eC += 0.2
                        if (this.controller < 2) {
                            this.controller++
                        }
                        if (this.uC > 0){
                            this.uC -= 0.01
                        } else {
                            this.uC = 0
                        }
                    }
                    this.pBg();
                    this.drawHero()
                    this.drawHullet()
                    this.drawEnemy()
                    this.drawUp()
                    break;
                case this.PHASE_PAUSE:
                    this.drawPause();
                    break;
                case this.PHASE_GAMEOVER:
                    this.gameover();
                    break;    
            }
            this.tims++
            //requestAnimationFrame(gameEngine);
        },
        closeGame() {
            this.$emit("closeGame")
        }
    },
    mounted() {
        this.init()
    }
}
</script>

<style type="text/css">
body {
    height: 0;
    margin: 0;
    text-align: center;
    overflow: hidden;
}

canvas {
    background-color: #ddd;
}
</style>