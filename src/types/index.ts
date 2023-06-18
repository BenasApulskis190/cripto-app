export interface Cryptocurrency {
  id: number;
  name: string;
  symbol: string;
  quote: {
    USD: {
      price: number;
      volume_24h: number;
      percent_change_24h: number;
    };
  };
}

export interface CryptocurrencyList {
  data: Cryptocurrency[];
  status: {
    total_count: number;
  };
}

export interface cryptocurrencyInfoList {
  category: string;
  token: string;
  circulating_supply: number;
  cmc_rank: number;
  date_added: string;
  id: number;
  infinite_supply: boolean;
  last_updated: string;
  logo: string;
  max_supply: null;
  name: string;
  num_market_pairs: number;
  platform: {
    id: number;
    name: string;
    slug: string;
    symbol: string;
    token_address: string;
  };
  quote: {
    USD: {
      fully_diluted_market_cap: number;
      last_updated: string;
      market_cap: number;
      market_cap_dominance: number;
      percent_change_1h: number;
      percent_change_7d: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_60d: number;
      percent_change_90d: number;
      price: number;
      tvl: null;
      volume_24h: number;
      volume_change_24h: number;
    };
  };
  self_reported_circulating_supply: null;
  self_reported_market_cap: null;
  slug: string;
  symbol: string;
  tags: string[];
  total_supply: number;
  tvl_ratio: null;
}

export interface CryptocurrencyInfo {
  data: {
    data: {
      urls: {
        website: string[];
        technical_doc: string[];
        twitter: string[];
        reddit: string[];
        message_board: string[];
        announcement: string[];
        chat: string[];
        explorer: string[];
        source_code: string[];
      };
      logo: string;
      id: number;
      name: string;
      symbol: string;
      slug: string;
      description: string;
      date_added: string;
      date_launched: string;
      tags: string[];
      platform: string | null;
      category: string;
    };
  };
  status: {
    total_count: number;
  };
}
