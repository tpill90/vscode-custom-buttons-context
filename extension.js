const vscode = require('vscode');

function activate(context)
{
    // TODO add other useful buttons from the original extension
    // TODO find some better colored icons
    // TODO Add - Debug button
    // TODO add run current powershell script button
    // TODO Right click -> Paste json as code
    // TODO Right click -> Remove empty lines
    // TODO rename the commands to remove TestExtension and replace with something else
    // TODO see if its possible to add a right click entry that will add a file/folder to the "search.exclude" setting in the current workspace
    // ["name defined in package.json" , "name of command to execute"]
    let commandArray = [
        ["emmet.removeTagContext", "editor.emmet.action.removeTag"],
        ["emmet.wrapWithAbbreviation", "editor.emmet.action.wrapWithAbbreviation"],
        ["TestExtension.saveAll", "workbench.action.files.saveAll"],
        ["TestExtension.commentLine", "editor.action.commentLine"],
        ["TestExtension.startDebugging", "workbench.action.debug.start"],
    ];

    for (const commandDefinition of commandArray)
    {
        const disposable = vscode.commands.registerCommand(commandDefinition[0], () =>
        {
            vscode.commands.executeCommand(commandDefinition[1]);
        });
        context.subscriptions.push(disposable);
    }

    // Add complex commands separately
    let disposableBeautify = vscode.commands.registerCommand("TestExtension.beautify",
        () =>
        {
            // No open text editor, skip formatting
            let editor = vscode.window.activeTextEditor;
            if (!editor)
            {
                return;
            }

            if (vscode.window.state.focused === true && !editor.selection.isEmpty)
            {
                vscode.commands.executeCommand("editor.action.formatSelection")
                    .then(function () { });
            }
            else
            {
                vscode.commands.executeCommand("editor.action.formatDocument")
                    .then(function () { });
            }
        }
    );
    context.subscriptions.push(disposableBeautify);
}

function deactivate() { }

module.exports = {
    activate,
    deactivate
};
