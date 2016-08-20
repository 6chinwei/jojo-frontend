(function($){

    $(function(){
        $("#copyToClipboard").click(function() {
            var url = document.querySelector("#url");  
            var range = document.createRange();  
            range.selectNode(url);  
            window.getSelection().addRange(range);  
             
            try {  
                var successful = document.execCommand("copy");  
                alert('網址已複製到你的剪貼簿');
            } catch(err) {  
                console.log("Oops, unable to copy");  
            }  
             
            window.getSelection().removeAllRanges();  
        });

        $('#goToPoll').click(function() {
            var url = localStorage.getItem('url');
            $(this).prop('href', url);
        });
    }); // end of document ready
})(jQuery); // end of jQuery name space