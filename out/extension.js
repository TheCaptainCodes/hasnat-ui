"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
function activate(context) {
    const isFirstRun = context.globalState.get('hasAppliedHasnatUI', false);
    // If it's the first run, show the prompts
    if (!isFirstRun) {
        // Set the flag to true so that it won't run again after this session
        context.globalState.update('hasAppliedHasnatUI', true);
        vscode.window.showInputBox({
            prompt: "Hello! I'm Md. Fatin Hasnat, the owner and developer of Hasnat UI. Check out my website: https://fatinhasnat.com/ or reach out to me at hello@fatinhasnat.com for more information!"
        }).then(value => {
            console.log(`User's email: ${value}`);
        });
        setTimeout(() => {
            vscode.window.showWarningMessage("To apply Hasnat UI, please follow these steps:\n\n" +
                "1. Click 'Yes' if you would like to enable Hasnat UI.\n" +
                "2. After the automatic reload, press 'Ctrl+P' and type '>Reload Custom CSS and JS'. Select the option to reload.\n" +
                "3. Finally, restart VS Code to complete the installation and see the changes.");
            // Add a delay of 2 seconds before showing the next step
            setTimeout(() => {
                vscode.window
                    .showInformationMessage("Do you want to enable Hasnat UI?", "Yes", "No")
                    .then((response) => {
                    if (response === "Yes") {
                        setupCustomUI(context);
                    }
                });
            }, 2000);
        }, 3000);
    }
}
async function setupCustomUI(context) {
    try {
        // Install required extensions
        await installExtensions([
            "be5invis.vscode-custom-css",
            "PKief.material-icon-theme",
        ]);
        // Copy custom CSS and JS files to the extension directory
        const extensionPath = context.extensionPath;
        const customFilesPath = path.join(extensionPath, "custom-files");
        const userFilesPath = path.join(extensionPath, "user-files");
        fs.mkdirSync(userFilesPath, { recursive: true });
        const cssFilePath = path.join(customFilesPath, "custom-vscode.css");
        const jsFilePath = path.join(customFilesPath, "vscode-script.js");
        const userCssFilePath = path.join(userFilesPath, "custom-vscode.css");
        const userJsFilePath = path.join(userFilesPath, "vscode-script.js");
        fs.copyFileSync(cssFilePath, userCssFilePath);
        fs.copyFileSync(jsFilePath, userJsFilePath);
        // Correct file URL format
        const userCssUrl = `file:///${userCssFilePath.replace(/\\/g, "/")}`;
        const userJsUrl = `file:///${userJsFilePath.replace(/\\/g, "/")}`;
        // Define the new settings content
        const newSettings = {
            "editor.cursorSmoothCaretAnimation": "on",
            "animations.Install-Method": "Apc Customize UI++",
            "apc.imports": [
                "file:///c:/Users/IDEAL/.vscode/extensions/brandonkirbyson.vscode-animations-2.0.3/dist/updateHandler.js"
            ],
            "workbench.colorCustomizations": {
                "terminal.background": "#00000000"
            },
            "workbench.settings.applyToAllProfiles": [
                "workbench.colorCustomizations"
            ],
            "window.titleBarStyle": "custom",
            "files.autoSave": "afterDelay",
            "tabnine.experimentalAutoImports": true,
            "workbench.statusBar.visible": false,
            "editor.multiCursorModifier": "ctrlCmd",
            "editor.suggestFontSize": 16,
            "editor.suggestLineHeight": 1.6,
            "terminal.integrated.lineHeight": 1.1,
            "terminal.integrated.fontSize": 14,
            "[javascript]": {
                "editor.defaultFormatter": "esbenp.prettier-vscode",
                "editor.formatOnSave": true
            },
            "[typescriptreact]": {
                "editor.defaultFormatter": "esbenp.prettier-vscode",
                "editor.formatOnSave": true
            },
            "[tailwindcss]": {
                "editor.defaultFormatter": "esbenp.prettier-vscode",
                "editor.formatOnSave": true
            },
            "[vue]": {
                "editor.defaultFormatter": "esbenp.prettier-vscode",
                "editor.formatOnSave": true
            },
            "[html]": {
                "editor.defaultFormatter": "apility.beautify-blade",
                "editor.formatOnSave": true
            },
            "[css]": {
                "editor.defaultFormatter": "esbenp.prettier-vscode",
                "editor.formatOnSave": true
            },
            "[jsonc]": {
                "editor.defaultFormatter": "esbenp.prettier-vscode"
            },
            "[json]": {
                "editor.defaultFormatter": "vscode.json-language-features"
            },
            "[php]": {
                "editor.defaultFormatter": "bmewburn.vscode-intelephense-client"
            },
            "prettier.requireConfig": true,
            "prettier.useEditorConfig": false,
            "prettier.tabWidth": 4,
            "vetur.format.options.tabSize": 4,
            "explorer.sortOrder": "type",
            "workbench.tree.indent": 15,
            "editor.wordWrapColumn": 120,
            "security.workspace.trust.untrustedFiles": "open",
            "editor.linkedEditing": true,
            "editor.formatOnSave": false,
            "diffEditor.wordWrap": "on",
            "notebook.output.wordWrap": true,
            "editor.fontSize": 15,
            "editor.minimap.maxColumn": 250,
            "codesnap.containerPadding": "8em",
            "codesnap.boxShadow": "rgba(0, 0, 0, 0.55) 0px 12px 24px",
            "editor.accessibilitySupport": "off",
            "chat.editor.wordWrap": "on",
            "editor.wordWrap": "wordWrapColumn",
            "editor.fontWeight": "400",
            "editor.inlineSuggest.suppressSuggestions": true,
            "codesnap.backgroundColor": "#FFC540",
            "codesnap.showLineNumbers": false,
            "codesnap.roundedCorners": true,
            "editor.padding.top": 16,
            "editor.stickyScroll.enabled": false,
            "editor.lineHeight": 1.6,
            "material-icon-theme.saturation": 1,
            "vscode_custom_css.imports": [
                `${userCssUrl}`,
                `${userJsUrl}`
            ],
            "material-icon-theme.files.color": "#42a5f5",
            "workbench.tree.enableStickyScroll": false,
            "workbench.iconTheme": "material-icon-theme",
            "workbench.sideBar.location": "right",
            "workbench.activityBar.location": "hidden"
        };
        // Write the new settings directly to settings.json
        const settingsPath = path.join(process.env.APPDATA || "", "Code/User/settings.json");
        fs.writeFileSync(settingsPath, JSON.stringify(newSettings, null, 4));
        // Add a delay of 3 seconds before showing the next step
        setTimeout(() => {
            vscode.window.showInformationMessage("After the reload, press 'Ctrl+P', type '>Reload Custom CSS and JS', and select that option to apply the changes.");
        }, 3000);
        // Prompt user to restart VS Code
        vscode.window.showInformationMessage("Hasnat UI has been successfully applied. Please restart VS Code to complete the setup.");
    }
    catch (error) {
        let errorMessage = "An unknown error occurred";
        // Check if the error is an instance of Error
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        vscode.window.showErrorMessage("Failed to apply custom UI: " + errorMessage);
    }
}
async function installExtensions(extensions) {
    for (const ext of extensions) {
        await vscode.commands.executeCommand("workbench.extensions.installExtension", ext);
    }
}
function deactivate() { }
//# sourceMappingURL=extension.js.map