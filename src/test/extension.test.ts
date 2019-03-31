import * as assert from 'assert';
import { converter } from "../converter";

suite("ASCII and Hex Tests", () => {
    test("Empty input", () => {
        assert.equal(converter.ascii_to_hex(''), '');
        assert.equal(converter.hex_to_ascii(''), '');
    });

    test("Basic string", () => {
        assert.equal(converter.ascii_to_hex('abc'), '616263');
        assert.equal(converter.hex_to_ascii('616263'), 'abc');
    });
});

suite("Convert Text To Base Tests", () => {
    test("Empty input", () => {
        assert.equal(converter.convert_text_to_base('', 10, 2), '');
    });

    test("Invalid input", () => {
        assert.equal(converter.convert_text_to_base('abc', 10, 2), 'abc');
    });

    test("Decimal to Binary", () => {
        assert.equal(converter.convert_text_to_base('0', 10, 2), '0');
        assert.equal(converter.convert_text_to_base('1', 10, 2), '1');
        assert.equal(converter.convert_text_to_base('123', 10, 2), '1111011');
        assert.equal(converter.convert_text_to_base('-123', 10, 2), '-1111011');
    });

    test("Decimal to Hex", () => {
        assert.equal(converter.convert_text_to_base('0', 10, 16), '0');
        assert.equal(converter.convert_text_to_base('1', 10, 16), '1');
        assert.equal(converter.convert_text_to_base('123', 10, 16), '7b');
        assert.equal(converter.convert_text_to_base('-123', 10, 16), '-7b');
    });

    test("Hex to Binary", () => {
        assert.equal(converter.convert_text_to_base('0', 16, 2), '0');
        assert.equal(converter.convert_text_to_base('1', 16, 2), '1');
        assert.equal(converter.convert_text_to_base('7b', 16, 2), '1111011');
        assert.equal(converter.convert_text_to_base('-7b', 16, 2), '-1111011');
    });

    test("Hex to Decimal", () => {
        assert.equal(converter.convert_text_to_base('0', 16, 10), '0');
        assert.equal(converter.convert_text_to_base('1', 16, 10), '1');
        assert.equal(converter.convert_text_to_base('7b', 16, 10), '123');
        assert.equal(converter.convert_text_to_base('-7b', 16, 10), '-123');
    });

    test("Binary to Decimal", () => {
        assert.equal(converter.convert_text_to_base('0', 2, 10), '0');
        assert.equal(converter.convert_text_to_base('1', 2, 10), '1');
        assert.equal(converter.convert_text_to_base('1111011', 2, 10), '123');
        assert.equal(converter.convert_text_to_base('-1111011', 2, 10), '-123');
    });

    test("Binary to Hex", () => {
        assert.equal(converter.convert_text_to_base('0', 2, 16), '0');
        assert.equal(converter.convert_text_to_base('1', 2, 16), '1');
        assert.equal(converter.convert_text_to_base('1111011', 2, 16), '7b');
        assert.equal(converter.convert_text_to_base('-1111011', 2, 16), '-7b');
    });

    test("Add identifier", () => {
        assert.equal(converter.convert_text_to_base('1', 10, 16, true), '0x1');
        assert.equal(converter.convert_text_to_base('1', 10, 2, true), '0b1');
    });
});