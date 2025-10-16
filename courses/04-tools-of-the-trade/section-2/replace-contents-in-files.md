# Replace Contents in Files

Replacing text within files is a common task for developers and system administrators. The `sed` command is a powerful tool for this purpose. **It is a good practice to always search for the line you want to replace before replacing it**.

Below are some basic examples of how to use the `sed` command for replacing text.

## Basic Usage

The simplest form of the `sed` command for replacing text is:

```bash
sed 's/old-text/new-text/' filename
```

This command replaces the first occurrence of `old-text` with `new-text` in the specified `filename`.

## Replace All Occurrences

To replace all occurrences of a pattern in a file, use the `g` (global) flag:

```bash
sed 's/old-text/new-text/g' filename
```

## In-Place Editing

To edit files in place (i.e., modify the original file), use the `-i` option:

```bash
sed -i 's/old-text/new-text/g' filename
```

## Use Regular Expressions

`sed` supports regular expressions, allowing for more complex search patterns. For example:

```bash
sed -i 's/^[A-Z]/[&]/' filename
```

This command replaces the first uppercase letter at the beginning of each line with itself enclosed in brackets.

---

## Conclusion

The `sed` command is a versatile tool for replacing text in files. By mastering its various options and features, you can efficiently modify the contents of your files.
