/**
 * ================================================================
 * NEXPAK SECURITY SOLUTIONS
 * ADVANCED AI SALES ASSISTANT
 * KNOWLEDGE BASE — PART 1
 * ================================================================
 *
 * FILE:
 *     chatbot-knowledge.js
 *
 * PURPOSE:
 *     Structured knowledge for the Nexpak Advanced Sales Assistant.
 *
 * IMPORTANT:
 *     This file is the KNOWLEDGE layer only.
 *
 *     It does NOT control:
 *       - Bot appearance
 *       - Robot animation
 *       - Floating movement
 *       - Chat window
 *       - Message display
 *       - Lead form
 *
 *     Those remain in your existing chatbot file.
 *
 *     Exact prices, stock, model numbers, warranties,
 *     certifications and product specifications must only
 *     be added once verified against the current Nexpak
 *     product catalogue.
 *
 * ================================================================
 */

(function (window) {

    'use strict';


    /* =============================================================
       MAIN KNOWLEDGE OBJECT
    ============================================================= */

    const NEXPAK_KNOWLEDGE = {


        /* =========================================================
           01. COMPANY KNOWLEDGE
        ========================================================= */

        company: {

            name: 'Nexpak Security Solutions',

            description:
                'Nexpak Security Solutions provides security equipment and complete security-system solutions for residential, commercial, industrial, agricultural and specialist applications.',

            businessType:
                'Security solutions supplier and systems provider',

            primaryCategories: [

                'Electric Fencing',

                'CCTV Surveillance',

                'Alarm Systems',

                'Access Control',

                'Gate Automation',

                'Roboguard Perimeter Detection',

                'Equestrian Fencing'

            ],

            primaryObjective:
                'Help customers identify the correct security solution, explain the available options, qualify the customer and guide suitable customers toward a quotation.',

            assistantRole:
                'Professional Nexpak sales and product assistant',

            assistantBehaviour: [

                'Be professional',

                'Be helpful',

                'Ask relevant questions',

                'Understand the customer requirement before recommending products',

                'Explain technical information in simple language when appropriate',

                'Use technical terminology when the customer demonstrates technical knowledge',

                'Never invent specifications',

                'Never invent prices',

                'Never invent stock availability',

                'Never promise an installation date without confirmation',

                'Never claim a quotation has been generated unless the quotation system confirms it',

                'Move qualified customers toward a quotation naturally'

            ]

        },


        /* =========================================================
           02. SECURITY PRODUCT CATEGORIES
        ========================================================= */

        productCategories: {

            electricFencing: {

                id: 'electric-fencing',

                name: 'Electric Fencing',

                categoryType: 'Perimeter Security',

                shortDescription:
                    'Active perimeter protection using controlled electrical pulses to deter and detect unauthorized access.',

                customerBenefits: [

                    'Perimeter deterrence',

                    'Early intrusion detection',

                    'Integration with other security systems',

                    'Suitable for residential applications',

                    'Suitable for commercial applications',

                    'Suitable for industrial applications',

                    'Suitable for agricultural applications'

                ]

            },


            cctv: {

                id: 'cctv',

                name: 'CCTV Surveillance',

                categoryType: 'Video Surveillance',

                shortDescription:
                    'Video surveillance systems used to monitor, record and review activity around a property.',

                customerBenefits: [

                    'Visual monitoring',

                    'Recorded evidence',

                    'Remote viewing where supported',

                    'Day and night surveillance',

                    'Monitoring of entrances and gates',

                    'Perimeter observation',

                    'Business surveillance'

                ]

            },


            alarmSystems: {

                id: 'alarm-systems',

                name: 'Alarm Systems',

                categoryType: 'Intrusion Detection',

                shortDescription:
                    'Electronic intrusion-detection systems designed to detect defined security events and generate alerts.',

                customerBenefits: [

                    'Intrusion detection',

                    'Local alarm notification',

                    'Remote notifications where supported',

                    'Protection of doors and windows',

                    'Internal movement detection',

                    'Perimeter detection options'

                ]

            },


            accessControl: {

                id: 'access-control',

                name: 'Access Control',

                categoryType: 'Entry Management',

                shortDescription:
                    'Systems used to control and manage who is permitted to enter protected areas.',

                customerBenefits: [

                    'Controlled access',

                    'User identification',

                    'Credential management',

                    'Restricted-area protection',

                    'Access records where supported',

                    'Improved control of staff or visitor access'

                ]

            },


            gateAutomation: {

                id: 'gate-automation',

                name: 'Gate Automation',

                categoryType: 'Automated Access',

                shortDescription:
                    'Automated systems for opening and closing compatible vehicle or pedestrian gates.',

                customerBenefits: [

                    'Convenient vehicle access',

                    'Controlled entry',

                    'Remote operation where supported',

                    'Battery backup options',

                    'Integration with access-control systems',

                    'Integration with other security systems'

                ]

            },


            roboguard: {

                id: 'roboguard',

                name: 'Roboguard',

                categoryType: 'Perimeter Detection',

                shortDescription:
                    'Outdoor perimeter detection technology designed to detect movement within defined protected areas.',

                customerBenefits: [

                    'Early perimeter warning',

                    'Protection of large outdoor areas',

                    'Additional security layer',

                    'Useful for farms and smallholdings',

                    'Can complement other security systems'

                ]

            },


            equestrian: {

                id: 'equestrian',

                name: 'Equestrian Fencing',

                categoryType: 'Animal / Paddock Fencing',

                shortDescription:
                    'Fencing equipment and systems designed for horse paddocks, livestock areas and equestrian applications.',

                customerBenefits: [

                    'Paddock management',

                    'Animal containment',

                    'Temporary paddock construction',

                    'Permanent paddock systems',

                    'Flexible paddock layouts',

                    'Electric fencing options'

                ]

            }

        },


        /* =========================================================
           03. PROPERTY TYPES
        ========================================================= */

        propertyTypes: {


            residential: {

                id: 'residential',

                name: 'Residential',

                examples: [

                    'House',

                    'Townhouse',

                    'Residential estate',

                    'Complex',

                    'Smallholding'

                ],

                typicalSecurityNeeds: [

                    'Electric fencing',

                    'CCTV',

                    'Alarm systems',

                    'Gate automation',

                    'Access control',

                    'Perimeter detection'

                ],

                typicalCustomerGoals: [

                    'Protect family',

                    'Protect property',

                    'Monitor entrances',

                    'Deter intruders',

                    'Receive security alerts',

                    'Monitor property remotely'

                ]

            },


            commercial: {

                id: 'commercial',

                name: 'Commercial',

                examples: [

                    'Office',

                    'Retail store',

                    'Shopping centre',

                    'Business premises',

                    'Restaurant',

                    'Professional practice'

                ],

                typicalSecurityNeeds: [

                    'CCTV',

                    'Access control',

                    'Alarm systems',

                    'Electric fencing',

                    'Gate automation',

                    'Perimeter detection'

                ],

                typicalCustomerGoals: [

                    'Protect employees',

                    'Protect stock',

                    'Monitor customers',

                    'Control staff access',

                    'Monitor entrances',

                    'Reduce unauthorized access'

                ]

            },


            industrial: {

                id: 'industrial',

                name: 'Industrial',

                examples: [

                    'Factory',

                    'Warehouse',

                    'Distribution centre',

                    'Industrial yard',

                    'Depot',

                    'Manufacturing facility'

                ],

                typicalSecurityNeeds: [

                    'Electric fencing',

                    'CCTV',

                    'Access control',

                    'Gate automation',

                    'Alarm systems',

                    'Perimeter detection'

                ],

                typicalCustomerGoals: [

                    'Protect large perimeters',

                    'Protect stock',

                    'Monitor vehicles',

                    'Control employee access',

                    'Monitor loading areas',

                    'Detect perimeter intrusion'

                ]

            },


            agricultural: {

                id: 'agricultural',

                name: 'Agricultural',

                examples: [

                    'Farm',

                    'Smallholding',

                    'Agricultural property',

                    'Livestock property',

                    'Game property'

                ],

                typicalSecurityNeeds: [

                    'Electric fencing',

                    'Perimeter detection',

                    'Roboguard',

                    'CCTV',

                    'Gate automation',

                    'Solar security solutions'

                ],

                typicalCustomerGoals: [

                    'Protect large areas',

                    'Detect perimeter intrusion',

                    'Protect buildings',

                    'Monitor gates',

                    'Protect livestock areas',

                    'Monitor remote areas'

                ]

            },


            equestrian: {

                id: 'equestrian',

                name: 'Equestrian',

                examples: [

                    'Horse paddock',

                    'Stable',

                    'Equestrian centre',

                    'Training arena',

                    'Horse farm'

                ],

                typicalSecurityNeeds: [

                    'Horse fencing',

                    'Polytape',

                    'Electric rope',

                    'Insulators',

                    'Energizers',

                    'Gate hardware'

                ],

                typicalCustomerGoals: [

                    'Contain horses',

                    'Divide paddocks',

                    'Create temporary paddocks',

                    'Create permanent paddocks',

                    'Manage grazing areas'

                ]

            },


            unknown: {

                id: 'unknown',

                name: 'Unknown',

                action:
                    'Ask the customer what type of property or application they are dealing with.'

            }

        },


        /* =========================================================
           04. ELECTRIC FENCING — FOUNDATION
        ========================================================= */

        electricFencing: {

            name: 'Electric Fencing',

            category: 'Perimeter Security',

            definition:
                'An electric fence is an active perimeter-security system that uses controlled electrical pulses on suitable conductors to provide deterrence and, depending on the system design, perimeter alarm detection.',


            primaryApplications: [

                'Residential perimeter security',

                'Commercial perimeter security',

                'Industrial perimeter security',

                'Agricultural properties',

                'Smallholdings',

                'Large property boundaries'

            ],


            systemConcept:

                'A properly designed electric-fence system consists of an energizer, suitable conductors, insulation, an appropriate earth system, gates and access arrangements, warning signage and appropriate monitoring/protection equipment.',


            majorComponents: {


                energizer: {

                    name: 'Energizer',

                    purpose:
                        'Provides the controlled electrical pulses used by the electric-fence system.',

                    assistantExplanation:
                        'The energizer is effectively the power source of the electric fence. The correct energizer depends on the fence design and installation requirements.',

                    salesQuestions: [

                        'Is this a new installation or an existing fence?',

                        'Approximately how long is the perimeter?',

                        'How many fence sections or zones are required?',

                        'Is mains power available?',

                        'Is backup power required?'

                    ]

                },


                conductors: {

                    name: 'Fence Conductors',

                    purpose:
                        'Carry the electrical pulses around the protected perimeter.',

                    examples: [

                        'Electric fence wire',

                        'Specialized electric-fence conductors',

                        'Appropriate equestrian conductors for animal applications'

                    ],

                    importantNote:
                        'The correct conductor depends on the application and system design.'

                },


                insulators: {

                    name: 'Insulators',

                    purpose:
                        'Electrically isolate the fence conductor from the supporting structure.',

                    importance:
                        'Poor or damaged insulation can allow leakage and reduce system performance.',

                    commonProblems: [

                        'Cracked insulators',

                        'Damaged insulators',

                        'Incorrect installation',

                        'Contamination',

                        'Vegetation creating leakage paths'

                    ]

                },


                earthSystem: {

                    name: 'Earth System',

                    purpose:
                        'Provides the return path required for the electric-fence circuit to operate correctly.',

                    importance:
                        'A properly designed earth system is fundamental to electric-fence performance.',

                    warning:
                        'The assistant must not encourage unsafe electrical testing or handling of energized equipment.'
                },


                warningSigns: {

                    name: 'Warning Signs',

                    purpose:
                        'Clearly identify an electric fence to people approaching the protected boundary.',

                    importance:
                        'Warning signage forms an important part of responsible electric-fence installation.'
                },


                gateEquipment: {

                    name: 'Gate Equipment',

                    purpose:
                        'Allows gates and access points to be incorporated into the electric-fence system.',

                    considerations: [

                        'Gate type',

                        'Gate opening arrangement',

                        'Electrical continuity',

                        'Insulation',

                        'Safe access',

                        'System monitoring'

                    ]

                },


                surgeProtection: {

                    name: 'Surge / Lightning Protection',

                    purpose:
                        'Appropriate protective equipment can help reduce the risk of damage from electrical surges and lightning events.',

                    note:
                        'Exact protection requirements depend on the installation and equipment manufacturer recommendations.'
                }

            },


            systemBenefits: [

                'Active perimeter deterrence',

                'Perimeter monitoring',

                'Early warning',

                'Can complement CCTV',

                'Can complement alarm systems',

                'Can form part of layered security'

            ],


            qualificationQuestions: [

                'What type of property are you securing?',

                'Approximately how long is the perimeter?',

                'Is there an existing wall or fence?',

                'Are you installing a completely new system?',

                'Is this an upgrade to an existing electric fence?',

                'How many gates are on the perimeter?',

                'Is mains power available?',

                'Do you require backup power?',

                'Are there existing security systems on the property?'

            ],


            commonCustomerQuestions: [

                'How does electric fencing work?',

                'How much does electric fencing cost?',

                'Can electric fencing be installed on my wall?',

                '                'Can electric fencing be installed on my wall?',

                'Can electric fencing be installed on an existing fence?',

                'How many strands do I need?',

                'What energizer do I need?',

                'Why is my electric fence alarming?',

                'Why is my electric fence losing voltage?',

                'How often should an electric fence be serviced?',

                'Can electric fencing work with CCTV?',

                'Can electric fencing work with an alarm system?',

                'Can electric fencing protect a gate?',

                'Can electric fencing work during a power failure?',

                'Can I use solar power for an electric fence?',

                'What happens if vegetation touches the fence?',

                'Why does my electric fence keep going off?',

                'How do I know if my electric fence has a fault?',

                'How do I test an electric fence?',

                'How often should an electric fence be maintained?',

                'Can you upgrade my existing electric fence?',

                'Can electric fencing be installed on top of a wall?',

                'Can electric fencing be installed on a palisade fence?',

                'What is the difference between electric fencing and an ordinary fence?'

            ],


            /* -----------------------------------------------------
               SALES POSITIONING
            ----------------------------------------------------- */

            salesPositioning:
                'The assistant should sell the complete security solution rather than treating the energizer, wire or insulators as isolated products.'


        },


        /* =========================================================
           05. ELECTRIC FENCING — FAULTS
        ========================================================= */

        electricFenceFaults: {

            lowVoltage: {

                description:
                    'Low fence voltage can result from leakage, poor connections, vegetation contact, damaged insulation, earth-system problems, conductor problems or equipment issues.',

                possibleCauses: [

                    'Vegetation touching conductors',

                    'Damaged insulators',

                    'Poor electrical connections',

                    'Broken conductor',

                    'Corrosion',

                    'Poor earth system',

                    'Moisture-related leakage',

                    'Equipment fault'

                ],

                safeCustomerGuidance: [

                    'Ask the customer whether the problem is constant or intermittent.',

                    'Ask whether vegetation has recently grown onto the fence.',

                    'Ask whether the system has recently been exposed to severe weather.',

                    'Recommend professional testing when the cause is not obvious.'

                ]

            },


            nuisanceAlarm: {

                description:
                    'Repeated or unexplained fence alarms can be caused by environmental conditions, mechanical faults, electrical leakage or equipment problems.',

                possibleCauses: [

                    'Vegetation touching the fence',

                    'Loose connections',

                    'Damaged insulators',

                    'Broken conductors',

                    'Moisture',

                    'Poor earthing',

                    'Environmental interference',

                    'Equipment fault'

                ]

            },


            intermittentFault: {

                description:
                    'An intermittent fault occurs only under certain conditions, which can make it more difficult to identify.',

                commonTriggers: [

                    'Wind movement',

                    'Vegetation movement',

                    'Rain',

                    'Moisture',

                    'Temperature changes',

                    'Loose mechanical connections',

                    'Intermittent conductor contact'

                ]

            },


            safetyRule:
                'Never tell a customer to touch an energized conductor, bypass a safety device or perform unsafe electrical testing. Encourage appropriate professional testing and servicing.'

        },


        /* =========================================================
           06. GENERAL SALES LANGUAGE
        ========================================================= */

        salesLanguage: {

            preferredTerms: {

                recommend: [

                    'I would recommend considering...',

                    'For that type of application...',

                    'The right option depends on...',

                    'To select the correct system, I need to know...'

                ],


                clarify: [

                    'Let me narrow that down for you.',

                    'There are a couple of factors that affect the correct choice.',

                    'Before I recommend a system, can I check...'

                ],


                quote: [

                    'I can help you work out what you need for a quotation.',

                    'Once we have the basic site details, we can move toward a quote.',

                    'Let me get a few details so we can recommend the right solution.'

                ]

            },


            avoidTerms: [

                'This is definitely the cheapest',

                'This will protect you 100%',

                'This product can never fail',

                'Guaranteed to stop all criminals',

                'I guarantee this exact price',

                'We definitely have stock',

                'Installation is definitely available tomorrow'

            ],


            salesPrinciple:
                'The assistant should build trust by giving accurate information and asking intelligent questions rather than making exaggerated claims.'

        },


        /* =========================================================
           07. KNOWLEDGE VERSION
        ========================================================= */

        version: {

            major: 1,

            minor: 0,

            patch: 0,

            name: 'Nexpak Advanced Sales Assistant Knowledge Base',

            date: '2026-08-31'

        }

    };


    /* =============================================================
       KNOWLEDGE API
    ============================================================= */

    const NexpakKnowledgeAPI = {


        getCategory: function (category) {

            if (!category) {
                return null;
            }

            return NEXPAK_KNOWLEDGE.productCategories[category] || null;

        },


        getPropertyType: function (type) {

            if (!type) {
                return null;
            }

            return NEXPAK_KNOWLEDGE.propertyTypes[type] || null;

        },


        getElectricFenceKnowledge: function () {

            return NEXPAK_KNOWLEDGE.electricFencing;

        },


        getFaultKnowledge: function () {

            return NEXPAK_KNOWLEDGE.electricFenceFaults;

        },


        getAllCategories: function () {

            return Object.keys(
                NEXPAK_KNOWLEDGE.productCategories
            );

        },


        getAllPropertyTypes: function () {

            return Object.keys(
                NEXPAK_KNOWLEDGE.propertyTypes
            );

        },


        getVersion: function () {

            return NEXPAK_KNOWLEDGE.version;

        }

    };


    /* =============================================================
       EXPORT TO WINDOW
    ============================================================= */

    window.NEXPAK_KNOWLEDGE = NEXPAK_KNOWLEDGE;

    window.NexpakKnowledgeAPI = NexpakKnowledgeAPI;


})(window);

        /* =========================================================
           08. CCTV SURVEILLANCE — ADVANCED KNOWLEDGE
        ========================================================= */

        cctvAdvanced: {

            name: 'CCTV Surveillance',

            category: 'Video Surveillance',


            /* -----------------------------------------------------
               CORE EXPLANATION
            ----------------------------------------------------- */

            definition:
                'CCTV is a video-surveillance system used to monitor, record and review activity in and around a property.',


            simpleExplanation:
                'CCTV cameras allow a customer to see what is happening around a property and, when recording is configured, review events that have already happened.',


            importantSalesPrinciple:
                'Do not recommend cameras simply by asking how many cameras the customer wants. Determine what they need to see, where they need to see it, how far away the subject is, lighting conditions and whether identification is required.',


            /* -----------------------------------------------------
               CCTV TECHNOLOGIES
            ----------------------------------------------------- */

            technologies: {


                hdCctv: {

                    name: 'HD CCTV',

                    description:
                        'High-definition surveillance systems commonly using compatible coaxial cabling and a digital video recorder.',

                    suitableApplications: [

                        'Residential properties',

                        'Small businesses',

                        'Existing coaxial CCTV upgrades',

                        'Customers wanting to reuse suitable existing cabling'

                    ],

                    salesQuestions: [

                        'Do you already have CCTV installed?',

                        'What type of recorder do you currently have?',

                        'Is the existing cabling still usable?',

                        'Are you replacing cameras or the entire system?'

                    ]

                },


                ipCctv: {

                    name: 'IP CCTV',

                    description:
                        'Network-based surveillance systems where cameras communicate using network infrastructure.',

                    advantages: [

                        'Digital video transmission',

                        'Flexible network architecture',

                        'High-resolution camera options',

                        'PoE options where supported',

                        'Remote network connectivity',

                        'Scalable system architecture'

                    ],

                    suitableApplications: [

                        'New CCTV installations',

                        'Commercial properties',

                        'Industrial properties',

                        'Larger residential properties',

                        'Customers requiring advanced network features'

                    ]

                },


                poe: {

                    name: 'Power over Ethernet',

                    abbreviation: 'PoE',

                    description:
                        'PoE allows compatible network equipment to deliver power and data over suitable Ethernet infrastructure.',

                    advantages: [

                        'Simplified cabling',

                        'Centralized power arrangement',

                        'Suitable for compatible IP cameras',

                        'Can simplify installation planning'

                    ],

                    importantNote:
                        'PoE availability and power requirements must be checked against the actual camera, switch, recorder and network equipment specifications.'

                },


                dvr: {

                    name: 'DVR',

                    fullName: 'Digital Video Recorder',

                    purpose:
                        'Records and manages video from compatible CCTV cameras.',

                    commonlyAssociatedWith:
                        'HD CCTV systems using compatible coaxial infrastructure.'

                },


                nvr: {

                    name: 'NVR',

                    fullName: 'Network Video Recorder',

                    purpose:
                        'Records and manages video from compatible network cameras.',

                    commonlyAssociatedWith:
                        'IP CCTV systems.'

                }

            },


            /* -----------------------------------------------------
               CAMERA RESOLUTION
            ----------------------------------------------------- */

            resolution: {

                principle:
                    'Higher resolution can provide more image detail, but resolution alone does not determine whether a camera will identify a person or object.',

                commonResolutionClasses: [

                    '2MP',

                    '4MP',

                    '5MP',

                    '8MP',

                    '4K-class surveillance'

                ],

                importantFactors: [

                    'Lens selection',

                    'Viewing distance',

                    'Field of view',

                    'Lighting',

                    'Camera position',

                    'Compression',

                    'Scene movement',

                    'Required identification detail'

                ],

                salesExplanation:
                    'A higher-resolution camera is not automatically better for every location. The camera must be matched to the scene and viewing requirement.'

            },


            /* -----------------------------------------------------
               CAMERA LENS
            ----------------------------------------------------- */

            lenses: {

                principle:
                    'The lens determines how wide or narrow the camera views the scene and strongly affects how much detail is available at a particular distance.',

                wideAngle:

                    'Useful when the customer needs a wider field of view over a relatively close area.',

                narrowerView:

                    'Useful when the customer needs more focused coverage of a specific area or greater detail at distance.',

                selectionQuestions: [

                    'How far is the camera from the area being monitored?',

                    'How wide is the area?',

                    'Does the customer need a wide overview or more focused detail?',

                    'Is identification required?'

                ]

            },


            /* -----------------------------------------------------
               NIGHT VISION
            ----------------------------------------------------- */

            nightVision: {

                definition:
                    'Night-vision capability allows compatible cameras to produce usable surveillance images in low-light or dark conditions.',

                technologies: [

                    'Infrared illumination',

                    'Low-light imaging',

                    'Colour night vision on supported equipment',

                    'Supplementary lighting where appropriate'

                ],

                customerQuestions: [

                    'Do you need the camera to operate in complete darkness?',

                    'Is there existing lighting at night?',

                    'How far away is the area you need to see?',

                    'Do you need general observation or identification at night?'

                ],

                importantWarning:
                    'Night vision performance depends on the camera, lens, scene, ambient light, reflective surfaces and distance. Do not promise a specific night-vision distance without verified product specifications.'

            },


            /* -----------------------------------------------------
               HUMAN / VEHICLE DETECTION
            ----------------------------------------------------- */

            analytics: {

                features: [

                    'Motion detection',

                    'Human detection',

                    'Vehicle detection',

                    'Line crossing',

                    'Intrusion detection',

                    'Area detection',

                    'Event filtering',

                    'Smart search'

                ],

                explanation:
                    'Analytics can help reduce irrelevant alerts by allowing compatible systems to distinguish or classify certain types of movement.',

                salesQuestions: [

                    'Do you want alerts for every movement or only people and vehicles?',

                    'Are false alarms a major concern?',

                    'Which areas require intelligent detection?'

                ]

            },


            /* -----------------------------------------------------
               REMOTE VIEWING
            ----------------------------------------------------- */

            remoteViewing: {

                definition:
                    'Remote viewing allows authorized users to view compatible CCTV systems from a phone, tablet or computer through the appropriate network and application setup.',

                customerBenefits: [

                    'View property remotely',

                    'Check entrances',

                    'Review events',

                    'Receive supported notifications',

                    'Monitor business premises while away'

                ],

                requirements: [

                    'Compatible recorder or camera',

                    'Suitable network connection',

                    'Correct system configuration',

                    'Compatible application or platform',

                    'Appropriate user credentials'

                ],

                salesQuestions: [

                    'Do you want to view your cameras from your phone?',

                    'Do you need notifications when activity is detected?',

                    'Is reliable internet available at the property?'

                ]

            },


            /* -----------------------------------------------------
               STORAGE
            ----------------------------------------------------- */

            storage: {

                definition:
                    'CCTV storage determines how much recorded video can be retained before older footage is overwritten or otherwise managed.',

                factors: [

                    'Number of cameras',

                    'Camera resolution',

                    'Frame rate',

                    'Compression',

                    'Recording schedule',

                    'Motion-based recording',

                    'Continuous recording',

                    'Required retention period'

                ],

                customerQuestions: [

                    'How many cameras will be recording?',

                    'Do you need continuous recording?',

                    'How many days of footage would you like to retain?',

                    'Do you want recording all the time or primarily when activity occurs?'

                ],

                importantRule:
                    'Never promise a specific number of recording days without calculating the actual storage requirements from the chosen equipment and recording settings.'

            },


            /* -----------------------------------------------------
               CAMERA TYPES
            ----------------------------------------------------- */

            cameraTypes: {


                turret: {

                    name: 'Turret Camera',

                    commonUses: [

                        'Residential surveillance',

                        'Entrances',

                        'Driveways',

                        'General outdoor monitoring'

                    ]

                },


                dome: {

                    name: 'Dome Camera',

                    commonUses: [

                        'Indoor surveillance',

                        'Commercial premises',

                        'Retail environments',

                        'Areas where a compact camera design is preferred'

                    ]

                },


                bullet: {

                    name: 'Bullet Camera',

                    commonUses: [

                        'Outdoor monitoring',

                        'Perimeter views',

                        'Driveways',

                        'Longer directional viewing applications'

                    ]

                },


                ptz: {

                    name: 'PTZ Camera',

                    fullName:
                        'Pan-Tilt-Zoom',

                    capabilities: [

                        'Pan',

                        'Tilt',

                        'Optical zoom on supported models',

                        'Preset positions',

                        'Tracking features on supported models'

                    ],

                    suitableApplications: [

                        'Large areas',

                        'Open compounds',

                        'Industrial sites',

                        'Situations requiring active camera control'

                    ],

                    importantNote:
                        'A PTZ camera should not automatically be treated as a replacement for multiple fixed cameras because a PTZ may be looking in one direction while an event occurs elsewhere.'

                }

            },


            /* -----------------------------------------------------
               CCTV COVERAGE
            ----------------------------------------------------- */

            coveragePlanning: {

                principle:
                    'CCTV coverage should be designed around the areas that matter most to the customer rather than simply placing cameras at convenient positions.',

                priorityAreas: [

                    'Main entrance',

                    'Vehicle gate',

                    'Pedestrian gate',

                    'Driveway',

                    'Parking area',

                    'Perimeter',

                    'Backyard',

                    'Side passages',

                    'Warehouse entrance',

                    'Loading area',

                    'Cash or stock areas',

                    'Office entrances'

                ],

                designQuestions: [

                    'What area are you trying to monitor?',

                    'Where does the person or vehicle approach from?',

                    'How far is the subject from the camera?',

                    'What needs to be visible?',

                    'What happens at night?',

                    'Do you need identification or general observation?',

                    'Are there obstructions such as walls, trees or buildings?'

                ]

            },


            /* -----------------------------------------------------
               IDENTIFICATION VS OBSERVATION
            ----------------------------------------------------- */

            identification: {

                observation:
                    'The customer mainly wants to know what is happening in an area.',

                recognition:
                    'The customer wants enough detail to distinguish a known person, vehicle or object.',

                identification:
                    'The customer requires sufficiently detailed imagery to assist with identifying an unknown person, vehicle or event.',

                importantFactors: [

                    'Distance',

                    'Lens',

                    'Resolution',

                    'Lighting',

                    'Camera position',

                    'Target size in the image',

                    'Movement',

                    'Scene conditions'

                ],

                salesQuestion:
                    'Do you mainly want to see what is happening, or do you need enough detail to identify people or vehicles?'

            },


            /* -----------------------------------------------------
               CCTV INSTALLATION PLANNING
            ----------------------------------------------------- */

            installationFactors: [

                'Camera mounting height',

                'Camera position',

                'Cable routes',

                'Power availability',

                'Network infrastructure',

                'Weather exposure',

                'Lighting',

                'Vandalism risk',

                'Access for maintenance',

                'Recorder location',

                'Storage requirements',

                'Internet availability for remote viewing'

            ],


            /* -----------------------------------------------------
               CCTV CUSTOMER QUALIFICATION
            ----------------------------------------------------- */

            qualificationQuestions: [

                'Is this for a home or business?',

                'How many areas do you want to monitor?',

                'Which areas are most important?',

                'Do you need the driveway monitored?',

                'Do you need gate monitoring?',

                'Do you need coverage at night?',

                'Do you need to identify people?',

                'Do you need to identify vehicle number plates?',

                'Do you want remote viewing on your phone?',

                'Do you need continuous recording?',

                'How long do you want recordings retained?',

                'Do you already have an existing CCTV system?',

                'Do you know whether the existing system is HD or IP?',

                'Do you have existing cabling that you want to reuse?'

            ],


            /* -----------------------------------------------------
               CCTV SALES SCENARIOS
            ----------------------------------------------------- */

            scenarios: {


                homeBasic: {

                    description:
                        'Customer wants general monitoring around a home.',

                    likelySolution:
                        'A correctly sized residential CCTV system with suitable cameras, recording and optional remote viewing.',

                    askFirst: [

                        'How many areas need coverage?',

                        'Which areas are most important?',

                        'Do you need night vision?',

                        'Do you want phone access?'

                    ]

                },


                driveway: {

                    description:
                        'Customer wants to monitor vehicles entering or leaving.',

                    considerations: [

                        'Camera position',

                        'Distance to vehicle',

                        'Lighting',

                        'Required image detail',

                        'Number-plate requirements',

                        'Gate position'

                    ],

                    askFirst: [

                        'How far is the camera from the vehicle entry point?',

                        'Do you need to identify number plates or simply see vehicles?',

                                                'Is the area illuminated at night?'

                    ]

                },


                /* =================================================
                   BUSINESS CCTV SCENARIO
                ================================================= */

                business: {

                    description:
                        'Customer wants CCTV for a commercial property.',

                    considerations: [

                        'Main entrance',

                        'Staff entrance',

                        'Customer areas',

                        'Cashier or point-of-sale areas',

                        'Stock rooms',

                        'Warehouse areas',

                        'Loading areas',

                        'Parking areas',

                        'Vehicle entrances',

                        'Perimeter',

                        'Recording retention',

                        'Remote viewing',

                        'User access permissions'

                    ],

                    askFirst: [

                        'What type of business is it?',

                        'How many areas need monitoring?',

                        'Which areas are most important?',

                        'Do you need to monitor staff, customers, vehicles or stock?',

                        'Do you need remote viewing?',

                        'How long do you need recordings retained?',

                        'Do you already have CCTV installed?'

                    ]

                },


                /* =================================================
                   LARGE PROPERTY SCENARIO
                ================================================= */

                largeProperty: {

                    description:
                        'Customer wants to monitor a large residential, agricultural or industrial property.',

                    considerations: [

                        'Property size',

                        'Camera distances',

                        'Network infrastructure',

                        'Power availability',

                        'Multiple buildings',

                        'Perimeter areas',

                        'Long-distance links',

                        'Remote monitoring',

                        'Environmental conditions',

                        'Maintenance access'

                    ],

                    askFirst: [

                        'Approximately how large is the property?',

                        'How many buildings need coverage?',

                        'How far apart are the buildings?',

                        'Which areas are the highest priority?',

                        'Is power available where cameras will be installed?',

                        'Is network infrastructure already available?',

                        'Do you need remote viewing?'

                    ],

                    recommendation:
                        'A site assessment may be appropriate before final equipment selection.'

                }

            },


            /* =================================================
               CCTV COMMON QUESTIONS
            ================================================= */

            commonQuestions: [

                'What is CCTV?',

                'What is the difference between DVR and NVR?',

                'What is an IP camera?',

                'What is PoE?',

                'What camera resolution do I need?',

                'Do I need 4K cameras?',

                'Can I view CCTV on my phone?',

                'How long can CCTV record?',

                'How much storage do I need?',

                'Can CCTV work at night?',

                'Can CCTV see in complete darkness?',

                'Can CCTV identify people?',

                'Can CCTV read number plates?',

                'How many cameras do I need?',

                'Can I use my existing CCTV cables?',

                'Can I upgrade my old CCTV system?',

                'What is the best camera for a driveway?',

                'What is the best camera for a gate?',

                'What is the best CCTV for a business?',

                'Can CCTV work with an alarm system?',

                'Can CCTV work with electric fencing?',

                'Can CCTV detect people?',

                'Can CCTV detect vehicles?',

                'Can CCTV send notifications to my phone?',

                'Can CCTV record when there is movement?',

                'Can CCTV record continuously?',

                'How much does CCTV cost?',

                'How many cameras do I need for my house?',

                'How many cameras do I need for my business?',

                'What is the difference between 2MP, 4MP and 8MP cameras?',

                'What is 4K CCTV?',

                'What is night vision?',

                'What is infrared CCTV?',

                'What is colour night vision?',

                'What is a PTZ camera?',

                'What is a dome camera?',

                'What is a bullet camera?',

                'What is a turret camera?'

            ],


            /* =================================================
               CCTV SAFETY / ACCURACY RULES
            ================================================= */

            safetyRules: [

                'Do not promise that CCTV will prevent crime.',

                'Do not promise that every camera can identify a person at any distance.',

                'Do not promise a specific night-vision distance without verified specifications.',

                'Do not promise a specific recording period without calculating storage requirements.',

                'Do not promise remote viewing without confirming compatible equipment and connectivity.',

                'Do not recommend a camera solely because it has a higher megapixel rating.',

                'Do not claim number-plate recognition unless the selected equipment and installation are appropriate for that purpose.',

                'Do not invent product models or technical specifications.',

                'Do not invent current prices.',

                'Do not claim a product is in stock unless the live product system confirms availability.',

                'Do not claim an installation date unless confirmed by Nexpak.',

                'If the customer requires a technically complex CCTV system, recommend a proper site assessment.'

            ],


            /* =================================================
               CCTV SALES POSITIONING
            ================================================= */

            salesPositioning:
                'The best CCTV recommendation is based on what the customer needs to see, where the subject will be, lighting conditions, required image detail, recording requirements and available infrastructure—not simply camera quantity or megapixels.'

        },


        /* =========================================================
           09. CCTV SALES QUALIFICATION ENGINE
        ========================================================= */

        cctvSalesQualification: {

            objective:
                'Collect enough information to determine the customer requirement before recommending a CCTV solution.',


            priorityQuestions: [

                {
                    id: 'property',

                    question:
                        'What type of property are you looking to secure?',

                    options: [

                        'House',

                        'Townhouse',

                        'Smallholding',

                        'Farm',

                        'Office',

                        'Retail',

                        'Warehouse',

                        'Factory',

                        'Other'

                    ]

                },


                {
                    id: 'coverage',

                    question:
                        'Which areas do you want the cameras to cover?',

                    examples: [

                        'Front entrance',

                        'Driveway',

                        'Gate',

                        'Backyard',

                        'Side passages',

                        'Parking',

                        'Warehouse',

                        'Perimeter',

                        'Stock area'

                    ]

                },


                {
                    id: 'cameraCount',

                    question:
                        'Approximately how many areas need monitoring?',

                    note:
                        'Do not automatically translate the answer into a final camera count. Camera placement should be determined from the required coverage.'

                },


                {
                    id: 'night',

                    question:
                        'Do you need reliable surveillance at night?'

                },


                {
                    id: 'identification',

                    question:
                        'Do you need general monitoring, or do you need to identify people and vehicles?'

                },


                {
                    id: 'remote',

                    question:
                        'Would you like to view the cameras from your phone when you are away?'

                },


                {
                    id: 'recording',

                    question:
                        'How long would you like recorded footage to be retained?'

                },


                {
                    id: 'existing',

                    question:
                        'Do you already have a CCTV system installed?'

                }

            ],


            /* =================================================
               CUSTOMER INTENT LEVELS
            ================================================= */

            intentLevels: {

                browsing: {

                    description:
                        'Customer is only researching CCTV.',

                    responseStrategy:
                        'Explain the available options and ask what they are trying to monitor.'

                },


                interested: {

                    description:
                        'Customer is actively considering purchasing CCTV.',

                    responseStrategy:
                        'Ask qualification questions and narrow down a suitable system.'

                },


                readyToBuy: {

                    description:
                        'Customer knows what they want or is asking for pricing.',

                    responseStrategy:
                        'Collect the information required for a quotation and move the customer toward the sales process.'

                },


                urgent: {

                    description:
                        'Customer has an active security problem or urgently needs a replacement.',

                    responseStrategy:
                        'Determine the immediate requirement, avoid making unsupported promises and escalate to the appropriate Nexpak sales channel when necessary.'

                }

            }

        },

        /* =========================================================
           10. ALARM SYSTEMS — ADVANCED KNOWLEDGE
        ========================================================= */

        alarmSystemsAdvanced: {

            name: 'Alarm Systems',

            category: 'Intrusion Detection',


            /* -----------------------------------------------------
               CORE DEFINITION
            ----------------------------------------------------- */

            definition:
                'An alarm system is an electronic security system designed to detect defined events such as unauthorized entry, movement or tampering and generate an alarm or notification.',


            simpleExplanation:
                'An alarm system uses sensors and other detection devices to identify a security event and then alerts the occupants, monitoring service or authorized users, depending on how the system is configured.',


            salesPrinciple:
                'The assistant must first understand what the customer wants to protect and how they want to be notified before recommending an alarm system.',


            /* -----------------------------------------------------
               MAIN COMPONENTS
            ----------------------------------------------------- */

            components: {


                controlPanel: {

                    name: 'Alarm Control Panel',

                    purpose:
                        'The central controller of the alarm system. It receives information from connected devices and manages system functions according to its configuration.',

                    customerExplanation:
                        'Think of the control panel as the brain of the alarm system. Sensors report events to it and the panel determines what action the system should take.',

                    salesQuestions: [

                        'How many areas need protection?',

                        'How many doors and windows need sensors?',

                        'Do you need multiple user codes?',

                        'Do you require remote control from a phone?',

                        'Do you already have an alarm panel installed?'

                    ]

                },


                keypad: {

                    name: 'Keypad',

                    purpose:
                        'Allows authorized users to operate and interact with the alarm system.',

                    functions: [

                        'Arm system',

                        'Disarm system',

                        'View system status',

                        'Enter user credentials',

                        'Access configured alarm functions'

                    ]

                },


                magneticContacts: {

                    name: 'Magnetic Door / Window Contacts',

                    purpose:
                        'Detect the opening of protected doors, windows or other suitable openings.',

                    commonApplications: [

                        'Front doors',

                        'Back doors',

                        'Garage doors',

                        'Windows',

                        'Security gates',

                        'Other access points'

                    ],

                    salesQuestion:
                        'Which doors and windows do you want protected?'

                },


                pir: {

                    name: 'PIR Motion Detector',

                    fullName:
                        'Passive Infrared Motion Detector',

                    purpose:
                        'Detects changes in infrared energy associated with movement within its detection area.',

                    commonApplications: [

                        'Passageways',

                        'Living areas',

                        'Offices',

                        'Warehouses',

                        'Reception areas',

                        'Internal rooms'

                    ],

                    salesQuestions: [

                        'Which rooms need movement detection?',

                        'Are there pets in the protected area?',

                        'Are there areas that should remain active while people are present?'

                    ],

                    importantNote:
                        'The correct detector depends on the environment and application. Do not promise pet immunity or detection performance without verified product specifications.'

                },


                siren: {

                    name: 'Siren',

                    purpose:
                        'Provides an audible alarm indication when the system generates an alarm condition.',

                    types: [

                        'Indoor siren',

                        'Outdoor siren',

                        'Wireless siren',

                        'Wired siren'

                    ]

                },


                panicDevice: {

                    name: 'Panic Device',

                    purpose:
                        'Allows an authorized user to trigger an alarm event manually when supported by the system.',

                    applications: [

                        'Residential emergencies',

                        'Business premises',

                        'Reception areas',

                        'Security desks',

                        'Special risk environments'

                    ]

                },


                remoteControl: {

                    name: 'Remote Control',

                    purpose:
                        'Allows supported alarm functions to be controlled remotely.',

                    possibleFunctions: [

                        'Arm',

                        'Disarm',

                        'Trigger panic',

                        'Check status on supported systems'

                    ]

                }

            },


            /* -----------------------------------------------------
               ALARM ZONES
            ----------------------------------------------------- */

            zones: {

                definition:
                    'A zone is a defined input or detection area within an alarm system.',

                examples: [

                    'Front door',

                    'Back door',

                    'Garage',

                    'Bedroom',

                    'Office',

                    'Warehouse',

                    'Perimeter detector'

                ],

                explanation:
                    'Zones allow the alarm system to identify where a detection event has occurred.',

                salesQuestion:
                    'How many separate areas or detection points do you need to protect?'

            },


            /* -----------------------------------------------------
               ARMING MODES
            ----------------------------------------------------- */

            armingModes: {

                away: {

                    name: 'Away / Full Arm',

                    explanation:
                        'Used when the protected premises is expected to be unoccupied, subject to the system configuration.'

                },


                stay: {

                    name: 'Stay / Partial Arm',

                    explanation:
                        'Allows selected protection to remain active while occupants are inside, depending on the system configuration.'

                },


                night: {

                    name: 'Night Mode',

                    explanation:
                        'Some systems support a customized night configuration that protects selected areas while allowing movement in designated areas.'

                },


                importantNote:
                    'Exact arming modes and behaviour depend on the alarm platform and configuration.'

            },


            /* -----------------------------------------------------
               WIRELESS VS WIRED
            ----------------------------------------------------- */

            installationTypes: {


                wired: {

                    name: 'Wired Alarm System',

                    advantages: [

                        'Reliable physical connection',

                        'No wireless battery replacement for wired sensors',

                        'Suitable for new installations where cabling can be installed',

                        'Useful for some larger installations'

                    ],

                    considerations: [

                        'Cable routing',

                        'Installation access',

                        'Building construction',

                        'Aesthetic considerations'

                    ]

                },


                wireless: {

                    name: 'Wireless Alarm System',

                    advantages: [

                        'Reduced need for new signal cabling',

                        'Useful for certain retrofit installations',

                        'Flexible sensor placement',

                        'Can simplify installation in suitable environments'

                    ],

                    considerations: [

                        'Battery maintenance',

                        'Wireless signal conditions',

                        'Device compatibility',

                        'Environmental conditions',

                        'System range'

                    ]

                },


                hybrid: {

                    name: 'Hybrid Alarm System',

                    explanation:
                        'A hybrid system can combine wired and wireless devices where supported.',

                    advantage:
                        'Can provide flexibility when upgrading an existing installation or dealing with different areas of a property.'

                }

            },


            /* -----------------------------------------------------
               REMOTE MONITORING
            ----------------------------------------------------- */

            remoteMonitoring: {

                definition:
                    'Remote monitoring allows alarm events or system information to be communicated to an authorized remote destination when the system and service support it.',

                possibleMethods: [

                    'Mobile application',

                    'Internet connection',

                    'Cellular communication',

                    'Monitoring centre',

                    'SMS or supported notifications'

                ],

                customerQuestions: [

                    'Do you want alarm notifications on your phone?',

                    'Do you require professional monitoring?',

                    'Do you have reliable internet at the property?',

                    'Is cellular backup required?'

                ],

                importantRule:
                    'Never promise a particular notification method without confirming that the selected alarm platform supports it.'

            },


            /* -----------------------------------------------------
               ALARM + CCTV INTEGRATION
            ----------------------------------------------------- */

            cctvIntegration: {

                concept:
                    'Alarm and CCTV systems can complement one another by combining intrusion detection with visual verification where compatible equipment and configuration allow.',

                example:

                    'An alarm event can prompt the customer to check a relevant CCTV camera and determine what is happening.',

                benefits: [

                    'Visual verification',

                    'Faster understanding of events',

                    'Better situational awareness',

                    'Combined security management'

                ],

                salesQuestion:
                    'Would you like your alarm system and CCTV system to work together where compatible?'

            },


            /* -----------------------------------------------------
               ALARM + ELECTRIC FENCE INTEGRATION
            ----------------------------------------------------- */

            electricFenceIntegration: {

                concept:
                    'An electric fence can form part of a layered perimeter-security system alongside an alarm system.',

                benefits: [

                    'Perimeter deterrence',

                    'Perimeter detection',

                    'Internal intrusion detection',

                    'Multiple layers of protection'

                ],

                example:
                    'The electric fence can protect the perimeter while alarm sensors protect doors, windows and internal areas.',

                importantNote:
                    'The exact integration method depends on the equipment and installation design.'

            },


            /* -----------------------------------------------------
               ALARM + ACCESS CONTROL
            ----------------------------------------------------- */

            accessIntegration: {

                concept:
                    'Access-control systems and alarm systems can work together in appropriate installations to manage authorized entry while monitoring security events.',

                applications: [

                    'Commercial buildings',

                    'Offices',

                    'Warehouses',

                    'Industrial facilities',

                    'Controlled staff areas'

                ]

            },


            /* -----------------------------------------------------
               PET CONSIDERATIONS
            ----------------------------------------------------- */

            pets: {

                issue:
                    'Customers with pets may be concerned about movement detectors generating unwanted alarms.',

                assistantResponse:
                    'The correct detector and configuration should be selected for the environment and the type and size of pets present.',

                questions: [

                    'Do you have dogs or cats?',

                    'Which areas do the pets access?',

                    'Will the pets remain inside while the alarm is armed?'

                ],

                importantRule:
                    'Never guarantee that a detector will be completely immune to every possible pet-related false alarm.'

            },


            /* -----------------------------------------------------
               FALSE ALARMS
            ----------------------------------------------------- */

            falseAlarms: {

                possibleCauses: [

                    'Incorrect sensor positioning',

                    'Environmental conditions',

                    'Loose connections',

                    'Low battery',

                    'Interference',

                    'Incorrect configuration',

                    'Animals',

                    'Doors or windows not properly secured',

                    'Equipment faults'

                ],

                troubleshootingApproach: [

                    'Identify which zone generated the event.',

                    'Determine whether the event is repeated or isolated.',

                    'Check environmental conditions.',

                    'Check the relevant sensor and installation.',

                    'Check batteries where applicable.',

                    'Recommend professional servicing if the cause is not obvious.'

                ]

            },


            /* -----------------------------------------------------
               ALARM SYSTEM CUSTOMER QUALIFICATION
            ----------------------------------------------------- */

            qualificationQuestions: [

                'Is this for a home or business?',

                'What areas do you want to protect?',

                'How many external doors are there?',

                'How many windows need protection?',

                'Do you need movement detection?',

                'Do you have pets?',

                'Do you need panic functionality?',

                'Do you want notifications on your phone?',

                'Do you require professional monitoring?',

                'Do you already have an alarm system?',

                'Are you replacing an existing system or installing a new one?',

                'Do you want the alarm integrated with CCTV?',

                'Do you have an electric fence that should form part of the security system?'

            ],


            /* -----------------------------------------------------
               COMMON CUSTOMER QUESTIONS
            ----------------------------------------------------- */

            commonQuestions: [

                'How does an alarm system work?',

                'How much does an alarm system cost?',

                'How many sensors do I need?',

                'What is a PIR sensor?',

                'What is a magnetic contact?',

                'What is an alarm zone?',

                'Can I control my alarm from my phone?',

                'Can I receive alarm notifications on my phone?',

                'Can I use an alarm system without a monitoring company?',

                'Can an alarm system work during a power failure?',

                'Can I use wireless alarm sensors?',

                'Can I upgrade my existing alarm system?',

                'Can an alarm work with CCTV?',

                'Can an alarm work with electric fencing?',

                'Can an alarm system work with access control?',

                'Why does my alarm keep going off?',

                'Why is my alarm showing a fault?',

                'How often should alarm batteries be replaced?',

                'What happens if the internet goes down?',

                'What happens if the power goes out?'

            ],


            /* -----------------------------------------------------
               SALES SCENARIOS
            ----------------------------------------------------- */

            scenarios: {


                newHome: {

                    description:
                        'Customer is building or moving into a home and wants a new alarm system.',

                    approach: [

                        'Determine property layout.',

                        'Identify entry points.',

                        'Identify internal areas requiring detection.',

                        'Determine pet requirements.',

                        'Determine remote notification requirements.',

                        'Determine integration requirements.'

                    ]

                },


                existingAlarm: {

                    description:
                        'Customer already has an alarm system and wants an upgrade.',

                    askFirst: [

                        'What alarm system is currently installed?',

                        'How old is the system?',

                        'What would you like to improve?',

                        'Are the existing sensors still working?',

                        'Do you want mobile control?',

                        'Do you want to add CCTV or other security equipment?'

                    ]

                },


                businessAlarm: {

                    description:
                        'Commercial customer wants intrusion protection.',

                    considerations: [

                                            'Multiple entrances',

                    'Staff access',

                    'After-hours protection',

                    'Restricted areas',

                    'Panic functionality',

                    'CCTV integration',

                    'Access control integration',

                    'Monitoring requirements',

                    'Different user permissions',

                    'Multiple arming areas',

                    'Emergency procedures',

                    'Backup communication requirements'

                ],

                askFirst: [

                    'What type of business is it?',

                    'How large is the premises?',

                    'How many entrances need protection?',

                    'How many employees or authorized users will operate the system?',

                    'Are there restricted areas that require additional protection?',

                    'Do you need different access or alarm permissions for different users?',

                    'Do you need panic buttons?',

                    'Do you already have CCTV installed?',

                    'Do you already have access control installed?',

                    'Do you require professional alarm monitoring?',

                    'Do you need the alarm system to remain operational during a power failure?'

                ]

            },


            /* =====================================================
               ALARM UPGRADE SCENARIO
            ===================================================== */

            upgrade: {

                description:
                    'Customer has an existing alarm system and wants to improve, expand or modernize it.',

                objective:
                    'Determine whether the existing system can be upgraded or whether replacement equipment is more appropriate.',

                askFirst: [

                    'What alarm panel is currently installed?',

                    'How old is the system?',

                    'Is the system currently working?',

                    'Which sensors are still operational?',

                    'Are there any existing faults?',

                    'What would you like the new system to do?',

                    'Do you want mobile phone control?',

                    'Do you want additional sensors?',

                    'Do you want CCTV integration?',

                    'Do you want electric-fence integration?',

                    'Do you want access-control integration?'

                ],

                salesRule:
                    'Do not automatically recommend replacing an entire alarm system. First determine the condition, compatibility and limitations of the existing equipment.'

            },


            /* =====================================================
               ALARM COST GUIDANCE
            ===================================================== */

            pricingGuidance: {

                principle:
                    'Alarm system pricing depends on the equipment selected, number and type of detection devices, installation requirements, property size, communication requirements and integration requirements.',

                pricingFactors: [

                    'Control panel',

                    'Keypad',

                    'Number of zones',

                    'Door contacts',

                    'Window contacts',

                    'PIR detectors',

                    'Outdoor detectors',

                    'Sirens',

                    'Panic devices',

                    'Wireless devices',

                    'Communication modules',

                    'Battery backup',

                    'Cabling',

                    'Installation complexity',

                    'CCTV integration',

                    'Electric-fence integration',

                    'Access-control integration'

                ],

                responseWhenAskedPrice:
                    'I can help you estimate what type of alarm system you may need, but the final price depends on the property, number of detection points, equipment and installation requirements.',

                importantRule:
                    'Never invent a current product price. Use verified product pricing or move the customer toward a quotation.'

            },


            /* =====================================================
               POWER FAILURE
            ===================================================== */

            powerFailure: {

                explanation:
                    'Many alarm systems use backup batteries so the system can continue operating for a period during a mains power failure, depending on the equipment, battery condition and system load.',

                importantFactors: [

                    'Battery capacity',

                    'Battery condition',

                    'System load',

                    'Number of connected devices',

                    'Communication equipment',

                    'Duration of power outage'

                ],

                customerQuestion:
                    'Does your alarm currently remain operational when the mains power goes off?'

            },


            /* =====================================================
               ALARM BATTERY KNOWLEDGE
            ===================================================== */

            batteries: {

                purpose:
                    'The backup battery supplies power to compatible alarm equipment when mains power is unavailable.',

                symptomsOfBatteryProblems: [

                    'Battery fault indication',

                    'Repeated low-battery warnings',

                    'System trouble notifications',

                    'Reduced backup runtime',

                    'Alarm panel reporting a battery fault'

                ],

                salesGuidance:
                    'If the customer reports a battery fault, recommend testing the battery and charging system rather than immediately assuming the battery alone is defective.',

                safetyRule:
                    'Electrical servicing should be performed by an appropriately qualified or competent technician.'

            },


            /* =====================================================
               ALARM COMMUNICATION
            ===================================================== */

            communication: {

                options: [

                    'Internet',

                    'Cellular communication',

                    'Wi-Fi where supported',

                    'Ethernet where supported',

                    'Monitoring-centre communication'

                ],

                considerations: [

                    'Network availability',

                    'Signal strength',

                    'Backup communication',

                    'Service availability',

                    'Equipment compatibility'

                ],

                salesQuestion:
                    'How would you like to receive alarm notifications—through an app, monitoring service, cellular communication or another supported method?'

            },


            /* =====================================================
               OUTDOOR DETECTION
            ===================================================== */

            outdoorDetection: {

                description:
                    'Outdoor detection can provide an additional security layer around selected external areas before an intruder reaches the building.',

                possibleApplications: [

                    'Driveways',

                    'Walkways',

                    'Garden areas',

                    'Building approaches',

                    'Perimeter areas',

                    'Restricted external zones'

                ],

                environmentalFactors: [

                    'Rain',

                    'Wind',

                    'Vegetation',

                    'Animals',

                    'Temperature',

                    'Sunlight',

                    'Uneven terrain',

                    'Object movement'

                ],

                importantRule:
                    'Outdoor detection requires careful product selection and installation because environmental conditions can increase the possibility of unwanted detections.'

            },


            /* =====================================================
               DOOR AND WINDOW PROTECTION
            ===================================================== */

            perimeterProtection: {

                objective:
                    'Protect likely entry points before an intruder reaches the internal areas of the property.',

                commonPoints: [

                    'Front door',

                    'Back door',

                    'Garage door',

                    'Sliding doors',

                    'Accessible windows',

                    'Office doors',

                    'Emergency exits',

                    'Other vulnerable openings'

                ],

                salesQuestion:
                    'Which external doors and accessible windows would you like protected?'

            },


            /* =====================================================
               INTERNAL PROTECTION
            ===================================================== */

            internalProtection: {

                objective:
                    'Detect movement or intrusion inside selected areas of the property.',

                commonAreas: [

                    'Passages',

                    'Entrance halls',

                    'Living rooms',

                    'Offices',

                    'Warehouses',

                    'Storage areas',

                    'Server rooms',

                    'Restricted areas'

                ],

                planningPrinciple:
                    'Internal detection should be positioned according to the property layout and the expected movement paths rather than simply placing detectors in every room.'

            },


            /* =====================================================
               ALARM RESPONSE LOGIC
            ===================================================== */

            responseLogic: {

                basicFlow: [

                    'Detection device detects an event',

                    'Alarm panel receives the event',

                    'System evaluates the configured zone and state',

                    'Alarm response is activated according to configuration',

                    'Siren or other local indication may activate',

                    'Supported remote notifications may be generated',

                    'Monitoring centre may receive the event where a monitoring service is configured'

                ],

                importantNote:
                    'Exact response behaviour depends on the alarm system, configuration and services connected to it.'

            },


            /* =====================================================
               CUSTOMER CONVERSATION EXAMPLES
            ===================================================== */

            conversationExamples: {

                customerSays:
                    'I need an alarm for my house.',

                assistantShouldAsk: [

                    'Absolutely. Is this a new installation or are you replacing an existing alarm system?',

                    'How many external doors and accessible windows would you like protected?',

                    'Would you also like movement detection inside the house?',

                    'Do you have pets?',

                    'Would you like to control the alarm and receive notifications from your phone?'

                ],

                customerSays:
                    'My alarm keeps going off.',

                assistantShouldAsk: [

                    'Do you know which zone is triggering the alarm?',

                    'Is the problem happening repeatedly or only occasionally?',

                    'Does it happen at a particular time of day?',

                    'Are there pets, moving curtains, vegetation or other environmental factors near the detector?',

                    'Is the system showing any battery or fault indication?'

                ]

            },


            /* =====================================================
               LEAD QUALIFICATION
            ===================================================== */

            leadQualification: {

                highIntentSignals: [

                    'I need a quote',

                    'How much is installation?',

                    'I want an alarm installed',

                    'Can someone come to my property?',

                    'I need an alarm urgently',

                    'I want to replace my existing alarm',

                    'Can you upgrade my alarm?'

                ],

                mediumIntentSignals: [

                    'What alarm do you recommend?',

                    'Which alarm is best?',

                    'Can I control it from my phone?',

                    'How many sensors do I need?'

                ],

                lowIntentSignals: [

                    'What is an alarm system?',

                    'How does a PIR work?',

                    'What is a magnetic contact?'

                ]

            }

        },


        /* =========================================================
           12. SECURITY SYSTEM SALES STRATEGY
        ========================================================= */

        securitySalesStrategy: {

            corePrinciple:
                'Sell the customer the right security solution, not simply the largest number of products.',


            conversationOrder: [

                'Understand the property',

                'Understand the customer concern',

                'Identify vulnerable areas',

                'Determine the required level of protection',

                'Identify existing security equipment',

                'Determine integration requirements',

                'Establish budget expectations when appropriate',

                'Recommend suitable options',

                'Explain the value of the solution',

                'Ask for the sale or quotation opportunity'

            ],


            neverDo: [

                'Do not pressure the customer aggressively.',

                'Do not invent technical specifications.',

                'Do not invent stock availability.',

                'Do not invent installation dates.',

                'Do not guarantee crime prevention.',

                'Do not guarantee a specific security outcome.',

                'Do not pretend to have inspected a property when no inspection occurred.',

                'Do not provide a final installation design without sufficient information.'

            ],


            salesQuestions: [

                'What are you trying to protect?',

                'What security problem are you experiencing?',

                'What security equipment do you already have?',

                'What areas are most important to you?',

                'Would you like monitoring or mobile notifications?',

                'Would you like the different security systems integrated?',

                'Are you looking for equipment only or installation as well?'

            ],


            closingQuestions: [

                'Would you like us to prepare a quotation for you?',

                'Would you like help choosing the right system?',

                'Would you like an Nexpak representative to contact you?',

                'Would you like to tell me a little more about the property so I can narrow down the options?'

            ]

        },

                    /* =========================================================
           13. ACCESS CONTROL — ADVANCED KNOWLEDGE
        ========================================================= */

        accessControlAdvanced: {

            name: 'Access Control',

            category: 'Controlled Entry',


            /* -----------------------------------------------------
               CORE DEFINITION
            ----------------------------------------------------- */

            definition:
                'Access control is a security system used to control and manage who is permitted to enter a protected area.',


            simpleExplanation:
                'Instead of allowing everyone to enter freely, access control requires an authorized credential or approved method of entry.',


            salesPrinciple:
                'The assistant should determine who needs access, where access is required, how many users are involved and how the customer wants access managed before recommending equipment.',


            /* -----------------------------------------------------
               ACCESS METHODS
            ----------------------------------------------------- */

            accessMethods: {


                keypad: {

                    name: 'PIN / Keypad Access',

                    description:
                        'Users enter an authorized PIN or code to request access.',

                    advantages: [

                        'No physical card required',

                        'Simple for selected applications',

                        'Useful for controlled staff or residential access'

                    ],

                    considerations: [

                        'PIN sharing',

                        'User management',

                        'Code security',

                        'Suitable installation environment'

                    ]

                },


                rfid: {

                    name: 'RFID / Proximity Access',

                    description:
                        'Users present a compatible credential such as a proximity card or tag to a reader.',

                    advantages: [

                        'Convenient user access',

                        'Individual credentials can be assigned',

                        'Credentials can often be removed when access is no longer required'

                    ],

                    applications: [

                        'Offices',

                        'Staff entrances',

                        'Apartment buildings',

                        'Warehouses',

                        'Controlled gates'

                    ]

                },


                biometric: {

                    name: 'Biometric Access',

                    description:
                        'Uses a biometric characteristic such as a fingerprint or facial feature on supported equipment to authenticate a user.',

                    commonApplications: [

                        'Offices',

                        'Commercial buildings',

                        'Staff entrances',

                        'Restricted areas'

                    ],

                    considerations: [

                        'Number of users',

                        'Environment',

                        'Device capability',

                        'User enrollment',

                        'Privacy requirements',

                        'Backup access method'

                    ],

                    importantRule:
                        'Do not promise biometric recognition performance without considering the actual device, environment and manufacturer specifications.'

                },


                mobile: {

                    name: 'Mobile Access',

                    description:
                        'Some access-control platforms support mobile credentials or application-based access.',

                    considerations: [

                        'Compatible hardware',

                        'Application support',

                        'Bluetooth or network requirements',

                        'User permissions',

                        'Phone compatibility'

                    ]

                },


                remote: {

                    name: 'Remote Access Management',

                    description:
                        'Compatible systems may allow authorized administrators to manage users or access events remotely.',

                    possibleFunctions: [

                        'User management',

                        'Credential management',

                        'Access event review',

                        'Remote unlocking where supported',

                        'Temporary access'

                    ]

                }

            },


            /* -----------------------------------------------------
               CORE COMPONENTS
            ----------------------------------------------------- */

            components: {


                reader: {

                    name: 'Access Reader',

                    purpose:
                        'Reads or receives the credential used by an authorized user.',

                    possibleTypes: [

                        'RFID reader',

                        'Keypad reader',

                        'Fingerprint reader',

                        'Facial recognition reader',

                        'Combined reader'

                    ]

                },


                controller: {

                    name: 'Access Controller',

                    purpose:
                        'Processes access requests and controls connected locking or entry equipment according to its configuration.'

                },


                electricStrike: {

                    name: 'Electric Strike',

                    purpose:
                        'An electrically controlled locking component that can release a compatible door latch when authorized access is granted.',

                    considerations: [

                        'Door type',

                        'Lock type',

                        'Fail-safe or fail-secure configuration',

                        'Power requirements',

                        'Fire and emergency requirements'

                    ],

                    importantRule:
                        'The correct locking method must be selected for the specific door and safety requirements.'

                },


                maglock: {

                    name: 'Magnetic Lock',

                    purpose:
                        'An electromagnetic locking device used on suitable doors.',

                    considerations: [

                        'Door construction',

                        'Power supply',

                        'Emergency release requirements',

                        'Fail-safe operation',

                        'Exit hardware',

                        'Fire safety requirements'

                    ],

                    importantRule:
                        'Magnetic locks require appropriate emergency egress and safety arrangements. Do not recommend a configuration without considering the applicable building and fire-safety requirements.'

                },


                exitButton: {

                    name: 'Request-to-Exit / Exit Button',

                    purpose:
                        'Allows an authorized person inside a controlled area to initiate a release of the door where appropriately configured.',

                    commonApplications: [

                        'Offices',

                        'Staff entrances',

                        'Controlled rooms',

                        'Commercial premises'

                    ]

                },


                doorSensor: {

                    name: 'Door Position Sensor',

                    purpose:
                        'Provides information about whether a protected door is open or closed when supported by the system.',

                    benefits: [

                        'Door-status monitoring',

                        'Access event context',

                        'Detection of certain abnormal door conditions'

                    ]

                }

            },


            /* -----------------------------------------------------
               USER MANAGEMENT
            ----------------------------------------------------- */

            userManagement: {

                principle:
                    'A good access-control system should make it easier for an authorized administrator to control who has access.',

                possibleFunctions: [

                    'Add users',

                    'Remove users',

                    'Assign credentials',

                    'Change PINs',

                    'Disable lost credentials',

                    'Manage access permissions',

                    'Review access events where supported',

                    'Create temporary access where supported'

                ],

                salesQuestions: [

                    'How many people need access?',

                    'Do different people require different access permissions?',

                    'Do you need to remove users when they leave the company?',

                    'Do you need temporary access for visitors or contractors?'

                ]

            },


            /* -----------------------------------------------------
               ACCESS LEVELS
            ----------------------------------------------------- */

            accessLevels: {

                concept:
                    'Access levels determine which users are allowed to enter particular doors, gates or areas.',

                examples: [

                    'General staff',

                    'Management',

                    'Security personnel',

                    'Maintenance staff',

                    'Visitors',

                    'Contractors'

                ],

                salesExample:
                    'A business may allow general employees into the main building while restricting the server room, stock room or management areas to authorized personnel.'

            },


            /* -----------------------------------------------------
               ACCESS EVENTS
            ----------------------------------------------------- */

            eventLogging: {

                description:
                    'Some access-control systems record access events, allowing authorized administrators to review activity.',

                possibleInformation: [

                    'User identity',

                    'Credential used',

                    'Door or gate',

                    'Date',

                    'Time',

                    'Access granted',

                    'Access denied'

                ],

                importantRule:
                    'Exact event information depends on the selected access-control equipment and software.'

            },


            /* -----------------------------------------------------
               RESIDENTIAL ACCESS CONTROL
            ----------------------------------------------------- */

            residential: {

                applications: [

                    'Main entrance',

                    'Pedestrian gate',

                    'Garage access',

                    'Apartment entrance',

                    'Complex entrance',

                    'Staff or service entrance'

                ],

                commonRequirements: [

                    'Remote gate access',

                    'Intercom',

                    'Keypad',

                    'RFID',

                    'Mobile access',

                    'Visitor management'

                ],

                qualificationQuestions: [

                    'Is this for a private home or residential complex?',

                    'How many people require access?',

                    'Do you need vehicle and pedestrian access controlled separately?',

                    'Do you need an intercom?',

                    'Do you want mobile access?'

                ]

            },


            /* -----------------------------------------------------
               COMMERCIAL ACCESS CONTROL
            ----------------------------------------------------- */

            commercial: {

                applications: [

                    'Office buildings',

                    'Factories',

                    'Warehouses',

                    'Retail premises',

                    'Medical facilities',

                    'Schools',

                    'Storage facilities'

                ],

                considerations: [

                    'Number of employees',

                    'Number of controlled doors',

                    'User permissions',

                    'Working hours',

                    'Visitor access',

                    'Staff turnover',

                    'Event logging',

                    'Emergency exit requirements',

                    'Integration with alarm systems',

                    'Integration with CCTV'

                ]

            },


            /* -----------------------------------------------------
               ACCESS CONTROL + CCTV
            ----------------------------------------------------- */

            cctvIntegration: {

                concept:
                    'Access control and CCTV can complement each other by combining information about who requested access with visual information from nearby cameras where compatible systems support integration.',

                benefits: [

                    'Visual verification',

                    'Improved event investigation',

                    'Better awareness of access events',

                    'Centralized security information where supported'

                ],

                salesQuestion:
                    'Would you like CCTV to monitor the doors or gates controlled by the access-control system?'

            },


            /* -----------------------------------------------------
               ACCESS CONTROL + ALARM
            ----------------------------------------------------- */

            alarmIntegration: {

                concept:
                    'Access control and intrusion alarms can work together in suitable installations.',

                applications: [

                    'Restricted areas',

                    'After-hours access',

                    'Staff entrances',

                    'Commercial buildings',

                    'Warehouses'

                ],

                importantNote:
                    'Integration depends on compatible equipment and configuration.'

            },


            /* -----------------------------------------------------
               ACCESS CONTROL SALES QUALIFICATION
            ----------------------------------------------------- */

            qualificationQuestions: [

                'Is the system for a home, office, warehouse, factory or another property?',

                'How many people need access?',

                'How many doors or gates need to be controlled?',

                'Do you need vehicle access, pedestrian access or both?',

                'Which access method would you prefer—PIN, RFID, biometric or mobile?',

                'Do different users need different access permissions?',

                'Do you need visitor access?',

                'Do you need access-event records?',

                'Do you need remote management?',

                'Do you already have an access-control system?',

                'Do you want access control integrated with CCTV?',

                'Do you want access control integrated with an alarm system?'

            ],


            /* -----------------------------------------------------
               COMMON QUESTIONS
            ----------------------------------------------------- */

            commonQuestions: [

                'What is access control?',

                'How does access control work?',

                'What is RFID access?',

                'What is biometric access?',

                'Can I use a PIN to open the door?',

                'Can I use my phone to open the gate?',

                'How many users can an access-control system support?',

                'Can I remove a user when they leave the company?',

                'Can I see who accessed the door?',

                'Can access control work with CCTV?',

                'Can access control work with an alarm?',

                'Can access control be installed on a gate?',

                'Can access control be installed on a pedestrian gate?',

                'How much does access control cost?'

            ],


            /* -----------------------------------------------------
               SAFETY / ACCURACY
            ----------------------------------------------------- */

            safetyRules: [

                'Do not recommend a lock without considering the door and exit requirements.',

                'Do not ignore emergency egress requirements.',

                'Do not claim a biometric reader will work perfectly in every environment.',

                'Do not invent user capacity specifications.',

                'Do not claim mobile access is available without compatible equipment.',

                'Do not promise access logs without confirming that the selected system supports them.',

                'Do not invent compatibility between access-control equipment and other security systems.'

            ]

        },


        /* =========================================================
           14. GATE AUTOMATION — ADVANCED KNOWLEDGE
        ========================================================= */

        gateAutomationAdvanced: {

            name: 'Gate Automation',

            category: 'Automated Entry',


            /* -----------------------------------------------------
               CORE DEFINITION
            ----------------------------------------------------- */

            definition:
                'Gate automation uses an electrically powered operator and control system to open and close a compatible gate.',


            simpleExplanation:
                'Instead of manually opening the gate, a motorized system allows authorized users to operate the gate using a remote, keypad, intercom, access-control system or compatible mobile solution.',


            salesPrinciple:
                'The correct gate motor depends on the gate type, gate weight, gate dimensions, operating frequency, installation conditions and required features.'


            /* -----------------------------------------------------
               GATE TYPES
            ----------------------------------------------------- */

            gateTypes: {

                sliding: {

                    name: 'Sliding Gate',

                    operation:
                        'The gate moves horizontally along a track or suitable sliding mechanism.',

                    considerations: [

                        'Gate weight',

                        'Gate length',

                        'Track condition',

                        'Gate alignment',

                        'Ground conditions',

                        'Usage frequency',

                        'Rack installation',

                        'Manual release requirements'

                    ]

                },


                swing: {

                    name: 'Swing G
               
