import re

filepath = r"m:\Projects\Amaterasu\bot\modules\users_settings.py"
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# We need to find blocks like:
# text = f"""<b>...</b>
# <pre>
# ├─ Name        : {user_name}
# ...
# </pre>
# """

def replacer(match):
    header = match.group(1)
    body = match.group(2)
    lines = body.strip().split('\n')
    new_lines = []
    for line in lines:
        if 'Name' in line and '{user_name}' in line:
            # separate the prefix and the value
            # e.g. "├─ Name        : {user_name}"
            prefix, val = line.split(':', 1)
            new_lines.append(f"<code>{prefix}: </code>{val.strip()}")
        else:
            new_lines.append(f"<code>{line}</code>")
    new_body = '\n'.join(new_lines)
    return f'{header}\n{new_body}\n"""'

new_content = re.sub(r'(text\s*=\s*f"""<b>.*?</b>)\n<pre>\n(.*?)\n</pre>\n"""', replacer, content, flags=re.DOTALL)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(new_content)
