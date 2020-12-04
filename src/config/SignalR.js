var signalR = function () {
    let recordCode = 0x1e;
    let recordString = String.fromCharCode(recordCode);

    let _events = new Array();
    //初始化相关事件
    //消息发送事件
    _events['send'] = function (obj) {
        console.log(obj);
    };
    //消息接收事件
    _events['receive'] = function (message) {
        console.log(message);
    };
    //连接事件
    _events['connection'] = function (message) {
        console.log(message);
    };
    //连接关闭事件
    _events['close'] = function () {
        console.log('连接已经关闭');
    };
    //连接异常处理事件
    _events['error'] = function (ex) {
        console.log(ex);
    };
    //定义连接
    var _webSocket = null;
    var isConnectioned = false;
    signalR.events = {
        //事件绑定
        on: function (eventName, eventMethod) {
            if (_events[eventName] != null && _events[eventName] != undefined) {
                _events[eventName] = eventMethod;
            }
        },
        //连接方法
        connection: function (url) {
            let self = this;
            if (_webSocket == null) {
                _webSocket = new WebSocket(url);
                //打开连接
                _webSocket.onopen = function () {

                    let handshakeRequest = {
                        protocol: 'json',
                        version: 1
                    };
                    let senddata = `${JSON.stringify(handshakeRequest)}${recordString}`;
                    self.isConnectioned = true;
                    _webSocket.send(senddata);
                    isConnectioned = true;
                    _events['connection']();
                };
                //消息接收
                _webSocket.onmessage = function (res) {
                    try {
                        let jsonstr = String(res.data).replace(recordString, '');
                        if (jsonstr.indexOf('{}{') > -1) {
                            jsonstr = jsonstr.replace('{}', '');
                        }
                        let obj = JSON.parse(jsonstr);
                        //当收到返回消息type=1（调用方法）
                        if (obj.type == 1) {
                            _events['receive'](obj.arguments[0]);
                        }
                    } catch (ex) {
                        console.log('异常：' + ex);
                        console.log('收到服务器内容：' + res.data);
                    }
                };
                _webSocket.onclose = function () {
                    _webSocket = null;
                    isConnectioned = false;
                    _events['close']();
                };
                _webSocket.onerror = function (ex) {
                    isConnectioned = false;
                    _events['error'](ex);
                };

            }
        },
        abortConnection: function () {
            if (_webSocket != null) {
                _webSocket.close();
            }
        },
        sendMessage: function (data) {
            // let self = this;
            if (!isConnectioned) {
                _events['error']('未连接');
                return;
            }
            let args = new Array();
            args.push(data);
            let body = {
                arguments: args,   //SignalR服务端接收时必须为数组参数
                target: 'ServerTransferMessage',        //SignalR端方法
                type: 1,
            };
            //发送的数据，分隔符结尾：
            let senddata = `${JSON.stringify(body)}${recordString}`;
            _webSocket.send(senddata);
        }
    }
    return signalR;
};

export default signalR