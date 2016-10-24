$(function() {
    $.getJSON("https://azurebootcamp2016.azurewebsites.net/api/categoryresults?category=Presenter", function(data) {
        var items = _.chain(data).sortBy(function(item){return item.count}).map(function(item) { return "<li>" + item.candidate + " (" + item.count + " votes)</li>"});
        $("<ul />", {
            html: items.join("")
        }).appendTo("body");
    });
});