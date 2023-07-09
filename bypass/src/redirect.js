var valid_urls = ["https"]
var gif = document.getElementById("mainGif");
var message = document.getElementById("mainMessagePara");
var cssStyleFile = document.querySelector("link[href='src/style.css']");
var redirectUrl = "https://12ft.io/";


function checkValidUrl(currentUrl, valid_urls){
    isValid = false;
    for (var i = 0; i < valid_urls.length; i++) {
        // console.log(whitlist_urls[i])
        if (currentUrl.includes(valid_urls[i])) {
            isValid = true;
          };
    };
    return isValid
};

document.addEventListener("DOMContentLoaded", function () {
    // Get the current tab's URL
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var currentUrl = tabs[0].url;

        // validate if paywall can be bypassed
        var isValid = checkValidUrl(currentUrl, valid_urls);

        if (isValid==true) {
            var newUrl = redirectUrl + currentUrl;
            // Redirect the current tab to the new URL
            setTimeout(function() {
                chrome.tabs.update({ url: newUrl });;
            }, 1500);
        } else {
            // Update the gif and message if not a valid url to bypass
            message.textContent = "This is out of my reach :0";
            gif.src = "assets/doge.gif";
        
            // CSS styles applied to the image are not immediately reflected; to fix that
            cssStyleFile.href = "src/style.css"; 
        };
    });
});
  