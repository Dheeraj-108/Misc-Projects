from utils import calc_value, get_last_opr, cache_answer

while True:

    print("*"*50)
    query = input("Calculate(type 'exit' to quit): ")
    if(query == 'exit'):
        break
    print(f"Answer is: {calc_value(query): .2f}")
    cache_answer(query)
    print("*"*50)

    print(f"Last Operation was: {get_last_opr()} = {calc_value(get_last_opr())}")
