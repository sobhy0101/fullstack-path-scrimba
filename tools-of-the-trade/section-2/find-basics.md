# Find Basics

The `find` command is a powerful utility for searching files and directories in a filesystem based on various criteria. It can be used to locate files by name, type, size, modification date, and more. Below are some basic examples of how to use the `find` command.

## Basic Syntax

The `find` command lets you search for files and directories using flexible criteria. Its basic syntax is:

```bash
find [path] [options] [expression]
```

Where:

- **path**: Directory where the search begins. Examples:
  - `.` (current directory)
  - `..` (parent directory)
  - `~` (home directory)
  - Absolute paths (e.g., `/home/user/documents`)
  - `/` (root directory)
- **options**: Flags that modify command behavior.
- **expression**: Search criteria (e.g., name patterns, file types).

![A diagram illustrating the find command syntax](find-basics-diagram.png)

## Examples

```bash
# Find all files with a .txt extension in the current directory
find . -name "*.txt"

# Find all case-insensitive files with a .txt extension in the current directory
find . -iname "*.txt"

# Find all directories named "backup" starting from the root
find / -type d -name "backup"

# Find all files larger than 1MB in the /var/log directory
find /var/log -type f -size +1M

```bash
# Find all files with a .txt extension in the current directory
find . -name "*.txt"

# Find all directories named "backup" starting from the root
find / -type d -name "backup"

# Find all files larger than 1MB in the /var/log directory
find /var/log -type f -size +1M
```

![An example of using the find command in a terminal](find-command-example-diagram.png)
