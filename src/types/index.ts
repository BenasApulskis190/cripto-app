export interface Cryptocurrency {
  id: number
  name: string
  symbol: string
  quote: {
    USD: {
      price: number
      volume_24h: number
      percent_change_24h: number
    }
  }
}

export interface CryptocurrencyList {
  data: Cryptocurrency[]
  status: {
    total_count: number
  }
}

export interface cryptocurrencyInfoList {
  id: string
  name: string
  symbol: string
  category: string
  logo: string
}

export interface CryptocurrencyInfo {
  data: {
    data: {
      urls: {
        website: string[]
        technical_doc: string[]
        twitter: string[]
        reddit: string[]
        message_board: string[]
        announcement: string[]
        chat: string[]
        explorer: string[]
        source_code: string[]
      }
      logo: string
      id: number
      name: string
      symbol: string
      slug: string
      description: string
      date_added: string
      date_launched: string
      tags: string[]
      platform: string | null
      category: string
    }
  }
  status: {
    total_count: number
  }
}
