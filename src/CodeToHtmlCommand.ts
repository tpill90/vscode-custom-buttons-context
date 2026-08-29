import * as vscode from 'vscode';

export async function CodeToHtmlCommand(): Promise<void>
{
    const editor = vscode.window.activeTextEditor;

    if (!editor) {
        vscode.window.showErrorMessage('No file is currently open.');
        return;
    }

    const sourceDocument = editor.document;

    const newDocument = await vscode.workspace.openTextDocument({
        content: sourceDocument.getText(),
        language: sourceDocument.languageId
    });

    await vscode.window.showTextDocument(
        newDocument,
        vscode.ViewColumn.Active,
        false
    );
}

function getExtension(filePath: string): string
{
    const dot = filePath.lastIndexOf('.');
    return dot >= 0 ? filePath.substring(dot) : '';
}