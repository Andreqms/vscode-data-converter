'use strict';

import * as vscode from "vscode";

import { converter } from "./converter";

export function activate(context: vscode.ExtensionContext) {
    let extensionMenu = vscode.commands.registerCommand('extension.c0nverterMenu', () => {
        if (!vscode.window.activeTextEditor) {
            vscode.window.showInformationMessage('No text selected');
            return;
        }

        let quick_options_hash = {
            'ascii_to_hex': { label: "ASCII -> Hex", description: "Convert ASCII to hex" },
            'hex_to_ascii': { label: "Hex -> ASCII", description: "Convert hex to ASCII" },
            'decimal_to_binary': { label: "Decimal -> Binary", description: "Convert decimal to binary" },
            'decimal_to_hex': { label: "Decimal -> Hex", description: "Convert decimal to hex" },
            'hex_to_binary': { label: "Hex -> Binary", description: "Convert hex to binary" },
            'hex_to_decimal': { label: "Hex -> Decimal", description: "Convert hex to decimal" },
            'binary_to_decimal': { label: "Binary -> Decimal", description: "Convert binary to decimal" },
            'binary_to_hex': { label: "Binary -> Hex", description: "Convert binary to hex" },
            'escape_url': { label: "Escape URL", description: "Escape special characters from URL" },
            'unescape_url': { label: "Unescape URL", description: "Unescape special characters from URL" }
        };

        const opts: vscode.QuickPickOptions = { matchOnDescription: true };
        const items: vscode.QuickPickItem[] = [];

        for (var key in quick_options_hash) {
            items.push(quick_options_hash[key]);
        }

        vscode.window.showQuickPick(items).then((menu_selection) => {
            if (!menu_selection) {
                return;
            }

            const editor = vscode.window.activeTextEditor;

            editor.edit(function (edit) {
                editor.selections.forEach(element => {
                    let selected_text: string = editor.document.getText(new vscode.Range(element.start, element.end));

                    if (selected_text.length == 0) {
                        return;
                    }

                    let should_prepend_with_identifier: boolean =
                        vscode.workspace.getConfiguration('converter').get('prependDataWithIdentifier');

                    let spaces_indicate_delimiter: boolean =
                        vscode.workspace.getConfiguration('converter').get('treatSpacesAsDelimiter');

                    if (menu_selection.label != quick_options_hash['ascii_to_hex'].label)
                    {
                        let selected_text_segments: string[] = selected_text.split('\n');
                        let segmented_text: string = '';

                        selected_text_segments.forEach(segment => {
                            let segments_within_line: string[] = new Array(segment);

                            if (menu_selection.label == quick_options_hash['decimal_to_binary'].label ||
                                menu_selection.label == quick_options_hash['decimal_to_hex'].label ||
                                menu_selection.label == quick_options_hash['hex_to_binary'].label ||
                                menu_selection.label == quick_options_hash['hex_to_decimal'].label ||
                                menu_selection.label == quick_options_hash['binary_to_decimal'].label ||
                                menu_selection.label == quick_options_hash['binary_to_hex'].label) {

                                if (!spaces_indicate_delimiter) {
                                    if (!parseInt(segment.replace(new RegExp(' ', 'g'), ''))) {
                                        segmented_text += segment + '\n';
                                        return;
                                    }

                                    segment = segment.replace(new RegExp(' ', 'g'), '');
                                }

                                segments_within_line = segment.split(' ');
                            }

                            segments_within_line.forEach(line_segment => {
                                switch (menu_selection.label) {
                                    case quick_options_hash['decimal_to_binary'].label:
                                        segmented_text += converter.convert_text_to_base(line_segment, 10, 2, should_prepend_with_identifier);
                                        break;
                                    case quick_options_hash['decimal_to_hex'].label:
                                        segmented_text += converter.convert_text_to_base(line_segment, 10, 16, should_prepend_with_identifier);
                                        break;
                                    case quick_options_hash['hex_to_binary'].label:
                                        segmented_text += converter.convert_text_to_base(line_segment, 16, 2, should_prepend_with_identifier);
                                        break;
                                    case quick_options_hash['hex_to_decimal'].label:
                                        segmented_text += converter.convert_text_to_base(line_segment, 16, 10, should_prepend_with_identifier);
                                        break;
                                    case quick_options_hash['binary_to_decimal'].label:
                                        segmented_text += converter.convert_text_to_base(line_segment, 2, 10, should_prepend_with_identifier);
                                        break;
                                    case quick_options_hash['binary_to_hex'].label:
                                        segmented_text += converter.convert_text_to_base(line_segment, 2, 16, should_prepend_with_identifier);
                                        break;
                                    case quick_options_hash['escape_url'].label:
                                        segmented_text += encodeURIComponent(line_segment);
                                        break;
                                    case quick_options_hash['unescape_url'].label:
                                        segmented_text += decodeURIComponent(line_segment);
                                        break;
                                    case quick_options_hash['hex_to_ascii'].label:
                                        segmented_text += converter.hex_to_ascii(line_segment);
                                        break;
                                }

                                segmented_text += ' ';
                            });

                            segmented_text = segmented_text.slice(0, -1);
                            segmented_text += '\n';
                        });

                        segmented_text = segmented_text.slice(0, -1);

                        edit.replace(element, segmented_text);

                    }

                    else{

                        selected_text = converter.ascii_to_hex(selected_text);
                        edit.replace(element, selected_text);
                    }
                });
            });
        });
    });

    context.subscriptions.push(extensionMenu);

    let disposable1 = vscode.commands.registerCommand('extension.asciiConv', () => {
        if (!vscode.window.activeTextEditor) {
            vscode.window.showInformationMessage('No text selected');
            return;
        }

        const editor = vscode.window.activeTextEditor;

        editor.edit(function (edit) {
            editor.selections.forEach(element => {
                let selected_text: string = editor.document.getText(new vscode.Range(element.start, element.end));

                if (selected_text.length == 0) {
                    return;
                }

                let should_prepend_with_identifier: boolean =
                    vscode.workspace.getConfiguration('converter').get('prependDataWithIdentifier');

                let spaces_indicate_delimiter: boolean =
                    vscode.workspace.getConfiguration('converter').get('treatSpacesAsDelimiter');


                    selected_text = converter.ascii_to_hex(selected_text);
                    edit.replace(element, selected_text);
            });
        });

    });
    context.subscriptions.push(disposable1);

    let disposable2 = vscode.commands.registerCommand('extension.hexConv', () => {
        const editor = vscode.window.activeTextEditor;

            editor.edit(function (edit) {
                editor.selections.forEach(element => {
                    let selected_text: string = editor.document.getText(new vscode.Range(element.start, element.end));

                    if (selected_text.length == 0) {
                        return;
                    }

                    let should_prepend_with_identifier: boolean =
                        vscode.workspace.getConfiguration('converter').get('prependDataWithIdentifier');

                    let spaces_indicate_delimiter: boolean =
                        vscode.workspace.getConfiguration('converter').get('treatSpacesAsDelimiter');

                        let selected_text_segments: string[] = selected_text.split('\n');
                        let segmented_text: string = '';

                        selected_text_segments.forEach(segment => {
                            let segments_within_line: string[] = new Array(segment);

                            segments_within_line.forEach(line_segment => {
                                segmented_text += converter.hex_to_ascii(line_segment);
                                segmented_text += ' ';
                            });

                            segmented_text = segmented_text.slice(0, -1);
                            segmented_text += '\n';
                        });

                        segmented_text = segmented_text.slice(0, -1);

                        edit.replace(element, segmented_text);
                });
            });
    });
    context.subscriptions.push(disposable2);
}
