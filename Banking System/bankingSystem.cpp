#include <mysql_driver.h>
#include <mysql_connection.h>
#include <cppconn/statement.h>
#include <cppconn/resultset.h>
#include <cppconn/prepared_statement.h>
#include <mysql_error.h>
using namespace std;
using namespace sql;
using namespace mysql;

// Creating a connection with the database
Connection *connectToDatabase()
{
    MySQL_Driver *driver;
    Connection *con;

    driver = get_mysql_driver_instance();
    con = driver->connect("tcp://127.0.0.1:3306", "dheeraj", "mysql123");
    con->setSchema("BankDB");

    return con;
}

// Adding a new customer to the database
void addCustomer(const string &name, const string &address, const string &phone, const string &pass)
{
    Connection *con = connectToDatabase();
    PreparedStatement *pstmt;

    pstmt = con->prepareStatement("INSERT INTO customers (name, address, phone, password) VALUES (?, ?, ?, ?)");
    pstmt->setString(1, name);
    pstmt->setString(2, address);
    pstmt->setString(3, phone);
    pstmt->setString(4, pass);
    pstmt->execute();

    delete pstmt;
    delete con;
}

// Adding a account to the database
void addAccount(int customerId, string &type, double initialBalance, double interestRate = 0.0)
{
    Connection *conn = connectToDatabase();
    PreparedStatement *pstmt;

    pstmt = conn->prepareStatement("INSERT INTO accounts (customer_id, account_type, balance, interest_rate) VALUES (?, ?, ?, ?)");
    pstmt->setInt(1, customerId);
    pstmt->setString(2, type);
    pstmt->setDouble(3, initialBalance);
    pstmt->setDouble(4, interestRate);

    pstmt->execute();

    delete conn;
    delete pstmt;
}

// Get the account details
void getAccountInfo(int accountid)
{
    Connection *conn = connectToDatabase();
    PreparedStatement *pstmt;
    ResultSet *res;

    pstmt = conn->prepareStatement("select * from accounts where account_id = ?");
    pstmt->setInt(1, accountid);
    res = pstmt->executeQuery();

    cout << "\n-----------------------Account Details---------------------------------\n";
    while (res->next())
    {
        cout << "Account ID: " << res->getInt("account_id") << "\t\t\tAccount Type: " << res->getString("account_type") << endl;
        cout << "Balance: " << res->getDouble("balance") << "\t\t\tInterest Rate: " << res->getDouble("interest_rate");
    }
    cout << "\n-----------------------------------------------------------------------\n";
}

// Adding a transaction to the database
void addTransaction(int accountId, string type, double amount)
{
    Connection *conn = connectToDatabase();
    PreparedStatement *pstmt;
    ResultSet *res;

    pstmt = conn->prepareStatement("select balance from accounts where account_id = ?");
    pstmt->setInt(1, accountId);
    res = pstmt->executeQuery();

    if (!res->next())
    {
        cout << "Account Doesn't Exits!";
        return;
    }

    pstmt = conn->prepareStatement("INSERT INTO transactions (account_id, transaction_type, amount) VALUES (?, ?, ?)");
    pstmt->setInt(1, accountId);
    pstmt->setString(2, type);
    pstmt->setDouble(3, amount);

    pstmt->execute();

    if (type == "withdrawal")
    {
        int bal = res->getDouble("balance");
        bal = bal - amount;
        pstmt = conn->prepareStatement("update accounts set balance = ? where account_id = ?");
        pstmt->setDouble(1, bal);
        pstmt->setInt(2, accountId);

        pstmt->execute();
        cout << "Amount withdrew successfully!" << endl;
    }
    else if (type == "deposit")
    {
        int bal = res->getDouble("balance");
        bal = bal + amount;
        pstmt = conn->prepareStatement("update accounts set balance = ? where account_id = ?");
        pstmt->setDouble(1, bal);
        pstmt->setInt(2, accountId);

        pstmt->execute();
        cout << "Amount deposited successfully!" << endl;
    }

    delete conn;
    delete pstmt;
    delete res;
}

// Retriving customer info from the database
void getCustomerInfo(string name, string phone)
{
    Connection *conn = connectToDatabase();
    PreparedStatement *pstmt;
    ResultSet *res;

    pstmt = conn->prepareStatement("SELECT * FROM customers WHERE name = ? and phone = ?");
    pstmt->setString(1, name);
    pstmt->setString(2, phone);
    res = pstmt->executeQuery();

    cout << "\n\n-----------------Customer Details----------------------" << endl;
    while (res->next())
    {
        cout << "CustomerID: " << res->getString("customer_id") << endl;
        cout << "Name: " << res->getString("name") << endl;
        cout << "Address: " << res->getString("address") << endl;
        cout << "Phone No: " << res->getString("phone") << endl;
    }
    cout << "------------------------------------------------------------\n"
         << endl;

    delete res;
    delete conn;
    delete pstmt;
}

