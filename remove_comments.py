import os
import re

def remove_comments_from_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content
    ext = os.path.splitext(filepath)[1].lower()

    if ext == '.html':
        # Remove HTML comments except conditional ones if any
        content = re.sub(r'<!--(.*?)-->', '', content, flags=re.DOTALL)
        # We might have embedded CSS or JS, so let's try to remove their comments as well,
        # but safely:
        content = re.sub(r'/\*.*?\*/', '', content, flags=re.DOTALL)
        # JS single line comments in HTML scripts
        content = re.sub(r'(?<![:/])//[^\n]+', '', content)

    elif ext == '.css':
        content = re.sub(r'/\*.*?\*/', '', content, flags=re.DOTALL)

    elif ext == '.js':
        # Multi-line
        content = re.sub(r'/\*.*?\*/', '', content, flags=re.DOTALL)
        # Single-line, avoid matching http:// or https://
        content = re.sub(r'(?<![:/])//[^\n]+', '', content)

    if content != original_content:
        # Simple cleanup of multi-blank lines that might result from comment removal
        content = re.sub(r'\n\s*\n\s*\n', '\n\n', content)
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Cleaned comments from: {filepath}")

def main():
    base_dir = r"c:\Coding Projects\Web Prog 1\food-myth-buster"
    exclude_dirs = {'.git', 'images', 'brain'}

    for root, dirs, files in os.walk(base_dir):
        dirs[:] = [d for d in dirs if d not in exclude_dirs]
        for file in files:
            if file.endswith(('.html', '.css', '.js')):
                filepath = os.path.join(root, file)
                remove_comments_from_file(filepath)

if __name__ == '__main__':
    main()
