(function($){
    var apiEndpoint = 'http://104.214.149.33';

    $(function(){
        bindRemove();

        $("#createEventForm").validate({
            submitHandler: function() {
                submitCreateEventFrom();
            },
            rules: {
                eventName: {
                    required: true
                },
                eventCode: {
                    required: true  
                }
            },
            messages: {
                eventName: {
                    required: "此項目必填"
                },
                eventCode: {
                    required: "此項目必填"  
                }
            },
            errorElement: 'div',
            errorPlacement: function(error, element) {
                var placement = $(element).data('error');
                if (placement) {
                    $(placement).append(error)
                } else {
                    error.insertAfter(element);
                }
            }
        });

        // Add new option
        $('#addNewOption').click(function(event) {
            event.preventDefault();

            var optionHTML = '<li class="collection-item">'+
                    '<div>'+
                      '<input type="text" value="">'+
                      '<a href="#!" class="secondary-content pull-option"><i class="material-icons removeOptionBtn">close</i></a>'+
                    '</div>'+
                  '</li>';
            $('.event-options li:nth-last-child(2)').after(optionHTML);

            bindRemove();            
        });

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
            var body = {};

            $('#createEventForm').serializeArray().forEach(function(input) {
                body[input.name] = input.value;
            });

            var pullOptions = [];
            $('.event-options input').each(function(index) {
                pullOptions.push( {
                    opt_id: index,
                    opt_desc: $( this ).val() 
                });
            });
            body.opt = pullOptions;

            console.log('Results', body);

            

            // window.location = 'result.html';

            $.ajax({
                method: 'POST',
                url: apiEndpoint + '/event/add',
                data: body
            }).done(function(resonse) {
                console.log('response', resonse);
                localStorage.setItem('url', resonse.url);
                window.location = 'result.html';
            }).fail(function() {
                // TEST
                localStorage.setItem('url', 'http://localhost:3000/poll.html?id=uuid');
                window.location = 'result.html';
            });
        }

        function createEventSuccessCallback() {
            
        }
    }); // end of document ready
})(jQuery); // end of jQuery name space