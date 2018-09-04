(function($) {
  var days = ['日', '月', '火', '水', '木', '金', '土'];
  var now = new Date();
  function getDateStr(date) {
    var month = date.getMonth() + 1;
    var day = date.getDate();
    return (
      date.getFullYear() +
      '-' +
      (month >= 10 ? month : '0' + month) +
      '-' +
      (day >= 10 ? day : '0' + day)
    );
  }

  $.addEventListener('DOMContentLoaded', function() {
    var main = $.forms.main;
    var from = main.from;
    var to = main.to;
    from.value = getDateStr(now);
    to.value = getDateStr(new Date(+now + 86400000));

    main.addEventListener('submit', function(event) {
      var s = from.value;
      var e = to.value;
      var text = main.text.value;
      a(s, e, text);
      event.preventDefault();
    });
  });

  function a(from, to, text) {
    var choseiText = [];
    var repeat = text.split('\n');
    var fromDate = Date.parse(from);
    var toDate = Date.parse(to);
    for (var i = fromDate; i <= toDate; i += 86400000) {
      var date = new Date(i);
      var datestr =
        date.getMonth() +
        1 +
        '/' +
        date.getDate() +
        '(' +
        days[date.getDay()] +
        ') ';
      for (var j = 0; j < repeat.length; j++) {
        var p = datestr + repeat[j];
        choseiText.push(p);
      }
    }
    var s = choseiText.join('\n');
    chrome.tabs.query({ currentWindow: true, active: true }, function(tab) {
      chrome.tabs.sendMessage(tab[0].id, { text: s });
    });
  }
})(document);
