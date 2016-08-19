import time
import serial
import logging
import argparse
import redis
from functools import wraps

logger = logging.getLogger(__name__)


def throttle(seconds):
    def decorator(func):
        func.last_call = 0

        def reset_timer():
            func.reset_timer = 0

        func.reset_timer = reset_timer

        @wraps(func)
        def wrapper(*args, **kwargs):
            if time.time() - func.last_call > seconds:
                func.last_call = time.time()
                return func(*args, **kwargs)
        return wrapper
    return decorator


@throttle(seconds=1)
def parse_code(data):
    try:
        return int('0x{}'.format(data.decode('ascii').strip()), 16)
    except ValueError:
        # Invalid value has been read. Discard it and do not wait before
        # reading the next value.
        parse_code.reset_timer()
        return None


def parse_codes(ser):
    while True:
        code = parse_code(ser.readline())
        if code is not None:
            yield code


def main(dev, rate, host, port, channel, verbose):
    # Configure logging to the console if requested.
    if verbose:
        handler = logging.StreamHandler()
        handler.setLevel(logging.DEBUG)
        logger.addHandler(handler)
        logger.setLevel(logging.DEBUG)

    r = redis.StrictRedis(
        host=host,
        port=port
    )

    logger.debug('Starting reading from %s with baud rate %d.', dev, rate)
    with serial.Serial(dev, rate) as ser:
        # Discard the first value as it contains just a welcome message
        ser.readline()
        logger.debug('The connection has been estabilished and the '
                     'welcome message read.')

        try:
            for code in parse_codes(ser):
                r.publish(channel, code)
                logger.debug('Code %d has been sent to the \'%s\' channel.',
                             channel, code)
        except KeyboardInterrupt:
            logger.debug('CTRL-C received. Shutting down...')


if __name__ == '__main__':
    parser = argparse.ArgumentParser(
        description='Listens for input from a RFID reader and publishes it '
                    'to a Redis channel.'
    )
    parser.add_argument('device', type=str, help='A device file to read from.')
    parser.add_argument('--channel', type=str, default='cards',
                        help='Redis channel to send messages to.')
    parser.add_argument('--host', type=str, default='localhost',
                        help='Redis host (default localhost).')
    parser.add_argument('--port', type=int, default=6379,
                        help='Redis port (default 6379).')
    parser.add_argument('--rate', type=int, default=115200,
                        help='The baud rate (default: 115200).')
    parser.add_argument('-v', '--verbose', help='Increase output verbosity.',
                        action='store_true')
    args = parser.parse_args()
    main(**vars(args))
