declare module 'ansi_up' {

    export
    function escape_for_html(txt: string): string;

    export
    function linkify(txt: string): string;

    export
    function ansi_to_html(txt: string, options?: any): string;

    export
    function ansi_to_text(txt: string): string;
 }
 
 