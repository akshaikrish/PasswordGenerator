import string
import secrets


# Function to generate a random password based on the provided criteria
def generate_password(length: int, include_numbers: bool = False, include_symbols: bool = False) -> str:
    characters = string.ascii_letters  # Start with lowercase and uppercase letters
    if include_numbers and include_symbols:  # If both include_numbers and include_symbols are True
        characters += string.digits + string.punctuation  # Include digits and punctuation
    else:
        if include_numbers:
            characters += string.digits  # Include digits
        if include_symbols:
            characters += string.punctuation  # Include punctuation
    
    # Ensure at least one character from each category is included
    if include_numbers:
        characters += secrets.choice(string.digits)
    if include_symbols:
        characters += secrets.choice(string.punctuation)
    
    secure_random = secrets.SystemRandom()
    # Generate the random password with the specified length
    return ''.join(secure_random.choice(characters) for _ in range(max(length, 3)))