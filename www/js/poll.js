(function($){
    var apiEndpoint = 'http://104.214.149.33/api';

    $(function(){



        $("#voteButton").click(function(event) {
            event.preventDefault();
            alert("voteButton pressed")
        });

        $("#adminButton").click(function(event) {
            event.preventDefault();
            console.log($("#passwordTextField"));
            var str = $("#passwordTextField").val()
            alert(str)
        });

        $("#addOptionButton").click(function(event) {
            event.preventDefault();
            var votersCount = 3
            var optionsCount = $(".poll-option-name").size()
            var previousIndex = optionsCount - 1
            console.log(previousIndex);
            console.log($("#option_" + previousIndex));

            if ($("#option_" + previousIndex).length && !$("#option_" + previousIndex).val()) {
                return false;
            }
            $("#tableBody").append('<tr>' +
                '<td class="poll-option-count">' + '0' + '</td>' +
                '<td class="poll-option-name">' +
                '<input id="option_'+ optionsCount +'" type="text" class="validate" placeholder="請輸入選項">' +
                '</td>' +
                '<td class="poll-checkbox">' +
                    '<p>' +
                        '<input type="checkbox" id="checkbox_' + optionsCount + '_0" />' +
                        '<label for="checkbox_' + optionsCount + '_0"></label> ' +
                      '</p>' +
                    '</td>' +
                    '<td></td>'.repeat(votersCount) +
                  '</tr>')
            bindCheckboxEvent()
        });

        function bindCheckboxEvent() {
            $('.poll-table input[type=checkbox]').change(function(){
                // console.log($(this).closest("tr").children(".poll-option-count"));
                var votesCount = parseInt($(this).closest("tr").children(".poll-option-count").text())
                if ($(this).is(":checked")) {
                    $(this).closest("tr").children(".poll-option-count").text(votesCount + 1)
                } else {
                    $(this).closest("tr").children(".poll-option-count").text(votesCount - 1)
                }
            })
        }

        // $("#checkbox1_1").prop("disabled", false);

    }); // end of document ready
})(jQuery); // end of jQuery name space