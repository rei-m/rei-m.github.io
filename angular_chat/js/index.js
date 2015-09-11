angular

  // モジュール読み込み
  .module('chatApp', ['firebase', 'ngRoute'])

  // プロパティセット
  .value('fbURL', 'https://fiery-fire-8368.firebaseio.com/chat/')

  // factoryセット（コントローラーでDIっぽく使える）
  .factory('Schema', function($firebase, fbURL) {
    return $firebase(new Firebase(fbURL));
  })

  // Rooting
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        controller:'registUserCtl',
        templateUrl:'view/regist.html'
      })
      .when('/chat/:userName', {
        controller:'chatCtl',
        templateUrl:'view/chat.html'
      })
      .otherwise({
        redirectTo:'/'
      });
  })

  // ユーザーの名前を登録するコントロール
  .controller('registUserCtl', function($scope, $location) {

    // チャット開始ボタン押下
    $scope.regist = function() {
      if($scope.name){
        // チャット画面へ
        $location.path('/chat/'+$scope.name);
      }else{
        alert('未入力やぞ！');
      }
    };
  })

  // Viewバインド時のイベントに介入
  .directive("messageList",function(){
    return function(scope, element, attrs){
      var _msg = scope.msg;
      var _re = /^(http|ftp):\/\/.+.(jpg|gif|png)$/;
      var _chkBody = _msg.body.toLowerCase();
      if(_re.test(_chkBody)){
        element[0].innerHTML = '<td class="ct_left">' + _msg.from + '<br><span class="ct_date">(' + _msg.date + ')</span></td><td class="ct_right"><img src="' + _msg.body + '"></td>';
      }
    };
  })

  // チャットを行うコントロール
  .controller('chatCtl', function($scope, $location, $routeParams, Schema) {

    // ユーザー名が未入力の場合はリダイレクト
    if(!$routeParams.userName){
      $location.redirectTo('/');
    }

    // 初期化
    $scope.msg = '';

    // 渡ってきたユーザー名をバインド
    $scope.inputName = $routeParams.userName;

    // 登録済みのチャット情報をバインド
    $scope.messages = Schema;

    // メッセージ入力
    $scope.addMessage = function(e) {

      // Enter以外はリターン
      if (e.keyCode != 13) return;

      // 何かしら入力されていたら登録
      if($scope.msg !== ''){

        var _date = new Date(),
            _year = _date.getFullYear(),
            _month = _date.getMonth() + 1,
            _day = _date.getDate(),
            _hour = _date.getHours(),
            _minute = _date.getMinutes(),
            _second = _date.getSeconds();

        $scope.messages.$add({
          from: $scope.inputName,
          body: $scope.msg,
          date: _year + '-' + _month + '-' + _day + ' ' + _hour + ':' + _minute + ':' + _second
        });

        // 入力が終わったら初期化
        $scope.msg = '';
      }
    };
  });
