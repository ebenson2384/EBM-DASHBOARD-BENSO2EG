# FEVS Dataset - Federal Employee Viewpoint Survey

## Recommended Dataset for Your Study
**Topic:** Workplace Communication → Job Performance

---

## Dataset Information

**Name:** Federal Employee Viewpoint Survey (FEVS)  
**Source:** U.S. Office of Personnel Management (OPM)  
**URL:** https://www.opm.gov/fevs/

### Why This Dataset?
- **600,000+ employee responses** annually
- **84 survey questions** covering communication, engagement, and performance
- **Public microdata available** for free
- **Longitudinal data:** 2002-present
- **Individual-level analysis** supported

---

## How to Download the Data

### Option 1: Direct Download (Recommended)
1. Visit: https://www.opm.gov/fevs/public-data-file/
2. Download the most recent year's **CSV or Excel file**
3. Save to this `/data` folder

### Option 2: Download via Command Line
```bash
# Navigate to the data directory
cd /Users/ethanbenson/Documents/EBM-Dashboard/data

# Download 2024 FEVS data (example - check website for latest)
curl -O https://www.opm.gov/fevs/public-data-file/2024/FEVS_2024_Data.csv

# Or use wget
wget https://www.opm.gov/fevs/public-data-file/2024/FEVS_2024_Data.csv
```

### Option 3: Use OPM's Online Analysis Tool
- **URL:** https://www.opm.gov/fevs/reports/
- Analyze data directly without downloading

---

## Your Logic Model: [X] → [M] → [Y]

### X (Independent Variable): Workplace Communication
**FEVS Variables:**
- **Q54:** "My supervisor listens to what I have to say"
- **Q56:** "My supervisor keeps me informed about matters affecting my work"
- **Q60:** "Managers communicate the goals and priorities of the organization"
- **Q61:** "Managers review and evaluate the organization's progress toward meeting its goals"
- **Q57:** "I receive constructive suggestions for improvement"

### M (Mediator): Employee Engagement
**FEVS Employee Engagement Index (composite of 15 items):**
- Q1: "I am given a real opportunity to improve my skills"
- Q3: "I feel encouraged to come up with new and better ways of doing things"
- Q4: "My work gives me a feeling of personal accomplishment"
- Q6: "I know what is expected of me on the job"
- Q11: "My talents are used well in the workplace"
- Q12: "I know how my work relates to the agency's goals and priorities"
- Q13: "The work I do is important"
- **Q40:** "I recommend my organization as a good place to work"
- Q69: "Considering everything, how satisfied are you with your job?"
- Q71: "Considering everything, how satisfied are you with your organization?"

**Other Potential Mediators:**
- **Job Satisfaction** (Q69, Q70, Q71)
- **Trust in Leadership** (Q51-Q61)
- **Teamwork** (Q19-Q23)

### Y (Dependent Variable): Job Performance
**FEVS Variables:**
- **Q12:** "I know how my work relates to the agency's goals and priorities"
- **Q13:** "The work I do is important"
- **Q15:** "I am held accountable for achieving results"
- **Q16:** "I can disclose a suspected violation without fear of reprisal"
- **Q23:** "The products and services my work unit produces are high quality"
- **Q4:** "My work gives me a feeling of personal accomplishment"
- **Organizational Performance Ratings** (agency-level outcomes)

### Control Variables
- **Demographics:** Age, tenure, education level, supervisory status
- **Job Characteristics:** Occupation, grade level, pay category
- **Organizational:** Agency, subagency, location
- **Work Arrangement:** Telework status, work schedule

---

## Data Files to Download

### Primary Dataset
- **File:** FEVS 2024 Governmentwide Management Report Data
- **Format:** CSV or Excel
- **Size:** ~50-100 MB
- **Respondents:** 600,000+

### Supporting Files
- **Codebook:** Variable definitions and survey questions
- **Technical Documentation:** Sampling methodology and weighting
- **Questionnaire:** Full text of all 84 questions

### Multiple Years (for longitudinal analysis)
- 2024, 2023, 2022, 2021, 2020, etc.
- Available back to 2002

---

## Analysis Strategy

### Step 1: Data Preparation
```r
# Example in R
library(tidyverse)

# Load FEVS data
fevs <- read_csv("data/FEVS_2024_Data.csv")

# Create composite variables
fevs <- fevs %>%
  mutate(
    communication = rowMeans(select(., Q54, Q56, Q60, Q61), na.rm = TRUE),
    engagement = rowMeans(select(., Q1, Q3, Q4, Q6, Q11, Q12, Q13), na.rm = TRUE),
    performance = rowMeans(select(., Q12, Q13, Q15, Q23), na.rm = TRUE)
  )
```

### Step 2: Mediation Analysis
Test your logic model: Communication → Engagement → Performance

**Recommended packages:**
- **R:** `lavaan`, `mediation`, `psych`
- **Python:** `statsmodels`, `scikit-learn`, `pingouin`
- **Stata:** `sem`, `bootstrap`

### Step 3: Model Specification
```
Performance = β₀ + β₁(Communication) + β₂(Engagement) + β₃(Controls) + ε

Mediation effect: Communication → Engagement → Performance
Direct effect: Communication → Performance
Total effect: Direct + Indirect
```

---

## Dataset Characteristics

### Strengths
✅ Large sample size (high statistical power)  
✅ Validated survey instrument  
✅ Covers all aspects of your logic model  
✅ Free and publicly available  
✅ Rich control variables  
✅ Government-quality data collection  

### Limitations
⚠️ Self-reported data (potential bias)  
⚠️ Federal employees only (generalizability)  
⚠️ Cross-sectional design (limited causal inference)  
⚠️ Performance measures are perceptual, not objective  

---

## Additional Resources

### Documentation
- **Main website:** https://www.opm.gov/fevs/
- **Data files:** https://www.opm.gov/fevs/public-data-file/
- **Reports:** https://www.opm.gov/fevs/reports/
- **About FEVS:** https://www.opm.gov/fevs/about/

### Research Using FEVS
- Search Google Scholar: "FEVS" OR "Federal Employee Viewpoint Survey"
- Example studies on workplace communication and performance
- Methodological papers on FEVS data analysis

### Contact for Questions
- **Email:** EVS@opm.gov
- **Phone:** (202) 606-2023

---

## Quick Start Checklist

- [ ] Download FEVS 2024 data file
- [ ] Download codebook/data dictionary
- [ ] Download questionnaire (to see exact wording)
- [ ] Review variable descriptions
- [ ] Identify X, M, Y variables in dataset
- [ ] Check sample size and missing data
- [ ] Plan analysis strategy
- [ ] Consider downloading multiple years for robustness

---

**Last Updated:** October 28, 2025  
**Dataset Recommendation:** Federal Employee Viewpoint Survey (FEVS)  
**Your Research:** Workplace Communication → Employee Engagement → Job Performance
