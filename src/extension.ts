// TODO Commands to add:
// - Right click -> Join lines
// - Add a file/folder to the "search.exclude" setting in the current workspace
// - Add a file/folder to the "files.exclude" setting in the current workspace
// - Add inspect tokens and scopes command
// - Add Apply Custom Context Menu button

// TODO find some better colored icons
// TODO rename the commands to remove tpill90 and replace with something else
// TODO document how to add commands and how exactly the structure works.  I've forgotten how this works in the last 4 months.
// TODO add eslint
// TODO Reduce package size after adding esbuild.  Its 10 megs


import * as vscode from 'vscode';
import { CodeToHtmlCommand } from './CodeToHtmlCommand';
import { CodeToHtmlCommandOriginal } from './CodeToHtmlCommandOriginal';
import { CleanITGHtmlCommand } from './CleanITGlueHtmlCommand';
import { BeautifyCommand } from './BeautifyCommand';
import { ExcludeFromWorkspaceCommand } from './ExcludeFromWorkspaceCommand';

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

    // TODO cleanup
    context.subscriptions.push(vscode.commands.registerCommand('tpill90.codeToHtml', CodeToHtmlCommand));
    context.subscriptions.push(vscode.commands.registerCommand('tpill90.codeToHtmlOriginal', CodeToHtmlCommandOriginal));
    context.subscriptions.push(vscode.commands.registerCommand('tpill90.cleanITGHtml', CleanITGHtmlCommand));
    context.subscriptions.push(vscode.commands.registerCommand('tpill90.beautify', BeautifyCommand));
    context.subscriptions.push(vscode.commands.registerCommand('tpill90.excludeFromWorkspace', ExcludeFromWorkspaceCommand));
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


export function deactivate(): void
{
    // Nothing to dispose here; VS Code disposes subscriptions automatically.
}
