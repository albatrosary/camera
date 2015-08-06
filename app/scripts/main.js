    var video = document.querySelector('video');
    var canvas = document.querySelector('canvas');
    var ctx = canvas.getContext('2d');
    var localMediaStream = null;
    var i = 0;

    //カメラ使えるかチェック
    var hasGetUserMedia = function() {
      return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia || navigator.msGetUserMedia);
    }
    //エラー
    var onFailSoHard = function(e) {
      console.log('エラー!', e);
    };

    //カメラ画像キャプチャ
    var snapshot = function() {
      if (localMediaStream) {
        ctx.drawImage(video, 0, 0);
        var imgarea = document.querySelectorAll('img');
        imgarea[i].src = canvas.toDataURL('image/webp');

        sessionStorage.setItem(i, canvas.toDataURL('image/webp'));

        var imgs = document.querySelector('#img');
        var newElement = document.createElement("img");

        imgs.appendChild(newElement);

        i = i + 1;
      }
    }

    if (hasGetUserMedia()) {
      console.log("カメラ OK");
    } else {
      alert("未対応ブラウザです。");
    }


    window.URL = window.URL || window.webkitURL;
    navigator.getUserMedia  = navigator.getUserMedia || navigator.webkitGetUserMedia ||
                  navigator.mozGetUserMedia || navigator.msGetUserMedia;

    navigator.getUserMedia({video: true}, function(stream) {
      video.src = window.URL.createObjectURL(stream);
      localMediaStream = stream;
    }, onFailSoHard);

    //ボタンイベント
    $("#capture").click(function() {
      snapshot();
    });
    $("#stop").click(function() {
      localMediaStream.stop();
    });
    $("video").click(function() {
      snapshot();
    });
