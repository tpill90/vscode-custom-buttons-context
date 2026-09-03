import * as vscode from 'vscode';
// TODO can I reduce import size
import { codeToHtml } from 'shiki';
// TODO consider adding this as a button instead
// TODO consider adding more colors for the powershell syntax.  Compare to ISE?
// TODO comment and cleanup
// TODO check the extension and error out if its not powershell
export async function CodeToHtmlCommand(): Promise<void>
{
    const editor = vscode.window.activeTextEditor;

    if (!editor)
    {
        vscode.window.showErrorMessage('No file is currently open.');
        return;
    }

    const code = editor.document.getText();
    const html = await ConvertPowerShellToHtml(code);

    const newDocument = await vscode.workspace.openTextDocument({
        content: html,
        language: 'html',
    });

    await vscode.window.showTextDocument(
        newDocument,
        vscode.ViewColumn.Active,
        false,
    );
}

// TODO play around with the colors a bit
async function ConvertPowerShellToHtml(code: string): Promise<string>
{
    let html = await codeToHtml(code, { lang: 'powershell', theme: 'light-plus' });

    // Need to replace this background otherwise ITGlue replaces it and messes up the style
    html = html.replace("background-color:#FFFFFF;", "");

    return html;
}