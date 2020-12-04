
import signalR from './SignalR'
var wsSignalR = function (wsUrl) {
    //处理Signalr连接
    var _signalR = new signalR();
    wsSignalR.UseWebSocket = function (userId, eventFunc) {

        ///实例化一个对象
        _signalR.events.on("receive", function (message) {
            var data = JSON.parse(message);
            console.log(data);
            if (data.MessageType == 2) {
                var sendData = {
                    MessageType: "1",
                    SendObjectId: userId,
                    ReceiveObjectId: "0",
                    MessageBody: "ok"
                };
                var msg = JSON.stringify(sendData);
                _signalR.events.sendMessage(msg);
            }
            else if (data.MessageType == 3) {
                var res = JSON.parse(data.MessageBody);
                eventFunc(res);
            }
            else if (data.MessageType == 99) {
                console.log('1');
            }
        });
        _signalR.events.on("connection", function () {
            //消息格式
            console.log("连接成功");
        });
        _signalR.events.connection(wsUrl);
    };
    return wsSignalR;
};

//调用demo
// var _wsSignalR = new wsSignalR("ws://maymeng.mynatapp.cc/ChatHub");
// var _wsSignalR = new wsSignalR("wss://www.zixinhui.com/pay/ChatHub");
var _wsSignalR = new wsSignalR("wss://pay.zixinhui.com/ChatHub");
// _wsSignalR.UseWebSocket("1", function (res) {
//      //res= {
//      //    code: 0, //等于0 则表示该订单支付成功,大于0则表示支付不成功
//      //    msg: res.msg,// 结果提示信息
//      //    orderNo: orderNo //对应的订单号
//     //};
//     console.log(res);
// });

export default _wsSignalR
