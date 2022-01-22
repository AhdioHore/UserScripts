// ==UserScript==
// @name         Pagetual
// @name:zh-CN   东方永页机
// @name:zh-TW   東方永頁機
// @name:ja      東方永頁機
// @name:ru      Пейджетуал
// @name:de      Pagetual
// @name:ko      東方永頁機
// @namespace    hoothin
// @version      0.5.7
// @description  Simply auto load the next page
// @description:zh-CN  自动翻页
// @description:zh-TW  自動翻頁
// @description:ja     Webページを自動で読み込み継ぎ足し表示を行うブラウザ拡張です
// @description:ru     Просто автоматически загрузите следующую страницу
// @description:de     Laden Sie einfach automatisch die nächste Seite
// @description:ko     다음 페이지를 자동으로 로드하세요
// @author       hoothin
// @include      http://*
// @include      https://*
// @license      MIT
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAAdVBMVEUAAADZHQbYHQXaHQbYHgbZHATYHgbYHgbZHQXYHgXZHgbZHgfYHQXYHQbXHQDYHgbYHgbYHQXZHgbYHgbYHgbYHgXaHQbYHQbYHQbZHgbZHgbZHQbZHgbYHgbYHQbYHQXYHgfaHwDZHQXZHQbYHwTVHQrYHgbCqWmRAAAAJnRSTlMAUL8oyD/el2cy1CCPcg/35euggPG6FajOr4Z617OdXkkIi1g4GcTbfAwAAAJDSURBVFjD7dbXtqpADADQ0NsA0hHQY83/f+K9rqNOCzPwfvaTugimjEH4s86739yX0+3n8dwd7dQh/seiaWbHscUqCnZEP24LvrXjXLyyaVJMp2RbeFajZInhJWCHcurB7idEVfS+89SGsS28qJFwyN59ZcgsnXeRVrwvSNLFNJEA1/jfDqW4Po8Z1+XwsX6HGA1Cft1Y0ndw0OjCrwxDj4hPDqgYXbGlZ35pj0fQ1dr0C4DM5++lZHMt/qLNXq2rAG5qtWPdoaL5/ZwXloHAP1onUKs3SOSOO5YEsFNLkJN2T/IRRt0gj6ZUUpZTyMmzUx/Vw8wVhwgEI9pog2PiHRO0OhTq2hLnytBK3yRdsKeCGjRnoagKLRbQNfwsXdGiAkLMu5ihWUSvr5S/tPWPlIV8kxvn58CKatMu7Ly1+Kzcsgwj0wqXlgnNMT7CrFPwwaTp+OsSKS4Y1UJ5Phl/BSM3F7JBQmKO78UGJWT/zWJpTae7E4CTtJcnVJ2E7dV4RAWlY36uM96gFnHQT0HFe0zOIZYbnGsVRJZHc/DZFS15pu54URfUSgYJvVJ8BgpPWWu3TwfJUxkvPahylAzy573ybXfQHVEUFt/2uC67KgWcybPp602gndMMKF647bfIUg9oQYmCH6B1PF7jHFDQk2n6PJ7gDcil1FekowdGuVBGqw7rGZXNFSweLnJRJo4pD4cENphb/CoH57O6o8q/wzbJtCBXuXVz7sqQBbBDMJ9a6e+SA/tlzjx0Q3TLL0/4Y/QPSYfEIomUUSEAAAAASUVORK5CYII=
// @grant        GM_xmlhttpRequest
// @grant        GM_registerMenuCommand
// @grant        GM_notification
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_addStyle
// @grant        GM.xmlHttpRequest
// @grant        GM.registerMenuCommand
// @grant        GM.notification
// @grant        GM.getValue
// @grant        GM.setValue
// @grant        GM.addStyle
// @downloadURL  https://greasyfork.org/scripts/438684-pagetual/code/Pagetual.user.js
// @updateURL    https://greasyfork.org/scripts/438684-pagetual/code/Pagetual.user.js
// @connect      wedata.net
// @connect      githubusercontent.com
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    if (window.name === 'pagetual-iframe') {
        var domloaded = function (){
            window.scroll(window.scrollX, 99999);
            //window.parent.postMessage('pagetual-iframe:DOMLoaded', '*');
        };
        if(window.opera){
            document.addEventListener('DOMContentLoaded', domloaded, false);
        } else {
            domloaded();
        }
        return;
    }

    if(window.top != window.self){
        return;
    }

    const lang = navigator.appName=="Netscape"?navigator.language:navigator.userLanguage;
    var i18n=(name, param)=>{
        let config={};
        switch (lang){
            case "zh-CN":
            case "zh-SG":
                config={
                    disable:"暂时禁用",
                    disableSite:"在此站禁用",
                    enable:"启用翻页",
                    toTop:"回到顶部",
                    toBottom:"前往页尾",
                    current:"当前页",
                    forceIframe:"强制拼接",
                    cancelForceIframe:"取消强制拼接",
                    configure:"打开配置页",
                    update:"立即更新规则",
                    passSec:"更新于 #t# 秒前",
                    passMin:"更新于 #t# 分钟前",
                    passHour:"更新于 #t# 小时前",
                    passDay:"更新于 #t# 天前",
                    cantDel:"无法删除内置规则",
                    confirmDel:"是否确认要删除此规则？",
                    updateSucc:"更新成功",
                    beginUpdate:"正在更新，请稍候",
                    customUrls:"导入规则url，一行一条，AutoPagerize 格式规则需要以\"0|\"开头",
                    customRules:"输入【东方永页机】格式的自定义规则",
                    save:"保存设置",
                    loadingText:"少女祈祷中..."
                };
                break;
            case "zh-TW":
            case "zh-HK":
                config={
                    disable:"暫時禁用",
                    disableSite:"在此站禁用",
                    enable:"啟用翻頁",
                    toTop:"回到頂部",
                    toBottom:"前往頁尾",
                    current:"當前頁",
                    forceIframe:"強制拼接",
                    cancelForceIframe:"取消强制拼接",
                    configure:"打開配置頁",
                    update:"立即更新規則",
                    passSec:"更新于 #t# 秒前",
                    passMin:"更新于 #t# 分鐘前",
                    passHour:"更新于 #t# 小時前",
                    passDay:"更新于 #t# 天前",
                    cantDel:"無法刪除内置規則",
                    confirmDel:"是否確認要刪除此規則？",
                    updateSucc:"更新成功",
                    beginUpdate:"正在更新，請稍候",
                    customUrls:"導入規則url，一行一條，AutoPagerize 格式規則需要以\"0|\"開頭",
                    customRules:"輸入【東方永頁機】格式的自定義規則",
                    save:"存儲設置",
                    loadingText:"少女祈禱中..."
                };
                break;
            case "ja":
                config = {
                    disable: "一時的に無効にする",
                    disableSite:"このサイト無効",
                    enable: "ページめくりを有効にする",
                    toTop: "トップに戻る",
                    toBottom: "ページの下部に移動",
                    current: "現在のページ",
                    forceIframe: "強制ステッチ",
                    cancelForceIframe: "強制ステッチをキャンセル",
                    configure: "設定ページを開く",
                    update: "今すぐルールを更新してください",
                    passSec: "＃t＃秒前に更新",
                    passMin: "＃t＃分前に更新",
                    passHour: "＃t＃時間前に更新",
                    passDay: "＃t＃日前に更新",
                    cantDel: "組み込みルールを削除できません",
                    confirmDel: "このルールを削除してもよろしいですか？",
                    updateSucc: "更新に成功しました",
                    beginUpdate: "更新中、お待ちください",
                    customUrls: "インポートルールのURL、1行に1つ、AutoPagerizeフォーマットルールは\"0|\"で始まる必要があります",
                    customRules: "【東方永頁機】の形式でカスタムルールを入力してください",
                    save: "設定を保存",
                    loadingText: "少女祈祷中..."
                };
                break;
            default:
                config={
                    disable:"Disable",
                    disableSite:"Disable in the site",
                    enable:"Enable",
                    toTop:"To Top",
                    toBottom:"To Bottom",
                    current:"Current Page",
                    forceIframe:"Force to join",
                    cancelForceIframe:"Cancel Force join",
                    configure:"Configure",
                    update:"Update rules from url now",
                    passSec:"Updated #t# seconds ago",
                    passMin:"Updated #t# minutes ago",
                    passHour:"Updated #t# hours ago",
                    passDay:"Updated #t# days ago",
                    cantDel:"Can't delete buildin rules",
                    confirmDel:"Are you sure you want to delete this rule?",
                    updateSucc:"Update succeeded",
                    beginUpdate:"Begin update, wait a minute please",
                    customUrls:"Import rule url, One url per line, rules on AutoPagerize format need to start with \"0|\"",
                    customRules:"Input custom rules with [Pagetual] format",
                    save:"Save",
                    loadingText:"Shojo Now Loading..."
                };
                break;
        }
        return config[name]?config[name].replace("#t#",param):name;
    };

    var enableDebug=true;
    var debug=str=>{
        if(enableDebug){
            console.debug(str);
        }
    };

    var _GM_xmlhttpRequest,_GM_registerMenuCommand,_GM_notification,_GM_addStyle;
    if(typeof GM_xmlhttpRequest!='undefined'){
        _GM_xmlhttpRequest=GM_xmlhttpRequest;
    }else if(typeof GM!='undefined' && typeof GM.xmlHttpRequest!='undefined'){
        _GM_xmlhttpRequest=GM.xmlHttpRequest;
    }
    if(typeof GM_registerMenuCommand!='undefined'){
        _GM_registerMenuCommand=GM_registerMenuCommand;
    }else if(typeof GM!='undefined' && typeof GM.registerMenuCommand!='undefined'){
        _GM_registerMenuCommand=GM.registerMenuCommand;
    }
    if(typeof GM_notification!='undefined'){
        _GM_notification=GM_notification;
    }else if(typeof GM!='undefined' && typeof GM.notification!='undefined'){
        _GM_notification=GM.notification;
    }
    if(typeof GM_addStyle!='undefined'){
        _GM_addStyle=GM_addStyle;
    }else if(typeof GM!='undefined' && typeof GM.addStyle!='undefined'){
        _GM_addStyle=GM.addStyle;
    }else{
        _GM_addStyle=cssStr=>{
            let styleEle=document.createElement("style");
            styleEle.innerHTML=cssStr;
            document.head.appendChild(styleEle);
        };
    }

    if(typeof _GM_xmlhttpRequest=='undefined')_GM_xmlhttpRequest=(f)=>{};
    if(typeof _GM_registerMenuCommand=='undefined')_GM_registerMenuCommand=(s,f)=>{};
    if(typeof _GM_notification=='undefined')_GM_notification=(s)=>{};
    var _unsafeWindow=(typeof unsafeWindow=='undefined')?window:unsafeWindow;
    var storage={
        supportGM: typeof GM_getValue=='function' && typeof GM_getValue('a','b')!='undefined',
        supportGMPromise: typeof GM!='undefined' && typeof GM.getValue=='function' && typeof GM.getValue('a','b')!='undefined',
        mxAppStorage:(function(){
            try{
                return window.external.mxGetRuntime().storage;
            }catch(e){
            }
        })(),
        operaUJSStorage:(function(){
            try{
                return window.opera.scriptStorage;
            }catch(e){
            }
        })(),
        setItem:function(key,value){
            if(this.operaUJSStorage){
                this.operaUJSStorage.setItem(key,value);
            }else if(this.mxAppStorage){
                this.mxAppStorage.setConfig(key,value);
            }else if(this.supportGM){
                GM_setValue(key,value);
            }else if(this.supportGMPromise){
                GM.setValue(key,value);
            }else if(window.localStorage){
                window.localStorage.setItem(key,value);
            }
        },
        getItem:function(key,cb){
            var value;
            if(this.operaUJSStorage){
                value=this.operaUJSStorage.getItem(key);
            }else if(this.mxAppStorage){
                value=this.mxAppStorage.getConfig(key);
            }else if(this.supportGM){
                value=GM_getValue(key);
            }else if(this.supportGMPromise){
                value=GM.getValue(key).then(v=>{cb(v)});
                return;
            }else if(window.localStorage){
                value=window.localStorage.getItem(key);
            };
            cb(value);
        }
    };
    _GM_registerMenuCommand(i18n("configure"), ()=>{
        window.open("https://github.com/hoothin/UserScripts/tree/master/Pagetual", "_blank");
    });

    function getElementByXpath(xpath, contextNode, doc){
        doc = doc || document;
        contextNode = contextNode || doc;
        try {
            var result = doc.evaluate(xpath, contextNode, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
            return result.singleNodeValue && result.singleNodeValue.nodeType === 1 && result.singleNodeValue;
        } catch (err) {
            throw new Error(`Invalid xpath: ${xpath}`);
        }
    }

    function getAllElementsByXpath(xpath, contextNode, doc){
        doc = doc || document;
        contextNode = contextNode || doc;
        var result = [];
        try {
            var query = doc.evaluate(xpath, contextNode, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
            for (var i = 0; i < query.snapshotLength; i++) {
                var node = query.snapshotItem(i);
                if (node.nodeType === 1) result.push(node);
            }
        } catch (err) {
            throw new Error(`Invalid xpath: ${xpath}`);
        }
        return result;
    }

    class RuleParser {
        constructor() {
            this.customRules=[];
            this.rules=[];
            this.pageDoc=document;
            this.nextLinkHref=null;
            this.curUrl=location.href;
            this.curSiteRule={};
        }

        initSavedRules(callback){
            var self=this;
            storage.getItem("customRules", customRules=>{
                if(customRules)self.customRules=customRules;
                storage.getItem("rules", rules=>{
                    if(rules)this.rules=rules;
                    callback();
                });
            });
        }

        saveCurSiteRule(){
            if(!this.curSiteRule || !this.curSiteRule.url)return;
            this.customRules=this.customRules.filter(item=>{return item.url!=this.curSiteRule.url});
            this.customRules.push(this.curSiteRule);
            storage.setItem("customRules", this.customRules);
        }

        requestJSON(url, callback){
            _GM_xmlhttpRequest({
                url: url,
                method: 'GET',
                onload: function(res) {
                    let json=null;
                    try{
                        json=JSON.parse(res.response);
                    }catch(e){
                        debug(e);
                    }
                    callback(json);
                }
            });
        }

        formatRule(item, type, from){
            switch(type){
                case 0:
                    return {
                        from:from,
                        type:type,
                        name:item.name,
                        action:item.data.forceIframe=="true"?1:0,
                        url:item.data.url,
                        pageElement:item.data.pageElement,
                        nextLink:item.data.nextLink,
                        insert:item.data.insertBefore,
                        insertPos:1,
                        updatedAt:item.data.updated_at,
                        css:item.data.Stylus+item.data.CSS,
                        pageAction:item.data.bookmarklet
                    };
                    break;
                case 1:
                default:
                    item.from=from;
                    item.type=type;
                    return item;
                    break;
            }
            return null;
        }

        addRuleByUrl(url, type, from, callback) {
            this.requestJSON(url, json=>{
                this.addRules(json, type, from);
                storage.setItem("rules", this.rules);
                callback();
            });
        }

        addRules(rules, type, from) {
            if(rules && rules.length>0){
                this.rules=this.rules.filter(item=>{return item.from!=from});
                rules.forEach(item=>{
                    let rule=this.formatRule(item, type, from);
                    if(rule){
                        this.rules.push(rule);
                    }
                });
            }
        }

        getRule(callback) {
            if(this.curSiteRule && this.curSiteRule.url){
                return this.curSiteRule;
            }
            var self=this;
            for(let i in this.customRules){
                let rule=this.customRules[i];
                if(rule.enable==0)continue;
                let urlReg=new RegExp(rule.url, "i");
                if(urlReg.test(location.href)){
                    let pageElement,nextLink,insert;
                    if(rule.pageElement)pageElement=document.querySelector(rule.pageElement);
                    if(rule.nextLink)nextLink=document.querySelector(rule.nextLink);
                    if(rule.insert)insert=document.querySelector(rule.insert);
                    if((rule.pageElement && !pageElement) ||
                       (rule.nextLink && !nextLink) ||
                       (rule.insert && !insert)){
                        continue;
                    }
                    this.curSiteRule=rule;
                    debug(rule);
                    callback();
                    return rule;
                }
            }
            let r=0;
            function searchByTime(){
                setTimeout(()=>{
                    let end=r+80;
                    end=end>self.rules.length?self.rules.length:end;
                    for(;r<end;r++){
                        let rule=self.rules[r];
                        if(rule.enable==0)continue;
                        let urlReg=new RegExp(rule.url, "i");
                        if(urlReg.test(location.href)){
                            let pageElement,nextLink,insert;
                            if(rule.pageElement)pageElement=rule.type==0?getElementByXpath(rule.pageElement):document.querySelector(rule.pageElement);
                            if(rule.nextLink)nextLink=rule.type==0?getElementByXpath(rule.nextLink):document.querySelector(rule.nextLink);
                            if(rule.insert)insert=rule.type==0?getElementByXpath(rule.insert):document.querySelector(rule.insert);
                            if((rule.pageElement && !pageElement) ||
                               (rule.nextLink && !nextLink) ||
                               (rule.insert && !insert)){
                                continue;
                            }
                            self.curSiteRule=rule;
                            debug(rule);
                            callback();
                            return;
                        }
                    }
                    if(end>=self.rules.length){
                        self.curSiteRule={};
                        self.curSiteRule.url=location.origin.replace(/\./g,"\\.");
                        callback();
                        return;
                    }else{
                        searchByTime();
                    }
                },20);
            }
            searchByTime();
        }

        geneSelector(ele){
            let selector=ele.tagName;
            //Google id class都是隨機。百度更過分，style script順序都是隨機的
            //if(ele.id) selector += '#' + ele.id;
            //if(ele.classList) selector += [].map.call(ele.classList,d=>'.'+d).join('');
            let parent = ele.parentElement;
            if(parent){
                let i,j=0;
                for(i=0;i<parent.children.length;i++){
                    if(parent.children[i].tagName==selector){
                        j++;
                        if(parent.children[i]==ele){
                            break;
                        }
                    }
                }
                selector = this.geneSelector(parent) + ' > ' + selector + (parent.tagName=="HTML"?"":`:nth-of-type(${j})`);
            }
            return selector;
        }

        getPageElement(doc, curWin) {
            let pageElement=null;
            let self=this;
            if(this.curSiteRule.pageElement){
                pageElement=this.curSiteRule.type==0?getAllElementsByXpath(this.curSiteRule.pageElement,doc,doc):doc.querySelectorAll(this.curSiteRule.pageElement);
            }
            if((!pageElement || pageElement.length==0) && curWin){
                let body=doc.body,bodyHeight=parseInt(curWin.getComputedStyle(body).height);
                function checkElement(ele){
                    let curHeight=parseInt(curWin.getComputedStyle(ele).height);
                    if(curHeight/bodyHeight<=0.35)return null;
                    if(ele.children.length==0){
                        self.curSiteRule.pageElement=self.geneSelector(ele.parentNode)+">"+ele.tagName;
                        self.curSiteRule.type=1;
                        debug(self.curSiteRule.pageElement);
                        return [ele];
                    }
                    let i,maxHeight=curHeight*0.35,curMaxEle=null,curMaxArea=0;
                    for(i=0;i<ele.children.length;i++){
                        let curNode=ele.children[i];
                        let comStyle=curWin.getComputedStyle(curNode);
                        let h=parseInt(comStyle.height);
                        let w=parseInt(comStyle.width);
                        if(isNaN(h) || isNaN(w))continue;
                        let a=h*w+h,moreChild=curNode.children[0];
                        while(moreChild){
                            comStyle=curWin.getComputedStyle(moreChild);
                            let ch=parseInt(comStyle.height);
                            let cw=parseInt(comStyle.width);
                            if(moreChild.innerText!="" && !isNaN(ch) && !isNaN(cw)){
                                a+=ch*cw;
                            }
                            moreChild=moreChild.nextElementSibling;
                        }
                        if(curMaxEle==null || curMaxArea<a){
                            curHeight=h;
                            curMaxArea=a;
                            curMaxEle=curNode;
                        }
                    }
                    if(curHeight>maxHeight){
                        return checkElement(curMaxEle);
                    }
                    self.curSiteRule.pageElement=self.geneSelector(ele)+">*";
                    self.curSiteRule.type=1;
                    debug(self.curSiteRule.pageElement);
                    return ele.children;
                }
                pageElement=checkElement(body);
                //if(pageElement)this.saveCurSiteRule();
            }
            return pageElement;
        }

        getPage(doc){
            let canSave=false;//發現頁碼選擇器在其他頁對不上，還是別保存了
            let url=this.curUrl;
            let pageNum=0,preStr="",afterStr="";
            let pageMatch1=url.match(/(.*[a-zA-Z0-9\/][\-_](?:p|page)?)(\d+)(\.html?$|$)/i);
            let pageMatch2=url.match(/(.*[\?&]p(?:age)?=)(\d+)($|[#&].*)/i);
            if(pageMatch1){
                preStr=pageMatch1[1];
                pageNum=pageMatch1[2];
                afterStr=pageMatch1[3];
            }else if(pageMatch2){
                preStr=pageMatch2[1];
                pageNum=pageMatch2[2];
                afterStr=pageMatch2[3];
            }
            var curPage=doc,i,cur;
            let next=curPage.querySelector("a.next");
            if(!next)next=curPage.querySelector("a#next");
            if(!next)next=curPage.querySelector("a#rightFix");
            if(!next)next=curPage.querySelector("a.next_page");
            if(next && (!next.href || /javascript:/.test(next.href)))next=null;
            if(!next)next=curPage.querySelector(".next>a");
            if(!next){
                let pageDiv=curPage.querySelector("div.wp-pagenavi");
                if(pageDiv){
                    cur=pageDiv.querySelector("span.current");
                    next=cur.nextSibling;
                }else{
                    cur=curPage.querySelector("div.article-paging>span");
                    if(cur){
                        next=cur.nextElementSibling;
                    }
                }
            }
            if(!next){
                let pageDiv=curPage.querySelector("div.pages>ul");
                if(pageDiv){
                    cur=pageDiv.querySelector("li>b");
                    if(cur)next=cur.parentNode.nextElementSibling.querySelector("a");
                }
            }
            if(!next){
                let aTags=curPage.querySelectorAll("a");
                let nextf,nexts,nextt,nextfo;
                for(i=0;i<aTags.length;i++){
                    let aTag=aTags[i];
                    if(nextf && nexts && nextt)break;
                    if(!nextf){
                        if(/(\s|^)下[一1]?[页頁张張]|^next( page)?\s*$|次のページ/i.test(aTag.innerText)){
                            if(!aTag.href || /javascript:/.test(aTag.href)){
                                nextfo=aTag;
                            }else{
                                nextf=aTag;
                            }
                        }
                    }
                    if(!nexts){
                        if(aTag.innerText=="&gt;"){
                            if(!aTag.href || /javascript:/.test(aTag.href)){
                                nextfo=aTag;
                            }else{
                                nexts=aTag;
                            }
                        }
                    }
                    if(!aTag.href || /javascript:/.test(aTag.href))continue;
                    if(!nextt){
                        aTag.href=aTag.href.replace(/\?&/,"?");
                        if(aTag.innerText=="»"){
                            nextt=aTag;
                        }else if(aTag.href.replace(preStr,"").replace(afterStr,"")==parseInt(pageNum)+1){
                            nextt=aTag;
                        }else if(aTag.href.indexOf(url)!=-1 && /^[\/\?&]?[_-]?(p|page)?=?[12](\?|&|$)/i.test(aTag.href.replace(url,""))){
                            nextt=aTag;
                        }
                    }
                }
                next=nextf||nexts||nextt||nextfo;
            }
            if(!next)next=curPage.querySelector('[rel="next"]');
            return {next:next,canSave:canSave};
        }

        getNextLink(doc) {
            let nextLink=null,page;
            if(this.curSiteRule.pageElementByJs){
                this.nextLinkHref="#";
                return true;
            }else if(this.curSiteRule.nextLinkByJs){
                let targetUrl=Function("doc",'"use strict";' + this.curSiteRule.nextLinkByJs)(doc);;
                nextLink={href:targetUrl};
            }else if(this.curSiteRule.nextLinkByUrl){
                let targetUrl=this.curUrl.replace(new RegExp(this.curSiteRule.nextLinkByUrl[0]), this.curSiteRule.nextLinkByUrl[1]);
                if(targetUrl != this.curUrl){
                    let reps=targetUrl.match(/{.*?}/g);
                    if(reps){
                        reps.forEach(rep=>{
                            let code=rep.replace("{","").replace("}","");
                            let result=code.match(/^(\d+)\+1$/);
                            if(result){
                                result=parseInt(result[1])+1;
                            }
                            else result=Function('"use strict";return ' + code)();;
                            targetUrl=targetUrl.replace(rep, result);
                        });
                    }
                }
                nextLink={href:targetUrl};
            }else if(this.curSiteRule.nextLink){
                nextLink=this.curSiteRule.type==0?getElementByXpath(this.curSiteRule.nextLink,doc,doc):doc.querySelector(this.curSiteRule.nextLink);
            }
            if(!nextLink){
                page=this.getPage(doc);
                nextLink=page.next;
            }
            if(nextLink){
                if(!this.basePageElement){
                    this.basePageElement=this.getPageElement(document, _unsafeWindow);
                }
                if(!this.curSiteRule.nextLink && page && page.canSave){
                    this.curSiteRule.nextLink=this.geneSelector(nextLink);
                    this.curSiteRule.type=1;
                    this.saveCurSiteRule();
                }
            }
            if(nextLink){
                this.nextLinkHref=nextLink.href?nextLink.href:"#";
                debug(nextLink);
            }else{
                this.nextLinkHref=false;
            }
            return nextLink;
        }

        getInsert(refresh) {
            if(this.insert && !refresh && this.insert.parentNode)return this.insert;
            if(this.curSiteRule.insert){
                this.insert=this.curSiteRule.type==0?getElementByXpath(this.curSiteRule.insert,document):document.querySelector(this.curSiteRule.insert);
            }else{
                let pageElement=this.basePageElement;
                if(pageElement && pageElement.length>0){
                    var pELast = pageElement[pageElement.length - 1];
                    this.insert = pELast.nextSibling ? pELast.nextSibling : pELast.parentNode.appendChild(document.createTextNode(' '));
                }
            }
            return this.insert;
        }

        pageAction(doc,eles){
            let code=this.curSiteRule.pageAction;
            if(code){
                Function("doc","eles",'"use strict";' + code)(doc,eles);
            }
            let css=this.curSiteRule.css;
            if(css){
                _GM_addStyle(css);
            }
            [].forEach.call(eles, ele=>{
                [].forEach.call(ele.querySelectorAll("img"), img=>{
                    //if(img.src==""){
                        let realSrc;
                        if(img.dataset && img.dataset.original){
                            realSrc=img.dataset.original;
                        }else if(img.dataset && img.dataset.src){
                            realSrc=img.dataset.src;
                        }else if(img._lazyrias && img._lazyrias.srcset){
                            realSrc=img._lazyrias.srcset[img._lazyrias.srcset.length-1];
                        }else if(img.dataset && img.dataset.origFile){
                            realSrc=img.dataset.origFile;
                        }else if(img.srcset){
                            var srcs=img.srcset.split(","),largeSize=0;
                            srcs.forEach(srci=>{
                                let srcInfo=srci.trim().split(" "),curSize=parseInt(srcInfo[1]);
                                if(srcInfo[1] && curSize>largeSize){
                                    largeSize=curSize;
                                    realSrc=srcInfo[0];
                                }
                            });
                        }
                        if(realSrc)img.src=realSrc;
                    //}
                });
            });
            let lazyImgSrc=this.curSiteRule.lazyImgSrc;
            if(lazyImgSrc){
                [].forEach.call(eles, ele=>{
                    [].forEach.call(ele.querySelectorAll("img"), img=>{
                        if(img[lazyImgSrc]){
                            img.src=img[lazyImgSrc];
                        }
                    });
                });
            }
        }

        initPage(callback){
            let self=this;
            this.getRule(()=>{
                let code=self.curSiteRule.init;
                if(code){
                    Function('"use strict";' + code)();
                }
                self.getNextLink(document);
                callback();
            });
        }

        insertPage(doc, eles, url){
            this.pageDoc=doc;
            this.curUrl=url;
            this.pageAction(doc, eles);
            this.getNextLink(doc);
            this.getInsert();
            var self=this;
            if(!eles || eles.length==0 || !self.insert || !self.insert.parentNode){
            }else{
                [].forEach.call(eles, ele=>{
                    if(self.curSiteRule.insertPos==2){
                        self.insert.appendChild(ele.cloneNode(true));
                    }else{
                        self.insert.parentNode.insertBefore(ele.cloneNode(true), self.insert);
                    }
                });
            }
        }
    }
    var ruleParser = new RuleParser();

    var rulesData={},ruleUrls,updateDate;
    function initConfig(){
        _GM_registerMenuCommand(i18n(forceState==1?"enable":"disableSite"), ()=>{
            storage.setItem("forceState_"+location.host, (forceState==1?0:1));
            location.reload();
        });

        _GM_registerMenuCommand(i18n(forceState==2?"cancelForceIframe":"forceIframe"), ()=>{
            storage.setItem("forceState_"+location.host, (forceState==2?0:2));
            location.reload();
        });
        var configCon,insertPos;
        if(location.href=="https://github.com/hoothin/UserScripts/tree/master/Pagetual"){
            _GM_addStyle(`
             p>span:nth-child(1),p>span:nth-child(2),p>span:nth-child(3){
              cursor: pointer;
              user-select: none;
             }
             p>span:nth-child(1):hover,p>span:nth-child(2):hover,p>span:nth-child(3):hover{
              color:red;
             }
             .updateDate{
              cursor: pointer;
              user-select: none;
             }
             .updateDate:hover{
              color:red;
             }
            `);
            configCon=document.querySelector(".markdown-body");
            insertPos=configCon.querySelector("hr");
        }else if(location.href=="https://github.com/hoothin/UserScripts/tree/master/Pagetual"){
        }else return;
        class Rulebar {
            init(ruleUrl){
                this.ruleUrl=ruleUrl;
                this.item=document.createElement("p");
                this.item.title=ruleUrl.type==0?"AutoPagerize Rules":"Pagetual Rules";
                this.item.dataset.id=this.ruleUrl.id;
                let url=document.createElement("span");
                url.innerHTML=ruleUrl.url;
                let up=document.createElement("span");
                up.innerHTML="↑ ";
                let down=document.createElement("span");
                down.innerHTML="↓ ";
                let del=document.createElement("span");
                del.innerHTML="× ";
                up.onclick=e=>{
                    this.moveUp();
                };
                down.onclick=e=>{
                    this.moveDown();
                };
                del.onclick=e=>{
                    this.del();
                };
                this.item.appendChild(up);
                this.item.appendChild(down);
                this.item.appendChild(del);
                this.item.appendChild(url);
                configCon.insertBefore(this.item, insertPos);
            }
            saveSort(){
                let sort=[];
                [].forEach.call(this.item.parentNode.querySelectorAll("p[data-id]"), i=>{
                    sort.push(i.dataset.id);
                });
                rulesData.sort=sort;
                storage.setItem("importRuleUrl", rulesData);
            }
            moveUp(){
                let preE=this.item.previousElementSibling;
                if(preE.tagName=="P" && preE.children.length>1){
                    this.item.parentNode.insertBefore(this.item,preE);
                    this.saveSort();
                }
            }
            moveDown(){
                let nextE=this.item.nextElementSibling;
                if(nextE.tagName=="P" && nextE.children.length>1){
                    this.item.parentNode.insertBefore(nextE,this.item);
                    this.saveSort();
                }
            }
            del(){
                if(this.ruleUrl.id<2){
                    alert(i18n("cantDel"));
                }else if(window.confirm(i18n("confirmDel"))){
                    for(let u=0;u<rulesData.urls.length;u++){
                        if(this.ruleUrl.id==rulesData.urls[u].id){
                            rulesData.urls.splice(u,1);
                            break;
                        }
                    }
                    for(let u=0;u<rulesData.sort.length;u++){
                        if(this.ruleUrl.id==rulesData.sort[u]){
                            rulesData.sort.splice(u,1);
                            break;
                        }
                    }
                    storage.setItem("importRuleUrl", rulesData);
                    ruleParser.rules=ruleParser.rules.filter(item=>{return item.from!=this.ruleUrl.id});
                    storage.setItem("rules", ruleParser.rules);
                    this.item.parentNode.removeChild(this.item);
                    //location.reload();
                }
            }
        }
        let updateP=document.createElement("p"),i=0;
        let now=new Date().getTime(),inUpdate=false;


        let pastDate=(new Date(updateDate)).toString(),passStr;
        let passTime=(now-updateDate)/1000;
        if(passTime<60){
            passStr=i18n("passSec", passTime);
        }else if(passTime<60*60){
            passStr=i18n("passMin", parseInt(passTime/60));
        }else if(passTime<60*60*24){
            passStr=i18n("passHour", parseInt(passTime/3600));
        }else{
            passStr=i18n("passDay", parseInt(passTime/86400));
        }


        updateP.className="updateDate";
        updateP.innerHTML=passStr;
        updateP.title=i18n("update")+" - "+pastDate;
        updateP.onclick=e=>{
            if(inUpdate)return;
            inUpdate=true;
            ruleUrls.forEach(rule=>{
                ruleParser.addRuleByUrl(rule.url, rule.type, rule.id, ()=>{
                    if(++i==ruleUrls.length){
                        storage.setItem("ruleLastUpdate", now);
                        alert(i18n("updateSucc"));
                        inUpdate=false;
                        updateP.innerHTML=i18n("passSec", 0);
                    }
                })
            });
            alert(i18n("beginUpdate"));
        };
        configCon.insertBefore(updateP, insertPos);
        if(ruleUrls){
            ruleUrls.forEach(ruleUrl=>{
                var rulebar=new Rulebar();
                rulebar.init(ruleUrl);
            });
        }
        let customUrlsTitle=document.createElement("h2");
        customUrlsTitle.innerHTML=i18n("customUrls")
        configCon.insertBefore(customUrlsTitle, insertPos);
        let customUrlsInput=document.createElement("textarea");
        customUrlsInput.style.width="100%";
        customUrlsInput.placeholder="0|http://wedata.net/databases/AutoPagerize/items_all.json";
        configCon.insertBefore(customUrlsInput, insertPos);
        let customRulesTitle=document.createElement("h2");
        customRulesTitle.innerHTML=i18n("customRules")
        configCon.insertBefore(customRulesTitle, insertPos);
        let customRulesInput=document.createElement("textarea");
        customRulesInput.style.width="100%";
        customRulesInput.style.height="500px";
        customRulesInput.placeholder=`[\n{\n    "name":"yande",\n    "action":"0",\n    "url":"^https:\/\/yande\\.re\/",\n    "pageElement":"ul#post-list-posts>li",\n    "nextLink":"a.next_page",\n    "css":".javascript-hide {display: inline-block !important;}"\n},\n{\n    "name":"tieba",\n    "action":"1",\n    "url":"^https:\/\/tieba\\.baidu.com\/f\\?kw=",\n    "pageElement":"ul#thread_list>li",\n    "nextLink":".next.pagination-item "\n}\n]`;
        customRulesInput.value=getFormatJSON(ruleParser.customRules);
        configCon.insertBefore(customRulesInput, insertPos);
        let saveBtn=document.createElement("button");
        saveBtn.innerHTML=i18n("save");
        saveBtn.style.width="100%";
        configCon.insertBefore(saveBtn, insertPos);
        saveBtn.onclick=e=>{
            try{
                if(customRulesInput.value==""){
                    storage.setItem("customRules", "");
                }else{
                    let customRules=JSON.parse(customRulesInput.value);
                    debug(customRules);
                    storage.setItem("customRules", customRules);
                }
            }catch(e){
                debug(e);
                alert("JSON error, check again!");
                return;
            }
            let customUrls=customUrlsInput.value.trim();
            if(customUrls){
                customUrls=customUrls.split(/\n/);
                for(let c=0;c<customUrls.length;c++){
                    let urlArr=customUrls[c].split("|"),url,type=1;
                    if(urlArr.length==1){
                        url=urlArr[0].trim();
                        if(!/^http/.test(url)){
                            alert("Wrong url, check again!");
                            return;
                        }
                    }else if(urlArr.length==2){
                        type=urlArr[0].trim();
                        url=urlArr[1].trim();
                        if(!/^http/.test(url)){
                            alert("Wrong url, check again!");
                            return;
                        }
                    }else{
                        break;
                    }
                    let maxId=0,hasUrl=false;;
                    if(!rulesData.urls){
                        rulesData.urls=[];
                        maxId=1;
                    }else{
                        rulesData.urls.forEach(u=>{
                            if(maxId<u.id){
                                maxId=u.id;
                            }
                            if(u.url==url){
                                hasUrl=true;
                            }
                        });
                        if(hasUrl)break;
                    }
                    rulesData.urls.push({id:maxId+1,url:url,type:type});
                    rulesData.sort.push(maxId+1);
                    storage.setItem("importRuleUrl", rulesData);
                }
            }
            alert("Modified successfully");
            location.reload();
        };
    }

    function objIsArr(obj) {
        return obj &&
            typeof obj === 'object' &&
            typeof obj.length === 'number' &&
            !(obj.propertyIsEnumerable('length'));
    }

    function getFormatJSON(obj){
        if(!objIsArr(obj))return "";
        let ret="[\n";
        let len=obj.length,i=0,isLast;
        obj.forEach(item=>{
            ret+="  {\n";
            let iLen=Object.keys(item).length,j=0;
            for(let key in item){
                isLast=(++j)==iLen;
                let value=item[key];
                if(objIsArr(value)){
                    let vstr="[",v=0,vIsLast=false;
                    value.forEach(vi=>{
                        vIsLast=(++v)==value.length;
                        vstr+="\""+vi.replace(/\\/g,"\\\\")+"\""+(vIsLast?"":",");
                    });
                    vstr+="]";
                    ret+="    \""+key+"\":"+vstr+""+(isLast?"":",")+"\n";
                }else{
                    if(typeof value=="string"){
                        value=value.replace(/\\/g,"\\\\");
                    }
                    ret+="    \""+key+"\":\""+value+"\""+(isLast?"":",")+"\n";
                }
            }
            isLast=(++i)==len;
            ret+="  }"+(isLast?"":",")+"\n";
        });
        ret+="]";
        return ret;
    }

    function initRules(callback) {
        /*0 wedata格式，1 pagetual格式*/
        ruleUrls=[
            {
                id:0,
                url:'http://wedata.net/databases/AutoPagerize/items_all.json',
                type:0,
            },
            {
                id:1,
                url:'https://raw.githubusercontent.com/hoothin/UserScripts/master/Pagetual/pagetualRules.json',
                type:1
            }
        ];var i=0,j=0;

        ruleParser.initSavedRules(()=>{
            storage.getItem("importRuleUrl", data=>{
                if(data){
                    rulesData=data;
                    if(data.urls)ruleUrls=ruleUrls.concat(data.urls);
                    if(data.sort){
                        let urls=[];
                        data.sort.forEach(id=>{
                            for(let s=0;s<ruleUrls.length;s++){
                                if(id==ruleUrls[s].id){
                                    urls.push(ruleUrls[s]);
                                    break;
                                }
                            }
                        });
                        ruleUrls=urls;
                    }
                }
                storage.getItem("forceState_"+location.host, v=>{
                    storage.getItem("ruleLastUpdate", date=>{
                        forceState=v||0;
                        updateDate=date;
                        initConfig();
                        if(forceState==1)return;
                        let now=new Date().getTime();
                        if(!date || now-date>3*24*60*60*1000){
                            storage.setItem("ruleLastUpdate", now);
                            ruleUrls.forEach(rule=>{
                                ruleParser.addRuleByUrl(rule.url, rule.type, rule.id, ()=>{
                                    if(++i==ruleUrls.length){
                                        callback();
                                    }
                                })
                            });
                        }else{
                            callback();
                        }
                    });
                });
            });
        });
    }

    function requestDoc(url, callback){
        _GM_xmlhttpRequest({
            url: url,
            method: 'GET',
            overrideMimeType:"text/html;charset="+document.charset,
            onload: function(res) {
                var doc=null;
                try {
                    doc=document.implementation.createHTMLDocument('');
                    doc.documentElement.innerHTML=res.response;
                }
                catch (e) {
                    debug('parse error'+e.toString());
                }
                let pageElement=ruleParser.getPageElement(doc);
                //只有1的話怕不是圖片哦
                if(pageElement && (pageElement.length>1 || (pageElement.length==1 && pageElement[0].tagName!="IMG") )){
                    callback(pageElement);
                    ruleParser.insertPage(doc, pageElement, url);
                }else{
                    requestFromIframe(url, (doc, eles)=>{
                        callback(eles);
                        if(eles){
                            ruleParser.insertPage(doc, eles, url);
                        }
                    });
                }
            },
            onerror: function(e){
                debug(e);
                callback(false);
            }
        });
    }

    var failFromIframe=0;
    function requestFromIframe(url, callback){
        let orgPage,curPage;
        let iframe = document.createElement('iframe');
        iframe.name = 'pagetual-iframe';
        iframe.width = '100%';
        iframe.height = '0';
        iframe.frameBorder = '0';
        iframe.sandbox="allow-same-origin allow-scripts allow-popups allow-forms";
        iframe.style.cssText = 'margin:0!important;padding:0!important;visibility:hidden!important;';
        iframe.addEventListener("load", e=>{
            setTimeout(()=>{
                //可能會延遲加載
                try{
                    let doc=iframe.contentWindow.document;
                    let eles=ruleParser.getPageElement(doc, iframe.contentWindow);
                    if(eles && eles.length>0){
                        callback(doc, eles);
                    }else if(failFromIframe++ > 3){
                        failFromIframe=0;
                        isPause=true;
                        callback(false, false);
                    }else{
                        //isPause=true;
                        setTimeout(()=>{
                            callback(false, false);
                        },1000);
                    }
                }catch(e){
                    isPause=true;
                    callback(false, false);
                }
                document.body.removeChild(iframe);
            },300);
        });
        iframe.src=url;
        document.body.appendChild(iframe);
    }

    function initPage(){
        ruleParser.initPage(()=>{
            initListener();
            nextPage();
        });
    }

    function initView(){
        _GM_addStyle(`
         .pagetual_pageBar.stop {
           -webkit-filter: invert(100%);
           filter: invert(100%);
           opacity: 1;
         }
         .pagetual_pageBar.hide {
           display: none!important;
         }
         .pagetual_pageBar {
           opacity: 0.1;
         }
         .pagetual_pageBar:hover {
           opacity: 1;
         }
         .pagetual_pageBar>span {
           vertical-align: super;
         }

         .pagetual_pageBar>span>svg:hover {
           animation: touhouAni 1s infinite;
         }

         @keyframes touhouAni{
           from {transform: rotate(0deg) scale3d(1.2, 1.2, 1.2);}
                to {transform: rotate(360deg);}
         }
         @-webkit-keyframes touhouAni{
           from {transform: rotate(0deg) scale3d(1.2, 1.2, 1.2);}
                to {transform: rotate(360deg);}
         }
        `);
    }
    var loading=document.createElement("div");
    loading.style.cssText="display:none;cy: initial;d: initial;dominant-baseline: initial;empty-cells: initial;fill: initial;fill-opacity: initial;fill-rule: initial;filter: initial;flex: initial;flex-flow: initial;float: initial;flood-color: initial;flood-opacity: initial;grid: initial;grid-area: initial;height: initial;hyphens: initial;image-orientation: initial;image-rendering: initial;inline-size: initial;inset-block: initial;inset-inline: initial;isolation: initial;letter-spacing: initial;lighting-color: initial;line-break: initial;list-style: initial;margin-block: initial;margin: 0px auto;margin-inline: initial;marker: initial;mask: initial;mask-type: initial;max-block-size: initial;max-height: initial;max-inline-size: initial;max-width: initial;min-block-size: initial;min-height: initial;min-inline-size: initial;min-width: initial;mix-blend-mode: initial;object-fit: initial;object-position: initial;offset: initial;opacity: initial;order: initial;origin-trial-test-property: initial;orphans: initial;outline: initial;outline-offset: initial;overflow-anchor: initial;overflow-clip-margin: initial;overflow-wrap: initial;overflow: initial;overscroll-behavior-block: initial;overscroll-behavior-inline: initial;overscroll-behavior: initial;padding-block: initial;padding: initial;padding-inline: initial;page: initial;page-orientation: initial;paint-order: initial;perspective: initial;perspective-origin: initial;pointer-events: initial;position: initial;quotes: initial;r: initial;resize: initial;ruby-position: initial;rx: initial;ry: initial;scroll-behavior: initial;scroll-margin-block: initial;scroll-margin: initial;scroll-margin-inline: initial;scroll-padding-block: initial;scroll-padding: initial;scroll-padding-inline: initial;scroll-snap-align: initial;scroll-snap-stop: initial;scroll-snap-type: initial;scrollbar-gutter: initial;shape-image-threshold: initial;shape-margin: initial;shape-outside: initial;shape-rendering: initial;size: initial;speak: initial;stop-color: initial;stop-opacity: initial;stroke: initial;stroke-dasharray: initial;stroke-dashoffset: initial;stroke-linecap: initial;stroke-linejoin: initial;stroke-miterlimit: initial;stroke-opacity: initial;stroke-width: initial;tab-size: initial;table-layout: initial;text-align: initial;text-align-last: initial;text-anchor: initial;text-combine-upright: initial;text-decoration: initial;text-decoration-skip-ink: initial;text-indent: initial;text-overflow: initial;text-shadow: initial;text-size-adjust: initial;text-transform: initial;text-underline-offset: initial;text-underline-position: initial;touch-action: initial;transform: initial;transform-box: initial;transform-origin: initial;transform-style: initial;transition: initial;user-select: initial;vector-effect: initial;vertical-align: initial;visibility: initial;border-spacing: initial;-webkit-border-image: initial;-webkit-box-align: initial;-webkit-box-decoration-break: initial;-webkit-box-direction: initial;-webkit-box-flex: initial;-webkit-box-ordinal-group: initial;-webkit-box-orient: initial;-webkit-box-pack: initial;-webkit-box-reflect: initial;-webkit-highlight: initial;-webkit-hyphenate-character: initial;-webkit-line-break: initial;-webkit-line-clamp: initial;-webkit-mask-box-image: initial;-webkit-mask: initial;-webkit-mask-composite: initial;-webkit-perspective-origin-x: initial;-webkit-perspective-origin-y: initial;-webkit-print-color-adjust: initial;-webkit-rtl-ordering: initial;-webkit-ruby-position: initial;-webkit-tap-highlight-color: initial;-webkit-text-combine: initial;-webkit-text-decorations-in-effect: initial;-webkit-text-emphasis: initial;-webkit-text-emphasis-position: initial;-webkit-text-fill-color: initial;-webkit-text-security: initial;-webkit-text-stroke: initial;-webkit-transform-origin-x: initial;-webkit-transform-origin-y: initial;-webkit-transform-origin-z: initial;-webkit-user-drag: initial;-webkit-user-modify: initial;white-space: initial;widows: initial;width: initial;will-change: initial;word-break: initial;word-spacing: initial;x: initial;y: initial;z-index: 2147483647;";
    loading.innerHTML=`<p style=" display: block; position: initial; margin: auto auto 5px auto; shape-rendering: auto; vertical-align: middle; visibility: visible; width: initial; height: initial; text-align: center; color: #6e6e6e; ">${i18n("loadingText")}</p><svg width="120" height="30" viewBox="0 0 120 30" fill="#000000A0" style="display: block;position: initial;margin: auto;shape-rendering: auto;vertical-align: middle;visibility: visible;width: initial;height: initial;"><circle cx="15" cy="15" r="15"><animate attributeName="r" from="15" to="15" begin="0s" dur="0.8s" values="15;9;15" calcMode="linear" repeatCount="indefinite"></animate><animate attributeName="fill-opacity" from="1" to="1" begin="0s" dur="0.8s" values="1;.5;1" calcMode="linear" repeatCount="indefinite"></animate></circle><circle cx="60" cy="15" r="9" fill-opacity="0.3"><animate attributeName="r" from="9" to="9" begin="0s" dur="0.8s" values="9;15;9" calcMode="linear" repeatCount="indefinite"></animate><animate attributeName="fill-opacity" from="0.5" to="0.5" begin="0s" dur="0.8s" values=".5;1;.5" calcMode="linear" repeatCount="indefinite"></animate></circle><circle cx="105" cy="15" r="15"><animate attributeName="r" from="15" to="15" begin="0s" dur="0.8s" values="15;9;15" calcMode="linear" repeatCount="indefinite"></animate><animate attributeName="fill-opacity" from="1" to="1" begin="0s" dur="0.8s" values="1;.5;1" calcMode="linear" repeatCount="indefinite"></animate></circle></svg>`;
    document.body.appendChild(loading);

    var upSvg=`<svg style="position:absolute;cursor: pointer;margin: 0 -45px;width: 30px;height: 30px;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6364"><path d="M296 440c-44.1 0-80 35.9-80 80s35.9 80 80 80 80-35.9 80-80-35.9-80-80-80z" fill="#604b4a" p-id="6365"></path><path d="M960 512c0-247-201-448-448-448S64 265 64 512c0 1.8 0.1 3.5 0.1 5.3 0 0.9-0.1 1.8-0.1 2.7h0.2C68.5 763.3 267.7 960 512 960c236.2 0 430.1-183.7 446.7-415.7 0.1-0.8 0.1-1.6 0.2-2.3 0.4-4.6 0.5-9.3 0.7-13.9 0.1-2.7 0.4-5.3 0.4-8h-0.2c0-2.8 0.2-5.4 0.2-8.1z m-152 8c0 44.1-35.9 80-80 80s-80-35.9-80-80 35.9-80 80-80 80 35.9 80 80zM512 928C284.4 928 99 744.3 96.1 517.3 97.6 408.3 186.6 320 296 320c110.3 0 200 89.7 200 200 0 127.9 104.1 232 232 232 62.9 0 119.9-25.2 161.7-66-66 142.7-210.4 242-377.7 242z" fill="#604b4a" p-id="6366"></path></svg>`;
    var downSvg=`<svg style="position:absolute;cursor: pointer;margin: 0 15px;width: 30px;height: 30px;vertical-align: middle;fill: currentColor;overflow: hidden;transform: rotate(180deg);" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6364"><path d="M296 440c-44.1 0-80 35.9-80 80s35.9 80 80 80 80-35.9 80-80-35.9-80-80-80z" fill="#604b4a" p-id="6365"></path><path d="M960 512c0-247-201-448-448-448S64 265 64 512c0 1.8 0.1 3.5 0.1 5.3 0 0.9-0.1 1.8-0.1 2.7h0.2C68.5 763.3 267.7 960 512 960c236.2 0 430.1-183.7 446.7-415.7 0.1-0.8 0.1-1.6 0.2-2.3 0.4-4.6 0.5-9.3 0.7-13.9 0.1-2.7 0.4-5.3 0.4-8h-0.2c0-2.8 0.2-5.4 0.2-8.1z m-152 8c0 44.1-35.9 80-80 80s-80-35.9-80-80 35.9-80 80-80 80 35.9 80 80zM512 928C284.4 928 99 744.3 96.1 517.3 97.6 408.3 186.6 320 296 320c110.3 0 200 89.7 200 200 0 127.9 104.1 232 232 232 62.9 0 119.9-25.2 161.7-66-66 142.7-210.4 242-377.7 242z" fill="#604b4a" p-id="6366"></path></svg>`;
    var pageBarStyle=`box-shadow: 0px 0px 10px 0px #000000aa;border-radius: 20px;background-color: rgb(240 240 240 / 80%);visibility: visible; position: initial; width: auto; height: 30px; float: none; clear: both; margin: 20px auto; text-align: center; display: block;`;
    var pageTextStyle=`line-height: 30px;text-decoration: none;user-select: none;visibility: visible;position: initial;width: auto;height: auto;float: none;clear: both;margin: 0px auto;text-align: center;display: inline;font-weight: bold;font-style: normal;font-size: 16px;letter-spacing: initial;vertical-align: super;color: rgb(85, 85, 95);`;

    var isPause=false,isLoading=false,curPage=1,forceState=0;

    function changeStop(stop, hide){
        isPause=stop;
        [].forEach.call(document.querySelectorAll(".pagetual_pageBar"), bar=>{
            if(isPause){
                bar.classList.add("stop");
                if(hide)bar.classList.add("hide");
            }else{
                bar.classList.remove("stop");
                if(hide)bar.classList.remove("hide");
            }
        });
    }

    function initListener(){
        document.addEventListener('scroll', e=>{
            setTimeout(()=>{
                if(!isPause && !isLoading){
                    let scrolly=window.scrollY;
                    let windowHeight=window.innerHeight;
                    let scrollH=Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
                    if(scrollH-scrolly-windowHeight<1000){
                        nextPage();
                    }
                }
            },100);
        }, false);
        document.addEventListener('dblclick', e=>{
            changeStop(!isPause, true);
        });
    }

    function createPageBar(url){
        let insert=ruleParser.getInsert();
        if(!insert || !insert.parentNode)return;
        curPage++;
        let inTable=insert.tagName=="TR" || insert.previousElementSibling.tagName=="TR" || insert.tagName=="TBODY" || insert.previousElementSibling.tagName=="TBODY";
        let inLi=insert.tagName=="LI" || insert.previousElementSibling.tagName=="LI";
        let pageBar=document.createElement(inTable?"tr":"div");
        let upSpan=document.createElement("span");
        let downSpan=document.createElement("span");
        let pageText=document.createElement("a");
        pageBar.className="pagetual_pageBar";
        pageBar.id="pagetual_pageBar";
        if(isPause){
            pageBar.classList.add("stop");
        }
        pageBar.style.cssText=pageBarStyle;
        pageBar.title=i18n(isPause?"enable":"disable");
        upSpan.innerHTML=upSvg;
        upSpan.title=i18n("toTop");
        downSpan.innerHTML=downSvg;
        downSpan.title=i18n("toBottom");
        pageText.href=url;
        pageText.style=pageTextStyle;
        pageText.innerHTML="Page "+curPage;
        pageText.title=i18n("current");
        pageBar.appendChild(upSpan);
        pageBar.appendChild(pageText);
        pageBar.appendChild(downSpan);
        if(inTable){
            let example=(insert.tagName=="TR" || insert.tagName=="TBODY")?insert:insert.previousElementSibling;
            let tdNum=example.tagName=="TR"?example.children.length:example.querySelector("tr").children.length;
            pageBar.style.display="table-row";
            let td=document.createElement("td");
            td.colSpan=tdNum;
            td.appendChild(upSpan);
            td.appendChild(pageText);
            td.appendChild(downSpan);
            pageBar.appendChild(td);
        }

        upSpan.addEventListener("click", e=>{
            changeStop(true);
            document.body.scrollTop=0;
            document.documentElement.scrollTop=0;
            e.preventDefault();
            e.stopPropagation();
        });
        downSpan.addEventListener("click", e=>{
            changeStop(true);
            document.body.scrollTop=9999999;
            document.documentElement.scrollTop=9999999;
            e.preventDefault();
            e.stopPropagation();
        });
        pageBar.addEventListener("click", e=>{
            changeStop(!isPause);
            pageBar.title=i18n(isPause?"enable":"disable");
        });
        pageText.addEventListener("click", e=>{
            e.stopPropagation();
        });
        pageBar.style.width=parseInt(_unsafeWindow.getComputedStyle(insert.parentNode).width)*.9+"px";
        if(inLi){
            pageBar.style.width="auto";
            pageBar.style.minWidth="200px";
            let line=document.createElement("li");
            line.appendChild(pageBar);
            if(ruleParser.curSiteRule.insertPos==2){
                insert.appendChild(line);
            }else{
                insert.parentNode.insertBefore(line, insert);
            }
        }else{
            if(ruleParser.curSiteRule.insertPos==2){
                insert.appendChild(pageBar);
            }else{
                insert.parentNode.insertBefore(pageBar, insert);
            }
        }
        return pageBar;
    }

    var emuIframe;
    function emuPage(callback){
        let orgPage,curPage,iframeDoc,times=0;
        function checkPage(){
            if(times++ > 20){
                isPause=true;
                callback(false, false);
                return;
            }
            iframeDoc=emuIframe.contentDocument || emuIframe.contentWindow.document;
            let eles=ruleParser.getPageElement(iframeDoc, emuIframe.contentWindow);
            if(orgPage == eles[0]){
                setTimeout(()=>{
                    checkPage(iframeDoc);
                },500);
            }else{
                if(eles && eles.length>0){
                    callback(iframeDoc, eles);
                }else{
                    isPause=true;
                    callback(false, false);
                }
            }
        }
        if(!emuIframe){
            emuIframe = document.createElement('iframe');
            emuIframe.name = 'pagetual-iframe';
            emuIframe.sandbox="allow-same-origin allow-scripts allow-popups allow-forms";
            emuIframe.width = '100%';
            emuIframe.height = '0';
            emuIframe.frameBorder = '0';
            emuIframe.style.cssText = 'margin:0!important;padding:0!important;visibility:hidden!important;';
            emuIframe.addEventListener("load", e=>{
                setTimeout(()=>{
                    orgPage=ruleParser.getPageElement(iframeDoc, emuIframe.contentWindow)[0];
                    ruleParser.getNextLink(iframeDoc).click();
                    checkPage(iframeDoc);
                },300);
                iframeDoc=emuIframe.contentDocument || emuIframe.contentWindow.document;
            });
            emuIframe.src=location.href;
            document.body.appendChild(emuIframe);
        }else{
            iframeDoc=emuIframe.contentDocument || emuIframe.contentWindow.document;
            orgPage=ruleParser.getPageElement(iframeDoc, emuIframe.contentWindow)[0];
            ruleParser.getNextLink(iframeDoc).click();
            checkPage(iframeDoc);
        }
    }

    function forceIframe(url, callback){
        let curIframe = document.createElement('iframe');
        curIframe.name = 'pagetual-iframe';
        curIframe.sandbox="allow-same-origin allow-scripts allow-popups allow-forms";
        curIframe.frameBorder = '0';
        curIframe.scrolling="no";
        curIframe.style.cssText = 'display: block; visibility: visible; float: none; clear: both; width: 100%;height:0;background: initial; border: 0px; border-radius: 0px; margin: 0px 0px 2rem; padding: 0px; z-index: 2147483647;';
        curIframe.addEventListener("load", e=>{
            let iframeDoc=curIframe.contentDocument || curIframe.contentWindow.document;
            //let eles=ruleParser.getPageElement(iframeDoc, curIframe.contentWindow);
            //if(eles && eles.length>0){
            ruleParser.insertPage(iframeDoc, [], url);
            callback(curIframe, true);
            curIframe.style.height=iframeDoc.body.scrollHeight+"px";
            curIframe.style.width=iframeDoc.body.scrollWidth+"px";
            setTimeout(()=>{
                curIframe.style.height=iframeDoc.body.scrollHeight+"px";
                curIframe.style.width=iframeDoc.body.scrollWidth+"px";
            },300);
            //curIframe.scrollIntoView();
            /*}else{
                isPause=true;
                callback(false, false);
                curIframe.parentNode.removeChild(curIframe);
            }*/
        });
        curIframe.src=url;
        let insert=ruleParser.getInsert();
        document.body.appendChild(curIframe);
        return curIframe;
    }

    function nextPage(){
        if(isPause || isLoading)return;
        let nextLink=ruleParser.nextLinkHref;
        let insert=ruleParser.getInsert();
        if(nextLink && insert){
            let isJs=/^(javascript|#)/.test(nextLink);
            if(location.protocol=="https:" && /^http:/.test(nextLink)){
                nextLink=nextLink.replace(/^http/,"https");
            }
            isLoading=true;
            loading.style.display="";
            if(ruleParser.curSiteRule.pageElementByJs){
                var over=ele=>{
                    isLoading=false;
                    loading.style.display="none";
                    if(ele){
                        createPageBar(nextLink);
                        ruleParser.insertPage(null, ele, null);
                    }else{
                        isPause=true;
                    }
                };
                Function("over",'"use strict";' + ruleParser.curSiteRule.pageElementByJs)(over);
            }else if(ruleParser.curSiteRule.action==1 && !isJs){
                requestFromIframe(nextLink, (doc, eles)=>{
                    isLoading=false;
                    loading.style.display="none";
                    if(eles){
                        createPageBar(nextLink);
                        ruleParser.insertPage(doc, eles, nextLink);
                    }
                });
            }else if(forceState==2 && !isJs){
                forceIframe(nextLink, (iframe, eles)=>{
                    isLoading=false;
                    loading.style.display="none";
                    //if(eles){
                    let pageBar=createPageBar(nextLink);
                    iframe.parentNode.insertBefore(pageBar, iframe);
                    //}
                });
            }else{
                if(!isJs){
                    requestDoc(nextLink, (eles)=>{
                        isLoading=false;
                        loading.style.display="none";
                        if(eles){
                            createPageBar(nextLink);
                        }
                    });
                }else{
                    emuPage((doc, eles)=>{
                        isLoading=false;
                        loading.style.display="none";
                        if(eles){
                            createPageBar(nextLink);
                            ruleParser.insertPage(doc, eles, "");
                        }
                    });
                }
            }
        }
    }

    function init(){
        initView();
        initRules(()=>{
            initPage();
        });
    }
    init();
})();