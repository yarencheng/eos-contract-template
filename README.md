[![CircleCI](https://circleci.com/gh/yarencheng/eos-contract-template/tree/master.svg?style=svg)](https://circleci.com/gh/yarencheng/eos-contract-template/tree/master)

# eos-contract-template

A project template of the EOS contract.

## Requirements

* cmake: 3.10+
* GNU: Make 4.1+
* g++: 7+
* eos.cdt: 1.5.0
* eos node: 1.5.0

## Directories & Files

* Stander C++ sources
  * `./include/`: C++ headers
  * `./cpp/`: C++ imlementation
  * `./test/`: unit test with [Google Test](https://github.com/google/googletest)

  > Don't place source files which use `#include <eosiolib/*>` in these folders

* EOS contract
  * `./contract/`: EOS C++ files

* Script
  * `./clean_build.sh`:
    1. clean folder `./build/*`
    1. Build native excutable binary at `./build/mylib_test` with unit test
    1. Build and output `./build/MyContract.abi` and `./build/MyContract.wasm`

* Integration test
  * ***TODO***
  * `./integration_test/`

## Build

* Run `clean_build.sh`
  ```
  bash clean_build.sh
  ```

* Or, run in pre-build docker image
  ```
  docker run -it --rm --workdir $PWD --volume $PWD:$PWD yarencheng/eoscdt-docker bash clean_build.sh
  ```

* Output
  * `./build/MyContract.abi`
  * `./build/MyContract.wasm`

## Test

Here will execute unit test in the `./test` folder. See [Google Test](https://github.com/google/googletest) for the detail

* Run `test.sh`
  ```
  bash test.sh
  ```

* Or, run in pre-build docker image
  ```
  docker run -it --rm --workdir $PWD --volume $PWD:$PWD yarencheng/eoscdt-docker bash test.sh
  ```

## Integration Test

***TODO***

```
docker-compose -f integration_test/docker-compose.yaml up --exit-code-from=conntract_test --abort-on-container-exit --force-recreate --build
```

## TODO list

- [x] Test with googletest
- [x] Build *.WASM file
- [ ] integration test flow
