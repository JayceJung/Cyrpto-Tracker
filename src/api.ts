const BASE_URL = "https://api.coinpaprika.com/v1"

export function fetchCoins() {
    return fetch(`${BASE_URL}/coins`).then((res) => {
        return res.json()
    })
}
      
export function fetchCoinInfo(coinId: string) {
    return fetch(`${BASE_URL}/coins/${coinId}`).then((res) => {
        return res.json()
    })
}

export function fetchCoinTickers(coinId: string) {
    return fetch(`${BASE_URL}/tickers/${coinId}`).then((res) => {
        return res.json()
    })
}

export function fetchCoinHist(coinId: string) {
    const endDate = Math.floor(Date.now() / 1000);
    const startDate = endDate - 60 * 60 * 24 * 7 * 2;
    return fetch(`${BASE_URL}/coins/${coinId}/ohlcv/historical?start=${startDate}&end=${endDate}`).then((res) => {
        return res.json()
    }) 
}

export function fetchCurrentCoinData(coinId: string) {
    return fetch(`${BASE_URL}/coins/${coinId}/ohlcv/today`).then((res) => {
        return res.json()
    })
}