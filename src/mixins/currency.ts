import store from "@/store";
import { BigNumber } from "@/utils";

const locale = store.getters["ui/locale"];

export default {
  methods: {
    // Note: due to BigNumber config the max decimals is 5
    readableCrypto(
      value: string | undefined,
      appendCurrency = true,
      decimals = 5
    ): string | void {
      if (value) {
        const bigNumberValue = BigNumber.make(value);
        const normalizedValue: string = Number(
          bigNumberValue.dividedBy(1e5)
        ).toLocaleString(locale, {
          maximumFractionDigits: decimals,
        });

        return appendCurrency
          ? `${normalizedValue} ${
              store.getters["network/symbol"] ||
              store.getters["network/defaults"].symbol ||
              ""
            }`
          : normalizedValue;
      }
    },

    readableCurrency(
      value: string | number,
      rate: number | null = null,
      currency: string | null = null,
      normalise = true
    ): string {
      const currencyName: string = currency || store.getters["currency/name"];

      let bigNumberValue = BigNumber.make(value);

      if (normalise) {
        bigNumberValue = bigNumberValue.dividedBy(1e5);
      }

      bigNumberValue = bigNumberValue.times(
        rate || BigNumber.make(store.getters["currency/rate"])
      );

      const cryptos: { [key: string]: string } = {
        ARK: "Ѧ",
        BTC: "Ƀ",
        ETH: "Ξ",
        LTC: "Ł",
      };

      return [store.getters["network/token"], "BTC", "ETH", "LTC"].some(
        (c) => currencyName.indexOf(c) > -1
      )
        ? `${Number(bigNumberValue).toLocaleString(locale, {
            maximumFractionDigits: 5,
          })} ${cryptos[currencyName]}`
        : Number(bigNumberValue).toLocaleString(locale, {
            style: "currency",
            currency: currencyName,
          });
    },

    rawCurrency(value: number, currencyName: string): string {
      return [store.getters["network/token"], "BTC", "ETH", "LTC"].some(
        (c) => currencyName.indexOf(c) > -1
      )
        ? value.toLocaleString(locale, {
            maximumFractionDigits: 5,
          })
        : value.toLocaleString(locale, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          });
    },
  },
};
