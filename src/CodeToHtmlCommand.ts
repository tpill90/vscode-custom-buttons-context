import * as vscode from 'vscode';
// TODO consider adding this as a button instead
export async function CodeToHtmlCommand(): Promise<void>
{
    const editor = vscode.window.activeTextEditor;

    if (!editor)
    {
        vscode.window.showErrorMessage('No file is currently open.');
        return;
    }

    const code = editor.document.getText();
    const html = convertPowerShellToHtml(code);

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

function convertPowerShellToHtml(code: string): string
{
    const lines = code.split(/\r?\n/);
    const output: string[] = [];

    for (const line of lines)
    {
        if (line.trim().length === 0)
        {
            output.push('    <div>&nbsp;</div>');
            continue;
        }

        // Escape HTML so PowerShell source is displayed as code rather than markup.
        // Quotes are intentionally left untouched because they are part of the
        // generated HTML text and are needed for string highlighting.
        let escaped = escapeHtml(line);

        // Highlight comments.
        if (/^\s*#/.test(escaped))
        {
            escaped = `<span style="color:#2b7a2b;">${escaped}</span>`;
            output.push(`    <div>${escaped}</div>`);
            continue;
        }

        // Highlight double-quoted strings.
        escaped = escaped.replace(
            /"([^"\n]*)"/g,
            '<span style="color:#c62828;">"$1"</span>',
        );

        // Highlight the first command-looking Verb-Noun word on the line.
        escaped = escaped.replace(
            /^(\s*)([A-Za-z]+-[A-Za-z]+)/,
            '$1<span style="color:#1565c0;">$2</span>',
        );

        output.push(`    <div>${escaped}</div>`);
    }

    return `<div style="background-color:#f5f5f5;color:#222;padding:12px 16px;border:1px solid #ddd;font-size:13px;">\n${output.join('\n')}\n</div>`;
}

function escapeHtml(value: string): string
{
    return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}