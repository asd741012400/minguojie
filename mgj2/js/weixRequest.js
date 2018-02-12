$.ajax({
    url: "http://mgjapi.qw1000.cn/Home/Wxshare/get_Sign",
    data : {
        url1 : window.location.href,
    },
    type: 'GET',
    success: function (data) {

        var {appId,timestamp,nonceStr,signature,title,link,imgUrl} = data.info
        //通过config接口注入权限验证配置
        wx.config({
            debug: false,
            appId: appId,
            timestamp: timestamp,
            nonceStr: nonceStr,   //生成签名的随机串
            signature: signature,  //签名
            jsApiList: ['chooseImage', 'uploadImage', 'downloadImage','onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ','onMenuShareWeibo','onMenuShareQZone']
        });  

    }
});

wx.ready(function(){ 
 
    wx.onMenuShareTimeline({  
      title: '点击查看你的前世是谁',  
      desc: '我的竟然是TA……',  
      link: 'http://mgj.qw1000.cn/mgj/guidance.html',
      imgUrl: 'http://mgj.qw1000.cn/mgj/images/fen_logo.png',
      trigger: function (res) { 
        alert(1231) 
      },  
      success: function (res) {  
        returnData();
      },  
      cancel: function (res) {  
            alert(456456) 
      },
      fail: function (res) {  
      }  
    });

    wx.onMenuShareAppMessage({
        title: '点击查看你的前世是谁', // 分享标题
        desc: '我的竟然是TA……', // 分享描述
        link: 'http://mgj.qw1000.cn/mgj/guidance.html', // 分享链接，该链接域名必须与当前企业的可信域名一致
        imgUrl: 'http://mgj.qw1000.cn/mgj/images/fen_logo.png', // 分享图标
        type: 'link', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: function () {
            returnData()
        },
        cancel: function () {
            alert(456456) 
        },
        trigger: function (res) { 
            alert(1231) 
        }, 
    });
    wx.onMenuShareQQ({
        title: '点击查看你的前世是谁', // 分享标题
        desc: '我的竟然是TA……', // 分享描述
        link: 'http://mgj.qw1000.cn/mgj/guidance.html', // 分享链接
        imgUrl: 'http://mgj.qw1000.cn/mgj/images/fen_logo.png', // 分享图标
        success: function () {
            returnData()
        },
        cancel: function () {
            alert(456456) 
        },
        trigger: function (res) { 
            alert(1231) 
        },
    });

    wx.onMenuShareWeibo({
        title: '点击查看你的前世是谁', // 分享标题
        desc: '我的竟然是TA……', // 分享描述
        link: 'http://mgj.qw1000.cn/mgj/guidance.html', // 分享链接
        imgUrl: 'http://mgj.qw1000.cn/mgj/images/fen_logo.png', // 分享图标
        success: function () {
            returnData()
        },
        cancel: function () {
            alert(456456) 
        },
        trigger: function (res) { 
            alert(1231) 
        },
    });

    wx.onMenuShareQZone({
        title: '点击查看你的前世是谁', // 分享标题
        desc: '我的竟然是TA……', // 分享描述
        link: 'http://mgj.qw1000.cn/mgj/guidance.html', // 分享链接
        imgUrl: 'http://mgj.qw1000.cn/mgj/images/fen_logo.png', // 分享图标
        success: function () {
            returnData()
        },
        cancel: function () {
            alert(456456) 
        },
        trigger: function (res) { 
            alert(1231) 
        },
    });

})



     
    
    
function wxChooseImage() {

    wx.chooseImage({
        count: 1,
        needResult: 1,
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (data) {
            localIds = data.localIds[0].toString(); // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
            $('.uploading div img').attr('src' , localIds)
            $('.uploading div img').css("display" , "block");
            $('.uploading div').css('background' , "none")
            wxuploadImage( localIds )
            
        },
        fail: function (res) {
        }

    });
}
function wxuploadImage(e) {
           
    wx.uploadImage({
        localId: e, // 需要上传的图片的本地ID，由chooseImage接口获得
        isShowProgressTips: 1, // 默认为1，显示进度提示
        success: function (res) {
            mediaId = res.serverId; // 返回图片的服务器端ID
            // wxdownloadImage(mediaId)

            $('#img').attr('value' , mediaId )
        },
        fail: function (error) {     
            picPath = '';
            localIds = '';
        }

    });
}



function returnData()
{
    $.ajax({
        type : "get",
        url : "http://mgjapi.qw1000.cn/Home/Wxshare/sharenum",
        data : {
            iData : "成功"
        },
        dataType : 'jsonp',
        success : function( data ){
            console.log( data )
        }

    })
}