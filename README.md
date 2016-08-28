# foobar-kiosk

This repository contains the frontend for the FooBar kiosk and inventory system.

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
