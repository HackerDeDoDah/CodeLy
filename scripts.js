


const htmlEditor = CodeMirror.fromTextArea(document.getElementById("html"), { mode: "xml", lineNumbers: true, theme: "default" });
const cssEditor = CodeMirror.fromTextArea(document.getElementById("css"), { mode: "css", lineNumbers: true, theme: "default" });
const jsEditor = CodeMirror.fromTextArea(document.getElementById("js"), { mode: "javascript", lineNumbers: true, theme: "default" });


function updatePreview() {
    const html = htmlEditor.getValue();
    const css = "<style>" + cssEditor.getValue() + "</style>";
    const js = "<script>" + jsEditor.getValue() + "<\/script>";
    const iframe = document.getElementById("preview");
    
    if (iframe.contentDocument) {
        iframe.contentDocument.open();
        iframe.contentDocument.write(html + css + js);
        iframe.contentDocument.close();
    }
}

[htmlEditor, cssEditor, jsEditor].forEach(editor => editor.on("change", updatePreview));

    // Add shortcut for "!" to generate a basic HTML structure
htmlEditor.on("inputRead", (editor, event) => {
    if (editor.getValue().trim() === "!") {
        editor.setValue(`<!DOCTYPE html>\n<html lang='en'>\n<head>\n    <meta charset='UTF-8'>\n    <meta name='viewport' content='width=device-width, initial-scale=1.0'>\n    <title>Document</title>\n</head>\n<body>\n    \n</body>\n</html>`);
        editor.setCursor({line: 8, ch: 4}); // Move cursor inside body
    }
});

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    const newTheme = document.body.classList.contains("dark-mode") ? "dracula" : "default";
    htmlEditor.setOption("theme", newTheme);
    cssEditor.setOption("theme", newTheme);
    jsEditor.setOption("theme", newTheme);
}