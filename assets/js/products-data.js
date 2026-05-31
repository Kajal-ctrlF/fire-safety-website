// FireShield — product & category data (images: Wikimedia Commons, CC-licensed fire safety equipment)
'use strict';

const IMG = {
  // Category hero images (unique — not reused on product cards)
  catExtinguishers: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Abc_fire_extinguisher.jpg',
  catHydrants: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Brandkraan_hydrant.jpg/960px-Brandkraan_hydrant.jpg',
  catAlarms: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Fire_alarm_control_panel_VERS-PK_2.jpg/960px-Fire_alarm_control_panel_VERS-PK_2.jpg',
  catDetectors: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Schneider_Electric_smoke_detector.JPG/960px-Schneider_Electric_smoke_detector.JPG',
  catEmergency: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Emergency_exit_light.jpg/960px-Emergency_exit_light.jpg',
  catSignage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/ISO_7010_E004.svg/960px-ISO_7010_E004.svg.png',
  catPpe: 'https://upload.wikimedia.org/wikipedia/commons/5/57/F120_Pro_SCHUBERTH_Feuerwehrhelm_Nachleuchtend.png',
  catAccessories: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Nozzels.jpg/960px-Nozzels.jpg',

  // Product images (one unique image per SKU)
  p01: 'https://upload.wikimedia.org/wikipedia/commons/0/04/Alat_Pemadam_Api_ABC_Powder_6_Kg.jpg',
  p02: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Carbon_dioxide_fire_extinguisher.jpg/960px-Carbon_dioxide_fire_extinguisher.jpg',
  p03: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Alat_Pemadam_Api_Media_Foam_Busa_9_Kg.jpg/960px-Alat_Pemadam_Api_Media_Foam_Busa_9_Kg.jpg',
  p04: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Light_Water_Extinguishers_%286538042763%29.jpg/960px-Light_Water_Extinguishers_%286538042763%29.jpg',
  p05: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Camellia_Hotel_fire_hose_box.JPG/960px-Camellia_Hotel_fire_hose_box.JPG',
  p06: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Valves_fire_hydrant.jpg/960px-Valves_fire_hydrant.jpg',
  p07: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Fire_pump.jpg/960px-Fire_pump.jpg',
  p08: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Hydrant_MG_0436.JPG/960px-Hydrant_MG_0436.JPG',
  p09: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/AddressablePanelOfFireDetectionSystem.JPG/960px-AddressablePanelOfFireDetectionSystem.JPG',
  p10: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Nittan_Proprietary-type_class_1_fire_alarm_control_panel.JPG/960px-Nittan_Proprietary-type_class_1_fire_alarm_control_panel.JPG',
  p11: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Gent_1102_Manual_Call_Point.jpg/960px-Gent_1102_Manual_Call_Point.jpg',
  p12: 'https://upload.wikimedia.org/wikipedia/commons/b/b9/Fire-Alarm-System-Devices.jpg',
  p13: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Photoelectric_spot_type_smoke_detector.JPG/960px-Photoelectric_spot_type_smoke_detector.JPG',
  p14: 'https://upload.wikimedia.org/wikipedia/commons/f/f0/Residential_smoke_detector_2.jpg',
  p15: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Smoke%2C_heat_detector_IPK-TU.jpg/960px-Smoke%2C_heat_detector_IPK-TU.jpg',
  p16: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Rilevatore_fumo_3.jpg/960px-Rilevatore_fumo_3.jpg',
  p17: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Lampada_di_emergenza_1.jpg/960px-Lampada_di_emergenza_1.jpg',
  p18: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Sure-Lites_emergency_exit_light_2.jpg/960px-Sure-Lites_emergency_exit_light_2.jpg',
  p19: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Emergency_Exit_Sign_Europe_EU_%2817490734555%29.jpg/960px-Emergency_Exit_Sign_Europe_EU_%2817490734555%29.jpg',
  p20: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Emergency_exit_sign_2016.jpg/960px-Emergency_exit_sign_2016.jpg',
  p21: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Fire_extinguisher_with_ID_sign%2C_call_point_and_fire_action_sign.JPG/960px-Fire_extinguisher_with_ID_sign%2C_call_point_and_fire_action_sign.JPG',
  p22: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Emergency_exit_sign_%2842050562511%29.jpg/960px-Emergency_exit_sign_%2842050562511%29.jpg',
  p23: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/ISO_7010_F001.svg/960px-ISO_7010_F001.svg.png',
  p24: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/ISO_7010_E007.svg/960px-ISO_7010_E007.svg.png',
  p25: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Fireman_Helmet_-_panoramio.jpg/960px-Fireman_Helmet_-_panoramio.jpg',
  p26: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Aircraft_Rescue_Firefighting_training.jpg/960px-Aircraft_Rescue_Firefighting_training.jpg',
  p27: 'https://upload.wikimedia.org/wikipedia/commons/b/b4/Feuerwehrstiefel.jpg',
  p28: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/140408-N-RY581-025_Angel_Lopez_conducts_SCBA_checks.jpg/960px-140408-N-RY581-025_Angel_Lopez_conducts_SCBA_checks.jpg',
  p29: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Fire_Hose_Reel_and_Fire_Hydrant_in_Brisbane%2C_Australia.jpg/960px-Fire_Hose_Reel_and_Fire_Hydrant_in_Brisbane%2C_Australia.jpg',
  p30: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/247_Home_Rescue_fire_blanket.jpg/960px-247_Home_Rescue_fire_blanket.jpg',
  p31: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Fire_hose_storage_rack.jpg/960px-Fire_hose_storage_rack.jpg',
  p32: 'https://upload.wikimedia.org/wikipedia/commons/6/69/Sme_brass_guillemin.jpg'
};

