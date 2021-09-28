### Development environment

#### Database

Install [PostgreSQL](https://www.postgresql.org/download/). 

Setup user and database. You can use pgAdmin (graphical administration utility) or psql (PostgreSQL CLI).

- Create user `cuba` with password `cuba`. Set privilege `LOGIN` for the new user.
- Create database with `petclinic` name.

psql example:

```
sudo -u postgres psql
postgres=# create database "petclinic";
postgres=# create user cuba with encrypted password 'cuba';
```

#### Backend

Backend repo for `example-app`: https://github.com/jmix-projects/jmix2-petclinic.git

Run backend:

- On Linux

```
./gradlew bootRun 
```

- On Windows

```
./gradlew.bat bootRun
```

#### Frontend

Re-generate and start `example-app`:

```
npm run bootstrap-react-app
npm run start-react-app
```

### QA Notes

