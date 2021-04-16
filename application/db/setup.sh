psql -f install.sql -U postgres
PGPASSWORD=12345 psql -d test -f structure.sql -U serhii -h localhost
PGPASSWORD=12345 psql -d test -f data.sql -U serhii -h localhost