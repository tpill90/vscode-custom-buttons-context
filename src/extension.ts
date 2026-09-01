// TODO add other useful buttons from the original extension
// TODO find some better colored icons

// TODO Right click -> Join lines
// TODO rename the commands to remove tpill90 and replace with something else
// TODO see if its possible to add a right click entry that will add a file/folder to the "search.exclude" setting in the current workspace
// TODO document how to add commands and how exactly the structure works.  I've forgotten how this works in the last 4 months.
// TODO add eslint

import * as vscode from 'vscode';
import { CodeToHtmlCommand } from './CodeToHtmlCommand';
import { CleanITGHtmlCommand } from './CleanITGlueHtmlCommand';

type CommandDefinition = readonly [id: string, targetCommand: string];

const commandDefinitions: readonly CommandDefinition[] = [
    // Context Menu
    ['emmet.removeTagContext', 'editor.emmet.action.removeTag'],
    ['emmet.wrapWithAbbreviation', 'editor.emmet.action.wrapWithAbbreviation'],
    ['tpill90.removeEmptyLinesInSelection', 'remove-empty-lines.inSelection'],
    ['tpill90.pasteJsonAsCode', 'quicktype.pasteJSONAsTypes'],

    // Title bar
    ['tpill90.saveAll', 'workbench.action.files.saveAll'],
    ['tpill90.commentLine', 'editor.action.commentLine'],
    ['tpill90.startDebugging', 'workbench.action.debug.start']
];


export async function activate(context: vscode.ExtensionContext): Promise<void>
{
    SetupSimpleCommands(context);
    setupComplexCommands(context);
    // TODO cleanup
    context.subscriptions.push(vscode.commands.registerCommand('tpill90.codeToHtml', CodeToHtmlCommand));
    context.subscriptions.push(vscode.commands.registerCommand('tpill90.cleanITGHtml', CleanITGHtmlCommand));
}

// This basically sets up a simple 1 to 1 mapping between commands I define and existing commands.
// Essentially running a command will trigger the referenced command.
function SetupSimpleCommands(context: vscode.ExtensionContext): void
{
    for (const [commandId, targetCommand] of commandDefinitions)
    {
        const disposable = vscode.commands.registerCommand(commandId, () =>
        {
            void vscode.commands.executeCommand(targetCommand);
        });

        context.subscriptions.push(disposable);
    }
}

function setupComplexCommands(context: vscode.ExtensionContext): void
{
    const disposableBeautify = vscode.commands.registerCommand(
        'tpill90.beautify',
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
