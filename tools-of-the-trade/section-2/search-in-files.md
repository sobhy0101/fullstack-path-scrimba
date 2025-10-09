# Search in Files

Searching within files is a common task for developers, system administrators, and anyone who works with text files. The `grep` command is a powerful tool for searching through file contents based on patterns (keywords). Below are some basic examples of how to use the `grep` command.

## Basic Usage

The simplest form of the `grep` command is:

```bash
grep 'pattern' filename
```

You can use the asterisk (*) wildcard to search for patterns in multiple files. For example, to search for the word "error" in all `.log` files in the current directory, you can use:

```bash
grep 'error' *.log
```

If you don't remember the exact filenames, you can use a pattern like `fi*` to match all files starting with "fi": you can use:

```bash
grep 'error' fi*
```

This command searches for the specified `pattern` in the given `filename`.

## Recursive Search

To search for a pattern in all files within a directory and its subdirectories, use the `-r` (or `--recursive`) option:

```bash
grep -r 'pattern' /path/to/directory
```

## Search Multiple Files

You can search through multiple files by specifying multiple filenames or using wildcards:

```bash
grep 'pattern' file1.txt file2.txt
```

## Case-Insensitive Search

To perform a case-insensitive search, use the `-i` option:

```bash
grep -i 'pattern' filename
```

## Display Line Numbers

To display the line numbers of matching lines, use the `-n` option:

```bash
grep -n 'pattern' filename
```

## Invert Match

To display lines that do not match the pattern, use the `-v` option:

```bash
grep -v 'pattern' filename
```

## Search for Whole Words

To search for whole words only, use the `-w` option:

```bash
grep -w 'word' filename
```

## Use Regular Expressions

`grep` supports regular expressions, allowing for more complex search patterns. For example:

```bash
grep '^[A-Z]' filename
```

This command searches for lines that start with an uppercase letter.

---

![Grep Command](search-basics-diagram.png)

![grep command options](grep-command-options.png)

### Examples (with output)

```bash
$ grep 'hello' file.txt
hello world
```

```bash
$ grep 'error' *.log
error found in log1.log
error found in log2.log
```

```bash
$ grep 'error' fi*
error found in file1.txt
error found in file2.txt
```

```bash
$ grep -r 'hello' /path/to/directory
/path/to/directory/file1.txt:hello world
/path/to/directory/file2.txt:hello again
```

```bash
$ grep -i 'hello' file.txt
Hello World
```

```bash
$ grep -n 'hello' file.txt
1:hello world
```

```bash
$ grep -v 'hello' file.txt
goodbye world
```

```bash
$ grep -w 'hello' file.txt
hello world
```

```bash
$ grep '^[A-Z]' file.txt
Hello world
```

---

## Conclusion

The `grep` command is a versatile tool for searching text files. By mastering its various options and features, you can efficiently find the information you need within your files.
