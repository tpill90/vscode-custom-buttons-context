import * as vscode from 'vscode';
import * as path from "path";

// TODO clicking in the empty space of the explorer shouldn't show the context menu option.
// TODO comment and refactor.
export async function ExcludeFromWorkspaceCommand(resourceUri: vscode.Uri): Promise<void>
{
    // TODO not sure if this is actually needed if I have the correct when clause
    if (!resourceUri)
    {
        vscode.window.showErrorMessage("No file or folder was selected.");
        return;
    }

    const workspaceFile = vscode.workspace.workspaceFile;
    if (!workspaceFile)
    {
        vscode.window.showErrorMessage("This command requires a .code-workspace file.");
        return;
    }

    // TODO test this, not sure what the scenario is here
    const workspaceFolder = vscode.workspace.getWorkspaceFolder(resourceUri);
    if (!workspaceFolder)
    {
        vscode.window.showErrorMessage("The selected resource is not part of the workspace.");
        return;
    }

    // TODO make sure this doesn't exclude the top level folder.
    const relativePath = path.relative(workspaceFolder.uri.fsPath, resourceUri.fsPath).replace(/\\/g, "/");
    if (!relativePath)
    {
        vscode.window.showErrorMessage("Cannot exclude the workspace root.");
        return;
    }

    const config = vscode.workspace.getConfiguration("files", resourceUri);
    const existingExcludes = config.get<Record<string, unknown>>("exclude") ?? {};

    if (Object.prototype.hasOwnProperty.call(existingExcludes, relativePath))
    {
        vscode.window.showInformationMessage(`"${relativePath}" is already excluded.`);
        return;
    }

    const updatedExcludes = { ...existingExcludes, [relativePath]: true };
    await config.update("exclude", updatedExcludes, vscode.ConfigurationTarget.Workspace);

    vscode.window.showInformationMessage(`Excluded "${relativePath}" from the workspace.`);
}