const categoryMeta = {
  'Fire Extinguishers': {
    tagline: 'Portable Fire Fighting',
    image: IMG.catExtinguishers,
    short: 'ISI-marked portable extinguishers for Class A, B, C and electrical fire risks.',
    description: 'FireShield supplies stored-pressure portable fire extinguishers for first-response fire fighting across industrial, commercial and residential premises. The range covers ABC dry powder, CO₂, AFFF foam and water-type units manufactured to IS 15683 with BIS certification.',
    overview: 'Each extinguisher is pressure-tested, fitted with a gauge (where applicable), safety pin, operating instructions and wall bracket. Units are suitable for shop floors, electrical rooms, kitchens, vehicle bays and common areas. Refilling, hydrostatic testing and annual maintenance are available on contract.',
    highlights: ['IS 15683 / BIS certified range', 'ABC, CO₂, AFFF foam & water types', 'Wall bracket supplied', 'Suitable for NBC & industrial use', 'Refilling & AMC support', 'Bulk pricing for projects'],
    applications: ['Manufacturing plants', 'Commercial towers', 'Hotels & hospitals', 'Schools & colleges', 'Residential societies', 'Retail & warehousing'],
    standards: 'IS 15683 · BIS · NFPA 10 · PESO guidelines'
  },
  'Fire Hydrant Systems': {
    tagline: 'Wet Riser & Yard Hydrants',
    image: IMG.catHydrants,
    short: 'BIS-compliant hydrant valves, pumps, pillars and hose assemblies for high-volume fire water networks.',
    description: 'Complete wet-riser and yard hydrant components for compliant fire water distribution — landing valves, stand post hydrants, diesel/electric fire pumps, hose cabinets and RRL hose assemblies rated for sustained high-pressure operation.',
    overview: 'Components are selected for PN16 service in factories, refineries, high-rise buildings and infrastructure projects. FireShield provides layout guidance, pump sizing support, pressure testing and commissioning documentation for turnkey hydrant installations.',
    highlights: ['Gunmetal landing valves', 'Diesel & electric pump sets', 'RRL hose compatible', 'PN16 rated assemblies', 'Turnkey project support', 'Factory & refinery grade'],
    applications: ['Oil & gas facilities', 'Power plants', 'High-rise buildings', 'Industrial parks', 'Marine & port areas', 'Infrastructure projects'],
    standards: 'BIS · IS 9668 · NFPA 14 · NFPA 20'
  },
  'Fire Alarm Systems': {
    tagline: 'Detection & Alarm',
    image: IMG.catAlarms,
    short: 'Conventional and addressable fire alarm control panels with field devices for early warning.',
    description: 'Microprocessor-based fire alarm systems from economical multi-zone conventional panels to expandable addressable FACPs with LCD diagnostics, event logging and network integration capability.',
    overview: 'Systems are configured for compliance with IS 2189 and NFPA 72 topologies. FireShield supplies panels, manual call points, sounders, strobes and interface modules with commissioning support and annual maintenance contracts.',
    highlights: ['Addressable & conventional FACPs', 'Manual call points & sounders', 'LCD event display', 'BMS integration ready', 'Strobe beacons for noisy areas', 'Commissioning & AMC'],
    applications: ['Smart buildings', 'Hospitals & clinics', 'Shopping malls', 'IT parks & data centres', 'Hotels & airports', 'Educational campuses'],
    standards: 'IS 2189 · NFPA 72 · EN 54 · CE options'
  },
  'Smoke Detectors': {
    tagline: 'Automatic Detection',
    image: IMG.catDetectors,
    short: 'Photoelectric, ionization and multi-sensor detectors with addressable bases for reliable early warning.',
    description: 'Spot-type fire detectors for ceiling-mounted automatic detection — photoelectric units for smouldering fires, ionization models for fast-flaming events, and multi-sensor devices combining smoke and heat sensing with false-alarm immunity.',
    overview: 'Correct detector selection is critical for each space type. FireShield supplies compatible mounting bases, sounder bases, isolator bases and test equipment for new builds, retrofits and phased upgrades.',
    highlights: ['Photoelectric & ionization types', 'Multi-sensor smoke + heat', 'Addressable bases with isolator', 'Drift compensation', 'Low-profile ceiling mount', 'Reduced false-alarm design'],
    applications: ['Server rooms', 'Office floors', 'Hotel guest rooms', 'Kitchen-adjacent areas', 'Warehouse aisles', 'Clean room facilities'],
    standards: 'IS 2175 · UL 268 · EN 54-7 · EN 54-5'
  },
  'Emergency Lights': {
    tagline: 'Escape Route Lighting',
    image: IMG.catEmergency,
    short: 'Maintained and non-maintained LED emergency luminaires with statutory 3-hour battery backup.',
    description: 'Emergency lighting keeps escape routes illuminated during mains failure. The range includes LED exit luminaires, twin-spot units, sign/light combo fittings and IP65 bulkheads for basements, car parks and external routes.',
    overview: 'Luminaires use high-efficiency LED modules with Ni-Cd or LiFePO₄ battery packs and self-test compatible circuitry. Products align with NBC India emergency lighting requirements and EN 1838 duration standards.',
    highlights: ['3-hour battery backup', 'Running-man exit combos', 'Twin-spot & bulkhead units', 'Self-test compatible', 'Maintained & non-maintained', 'IP65 outdoor options'],
    applications: ['Office corridors', 'Stairwells & exits', 'Car parks & basements', 'Hospitals & malls', 'Factory production floors', 'Public assembly halls'],
    standards: 'IS 10322 · NBC India · EN 1838 · EN 60598-2-22'
  },
  'Safety Signages': {
    tagline: 'Statutory Signage',
    image: IMG.catSignage,
    short: 'IS 9457 and ISO 7010 compliant fire safety signages for equipment, routes and assembly points.',
    description: 'Mandatory fire safety signage for extinguisher locations, hose reels, manual call points, exit routes and muster points. Available in rigid PVC, ACP, photoluminescent and post-mounted formats.',
    overview: 'Signages follow IS 9457 colour conventions — red for fire-fighting equipment, green for escape routes and blue for mandatory actions. Photoluminescent signs provide visibility during power failure without external power.',
    highlights: ['Photoluminescent exit routes', 'Equipment location boards', 'Assembly & muster point signs', 'Custom site text available', 'UV-resistant outdoor panels', 'Self-adhesive & rigid formats'],
    applications: ['Factory shop floors', 'Warehouse aisles', 'Office buildings', 'Construction sites', 'Public venues', 'Parking structures'],
    standards: 'IS 9457 · ISO 7010 · NBC signage norms'
  },
  'PPE Equipment': {
    tagline: 'Firefighter PPE',
    image: IMG.catPpe,
    short: 'Structural firefighting and industrial response PPE — helmets, proximity suits, boots and SCBA.',
    description: 'Personal protective equipment for municipal brigades and in-plant emergency response teams — EN/IS compliant helmets, aluminized proximity suits, heat-resistant boots and positive-pressure SCBA sets.',
    overview: 'Equipment is supplied with conformity documentation and sizing guidance. SCBA and turnout gear orders include inspection intervals per NFPA 1852 and manufacturer service schedules.',
    highlights: ['EN 443 helmets with visor', 'Aluminized proximity suits', 'SCBA positive-pressure sets', 'Steel toe-cap fire boots', 'Heat & flame resistant materials', 'Inspection & training support'],
    applications: ['Fire brigades', 'Oil & gas refineries', 'Steel & metal plants', 'Chemical facilities', 'Industrial ERT teams', 'Confined space entry'],
    standards: 'EN 443 · EN 1486 · EN ISO 20345 · IS 2745 · NFPA 1981'
  },
  'Fire Fighting Accessories': {
    tagline: 'Hoses & Couplings',
    image: IMG.catAccessories,
    short: 'RRL fire hoses, Storz couplings, hose reels, fire blankets and branch pipe nozzles.',
    description: 'Accessories to complete hydrant networks and standalone fire points — BIS-certified RRL hose assemblies, forged brass Storz couplings, wall-mounted hose reels and EN 1869 fire blankets.',
    overview: 'Hose assemblies are pressure-tested before dispatch. FireShield assists with hose length calculation, Storz coupling compatibility checks and reel placement for optimal coverage on project orders.',
    highlights: ['RRL hose 45mm & 63mm', 'Forged brass Storz couplings', 'Swinging & fixed hose reels', 'Fiberglass fire blankets', 'Pressure-tested assemblies', 'Project bulk supply'],
    applications: ['Hydrant networks', 'Standalone fire points', 'Kitchen & lab areas', 'Workshop bays', 'Loading docks', 'Temporary construction sites'],
    standards: 'BIS · IS 636 · IS 884 · EN 1869 · Storz DIN'
  }
};

