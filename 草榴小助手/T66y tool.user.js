// ==UserScript==
// @name         草榴小助手
// @namespace    hoothin
// @version      0.6.1
// @description  草榴小助手修复，提供“加亮今日帖子”、“移除viidii跳转”、“图片自动缩放”、“种子链接转磁力链”、“预览整页图片”、“游客站内搜索”、“返回顶部”等功能！
// @author       NewType & hoothin
// @match        *://*.t66y.com/*
// @run-at       document-end
// @grant        none
// @license      MIT License
// ==/UserScript==

(function() {
    'use strict';

    var helper = {
        addCss: function(css) {
            var style = document.createElement('style');
            style.type = 'text/css';
            style.appendChild(document.createTextNode(css));
            document.getElementsByTagName('head')[0].appendChild(style);
        },
        addScript: function(js) {
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.appendChild(document.createTextNode(js));
            document.body.appendChild(script);
        },
        getCss: function(src) {
            var link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = src;
            document.getElementsByTagName('head')[0].appendChild(link);
        },
        getScript: function(src, onload) {
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.onload = onload;
            script.src = src;
            document.body.appendChild(script);
        },
        timeFormat: function(data, format) { // eg:data=new Data() eg:format="yyyy-MM-dd hh:mm:ss";
            var o = {
                'M+': data.getMonth() + 1,
                'd+': data.getDate(),
                'h+': data.getHours(),
                'm+': data.getMinutes(),
                's+': data.getSeconds(),
                'q+': Math.floor((data.getMonth() + 3) / 3),
                'S': data.getMilliseconds()
            };
            if (/(y+)/.test(format)) {
                format = format.replace(RegExp.$1, (data.getFullYear() + '').substr(4 - RegExp.$1.length));
            }
            for (var k in o) {
                if (new RegExp('(' + k + ')').test(format)) {
                    format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
                }
            }
            return format;
        },
        hash: function(url) {
            var hash = url.split('hash=');
            return hash[1].substring(3);
        },
        inurl: function(str) {
            var url = document.location.href;
            return url.indexOf(str) >= 0;
        }
    };

    /*-------------------------------------------------------------------------------------------------------------------------------------------*/
    var t66y = function() {
        if(typeof($) == "undefined")return;
        if (helper.inurl('/thread')) {
            // 高亮今天发表的帖子
            helper.addCss('.newTag{border-bottom:1px dotted red; color:red !important}.newPost{color:#ff5722; background:#fafff4;}.newPost a[target=_blank]{color:#5656ff;}');
            var today = new Date();
            today = helper.timeFormat(today, 'yyyy-MM-dd');
            $('tr.tr3').each(function() {
                var isToday = $(this).children('td').eq(2).find('div.f12').text().split(" ")[0];
                if (isToday === today || isToday == "今天") {
                    $(this).find('td:first').children().html('NEW').addClass('newTag');
                    $(this).addClass('newPost');
                }
            });
        }

        /*-------------------------------------------------------------------------------------------------------------------------------------------*/

        if (helper.inurl('/htm_data/')) {
            // 移除图片viidii跳转 & 图片自动缩放
            var imgList = new Array(0);
            var maxWidth = parseInt($("div#main").width() - 200) + 'px';
            $(document).ready(function() {
                $('img[ess-data]').each(function() {
                    $(this).off("click");

                    $(this).attr('onclick', 'window.open(this.src);').css('max-width', maxWidth);
                    if($(this).attr('src')){
                        imgList.push($(this).attr('src'));
                    }
                });
                if (imgList.length > 0) {
                    ImageView(imgList);
                }
            });

            // 移除a标签viidii跳转
            $("a[href*=\'.viidii.\']").each(function() {
                var href = $(this).attr('href');
                var newHref = href.replace('http://www.viidii.com/?', '').replace('http://www.viidii.info/?', '').replace(/______/g, '.').replace(/&z/g, '');
                $(this).attr('href', newHref);
            });
            $("a[href*=\'.redircdn.\']").each(function() {
                var href = $(this).attr('href');
                var newHref = href.replace('https://to.redircdn.com/?', '').replace(/______/g, '.').replace(/&z/g, '');
                $(this).attr('href', newHref);
            });

            // 种子链接转磁力链
            var torLink = $("a[href*=\'?hash\=\']");
            if( torLink.length > 0 ){
                var tmpNode = '<summary>本页共有 ' + torLink.length + ' 个磁力链！</summary>';
                torLink.each(function() {
                    var torrent = $(this).attr('href');
                    var hash = helper.hash(torrent);
                    var magnet = 'magnet:?xt=urn:btih:' + hash;
                    tmpNode += '<p><a target="_blank" href="' + magnet + '">【 磁力链:　' + magnet + ' 】</a>　　<a target="_blank" href="' + torrent + '">【 下载种子 】</a>　　<a target="_blank" href="http://apiv.ga/magnet/' + hash + '">【 九秒磁力云播 】</a></p>';
                });
                $('body').append('<div style="position:fixed;top:0px;background:#def7d4;width:100%;padding:4px;text-align:center;"><details>' + tmpNode + '</details></div>');
            }
        }

        /*-------------------------------------------------------------------------------------------------------------------------------------------*/

        // 预处理整页图片
        function ImageView(imgList) {
            helper.getCss('//cdn.jsdelivr.net/lightgallery/1.3.7/css/lightgallery.min.css');
            helper.getScript('//cdn.jsdelivr.net/picturefill/2.3.1/picturefill.min.js');
            helper.getScript('//cdn.jsdelivr.net/lightgallery/1.3.7/js/lightgallery.min.js');
            helper.getScript('//cdn.jsdelivr.net/g/lg-fullscreen,lg-thumbnail,lg-autoplay,lg-zoom');
            helper.getScript('//cdn.jsdelivr.net/mousewheel/3.1.13/jquery.mousewheel.min.js');

            helper.addCss('#viewer{max-width:1280px;margin:auto;display:none}#viewer > ul{margin-bottom:0;padding:0;column-count:5;-moz-column-count:5;-webkit-column-count:5;}#viewer > ul > li{-moz-page-break-inside: avoid; -webkit-column-break-inside: avoid; break-inside: avoid;float:left;margin-bottom:15px;margin-right:15px;width:240px;list-style-type:none}#viewer > ul > li a{border:3px solid #FFF;border-radius:3px;display:block;overflow:hidden;position:relative;float:left}#viewer > ul > li a > img{transition:transform .3s ease 0s;transform:scale3d(1, 1, 1);width:240px}#viewer > ul > li a:hover > img{transform:scale3d(1.1, 1.1, 1.1);opacity:.9}');
            $('div#main').before('<div id="viewer"><ul id="lightgallery" class="list-unstyled row"></ul></div>');

            var lightGallery = $('#lightgallery');
            $.each(imgList, function(i, n) {
                i++;
                lightGallery.append('<li data-src="' + n + '" data-sub-html="<h4>Image' + i + '</h4><p>' + n + '</p>"><a href=""><img class="img-responsive" src="' + n + '"></a></li>');
            });

            helper.addCss('.viewer{position:fixed; top:7px; right:7px; cursor:pointer;}');
            helper.addScript('function Viewer(){ $("#lightgallery").lightGallery(); $("html,body").animate({scrollTop:0}, 500); $("div#viewer,div#main,div#footer").fadeToggle(300); }');
            $('body').append(`<svg class="viewer" onmousedown="this.style.opacity=0;" onclick="Viewer();this.style.opacity=1;" title="预览整页图片" style="width: 50px;height: 50px;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1152 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6334"><path d="M871.125 433.75a119.85 119.85 0 1 0 0-239.66 119.85 119.85 0 0 0 0 239.66z m209.622-399.318H102.272c-38.955 0-69.93 31.701-69.93 70.656v817.067c0 38.954 30.975 70.656 69.93 70.656h978.475c38.954 0 69.93-31.702 69.93-70.656V105.088c0-38.955-30.976-70.656-69.93-70.656z m-257.28 493.44a42.837 42.837 0 0 0-31.958-15.488c-12.714 0-21.674 5.973-31.957 14.208l-46.677 39.467c-9.728 6.997-17.494 11.733-28.672 11.733a41.301 41.301 0 0 1-27.478-10.24 338.09 338.09 0 0 1-10.752-10.24L511.701 412.075a55.04 55.04 0 0 0-41.685-18.774c-16.725 0-32.213 8.278-41.941 19.499L112.213 793.643V143.53c2.475-16.982 15.702-29.227 32.683-29.227h892.928c17.237 0 31.19 12.757 32.213 29.952l0.726 649.899L823.38 527.872z" p-id="6335"></path></svg>`);
        }

        /*-------------------------------------------------------------------------------------------------------------------------------------------*/

        // 返回顶部
        $('body').append('<svg class="icon" onclick="$(document.body).animate({scrollTop:0},300);$(document.documentElement).animate({scrollTop:0},300);" title="返回顶部" style="position:fixed; bottom:20px; right:10px; cursor:pointer; width: 50px;height: 50px;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6473"><path d="M256 170.666667h512v85.333333H256z m213.333333 426.666666v256h85.333334v-256h213.333333l-256-256-256 256z" p-id="6474"></path></svg>');

        /*-------------------------------------------------------------------------------------------------------------------------------------------*/

        // 游客站内搜索
        $(function() {
            helper.addScript('(function(){var cx = "017632740523370213667:kcbl-j-fmok";var gcse = document.createElement("script");gcse.type = "text/javascript";gcse.async = true;gcse.src = "https://cse.google.com/cse.js?cx=" + cx;var s = document.getElementsByTagName("script")[0];s.parentNode.insertBefore(gcse, s);})();');
            helper.addCss('.gsrch{width:400px;float:right;margin:15px -25px 0 0;}.gsc-control-cse {background-color:#0f7884 !important;border:0 !important;padding:0 !important;}');
            $('.banner').append('<div class="gsrch"><gcse:search></gcse:search></div>');
        });
    };

    /*-------------------------------------------------------------------------------------------------------------------------------------------*/

    //helper.getScript('//cdn.staticfile.org/jquery/1.12.4/jquery.min.js', t66y);
    t66y();
})();