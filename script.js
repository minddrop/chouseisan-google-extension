(function($) {
  chrome.runtime.onMessage.addListener(function(msg, sender) {
    $.getElementById('kouho').value = msg.text;
  });
})(document);

// author: https://gist.github.com/yuru4c/0069ce5724db34c9085ffe2d51b23611
(function($) {
  var e = $.getElementsByClassName('schedule');
  var a = e[0].style,
    b = e[1].style;

  var s = $.createElement('button');
  s.onclick = function() {
    a.display = 'none';
    b.display = 'table';
    var t = a;
    a = b;
    b = t;
  };
  s.appendChild($.createTextNode('行と列を切り替え'));

  var h = $.querySelector('.event-choice-table-header-div *');
  h.appendChild($.createTextNode(' '));
  h.appendChild(s);
})(document);
