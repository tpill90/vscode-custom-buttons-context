import * as vscode from 'vscode';
// TODO consider adding this as a button instead
// TODO comment and cleanup
// TODO write unit tests
export async function CleanITGHtmlCommand(): Promise<void>
{
    const editor = vscode.window.activeTextEditor;

    if (!editor)
    {
        vscode.window.showErrorMessage('No file is currently open.');
        return;
    }

    const document = editor.document;

    const html = document.getText();
    const clean = CleanHtml(html);

    const edit = new vscode.WorkspaceEdit();

    const range = new vscode.Range(document.positionAt(0), document.positionAt(html.length));
    edit.replace(document.uri, range, clean,);

    await vscode.workspace.applyEdit(edit);

    await document.save();
}

function CleanHtml(html: string): string
{
    let clean = html;

    // Strip any data-cke-saved-* attributes
    clean = clean.replace(/\s*data-cke-saved-[a-zA-Z0-9_-]+="[^"]*"/g, '');

    // Strip rel="noopener noreferrer"
    clean = clean.replace(/\s*rel="noopener noreferrer"/g, '');

    // Strip type="_moz"
    clean = clean.replace(/\s*type="_moz"/g, '');

    // Strip id="..."
    clean = clean.replace(/\s*id="[^"]*"/g, '');

    // Replace <div><br></div> with <br>
    clean = clean.replace(/<div><br><\/div>/g, '<br>');

    // TODO this will probably mess up my formatted code
    // Replace &nbsp; with space
    // clean = clean.replace(/&nbsp;/g, ' ');

    // Remove CKEditor bookmark spans
    clean = clean.replace(/<span\b[^>]*\bdata-cke-bookmark="[^"]*"[^>]*>\s*<\/span>/g, '');

    // Remove empty spans
    clean = clean.replace(/<span\s+style="display:\s*none;">\s*<\/span>/gi, '');

    // Add default styling to <img> elements that don't already have a style attribute.
    clean = clean.replace(/<img\b(?![^>]*\bstyle\s*=)/gi, '<img style="display: inline-block; border: 2px solid #999; margin: 10px;"');

    // Apply image styles , but preserve width.
    clean = clean.replace(/(<img\b[^>]*?)\sstyle\s*=\s*"([^"]*)"/gi,
        (_match, img: string, style: string) =>
        {
            let width = '';

            const widthMatch = style.match(/\bwidth\s*:\s*[^;"]+;?/i,);

            if (widthMatch)
            {
                width = widthMatch[0].replace(/;$/, '');
            }

            let newStyle = 'display: inline-block; border: 2px solid #999; margin: 10px;';
            if (width)
            {
                newStyle += ` ${width};`;
            }

            return `${img} style="${newStyle}"`;
        },
    );

    return clean;
}
