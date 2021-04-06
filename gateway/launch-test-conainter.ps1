docker build -t service-test:v1 .
docker run --rm -it  -p 4000:4000 service-test:v1
