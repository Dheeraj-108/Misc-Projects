import string
import random

pass_length = int(input("Enter the length for password: "))
complexity = int(input("Set password complexity range(1 - 2 - 3): "))

if complexity == 1:
    generator_range = string.ascii_letters
    password = "".join(random.choices(generator_range, k=pass_length))
    print("\n Your Password:", password)
elif complexity == 2:
    generator_range = string.ascii_letters + string.digits
    password = "".join(random.choices(generator_range, k=pass_length))
    print("\n Your Password:", password)
elif complexity == 3:
    generator_range = string.ascii_letters + string.digits + string.punctuation
    password = "".join(random.choices(generator_range, k=pass_length))
    print("\n Your Password:", password)
else:
    print("Invalid complexity range provided!")


