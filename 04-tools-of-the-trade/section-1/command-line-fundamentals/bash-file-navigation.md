# Basic Bash File & Folder Navigation

Here are some fundamental Bash commands for navigating and managing files and directories:

```bash
- `pwd` — Print the current working directory
- `ls` — List files and directories in the current directory
- `cd ..` — Move up one directory level
- `cd folder_name` — Change to a specific directory
- `cd ~` — Change to the home directory
- `cd -` — Change to the previous directory
- `mkdir new_folder` — Create a new directory
- `touch new_file.txt` — Create a new empty file
- `rm file.txt` — Remove a file
- `rmdir folder_name` — Remove an empty directory
- `rm -r folder_name` — Remove a directory and its contents
- `mv old_name.txt new_name.txt` — Rename or move a file
- `cp source.txt destination.txt` — Copy a file

## Example Usage

```bash
# Navigate to the Documents directory
cd ~/Documents
# List files in the current directory
ls
# Create a new directory
mkdir my_new_folder
# Change into the new directory
cd my_new_folder
# Create a new file
touch my_file.txt
# List files to confirm creation
ls
# Move back to the previous directory
cd ..
# Remove the new directory and its contents
rm -r my_new_folder
```
