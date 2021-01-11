# foobar-kiosk

This repository contains the frontend for the FooBar kiosk and inventory system.

[![The kiosk in action](https://user-images.githubusercontent.com/74944/104196407-071f9c00-5424-11eb-9d33-d97c2d56d4af.png)](hhttps://user-images.githubusercontent.com/74944/104195623-279b2680-5423-11eb-971c-a887925aea68.mp4)

*(click on the image for a high quality video)*

## Our setup

- Raspberry Pi 3 Model B (with Raspian Jessie on it)
- PCP-BCG4209 barcode scanner
- MIFARE-compatible RFID reader
- A capacitive touch screen (D-WAV Scientific Co., Ltd eGalax TouchScreen)

## Setting up a new kiosk

The entire setup and deployment process is using [Ansible](https://www.ansible.com/).

Firstly, make sure that you have SSH access to a freshly setup Raspberry Pi
and add it to the inventory file.

```cfg
[live]
192.168.1.100
```

Then provision it:
```bash
ansible-playbook playbook.yml -l live
```

Deployments can be done using a subset of the tasks in the playbook:
```bash
ansible-playbook playbook.yml -l live --tags deployment
```

## Frontend

The frontend is build with [React](https://facebook.github.io/react/), [Redux](http://redux.js.org/) and [Typescript](https://www.typescriptlang.org/). We use [Webpack](https://webpack.github.io/) to bundle the the modules to a single `bundle.js`.

API host and key to the [foobar-api](https://github.com/uppsaladatavetare/foobar-api) has to be set in a file called `config.js`, or by specifying a path to the file in an enviroment variable named `SETTINGS`. Example config can be seen in `config.example.js`.

Installs the frontend dependencies:
```bash
npm install
```

Builds the project in development mode and host it on a local dev-server. Webpack will listen file changes and rebuild necessary parts:
```bash
npm start
```

Builds the project in production mode. Will output `build/build.js`:
```bash
npm run build
```
