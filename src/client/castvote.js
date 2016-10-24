$(function() {
    $("[data-category]").each(function() {
        $(this).bind("click", function() {
            var vote = {
                category: $(this).data("category"), 
                candidate: $(this).data("candidate")
            };
            $.ajax({
                type: "PUT",
                url: "https://azurebootcamp2016.azurewebsites.net/api/castvote",
                data: JSON.stringify(vote),
                contentType: "application/json"
            });
            return false;
        });
    });
});