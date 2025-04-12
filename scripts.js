// Check if we're on the landing page or editor page
const isLandingPage = !document.querySelector('.editor-container');

if (isLandingPage) {
    // Landing page functionality
    function startCoding() {
        const jsEnabled = document.getElementById('jsEditorToggle').checked;
        localStorage.setItem('jsEditorEnabled', jsEnabled);
        window.location.href = 'editor.html';
    }
} else {
    // Editor page functionality
    function createEditor(id, mode) {
        return CodeMirror.fromTextArea(document.getElementById(id), {
            mode: mode,
            lineNumbers: true,
            theme: "dracula",
            extraKeys: { "Tab": "autocomplete" },
        });
    }

    const htmlEditor = createEditor("html", "xml");
    const cssEditor = createEditor("css", "css");
    const jsEditor = createEditor("js", "javascript");

    // Initialize dark mode by default
    document.body.classList.add("dark-mode");
    const darkModeToggle = document.getElementById("darkModeToggle");
    darkModeToggle.checked = true;

    // Initialize JS editor based on saved preference
    const jsEditorToggle = document.getElementById("jsEditorToggle");
    const editorContainer = document.querySelector(".editor-container");
    const jsEnabled = localStorage.getItem('jsEditorEnabled') === 'true';
    
    jsEditorToggle.checked = jsEnabled;
    if (!jsEnabled) {
        editorContainer.classList.add("js-hidden");
        jsEditor.setValue('');
    }

    function toggleJsEditor() {
        editorContainer.classList.toggle("js-hidden");
        const isJsVisible = jsEditorToggle.checked;
        
        if (!isJsVisible) {
            jsEditor.setValue('');
        }
        updatePreview();
    }

    jsEditorToggle.addEventListener("change", toggleJsEditor);

    function updatePreview() {
        const html = htmlEditor.getValue();
        const css = "<style>" + cssEditor.getValue() + "</style>";
        const js = jsEditorToggle.checked ? "<script>" + jsEditor.getValue() + "<\/script>" : "";
        const iframe = document.getElementById("preview");
        
        if (iframe.contentDocument) {
            iframe.contentDocument.open();
            iframe.contentDocument.write(html + css + js);
            iframe.contentDocument.close();
        }
    }

    [htmlEditor, cssEditor, jsEditor].forEach(editor => {
        editor.on("change", updatePreview);
        editor.on("inputRead", function(instance) {
            if (instance.getOption("mode") !== "xml") {
                instance.showHint();
            }
        });
    });

    // Add shortcut for "!" to generate a basic HTML structure
    htmlEditor.on("inputRead", (editor, event) => {
        if (editor.getValue().trim() === "!") {
            editor.setValue(`<!DOCTYPE html>\n<html lang='en'>\n<head>\n    <meta charset='UTF-8'>\n    <meta name='viewport' content='width=device-width, initial-scale=1.0'>\n    <title>Document</title>\n</head>\n<body>\n    <header>\n        \n    </header>\n  \n    <main>\n        \n    </main>\n\n</body>\n</html>`);
            editor.setCursor({line: 9, ch: 8});
        }
    });

    function toggleDarkMode() {
        document.body.classList.toggle("dark-mode");
        const newTheme = document.body.classList.contains("dark-mode") ? "dracula" : "default";
        htmlEditor.setOption("theme", newTheme);
        cssEditor.setOption("theme", newTheme);
        jsEditor.setOption("theme", newTheme);
    }

    darkModeToggle.addEventListener("change", toggleDarkMode);
}