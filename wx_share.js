
            WX_Custom_Share = function(){

                var xhr = null;
                var url = 'https://hellochaos.cn/index.php/action/wx-share?do=ajax-get';
                var formData = {
                    title: '书单',
                    parameter_type: 'page',
				    cid: '8',
                    signature_url: 'https://hellochaos.cn/douban.html'
                };

                this.init = function(){
                    if( window.XMLHttpRequest ){
                        xhr = new XMLHttpRequest();
                    }
                    else if( window.ActiveXObject ){
                        xhr = new ActiveXObject('Microsoft.XMLHTTP');
                    };

                    get_share_info();
                };
                function formatPostData( obj ){

                    var arr = new Array();
                    for (var attr in obj ){
                        arr.push( encodeURIComponent( attr ) + '=' + encodeURIComponent( obj[attr] ) );
                    };

                    return arr.join( '&' );
                };

                var wxapi = "https://res.wx.qq.com/open/js/jweixin-1.6.0.js", qqapi = "//open.mobile.qq.com/sdk/qqapi.js?_bid=152", qzapi = "//qzonestyle.gtimg.cn/qzone/phone/m/v4/widget/mobile/jsbridge.js?_bid=339";
                function require(url, onload) {
                  var doc = document;
                  var head = doc.head || (doc.getElementsByTagName("head")[0] || doc.documentElement);
                  var node = doc.createElement("script");
                  node.onload = onload;
                  node.onerror = function () {
                  };
                  node.async = true;
                  node.src = url[0];
                  head.appendChild(node);
                }
                
                function initWX(data) {
                  if (!data.WXconfig) {
                    return;
                  }
                  require([wxapi], function (wx) {
                    if (!wx.config) {
                      wx = window.wx;
                    }
                    var conf = data.WXconfig;
                    wx.config({ debug: false, appId: conf.appId, timestamp: conf.timestamp, nonceStr: conf.nonceStr, signature: conf.signature, jsApiList: ["updateTimelineShareData", "updateAppMessageShareData"] });
                    wx.error(function (res) {
                    });
                    wx.ready(function () {
                      var config = {
                        title: data.title, desc: data.summary, link: data.url, imgUrl: data.pic, type: "", dataUrl: "", success: function () {
                          data.callback && data.callback();
                        }, cancel: function () {
                        }
                      };
                      wx.updateTimelineShareData({
                        title: config.title, // 分享标题
                        link: config.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: config.imgUrl, // 分享图标
                        success: function () {
                          // 设置成功
                        }
                      })
                      wx.updateAppMessageShareData({
                        title: config.title,// 分享标题
                        desc: '', // 分享描述
                        link: config.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: config.imgUrl, // 分享图标
                        success: function () {
                          // 设置成功
                        }
                      })
                    });
                  });
                }

                function get_share_info(){

                    if( xhr == null ) return;

                    xhr.onreadystatechange = function(){
                        if( xhr.readyState == 4 && xhr.status == 200 ){

                            var data = eval('(' + xhr.responseText + ')');
                            if( data == null ){
                                return;
                            }
							//console.log(data);
                            var info = {
                                title: data.wx_title,
                                summary: data.wx_description,
                                pic: data.wx_image,
                                url: data.wx_url
                            };


                            //info.url = data.wx_url;


                            if( data.error ){
                                console.error( data.error );
                            } else if( data.appId ){
                                info.WXconfig = {
                                    swapTitleInWX: true,
                                    appId: data.appId,
                                    timestamp: data.timestamp,
                                    nonceStr: data.nonceStr,
                                    signature: data.signature
                                };

                            };

                            
                            initWX( info );
                        }
                    };

                    xhr.open( 'POST', url, true);
                    xhr.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded' );
                    xhr.send( formatPostData( formData ) );
                };

            };

            new WX_Custom_Share().init();
			console.log("%c", "padding:100px 200px;line-height:220px;background:url('https://hiphotos.baidu.com/feed/pic/item/b999a9014c086e06606a9d0009087bf40bd1cbbf.jpg') no-repeat;");
			console.log("%c WeChatShare v2.0  %c By Yuchao Huang https://hellochaos.cn ","color:#444;background:#eee;padding:5px 0;","color:#eee;background:#444;padding:5px 0;");