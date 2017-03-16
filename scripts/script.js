/**
 * @file script.js
 * Functions for eProtect iFrame advanced demo site
 */

/**
 * Init event handlers and textarea
 * @function init
 */
function init() {
  //add tabbing functionality to text area
  allowTabsInTextArea();

  //create codemirror to add syntzx highlighting
  //var editor = CodeMirror.fromTextArea(document.getElementById("customCss"), {
    //theme: "night",
    //tabSize: 2,
    //lineNumbers: true
  //});
    var editor = ace.edit("editor");
    editor.setTheme("ace/theme/monokai");
    editor.getSession().setMode("ace/mode/css");
    editor.setShowPrintMargin(false);
  //add event handler to change css on button click
  $("#changeCss").on("click", function() {
    var editor = ace.edit("editor");
    var customCss = editor.getValue();

    //transition and change css
    $("#payForm").fadeTo(750, 0, function() {
      changeCss(customCss);
    });

    $("#payForm").fadeTo(750, 1);
  })

  //add event handler to download css on button click 
  $("#downloadCss").on("click", function() {
    downloadCss("test.css", 'text');
  })

  //remove loading div
  $(document).ready(function() {
    $(".loading-wrap").fadeOut(2000, function() {
      $(this).remove();
    });
  })
}

/**
 * Add tabbing functionality to textareas
 * @function allowTabsInTextArea
 */
function allowTabsInTextArea(){
  //add tabbing functionality to text area
  $("textarea").keydown(function(e) {
    if (e.keyCode === 9) { // tab was pressed
      // get caret position/selection
      var start = this.selectionStart;
      var end = this.selectionEnd;

      var $this = $(this);
      var value = $this.val();

      // set textarea value to: text before caret + tab + text after caret
      $this.val(value.substring(0, start) +
        "/t" +
        value.substring(end));

      // put caret at right position again (add one for the tab)
      this.selectionStart = this.selectionEnd = start + 1;

      // prevent the focus lose
      e.preventDefault();
    }
  });
}

/**
 * Change css of form to string passed in
 * @function changeCss
 * @param {String} newCss
 */
function changeCss(newCss) {
  //replace current style with customCss string
  $("<style>" + newCss + "</style>").replaceAll("#change");
}

/**
 * Allow users to download css from textarea
 * @function downloadCss
 */
function downloadCss() {
  //var editor = $('.CodeMirror')[0].CodeMirror;
  var editor = ace.edit("editor");
  var elHtml = editor.getValue();
  download(elHtml, "test.css", "text/css");
}

/**
 * Download functionality
 * @function download
 * @param {String} strData
 * @param {String} strFileName
 * @param {String} strMimeType
 * @returns {Boolean}
 */
function download(strData, strFileName, strMimeType) {
  var D = document,
    a = D.createElement("a");
  strMimeType = strMimeType || "application/octet-stream";
  
  
  if (navigator.msSaveBlob) { // IE10
    return navigator.msSaveBlob(new Blob([strData], {
      type: strMimeType
    }), strFileName);
  } /* end if(navigator.msSaveBlob) */
  
  
  if ('download' in a) { //html5 A[download]
    a.href = "data:" + strMimeType + "," + encodeURIComponent(strData);
    a.setAttribute("download", strFileName);
    a.innerHTML = "downloading...";
    D.body.appendChild(a);
    setTimeout(function() {
      a.click();
      D.body.removeChild(a);
    }, 66);
    return true;
  } /* end if('download' in a) */
  
  
  //do iframe dataURL download (old ch+FF):
  var f = D.createElement("iframe");
  D.body.appendChild(f);
  f.src = "data:" + strMimeType + "," + encodeURIComponent(strData);
  
  setTimeout(function() {
    D.body.removeChild(f);
  }, 333);
  return true;
} /* end download() */
