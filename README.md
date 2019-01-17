# TODO

## Build

* Use `clean_build.sh`
  ```
  bash clean_build.sh
  ```

* Use re-build docker
  ```
  docker run -it --rm --workdir $PWD --volume $PWD:$PWD yarencheng/eoscdt-docker bash clean_build.sh
  ```
