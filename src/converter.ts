export module converter {
    export function convert_text_to_base(text: string, old_base: number, new_base: number, add_data_identifier?: boolean) {
        let representation: number = 0;
        let number_prefix: string = '';
        let negative_prefix: string = '';
        let identifier_prefix: string = '';

        if (text.length == 0) {
            return text;
        }

        text = text.trim();
        text = text.replace(new RegExp('0x', 'g'), '');
        text = text.replace(new RegExp('0b', 'g'), '');

        if (text[0] == '-') {
            negative_prefix += '-';
        }

        text = text.replace('-', '');

        if (old_base == 16) {
            number_prefix += '0x';
        }
        else if (old_base == 2) {
            number_prefix += '0b';
        }

        representation = Number(number_prefix + text);

        if (isNaN(representation)) {
            return text;
        }

        if (add_data_identifier && new_base == 16) {
            identifier_prefix = '0x';
        }
        else if (add_data_identifier && new_base == 2) {
            identifier_prefix = '0b';
        }

        return identifier_prefix + negative_prefix + representation.toString(new_base);
    }

    export function ascii_to_hex(text: string) {
        var converted_text: string = '';

        for (var i = 0; i < text.length; i++) {
            if(text.charCodeAt(i).toString(16).length == 1){
                converted_text += "0" + text.charCodeAt(i).toString(16).toUpperCase();
            }

            else
                converted_text += text.charCodeAt(i).toString(16).toUpperCase();
        }

        return converted_text;
    }

    export function hex_to_ascii(text: string) {
        var converted_text: string = '';
        let unicode_elements: string[] = [];

        if(text.charAt(text.length - 1) == '\r'){
            text = text.substr(0, text.length - 1);
        }

        if(text.length % 2 == 1){
            return;
        }
        
        var i:number = text.length;    
        for(i = 0; i < text.length; i = i + 2){
            unicode_elements.push(text.charAt(i) + text.charAt(i+1));
        }

        unicode_elements.forEach(element => {
            if (element.length == 0) {
                return;
            }

            let parsed_number: number = Number("0x" + element);

            if (isNaN(parsed_number)) {
                return;
            }

            converted_text += String.fromCharCode(parsed_number);
        });

        return converted_text;
    }
}