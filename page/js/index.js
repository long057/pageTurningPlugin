

(function ($) {

    function Index(option) {
        this.father = option.father;
        this.totalPage = option.totalPage;
        this.curPage = option.curPage;
        this.backFun = option.backFun;
        this.flag = true;
        if (this.totalPage < this.curPage) {
            alert('请输入正确的页数');
        }
        this.renderPage();
    }

    Index.prototype.renderPage = function () {
        var totalPage = this.totalPage;
        var curPage = this.curPage;
        var self = this;
        var $w = this.father;

        $w.empty();
        // 上一页
        if(curPage > 1) {
            $w.append($('<a class="prevPage">上一页</a>'))
        } else if( curPage == 1) {
            $w.append($('<span class="disabled">上一页</span>'))
        }
        // 第一页
        if(curPage - 2 > 1) {
            $w.append($('<a href="" class="num">1</a>'))
        }

        // 省略号
        if (curPage > 4) {
            $w.append($('<span class="spacing">...</span>'))
        }

        // 中间显示5个数字
        var start = curPage - 2;
        var end = curPage + 2;

        for(; start <= end; start ++) {
            if(start >= 1 && start <= totalPage) {
                if(start == curPage) {
                    $w.append($('<a href="" class="curPage">' + start + '</a>'));
                } else {
                    $w.append($('<a href="" class="num">' + start + '</a>'));
                }
            }
        }

        // 省略号
        if(curPage <= totalPage - 4) {
            $w.append($('<span class="spacing">...</span>'))
        }

        // 最后一页
        if(curPage + 2 < totalPage) {
            $w.append($('<a href="" class="num">' + totalPage + '</a>'))
        }

        // 下一页
        if(curPage == totalPage) {
            $w.append($('<span class="disabled">下一页</span>'))
        } else {
            $w.append($('<a class="nextPage">下一页</a>'))
        }

        this.bindEvent();
    }

    Index.prototype.bindEvent = function () {
        var self = this;
        var $w = this.father;
        $w.find('.prevPage').on('click', function (e) {
            e.preventDefault();
            self.curPage -- ;
            self.renderPage();
        }).end().find('.nextPage').on('click', function (e) {
            e.preventDefault();
            self.curPage ++;
            self.renderPage();
        }).end().on('click', '.num', function (e) {
            e.preventDefault();
            self.curPage = +$(this).text();
            self.renderPage();
        })
    }

    $.fn.extend({
        createPageTurn : function (option) {
            option.father = this;
            $.extend({
                totalPage: 5,
                curPage: 1,
                backFun: function () {

                }
            }, option)
            new Index(option);
            return this;
        }
    })
})(jQuery)

/**
 * status
 * 200 成功
 * 301 临时重定向  302 永久重定向 304 资源为被修改
 * 404 文件没有
 * 500 服务器端错误
 *
 * 缓存
 * 1。 第一次发送请求，服务器返回资源会同时返回，e-tag 和 last-Modified 值 来标记资源
 * 2.  第二次发送请求， 客户端会将if-None-Match 和 if-modified-since中发送给服务器
 * 3。 服务器将收到的值 进行比对，如果没有更改过资源，则会返回304告诉浏览器，资源位未被修改可以使用缓存资源
 *
 * 响应头中字段含义
 * cache-control: max-age=123546  最大缓存时间
 * no-cache 不使用缓存内容
 * no-store
 * max-fresh 最小时间
 * max-state  超出缓存时间后多长时间仍然可以使用
 * expires  缓存时间
 * referer   用于统计网站从哪个网站点击过来的
 * cache-control 和 expires 都设置，expires会覆盖cache-control
 *
 *
 * response header
 *
 * accpet-ranges: '',
 * age: '',
 * cache-control: max-age=123456,
 * content-type: application/javascript
 * content-length: '',
 * content-encoding: gzip;
 * date: '',
 * expires: '',
 * e-tag: '',
 * last-modified: '',
 * referrer: '',
 * status: 200
 *
 *
 * requestHeader
 *
 * requestUrl: '',
 * requestMethod: 'get post,
 * status code: 200,
 * remote address: '',
 * referrer policy: unsafe-url
 * user-agent: '' 浏览器信息
 *
 * request header
 * 请求行 post url http/1,1
 * 请求头
 * accept: '',
 * referrer:  ,
 * accept-language: zh-cn,
 * user-agent: '',
 * content-type: application/x-www-form-urlencoded,
 * host: 域名+端口
 * content-length: '',
 * connection: keep-alive,
 * cache-control: no-cache
 * cookie:
 * 请求体
 * data值  -- post有请求体  get没有请求体 data拼接在url之后
 *
 * get post put delete options
 *
 * request header
 * get url http1.1
 *
 * accept:
 * referrer: 从哪个页面跳转过来的
 * accept-language;
 * content-type
 * connection 长连接
 * cache-control: no-chache
 * content-length:
 * host: '', 主机端口
 * user-agent:, 浏览器信息
 * cookie: 自带的cookie
 * if-none-match  e-tag值
 * if-last-modified  最后更改资源时间
 * origin: 由哪个页面发送的请求
 *
 *
 * response Header
 * http 1.1 200 Ok  --
 * 200 成功
 * 301 临时重定向 302 永久重定向 304 重定向到缓存，资源为被修改
 * 403 禁止请求的地址  404 资源为找到
 * 500 服务器不可用  502 503
 * http1.1  status  status meaning
 *
 * 响应头
 * server: 服务器信息
 * content-type:
 * content-length
 * content-encoding
 * cache-control: max-age=,
 * expires:
 * e-tag:
 * last-modified:
 * referrer
 * date:
 * age:
 * accept-ranges:
 *
 *
 * cache-control  后台设置的，关于缓存的
 * cache-control:
 * max-age=123  最大缓存时 在这个时间内直接走缓存
 * no-cache 不缓存
 * no-store 请求和响应都不缓存
 * min-fresh
 * max-state  超过max-age多长时间内仍然可以使用缓存
 * expires  会被max-age覆盖
 *
 * 请求返回后
 * 会有cache-control字段，告诉浏览器在多长时间内可以直接使用缓存的数据
 * cache-control: no-cache  告诉浏览器不要进行缓存
 * cache-control: no-store  告诉浏览器重要信息不要进行缓存，下次直接重新发送请求
 * cache-control: max-state=90214  在max-age时间过后多久，仍然可以使用缓存
 * expires: '', 不是写在cache-control中的，会被cache-control 中的max-age覆盖掉
 *
 *
 * jsonp 跨域
 * 浏览器有同源策源的概念  协议 、域名、端口都相同
 * jsonp动态创建script标签，script的src不受同源策源的限制 ，将url放在src中 ，
 * 并且创建好数据处理的函数，将函数名传给后台，后台以函数执行的形式返回，数据放在实参里
 *
 * jsonp是一个get请求
 *
 */


