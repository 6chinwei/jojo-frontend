(function($){
    
    $(function(){
        $("#voteButton").click(function(event) {
            event.preventDefault();
            var body = {
              "user_name": 'user_name',
              "user_sel": [1,2],
              "event_id": getUuid()
              // "opt":[
              // {
              //   "opt_id": int,
              //   "opt_desc": string
              // }]
            };

            // send request
            $.ajax({
                method: 'POST',
                url: apiEndpoint + '/event/vote',
                data: JSON.stringify(body),
                contentType: 'application/json'
            }).done(function(resonse) {
                // Success
                console.log('Success');
            }).fail(function(error) {
                // Error
                console.log(error);
                alert('喔喔！好像發生錯誤了呢');
            });
        });

        $("#adminButton").click(function() {
            var body = {
              "event_id": getUuid(),
              "pwd": $("#passwordTextField").val(),
            };

            // send request
            $.ajax({
                method: 'POST',
                url: apiEndpoint + '/event/login',
                data: JSON.stringify(body),
                contentType: 'application/json'
            }).done(function(resonse) {
                // Success
                console.log('Success');
            }).fail(function(error) {
                // Error
                if(error.responseText == 'invalid password') {
                    alert('密碼錯誤');    
                }
                else {
                    console.log(error);    
                    alert('喔喔！好像發生錯誤了呢');    
                }
            });
        });

        $("#addOptionButton").click(function(event) {
            event.preventDefault();
            var votersCount = 3
            var optionsCount = $(".poll-option-name").size();
            var previousIndex = optionsCount - 1;
            console.log(previousIndex);
            console.log($("#option_" + previousIndex));

            if ($("#option_" + previousIndex).length && !$("#option_" + previousIndex).val()) {
                return false;
            }
            $("#tableBody").append('<tr>' +
                '<td class="poll-option-count">' + '0' + '</td>' +
                '<td class="poll-option-name">' +
                '<input id="option_'+ optionsCount +'" type="text" class="validate center-align" placeholder="請輸入選項">' +
                '</td>' +
                '<td class="poll-checkbox background-grey">' +
                    '<p>' +
                        '<input type="checkbox" id="checkbox_' + optionsCount + '_0" />' +
                        '<label for="checkbox_' + optionsCount + '_0"></label> ' +
                      '</p>' +
                    '</td>' +
                    '<td></td>'.repeat(votersCount) +
                  '</tr>')
            bindCheckboxEvent();
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