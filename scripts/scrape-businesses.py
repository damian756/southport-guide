#!/usr/bin/env python3
"""
Scrape Southport businesses using Google Places API and export to CSV.
Requires: pip install requests python-dotenv
Usage: python scripts/scrape-businesses.py
"""

import os
import csv
import requests
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

API_KEY = os.getenv('GOOGLE_PLACES_API_KEY')
if not API_KEY:
    print("Error: GOOGLE_PLACES_API_KEY not found in .env.local or .env")
    print("Get a key from: https://console.cloud.google.com/apis/credentials")
    exit(1)

# Southport coordinates (town center)
SOUTHPORT_LAT = 53.6476
SOUTHPORT_LNG = -3.0052
RADIUS_METERS = 5000  # 5km radius

# Category mapping: Google Places type -> our category slug
CATEGORY_MAP = {
    'restaurant': 'restaurants',
    'cafe': 'cafes',
    'bar': 'bars-nightlife',
    'night_club': 'bars-nightlife',
    'lodging': 'hotels',
    'tourist_attraction': 'attractions',
    'park': 'beaches-parks',
    'store': 'shopping',
    'shopping_mall': 'shopping',
    'spa': 'wellness',
    'beauty_salon': 'wellness',
    'hair_care': 'wellness',
    'gym': 'wellness',
    'taxi_stand': 'transport',
    'gas_station': 'transport',
}

# Google Places types to search
SEARCH_TYPES = [
    'restaurant',
    'cafe',
    'bar',
    'night_club',
    'lodging',
    'tourist_attraction',
    'park',
    'store',
    'shopping_mall',
    'spa',
    'beauty_salon',
    'gym',
]

def search_places(place_type):
    """Search for places of a given type near Southport."""
    url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json'
    params = {
        'location': f'{SOUTHPORT_LAT},{SOUTHPORT_LNG}',
        'radius': RADIUS_METERS,
        'type': place_type,
        'key': API_KEY
    }
    
    results = []
    while True:
        response = requests.get(url, params=params)
        data = response.json()
        
        if data.get('status') != 'OK':
            print(f"  Warning: {place_type} search returned status {data.get('status')}")
            break
        
        results.extend(data.get('results', []))
        
        # Check for next page
        next_page_token = data.get('next_page_token')
        if not next_page_token:
            break
        
        # Wait a bit (Google requires delay before using next_page_token)
        import time
        time.sleep(2)
        params = {'pagetoken': next_page_token, 'key': API_KEY}
    
    return results

def get_place_details(place_id):
    """Get detailed info for a place (phone, website)."""
    url = 'https://maps.googleapis.com/maps/api/place/details/json'
    params = {
        'place_id': place_id,
        'fields': 'formatted_phone_number,website,opening_hours,price_level',
        'key': API_KEY
    }
    
    response = requests.get(url, params=params)
    data = response.json()
    
    if data.get('status') == 'OK':
        return data.get('result', {})
    return {}

def main():
    print("Scraping Southport businesses...")
    print(f"Center: {SOUTHPORT_LAT}, {SOUTHPORT_LNG} | Radius: {RADIUS_METERS}m")
    
    all_businesses = {}  # Use dict to dedupe by place_id
    
    for place_type in SEARCH_TYPES:
        print(f"\nSearching: {place_type}...")
        places = search_places(place_type)
        print(f"  Found {len(places)} results")
        
        for place in places:
            place_id = place.get('place_id')
            if place_id in all_businesses:
                continue  # Skip duplicates
            
            # Get category slug
            category_slug = CATEGORY_MAP.get(place_type, 'attractions')
            
            # Get basic info
            name = place.get('name', '')
            address = place.get('vicinity', '')
            lat = place.get('geometry', {}).get('location', {}).get('lat')
            lng = place.get('geometry', {}).get('location', {}).get('lng')
            
            # Get detailed info (phone, website) - optional to reduce API calls
            # Uncomment if you want full details (will be slower and use more quota)
            # details = get_place_details(place_id)
            # phone = details.get('formatted_phone_number', '')
            # website = details.get('website', '')
            # price_level = details.get('price_level', '')
            
            all_businesses[place_id] = {
                'name': name,
                'category': category_slug,
                'address': address,
                'postcode': '',  # Extract from address if needed
                'lat': lat,
                'lng': lng,
                'phone': '',  # details.get('formatted_phone_number', ''),
                'website': '',  # details.get('website', ''),
                'price_range': '',  # Convert price_level to £ symbols if needed
            }
    
    # Write to CSV
    output_file = 'businesses.csv'
    with open(output_file, 'w', newline='', encoding='utf-8') as f:
        fieldnames = ['name', 'category', 'address', 'postcode', 'lat', 'lng', 'phone', 'website', 'price_range']
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        
        for business in all_businesses.values():
            writer.writerow(business)
    
    print(f"\n✓ Scraped {len(all_businesses)} unique businesses")
    print(f"✓ Saved to {output_file}")
    print("\nNext: Run the import script to add these to your database:")
    print("  npm run import-businesses")

if __name__ == '__main__':
    main()
