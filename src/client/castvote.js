$(function() {
    $("[data-category]").each(function() {
        $(this).bind("click", function() {
            var vote = {
                category: $(this).data("category"), 
                candidate: $(this).data("candidate")
            };
            console.log(vote);
            $.ajax({
                type: "PUT",
                url: "https://azurebootcamp2016.azurewebsites.net/api/castvote",
                data: JSON.stringify(vote),
                contentType: "application/json",
                success: function() {
                    location.reload();
                }
            });
        });
    });
});