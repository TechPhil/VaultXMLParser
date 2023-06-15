# Google Vault Export XML Parser

This program will take a metadata export from Google Vault, and present it's contents with an easy-to-read, sortable, paginated table.

## Prerequisites

None.

## Building from source

1. Clone the repository
2. Run `npm install` to install dependencies
3. Run `npm run build`

The `npm run build` command will run `pkg`, and generate three output files -

- `vaultxmlparser-linux` - Linux executable
- `vaultxmlparser-macos` - MacOS executable
- `vaultxmlparser-win.exe` - Windows executable

Prebuilt releases are available on GitHub

## Usage

To run the program, simply pass it a path to the XML file as the first argument -

`vaultxmlparser-[platform] /path/to/file.xml`

In windows, you can also drag and drop the XML file onto the program's icon.

## Behaviour

The program will not output anything to the console, but will simply open your default browser to a pre-rendered HTML page, with a sortable table. This HTML file is stored in `%LocalAppData%/Temp` on Windows. The browser should show the path to the file.

## Dependencies

This program uses the following dependencies, which are all bundled with the program -

- pkg (npm)
- open-html (npm)
- fast-html-parser (npm)
- JQuery
- DataTables
- Bootstrap 4

## License

This program is licensed under the GNU GPL v3.0 license.