import random;
import json

def check_winner(userInp):

    choices = ["rock", "paper", "scissors"]
    computerChoi = "".join(random.choices(choices))

    userChoi = userInp.lower()
    match userChoi:
        case 'rock':
            print(f"\nComputer chose: {computerChoi}, User chose: {userChoi}")
            if(computerChoi == "paper"):
                return 'computer'
            elif(computerChoi == "scissors"):
                return 'user'
            else:
                return 'tie'
            
        case 'paper':
            print(f"\nComputer chose: {computerChoi}, User chose: {userChoi}")
            if(computerChoi == "scissors"):
                return 'computer'
            elif(computerChoi == "rock"):
                return 'user'
            else:
                return 'tie'
            
        case 'scissors':
            print(f"\nComputer chose: {computerChoi}, You chose: {userChoi}")
            if(computerChoi == "paper"):
                return 'user'
            elif(computerChoi == "rock"):
                return 'computer'
            else:
                return 'tie'
            
        case default:
            return 'invalid'
        

def set_score(winner): 

    scores = fetch_score()

    if winner == "computer":
        scores[0]["computer"] = scores[0]["computer"]+ 1
    elif winner == "user":
        scores[0]["user"] = scores[0]["user"] + 1

    with open('score.json', 'w') as file:
        json.dump(scores, file)

def fetch_score():
    with open('score.json', 'r') as file:
        data = json.load(file)
    return data

def reset_score():
        data = [{"computer": 0, "user": 0}]
        with open('score.json', 'w') as file:
            json.dump(data, file)

reset_score()
flag = True
while(flag):
    print("*"*70)
    userInp = input("Type your choice(rock/paper/scissors/exit): ")
    if(userInp in ["rock", "paper", "scissors"] ):
        result = check_winner(userInp)
        set_score(result)
        scores = fetch_score()
        print("Winner is: " if result in ['user', 'computer'] else "Its a", result)
    elif(userInp == 'exit'):
        flag = False
        print("Thank you for playing!")
    else:
        print("Invalid Input, try again!")
print(f"\nYour score is:- \n\tComputer: {scores[0]['computer']} | User: {scores[0]['user']}")
print("*"*70)