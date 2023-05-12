const { Plugin, Menu, MenuItem, MenuSeparator } = require('siyuan');
const axios = require('axios');


const defaultConfig = {
    styleId: 'randomDoc-plugin',
    setting: {
        boxrange: ["111",'222'],
        typerange: ['111','111'],
    },
}

class RandomDocPlugin extends Plugin {
    RandomDocButton = null;
    config = defaultConfig;
    svg =
'<svg t="1675912479270" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2333" width="200" height="200"><path d="M752.89 356.741h57.565v97.06L957.44 283.095l-146.939-167.04v110.817h-57.559c-164.813 0-272.317 127.002-354.427 239.053-73.697 100.72-137.492 195.748-240.292 195.748H66.56v129.92h91.617c164.813 0 257.813-135.014 339.968-247.07 73.698-100.773 151.7-187.782 254.746-187.782z m-446.632 74.291l21.335-28.907c17.515-23.803 35.835-49.045 55.777-74.092-59.044-57.267-130.12-99.533-225.193-99.533H66.56v129.874s24.699-1.239 91.617 0c64.784 1.434 105.416 28.954 148.08 72.658zM810.5 666.665h-57.559c-62.766 0-125.42-36.373-170.312-84.629a929.229 929.229 0 0 1-13.557 18.463c-19.702 26.87-40.832 55.824-64.144 84.337 60.585 61.368 148.383 111.703 248.013 111.703h57.56v111.406L957.44 736.947 810.501 570.214v96.451z" p-id="2334"></path></svg>'
    constructor() {
        super();
    }

    async onload() {
        // 配置面板定义
        await this.loadConfig();
        this.saveConfig();
        this.registerSettingRender((el)=>{
            el.innerHTML = `
            <div class="config__tab-container" data-name="common" style="height: unset !important;">
                <label class="fn__flex b3-label config__item">
                    <div class="fn__flex-1">
                        笔记本范围
                        <div class="b3-label__text">限制推送笔记本的范围，默认为[]不限制，参考格式为["boxid","boxid"]</div>
                    </div> 
                    <span class="fn__space"></span>
                    <input class="b3-text-field fn__flex-center fn__size200" id="current">
                </label>
                <label class="fn__flex b3-label config__item">
                    <div class="fn__flex-1">
                        块类型范围
                        <div class="b3-label__text">限制推送块的范围，默认为['d']限制推送文档块，参考格式为["type1","type"]</div>
                    </div> 
                    <span class="fn__space"></span>
                    <input class="b3-text-field fn__flex-center fn__size200" id="color">
                </label>
                <label class="fn__flex b3-label config__item">
                    <div class="fn__flex-1">
                        推迟天数
                        <div class="b3-label__text">推迟默认时间，单位为天</div>
                    </div> 
                    <span class="fn__space"></span>
                    <input class="b3-text-field fn__flex-center fn__size200" id="color">
                </label>
            </div>
            `;

           
        })



        // 快捷键定义
        this.registerCommand({
            command: 'getNextDoc',
            shortcut: 'ctrl+alt+e,command+option+e',
            description: '下一个',
            callback: () => this.getNextDoc(),
        })
        this.registerCommand({
            command: 'delayDoc',
            shortcut: 'ctrl+alt+r,command+option+r',
            description: '推迟',
            callback: () => this.delayDoc(),
        })
        this.registerCommand({
            command: 'ignoreDoc',
            shortcut: 'ctrl+alt+d,command+option+r',
            description: '推迟',
            callback: () => this.ignoreDoc(),
        })


        // 按钮图标
        this.RandomDocButton = document.createElement('button');
        this.RandomDocButton.setAttribute('aria-label', '温故而知新');
        this.RandomDocButton.classList.add('toolbar__item', 'b3-tooltips', 'b3-tooltips__sw');
        this.RandomDocButton.insertAdjacentHTML('beforeend', this.svg);
        this.RandomDocButton.addEventListener('click', (event) => {
            const m = new Menu('RandomDocButton');
            let buttonList=['下一个','推迟','不再推送']
            for (const buttonName of buttonList){
                m.addItem(
                    new MenuItem({
                        label: buttonName,
                        click: () => {
                            console.log(buttonName)
                        }
                    })
                )
            }
            m.showAtMouseEvent(event);
            event.stopPropagation();            
        });
        clientApi.addToolbarRight(this.RandomDocButton);
    }

    onunload() {
        this.RandomDocButton.remove();
    }

    async loadConfig() {
        let config = await this.loadStorage('config.json');
        console.log(111,config,!config)
        if (!config) {
            return;
        }
        this.config = JSON.parse(config);
        this.apply();
    }

    async saveConfig() {
        this.writeStorage('config.json', JSON.stringify(this.config));
    }

    async apply(name) {
        // const id = this.config.styleId;
        // const result = `.protyle-wysiwyg {
        //     background: linear-gradient(90deg, ${this.config.setting.color} 3%, transparent 0), linear-gradient(${this.config.setting.color} 3%, transparent 0);
        //     background-size: ${this.config.setting.width}px ${this.config.setting.width}px;
        // }`;

        // let el = document.getElementById(id);
        // if (!el) {
        //     el = document.createElement('style');
        //     el.id = id;
        //     el.innerHTML = result;
        //     document.head.appendChild(el);
        // } else {
        //     el.innerHTML = result;
        // }

        // this.config.current = name;
        // this.saveConfig();
    }

    async  getNextDoc(){
        // 下一个
        console.log('getNextDoc')
    }
    async  delayDoc(){
        // 推迟
        console.log('delayDoc')
    }
    async  ignoreDoc(){
        // 不再推送
        console.log('ignoreDoc')
    }

}

module.exports =RandomDocPlugin;
