import requests
import json
from config import API_KEY

HEADERS = {'Authorization': f'Bearer {API_KEY}'}
SEARCH_URL = 'https://api.yelp.com/v3/businesses/search'

cities = [
    'New York, NY', 'Los Angeles, CA', 'Chicago, IL', 'Houston, TX', 'Phoenix, AZ',
    'Philadelphia, PA', 'San Antonio, TX', 'San Diego, CA', 'Dallas, TX', 'San Jose, CA',
    'Austin, TX', 'Jacksonville, FL', 'Fort Worth, TX', 'Columbus, OH', 'Charlotte, NC',
    'San Francisco, CA', 'Indianapolis, IN', 'Seattle, WA', 'Denver, CO', 'Washington, DC'
]

hitch_installers = []

for city in cities:
    params = {
        'term': 'hitch installers',
        'location': city,
        'limit': 50
    }
    response = requests.get(SEARCH_URL, headers=HEADERS, params=params)
    data = response.json()
    
    for business in data.get('businesses', []):
        installer = {
            'Name': business['name'],
            'Type': business['categories'][0]['title'] if business['categories'] else 'N/A',
            'Address': ', '.join(business['location']['display_address']),
            'Latitude': business['coordinates']['latitude'],
            'Longitude': business['coordinates']['longitude'],
            'Rating': business.get('rating', 'N/A'),
            'Review_Count': business.get('review_count', 'N/A')
        }
        hitch_installers.append(installer)

with open('hotshot_truck_sellers.json', 'w') as f:
    json.dump(hitch_installers, f, indent=4)

print("Hitch installers data saved to 'hotshot_truck_sellers.json'")