void getStatements(int accountid, string name)
{
    Connection *conn = connectToDatabase();
    PreparedStatement *pstmt;
    ResultSet *res;

    pstmt = conn->prepareStatement("select * from transactions where account_id = ?");
    pstmt->setInt(1, accountid);

    res = pstmt->executeQuery();

    while (res->next())
    {
        cout << "\nTransaction ID: " << res->getInt("transaction_id") << "\t\t";
        cout << "Transaction Type: " << res->getString("transaction_type") << "\t\t";
        cout << "Amount : " << res->getDouble("amount") << "\t\t";
        cout << "Transaction Date: " << res->getString("transaction_date") << "\t\t";
    }

    delete conn;
    delete pstmt;
    delete res;
}

// Verify the records in the database
bool verify(string name, string pass, string phone)
{
    Connection *conn = connectToDatabase();
    PreparedStatement *pstmt;
    ResultSet *res;

    pstmt = conn->prepareStatement("select * from customers where name = ? and password = ? and phone = ?");
    pstmt->setString(1, name);
    pstmt->setString(2, pass);
    pstmt->setString(3, phone);

    res = pstmt->executeQuery();

    if (res->next())
    {
        return true;
    }
    else
    {
        return false;
    }
}

int main(int argc, char *argv[])
{

    cout << "Hello! Welcome to the Banking System\n" << endl;

    while (1)
    {
        int choi;

        cout << "\n\nLogin to the Banking System?: 1" << endl;
        cout << "Sign up to the Banking System?: 2" << endl;
        cout << "Create a Savings or Checking account?(If signed up): 3" << endl;
        cout << "Press 0 to go back: " << endl;
        cin >> choi;

        string name, pass, phone, address, type;
        int customerid, accountid, internalChoi;
        double amount;
        bool exitLoop = false;
        switch (choi)
        {

        case 1:
            cout << "\n-------------Fill your credentials--------------" << endl;
            cout << "Enter your name: ";
            cin >> name;
            cout << "Enter your phone number: ";
            cin >> phone;
            cout << "Enter your password: ";
            cin >> pass;

            if (verify(name, pass, phone))
            {
                cout << "Login successful" << endl;
                getCustomerInfo(name, phone);

                while (1)
                {
                    cout << "\n\nGet Account Statements?: 1" << endl;
                    cout << "Deposit the amount?: 2" << endl;
                    cout << "Withdraw the amount?: 3" << endl;
                    cout << "Press 0 to go back: " << endl;
                    cin >> internalChoi;

                    switch (internalChoi)
                    {

                    case 1:
                        cout << "Enter your Account ID: ";
                        cin >> accountid;

                        getAccountInfo(accountid);

                        cout << "\n-----------------Account Statements-------------------\n";
                        getStatements(accountid, phone);
                        cout << "\n-----------------------------------------------------\n\n";

                        break;

                    case 2:
                        cout << "Enter your Account ID: ";
                        cin >> accountid;

                        cout << "Enter the amount to deposit: ";
                        cin >> amount;

                        addTransaction(accountid, "deposit", amount);
                        break;

                    case 3:
                        cout << "Enter your Account ID: ";
                        cin >> accountid;

                        cout << "Enter the amount to withdraw: ";
                        cin >> amount;

                        addTransaction(accountid, "withdrawal", amount);
                        break;

                    case 0:
                        exitLoop = true;
                        break;

                    default:
                        cout << "Invalid input given!";
                        break;
                    }

                    if (exitLoop)
                    {
                        break;
                    }
                }
            }
            else
            {
                cout << "Invalid credentials!" << endl;
            }

            break;

        case 2:
            cout << "\n-----------Signing up with the Bank-------------" << endl;

            cout << "Enter your name: ";
            cin >> name;
            cout << "Enter your address: ";
            cin >> address;
            cout << "Enter your phone number: ";
            cin >> phone;
            cout << "Create a password: ";
            cin >> pass;

            addCustomer(name, address, phone, pass);
            cout << "Signed Up Successfully!";
            getCustomerInfo(name, phone);
            break;

        case 3:
            cout << "\n---------Create an account in Banking System--------" << endl;

            cout << "Enter your customerID: ";
            cin >> customerid;
            cout << "Enter your account type(Savings/Checking): ";
            cin >> type;
            cout << "How much amount you want to deposit: ";
            cin >> amount;

            addAccount(customerid, type, amount);
            cout << "Account Created Successfully!" << endl;
            break;

        case 0:
            exit(0);

        default:
            cout << "Invalid Input Given!" << endl;
            break;
        }
    }

    return 0;
}