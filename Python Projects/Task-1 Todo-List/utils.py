import json

def fetch_tasks():
    with open("tasks.json", 'r') as file:
        data = json.load(file)
        return data

def add_task(task):
    tasks = fetch_tasks()
    tasks.append(task)

    with open("tasks.json", 'w') as file:
        json.dump(tasks, file, indent=4)

def remove_task(taskname):
    tasks = fetch_tasks()
    for task in tasks:
        if task["taskname"] == taskname:
            tasks.remove(task)
            break

    with open("tasks.json", 'w') as file:
        tasks = json.dump(tasks, file)

def change_status(taskname, status):
    tasks = fetch_tasks()
    for task in tasks:
        if task["taskname"] == taskname:
            task["status"] = status
            break

    with open("tasks.json", 'w') as file:
        tasks = json.dump(tasks, file)       

def display_tasks():
    tasks = fetch_tasks()
    
    print("\n\n", "*"*70)
    for task in tasks:
        print(f"Task Name: {task['taskname']} \nTask Description: {task['taskdesc']} \nTask Status: {task['status']}\n")
    print("*"*70)