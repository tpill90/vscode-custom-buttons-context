import * as vscode from 'vscode';
// TODO can I reduce import size
import { CodeToHastOptions, codeToHtml, createHighlighter } from 'shiki';
// TODO consider adding this as a button instead
// TODO consider adding more colors for the powershell syntax.  Compare to ISE?
// TODO comment and cleanup
// TODO check the file extension and error out if its not powershell
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
// Light Plus theme definition https://github.com/shikijs/textmate-grammars-themes/blob/main/packages/tm-themes/themes/light-plus.json
// https://github.com/tpill90/vscode-light-blue-theme/blob/master/themes/default%20themes/base.json
// https://github.com/tpill90/vscode-light-blue-theme/blob/master/themes/Light%20Blue-color-theme.json
async function ConvertPowerShellToHtml(code: string): Promise<string>
{
    // let options: CodeToHastOptions = { lang: 'powershell', theme: 'light-plus' };
    // let html = await codeToHtml(code, options);



    const highlighter = await createHighlighter({
        langs: ['powershell'],
        themes: [
            {
                name: 'my-theme',
                settings: [
                    {
                        scope: ['comment'],
                        settings: { foreground: "#008000" }
                    },
                    {
                        scope: ['string'],
                        settings: { foreground: "#a31515" }
                    },
                    {
                        scope: ['variable.other.readwrite.powershell'],
                        settings: { foreground: "#EC2D00" }
                    }
                ],

                bg: "#FFFFFF",
                fg: "#000000"
            }
        ]
    });

    let html = highlighter.codeToHtml(code, { lang: 'powershell', theme: 'my-theme' });

    // Need to replace this background otherwise ITGlue replaces it and messes up the style
    html = html.replace("background-color:#FFFFFF;", "");

    return html;
}