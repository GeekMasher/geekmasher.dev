---
title: Introduction to SQL Injection
date: "2019-07-01T14:00:00.000Z"
template: "post"
draft: false
slug: "/posts/security/sql-injection/"
category: "InfoSec"
tags:
  - Security
  - InfoSec
  - SQL
  - SQL Injection
  - Injection Attacks
  - OWASP
  - Mitigation
  - Protections
  - Parameterized queries
  - Escaping output
description: "SQL Injection is one of the biggest issues that still plages web application development even to this day. If you don't know what this security issue is, this post is for you."
---

![Programming software cyberspace](/media/programming-software-cyberspace.jpg)
<!-- https://elements.envato.com/programmer-working-about-software-cyberspace-PP7NYZQ -->

SQL Injection (AKA: SQLi) occurs when an application treats what should be the data sections of a SQL query as part of the executable section by escaping the data context of the query.
This means that when the queries are executed, they can return data that it wasn't intending to be returned (dynamic SQL Injection) or return a turn or false statement (blind SQL Injection).

Typically this occurs when creating dynamic queries by either concatenating or formatting strings to build these queries.
These are then executed resulting in data being exfiltrated from the application to remote commands being run on the database leading to remote code execution. 

Here is an example of a vulnerable Java method where `username` is a parameter coming into the application from a user:

```java
// Get username from parameters
String username = request.getParameter("username");
// Create a statement from database connection
Statement statement = connection.createStatement();  
// Create unsafe query by concatenating user defined data with query string
String query = "SELECT secret FROM Users WHERE (username = '" + username + "' AND NOT role = 'admin')";
// ... OR ...
// Insecurely format the query string using user defined data 
String query = String.format("SELECT secret FROM Users WHERE (username = '%s' AND NOT role = 'admin')", username);
// Execute query and return the results
ResultSet result = statement.executeQuery(query);
```

## How does it work?

Here I'll describe how SQL occurs are the query level when the sample of code above is used in an application.
First, let's create a small table with some sample data for our users including their role and a personal secret about them:

| id   | username | role    | secret           |
| :--- | :------- | :------ | :--------------- |
| 1    | alice    | admin   | loves cat videos |
| 2    | bob      | blogger | loves pizza      |
| 3    | mathew   | blogger | geek             |

Let's create a baseline query that allows non-admin users to get their secret from our `Users` table.
This means that when we supply `bob` as the username (dynamically supplied by the user) it will look like this: 

```sql
SELECT secret FROM Users WHERE (username = 'bob' AND NOT role = 'admin')
```

Normal execution happens without issues and gives you Bob's secret telling us he loves pizza (who doesn't).

Now let's try with `alice` using the same query:

```sql
SELECT secret FROM Users WHERE (username = 'alice' AND NOT role = 'admin')
```

This will now fail to return any results because although `alice` exists in the table, she is an `admin` which isn't allowed by our second WHERE statement;
`NOT role = 'admin'`.

