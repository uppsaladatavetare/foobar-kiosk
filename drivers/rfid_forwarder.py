import logging
import argparse
import redis
from thunderclient import Thunder

logger = logging.getLogger(__name__)


def main(apikey, apisecret, rhost, rport, rchannel, thost, tport, tchannel,
         verbose=False):
    # Configure logging to the console if requested.
    if verbose:
        handler = logging.StreamHandler()
        handler.setLevel(logging.DEBUG)
        logger.addHandler(handler)
        logger.setLevel(logging.DEBUG)

    tc = Thunder(apikey, apisecret, thost, tport)
    r = redis.StrictRedis(host=rhost, port=rport)
    p = r.pubsub()
    p.subscribe(rchannel)

    try:
        for msg in filter(lambda msg: msg['type'] == 'message', p.listen()):

            code = int(msg['data'].decode('utf-8'))
            tc.send_message_to_channel('cards', code)
            logger.debug('Code %d has been forwarded.', code)
    except KeyboardInterrupt:
        logger.debug('CTRL-C received. Shutting down...')


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('apikey', type=str)
    parser.add_argument('apisecret', type=str)
    parser.add_argument('--thost', type=str, default='localhost',
                        help='Thunderpush host (default: localhost).')
    parser.add_argument('--tchannel', type=str, default='cards',
                        help='Thunderpush channel name (default: cards).')
    parser.add_argument('--tport', type=int, default=80,
                        help='Thunderpush port (default: 80).')
    parser.add_argument('--rhost', type=str, default='localhost',
                        help='Redis host (default: localhost).')
    parser.add_argument('--rport', type=int, default=6379,
                        help='Redis port (default: 6379).')
    parser.add_argument('--rchannel', type=str, default='cards',
                        help='Redis channel name (default: cards).')
    parser.add_argument('-v', '--verbose', help='Increase output verbosity.',
                        action='store_true')
    args = parser.parse_args()
    main(**vars(args))
