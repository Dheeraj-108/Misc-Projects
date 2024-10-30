This is just the code files, you will need to install the required libraries and the c++ connector files to link the c++ code with the database, I will provide the database code that you can directly run on the MySQL shell to create the schema.

If it does not work in your code editor I suggest using the terminal and execute this command:- 
g++ -std=c++11 -I/usr/include/mysql -I/usr/include/cppconn bankingSystem.cpp -lmysqlcppconn -lmysqlclient


Both the -I, options are locating the MySQL libraries and the c++ connectors.
-l are the linker for the MySQL and the MySQL client.
g++ is the compiler and -std=c++11, is the standards of c11 and utilizes its features in the code.

Code file and the Output file name can be anything based on what you have given it.

