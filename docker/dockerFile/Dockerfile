##
## Allence-tunisie
##
#
FROM walidmansia/allence-tunisie:basic
MAINTAINER houssem.amri@allence-tunisie.com
ARG VERSION_PROJECT
ENV OLD_URL_API=https://chosa-api.allence-tunisie.com/api
#ADD ./myservice.jar /usr/share/myservice/myservice.jar
RUN wget -c -O /usr/share/myservice/myservice.jar https://archiva.allence-tunisie.com/repository/maven-releases/com/atn/projet/chosa-local-api/$VERSION_PROJECT/chosa-local-api-$VERSION_PROJECT.jar
RUN wget -c -O /angular.zip https://archiva.allence-tunisie.com/repository/maven-releases/com/atn/projet/chosa-front/$VERSION_PROJECT/chosa-front-$VERSION_PROJECT.zip
RUN unzip /angular.zip -d /
ADD startup.sh lance.sh
RUN chmod 777 ./lance.sh
ENTRYPOINT sh -c './lance.sh $MYSQL_ROOT_PASSWORD $DB_NAME $OLD_URL_API $NEW_URL_API'
#RUN ./lance.sh all0.1EN2.3ce database_yamallam gfgfgf fgfgfgfg

