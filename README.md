# TODO

## Build

* Use `clean_build.sh`
  ```
  bash clean_build.sh
  ```

* Use pre-build docker image
  ```
  docker run -it --rm --workdir $PWD --volume $PWD:$PWD yarencheng/eoscdt-docker bash clean_build.sh
  ```
