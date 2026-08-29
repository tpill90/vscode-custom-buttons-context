// TODO add other useful buttons from the original extension
// TODO find some better colored icons
// TODO Right click -> Paste json as code
// TODO Right click -> Remove empty lines
// TODO rename the commands to remove TestExtension and replace with something else
// TODO see if its possible to add a right click entry that will add a file/folder to the "search.exclude" setting in the current workspace
// TODO document how to add commands and how exactly the structure works.  I've forgotten how this works in the last 4 months.

import * as vscode from 'vscode';

type CommandDefinition = readonly [id: string, targetCommand: string];

const commandDefinitions: readonly CommandDefinition[] = [
    ['emmet.removeTagContext', 'editor.emmet.action.removeTag'],
    ['emmet.wrapWithAbbreviation', 'editor.emmet.action.wrapWithAbbreviation'],
    ['TestExtension.saveAll', 'workbench.action.files.saveAll'],
    ['TestExtension.commentLine', 'editor.action.commentLine'],
    ['TestExtension.startDebugging', 'workbench.action.debug.start'],
];

console.log("Loaded extension");

export function activate(context: vscode.ExtensionContext): void
{
    for (const [commandId, targetCommand] of commandDefinitions)
    {
        const disposable = vscode.commands.registerCommand(commandId, () =>
        {
            void vscode.commands.executeCommand(targetCommand);
        });

        context.subscriptions.push(disposable);
    }

    setupComplexCommands(context);
}

function setupComplexCommands(context: vscode.ExtensionContext): void
{
    const disposableBeautify = vscode.commands.registerCommand(
        'TestExtension.beautify',
        () =>
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
        },
    );

    context.subscriptions.push(disposableBeautify);
}

export function deactivate(): void
{
    // Nothing to dispose here; VS Code disposes subscriptions automatically.
}
