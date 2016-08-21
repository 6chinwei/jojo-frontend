// update vote count after click the checkbox
function bindCheckboxEvent() {
    $('.poll-table input[type=checkbox]').unbind("change");
    $('.poll-table input[type=checkbox]').change(function(){
        var votesCount = parseInt($(this).closest("tr").children(".poll-option-count").text());
        if ($(this).is(":checked")) {
            $(this).closest("tr").children(".poll-option-count").text(votesCount + 1);
        } else {
            $(this).closest("tr").children(".poll-option-count").text(votesCount - 1);
        }
    });
}

// Click the edit icon over the user name
function bindClickEditVoteButton() {
    $('.voter i').unbind("click");
    $(".voter i").click(function(event){        
        var voterIndex = parseInt($(this).attr('id').split('_')[1]) + 1;
        var optionsCount = $(".poll-option-name").size();
        for (var i = 0; i < optionsCount; i++) {
            var checkBoxId = '#checkbox_' + i + '_' + voterIndex;
            $(checkBoxId).removeAttr('disabled');
        }
    });
}

(function($){
    $(function(){
        $('#pollForm').validate({
            submitHandler: function() {
                submitPollFrom();
            },
            rules: {
                yourName: {
                    required: true
                }
            },
            messages: {
                yourName: {
                    required: "此項目必填"
                }
            },
            errorElement: 'div',
            errorPlacement: function(error, element) {
                var placement = $(element).data('error');
                if (placement) {
                    $(placement).append(error);
                } else {
                    error.insertAfter(element);
                }
            }
        });

        function submitPollFrom(event) {
            var userSelectArray = [];
            $('.poll-checkbox input:checked').each(function() {
               userSelectArray.push(parseInt($(this).attr('id').split('_')[1]));
            });

            var optionsArray = [];
            $('.poll-option-name input').each(function() {
                optionsArray.push({
                    opt_id: $(this).attr('id').split('_')[1],
                    opt_desc: $(this).val()
                });
            });

            var body = {
              "user_name": $('#yourName').val(),
              "user_sel": userSelectArray,
              "event_id": getUuid(),
              "opt": optionsArray
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
                location.reload();
            }).fail(function(error) {
                // Error
                console.log(error);
                alert('喔喔！好像發生錯誤了呢');
            });
        }

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
                    alert('授權碼錯誤');    
                }
                else {
                    console.log(error);    
                    alert('喔喔！好像發生錯誤了呢');    
                }
            });
        });

        bindClickEditVoteButton();
        bindCheckboxEvent();

        $("#addOptionButton").click(function(event) {
            event.preventDefault();
            var votersCount = $(".voter").size()
            var optionsCount = $(".poll-option-name").size()
            var previousIndex = optionsCount - 1

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
                checkboxesHTML(optionsCount, votersCount) +
                '</tr>')
            bindCheckboxEvent();
        });

        function checkboxesHTML(optionsCount, votersCount) {
            var str = ''
            for (i=1; i<=votersCount; i++) {
                str += '<td class="poll-checkbox">'
                str += '<p>'
                str += '<input disabled="disabled" type="checkbox" id="checkbox_' + optionsCount + '_' + i + '"/>'
                str += '<label for="checkbox_' + optionsCount + '_' + i + '"/>'
                str += '</p>'
                str += '</td>'
            }
            console.log(str)
            return str
        }

    }); // end of document ready
})(jQuery); // end of jQuery name space