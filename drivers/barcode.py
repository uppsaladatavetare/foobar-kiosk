import argparse
import logging
from thunderclient import Thunder
from evdev import InputDevice, list_devices, ecodes
from evdev import categorize

logger = logging.getLogger(__name__)


def read_codes(device):
    events = (e for e in device.read_loop() if e.type == ecodes.EV_KEY)
    events = map(categorize, events)
    events = (e for e in events if e.keystate == e.key_up)

    buff = []

    for e in events:
        if e.scancode == ecodes.KEY_ENTER:
            ascii = [e.keycode.split('_')[1] for e in buff]
            buff = []
            yield ''.join(ascii)
        else:
            buff.append(e)


def main(device_name, host, port, apikey, apisecret, verbose=False):
    # Configure logging to the console if requested.
    if verbose:
        handler = logging.StreamHandler()
        handler.setLevel(logging.DEBUG)
        logger.addHandler(handler)
        logger.setLevel(logging.DEBUG)

    devices = map(InputDevice, list_devices())
    devices = [d for d in devices if d.name.strip() == device_name]

    assert devices, ('No Barcode Reader device found (did you forget to run '
                     'the script as root?).')

    device = devices[0]
    device.grab()

    logger.debug('Connected to \'%s\'.', device.name.strip())
    tc = Thunder(apikey, apisecret, host, port)

    for code in read_codes(device):
        tc.send_message_to_channel('products', code)
        logger.debug('Code %s has been sent to the \'products\' channel.', code)


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('device', type=str,
                        help='The name of the device to read from.')
    parser.add_argument('host', type=str,
                        help='Thunderpush host to communicate with.')
    parser.add_argument('apikey', type=str)
    parser.add_argument('apisecret', type=str)
    parser.add_argument('--port', type=int, default=80,
                        help='Thunderpush port (default 80).')
    parser.add_argument('-v', '--verbose', help='Increase output verbosity.',
                        action='store_true')
    args = parser.parse_args()
    main(args.device, args.host, args.port, args.apikey, args.apisecret,
         args.verbose)