Now let's set the username to `alice'`, using a single quote at the end of the username:

```sql
SELECT secret FROM Users WHERE (username = 'alice'' AND NOT role = 'admin') 
```

We now see that we have broken the syntax of the SQL query and most likely caused an error to be raised in the application.
Typically if an application throws a SQL error due to a syntax issue, this most likely points to SQL Injection.

Let's now try a small payload to modify the queries meaning to get Alice's secret:
`alice' OR 1=1) --`

```sql
SELECT secret FROM Users WHERE (username = 'alice' OR 1=1) --' AND NOT role = 'admin')
```

Now we have changed the queries purpose with the inclusion of an `OR` statement allowing us to check if `1=1`, which if you are good at maths, know its a true statement.

The `--` is a SQL comment (might be different in other languages) which will comment out the rest of the query which we don't need so we end up with the following query:

```sql
SELECT secret FROM Users WHERE (username = 'alice' OR 1=1)
```

This time, the query returns Alice's secret as the query doesn't check if she's an admin before returning.
This means we discovered that Alice's lives cat videos.

This is a simple example but you can see that you could modify the query to do anything you want.
You can also use [UNION](https://docs.microsoft.com/en-us/sql/t-sql/language-elements/set-operators-union-transact-sql?view=sql-server-2017) operations to obtain different data from other tables.

### Second Order SQL Injection

Related to the topic of SQL Injection attacks, there is another vulnerability that occurs called Second Order SQL Injection.
This happens in the same way as SQL Injection occurs by concatenating or formatting the SQL query string but the core difference is that the source comes from typically another database query results or other data source not directly from user input (files, etc.).

To read more about this form of attack, take a look at this by [PortSwigger on SQL Injection (Second Order)](https://portswigger.net/web-security/sql-injection#second-order-sql-injection).

***

## Mitigation and Protections

Now we have learnt what SQL injection is and how it occurs, we want to now learn how to protect ourselves and our applications from SQL Injection.

We are only going to cover 2 topics/techniques:

- Using Prepared Statements and Parameterized Queries
- Using Object Relationship-Mappings Frameworks

There are other techniques applications can follow but we will not be discussing them here but here are links to the awesome [OWASP SQL Injection Cheat Sheet](https://github.com/OWASP/CheatSheetSeries/blob/master/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.md):

- [Using Stored Procedures](https://github.com/OWASP/CheatSheetSeries/blob/master/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.md#defense-option-2-stored-procedures)
- [Validating data against a whitelist](https://github.com/OWASP/CheatSheetSeries/blob/master/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.md#defense-option-3-whitelist-input-validation)
- [Escaping Data](https://github.com/OWASP/CheatSheetSeries/blob/master/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.md#defense-option-4-escaping-all-user-supplied-input)

### Using Prepared Statements and Parameterized Queries

Using prepared statements is the primary way to prevent SQL Injection attacks from occurring.
Applications can create queries using placeholders for the data sections of the query which are supplied as parameters/arguments.

These functions make sure that there is a separation between the SQL executable query and the data being provided to the query which the database engine understands. 

An example of this would be using the `?` placeholder in the query below:

```sql
SELECT secret FROM Users WHERE (username = ? AND NOT role = 'admin')
```

*Note: different languages might use a different placeholder*

This would then be called using a parameterized method, here is an example in Java:

```java
// Get the username from parameter
String username = request.getParameter("username");
// Define query using a placeholder for username
String query = "SELECT secret FROM Users WHERE (username = ? AND NOT role = 'admin')";  
// Creating a Prepared Statement
PreparedStatement statement = connection.prepareStatement(query);
// Set the first parameter to the value of `username`
statement.setString(1, username);
// Execute and return query results
ResultSet results = statement.executeQuery();
```

If parameterized queries are used throughout your application, this will eliminate SQL Injection attacks completely.

Take a look at the [OWASP Cheat sheet for Query Parameterization](https://github.com/OWASP/CheatSheetSeries/blob/master/cheatsheets/Query_Parameterization_Cheat_Sheet.md).

### Using Object Relationship-Mapping Frameworks

A [Object Relationship-Mapping](https://en.wikipedia.org/wiki/Object-relational_mapping) (or ORM) framework is a programming technique for converting data between objects and relational database mappings.
Objects can be mapped to SQL tables, rows, columns, and relationships while (typically) being SQL language/platform agnostic and don't need you to write a single query manually.
This allows for the creating of tables, generate queries using various functions in the framework and many more other features.

One of the key features of most ORM's is the ability to automatically create parameterized queries while supplying user input.

*Note: please verify that the ORM you are using in your codebase has these features.*

This stops all SQL Injection attacks from occurring but note that all ORM's have the ability to supply (or sections of) SQL queries manually which will allow for SQL injection to manifest.
Always check which functions you should be using and which functions you should always avoid in your framework.

***

## Conclusion

SQL Injection is still after 20 plus years a plage for application developers even to this day.
Injection attacks are classed by OWASP as the number one issue facing applications developers and have been placed at number one in the [OWASP Top 10](https://www.owasp.org/index.php/Top_10-2017_A1-Injection) awareness project along with other injection attacks.

Understanding what the issue is and how to prevent it along with understanding the risk associated with this vulnerability will lead you and your team to a better and most importantly, a securer application.

## References

1. [Portswigger web security](https://portswigger.net/web-security/sql-injection)
2. [OWASP SQL Injection](https://www.owasp.org/index.php/SQL_Injection)
