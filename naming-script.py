
# Import regular expressions and OS utilities
import re
import os


# This function normalizes a file or folder name:
# - Removes non-alphanumeric characters except spaces
# - Replaces spaces with hyphens
# - Converts to lowercase
# - Removes leading/trailing hyphens
# - Appends the specified extension if not present
#
# To change the allowed characters, modify the regex in the first re.sub.
# To use a different separator, change '-' in the second re.sub.
def normalize_name(name: str, ext: str = ".md") -> str:
    # Remove non-alphanumeric characters except spaces
    name = re.sub(r"[^A-Za-z0-9 ]+", "", name)
    # Replace spaces with hyphens
    name = re.sub(r"\s+", "-", name.strip())
    # Convert to lowercase
    name = name.lower()
    # Remove leading/trailing hyphens
    name = name.strip("-")
    # Append extension if not present
    if ext and not name.endswith(ext):
        name += ext
    return name


# Main script entry point
if __name__ == "__main__":
    import sys  # For command-line argument handling

    # Check for required arguments
    if len(sys.argv) < 3:
        print("Usage: python naming-script.py <input_path> <output_path> [extension]")
        sys.exit(1)

    # The path to the file or folder to rename
    input_path = sys.argv[1]
    # The output path or directory where the renamed file/folder will go
    output_path = sys.argv[2]
    # Optional: file extension to use (default is '.md')
    extension = sys.argv[3] if len(sys.argv) > 3 else ".md"

    # Get the base name (filename or folder name) from the input path
    base_name = os.path.basename(input_path)
    # Normalize the name using the function above
    normalized_name = normalize_name(base_name, extension)
    # Get the directory part of the output path
    output_dir = os.path.dirname(output_path)
    # Build the new path for the renamed file/folder
    new_path = os.path.join(output_dir, normalized_name)

    # If the output directory doesn't exist, create it
    if output_dir and not os.path.exists(output_dir):
        try:
            os.makedirs(output_dir)
            print(f"Created directory: {output_dir}")
        except Exception as e:
            print(f"Error creating directory '{output_dir}': {e}")
            sys.exit(1)

    # Rename the file or folder
    try:
        os.rename(input_path, new_path)
        print(f"Renamed '{input_path}' to '{new_path}'")
    except Exception as e:
        print(f"Error renaming: {e}")

# To change the script's behavior:
# - Adjust normalize_name() for different naming rules
# - Change extension default or logic for folders
# - Add more error handling for specific cases
