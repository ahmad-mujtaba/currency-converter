$(document).ready(function(){
    $("#fromAmount").on("change", function(){
    
        amount = parseFloat($(this).val().trim());
        
        if(amount !== undefined && !isNaN(amount) && amount > 0) {
            $.get("getData.php", function(data){
                const result = amount * data.rates.INR;
                
                $("#toAmount").html(result);
                
                
                
            },"json");    
        } else {
            //error handling
        }
        
        
    });
    
    
});