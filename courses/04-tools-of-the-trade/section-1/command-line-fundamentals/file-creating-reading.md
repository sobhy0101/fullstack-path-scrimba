# Creating and Reading Files in Bash

This guide covers basic commands for creating and reading files using the Bash command line.

## Creating Files

You can create files in Bash using the `touch` command or by redirecting output to a file.

```bash
# Create an empty file named example.txt
touch example.txt
# Create a file and add text to it
echo "Hello, World!" > hello.txt
# Append text to an existing file
echo "This is a new line." >> hello.txt
# Create a file using a text editor (e.g., nano)
nano myfile.txt
# Save and exit the editor (in nano, press Ctrl + X, then Y, then Enter)

Other ways to read files include using `cat`, `less`, and `more` commands.

## Reading Files

You can read the contents of files using several commands:

```bash
# Display the contents of a file
cat myfile.txt
# View a file one screen at a time
less myfile.txt
# View a file with pagination
more myfile.txt
# Display the first 10 lines of a file
head myfile.txt
# Display the last 10 lines of a file
tail myfile.txt
# Display the first 20 lines of a file
head -n 20 myfile.txt
# Display the last 20 lines of a file
tail -n 20 myfile.txt
```

## Example Usage

```bash
# Create a file with multiple lines of text
cat <<EOL > multi_line.txt
This is the first line.
This is the second line.
This is the third line.
EOL

# Display the contents of the file
cat multi_line.txt
# View the file one screen at a time
less multi_line.txt
# View the file with pagination
more multi_line.txt
# Display the first 10 lines of the file
head multi_line.txt
# Display the last 10 lines of the file
tail multi_line.txt
# Display the first 20 lines of the file
head -n 20 multi_line.txt
# Display the last 20 lines of the file
tail -n 20 multi_line.txt
