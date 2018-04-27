(function () {
    var days = ["日", "月", "火", "水", "木", "金", "土"];
    var now = new Date();
    function getDateStr(date) {
        return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    }

    document.addEventListener("DOMContentLoaded", function () {
        var main = document.forms.main;
        var fromInit = main.from;
        var toInit = main.to;
        fromInit.value = getDateStr(now);
        toInit.value = getDateStr(new Date(+now + 86400000));

        main.addEventListener("submit", function (e) {
            var from = main.from.value;
            var to = main.to.value;
            var text = main.text.value;
            a(from, to, text);
            e.preventDefault();
        });
    });

    function a(from, to, text) {
        var choseiText = [];
        var repeat = text.split("\n");
        var fromDate = Date.parse(from);
        var toDate = Date.parse(to);
        for (var i = fromDate; i <= toDate; i += 86400000) {
            var date = new Date(i);
            var datestr = (date.getMonth() + 1) + "/" + date.getDate() + "(" + days[date.getDay()] + ") ";
            for (var j = 0; j < repeat.length; j++) {
                var p = datestr + repeat[j];
                choseiText.push(p);
            }
        }
        var s = choseiText.join("\n");
        chrome.tabs.query({ currentWindow: true, active: true }, function (tab) {
            chrome.tabs.sendMessage(tab[0].id, { text: s });
        })
    }
})();