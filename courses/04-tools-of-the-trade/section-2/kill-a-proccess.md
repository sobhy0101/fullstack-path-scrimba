# Kill a Process

Sometimes you need to kill a process that is running on your system. By using the shortcut 'Ctrl + C' or can be done using the `kill` command in the terminal.

## Basic Syntax

The basic syntax for the `kill` command is:

```bash
kill [options] <pid>
```

Where:

- **options**: Flags that modify command behavior (e.g., `-9` for forceful termination).
- **pid**: The Process ID of the process you want to terminate.

Command examples:

```bash
kill -9 1234
kill 5678
```

![A diagram illustrating the kill command syntax](kill-command-diagram.png)

## Finding the Process ID (PID)

Before you can kill a process, you need to find its PID. You can use the `ps` command to list running processes. For example:

```bash
ps aux | grep <process_name>
```

This command lists all processes and filters the output to show only those that match `<process_name>`. The PID is usually the second column in the output.
