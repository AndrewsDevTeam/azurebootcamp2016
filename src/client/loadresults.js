$(function() {
    $.getJSON("https://azurebootcamp2016.azurewebsites.net/api/categoryresults?category=AzureService", function(data) {
        var items = _.chain(data).sortBy(function(item){return item.count}).map(function(item) { return "<li>" + item.candidate + " (" + item.count + " votes)</li>"}).value();
        console.log(items);
        $("div#AzureServiceResults").html(
            $("<ul />", {
                html: items.join("")
            })
        );
    });
    $.getJSON("https://azurebootcamp2016.azurewebsites.net/api/categoryresults?category=Superhero", function(data) {
        var items = _.chain(data).sortBy(function(item){return item.count}).map(function(item) { return "<li>" + item.candidate + " (" + item.count + " votes)</li>"}).value();
        console.log(items);
        $("div#SuperheroResults").html(
            $("<ul />", {
                html: items.join("")
            })
        );
    });
});