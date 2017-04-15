App = {
    
    init        : function() {
                    $.blockUI();
                    var $app = this;
                    $.get($app.data.currencyUrl, function(data){
                        $app.data.currencies = data;
                        $app.helpers.populateCurrencyList($app.data.currencies);
                        
                        $.get($app.data.conversionRatesUrl, function(data){
                            $app.data.conversionData = data;                            
                            $.unblockUI();
                        }, "json");
                        
                    }, "json");
                    
                    $app.helpers.bindEvents($app);
        
                },
                
    data        : {
                    currencyUrl         :   "https://openexchangerates.org/api/currencies.json",
                    conversionRatesUrl  :   "getConversionRates.php"
        
                },
    controllers : {
                    doConversion : function($app){
        
                        $("#result").html("<div class='loading'>Loading...</div>");
                        $(".error").removeClass("error");
                        
                        var errorStr = "";
                        var errorEl = [];
                        
                        var amount = parseFloat($("#amount").val().trim());
                        var sourceCurrency = $("#sourceCurrency").val().trim().toUpperCase();
                        var destCurrency = $("#destCurrency").val().trim().toUpperCase();
                        
                        if($app.data.currencies === undefined || $app.data.conversionData === undefined) {
                            errorStr += "An error occurred while loading currencies and rates. Please try again. <br>";
                        }
                        
                        if(amount === undefined || isNaN(amount) || amount < 0) {
                            errorStr += "Please enter a valid amount <br>";
                            errorEl.push(".amountEl");
                        }
                        
                        if(sourceCurrency === undefined || sourceCurrency.length === 0 || $app.data.currencies[sourceCurrency] === undefined) {
                            errorStr += "Please enter a valid source currency <br>";
                            errorEl.push(".sourceEl");
                        }
                        
                        if(destCurrency === undefined || destCurrency.length === 0 || $app.data.currencies[destCurrency] === undefined) {
                            errorStr += "Please enter a valid destination currency <br>";
                            errorEl.push(".destEl");
                        }
                        
                        if(errorStr === "") {            
                            const result = amount * ($app.data.conversionData.rates[destCurrency] / $app.data.conversionData.rates[sourceCurrency]) ;            
                            $("#result").html(amount+" "+sourceCurrency+" equals "+result+" "+destCurrency);            
                            
                        } else {
                            $("#result").html("<div class='errorMsg'>"+errorStr+"</div>");
                            $.each(errorEl, function(i, v) {
                                $(v).addClass('error');    
                            });
                        }
                        
                        
                    }
                },
    helpers     : {
                    bindEvents : function($app) {
                        var doConversionWrapper = function() {
                            $app.controllers.doConversion($app);
                        };
                        $("button#convert").on("click", doConversionWrapper);
                        $("#amount, #sourceCurrency, #destCurrency").on("change", doConversionWrapper);
                    },
                    
                    populateCurrencyList : function(data) {
                        var dataListOptions = "";
                        for(var currency in data) {
                            if(data.hasOwnProperty(currency)) {
                                var tmp = currency +" - "+data[currency];                
                                dataListOptions+="<option value='"+currency+"'>"+tmp+"</option>";
                            }
                        }
                        
                        $("datalist#currencies").html(dataListOptions);
                    }
                }
    
};


$(document).ready(function(){    
    App.init();    
});