const products = [
  {
    id: 1, name: 'ABC Dry Powder Fire Extinguisher 6kg', category: 'Fire Extinguishers',
    subCategory: 'Dry Powder', price: 2499, oldPrice: 3200, rating: 4.8, reviews: 312,
    image: IMG.p01,
    description: 'Stored-pressure ABC dry powder extinguisher rated 6 kg, effective on Class A (ordinary combustibles), Class B (flammable liquids) and Class C (flammable gases). ISI marked to IS 15683 with monoammonium phosphate agent, pressure gauge, safety pin and wall bracket.',
    features: ['6 kg MAP ABC agent', 'IS 15683 / ISI marked', 'Class A, B & C rated', 'Stored-pressure design', 'Brass valve & discharge horn', 'Wall bracket & pin included'],
    specifications: { Capacity: '6 kg', Agent: 'ABC dry powder (MAP)', 'Fire Class': 'A, B, C', Certification: 'ISI IS 15683', 'Discharge Time': '13–15 s', 'Effective Range': '3–5 m', 'Operating Temp': '−20 °C to +60 °C' },
    inStock: true, certified: true, popular: true
  },
  {
    id: 2, name: 'CO₂ Fire Extinguisher 4.5kg', category: 'Fire Extinguishers',
    subCategory: 'CO₂ & Foam', price: 3200, oldPrice: 4000, rating: 4.7, reviews: 198,
    image: IMG.p02,
    description: 'Carbon dioxide clean-agent extinguisher with 4.5 kg CO₂ charge for Class B and electrical (Class C) fires. Discharges as a gas — leaves no residue, making it suitable for server rooms, switchgear, control panels and sensitive equipment areas.',
    features: ['4.5 kg CO₂ capacity', 'Class B & electrical fires', 'Residue-free discharge', 'ISI certified cylinder', 'Discharge horn with insulation', 'Suitable for live electrical equipment'],
    specifications: { Capacity: '4.5 kg CO₂', Type: 'Carbon dioxide', 'Fire Class': 'B, C (electrical)', Certification: 'ISI IS 15683', 'Discharge Time': '8–12 s', 'Effective Range': '2–3 m' },
    inStock: true, certified: true, popular: false
  },
  {
    id: 3, name: 'AFFF Foam Fire Extinguisher 9L', category: 'Fire Extinguishers',
    subCategory: 'CO₂ & Foam', price: 1899, oldPrice: 2400, rating: 4.5, reviews: 145,
    image: IMG.p03,
    description: '9-litre stored-pressure AFFF (Aqueous Film-Forming Foam) extinguisher for Class A and Class B fires. The foam blanket suppresses flammable liquid vapours and cools burning surfaces — ideal for workshops, garages, fuel storage and chemical handling areas.',
    features: ['9 L AFFF foam agent', 'Class A & B coverage', 'Aqueous film-forming foam', 'Corrosion-resistant body', 'Stored-pressure operation', 'ISI marked'],
    specifications: { Capacity: '9 L', Agent: 'AFFF foam', 'Fire Class': 'A, B', Certification: 'ISI IS 15683', 'Discharge Time': '40–60 s', 'Effective Range': '4–6 m' },
    inStock: true, certified: true, popular: false
  },
  {
    id: 4, name: 'Water Type Fire Extinguisher 9L', category: 'Fire Extinguishers',
    subCategory: 'CO₂ & Foam', price: 1650, oldPrice: 2100, rating: 4.4, reviews: 89,
    image: IMG.p04,
    description: '9-litre stored-pressure water extinguisher for Class A fires involving ordinary combustibles such as wood, paper, textiles and furnishings. Simple, reliable and economical — suited to offices, schools, hotels and residential common areas where Class B/C risks are managed separately.',
    features: ['9 L water charge', 'Class A fires only', 'Stored-pressure design', 'Internal PVC lining', 'ISI marked', 'Wall bracket supplied'],
    specifications: { Capacity: '9 L', Agent: 'Water (+ additive option)', 'Fire Class': 'A', Certification: 'ISI IS 15683', 'Discharge Time': '60–90 s', 'Effective Range': '4–6 m' },
    inStock: true, certified: true, popular: false
  },
  {
    id: 5, name: 'Complete Fire Hydrant System Kit', category: 'Fire Hydrant Systems',
    subCategory: 'Hydrant Kits', price: 45000, oldPrice: 55000, rating: 4.9, reviews: 76,
    image: IMG.p05,
    description: 'Turnkey hydrant outlet kit comprising landing valve, 30 m RRL hose, branch pipe and jet/spray nozzle for wet-riser and standalone fire point installations. Components are BIS compliant and pressure-rated for 7 bar working pressure in commercial and industrial risers.',
    features: ['Gunmetal landing valve', '30 m × 63 mm RRL hose', 'Branch pipe & nozzle set', 'Storz-compatible couplings', 'BIS compliant components', 'Pressure-tested assembly'],
    specifications: { 'Hose Length': '30 m', 'Hose Size': '63 mm RRL', 'Valve Type': 'Landing valve', 'Working Pressure': '7 bar (PN10)', Material: 'Gunmetal / RRL' },
    inStock: true, certified: true, popular: true
  },
  {
    id: 6, name: 'Double Outlet Landing Valve', category: 'Fire Hydrant Systems',
    subCategory: 'Hydrant Kits', price: 8500, oldPrice: 10500, rating: 4.6, reviews: 54,
    image: IMG.p06,
    description: 'Gunmetal double-outlet landing valve for wet-riser systems. Flanged 100 mm inlet with dual 63 mm hose connections allows simultaneous hose deployment from a single riser landing — suited to high-demand industrial and high-rise fire fighting.',
    features: ['Gunmetal body (LG2)', 'Dual 63 mm outlets', '100 mm flanged inlet', 'PN16 rated', 'Corrosion-resistant finish', 'Wheel-operated shut-off'],
    specifications: { Material: 'Gunmetal (LG2)', Inlet: '100 mm flanged', Outlets: '2 × 63 mm', 'Working Pressure': 'PN16', Standard: 'BIS / IS 5290' },
    inStock: true, certified: true, popular: false
  },
  {
    id: 7, name: 'Diesel Fire Pump 1000 LPM', category: 'Fire Hydrant Systems',
    subCategory: 'Hydrant Kits', price: 185000, oldPrice: 220000, rating: 4.8, reviews: 42,
    image: IMG.p07,
    description: 'Diesel-engine-driven centrifugal fire pump rated 1000 LPM at 70 m total head for hydrant and sprinkler feed duty. Skid-mounted assembly with automatic start controller, jockey pump interface and NFPA 20 aligned performance curves for backup fire water supply.',
    features: ['1000 LPM @ 70 m head', 'Diesel engine drive', 'Auto-start controller panel', 'Skid-mounted assembly', 'Jockey pump interface', 'NFPA 20 aligned design'],
    specifications: { Capacity: '1000 LPM', Head: '70 m', 'Driver': 'Diesel engine', 'Controller': 'Auto-start', Standard: 'NFPA 20 / IS 9668' },
    inStock: true, certified: true, popular: true
  },
  {
    id: 8, name: 'Stand Post Hydrant 4-Way', category: 'Fire Hydrant Systems',
    subCategory: 'Hose & Reels', price: 28000, oldPrice: 34000, rating: 4.7, reviews: 38,
    image: IMG.p08,
    description: 'Above-ground cast iron stand post (pillar) hydrant with four-way outlet configuration for yard hydrant ring mains. Designed for roadside and plant-area installation in factories, refineries, tank farms and large industrial campuses.',
    features: ['4 × 63 mm outlets', 'Cast iron pillar body', 'Above-ground installation', 'PN16 rated', 'Frost-protected option', 'Road-side mounting flange'],
    specifications: { Outlets: '4 × 63 mm Storz', Material: 'Cast iron', Rating: 'PN16', Type: 'Stand post / pillar hydrant' },
    inStock: true, certified: true, popular: false
  },
  {
    id: 9, name: 'Addressable Fire Alarm Panel 8-Zone', category: 'Fire Alarm Systems',
    subCategory: 'Control Panels', price: 18500, oldPrice: 22000, rating: 5.0, reviews: 89,
    image: IMG.p09,
    description: 'Microprocessor-based addressable fire alarm control panel with 8 loops supporting up to 640 addressable devices. Features LCD event display, cause-and-effect programming, event logging, network expansion and integration with BMS and access control systems.',
    features: ['8 addressable loops', '640 device capacity', 'LCD diagnostic display', 'Cause-and-effect logic', 'Event log & printer port', 'Network expandable'],
    specifications: { Loops: '8 addressable', Capacity: '640 devices', Type: 'Addressable FACP', Display: 'LCD', Standard: 'IS 2189 / EN 54-2' },
    inStock: true, certified: true, popular: true
  },
  {
    id: 10, name: 'Conventional Fire Alarm Panel 4-Zone', category: 'Fire Alarm Systems',
    subCategory: 'Control Panels', price: 6500, oldPrice: 8000, rating: 4.6, reviews: 134,
    image: IMG.p10,
    description: 'Economical 4-zone conventional fire alarm control panel for small offices, retail units and standalone buildings. LED zone indicators, timed sounder delay, battery backup and simple two-wire detection zone wiring for rapid commissioning.',
    features: ['4 detection zones', 'LED zone indicators', '24V battery backup', 'Sounder delay timer', 'Fire & fault relays', 'Surface/wall mount enclosure'],
    specifications: { Zones: '4 conventional', Type: 'Conventional FACP', Backup: '24V sealed lead-acid', Standard: 'IS 2189 / EN 54-2' },
    inStock: true, certified: true, popular: true
  },
  {
    id: 11, name: 'Manual Call Point — Break Glass', category: 'Fire Alarm Systems',
    subCategory: 'Devices', price: 850, oldPrice: 1100, rating: 4.5, reviews: 210,
    image: IMG.p11,
    description: 'Break-glass manual fire alarm call point (MCP) for conventional and addressable fire alarm circuits. Red polycarbonate enclosure with resettable or frangible element options; available in surface and flush mount configurations per EN 54-11.',
    features: ['Break-glass activation', 'Resettable element option', 'Surface & flush mount', 'Conventional/addressable', 'Signal red enclosure', 'Tool-free test facility'],
    specifications: { Type: 'Manual call point (MCP)', Mount: 'Surface / flush', Colour: 'Signal red RAL 3001', Standard: 'EN 54-11 / IS 2189' },
    inStock: true, certified: true, popular: false
  },
  {
    id: 12, name: 'Electronic Sounder with Strobe', category: 'Fire Alarm Systems',
    subCategory: 'Devices', price: 2200, oldPrice: 2800, rating: 4.7, reviews: 167,
    image: IMG.p12,
    description: 'Combined electronic sounder and LED strobe beacon for audible and visual fire alarm notification. High-output tone generator with IP65-rated enclosure for plant rooms, loading bays and noisy industrial environments where visual indication is mandatory.',
    features: ['100 dB(A) @ 1 m output', 'LED strobe beacon', 'IP65 weatherproof housing', 'Red signal enclosure', 'Multiple tone patterns', '24V DC operation'],
    specifications: { Sound: '100 dB(A) @ 1 m', Visual: 'LED strobe (cd rating)', Protection: 'IP65', Voltage: '24V DC', Standard: 'EN 54-3 / EN 54-23' },
    inStock: true, certified: true, popular: true
  },
  {
    id: 13, name: 'Photoelectric Smoke Detector', category: 'Smoke Detectors',
    subCategory: 'Detectors', price: 1200, oldPrice: 1600, rating: 4.7, reviews: 421,
    image: IMG.p13,
    description: 'Spot-type photoelectric smoke detector with optical scatter chamber for smouldering fire detection. Low-profile ceiling mount design with drift compensation — preferred for offices, corridors, hotel rooms and areas with slow-burning fire risks.',
    features: ['Photoelectric optical chamber', 'Drift compensation', 'Removable detector head', 'Low-profile design', 'Optional integral sounder base', 'UL/IS compatible'],
    specifications: { Type: 'Photoelectric spot', Sensitivity: '0.08–0.12 dB/m', Mount: 'Ceiling', Voltage: '24V DC loop', Standard: 'IS 2175 / UL 268 / EN 54-7' },
    inStock: true, certified: true, popular: true
  },
  {
    id: 14, name: 'Ionization Smoke Detector', category: 'Smoke Detectors',
    subCategory: 'Detectors', price: 980, oldPrice: 1300, rating: 4.5, reviews: 188,
    image: IMG.p14,
    description: 'Ionization-type spot smoke detector for fast-flaming fire detection involving small combustible particles. Responds quickly to rapidly developing fires — suitable for general office, corridor and storage applications where flaming combustion is the primary risk.',
    features: ['Ionization detection chamber', 'Fast flaming fire response', 'Conventional 2-wire loop', 'Wide voltage range 9–30V', 'Easy head removal', 'Low standby current'],
    specifications: { Type: 'Ionization spot', 'Fire Type': 'Fast flaming', Voltage: '9–30V DC', Mount: 'Ceiling', Standard: 'IS 2175 / UL 268 / EN 54-7' },
    inStock: true, certified: true, popular: false
  },
  {
    id: 15, name: 'Multi-Sensor Heat & Smoke Detector', category: 'Smoke Detectors',
    subCategory: 'Detectors', price: 3400, oldPrice: 4200, rating: 4.9, reviews: 95,
    image: IMG.p15,
    description: 'Intelligent multi-sensor detector combining optical smoke and fixed-temperature heat sensing with AND/OR logic algorithms. Reduces false alarms in kitchen-adjacent areas, dusty environments and locations with variable airflow.',
    features: ['Dual optical + heat sensors', 'Configurable AND/OR logic', 'False alarm immunity', 'Addressable protocol', 'Drift compensation', 'Remote indicator output'],
    specifications: { Type: 'Multi-sensor spot', Sensors: 'Optical smoke + heat (RTI)', Protocol: 'Addressable', Mount: 'Ceiling', Standard: 'EN 54-7 / EN 54-5' },
    inStock: true, certified: true, popular: true
  },
  {
    id: 16, name: 'Addressable Detector Base with Isolator', category: 'Smoke Detectors',
    subCategory: 'Accessories', price: 650, oldPrice: 850, rating: 4.4, reviews: 76,
    image: IMG.p16,
    description: 'Addressable detector mounting base with integrated short-circuit isolator for loop continuity during wiring faults. Tool-free head removal for maintenance; maintains loop operation when a section is shorted — essential for large addressable installations.',
    features: ['Built-in short-circuit isolator', 'Tool-free head removal', 'Addressable loop compatible', 'Ceiling flush mount', 'Remote LED indicator', 'Locking head option'],
    specifications: { Type: 'Detector mounting base', Feature: 'Short-circuit line isolator', Protocol: 'Addressable', Mount: 'Ceiling', Standard: 'EN 54-17' },
    inStock: true, certified: true, popular: false
  },
  {
    id: 17, name: 'LED Emergency Exit Light — 3hr Backup', category: 'Emergency Lights',
    subCategory: 'Exit Lighting', price: 890, oldPrice: 1200, rating: 4.8, reviews: 98,
    image: IMG.p17,
    description: 'Maintained LED emergency exit luminaire with 3-hour battery backup and running-man pictogram legend. Slim polycarbonate body for corridor and stairwell mounting — switches to battery power automatically on mains failure.',
    features: ['3-hour Ni-Cd/LiFePO₄ backup', 'Maintained / non-maintained', 'Running-man ISO legend', 'Auto changeover', 'Self-test compatible PCB', 'Wall or ceiling mount'],
    specifications: { Backup: '3 hours (90 min min.)', 'Light Source': 'LED', Legend: 'Running man', Mount: 'Wall / ceiling', Standard: 'IS 10322 / EN 1838' },
    inStock: true, certified: true, popular: true
  },
  {
    id: 18, name: 'Twin Spot Emergency Light', category: 'Emergency Lights',
    subCategory: 'Exit Lighting', price: 1450, oldPrice: 1850, rating: 4.6, reviews: 72,
    image: IMG.p18,
    description: 'Twin-head adjustable LED emergency luminaire for open-plan areas, warehouses and factory floors requiring wide beam coverage. Each head is independently aimable; 1800 lumen combined output with 3-hour battery duration.',
    features: ['Twin adjustable LED heads', '1800 lm combined output', '3-hour Ni-Cd battery', 'Independent head aiming', 'IP42 enclosure', 'Maintained operation'],
    specifications: { Output: '1800 lm total', Heads: '2 × adjustable LED', Backup: '3 hours', Rating: 'IP42', Standard: 'EN 60598-2-22' },
    inStock: true, certified: true, popular: false
  },
  {
    id: 19, name: 'Running Man Exit Sign Combo Unit', category: 'Emergency Lights',
    subCategory: 'Signage Lights', price: 1100, oldPrice: 1400, rating: 4.7, reviews: 115,
    image: IMG.p19,
    description: 'Combined illuminated exit sign and emergency downlight with directional arrow legends (left, right, up). Single unit satisfies both escape route marking and emergency illumination requirements in malls, hospitals and public buildings.',
    features: ['Sign + emergency light combo', 'Left / right / up legends', 'Interchangeable legend plates', '3-hour battery backup', 'Maintained LED illumination', 'Surface mount'],
    specifications: { Type: 'Combo exit sign + light', Legend: 'Running man + arrow', Backup: '3 hours', 'Light Source': 'LED', Standard: 'ISO 7010 / EN 1838' },
    inStock: true, certified: true, popular: true
  },
  {
    id: 20, name: 'Bulkhead Emergency Light IP65', category: 'Emergency Lights',
    subCategory: 'Signage Lights', price: 1750, oldPrice: 2200, rating: 4.5, reviews: 64,
    image: IMG.p20,
    description: 'IP65-rated bulkhead emergency luminaire for car parks, basements, plant rooms and external escape routes. Polycarbonate diffuser with anti-vandal fixing and 3-hour battery backup for harsh and semi-outdoor environments.',
    features: ['IP65 weatherproof rating', 'Polycarbonate diffuser body', 'Anti-vandal screw fixings', '3-hour battery backup', 'Maintained / non-maintained', 'Corrosion-resistant hardware'],
    specifications: { Protection: 'IP65', Material: 'Polycarbonate', Backup: '3 hours', 'Light Source': 'LED', Standard: 'EN 60598-2-22 / IS 10322' },
    inStock: true, certified: true, popular: false
  },
  {
    id: 21, name: 'Fire Safety Signage Set (10 Pieces)', category: 'Safety Signages',
    subCategory: 'Fire Signs', price: 1500, oldPrice: 2000, rating: 4.6, reviews: 234,
    image: IMG.p21,
    description: 'Complete statutory signage set covering fire extinguisher points, hose reel locations, manual call points, fire action notices and exit direction arrows. Rigid PVC construction with high-visibility graphics per IS 9457 colour codes.',
    features: ['10 essential fire signs', 'IS 9457 colour compliant', 'Self-adhesive backing option', 'High-visibility graphics', 'Matte anti-glare finish', 'Indoor & outdoor rated'],
    specifications: { Quantity: '10 pieces', Material: 'Rigid PVC', Finish: 'Matte UV-print', Standard: 'IS 9457 / ISO 7010' },
    inStock: true, certified: true, popular: true
  },
  {
    id: 22, name: 'Photoluminescent Exit Route Sign Pack', category: 'Safety Signages',
    subCategory: 'Fire Signs', price: 2800, oldPrice: 3500, rating: 4.8, reviews: 156,
    image: IMG.p22,
    description: 'Photoluminescent (glow-in-the-dark) exit route sign pack visible for 6+ hours after light source removal. Required for high-rise buildings, basements and complex evacuation paths where emergency lighting alone may be insufficient.',
    features: ['Photoluminescent PVC', '8-sign directional pack', 'No power required', 'Arrow direction variants', '6+ hour glow duration', 'NBC high-rise compliant'],
    specifications: { Type: 'Photoluminescent', Pack: '8 signs', 'Glow Duration': '6+ hours', Material: 'Photoluminescent PVC', Standard: 'IS 9457 / ISO 16069' },
    inStock: true, certified: true, popular: true
  },
  {
    id: 23, name: 'Fire Extinguisher Location Board', category: 'Safety Signages',
    subCategory: 'Fire Signs', price: 450, oldPrice: 600, rating: 4.4, reviews: 189,
    image: IMG.p23,
    description: 'Standard fire extinguisher location board with equipment pictogram and directional arrow per ISO 7010 F001. Identifies extinguisher position at distance — available in 300 × 450 mm and 450 × 600 mm rigid PVC or ACP.',
    features: ['ISO 7010 F001 pictogram', 'Directional arrow graphic', 'Pre-drilled mount holes', 'UV-resistant print', 'Red/white standard colours', 'ACP or PVC options'],
    specifications: { Size: '450 × 600 mm', Material: 'PVC / ACP', Pictogram: 'ISO 7010 F001', Standard: 'IS 9457 / ISO 7010' },
    inStock: true, certified: true, popular: false
  },
  {
    id: 24, name: 'Assembly Point Sign — Double Sided', category: 'Safety Signages',
    subCategory: 'Prohibition', price: 3200, oldPrice: 4000, rating: 4.5, reviews: 67,
    image: IMG.p24,
    description: 'Double-sided assembly point signpost with galvanized steel post and weatherproof sign panels per ISO 7010 E007. Marks outdoor muster areas for roll-call during building evacuation drills and actual emergencies.',
    features: ['Double-sided display panel', 'Galvanized steel post', 'Outdoor weatherproof', 'Custom site text option', 'Concrete base compatible', 'Reflective sign face option'],
    specifications: { Mount: 'Post mounted', Height: '2.4 m overall', Material: 'Galvanized steel + PVC', Pictogram: 'ISO 7010 E007', Standard: 'IS 9457 / ISO 7010' },
    inStock: true, certified: true, popular: false
  },
  {
    id: 25, name: 'Firefighter Helmet with Visor', category: 'PPE Equipment',
    subCategory: 'Head & Body', price: 4800, oldPrice: 6500, rating: 4.9, reviews: 156,
    image: IMG.p25,
    description: 'Thermoplastic firefighter helmet with retractable face visor and Nomex chin strap for structural fire fighting. Complies with EN 443:2008 impact, penetration, flame and heat resistance requirements for municipal and industrial brigades.',
    features: ['ABS/thermoplastic shell', 'Polycarbonate face visor', 'Nomex chin strap & padding', 'EN 443:2008 certified', 'Ear protector compatible', 'Reflective trim option'],
    specifications: { Shell: 'Thermoplastic (ABS)', Standard: 'EN 443:2008', Visor: 'Polycarbonate', 'Heat Resistance': '350 °C (5 min)', Mass: '≤ 1.5 kg' },
    inStock: true, certified: true, popular: true
  },
  {
    id: 26, name: 'Fire Proximity Suit — Aluminized', category: 'PPE Equipment',
    subCategory: 'Head & Body', price: 18500, oldPrice: 24000, rating: 4.8, reviews: 48,
    image: IMG.p26,
    description: 'Aluminized proximity suit (silver bunker suit) for high-radiant-heat environments — aircraft rescue, metal splash, furnace areas and industrial fire fighting where radiant heat flux exceeds turnout gear limits. Complete jacket, trousers and hood set.',
    features: ['Aluminized outer layer', 'Radiant heat reflectivity', 'Complete 3-piece set', 'Insulated inner liner', 'EN 1486 proximity rating', 'Velcro & snap closures'],
    specifications: { Type: 'Proximity suit (aluminized)', Set: 'Jacket + trouser + hood', 'Radiant Heat': 'Up to 1000 °C (limited exposure)', Standard: 'EN 1486 / NFPA 1971 proximity', Layers: 'Aluminized + insulation' },
    inStock: true, certified: true, popular: false
  },
  {
    id: 27, name: 'Firefighter Safety Boots EN', category: 'PPE Equipment',
    subCategory: 'Head & Body', price: 6200, oldPrice: 7800, rating: 4.6, reviews: 92,
    image: IMG.p27,
    description: 'Steel toe-cap firefighter boots with heat-resistant outsole and penetration-resistant steel midsole. EN ISO 20345 S3 rated for structural fire fighting and industrial emergency response with oil, fuel and slip resistance.',
    features: ['Steel toe cap (200 J)', 'Heat-resistant outsole', 'Penetration-resistant midsole', 'EN ISO 20345 S3', 'Oil & fuel resistant', 'High ankle support'],
    specifications: { 'Toe Protection': 'Steel cap 200 J', Sole: 'Heat & slip resistant', Midsole: 'Steel penetration plate', Standard: 'EN ISO 20345 S3', Upper: 'Leather / rubber' },
    inStock: true, certified: true, popular: false
  },
  {
    id: 28, name: 'SCBA Breathing Apparatus Set', category: 'PPE Equipment',
    subCategory: 'Breathing', price: 85000, oldPrice: 98000, rating: 4.9, reviews: 34,
    image: IMG.p28,
    description: 'Self-contained breathing apparatus (SCBA) with 6.8L / 300 bar composite cylinder, full-face mask and positive-pressure demand valve. Provides approximately 30 minutes rated duration for fire entry, confined space and IDLH atmospheres per NFPA 1981.',
    features: ['6.8L / 300 bar composite cylinder', '~30 min rated duration', 'Full-face mask & demand valve', 'Positive-pressure SCBA', 'Pass device & low-pressure alarm', 'Carrier harness with quick-release'],
    specifications: { Cylinder: '6.8L / 300 bar', Duration: '~30 min (at 40 L/min)', Type: 'Open-circuit SCBA', Mask: 'Full-face panoramic', Standard: 'NFPA 1981 / EN 137' },
    inStock: true, certified: true, popular: true
  },
  {
    id: 29, name: 'Fire Hose Reel 30m — Manual', category: 'Fire Fighting Accessories',
    subCategory: 'Hoses & Blankets', price: 8500, oldPrice: 11000, rating: 4.7, reviews: 88,
    image: IMG.p29,
    description: 'Wall-mounted swinging-type fire hose reel with 30 m of 19 mm RRL hose and adjustable jet/spray nozzle. Manual rewind with guide arm — suited to commercial buildings, hotels and industrial units requiring standalone first-aid fire fighting.',
    features: ['30 m × 19 mm RRL hose', 'Swinging guide arm reel', 'Jet / spray shut-off nozzle', 'Manual rewind handle', 'Inlet ball valve', 'Red cabinet option'],
    specifications: { 'Hose Length': '30 m', 'Hose Bore': '19 mm RRL', Type: 'Manual swinging reel', Inlet: '25 mm BSP', Standard: 'IS 884 / AS 2441' },
    inStock: true, certified: true, popular: true
  },
  {
    id: 30, name: 'Fiberglass Fire Blanket 1.2×1.8m', category: 'Fire Fighting Accessories',
    subCategory: 'Hoses & Blankets', price: 650, oldPrice: 900, rating: 4.5, reviews: 267,
    image: IMG.p30,
    description: 'Welded-edge fiberglass fire blanket (1.2 × 1.8 m) in quick-release PVC pouch for smothering Class A and small Class B fires. EN 1869 rated to 550 °C — for kitchen fires, clothing ignition and shielding personnel during escape.',
    features: ['1.2 × 1.8 m blanket size', 'Woven fiberglass fabric', 'Quick-release wall pouch', '550 °C working temperature', 'Reusable after inspection', 'EN 1869 compliant'],
    specifications: { Size: '1.2 × 1.8 m', Material: 'Fiberglass woven', 'Working Temp': '550 °C', Standard: 'EN 1869 / IS 11862', Packaging: 'PVC pouch' },
    inStock: true, certified: true, popular: true
  },
  {
    id: 31, name: 'RRL Fire Hose 63mm × 15m', category: 'Fire Fighting Accessories',
    subCategory: 'Hoses & Blankets', price: 4200, oldPrice: 5200, rating: 4.6, reviews: 112,
    image: IMG.p31,
    description: 'Reinforced rubber lined (RRL) fire hose, 63 mm diameter × 15 m length with pre-fitted Storz couplings. BIS certified for hydrant and standalone fire fighting — polyester reinforcement with rubber lining for 10 bar working pressure.',
    features: ['63 mm bore diameter', 'RRL polyester/rubber construction', 'Pre-fitted Storz couplings', 'BIS certified hose', '10 bar working pressure', '15 m assembly length'],
    specifications: { Diameter: '63 mm', Length: '15 m', Type: 'RRL', Coupling: 'Storz 63 mm', 'Working Pressure': '10 bar', Standard: 'IS 636 / BIS' },
    inStock: true, certified: true, popular: false
  },
  {
    id: 32, name: 'Brass Storz Coupling Set 63mm', category: 'Fire Fighting Accessories',
    subCategory: 'Tools', price: 2800, oldPrice: 3500, rating: 4.5, reviews: 78,
    image: IMG.p32,
    description: 'Forged brass Storz (Guillemin) couplings with locking lugs for 63 mm fire hose connections. Corrosion-resistant for permanent hydrant, landing valve and hose reel installations — supplied as matched male/female pair.',
    features: ['Forged brass body', '63 mm Storz type', 'Quarter-turn locking lugs', 'Corrosion resistant', 'Male + female pair', 'DIN / Storz compatible'],
    specifications: { Size: '63 mm Storz', Material: 'Forged brass', Type: 'Guillemin symmetric', 'Working Pressure': '16 bar', Standard: 'DIN 14302 / Storz' },
    inStock: true, certified: true, popular: false
  }
];

