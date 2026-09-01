import * as vscode from 'vscode';
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
    const html = ConvertPowerShellToHtml(code);

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

function ConvertPowerShellToHtml(code: string): string
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

        // Escape HTML
        let escaped = EscapeHtml(line);

        // Preserve indentation
        escaped = escaped.replace(/^ +/, match =>
        {
            return '&nbsp;'.repeat(match.length * 2);
        });

        // Highlight comments
        if (/^(&nbsp;)*#/.test(escaped))
        {
            escaped = `<span style="color:#2b7a2b;">${escaped}</span>`;
            output.push(`    <div>${escaped}</div>`);
            continue;
        }

        // Highlight strings
        escaped = escaped.replace(
            /&quot;([^&]*)&quot;/g,
            '<span style="color:#c62828;">&quot;$1&quot;</span>',
        );

        // Highlight cmdlet
        escaped = escaped.replace(
            /^(&nbsp;)*([A-Za-z]+-[A-Za-z]+)/,
            '$1<span style="color:#1565c0;">$2</span>',
        );

        output.push(`    <div>${escaped}</div>`);
    }

    return `<div style="background-color:#f5f5f5;color:#222;padding:12px 16px;border:1px solid #ddd;font-size:13px;">
${output.join('\n')}
</div>`;
}

function EscapeHtml(value: string): string
{
    return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}