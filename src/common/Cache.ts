export class Cache<T> {
    cache: {[key: string]: { data: T, expires: Date }} = {};

    hasKey(key: string, allowExpired: boolean = false) {
        if (allowExpired) {
            return key in this.cache;
        } else {
            return key in this.cache && (new Date()) < this.cache[key].expires;
        }
    }

    hasExpired(key: string) {
        if (!(key in this.cache)) {
            return undefined;
        } else {
            return (new Date()) >= this.cache[key].expires;
        }
    }

    add(key: string, value: T, ttl: number) {
        const expirationDate = new Date();
        expirationDate.setSeconds(expirationDate.getSeconds() + ttl);

        this.cache[key] = {
            data: value,
            expires: expirationDate
        };
    }

    get(key: string, allowExpired = false) {
        if (!allowExpired && this.hasKey(key)) {
            return this.cache[key].data;
        }
        if (allowExpired && key in this.cache) {
            return this.cache[key].data;
        }
        return undefined;
    }
}
