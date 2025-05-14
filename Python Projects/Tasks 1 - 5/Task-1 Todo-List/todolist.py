from utils import fetch_tasks, add_task, remove_task, change_status, display_tasks

tasks = fetch_tasks()

def main():
    print("\n\n", "*"*70)
    for task in tasks:
        print(f"Task Name: {task['taskname']} \nTask Description: {task['taskdesc']} \nTask Status: {task['status']}\n")
    print("*"*70)

    while True:
        print("\n", "*"*70)
        print("Press 1 to Add Task: ")
        print("Press 2 to Remove Task: ")
        print("Press 3 to Change Task Status")
        print("Press 4 to Display Tasks")
        print("Press 0 to exit the program")
        print("*"*70)

        choi = int(input("\nEnter your choice: "))
        match choi:
            case 1: 
                taskname = input("Enter task name: ")
                taskdesc = input("Enter task description: ")
                status = "Pending"
                task = {"taskname": taskname, "taskdesc": taskdesc, "status": status}
                add_task(task)
            
            case 2:
                taskname = input("Enter task name: ")
                remove_task(taskname)

            case 3: 
                taskname = input("Enter task name: ")
                newstatus = input("Enter the new status: ")

                change_status(taskname, newstatus)   

            case 4:
                display_tasks()

            case 0:
                print("Thanks for using Todo-List")
                break
            
            case default: 
                print("Invalid input, exiting...")

if __name__ == "__main__":
    main()