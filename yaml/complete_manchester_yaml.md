# Manchester Solar Domain Configuration
# Solar Domain Empire - Manchester.solar
# Last Updated: August 2025
# ⚠️ Master Reference Notice:
# This file was used to generate template.yaml v2.1.7.
# All future city YAMLs must follow the same structure, token logic, and field order.

city:
  name: "Manchester"
  display_name: "Manchester"
  region: "Greater Manchester"
  country: "United Kingdom"
  domain: "manchester.solar"
  slug: "manchester"
  postcode_prefix: "M"
  postcode_range: "M1-M99"

# Geographic Data
location:
  latitude: 53.4808
  longitude: -2.2426
  elevation: 38 # meters above sea level
  timezone: "Europe/London"
  climate_zone: "Temperate Oceanic"

# Solar Performance Data (Manchester Specific)
solar:
  peak_sun_hours: 3.8 # Daily average across the year
  annual_irradiance: 950 # kWh/m²/year
  optimal_tilt: 35 # degrees for Manchester latitude
  optimal_direction: "South"
  efficiency_factors:
    south: 1.0
    southwest: 0.95
    southeast: 0.95
    east: 0.8
    west: 0.8
    north: 0.6

# Economic Data (2025)
economics:
  average_home_bill_monthly: 120 # £ per month
  average_business_bill_monthly: 450 # £ per month
  electricity_rate: 0.28 # £ per kWh
  export_rate: 0.15 # £ per kWh (SEG average)
  vat_rate: 0.0 # 0% until March 2027
  
  # Savings Data
  savings:
    homeowner_annual: 1890 # £ average annual savings
    business_annual: 4200 # £ average annual savings
    payback_period: 6.8 # years average
    system_lifetime: 25 # years warranty period
    
  # System Costs (Installed)
  costs:
    residential_per_kw: 1100 # £ per kW installed
    commercial_per_kw: 950 # £ per kW installed
    battery_per_kwh: 800 # £ per kWh battery storage
    maintenance_annual: 150 # £ per year average

# Local Market Data
market:
  total_installations: 2800
  installations_last_year: 420
  mcs_installers: 47
  population: 547000 # Greater Manchester urban area
  households: 240000 # approximate
  suitable_properties: 85 # percentage
  market_penetration: 1.2 # percentage of suitable properties

# Environmental Impact
environment:
  co2_per_kwh: 0.233 # kg CO2 per kWh grid electricity
  average_home_co2_saving: 2.1 # tonnes CO2 per year
  trees_equivalent: 95 # trees planted equivalent per home system
  air_quality_index: "Moderate" # Manchester average
  renewable_energy_target: 2038 # Manchester carbon neutral target

# Local Authority Information
council:
  name: "Manchester City Council"
  website: "https://www.manchester.gov.uk"
  carbon_neutral_target: 2038
  renewable_initiatives:
    - "Manchester Climate Change Framework"
    - "Green City Region Partnership"
    - "Zero Carbon 2038 Strategy"
  planning_guidance: "Generally permitted development"
  conservation_areas: 28
  listed_buildings: 900 # approximate requiring additional permissions

# Demographics
demographics:
  median_age: 33.5
  homeowners: 62 # percentage
  private_rental: 28 # percentage
  social_housing: 10 # percentage
  average_household_income: 35000 # £ gross annual
  education_level_degree: 43 # percentage with degree+
  environmental_concern: "High" # based on local surveys

# Local Areas & Postcodes
areas:
  city_centre: ["M1", "M2", "M3", "M4", "M15"]
  north:
    - name: "North Manchester"
      postcodes: ["M8", "M9", "M25", "M40", "M45"]
      characteristics: ["Family homes", "Mixed housing", "Growing area"]
  south:
    - name: "South Manchester"  
      postcodes: ["M14", "M16", "M19", "M20", "M21", "M22", "M23"]
      characteristics: ["Affluent suburbs", "Large properties", "High solar potential"]
  east:
    - name: "East Manchester"
      postcodes: ["M11", "M12", "M13", "M18", "M43"]
      characteristics: ["Regeneration area", "Mixed development", "Growing market"]
  west:
    - name: "West Manchester/Trafford"
      postcodes: ["M5", "M6", "M7", "M17", "M32", "M33", "M41"]
      characteristics: ["Suburban", "Good roof space", "High adoption rate"]

# Weather Patterns
weather:
  annual_rainfall: 806 # mm per year
  rainy_days: 140 # days per year
  cloudy_days: 180 # days per year (partial/full cloud)
  sunny_days: 185 # days with good sun
  average_temp_summer: 16 # °C
  average_temp_winter: 4 # °C
  wind_speed_average: 15 # km/h
  snow_days: 12 # days per year average

