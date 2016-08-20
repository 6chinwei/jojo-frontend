(function($){
    var apiEndpoint = 'http://104.214.149.33/api';

    $(function(){
        bindRemove();

        $("#createEventForm").validate({
            submitHandler: function(form) {
                // some other code
                // maybe disabling submit button
                // then:
                console.log('submit');
                $(form).submit();
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
                      '<a href="#!" class="secondary-content"><i class="material-icons removeOptionBtn">close</i></a>'+
                    '</div>'+
                  '</li>';
            $('.event-options li:nth-last-child(2)').after(optionHTML);

            bindRemove();            
        });

        function bindRemove() {
            $('.removeOptionBtn').click(function(event) {
                // Get index
                var index = $(this).closest('.collection-item').index();
                console.log(index);
                if(index > 0) {
                    $('.event-options .collection-item').eq(index).remove();    
                }
            });
        }

        function validateCreateEventForm() {
            var isValid = true;


            if($('eventName').val() === '' || $('eventName').val() === null) {
                isValid = false;
            }
            
            if($('eventName').val() === '' || $('eventName').val() === null) {

            }
            $('eventCode')
            
            return true;
        }

        function submitCreateEventFrom(form) {
            $.ajax({
                url: apiEndpoint,
                data: form
            }).done(function() {

            }).fail(function() {

            });
        }

    }); // end of document ready
})(jQuery); // end of jQuery name space