// Initialize CodeMirror editors
const htmlEditor = CodeMirror.fromTextArea(document.getElementById('html'), {
    mode: 'htmlmixed',
    theme: 'dracula',
    lineNumbers: true,
    autoCloseTags: true,
    autoCloseBrackets: true,
    matchBrackets: true,
    lineWrapping: true,
    tabSize: 2,
    scrollbarStyle: null,
    extraKeys: {
        "Ctrl-Shift-1": function(cm) {
            insertBasicTemplate();
        },
        "Ctrl-Shift-2": function(cm) {
            insertEmailTemplate();
        }
    }
});

const cssEditor = CodeMirror.fromTextArea(document.getElementById('css'), {
    mode: 'css',
    theme: 'dracula',
    lineNumbers: true,
    autoCloseBrackets: true,
    matchBrackets: true,
    lineWrapping: true,
    tabSize: 2,
    scrollbarStyle: null
});

// Template definitions
const basicTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    
</body>
</html>`;

const emailTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Template</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif;">
    <table role="presentation" style="width: 100%; border-collapse: collapse;">
        <tr>
            <td style="padding: 20px; text-align: center;">
                <h1>Email Heading</h1>
                <p>Your email content here</p>
            </td>
        </tr>
    </table>
</body>
</html>`;

// Template insertion functions
function insertBasicTemplate() {
    htmlEditor.setValue(basicTemplate);
}

function insertEmailTemplate() {
    htmlEditor.setValue(emailTemplate);
}

// Update preview function
function updatePreview() {
    const html = htmlEditor.getValue();
    const css = cssEditor.getValue();
    const previewContent = `
        <!DOCTYPE html>
        <html>
            <head>
                <style>${css}</style>
            </head>
            <body>${html}</body>
        </html>
    `;
    document.getElementById('preview').srcdoc = previewContent;
}

// Event listeners for editor changes
htmlEditor.on('change', updatePreview);
cssEditor.on('change', updatePreview);

// Initialize preview
updatePreview();