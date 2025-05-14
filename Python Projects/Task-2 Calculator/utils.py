def cache_answer(cache_me):
    with open("cache.txt", 'a') as file:
        file.write(cache_me + "\n")

def get_last_opr():
    with open("cache.txt", 'r') as file:
        lines = file.readlines()
        if not lines:
            return None
        try:
            last_opr = lines[-2].strip()
        except IndexError:
            return "0+0"
        
        return last_opr

def calc_value(calculate_me):
    ans = eval(calculate_me)
    return ans
