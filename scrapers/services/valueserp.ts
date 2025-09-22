import countries from '../../utils/countries';

interface ValueSerpResult {
   title: string,
   link: string,
   position: number,
   domain: string,
}

const valueSerp:ScraperSettings = {
   id: 'valueserp',
   name: 'Value Serp',
   website: 'valueserp.com',
   allowsCity: true,
   scrapeURL: (keyword: KeywordType, settings: SettingsType, countryData: countryData) => {
      const country = keyword.country || 'US';
      const countryName = countries[country][0];
      const locationParts = [keyword.city, keyword.state, countryName].filter(Boolean);
      const location = keyword.city || keyword.state ? `&location=${encodeURIComponent(locationParts.join(','))}` : '';
      const device = keyword.device === 'mobile' ? '&device=mobile' : '';
      const lang = countryData[country][2];
      console.log(`https://api.valueserp.com/search?api_key=${settings.scraping_api}&q=${encodeURIComponent(keyword.keyword)}&gl=${country}&hl=${lang}${device}${location}&num=100&output=json&include_answer_box=false&include_advertiser_info=false`);
      return `https://api.valueserp.com/search?api_key=${settings.scraping_api}&q=${encodeURIComponent(keyword.keyword)}&gl=${country}&hl=${lang}${device}${location}&num=100&output=json&include_answer_box=false&include_advertiser_info=false`;
   },
   resultObjectKey: 'organic_results',
   serpExtractor: (content) => {
      const extractedResult = [];
      let results: ValueSerpResult[];
      if (typeof content === 'string') {
         try {
            results = JSON.parse(content) as ValueSerpResult[];
         } catch (error) {
            throw new Error(`Invalid JSON response for Value Serp: ${error instanceof Error ? error.message : error}`);
         }
      } else {
         results = content as ValueSerpResult[];
      }
      for (const result of results) {
         if (result.title && result.link) {
            extractedResult.push({
               title: result.title,
               url: result.link,
               position: result.position,
            });
         }
      }
      return extractedResult;
   },
};

export default valueSerp;