const productLongExtras = {
  'Fire Extinguishers': 'Supplied with wall bracket, operating instructions and inspection tag. Hydrostatic test and refill due dates stamped on cylinder per IS 15683 maintenance schedule.',
  'Fire Hydrant Systems': 'Components tested to declared working pressure before dispatch. Installation guidance, flange compatibility checks and commissioning support available for project orders.',
  'Fire Alarm Systems': 'Panels are factory-programmed and loop-tested before delivery. Configuration, cause-and-effect programming and annual maintenance contract (AMC) available from certified technicians.',
  'Smoke Detectors': 'Detectors are compatible with standard addressable and conventional loop wiring. Spacing and siting should follow IS 2189 and NFPA 72 for the occupancy classification.',
  'Emergency Lights': 'Luminaires should be tested monthly (flash test) and annually (full duration test) per NBC maintenance requirements. Battery replacement interval typically 4 years.',
  'Safety Signages': 'Signage siting heights and sizes should follow IS 9457 and NBC Chapter 4 for the building type. Photoluminescent signs require minimum 54 lux ambient charging illumination.',
  'PPE Equipment': 'Supplied with manufacturer conformity declaration. SCBA cylinders require periodic hydrostatic testing per PESO schedule; turnout gear inspection per EN 469 / NFPA 1851.',
  'Fire Fighting Accessories': 'Hose assemblies are pressure-tested to 1.5× working pressure before dispatch. Storz coupling lug orientation and size must match existing hydrant and landing valve outlets.'
};

products.forEach((p) => {
  const extra = productLongExtras[p.category] || '';
  p.longDescription = extra ? `${p.description} ${extra}` : p.description;
  p.applications = categoryMeta[p.category]?.applications?.slice(0, 4) || [];
});
