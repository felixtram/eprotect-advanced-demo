/**
 * @file script.js
 * Functions for eProtect iFrame advanced demo site
 */

/**
 * Init event handlers and textarea
 * @function init
 */
function init() {

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
    editor.renderer.setScrollMargin(10, 10)
  //add event handler to change css on button click
  $("#changeCss").on("click", function() {
    var editor = ace.edit("editor");
    var customCss = editor.getValue();

    //transition and change css
    $("iframe").fadeTo(750, 0, function() {
      changeCss(customCss);
    });

    $("iframe").fadeTo(750, 1);
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
 * Change css of form to string passed in
 * @function changeCss
 * @param {String} newCss
 */
function changeCss(newCss) {
  //replace current style with customCss string
   $("iframe").contents().find("#change")[0].innerText = newCss;

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
