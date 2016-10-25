$(function() {
    $.getJSON("https://azurebootcamp2016.azurewebsites.net/api/categoryresults?category=Presenter", function(data) {
        var items = _.chain(data).sortBy(function(item){return item.count}).map(function(item) { return "<li>" + item.candidate + " (" + item.count + " votes)</li>"}).value();
        console.log(items);
        $("div#presenterResults").html(
            $("<ul />", {
                html: items.join("")
            })
        );
    });
    $.getJSON("https://azurebootcamp2016.azurewebsites.net/api/categoryresults?category=Participant", function(data) {
        var items = _.chain(data).sortBy(function(item){return item.count}).map(function(item) { return "<li>" + item.candidate + " (" + item.count + " votes)</li>"}).value();
        console.log(items);
        $("div#participantResults").html(
            $("<ul />", {
                html: items.join("")
            })
        );
    });
});