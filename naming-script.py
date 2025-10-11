import re
import os

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

if __name__ == "__main__":
    import sys
    if len(sys.argv) < 3:
        print("Usage: python naming-script.py <input_path> <output_path> [extension]")
        sys.exit(1)
    input_path = sys.argv[1]
    output_path = sys.argv[2]
    extension = sys.argv[3] if len(sys.argv) > 3 else ".md"

    # Get the base name of the input file/folder
    base_name = os.path.basename(input_path)
    # Normalize the name
    normalized_name = normalize_name(base_name, extension)
    # Get the directory of the output path
    output_dir = os.path.dirname(output_path)
    # Construct the new path
    new_path = os.path.join(output_dir, normalized_name)

    # Create output directory if it doesn't exist
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
