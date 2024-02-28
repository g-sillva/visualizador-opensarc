import scrapy

class ResourceSpider(scrapy.Spider):
    name="resourceSpider"

    def start_requests(self):
        start_urls = ["https://sarc.pucrs.br/Default/"]
        for url in start_urls:
            yield scrapy.Request(
                url=url,
                callback=self.parse,
            )

    def parse(self, response):
        containers = response.css("#MSO_ContentTable div div:nth-child(3) > div > table")

        aggregated_data = {}

        for content in containers:
            time = content.css("table tr td:nth-child(1) span::text").get()
            resourceTable = content.css("table tr td:nth-child(2)")
            lines = resourceTable.css("tr")[1:]

            for line in lines:
                item = {
                    "time": time,
                    "resource": line.css('td:nth-child(1) span::text').get(),
                    "discipline": line.css('td:nth-child(2) span::text').get(),
                    "responsible": line.css('td:nth-child(3) span::text').get(),
                }

                if time in aggregated_data:
                    aggregated_data[time].append(item)
                else:
                    aggregated_data[time] = [item]

        yield aggregated_data

