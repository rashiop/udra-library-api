# udra-library-api

---
### What
Library API to facilitate book borrowing system.

---
### Tables
##### 1. User
There are 3 types of logged-in users: SUPERADMIN, ADMIN, MEMBER.
| _id (ObjectId, Autogenerate)  | email            | password (hashed) | firstname | lastname | gender | settings | role          | isActive |
| :---  | :---------------:| :------:  | :------:  | :------: | :----: | :------: | :--:          | :------: |
| 1  | admin@lib.ac     | admin     | Admin     | LastA | male    | { theme, notification, compactMode } | ADMIN         | true     |
| 2  | super@lib.ac     | super     | Super     | LastS | female  | { theme, notification, compactMode } | SUPERADMIN    | true     |
| 3  | member@gmail.com | member    | Member    | LastM | male    | { theme, notification, compactMode } | MEMBER        | true     |

##### 2. Genre
| _id | Name          | createdBy | createdAt  | UpdatedBy  | UpdatedAt  |
| ----| -------------:|:---------:| ----------:|:----------:| ----------:|
| 1   | Fiction       | 1         | 2020-01-31 | 1          | 2020-01-31 |
| 2   | Action        | 1         | 2020-01-31 | 1          | 2020-01-31 |

##### 3. Author

| _id | Name          | createdBy | createdAt  | UpdatedBy  | UpdatedAt  |
| ----| --------------|:---------:| ----------:|:----------:| ----------:|
| 1   | Samudra       | 1         | 2020-01-31 | 1          | 2020-01-31 |
| 2   | WhiteyBravery | 1         | 2020-01-31 | 1          | 2020-01-31 |
| 3   | Bob C Martin  | 1         | 2020-01-31 | 1          | 2020-01-31 |

##### 4. Publisher
| _id | Name          | createdBy | createdAt  | UpdatedBy  | UpdatedAt  |
| ----| --------------|:---------:| ----------:|:----------:| ----------:|
| 1   | Whiley        | 1         | 2020-01-31 | 1          | 2020-01-31 |
| 2   | Penerbit Pureo| 1         | 2020-01-31 | 1          | 2020-01-31 |

##### 5. Book

| _id | Title          | createdBy | createdAt  | UpdatedBy  | UpdatedAt  |
| ----| ---------------|:---------:| ----------:|:----------:| ----------:|
| 1   | Clean Code     | 1         | 2020-01-31 | 1          | 2020-01-31 |
| 2   | Penerbit Pureo| 1         | 2020-01-31 | 1          | 2020-01-31 |

##### 6. BookTransaction (borrowed)
##### 7. BookRanking (monthly, weekly)

#### Access Rights
##### 1. User
| Tables          | Create | Read  | Update | Delete  |
| ----------------|:------:| -----:|:------:| -------:|
| User            | v      | self  | self   | x       |
| Genre           | x      | v     | x      | x       |
| Author          | x      | v     | x      | x       |
| Book            | x      | v     | x      | x       |
| BookTransaction | v      | v     | v      | x       |
| BookRanking     | x      | x     | x      | x       |
##### 2. Admin
| Tables          | Create | Read  | Update | Delete  |
| ----------------|:------:| -----:|:------:| -------:|
| User            | v      | v     | v      | x       |
| Genre           | v      | v     | v      | v       |
| Author          | v      | v     | v      | v       |
| Book            | v      | v     | v      | v       |
| BookTransaction | v      | v     | v      | x       |
| BookRanking     | x      | x     | x      | x       |

##### 3. Super Admin
| Tables          | Create | Read  | Update | Delete  |
| ----------------|:------:| -----:|:------:| -------:|
| User            | v      | v     | v      | v       |
| Genre           | v      | v     | v      | v       |
| Author          | v      | v     | v      | v       |
| Book            | v      | v     | v      | v       |
| BookTransaction | v      | v     | v      | v       |
| BookRanking     | v      | v     | v      | v       |


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
APP_NAME=development udra library
PORT=3000
SALT_ROUND=8
DB_NAME=<<your db name>>
DB_PASSWORD=<<your db password name>>
```
3. start development
```
yarn dev
```

### Todo:
- [x] Error
- [x] Logging
- [ ] Authorization
- [ ] Authentication
- [ ] Cache
- [ ] Session
- [ ] Socket
- [ ] Message broker
- [ ] Testing

