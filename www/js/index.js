(function($){
    var apiEndpoint = 'http://104.214.149.33:8888';

    $(function(){
        bindRemove();

        // jQuery validation
        $("#createEventForm").validate({
            submitHandler: function() {
                submitCreateEventFrom();
            },
            rules: {
                event_name: {
                    required: true
                },
                pwd: {
                    required: true  
                }
            },
            messages: {
                event_name: {
                    required: "此項目必填"
                },
                pwd: {
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

        // Add new option
        $('#addNewOption').click(function(event) {
            // Can not add new option if previous input is empty
            // if(!$('.event-options li:nth-last-child(2) input').val()) {
            //     return false;
            // }

            event.preventDefault();
            var optionHTML = '<li class="collection-item">'+
                    '<div>'+
                      '<input type="text" value="">'+
                      '<a href="#!" class="secondary-content pull-option"><i class="material-icons removeOptionBtn">close</i></a>'+
                    '</div>'+
                  '</li>';
            $('.event-options li:nth-last-child(2)').after(optionHTML);

            // Bind event for new item
            bindRemove();            
        });

        // Bind event for click 'remove' icon
        function bindRemove() {
            $('.removeOptionBtn').click(function(event) {
                // Get index
                var index = $(this).closest('.collection-item').index();

                if(index > 0) {
                    $('.event-options .collection-item').eq(index).remove();    
                }
            });
        }

        function submitCreateEventFrom() {
            // HTTP request body
            var body = {};
            // options array
            var pullOptions = [];

            // Convert form data to JSON
            $('#createEventForm').serializeArray().forEach(function(input) {
                body[input.name] = input.value;
            });

            // Add options array to body
            $('.event-options input').each(function(index) {
                pullOptions.push( {
                    opt_id: index,
                    opt_desc: $( this ).val() 
                });
            });
            body.opt = pullOptions;

            // send request
            $.ajax({
                method: 'POST',
                url: apiEndpoint + '/event/add',
                data: body
            }).done(function(resonse) {
                // Success                
                
                // Save result in localStorage
                localStorage.setItem('url', resonse.url);

                // Redirect to result page
                window.location = 'result.html';
            }).fail(function() {
                // Error
                // alert('喔喔！發生錯誤了呢');

                // TEST
                localStorage.setItem('url', 'http://localhost:3000/poll.html?id=uuid');
                window.location = 'result.html';
            });
        }
    }); // end of document ready
})(jQuery); // end of jQuery name space