# Images Configuration - Added: 2025-08-12 (Gold Standard v2.1.7)
# YAML-driven images for zero-touch city scaling
images:
  hero: "manchester-solar-hero.webp"               # Hero background image 1920x1080
  og_image: "og-image-manchester.jpg"              # Open Graph 1200x630
  twitter_card: "twitter-card-manchester.jpg"      # Twitter Card 1200x630

  # Benefit section images (Tesla 60% visual strategy)
  benefits:
    - file: "manchester-victorian-solar.webp"
      alt: "Solar panels installed on Victorian terraced house in Manchester with red brick facade"
    - file: "manchester-commercial-solar.webp"
      alt: "Large commercial rooftop solar array in Manchester business district"

  # Process step images (trust-building visuals)
  steps:
    - file: "roof-survey-manchester.webp"
      alt: "Professional MCS-certified installer conducting roof survey on Manchester home"
    - file: "solar-consultation-manchester.webp"
      alt: "Solar consultation meeting inside Manchester family home with system design"
    - file: "installation-complete-manchester.webp"
      alt: "Completed solar panel installation with satisfied Manchester homeowner"

  # Installer team photo (social proof)
  installer_team:
    file: "manchester-solar-installers.webp"
    alt: "Professional MCS-certified solar installation team in Manchester"

  # Installation gallery (local trust signals)
  gallery:
    - file: "didsbury-solar-install.webp"
      alt: "4.2kW solar system installed on family home in Didsbury, Manchester"
      caption: "Didsbury Family Home"
      details: "4.2kW • £1,650 annual savings"
      location: "M20 Didsbury"
    - file: "chorlton-terraced-solar.webp"
      alt: "Solar panels on Victorian terrace in Chorlton, Manchester"
      caption: "Chorlton Victorian Terrace"
      details: "3.8kW • £1,420 annual savings"
      location: "M21 Chorlton"
    - file: "trafford-warehouse-solar.webp"
      alt: "85kW commercial solar array on warehouse in Trafford Park, Manchester"
      caption: "Trafford Park Warehouse"
      details: "85kW • Commercial installation"
      location: "M17 Trafford Park"
    - file: "sale-new-build-solar.webp"
      alt: "Modern 5.1kW solar installation on new build home in Sale, Manchester"
      caption: "Sale New Build"
      details: "5.1kW • £1,980 annual savings"
      location: "M33 Sale"

# Local Landmarks & References
landmarks:
  - name: "Manchester Town Hall"
    postcode: "M60 2LA"
  - name: "Old Trafford Stadium"
    postcode: "M16 0RA"
    note: "Famous for football, also great solar potential"
  - name: "University of Manchester"
    postcode: "M13 9PL"
    note: "Leading solar research facility"
  - name: "Manchester Airport"
    postcode: "M90 1QX"
  - name: "Trafford Centre"
    postcode: "M17 8AA"
    note: "Large roof space solar installations"

# Transport & Infrastructure
transport:
  metrolink_zones: 4
  bus_networks: ["Stagecoach", "First Manchester", "Arriva"]
  major_roads: ["M60", "M56", "M62", "A57", "A580"]
  airports: ["Manchester Airport"]
  train_stations: ["Manchester Piccadilly", "Manchester Victoria", "Manchester Oxford Road"]

# Local Businesses & Economy
economy:
  major_employers:
    - "Manchester Airport Group"
    - "University of Manchester" 
    - "Manchester City Council"
    - "Co-operative Group"
    - "Bruntwood"
  business_types:
    - "Financial Services"
    - "Digital & Tech"
    - "Healthcare"
    - "Education"
    - "Retail"
  commercial_solar_potential: "Very High"
  industrial_solar_opportunities: "Excellent"

# Content Customization
content:
  hero_headline: "Solar Panels in Manchester — Home & Business Installers You Can Trust"
  hero_subtext_homeowner: "Save £1,890+ per year with professional solar installation in Manchester. Join 2,800+ local families already cutting energy bills."
  hero_subtext_business: "Reduce business energy costs by £4,200+ annually in Manchester. Professional commercial solar with guaranteed ROI."
  
  local_benefits:
    - "Manchester's 3.8 peak sun hours daily provide excellent solar performance"
    - "Take advantage of 0% VAT until 2027 - saving hundreds more"
    - "Support Manchester's 2038 carbon neutral target"
    - "Join 2,800+ Manchester residents already saving money"
    - "Perfect for Manchester's Victorian terraces and modern developments"
    - "Weather-resistant systems designed for Manchester's climate"

