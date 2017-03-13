function changeCss(customCss){
	//replace current style with customCss string
	$("<style>" + customCss +"</style>").replaceAll("style");
}

function init(){
	//add tabbing functionality to text area
	$("textarea").keydown(function(e) {
    if(e.keyCode === 9) { // tab was pressed
        // get caret position/selection
        var start = this.selectionStart;
        var end = this.selectionEnd;

        var $this = $(this);
        var value = $this.val();

        // set textarea value to: text before caret + tab + text after caret
        $this.val(value.substring(0, start)
                    + "/t"
                    + value.substring(end));

        // put caret at right position again (add one for the tab)
        this.selectionStart = this.selectionEnd = start + 1;

        // prevent the focus lose
        e.preventDefault();
    }
	});

	//add syntax hightlighting to textarea
      var editor = CodeMirror.fromTextArea( document.getElementById("customCss"), {
        theme: "night",
        tabSize: 2
      });

	//add event handler to button
	$("#changeCss").on("click", function(){
		var customCss = editor.getValue();

        //transition and change css
        $("#payForm").fadeTo(750, 0, function(){
            changeCss( customCss );    
        });
        
        $("#payForm").fadeTo(750, 1);
	})	

	//remove loading div
	$( document ).ready(function() {
    $(".loading-wrap").fadeOut(2000, function() { $(this).remove(); });
  })
}



window.changeCss = changeCss;