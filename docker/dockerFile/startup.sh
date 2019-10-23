#!/bin/sh


#mkdir /var/run/mysqld
#touch /var/run/mysqld/mysqld.sock
#service mysql restart
#chown root:mysql /var/lib/mysql
#chgrp root /var/lib/mysql
#sed -i 's/bind-address/#bind-address/g' /etc/mysql/mysql.conf.d/mysqld.cnf
service mysql restart
mysql -u root -e "ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '$1';FLUSH PRIVILEGES;"
service mysql restart
mkdir /var/run/mysqld/
touch /var/run/mysqld/mysqld.sock
chown -R root:mysql /var/run/mysqld/
chown -R root:mysql /var/run/mysqld/mysqld.sock
mysql -u root -p$1 -e "CREATE DATABASE IF NOT EXISTS $2"
mysql -u root -p$1 -e "CREATE TABLE IF NOT EXISTS $2.DB_VERSION (VERSION varchar(50) NOT NULL,FILE_NAME varchar(100) NOT NULL,CREATION_DATE timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,UPDATING_DATE timestamp NULL DEFAULT NULL,DELETING_DATE timestamp NULL DEFAULT NULL,PRIMARY KEY (VERSION));"
mysql -u root -p$1 -e "update mysql.user set host = '%' where user = 'root';FLUSH PRIVILEGES;"
service mysql restart
sed -i s,$3,$4,g /dist/angular/main.*.js
cp -r /dist/angular/* /var/www/html/
service nginx start
rm /angular.zip && rm -r dist
java -jar /usr/share/myservice/myservice.jar
