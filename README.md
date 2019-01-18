[![CircleCI](https://circleci.com/gh/yarencheng/eos-contract-template/tree/master.svg?style=svg)](https://circleci.com/gh/yarencheng/eos-contract-template/tree/master)

# eos-contract-template

A project template for the EOS contract.

## Features

* Generate contract file: `*.wasm` `*.abi`
* Native unit tests with [Google Test](https://github.com/google/googletest)
* Integration tests with [cucumber-js](https://docs.cucumber.io/guides/10-minute-tutorial/)

## Requirements

| name          |version   |
|---------------|----------|
|cmake          |3.10+     |
|GNU Make       |4.1+      |
|g++            |7+        |
|eos.cdt        |1.5.0     |
|*docker        |18.06.0-ce|
|*docker-compose|1.22.0    |

  > \* is for running integration test

## Directories & Files

* Stander C++ sources
  * `./include/`: C++ headers
  * `./cpp/`: C++ imlementation
  * `./test/`: unit test with [Google Test](https://github.com/google/googletest)

  > Don't place source files which use `#include <eosiolib/*>` in these folders

* EOS contract
  * `./contract/`: EOS C++ files

* Integration test
  * `./integration_test/`

* Script
  * `./clean_build.sh`:
    1. clean folder `./build/*`
    1. Build native excutable binary at `./build/mylib_test` with unit test
    1. Build and output `./build/MyContract.abi` and `./build/MyContract.wasm`

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

Here use [cucumber](https://docs.cucumber.io/guides/10-minute-tutorial/) for testing. It is a famous BDD testing framework.

1. Put contract file in `./integration_test`. For example:
   * `./integration_testMyContract.wasm`
   * `./integration_testMyContract.abi`

1. Modify the contract path to be used. See [before_all.js](https://github.com/yarencheng/eos-contract-template/blob/master/integration_test/features/step_definitions/before_all.js#L35)
   ```javascript
   BeforeAll(function () {

       // ...

       // deploy contract
       cleos.setContract("myaccount", "./", "MyContract.wasm", "MyContract.abi")
   })

   ```
1. Run `docker-compose`.

   ```
   docker-compose \
       --file integration_test/docker-compose.yaml \
       up \
       --exit-code-from=conntract_test \
       --abort-on-container-exit \
       --force-recreate \
       --build
   ```

   It will:

      * Run `keosd` in a container
      * Run `nodeos` in a container
      * Deploy contract to testnet
      * Run test with `cucumuber-js`

## TODO list

- [x] Test with googletest
- [x] Build *.WASM file
- [x] integration test flow
