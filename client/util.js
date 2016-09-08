export default {
    appendScrollingText: function(element, text) {
        let newText = document.createElement("p");
        element.append(newText);
        element.animate({
            scrollTop: element.get(0).scrollHeight
        }, 500)
        $(function(){
            $(newText).typed({
              strings: [text],
              typeSpeed: 0,
              showCursor: false
            });
        });
    }
}
