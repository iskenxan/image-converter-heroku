FROM amazonlinux:latest

RUN curl --silent --location https://rpm.nodesource.com/setup_8.x | bash -
RUN yum install -y nodejs zip
RUN npm install -g yarn

RUN mkdir /contacts
COPY ./package.json /contacts/
COPY ./yarn.lock /contacts/

WORKDIR /contacts

ENTRYPOINT ["yarn"]
CMD ["install"]
