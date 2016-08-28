raspi-information-radiator
==========================

An Ansible role for configuring a Raspberry Pi as an information radiator, automatically launching Chromium to display a web page in full screen mode on boot.

Notes
------------

* This role will remove `lightdm` and replace it with a lightweight alternative, `matchbox`.

* This role installs the most recent version of Chromium available (22), which isn't very recent and is lacking in many features. If you can find a more recent version, a pull request would be more than welcome :)

* If Chromium exits unexpectedly, it will be automatically restarted.

* If you want to disable the automatic boot to Chromium, remove the file `/boot/xinitrc`. (The boot partition is formatted as FAT32, so you can insert your SD card into a computer to do this if necessary.)

  Note that `/boot/xinitrc` will be recreated if you re-run the role.

Requirements
------------

Chromium is only available with the older Raspbian Wheezy release. 
I'm not actively using this at the moment, so I haven't updated it to work with the newer Jessie release.

Role Variables
--------------

This role has one required variable:

* `boot_to_url`: the URL to display (eg. `http://www.google.com`)

There are also three optional variables:

* `enable_remote_debugging`: whether or not to enable remote Chrome debugging. Defaults to false.
* `hide_mouse_cursor`: whether or not to hide the mouse cursor. Defaults to true.
* `framebuffer`: framebuffer device to use. Defaults to `/dev/fb1`.

Dependencies
------------

This role does not have any dependencies.

Example Playbook
----------------

    - hosts: servers
      roles:
         - { role: raspi-information-radiator, boot_to_url: "http://www.google.com", enable_remote_debugging: true }

License
-------

MIT

Author Information
------------------

Created by Charles Korn ([me@charleskorn.com](me@charleskorn.com)).

Based largely on the article [HOWTO: Boot your Raspberry Pi into a fullscreen browser kiosk](http://blogs.wcode.org/2013/09/howto-boot-your-raspberry-pi-into-a-fullscreen-browser-kiosk/).

Contributing
------------

Submit issues and pull requests on GitHub at [https://github.com/charleskorn/raspi-information-radiator](https://github.com/charleskorn/raspi-information-radiator).
