import json

def fetch_contacts():
    with open("contacts.json", "r") as file:
        data = json.load(file)
        return data
    
def add_contacts(newContact):
    contacts = fetch_contacts()
    contacts.append(newContact)

    with open('contacts.json', 'w') as file:
        json.dump(contacts, file)

def find_contact(target):
    contacts = fetch_contacts()

    for contact in contacts:
        if(contact["name"] == target or contact["number"] == target):
            return contact
    else:
        return None
        
def update_contact(old_contact, updated_contact):
    contacts = fetch_contacts()

    for i, contact in enumerate(contacts):
        if(contact["name"] == old_contact["name"] or contact["number"] == old_contact["number"]):
            contacts[i] = updated_contact

    with open('contacts.json', 'w') as file:
        json.dump(contacts, file)

def delete_contact(contact_remove):
    contacts = fetch_contacts()

    contacts = [
        contact for contact in contacts
        if not contact["name"] == contact_remove["name"] or contact["number"] == contact_remove["number"]
    ]

    with open('contacts.json', 'w') as file:
        json.dump(contacts, file)  


while(True):
    print("\n","*"*70)
    print("Press 1 to view contact list")
    print("Press 2 to add a contact")
    print("Press 3 to update a contact")
    print("Press 4 to delete a contact")
    print("Press 5 to find a contact(either number or name)")
    print("*"*70, "\n")

    choi = int(input("Enter your choice: "))

    match choi:
        case 1:
                contacts = fetch_contacts()
                for contact in contacts:
                    print(f"Name: {contact["name"]}, Number: {contact["number"]}, Email: {contact["email"]}, Address: {contact["address"]}")

        case 2: 
                new_contact = {}
                new_contact["name"] = input("Enter the name: ")
                new_contact["number"] = input("Enter the number: ")
                new_contact["email"] = input("Enter the email: ")
                new_contact["address"] = input("Enter the address: ")

                add_contacts(new_contact)

        case 3:
                contact_id = input("Enter the number or name: ")
                old_contact = find_contact(contact_id)
                if(old_contact != None):
                    updated_contact = {}
                    updated_contact["name"] = input("Enter the name: ")
                    updated_contact["number"] = input("Enter the number: ")
                    updated_contact["email"] = input("Enter the email: ")
                    updated_contact["address"] = input("Enter the address: ")

                    update_contact(old_contact, updated_contact)

        case 4:
                contact_id = input("Enter the number or name: ")
                found_contact = find_contact(contact_id)

                if(found_contact != None):
                    delete_contact(found_contact)
                else:
                    print("Contact doesn't exists!")

        case 0:
            print("Closing contact book...")
            exit()