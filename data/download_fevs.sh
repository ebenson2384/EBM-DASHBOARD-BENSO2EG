# Download FEVS Dataset
# This script downloads the Federal Employee Viewpoint Survey data

# Create data directory if it doesn't exist
mkdir -p data

# Navigate to data directory
cd data

echo "======================================"
echo "FEVS Dataset Download Instructions"
echo "======================================"
echo ""
echo "The FEVS dataset cannot be automatically downloaded via curl/wget."
echo "Please manually download from the OPM website:"
echo ""
echo "1. Visit: https://www.opm.gov/fevs/public-data-file/"
echo "2. Click on the most recent year (e.g., 2024)"
echo "3. Download the CSV or Excel file"
echo "4. Save to: $(pwd)"
echo ""
echo "Recommended files to download:"
echo "  - FEVS_2024_Governmentwide_Data.csv (main dataset)"
echo "  - FEVS_2024_Data_Dictionary.xlsx (variable definitions)"
echo "  - FEVS_2024_Questionnaire.pdf (survey questions)"
echo ""
echo "For historical analysis, download multiple years:"
echo "  - 2023, 2022, 2021, 2020, etc."
echo ""
echo "======================================"

# Alternative: Open the website in default browser
echo "Opening FEVS website in your browser..."
open "https://www.opm.gov/fevs/public-data-file/" 2>/dev/null || \
xdg-open "https://www.opm.gov/fevs/public-data-file/" 2>/dev/null || \
echo "Please manually visit: https://www.opm.gov/fevs/public-data-file/"
