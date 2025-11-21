#!/usr/bin/env python3
"""
Download FEVS (Federal Employee Viewpoint Survey) Dataset
This script attempts to download the latest FEVS data from OPM
"""

import urllib.request
import ssl
import re
import os

def download_fevs():
    print("=" * 60)
    print("FEVS Dataset Downloader")
    print("=" * 60)
    print()
    
    # Create SSL context that doesn't verify certificates (for government sites)
    ssl_context = ssl.create_default_context()
    ssl_context.check_hostname = False
    ssl_context.verify_mode = ssl.CERT_NONE
    
    # Known FEVS data URLs (update these as needed)
    urls_to_try = [
        # 2024 data
        "https://www.opm.gov/fevs/reports/governmentwide-reports/governmentwide-management-report/governmentwide-management-report/2024/2024-governmentwide-management-report-data.xlsx",
        "https://www.opm.gov/fevs/reports/data-reports/2024-employee-viewpoint-survey-results.csv",
        
        # 2023 data (as backup)
        "https://www.opm.gov/fevs/reports/governmentwide-reports/governmentwide-management-report/governmentwide-management-report/2023/2023-governmentwide-management-report-data.xlsx",
        
        # Alternative formats
        "https://www.opm.gov/fevs/public-data-file/2024/fevs-2024-data.csv",
        "https://www.opm.gov/fevs/public-data-file/2023/fevs-2023-data.csv",
    ]
    
    print("Attempting to download FEVS data files...")
    print()
    
    success = False
    for url in urls_to_try:
        filename = os.path.basename(url)
        print(f"Trying: {url}")
        print(f"  → Saving as: {filename}")
        
        try:
            req = urllib.request.Request(
                url, 
                headers={'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'}
            )
            
            with urllib.request.urlopen(req, context=ssl_context, timeout=30) as response:
                content_type = response.headers.get('Content-Type', '')
                content_length = response.headers.get('Content-Length', '0')
                
                # Check if it's actually a file (not HTML error page)
                if 'text/html' in content_type:
                    print(f"  ✗ Not a data file (HTML page returned)")
                    continue
                    
                data = response.read()
                file_size = len(data)
                
                # FEVS data should be at least 1MB
                if file_size < 1000000:
                    print(f"  ✗ File too small ({file_size} bytes) - likely not the dataset")
                    continue
                
                # Save the file
                with open(filename, 'wb') as f:
                    f.write(data)
                
                print(f"  ✓ SUCCESS! Downloaded {file_size:,} bytes")
                print(f"  ✓ Saved to: {filename}")
                print()
                success = True
                
        except urllib.error.HTTPError as e:
            print(f"  ✗ HTTP Error {e.code}: {e.reason}")
        except urllib.error.URLError as e:
            print(f"  ✗ URL Error: {e.reason}")
        except Exception as e:
            print(f"  ✗ Error: {str(e)}")
        
        print()
    
    if not success:
        print("=" * 60)
        print("AUTOMATIC DOWNLOAD FAILED")
        print("=" * 60)
        print()
        print("The FEVS dataset requires manual download from the OPM website.")
        print()
        print("Please follow these steps:")
        print()
        print("1. Visit: https://www.opm.gov/fevs/public-data-file/")
        print()
        print("2. Click on the most recent year (2024 or latest available)")
        print()
        print("3. Download these files to this folder:")
        print("   - Governmentwide Management Report Data (Excel/CSV)")
        print("   - Data Dictionary (Excel)")
        print("   - Questionnaire (PDF)")
        print()
        print("4. Look for files named like:")
        print("   - 2024-Governmentwide-Management-Report-Data.xlsx")
        print("   - 2024-FEVS-Data-Dictionary.xlsx")
        print("   - 2024-FEVS-Questionnaire.pdf")
        print()
        print("5. Save them to: " + os.getcwd())
        print()
        print("=" * 60)
        
        # Try to open the browser
        try:
            import webbrowser
            print("Opening the FEVS website in your browser...")
            webbrowser.open("https://www.opm.gov/fevs/public-data-file/")
        except:
            pass
    else:
        print("=" * 60)
        print("DOWNLOAD SUCCESSFUL!")
        print("=" * 60)
        print()
        print("Next steps:")
        print("1. Check the downloaded file(s) above")
        print("2. Review FEVS_DATA_README.md for variable information")
        print("3. Start your analysis!")
        print()

if __name__ == "__main__":
    download_fevs()
