# bidding_server

To run the bidding server first build the docker image with the name "node-web-app"
  
  ```
  cd {bidding_server Repo Route}
  docker build -t node-web-app .
  ```
  
Once the docker image is built it is convenient to add additional permissions to the script used to start the container.

  ```
  chmod +x start_container.sh
  ```
  
To run the bidding server execute:
```
./start_container.sh.
```
The server listens for these requests:

  ```
  127.0.0.1:8080/bid?position=XXX&publisheridYYY
  ```

It will attempt to find compatible campaigns amongst the stored ones and return the one with the highest CPM.
