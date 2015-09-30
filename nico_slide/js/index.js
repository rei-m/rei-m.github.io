$(function(){

  var commentArea = document.getElementById('main-slide');

  var $slideArea = $('#main-slide');
  var mo = new MutationObserver(function(mutationRecords){

    console.dir(mutationRecords);

    if(mutationRecords[0].addedNodes.length === 0) {
      return;
    }

    var moveWidth = ($slideArea.width() - 0) * 1.5;
    var yPos = Math.floor( Math.random() * $slideArea.height() );

    var el = mutationRecords[0].addedNodes[0];
    el.style.right = '-' + el.offsetWidth + 'px';
    el.style.top = yPos + 'px';
    el.style.webkitTransform = 'translate(-' + moveWidth + 'px, 0px)';
    el.style.webkitTransitionDuration = '10s';
    setTimeout(function() {
      commentArea.removeChild(el);
    }, 10000);

  });
  mo.observe($slideArea[0], {childList:true, attributes: false, attributeOldValue: false});

  messageDataStore.on('push', function(pushed) {

    var el = document.createElement('div');
    el.className = 'comment';
    el.innerHTML = pushed.value.content;
    commentArea.appendChild(el);

// var image = "http://33.media.tumblr.com/0812c2f2a5aaa0456243cad84ff93a51/tumblr_muolwfW8Hu1re64ggo1_500.gif";
// var $image = $('<img />', {
//   src: image,
//   class: 'comment'
// });
//     $slideArea.append($image);

    console.dir(pushed);
  });
});
