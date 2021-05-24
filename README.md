# udra-library-api

---
### What
Library API to facilitate book borrowing system.

### Run development
1. Installing the depedencies
```
yarn
```
2. Run the apps
```
yarn dev
```

### Folder Structure
```
├── src
|   ├── @types                            #  3rd party d.ts files and for extending types
|   |   ├── custom-env.d.ts 
|   |   ├── express.d.ts 
|   ├── helper
|   |   ├── crud
|   |   |   ├── crud.constant.ts
|   |   |   ├── crud.controller.ts
|   |   |   ├── crud.DAL.ts
|   |   |   ├── index.ts
|   |   ├── activeStatus.ts
|   ├── lib
|   |   ├── errorManagement               
|   |   |   ├── appError.ts                 # error class, to string
|   |   |   ├── commonErrors.ts             # extends AppError 
|   |   |   ├── error.type.ts            
|   |   |   ├── handler.ts                  # if error logs, if not operational (programmer error) to avoid unpredictable behaviour  
|   |   |   ├── index.ts 
|   |   |   ├── operationalErrorDecider.ts  # decide error is operational or not
|   |   ├── logger 
|   |   |   ├── index.ts 
|   |   |   ├── logger.config.ts    
|   |   |   ├── logger.constants.ts 
|   |   ├── auth.ts 
|   |   ├── db.ts 
|   ├── resources                          # resource to support routes, every route has constant, controller, model, route, and types 
|   |   ├── author
|   |   |   ├── author.constant.ts         # languages etc
|   |   |   ├── author.controller.ts       
|   |   |   ├── author.model.ts            
|   |   |   ├── author.route.ts
|   |   |   ├── author.type.ts
|   |   ├── book                           
|   |   ├── bookTransactions               
|   |   ├── fine
|   |   ├── genre
|   |   ├── publisher
|   |   ├── user
|   ├── app.ts                             # api declaration
|   ├── config.ts
|   ├── server.ts                          # networking concern (start server, connecting to db)
├── .env.development
├── .env.production
├── .env.staging
├── .eslintrc
├── .gitignore
├── .gitignore
├── package.json
├── tsconfig.json
├── yarn.lock
```

---
### Tables
##### 1. User
There are 3 types of logged-in users: SUPERADMIN, ADMIN, MEMBER.
| _id (ObjectId, Autogenerate)  | email            | password (hashed) | firstname | lastname | gender (0=male, 1=female) | settings | role          | is_active |
| :---  | :---------------:| :------:  | :------:  | :------: | :----: | :------: | :--:          | :------: |
| 1  | admin@lib.ac     | admin     | Admin     | LastA | 0    | { theme, notification, compactMode } | admin         | true     |
| 2  | super@lib.ac     | admin     | Super     | LastS | 1  | { theme, notification, compactMode } | super_admin    | true     |
| 3  | member@gmail.com | member    | Member    | LastM | 0    | { theme, notification, compactMode } | user        | true     |

##### 2. Genre
| _id | name          | created_by| created_at | updated_by   | updated_at |
| ----| -------------:|:---------:| ----------:|:------------:| ----------:|
| 1   | Fiction       | _userid   | 2020-01-31 | _userid      | 2020-01-31 |
| 2   | Action        | _userid   | 2020-01-31 | _userid      | 2020-01-31 |

##### 3. Author

| _id | first_name | last_name     | created_by| created_at| updated_by    | updated_at | date_of_birth | date_of_death |
| ----| --------------|-------------:|---------:| ----------:|:------------:| ----------:|------------:| ----------:|
| 1   | Samudra | tikus      | _userid   | 2020-01-31 | _userid      | 2020-01-31 | 2018-01-31 | |
| 2   | Whitey | bravery | _userid   | 2020-01-31 | _userid      | 2020-01-31 |2019-05-05 | |
| 3   | Bob C | Martin| _userid   | 2020-01-31 | _userid      | 2020-01-31 |1950-01-31 | 2021-01-31 |

##### 4. Publisher
| _id | name          | created_by| created_at | updated_by   | updated_at |
| ----| --------------|:---------:| ----------:|:------------:| ----------:|
| 1   | Whiley        | _userid   | 2020-01-31 | _userid      | 2020-01-31 |
| 2   | Penerbit Pureo| _userid   | 2020-01-31 | _userid      | 2020-01-31 |

