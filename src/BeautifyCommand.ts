import * as vscode from 'vscode';

export async function BeautifyCommand(): Promise<void>
{
    const editor = vscode.window.activeTextEditor;

    // No open text editor, skip formatting.
    if (!editor)
    {
        return;
    }

    if (vscode.window.state.focused && !editor.selection.isEmpty)
    {
        void vscode.commands.executeCommand('editor.action.formatSelection');
        return;
    }

    void vscode.commands.executeCommand('editor.action.formatDocument');
}