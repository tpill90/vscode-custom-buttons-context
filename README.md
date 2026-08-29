<!-- TODO finish or whatever -->

# Custom Buttons and Context Menu

> [!WARNING]
> This project is for my own personal use, and not intended for general use.  > Use at your own risk, no support is offered.

# Development

## Build
```powershell
npm install
npm run watch
```


## Making changes

* Press `F5` to open a new window with your extension loaded.  There is no need to disable the release version you have installed,  the newer one will override it (I think?).
* You can also reload (`Ctrl+R`) the VS Code window with your extension to load your changes.

## Viewing Logs
Writing with `console.log()` will show up in the **DEBUG CONSOLE** tab of the VSCode instance you are developing in.

# Publishing

To generate a local build:
```
npm install -g vsce
vsce package
```

To publish a newer version:
```
npm install -g vsce
vsce publish
```

## Other Links + References

* [Publisher Management Page](https://marketplace.visualstudio.com/manage/publishers/tpill90)
* [Theme Color Reference](https://code.visualstudio.com/api/references/theme-color)
* [Guide on Creating a Color Theme](https://code.visualstudio.com/api/extension-guides/color-theme)
* [How to publish an extension](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)
* [Extension Manifest Specification](https://code.visualstudio.com/api/references/extension-manifest)
* [VSCode Schemas](https://github.com/ota-meshi/extract-vscode-schemas)

### Explore the API

https://code.visualstudio.com/api/references/contribution-points#Command-icon-specifications
https://code.visualstudio.com/docs/getstarted/keybindings
https://code.visualstudio.com/docs/extensionAPI/vscode-api
https://code.visualstudio.com/api/references/contribution-points#contributes.menus
https://code.visualstudio.com/updates/v1_42#_workbench
https://code.visualstudio.com/api/references/extension-manifest
* [Contribution Points - Menus](https://code.visualstudio.com/api/references/contribution-points#contributes.menus)
- You can open the full set of our API when you open the file `node_modules/vscode/vscode.d.ts`.