##### 5. Book

| _id | Title          | created_by| created_at | updated_by   | updated_at | authors    | genres     | pubsliher | year | edition | 
| ----| ---------------|:---------:| ----------:|:------------:| ----------:| ----------:| ----------:| ---------:| ----------:| ----------:|
| 1   | Clean Code     | _userid   | 2020-01-31 | _userid      | 2020-01-31 | _authorid | _genreid[] | _publisherid | 2020 | 10 |
| 2   | Penerbit Pureo | _userid   | 2020-01-31 | _userid      | 2020-01-31 | _authorid | _genreid[] | _publisherid | 2020 | 10 |
##### 6. Book Instance
| _id | book    | is_rented | is_active | created_by| created_at | updated_by   | updated_at |
| ----| -------:|:---------:|:---------:|:---------:| ----------:|:------------:| ----------:|
| 1   | _bookid | true     | true      |_userid   | 2020-01-31 | _userid      | 2020-01-31 |
| 2   | _bookid | false     | false     |_userid   | 2020-01-31 | _userid      | 2020-01-31 |


##### 7. BookTransaction (borrowed)
| _id | book  | user | start_date   | end_date  | return_date  |  fine_paid | is_active |
| --- | --------:| -------:|-------------:|----------:|-------------:| --------:|  ---------:|
| 1   | _bookinstanceid  | _userid | 2020-01-31   | 2020-10-31| 2020-10-31   |  | 0         | false     |
| 2   | _bookinstanceid  | _userid | 2020-01-31   | 2020-10-31| 2020-11-31   |    | 750000    | false     |
##### 8. BookRanking, generated by cron, cached
|  category | _books    |
| -------   | ---------:|
| weekly    | _booksid[]|
| monthly   | _booksid[]|
| yearly    | _booksid[]|
##### 9. Latest Book, cached
|  category | _books    |
| -------   | ---------:|
| _genreid  | _booksid[]|
#### Access Rights
##### 1. User
| Tables          | Create | Read  | Update | Delete  |
| ----------------|:------:| -----:|:------:| -------:|
| User            | v      | self  | self   | x       |
| Genre           | x      | v     | x      | x       |
| Author          | x      | v     | x      | x       |
| Book            | x      | v     | x      | x       |
| BookInstance    | x      | v     | v      | x       |
| BookTransaction | v      | v     | v      | x       |
| BookRanking     | x      | v     | x      | x       |
| BookLatest      | x      | v     | x      | x       |
##### 2. Admin
| Tables          | Create | Read  | Update | Delete  |
| ----------------|:------:| -----:|:------:| -------:|
| User            | v      | v     | v      | x       |
| Genre           | v      | v     | v      | v       |
| Author          | v      | v     | v      | v       |
| Book            | v      | v     | v      | v       |
| BookInstance    | v      | v     | v      | v       |
| BookTransaction | v      | v     | v      | x       |
| BookRanking     | x      | v     | x      | x       |
| BookLatest      | x      | v     | x      | x       |

##### 3. Super Admin
| Tables          | Create | Read  | Update | Delete  |
| ----------------|:------:| -----:|:------:| -------:|
| User            | v      | v     | v      | v       |
| Genre           | v      | v     | v      | v       |
| Author          | v      | v     | v      | v       |
| Book            | v      | v     | v      | v       |
| BookInstance    | v      | v     | v      | v       |
| BookTransaction | v      | v     | v      | v       |
| BookRanking     | v      | v     | v      | v       |
| BookLatest      | v      | v     | v      | v       |


### Pre-requisite
---
1. Node
2. Yarn
### Running
1. installing depedencies
```
yarn
```
2. make 3 env
- .env.development
- .env.staging
- .env.development
```
APP_name=development udra library
PORT=3000
SALT_ROUND=10
DB_name=<<your db name>>
DB_PASSWORD=<<your db password name>>
```
3. start development
```
yarn dev
```

### Todo:
- [x] Error
- [x] Logging
- [x] Authorization
- [x] Authentication
- [ ] Input Validation
- [ ] Cron
- [ ] Cache
- [ ] Socket
- [ ] Message broker
- [ ] Testing

