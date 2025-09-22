import { resolveCountryCode } from '../../utils/scraperHelpers';

interface SerplyResult {
   title: string,
   link: string,
   realPosition: number,
}
const scraperCountries = ['US', 'CA', 'IE', 'GB', 'FR', 'DE', 'SE', 'IN', 'JP', 'KR', 'SG', 'AU', 'BR'];

const serply:ScraperSettings = {
   id: 'serply',
   name: 'Serply',
   website: 'serply.io',
   headers: (keyword, settings) => {
      const country = resolveCountryCode(keyword.country, scraperCountries);
      return {
         'Content-Type': 'application/json',
         'X-User-Agent': keyword.device === 'mobile' ? 'mobile' : 'desktop',
         'X-Api-Key': settings.scraping_api,
         'X-Proxy-Location': country,
      };
   },
   scrapeURL: (keyword) => {
      const country = resolveCountryCode(keyword.country, scraperCountries);
      const searchParams = new URLSearchParams({
         q: keyword.keyword,
         num: '100',
         hl: country,
      });
      return `https://api.serply.io/v1/search?${searchParams.toString()}`;
   },
   resultObjectKey: 'result',
   serpExtractor: (content) => {
      const extractedResult = [];
      let results: SerplyResult[];
      if (typeof content === 'string') {
         try {
            results = JSON.parse(content) as SerplyResult[];
         } catch (error) {
            throw new Error(`Invalid JSON response for Serply: ${error instanceof Error ? error.message : error}`);
         }
      } else {
         results = content as SerplyResult[];
      }
      for (const result of results) {
         if (result.title && result.link) {
            extractedResult.push({
               title: result.title,
               url: result.link,
               position: result.realPosition,
            });
         }
      }
      return extractedResult;
   },
};

export default serply;
