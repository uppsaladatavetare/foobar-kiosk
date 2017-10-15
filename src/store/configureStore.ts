import { useStrict } from "mobx";
import { cartStore } from "store/CartStore";
import { accountStore } from "store/AccountStore";

export function configureStore() {
    useStrict(true);

    const subscribeTo = config.SCREEN === "primary" ? ["products", "cards"] : ["state"];
    Thunder.connect(config.THUNDER.host, config.THUNDER.key, subscribeTo);
    Thunder.listen((data) => {
        if (data.channel === "products") {
            cartStore.fetchProduct(JSON.parse(data.payload));
        } else if (data.channel === "cards") {
            accountStore.login(data.payload);
        } else if (data.channel === "state") {
            // FIXME
        }
    });
}
