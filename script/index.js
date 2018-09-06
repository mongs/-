var FNPhotograph = null;
var map = null;
apiready = function(){
  var header = $api.byId('header');
  $api.fixStatusBar(header);
  FNPhotograph = api.require('FNPhotograph');
  map = api.require('bMap');
  getLocation();
};

// 单次地理定位
function getLocation() {
  map.getLocation({
    accuracy: '10m',
    autoStop: true,
    filter: 1
  }, function(ret, err) {
    if (ret.status) {
      getNameFromCoords(ret.lon, ret.lat);
    } else {
      alert(err.code);
    }
  });
}

// 反向定位地址
function getNameFromCoords(lon, lat) {
  alert(lon + ';' + lat);
  map.getNameFromCoords({
    lon: lon,
    lat: lat,
  }, function(ret, err) {
    alert(JSON.stringify(ret));
    alert(JSON.stringify(err));
      if (ret.status) {
          alert(JSON.stringify(ret));
      }
  });
}

// 打开拍照
function openPhotograph() {
  var photosSrc = [];
  FNPhotograph.open({
    path: 'fs://photos',
    album: true ,
    quality: 'medium',
  }, function(ret){
    if (ret.eventType === 'takePhoto') {
      photosSrc.push(ret.imagePath);
    } else if (ret.eventType === 'close') {
      renderPhotos(photosSrc);
    }
  });
}

// 渲染预览图片
function renderPhotos(photosSrc) {
  var str = '';
  var photosWrap = $api.byId('photos-wrap');
  photosSrc.forEach(function(item) {
    str += '<li class="photo-wrap"><img class="photo" src="' + item + '"></li>' 
  })
  photosWrap.innerHTML += str;
}