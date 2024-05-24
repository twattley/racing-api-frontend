#!/bin/bash

read_and_write_files() {
    output_file="$1" 
    folder_path="$2"

    > "$output_file"

    while IFS= read -r -d '' file; do 
        if [[ -f "$file" ]]; then
            echo "File Name: $file" >> "$output_file"
            echo "Contents:" >> "$output_file"
            cat "$file" 2>>/dev/null >> "$output_file" || \
                echo "Could not decode file (not a text file)" >> "$output_file"
            echo "---" >> "$output_file"
        fi
    done < <(find "$folder_path" -type f -print0)
}

read_and_write_files "/Users/tom.wattley/Code/Projects/racing-api-project/racing-api-frontend/project.txt" "/Users/tom.wattley/Code/Projects/racing-api-project/racing-api-frontend/src"