# FAQ Customization
faqs:
  local_questions:
    - question: "Do solar panels work well in Manchester's climate?"
      answer: "Yes! Solar panels work efficiently in Manchester, generating electricity from daylight rather than direct sunshine. Manchester receives 3.8 peak sun hours daily on average, which is sufficient for excellent solar performance. Even on cloudy days, modern panels continue producing clean energy."
    
    - question: "How much do solar panels cost in Manchester?"
      answer: "Solar panel costs in Manchester typically range from £4,000-£8,000 for residential installations. The exact price depends on your roof size, energy usage, and chosen system. With 0% VAT until 2027 and average savings of £1,890 per year, most Manchester homeowners see payback in 6-8 years."
    
    - question: "Do I need planning permission for solar panels in Manchester?"
      answer: "Most residential solar installations in Manchester don't require planning permission under Permitted Development Rights. However, listed buildings, conservation areas, or certain property types may need approval. Our MCS installers will check requirements and handle any necessary applications."

# SEO Configuration
seo:
  meta_title: "Solar Panels Manchester | Professional Installation | Free Quotes 2025"
  meta_description: "Solar panel installation in Manchester for homes and businesses. Save £1,890+ yearly with MCS-certified installers. Get free quotes today. 0% VAT until 2027."
  focus_keywords: 
    - "solar panels Manchester"
    - "Manchester solar installation" 
    - "solar installers Manchester"
    - "Manchester solar quotes"
  local_keywords:
    - "solar panels Didsbury"
    - "solar installers Chorlton"
    - "Manchester solar costs"
    - "Greater Manchester solar"

# Form Configuration
form:
  netlify_name: "manchester-solar-quotes"
  success_message: "Thank you! Your Manchester solar quote request has been received. You'll hear from a local MCS-certified installer within 24 hours."
  areas_served: 
    - "Manchester City Centre"
    - "Didsbury"
    - "Chorlton"
    - "Sale" 
    - "Altrincham"
    - "Stockport"
    - "Oldham"
    - "Rochdale"
    - "Salford"

# Analytics & Tracking
tracking:
  google_analytics: "G-XXXXXXXXX" # Replace with actual GA4 ID
  google_tag_manager: "GTM-XXXXXX" # Replace with actual GTM ID
  conversion_goals:
    - "Quote Form Submission"
    - "Calculator Usage"
    - "Phone Number Click"
    - "Email Click"

# Featured Installers (for installer showcase section)
featured_installers:
  - name: "Solar Manchester Ltd"
    avatar: "SM"
    rating: 4.9
    review_count: 127
    installations: 340
    experience_years: 8
    mcs_certified: true
    recc_member: true
    specialties: ["Residential", "Victorian terraces"]
    
  - name: "Green Solutions NW"
    avatar: "GS"
    rating: 4.8
    review_count: 89
    installations: 280
    experience_years: 6
    mcs_certified: true
    recc_member: true
    specialties: ["Commercial", "Battery storage"]
    
  - name: "EcoSolar Manchester"
    avatar: "ES"
    rating: 4.7
    review_count: 156
    installations: 420
    experience_years: 10
    mcs_certified: true
    recc_member: true
    specialties: ["Large residential", "EV charging"]

# Calculator Configuration (for interactive savings tool)
calculator:
  base_system_sizing: 200 # annual bill ÷ this = rough kW estimate
  manchester_generation_factor: 1387 # kWh per kW annually (3.8 sun hours × 365)
  self_consumption_rate: 0.35 # 35% used directly
  export_percentage: 0.65 # 65% exported to grid
  degradation_rate: 0.005 # 0.5% per year
  inflation_protection: 0.05 # 5% annual electricity price rises
  
  # System sizing by property type
  property_multipliers:
    detached: 1.2
    semi_detached: 1.0
    terraced: 0.8
    bungalow: 0.9
    flat: 0.4
    commercial: 2.5
    
  # Roof direction efficiency (matches solar.efficiency_factors)
  direction_efficiency:
    south: 1.0
    southwest: 0.95
    southeast: 0.95
    east: 0.8
    west: 0.8
    north: 0.6

# Trust Signals & Certifications
certifications:
  required: ["MCS", "RECC"]
  preferred: ["TrustMark", "Which? Trusted Trader", "NICEIC"]
  warranties:
    panels: 25 # years performance warranty
    inverters: 10 # years product warranty
    workmanship: 10 # years installation warranty
    battery: 10 # years if applicable
  insurance:
    public_liability: 2000000 # £2M minimum
    product_liability: 6000000 # £6M minimum

