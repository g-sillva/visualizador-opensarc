import scrapy

class ResourceSpider(scrapy.Spider):
    name="resource_spider"

    def parse(self, response):
        containers = response.css("#MSO_ContentTable div div:nth-child(3) > div > table")

        aggregated_data = {}

        for content in containers:
            timeCode = content.css("table tr td:nth-child(1) span::text").get()
            time = self.formatTime(timeCode)
            resourceTable = content.css("table tr td:nth-child(2)")
            lines = resourceTable.css("tr")[1:]

            for line in lines:
                item = {
                    "time": time,
                    "timeCode": timeCode,
                    "resource": line.css('td:nth-child(1) span::text').get().strip(),
                    "discipline": line.css('td:nth-child(2) span::text').get().strip(),
                    "responsible": line.css('td:nth-child(3) span::text').get().strip(),
                }

                if time in aggregated_data:
                    aggregated_data[time].append(item)
                else:
                    aggregated_data[time] = [item]

        yield aggregated_data

    def formatTime(self, time):
        time_map = {
            'a': '08:00',
            'b': '08:45',
            'c': '09:45',
            'd': '10:30',
            'e': '11:30',
            'e1': '12:15',
            'f': '14:00',
            'g': '14:45',
            'h': '15:45',
            'i': '16:30',
            'j': '17:30',
            'k': '18:15',
            'l': '19:15',
            'm': '20:00',
            'n': '21:00',
            'p': '21:45'
        }

        return time_map[time[0].lower()]