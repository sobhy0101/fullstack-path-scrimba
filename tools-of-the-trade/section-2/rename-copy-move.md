# Rename, Copy, and Move Files

In this section, we will explore how to rename, copy, and move files using command-line tools. These operations are fundamental for managing files and directories in any operating system.

## Rename Files

To rename a file, you can use the `mv` command. The basic syntax is:

```bash
mv [old_filename] [new_filename]
```

## Copy Files

To copy a file, you can also use the `cp` command. The basic syntax is:

```bash
cp [source] [destination]
```

## Move Files

To move a file (or rename it), you can use the `mv` command as well. The basic syntax is the same as for renaming:

```bash
mv [source] [destination]
```

## Why Does `mv` Handle Both Rename and Move?

The `mv` command is used for both renaming and moving files because, at the filesystem level, both actions simply change the file's path:

- **Renaming** changes the file's name within the same directory.
- **Moving** changes the file's location to a different directory (the name can stay the same or change).

Both operations update the file's directory entry—so the system treats them the same! After either command, the file's path is updated.