# Content Variations (for A/B testing)
content_variants:
  hero_headlines:
    - "Solar Panels in Manchester — Home & Business Installers You Can Trust"
    - "Manchester Solar Installation — Trusted Local Experts"
    - "Solar Power Manchester — Professional Installation & Advice"
    
  cta_primary: 
    - "Get Free Manchester Quotes"
    - "Find Trusted Local Installers"
    - "Get Solar Advice with No Pressure"
    - "Connect with MCS Installers"
    
  urgency_messages:
    - "0% VAT ends March 2027"
    - "Join 2,800+ Manchester families"
    - "Save £1,890+ starting this year"
    - "Limited certified installers available"
    
  trust_reinforcement:
    - "No spam guarantee • One installer contact • GDPR compliant"
    - "MCS certified • No pressure sales • Professional service only"
    - "Verified installers • No lead selling • Transparent process"

# Market Intelligence & Competition
market_intelligence:
  main_competitors: 
    - "Solar Together Greater Manchester"
    - "MCS Directory listings" 
    - "Individual installer websites"
    - "Comparison sites (Solar Guide, etc.)"
    
  our_differentiators:
    - "Single installer contact (no lead auctions)"
    - "No spam guarantee with GDPR compliance"
    - "Local Manchester focus with city-specific data"
    - "Educational approach over sales pressure"
    
  competitor_weaknesses:
    - "Lead farming to multiple installers"
    - "Generic national content"
    - "Aggressive sales tactics"
    - "Poor mobile experience"
    
  average_response_time: "24 hours"
  industry_conversion_rate: 0.08 # 8% industry average
  target_conversion_rate: 0.12 # 12% our target

# Lead Qualification & Scoring
lead_qualification:
  high_intent_indicators:
    monthly_bill_over: 100 # £100+ indicates larger property/usage
    property_types: ["detached", "semi_detached", "bungalow"]
    contact_preferences: ["morning", "afternoon"] # vs evening
    roof_directions: ["south", "southwest", "southeast"]
    urgency: ["asap", "3months"] # vs just researching
    
  postcode_priorities:
    tier_1: ["M20", "M21", "M14", "M16"] # Affluent south Manchester
    tier_2: ["M33", "M41", "M32", "M22"] # West Manchester suburbs  
    tier_3: ["M25", "M45", "M8", "M9"] # North Manchester growth areas
    
  disqualifiers:
    monthly_bill_under: 40 # Too small for viable system
    property_types: ["flat"] # Unless specific circumstances
    roof_directions: ["north"] # Poor solar performance
    
  lead_scoring:
    postcode_tier_1: 25 # points
    high_bill: 20 # £150+ monthly
    optimal_roof: 20 # south-facing
    suitable_property: 15 # detached/semi
    urgent_timeline: 10 # asap/3months
    homeowner: 10 # vs renting
    maximum_score: 100

# Advanced Configuration
advanced:
  seasonal_adjustments:
    q1_generation: 0.6 # Jan-Mar (60% of average)
    q2_generation: 1.3 # Apr-Jun (130% of average)
    q3_generation: 1.4 # Jul-Sep (140% of average) 
    q4_generation: 0.7 # Oct-Dec (70% of average)
    
  weather_impact:
    cloudy_day_output: 0.25 # 25% of clear day
    rainy_day_output: 0.15 # 15% of clear day
    snow_coverage_days: 5 # days per year with snow impact
    
  market_trends:
    adoption_growth_rate: 0.35 # 35% annual growth
    price_trend: -0.08 # -8% annual price reduction
    efficiency_improvement: 0.03 # 3% annual efficiency gains
    
  regulatory:
    seg_tariff_range: [0.01, 0.30] # 1p-30p per kWh
    fit_generation_rate: 0.0 # No longer available for new installations
    planning_permission_required_percentage: 15 # Listed buildings, conservation areas

# Integration Configuration
integrations:
  crm_fields:
    - lead_source: "manchester.solar"
    - city: "Manchester"
    - postcode_area: "extract from postcode"
    - estimated_system_size: "calculated"
    - estimated_annual_savings: "calculated"
    - lead_score: "calculated"
    
  analytics_events:
    - "calculator_usage"
    - "faq_expansion" 
    - "installer_profile_view"
    - "form_abandonment_step"
    - "quote_submission"
    
  email_automation:
    welcome_series: "manchester_welcome"
    nurture_sequence: "manchester_nurture"
    installer_alert: "new_manchester_lead"

# Content Management
content_refresh:
  stats_update_frequency: "quarterly"
  installer_profile_review: "monthly"
  faq_content_review: "bi-annually"
  pricing_data_refresh: "monthly"
  
performance_targets:
  page_load_speed: "< 2 seconds"
  mobile_performance_score: "> 90"
  conversion_rate_target: "> 12%"
  lead_quality_score: "> 75"

# Build Configuration
build:
  template_version: "2.1.7"
  last_updated: "2025-08-12"
  next_review_date: "2025-11-12"
  status: "active"
  priority: "high" # Master template city
  dependencies: ["mcs_installer_api", "postcode_validation", "weather_api"]