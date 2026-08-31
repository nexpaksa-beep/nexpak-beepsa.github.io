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

                                        name: 'Swing Gate',

                    operation:
                        'The gate swings open and closed around hinges.',

                    considerations: [

                        'Gate leaf weight',

                        'Gate leaf length',

                        'Hinge condition',

                        'Opening angle',

                        'Wind exposure',

                        'Gate geometry',

                        'Usage frequency',

                        'Operator mounting position',

                        'Manual release requirements'

                    ]

                }

            },


            /* -----------------------------------------------------
               SLIDING GATE MOTORS
            ----------------------------------------------------- */

            slidingGate: {

                commonComponents: [

                    'Gate motor',

                    'Drive gear',

                    'Rack',

                    'Remote controls',

                    'Control board',

                    'Safety sensors where applicable',

                    'Battery backup where supported',

                    'Manual release mechanism'

                ],

                qualificationQuestions: [

                    'Is the gate sliding or swinging?',

                    'Approximately how heavy is the gate?',

                    'How long is the gate?',

                    'How frequently is the gate used?',

                    'Is the gate moving freely by hand?',

                    'Is the track level and in good condition?',

                    'Do you need battery backup?',

                    'Do you want phone or access-control operation?'

                ]

            },


            /* -----------------------------------------------------
               SWING GATE MOTORS
            ----------------------------------------------------- */

            swingGate: {

                commonComponents: [

                    'Swing gate operator',

                    'Control board',

                    'Hinges',

                    'Mounting brackets',

                    'Remote controls',

                    'Safety devices where applicable',

                    'Battery backup where supported',

                    'Manual release mechanism'

                ],

                qualificationQuestions: [

                    'Is it a single or double swing gate?',

                    'Approximately how heavy is each gate leaf?',

                    'How wide is each gate leaf?',

                    'How frequently is the gate used?',

                    'Does the gate move freely manually?',

                    'Are the hinges in good condition?',

                    'Is there strong wind exposure?',

                    'Do you need battery backup?',

                    'Do you want phone or access-control operation?'

                ]

            },


            /* -----------------------------------------------------
               GATE MOTOR SELECTION
            ----------------------------------------------------- */

            selectionFactors: [

                'Gate type',

                'Gate weight',

                'Gate dimensions',

                'Usage frequency',

                'Gate condition',

                'Track condition',

                'Hinge condition',

                'Slope',

                'Wind exposure',

                'Power availability',

                'Battery backup requirement',

                'Security requirements',

                'Access-control integration',

                'Intercom integration',

                'Remote operation requirements'

            ],


            importantRule:
                'Never recommend a specific gate motor solely from the gate weight. Gate dimensions, operating frequency, mechanical condition and installation conditions must also be considered.',


            /* -----------------------------------------------------
               BATTERY BACKUP
            ----------------------------------------------------- */

            batteryBackup: {

                purpose:
                    'Battery backup can allow compatible gate automation equipment to continue operating during a mains power interruption.',

                considerations: [

                    'Battery capacity',

                    'Gate size',

                    'Motor load',

                    'Usage frequency',

                    'Battery condition',

                    'System design'

                ],

                salesQuestion:
                    'Do you need the gate to continue operating during a power failure?'

            },


            /* -----------------------------------------------------
               SAFETY DEVICES
            ----------------------------------------------------- */

            safetyDevices: {

                purpose:
                    'Safety devices can help detect people, vehicles or obstacles and may be used to reduce the risk of the gate moving into an obstruction when correctly installed and configured.',

                possibleDevices: [

                    'Photocells',

                    'Safety beams',

                    'Obstacle detection',

                    'Warning lights',

                    'Safety edges where supported'

                ],

                importantRule:
                    'Safety-device requirements depend on the gate design, operator and installation. Never advise bypassing safety devices.'

            },


            /* -----------------------------------------------------
               ACCESS CONTROL INTEGRATION
            ----------------------------------------------------- */

            accessIntegration: {

                methods: [

                    'RFID',

                    'Keypad',

                    'Biometric reader',

                    'Intercom',

                    'Remote control',

                    'Mobile access',

                    'Vehicle detection systems where supported'

                ],

                salesQuestion:
                    'How would you like authorized users to open the gate?'

            },


            /* -----------------------------------------------------
               INTERCOM INTEGRATION
            ----------------------------------------------------- */

            intercomIntegration: {

                concept:
                    'An intercom can allow occupants or security personnel to communicate with a visitor before deciding whether to grant access.',

                possibleFeatures: [

                    'Two-way communication',

                    'Video verification',

                    'Gate release',

                    'Mobile answering on supported systems',

                    'Visitor identification'

                ]

            },


            /* -----------------------------------------------------
               GATE PROBLEMS
            ----------------------------------------------------- */

            commonFaults: {

                gateNotMoving: [

                    'Power issue',

                    'Battery problem',

                    'Control-board issue',

                    'Motor fault',

                    'Mechanical obstruction',

                    'Gate binding',

                    'Track problem',

                    'Manual release engaged'

                ],

                slowGate: [

                    'Mechanical resistance',

                    'Gate alignment problem',

                    'Track or hinge issue',

                    'Motor overload',

                    'Power-related problem',

                    'Equipment fault'

                ],

                gateReverses: [

                    'Obstacle detection',

                    'Safety sensor activation',

                    'Mechanical resistance',

                    'Configuration issue',

                    'Gate alignment problem',

                    'Equipment fault'

                ],

                intermittentOperation: [

                    'Power supply issue',

                    'Battery condition',

                    'Remote-control issue',

                    'Receiver issue',

                    'Loose connection',

                    'Environmental interference',

                    'Mechanical resistance'

                ]

            },


            /* -----------------------------------------------------
               GATE SALES SCENARIOS
            ----------------------------------------------------- */

            scenarios: {

                newInstallation: {

                    description:
                        'Customer wants automation installed on an existing manual gate.',

                    askFirst: [

                        'Is the gate sliding or swinging?',

                        'What are the approximate dimensions?',

                        'Approximately how heavy is it?',

                        'Does it move freely by hand?',

                        'How often is it used each day?',

                        'Do you need battery backup?',

                        'Do you want remote controls, keypad, intercom or mobile access?'

                    ]

                },


                replacement: {

                    description:
                        'Customer wants to replace an existing gate motor.',

                    askFirst: [

                        'What motor is currently installed?',

                        'What type of gate is it?',

                        'What problem are you experiencing?',

                        'How old is the motor?',

                        'Is the gate mechanically operating correctly?',

                        'Do you want to keep the existing remotes?',

                        'Do you want to upgrade to mobile or access-control operation?'

                    ]

                },


                repair: {

                    description:
                        'Customer reports a problem with an existing automated gate.',

                    approach: [

                        'Identify whether the gate is sliding or swinging.',

                        'Determine whether the gate moves manually.',

                        'Determine whether the motor has power.',

                        'Identify any warning indicators.',

                        'Determine whether the problem is constant or intermittent.',

                        'Recommend professional inspection where the cause cannot safely be determined remotely.'

                    ]

                }

            },


            /* -----------------------------------------------------
               COMMON QUESTIONS
            ----------------------------------------------------- */

            commonQuestions: [

                'How much does a gate motor cost?',

                'What gate motor do I need?',

                'Can you automate my existing gate?',

                'Can a gate motor work during a power failure?',

                'Can I open my gate from my phone?',

                'Can I connect my gate to an intercom?',

                'Can I connect my gate to access control?',

                'Can I use a keypad with my gate motor?',

                'Can I use an RFID reader on my gate?',

                'Why is my gate motor not working?',

                'Why is my gate motor slow?',

                'Why does my gate reverse?',

                'Why does my gate only work sometimes?',

                'How often should a gate motor be serviced?'

            ],


            /* -----------------------------------------------------
               SAFETY RULES
            ----------------------------------------------------- */

            safetyRules: [

                'Never advise a customer to bypass gate safety devices.',

                'Never advise operating a mechanically unsafe gate.',

                'Never recommend a motor solely on gate weight.',

                'Never guarantee a motor will work without checking the gate condition.',

                'Never promise battery runtime without knowing the system load and battery specification.',

                'Never claim a gate automation system makes a property completely secure.',

                'Recommend professional inspection when the gate is damaged, binding or mechanically unsafe.'

            ]

        },


        /* =========================================================
           15. ACCESS + GATE SALES QUALIFICATION ENGINE
        ========================================================= */

        accessGateQualification: {

            objective:
                'Determine the customer requirement before recommending access-control or gate-automation equipment.',

            qualificationFlow: [

                {
                    step: 1,

                    question:
                        'What are you trying to control—a pedestrian door, pedestrian gate, vehicle gate or multiple entry points?'

                },

                {
                    step: 2,

                    question:
                        'How many people or vehicles need authorized access?'

                },

                {
                    step: 3,

                    question:
                        'How would you like users to gain access—remote, PIN, RFID, biometric, intercom or mobile access?'

                },

                {
                    step: 4,

                    question:
                        'Is there an existing gate motor or access-control system?'

                },

                {
                    step: 5,

                    question:
                        'What type and size of gate or door are we dealing with?'

                },

                {
                    step: 6,

                    question:
                        'Do you require battery backup?'

                },

                {
                    step: 7,

                    question:
                        'Would you like CCTV or alarm integration?'

                },

                {
                    step: 8,

                    question:
                        'Would you like us to prepare a quotation based on the requirement?'

                }

            ],


            highIntentSignals: [

                'I need a gate motor',

                'I need access control installed',

                'My gate motor is broken',

                'I need a new gate motor',

                'I need a keypad for my gate',

                'I need fingerprint access',

                'I need RFID access',

                'I need an intercom',

                'I need a quote'

            ]

        },

                    /* =========================================================
           16. CCTV & VIDEO SURVEILLANCE — ADVANCED KNOWLEDGE
        ========================================================= */

        cctvAdvanced: {

            name: 'CCTV Surveillance',

            category: 'Video Security',


            /* -----------------------------------------------------
               CORE DEFINITION
            ----------------------------------------------------- */

            definition:
                'CCTV is a video surveillance system used to monitor, record and review activity in selected areas of a property.',

            simpleExplanation:
                'CCTV cameras capture video and send it to a recording or processing device. Depending on the system, customers may also view live or recorded footage remotely.',

            salesPrinciple:
                'Do not sell a camera simply because it has a high megapixel number. The correct camera depends on what the customer needs to see, the distance involved, lighting conditions, mounting position, required image detail and recording requirements.',


            /* -----------------------------------------------------
               CCTV SYSTEM TYPES
            ----------------------------------------------------- */

            systemTypes: {

                analogHD: {

                    name: 'HD Analog CCTV',

                    description:
                        'Uses compatible coaxial or related cabling to transmit high-definition video to a compatible recorder.',

                    commonComponents: [

                        'HD cameras',

                        'DVR',

                        'Hard drive',

                        'Power supply',

                        'Video cabling',

                        'Connectors',

                        'Monitor where required'

                    ],

                    advantages: [

                        'Can be suitable for upgrading existing coaxial installations',

                        'Wide range of camera options',

                        'Centralized recording'

                    ]

                },


                ip: {

                    name: 'IP CCTV',

                    description:
                        'Uses network-connected cameras that transmit digital video over a network to compatible recording or management equipment.',

                    commonComponents: [

                        'IP cameras',

                        'NVR',

                        'Network switch where required',

                        'PoE equipment where applicable',

                        'Network cabling',

                        'Hard drive',

                        'Router or network infrastructure where required'

                    ],

                    advantages: [

                        'Digital network video',

                        'Flexible network architecture',

                        'High-resolution camera options',

                        'PoE support on compatible equipment',

                        'Advanced analytics on supported cameras and recorders'

                    ]

                }

            },


            /* -----------------------------------------------------
               CAMERA SELECTION
            ----------------------------------------------------- */

            cameraSelection: {

                principle:
                    'Camera selection should start with the surveillance objective rather than the camera resolution.',

                primaryQuestions: [

                    'What area do you want to monitor?',

                    'What do you need to see?',

                    'How far is the camera from the target?',

                    'Do you need to identify a person or simply detect activity?',

                    'Do you need to identify vehicle number plates?',

                    'Is the area indoors or outdoors?',

                    'How much lighting is available at night?',

                    'Do you need colour footage at night?',

                    'Do you need audio?',

                    'Do you need remote viewing?',

                    'How long do you need recordings retained?'

                ],


                selectionFactors: [

                    'Resolution',

                    'Lens type',

                    'Field of view',

                    'Target distance',

                    'Lighting',

                    'Night performance',

                    'Infrared capability',

                    'Low-light performance',

                    'Wide dynamic range',

                    'Weather resistance',

                    'Mounting position',

                    'Required identification detail',

                    'Recording requirements',

                    'Storage capacity',

                    'Analytics',

                    'Network requirements'

                ]

            },


            /* -----------------------------------------------------
               CAMERA OBJECTIVES
            ----------------------------------------------------- */

            surveillanceObjectives: {

                overview: {

                    description:
                        'Customer wants a general view of an area.',

                    priority:

                        [

                            'Coverage',

                            'Field of view',

                            'Lighting',

                            'Mounting position'

                        ]

                },


                detection: {

                    description:
                        'Customer wants to know whether activity is occurring.',

                    priority: [

                        'Coverage',

                        'Movement visibility',

                        'Lighting',

                        'Camera placement'

                    ]

                },


                recognition: {

                    description:
                        'Customer wants enough visual detail to recognize a person or object.',

                    priority: [

                        'Target distance',

                        'Resolution',

                        'Lens',

                        'Lighting',

                        'Camera positioning'

                    ]

                },


                identification: {

                    description:
                        'Customer requires sufficient detail to identify a person, vehicle or other target.',

                    priority: [

                        'Target distance',

                        'Pixel density',

                        'Lens selection',

                        'Lighting',

                        'Camera angle',

                        'Target movement'

                    ],

                    importantRule:
                        'A camera specification alone cannot guarantee identification quality. The complete installation must be designed around the target and viewing conditions.'

                }

            },


            /* -----------------------------------------------------
               CAMERA LOCATIONS
            ----------------------------------------------------- */

            commonLocations: {

                frontEntrance: {

                    description:
                        'Customer wants to monitor people approaching or entering the main entrance.',

                    considerations: [

                        'Approach direction',

                        'Camera height',

                        'Face visibility',

                        'Lighting',

                        'Door position',

                        'Backlighting',

                        'Required identification detail'

                    ],

                    askFirst: [

                        'How far is the camera from the entrance?',

                        'Do you need to identify visitors or simply monitor activity?',

                        'Is the entrance illuminated at night?',

                        'Is there strong sunlight behind people approaching the camera?'

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

                        'Gate position',

                        'Vehicle direction',

                        'Vehicle speed'

                    ],

                    askFirst: [

                        'How far is the camera from the vehicle entry point?',

                        'Do you need to identify number plates or simply see vehicles?',

                        'Is the area illuminated at night?',

                        'Do vehicles stop at the gate or continue moving through it?',

                        'How many vehicle entry points are there?'

                    ]

                },


                backyard: {

                    description:
                        'Customer wants to monitor an external residential area.',

                    considerations: [

                        'Coverage area',

                        'Lighting',

                        'Vegetation',

                        'Weather exposure',

                        'Mounting height',

                        'Blind spots',

                        'Night performance'

                    ]

                },


                businessEntrance: {

                    description:
                        'Commercial customer wants to monitor a staff or customer entrance.',

                    considerations: [

                        'Pedestrian traffic',

                        'Operating hours',

                        'Identification requirements',

                        'Lighting',

                        'Access-control integration',

                        'Recording retention',

                        'Privacy considerations'

                    ]

                },


                warehouse: {

                    description:
                        'Customer wants surveillance of a warehouse or storage facility.',

                    considerations: [

                        'Large coverage areas',

                        'High mounting positions',

                        'Low-light areas',

                        'Loading bays',

                        'Staff movement',

                        'Stock protection',

                        'Vehicle movement',

                        'Recording duration'

                    ]

                },


                cashDesk: {

                    description:
                        'Customer wants to monitor a point-of-sale or cash-handling area.',

                    considerations: [

                        'Camera angle',

                        'Transaction visibility',

                        'Lighting',

                        'Screen glare',

                        'Privacy',

                        'Recording retention'

                    ],

                    importantRule:
                        'Camera positioning should provide useful evidence without unnecessarily capturing sensitive areas unrelated to the security objective.'

                }

            },


            /* -----------------------------------------------------
               LENS KNOWLEDGE
            ----------------------------------------------------- */

            lenses: {

                fixed: {

                    name: 'Fixed Lens',

                    description:
                        'Provides a predetermined field of view.',

                    suitableFor: [

                        'Defined viewing areas',

                        'Entrances',

                        'Small rooms',

                        'Standard surveillance positions'

                    ]

                },


                varifocal: {

                    name: 'Varifocal Lens',

                    description:
                        'Allows the lens field of view to be adjusted within its supported range.',

                    suitableFor: [

                        'Installations where exact framing needs adjustment',

                        'Variable target distances',

                        'Professional camera positioning'

                    ]

                },


                wideAngle: {

                    name: 'Wide-Angle View',

                    description:
                        'Provides broader coverage but may reduce the amount of image detail available on distant targets.',

                    importantRule:
                        'Wider coverage and greater identification detail often require different camera and lens considerations.'

                }

            },


            /* -----------------------------------------------------
               RESOLUTION
            ----------------------------------------------------- */

            resolution: {

                commonLevels: [

                    '2MP',

                    '4MP',

                    '5MP',

                    '8MP / 4K',

                    'Higher resolutions on supported equipment'

                ],

                principle:
                    'Higher resolution can provide more image detail, but resolution alone does not determine the quality of surveillance evidence.',

                otherFactors: [

                    'Lens quality',

                    'Lighting',

                    'Sensor performance',

                    'Compression',

                    'Distance',

                    'Camera angle',

                    'Target movement',

                    'Recording settings'

                ],

                salesRule:
                    'Never tell a customer that 4K automatically means they will be able to identify every person or number plate.'

            },


            /* -----------------------------------------------------
               NIGHT VISION
            ----------------------------------------------------- */

            nightVision: {

                infrared: {

                    name: 'Infrared Night Vision',

                    description:
                        'Uses infrared illumination to assist cameras in producing images in low-light or dark conditions on supported equipment.',

                    considerations: [

                        'IR range',

                        'Scene reflectivity',

                        'Camera placement',

                        'Obstructions',

                        'Target distance',

                        'Environmental conditions'

                    ]

                },


                lowLight: {

                    name: 'Low-Light Colour',

                    description:
                        'Some cameras are designed to retain colour information under suitable low-light conditions.',

                    considerations: [

                        'Available light',

                        'Camera sensor',

                        'Lens',

                        'Target movement',

                        'Scene conditions'

                    ]

                },


                whiteLight: {

                    name: 'White-Light Illumination',

                    description:
                        'Some cameras use visible illumination to assist with colour images at night.',

                    considerations: [

                        'Customer preference',

                        'Neighbour considerations',

                        'Lighting environment',

                        'Camera location',

                        'Detection requirements'

                    ]

                }

            },


            /* -----------------------------------------------------
               WDR
            ----------------------------------------------------- */

            wideDynamicRange: {

                name: 'WDR',

                definition:
                    'Wide Dynamic Range technology can help cameras handle scenes containing significant differences between bright and dark areas.',

                usefulLocations: [

                    'Entrances',

                    'Doorways',

                    'Driveways',

                    'Areas facing sunlight',

                    'Areas with strong backlighting'

                ],

                salesExplanation:
                    'If a person is standing in front of a bright doorway or strong sunlight, WDR can help produce a more usable image where supported and correctly configured.'

            },


            /* -----------------------------------------------------
               NUMBER PLATE REQUIREMENTS
            ----------------------------------------------------- */

            numberPlateRecognition: {

                principle:
                    'Number-plate identification requires careful consideration of camera position, target distance, lens, vehicle speed, lighting, shutter behaviour and the specific camera capabilities.',

                askFirst: [

                    'How far is the camera from the vehicle?',

                    'How fast are the vehicles moving?',

                    'Do vehicles stop at the gate?',

                    'Is the camera viewing the vehicle straight on or at an angle?',

                    'Is the area illuminated at night?',

                    'Do you need plate identification during both day and night?',

                    'How many lanes or entry points need monitoring?'

                ],

                importantRule:
                    'Do not promise number-plate recognition from an ordinary general-purpose CCTV camera.'

            },


            /* -----------------------------------------------------
               AUDIO
            ----------------------------------------------------- */

            audio: {

                possibilities: [

                    'Built-in microphone',

                    'External microphone',

                    'Two-way audio',

                    'Audio recording where supported'

                ],

                considerations: [

                    'Camera capability',

                    'Recorder capability',

                    'Network bandwidth',

                    'Storage',

                    'Legal and privacy requirements'

                ],

                importantRule:
                    'Audio recording and monitoring may have additional legal and privacy considerations. Do not make legal claims without verified requirements.'

            },


            /* -----------------------------------------------------
               STORAGE
            ----------------------------------------------------- */

                        storage: {

                purpose:
                    'Recorded video requires storage capacity based on camera count, resolution, frame rate, compression, recording mode and retention period.',

                factors: [

                    'Number of cameras',

                    'Resolution',

                    'Frame rate',

                    'Compression',

                    'Continuous recording',

                    'Motion recording',

                    'Event recording',

                    'Retention period',

                    'Hard-drive capacity',

                    'Recording schedule',

                    'Camera bitrate',

                    'Video encoding'

                ],

                salesQuestions: [

                    'How many cameras do you need?',

                    'How many days of footage would you like to retain?',

                    'Do you want continuous recording or motion/event recording?',

                    'What resolution do you require?',

                    'Do you need important cameras to record continuously?'

                ],

                explanation:
                    'The amount of storage required depends on how many cameras are recording, the quality and bitrate of the video, how often they record and how long the customer wants to keep the footage.',

                importantRule:
                    'Never guarantee a specific number of recording days without calculating the system requirements and available storage capacity.'

            },


            /* -----------------------------------------------------
               DVR / NVR
            ----------------------------------------------------- */

            recorders: {

                dvr: {

                    name: 'DVR',

                    description:
                        'A Digital Video Recorder is commonly used with compatible HD analog CCTV systems.',

                    considerations: [

                        'Number of channels',

                        'Camera compatibility',

                        'Recording resolution',

                        'Storage capacity',

                        'Remote access support',

                        'Analytics support where applicable'

                    ]

                },


                nvr: {

                    name: 'NVR',

                    description:
                        'A Network Video Recorder manages and records compatible IP cameras.',

                    considerations: [

                        'Number of channels',

                        'Camera compatibility',

                        'Network bandwidth',

                        'PoE support where applicable',

                        'Recording resolution',

                        'Storage capacity',

                        'Analytics support'

                    ]

                }

            },


            /* -----------------------------------------------------
               POE
            ----------------------------------------------------- */

            poe: {

                definition:
                    'Power over Ethernet allows compatible network equipment to transmit data and electrical power over Ethernet cabling.',

                benefits: [

                    'Simplified cabling',

                    'Centralized power',

                    'Suitable for many IP camera installations'

                ],

                considerations: [

                    'PoE standard',

                    'Available power budget',

                    'Camera power requirements',

                    'Cable quality',

                    'Network switch capability',

                    'Cable distance'

                ],

                importantRule:
                    'The camera, switch, NVR or other equipment must support the required PoE standard and power requirements.'

            },


            /* -----------------------------------------------------
               REMOTE VIEWING
            ----------------------------------------------------- */

            remoteViewing: {

                possibleMethods: [

                    'Mobile application',

                    'Web interface',

                    'Desktop software',

                    'Cloud-supported services where available'

                ],

                requirements: [

                    'Compatible recorder or camera',

                    'Internet connectivity',

                    'Correct configuration',

                    'User authentication',

                    'Supported application or software'

                ],

                salesQuestion:
                    'Would you like to view your cameras remotely from your phone?',

                troubleshootingQuestions: [

                    'Can you view the cameras locally?',

                    'Is the recorder powered on?',

                    'Is the network connection working?',

                    'Does the application show the recorder as online?',

                    'Has anything changed on the internet connection or router?'

                ]

            },


            /* -----------------------------------------------------
               CCTV NETWORKING
            ----------------------------------------------------- */

            networking: {

                considerations: [

                    'Network bandwidth',

                    'Cable length',

                    'Switch capacity',

                    'PoE requirements',

                    'IP addressing',

                    'Internet connectivity',

                    'Network security',

                    'Remote access configuration'

                ],

                importantRule:
                    'Do not assume an existing network is automatically suitable for a large IP CCTV installation.'

            },


            /* -----------------------------------------------------
               CCTV STORAGE MODES
            ----------------------------------------------------- */

            recordingModes: {

                continuous: {

                    name: 'Continuous Recording',

                    description:
                        'The system records continuously during the configured recording period.',

                    advantages: [

                        'Provides continuous footage',

                        'Useful where complete event history is important'

                    ],

                    consideration:
                        'Requires more storage than event-based recording under comparable settings.'

                },


                motion: {

                    name: 'Motion Recording',

                    description:
                        'The system records based on configured motion detection or analytics.',

                    advantages: [

                        'Can reduce storage requirements',

                        'Can make reviewing events easier'

                    ],

                    consideration:
                        'Detection settings must be configured correctly to reduce missed events or unwanted recordings.'

                },


                event: {

                    name: 'Event Recording',

                    description:
                        'Recording can be triggered by supported events such as alarms, analytics or other configured conditions.',

                    consideration:
                        'Available event types depend on the selected equipment.'

                }

            },


            /* -----------------------------------------------------
               CCTV SCENARIOS
            ----------------------------------------------------- */

            scenarios: {

                residential: {

                    description:
                        'Customer wants CCTV for a home.',

                    askFirst: [

                        'How many areas do you want to monitor?',

                        'Which entrances need coverage?',

                        'Do you need driveway monitoring?',

                        'Do you need indoor cameras?',

                        'Do you want phone viewing?',

                        'How many days of recording do you require?',

                        'Do you need colour night vision?'

                    ]

                },


                commercial: {

                    description:
                        'Business requires a surveillance system.',

                    askFirst: [

                        'What type of business is it?',

                        'How large is the premises?',

                        'How many entrances and exits are there?',

                        'Do you need internal and external coverage?',

                        'Do you need staff or customer monitoring?',

                        'Do you need vehicle monitoring?',

                        'How long should footage be retained?',

                        'Do you need remote monitoring?',

                        'Do you require integration with access control or alarms?'

                    ]

                },


                upgrade: {

                    description:
                        'Customer already has CCTV and wants to upgrade.',

                    askFirst: [

                        'What system do you currently have?',

                        'Is it analog or IP?',

                        'How old is the system?',

                        'What do you want to improve?',

                        'Are the existing cameras still working?',

                        'Do you want higher resolution?',

                        'Do you want better night vision?',

                        'Do you want remote viewing?',

                        'Do you need additional cameras?'

                    ]

                }

            },


            /* -----------------------------------------------------
               CCTV PRICING
            ----------------------------------------------------- */

            pricingGuidance: {

                principle:
                    'CCTV pricing depends on the camera type, number of cameras, resolution, recorder, storage, cabling, installation complexity, networking and additional features.',

                factors: [

                    'Number of cameras',

                    'Camera type',

                    'Resolution',

                    'Lens',

                    'Night vision',

                    'Recorder',

                    'Hard-drive capacity',

                    'Cabling',

                    'Network equipment',

                    'PoE equipment',

                    'Mounting requirements',

                    'Installation complexity',

                    'Remote-viewing requirements',

                    'Analytics'

                ],

                responseWhenAskedPrice:
                    'I can help narrow down the right CCTV system, but the final price depends on the number of cameras, required image quality, storage, installation and the areas you need covered.',

                importantRule:
                    'Never invent current product pricing or installation costs.'

            },


            /* -----------------------------------------------------
               CCTV SALES QUALIFICATION
            ----------------------------------------------------- */

            qualificationQuestions: [

                'What property are we protecting?',

                'How many areas need monitoring?',

                'Which areas are the highest priority?',

                'Do you need indoor, outdoor or both?',

                'Do you need to identify people or simply monitor activity?',

                'Do you need vehicle or number-plate identification?',

                'How far are the cameras from the target areas?',

                'What lighting conditions exist at night?',

                'Do you want colour night vision?',

                'Do you want remote viewing on your phone?',

                'How many days of recording do you require?',

                'Do you already have CCTV infrastructure?',

                'Do you want CCTV integrated with access control or an alarm system?'

            ],


            /* -----------------------------------------------------
               COMMON CUSTOMER QUESTIONS
            ----------------------------------------------------- */

            commonQuestions: [

                'How much does CCTV cost?',

                'What CCTV camera should I buy?',

                'What is the difference between DVR and NVR?',

                'What is IP CCTV?',

                'What is 4K CCTV?',

                'Can I view CCTV from my phone?',

                'Can CCTV work without internet?',

                'Can CCTV record at night?',

                'How far can a CCTV camera see?',

                'Can CCTV identify number plates?',

                'How many cameras do I need?',

                'How long will CCTV recordings last?',

                'Can I use my existing CCTV cables?',

                'Can I upgrade my existing CCTV system?',

                'Can CCTV work with an alarm system?',

                'Can CCTV work with access control?'

            ],


            /* -----------------------------------------------------
               CCTV SAFETY / ACCURACY RULES
            ----------------------------------------------------- */

            safetyRules: [

                'Do not guarantee identification without considering the installation conditions.',

                'Do not promise number-plate recognition from a standard camera.',

                'Do not invent camera range specifications.',

                'Do not invent recording duration.',

                'Do not assume an existing recorder is compatible with every camera.',

                'Do not assume existing cabling is suitable without checking the system requirements.',

                'Do not guarantee remote viewing without suitable network connectivity.',

                'Do not recommend bypassing network security.',

                'Do not make unsupported legal claims about surveillance or audio recording.',

                'Recommend a site assessment when the requirement is complex or identification-critical.'

            ]

        },


        /* =========================================================
           17. CCTV SALES CONVERSATION ENGINE
        ========================================================= */

        cctvSalesEngine: {

            objective:
                'Turn a general CCTV enquiry into a qualified security requirement before recommending products.',


            openingQuestions: [

                'Is this for a home or business?',

                'What areas would you like to monitor?',

                'What are you mainly trying to achieve—general monitoring, identifying people, monitoring vehicles or number-plate identification?'

            ],


            decisionLogic: {

                generalMonitoring:
                    'Prioritize coverage, camera placement, field of view and suitable night performance.',

                personIdentification:
                    'Prioritize target distance, camera angle, lens selection, resolution and lighting.',

                vehicleMonitoring:
                    'Prioritize camera position, vehicle direction, distance, lighting and required image detail.',

                numberPlateIdentification:
                    'Treat as a specialist requirement and gather detailed information before recommending equipment.'

            },


            salesQuestions: [

                'How many cameras are you considering?',

                'Where will the cameras be installed?',

                'What are the approximate distances to the areas being monitored?',

                'Are the cameras exposed to weather?',

                'What lighting is available at night?',

                'Do you need audio?',

                'Do you want remote viewing?',

                'How many days of recordings do you want to keep?',

                'Do you already have a DVR, NVR or cameras?',

                'Would you like the CCTV integrated with your alarm or access-control system?'

            ],


            closingStrategy: {

                equipmentOnly:
                    'If the customer wants equipment only, determine the required specifications and direct them toward suitable products.',

                installation:
                    'If installation is required, gather enough information for a quotation or recommend a site assessment when necessary.',

                uncertainCustomer:
                    'If the customer is unsure what they need, explain the main options and ask focused questions rather than overwhelming them with specifications.',

                highIntent:
                    'When the customer clearly wants to purchase or install CCTV, move naturally toward collecting the information required for a quotation.'

            }

        },

        /* =========================================================
           18. ALARM SYSTEMS & INTRUSION DETECTION
        ========================================================= */

        alarmSystemsAdvanced: {

            name: 'Alarm Systems',

            category: 'Intrusion Detection',


            /* -----------------------------------------------------
               CORE DEFINITION
            ----------------------------------------------------- */

            definition:
                'An alarm system is designed to detect defined security events and generate an alert through a configured control system.',

            simpleExplanation:
                'An alarm system uses sensors and detectors around a property. When a protected area is triggered while the system is armed, the alarm system can generate an alert and activate connected devices or services.',

            salesPrinciple:
                'The correct alarm system depends on the property layout, number of protected areas, user requirements, communication method, existing equipment and the type of threats the customer wants to detect.',


            /* -----------------------------------------------------
               SYSTEM TYPES
            ----------------------------------------------------- */

            systemTypes: {

                wired: {

                    name: 'Wired Alarm System',

                    description:
                        'Uses physical cabling between compatible detectors, sensors and the alarm control equipment.',

                    advantages: [

                        'Reliable physical connections',

                        'Suitable for many permanent installations',

                        'Can support larger installations',

                        'No detector battery required for many conventional wired devices'

                    ],

                    considerations: [

                        'Cable installation',

                        'Building construction',

                        'Existing wiring',

                        'Installation access',

                        'Expansion requirements'

                    ]

                },


                wireless: {

                    name: 'Wireless Alarm System',

                    description:
                        'Uses wireless communication between compatible devices and the alarm system.',

                    advantages: [

                        'Reduced cabling',

                        'Useful where cable installation is difficult',

                        'Can simplify expansion on compatible systems',

                        'Suitable for certain retrofit installations'

                    ],

                    considerations: [

                        'Signal strength',

                        'Battery condition',

                        'Wireless range',

                        'Environmental conditions',

                        'Device compatibility',

                        'Battery maintenance'

                    ]

                },


                hybrid: {

                    name: 'Hybrid Alarm System',

                    description:
                        'Combines compatible wired and wireless devices within the same alarm architecture.',

                    advantages: [

                        'Installation flexibility',

                        'Useful for upgrades',

                        'Can combine existing wired devices with wireless expansion where supported'

                    ],

                    considerations: [

                        'Panel compatibility',

                        'Device compatibility',

                        'Available zones',

                        'Wireless capacity',

                        'Existing wiring'

                    ]

                }

            },


            /* -----------------------------------------------------
               ALARM SYSTEM COMPONENTS
            ----------------------------------------------------- */

            components: {

                controlPanel: {

                    name: 'Alarm Control Panel',

                    function:
                        'The control panel manages connected alarm devices, processes events and controls configured alarm outputs and communication functions.',

                    considerations: [

                        'Number of zones',

                        'Wireless capacity',

                        'User capacity',

                        'Communication options',

                        'Expansion capability',

                        'Power requirements',

                        'Battery backup'

                    ]

                },


                keypad: {

                    name: 'Keypad',

                    function:
                        'Allows authorized users to interact with the alarm system, including arming, disarming and viewing system information on supported systems.',

                    considerations: [

                        'Location',

                        'User accessibility',

                        'Number of keypads',

                        'System compatibility',

                        'User interface'

                    ]

                },


                pir: {

                    name: 'PIR Motion Detector',

                    function:
                        'A passive infrared detector is commonly used to detect movement associated with changes in infrared energy within its detection area.',

                    considerations: [

                        'Coverage area',

                        'Mounting height',

                        'Detection pattern',

                        'Pet immunity where supported',

                        'Environmental conditions',

                        'Possible sources of false activation'

                    ]

                },


                magneticContact: {

                    name: 'Magnetic Door / Window Contact',

                    function:
                        'Detects the opening or separation of a protected door or window using a compatible magnetic contact arrangement.',

                    suitableFor: [

                        'Entrance doors',

                        'Windows',

                        'Garage doors',

                        'Security doors',

                        'Other opening points'

                    ]

                },


                panicButton: {

                    name: 'Panic Button',

                    function:
                        'Allows a user to manually generate an alarm event when connected to a compatible alarm system.',

                    suitableFor: [

                        'Residential panic requirements',

                        'Commercial premises',

                        'Reception areas',

                        'Security-sensitive locations'

                    ]

                },


                siren: {

                    name: 'Siren',

                    function:
                        'Provides an audible alarm indication when activated by the compatible alarm system.',

                    considerations: [

                        'Indoor or outdoor installation',

                        'Weather exposure',

                        'Mounting position',

                        'System compatibility',

                        'Power requirements'

                    ]

                },


                battery: {

                    name: 'Backup Battery',

                    function:
                        'Provides backup power to compatible alarm equipment during a mains power interruption.',

                    considerations: [

                        'Battery capacity',

                        'System load',

                        'Battery age',

                        'Charging condition',

                        'Connected equipment'

                    ],

                    importantRule:
                        'Never promise a specific backup duration without considering the actual system load and battery specification.'

                }

            },


            /* -----------------------------------------------------
               ALARM ZONES
            ----------------------------------------------------- */

            zones: {

                definition:
                    'A zone represents a monitored input or defined detection area within an alarm system.',

                examples: [

                    'Front door',

                    'Back door',

                    'Garage',

                    'Bedroom',

                    'Living area',

                    'Office',

                    'Warehouse',

                    'Perimeter detection',

                    'Panic input'

                ],

                salesPrinciple:
                    'Zone requirements should be based on the number and type of protected areas rather than simply selecting the cheapest panel.'

            },


            /* -----------------------------------------------------
               DETECTOR TYPES
            ----------------------------------------------------- */

            detectorTypes: {

                pir: {

                    name: 'PIR',

                    primaryPurpose:
                        'Detect movement within a defined detection area.',

                    typicalApplications: [

                        'Rooms',

                        'Passageways',

                        'Offices',

                        'Warehouses',

                        'Reception areas'

                    ]

                },


                outdoorPir: {

                    name: 'Outdoor Motion Detector',

                    primaryPurpose:
                        'Detect movement in selected external areas using a compatible outdoor detection technology.',

                    considerations: [

                        'Environmental conditions',

                        'Detection range',

                        'Mounting height',

                        'Vegetation',

                        'Animals',

                        'Weather',

                        'False-alarm management'

                    ]

                },


                magneticContact: {

                    name: 'Magnetic Contact',

                    primaryPurpose:
                        'Detect opening of doors, windows or other protected openings.',

                    typicalApplications: [

                        'Entrance doors',

                        'Windows',

                        'Garage doors',

                        'Security gates'

                    ]

                },


                glassBreak: {

                    name: 'Glass-Break Detector',

                    primaryPurpose:
                        'Detect characteristics associated with breaking glass where supported.',

                    considerations: [

                        'Detector technology',

                        'Room acoustics',

                        'Glass type',

                        'Mounting position',

                        'Manufacturer specifications'

                    ]

                },


                smoke: {

                    name: 'Smoke Detector',

                    primaryPurpose:
                        'Detect smoke or fire-related conditions using compatible detection equipment.',

                    importantRule:
                        'Fire detection requirements should be treated separately from ordinary intrusion detection and designed according to the applicable requirements.'

                }

            },


            /* -----------------------------------------------------
               ARMING MODES
            ----------------------------------------------------- */

            armingModes: {

                away: {

                    name: 'Away Arm',

                    description:
                        'Used when occupants leave the protected property and the designated zones are armed according to the system configuration.'

                },


                stay: {

                    name: 'Stay / Home Arm',

                    description:
                        'Allows selected zones to remain inactive while other configured zones remain armed, depending on the alarm system configuration.'

                },


                night: {

                    name: 'Night Mode',

                    description:
                        'A configured partial-arm mode intended for nighttime use on compatible alarm systems.'

                },


                disarmed: {

                    name: 'Disarmed',

                    description:
                        'The system is not actively armed for the selected intrusion zones, although certain 24-hour or special zones may remain active depending on configuration.'

                }

            },


            /* -----------------------------------------------------
               ALARM COMMUNICATION
            ----------------------------------------------------- */

            communication: {

                methods: [

                    'Wi-Fi where supported',

                    'Ethernet / IP',

                    'Cellular communication',

                    'SMS where supported',

                    'App notifications',

                    'Monitoring-centre communication where supported'

                ],

                salesQuestions: [

                    'Do you want notifications on your phone?',

                    'Do you need communication during an internet outage?',

                    'Do you require monitoring-centre connectivity?',

                    'Is there reliable cellular coverage at the property?'

                ],

                importantRule:
                    'Never promise communication availability without considering the actual communication technology, network coverage and service requirements.'

            },


            /* -----------------------------------------------------
               MOBILE APP
            ----------------------------------------------------- */

            mobileControl: {

                possibleFunctions: [

                    'Remote arming',

                    'Remote disarming',

                    'Alarm notifications',

                    'System status',

                    'Event history',

                    'Automation control on supported systems',

                    'CCTV integration on compatible platforms'

                ],

                salesQuestion:
                    'Would you like to control or monitor the alarm from your phone?'

            },


            /* -----------------------------------------------------
               FALSE ALARMS
            ----------------------------------------------------- */

            falseAlarmFactors: [

                'Incorrect detector positioning',

                'Poor installation',

                'Loose connections',

                'Low batteries',

                'Environmental movement',

                'Animals',

                'Temperature changes',

                'Poor detector selection',

                'Incorrect configuration',

                'User error',

                'Communication or power problems'

            ],

            falseAlarmRule:
                'Do not immediately assume a false alarm means the alarm panel is defective. The detector, environment, installation and configuration should also be investigated.'


            /* -----------------------------------------------------
               ALARM FAULTS
            ----------------------------------------------------- */

            ,
            commonFaults: {

                alarmNotArming: [

                    'Open zone',

                    'Fault condition',

                    'Low battery',

                    'Communication fault',

                    'Incorrect user operation',

                    'System configuration issue'

                ],


                falseAlarm: [

                    'Detector activation',

                    'Environmental movement',

                    'Pet activity',

                    'Incorrect detector positioning',

                    'Low battery',

                    'Wiring issue',

                    'Configuration problem'

                ],


                keypadProblem: [

                    'Power issue',

                    'Communication problem',

                    'Keypad fault',

                    'System fault',

                    'Wiring problem'

                ],


                batteryFault: [

                    'Old battery',

                    'Low battery voltage',

                    'Charging problem',

                    'Power interruption',

                    'Excessive system load'

                ],


                communicationFailure: [

                    'Internet outage',

                    'Cellular signal problem',

                    'SIM or service issue',

                    'Network configuration',

                    'Communication hardware fault',

                    'Service interruption'

                ]

            },


            /* -----------------------------------------------------
               RESIDENTIAL ALARM SCENARIO
            ----------------------------------------------------- */

            residentialScenario: {

                description:
                    'Customer wants intrusion protection for a home.',

                askFirst: [

                    'How many bedrooms and living areas need protection?',

                    'How many external doors are there?',

                    'How many accessible windows need protection?',

                    'Do you have pets?',

                    'Do you want outdoor detection?',

                    'Do you want panic buttons?',

                    'Do you want mobile notifications?',

                    'Do you need battery backup?',

                    'Do you already have an alarm system?'

                ]

            },


            /* -----------------------------------------------------
               COMMERCIAL ALARM SCENARIO
            ----------------------------------------------------- */

            commercialScenario: {

                description:
                    'Business customer requires intrusion protection.',

                askFirst: [

                    'What type of business is it?',

                    'How large is the premises?',

                    'How many entrances are there?',

                    'How many staff members require access?',

                    'Are there restricted areas?',

                    'Are there valuable stock or equipment areas?',

                    'Do you need panic buttons?',

                    'Do you need after-hours protection?',

                    'Do you require monitoring-centre connectivity?',

                    'Do you want CCTV and access-control integration?'

                ]

            },


                        /* -----------------------------------------------------
               EXISTING ALARM
            ----------------------------------------------------- */

            existingAlarm: {

                description:
                    'Customer already has an alarm system and wants an upgrade.',

                askFirst: [

                    'What alarm system is currently installed?',

                    'How old is the system?',

                    'What would you like to improve?',

                    'Are the existing sensors still working?',

                    'Do you want mobile control?',

                    'Do you want to add CCTV or other security equipment?',

                    'Are you experiencing false alarms?',

                    'Is the system currently operational?'

                ]

            },


            /* -----------------------------------------------------
               BUSINESS ALARM
            ----------------------------------------------------- */

            businessAlarm: {

                description:
                    'Commercial customer wants intrusion protection.',

                considerations: [

                    'Multiple entrances',

                    'Restricted areas',

                    'Staff access',

                    'Stock rooms',

                    'Office areas',

                    'Cash-handling areas',

                    'After-hours operation',

                    'Panic requirements',

                    'External detection',

                    'Monitoring requirements',

                    'CCTV integration',

                    'Access-control integration'

                ],

                askFirst: [

                    'What type of business is it?',

                    'How large is the premises?',

                    'How many entrances need protection?',

                    'Which areas contain valuable stock or equipment?',

                    'How many staff members use the premises?',

                    'Do you require panic buttons?',

                    'Do you require after-hours protection?',

                    'Do you need monitoring?',

                    'Do you want CCTV integration?',

                    'Do you want access-control integration?'

                ]

            },


            /* -----------------------------------------------------
               ALARM PRICING
            ----------------------------------------------------- */

            pricingGuidance: {

                principle:
                    'Alarm system pricing depends on the panel, number and type of detectors, communication technology, backup power, installation complexity and integration requirements.',

                factors: [

                    'Control panel',

                    'Number of zones',

                    'Number of detectors',

                    'Detector type',

                    'Wired or wireless installation',

                    'Keypads',

                    'Sirens',

                    'Panic buttons',

                    'Backup battery',

                    'Communication module',

                    'Installation requirements',

                    'Monitoring requirements',

                    'CCTV integration',

                    'Access-control integration'

                ],

                responseWhenAskedPrice:
                    'The price depends on the size of the property, number of protected areas, detector types and whether you need installation, mobile control or monitoring. I can help work out the correct system first.'

            },


            /* -----------------------------------------------------
               ALARM SALES QUALIFICATION
            ----------------------------------------------------- */

            qualificationQuestions: [

                'Is this for a home or business?',

                'How large is the property?',

                'How many entrances need protection?',

                'How many rooms or areas need motion detection?',

                'Do you need door and window contacts?',

                'Do you have pets?',

                'Do you need outdoor detection?',

                'Do you need panic buttons?',

                'Do you want mobile notifications?',

                'Do you need battery backup?',

                'Do you already have an alarm system?',

                'Do you want CCTV integration?',

                'Do you want access-control integration?',

                'Do you require professional monitoring?'

            ],


            /* -----------------------------------------------------
               COMMON CUSTOMER QUESTIONS
            ----------------------------------------------------- */

            commonQuestions: [

                'How much does an alarm system cost?',

                'What alarm system should I buy?',

                'Can I control my alarm from my phone?',

                'Can an alarm work without internet?',

                'Can I add more sensors later?',

                'Can I use wireless alarm sensors?',

                'What is the difference between wired and wireless alarms?',

                'Can I keep my existing alarm sensors?',

                'Why does my alarm keep going off?',

                'Why will my alarm not arm?',

                'Why is my alarm battery low?',

                'Can I connect CCTV to my alarm?',

                'Can I connect access control to my alarm?',

                'Can I have a panic button?',

                'Can an alarm system work during a power failure?'

            ],


            /* -----------------------------------------------------
               ACCURACY & SAFETY RULES
            ----------------------------------------------------- */

            safetyRules: [

                'Never advise a customer to disable a security device simply to stop false alarms.',

                'Never advise bypassing a detector without understanding the security consequences.',

                'Never guarantee wireless range without considering the actual property and environment.',

                'Never guarantee battery runtime without knowing the system load and battery specification.',

                'Never claim an alarm system makes a property completely secure.',

                'Never promise monitoring availability without confirming the applicable service.',

                'Recommend professional inspection for persistent faults or suspected wiring problems.',

                'Treat fire detection requirements separately from ordinary intrusion detection.',

                'Do not invent alarm-panel compatibility.',

                'Do not invent product specifications or current pricing.'

            ]

        },


        /* =========================================================
           19. ALARM SALES CONVERSATION ENGINE
        ========================================================= */

        alarmSalesEngine: {

            objective:
                'Convert a general alarm enquiry into a properly qualified security requirement.',


            openingQuestions: [

                'Is this for a home or business?',

                'Are you installing a new alarm system or upgrading an existing one?',

                'Which areas or entry points are you most concerned about?'

            ],


            decisionLogic: {

                newSystem:
                    'Determine property type, size, entrances, protected rooms, detector requirements, communication needs and user requirements.',

                existingSystem:
                    'Identify the existing alarm brand or model, current faults, existing sensors and desired upgrades.',

                falseAlarm:
                    'Determine which detector or zone is triggering, whether the problem is constant or intermittent and whether environmental or battery-related factors may be involved.',

                mobileControl:
                    'Determine whether the customer wants notifications, remote arming, remote disarming or broader system control.',

                commercial:
                    'Qualify entrances, restricted areas, staff access, panic requirements, monitoring and integration needs.'

            },


            closingStrategy: {

                equipmentOnly:
                    'Determine the required panel, detectors and accessories before recommending equipment.',

                installation:
                    'Gather sufficient property information for a quotation or recommend a site assessment where necessary.',

                upgrade:
                    'Identify the existing system before suggesting replacement equipment.',

                highIntent:
                    'When the customer clearly wants an alarm installation, move toward collecting the information required for a quotation.'

            }

        },


        /* =========================================================
           20. ACCESS CONTROL — ADVANCED KNOWLEDGE
        ========================================================= */

        accessControlAdvanced: {

            name: 'Access Control',

            category: 'Controlled Entry',

            definition:
                'Access control manages who is permitted to enter a protected area and can use credentials, authentication devices or authorized release mechanisms to control entry.',

            simpleExplanation:
                'Instead of giving everyone unrestricted access, an access-control system allows authorized users to enter using an approved credential such as a tag, card, PIN, biometric identifier or other supported method.',


            /* -----------------------------------------------------
               ACCESS CONTROL TYPES
            ----------------------------------------------------- */

            accessMethods: {

                keypad: {

                    name: 'PIN / Keypad Access',

                    description:
                        'Users enter an authorized PIN using a compatible keypad.',

                    advantages: [

                        'No physical card required',

                        'Simple user experience',

                        'Useful for selected residential and commercial applications'

                    ],

                    considerations: [

                        'PIN management',

                        'User sharing',

                        'Security of the keypad location',

                        'Audit requirements'

                    ]

                },


                rfid: {

                    name: 'RFID / Proximity Access',

                    description:
                        'Users present an authorized card, tag or credential to a compatible reader.',

                    advantages: [

                        'Fast access',

                        'Individual credentials can be assigned',

                        'Credentials can often be removed when access is no longer required'

                    ],

                    considerations: [

                        'Credential management',

                        'Reader location',

                        'Credential type',

                        'System capacity'

                    ]

                },


                biometric: {

                    name: 'Biometric Access',

                    description:
                        'Uses a biometric characteristic such as a fingerprint or facial recognition capability on compatible equipment.',

                    advantages: [

                        'Convenient authentication',

                        'Can reduce reliance on physical credentials',

                        'Useful for controlled staff access'

                    ],

                    considerations: [

                        'Device capability',

                        'Environmental conditions',

                        'User enrolment',

                        'Privacy considerations',

                        'System compatibility'

                    ]

                },


                mobile: {

                    name: 'Mobile Access',

                    description:
                        'Allows supported mobile devices to be used as an access credential or control interface.',

                    considerations: [

                        'Compatible application',

                        'Connectivity',

                        'Phone compatibility',

                        'User permissions',

                        'System platform'

                    ]

                },


                intercom: {

                    name: 'Intercom Access',

                    description:
                        'Allows an authorized person to communicate with a visitor before deciding whether to release the entrance or gate.',

                    possibleFeatures: [

                        'Audio communication',

                        'Video communication',

                        'Remote gate release',

                        'Mobile answering',

                        'Visitor verification'

                    ]

                }

            },


            /* -----------------------------------------------------
               ACCESS CONTROL COMPONENTS
            ----------------------------------------------------- */

            components: {

                controller: {

                    name: 'Access Controller',

                    function:
                        'Manages credentials, access permissions and compatible entry hardware.',

                    considerations: [

                        'Number of doors',

                        'Number of users',

                        'Credential type',

                        'Event logging',

                        'Network requirements',

                        'Integration capability'

                    ]

                },


                reader: {

                    name: 'Credential Reader',

                    function:
                        'Reads or receives the credential used by an authorized user.',

                    examples: [

                        'RFID reader',

                        'Keypad',

                        'Fingerprint reader',

                        'Face recognition terminal',

                        'Mobile credential reader'

                    ]

                },


                lock: {

                    name: 'Electric Lock',

                    function:
                        'Provides controlled locking or release of a compatible door or access point.',

                    types: [

                        'Magnetic lock',

                        'Electric strike',

                        'Other compatible electric locking mechanisms'

                    ],

                    importantRule:
                        'Lock selection must consider the door construction, access direction, power requirements, emergency-release requirements and applicable installation requirements.'

                },


                exitDevice: {

                    name: 'Exit Device',

                    examples: [

                        'Exit button',

                        'Request-to-exit device',

                        'Compatible exit sensor'

                    ]

                },


                powerSupply: {

                    name: 'Access Control Power Supply',

                    considerations: [

                        'Load',

                        'Voltage',

                        'Battery backup',

                        'Lock requirements',

                        'Controller requirements'

                    ]

                }

            },


            /* -----------------------------------------------------
               ACCESS CONTROL QUALIFICATION
            ----------------------------------------------------- */

            qualificationQuestions: [

                'What are you trying to control—a door, pedestrian gate, vehicle gate or multiple entrances?',

                'How many entry points require access control?',

                'How many users need access?',

                'How should users authenticate—PIN, RFID, fingerprint, face recognition or mobile?',

                'Do you need an event history showing who accessed the area?',

                'Do you need different access permissions for different users?',

                'Do you need access control integrated with a gate motor?',

                'Do you need CCTV integration?',

                'Do you require battery backup?',

                'Is there an existing access-control system?'

            ],


            /* -----------------------------------------------------
               COMMERCIAL ACCESS CONTROL
            ----------------------------------------------------- */

            commercial: {

                suitableApplications: [

                    'Office entrances',

                    'Warehouses',

                    'Factories',

                    'Staff entrances',

                    'Server rooms',

                    'Restricted storage areas',

                    'Retail premises',

                    'Multi-door facilities'

                ],

                considerations: [

                    'Number of users',

                    'Number of doors',

                    'User permissions',

                    'Time schedules',

                    'Event logging',

                    'Visitor management',

                    'Integration',

                    'Backup power'

                ]

            },


            /* -----------------------------------------------------
               ACCESS CONTROL + CCTV
            ----------------------------------------------------- */

            cctvIntegration: {

                concept:
                    'Compatible access-control and CCTV systems can work together to provide both controlled entry and visual verification of activity.',

                possibleBenefits: [

                    'Visual verification',

                    'Event correlation',

                    'Improved investigation',

                    'Centralized security management'

                ]

            },


            /* -----------------------------------------------------
               ACCESS CONTROL + ALARM
            ----------------------------------------------------- */

            alarmIntegration: {

                concept:
                    'Compatible access-control systems can be integrated with alarm systems so that access events and security events can be managed as part of a broader security architecture.',

                importantRule:
                    'Integration capabilities depend on the specific equipment and system architecture.'

            },


            /* -----------------------------------------------------
               ACCESS CONTROL PRICING
            ----------------------------------------------------- */

                        pricingGuidance: {

                principle:
                    'Access-control pricing depends on the number of doors, credential technology, controller capacity, locking hardware, power requirements, software and installation complexity.',

                factors: [

                    'Number of doors',

                    'Number of users',

                    'Credential type',

                    'Reader type',

                    'Controller',

                    'Locking hardware',

                    'Exit devices',

                    'Power supply',

                    'Battery backup',

                    'Software',

                    'Networking',

                    'Installation',

                    'Integration with CCTV',

                    'Integration with alarm systems',

                    'Integration with gate automation'

                ],

                responseWhenAskedPrice:
                    'The cost depends mainly on how many doors you want to control, how users will authenticate and what locking and management equipment is required.',

                importantRule:
                    'Never provide a fixed access-control price without knowing the number of controlled entry points and the required hardware.'


            },


            /* -----------------------------------------------------
               COMMON ACCESS CONTROL QUESTIONS
            ----------------------------------------------------- */

            commonQuestions: [

                'How much does access control cost?',

                'Can I use a fingerprint reader?',

                'Can I use a keypad?',

                'Can I use RFID cards?',

                'Can I control access from my phone?',

                'Can access control work with a gate motor?',

                'Can access control work with CCTV?',

                'Can access control work with an alarm?',

                'Can I control multiple doors?',

                'Can I see who entered?',

                'Can I remove a user when they leave the company?',

                'Can I give different employees different access permissions?',

                'Can I restrict access by time?',

                'Can I have different permissions for different employees?',

                'Can I use access control on a pedestrian gate?',

                'Can access control work during a power failure?'

            ],


            /* -----------------------------------------------------
               ACCESS CONTROL SCENARIOS
            ----------------------------------------------------- */

            scenarios: {

                singleDoor: {

                    description:
                        'Customer wants to control access through one pedestrian door.',

                    askFirst: [

                        'What type of door is it?',

                        'How many people need access?',

                        'How should users authenticate?',

                        'Do you need an event history?',

                        'Do you require battery backup?'

                    ]

                },


                multipleDoors: {

                    description:
                        'Customer wants to control several doors within a business or facility.',

                    askFirst: [

                        'How many doors need access control?',

                        'How many users require access?',

                        'Do different users need different permissions?',

                        'Do you need time-based access?',

                        'Do you need centralized management?',

                        'Do you need event reporting?',

                        'Do you want CCTV integration?'

                    ]

                },


                gateAccess: {

                    description:
                        'Customer wants controlled access through a vehicle or pedestrian gate.',

                    askFirst: [

                        'Is the gate sliding or swinging?',

                        'Is a gate motor already installed?',

                        'How should users gain access?',

                        'How many users or vehicles require access?',

                        'Do you need an intercom?',

                        'Do you need CCTV verification?',

                        'Do you require remote access?',

                        'Do you require battery backup?'

                    ]

                },


                employeeAccess: {

                    description:
                        'Business wants to manage employee access.',

                    askFirst: [

                        'How many employees need access?',

                        'Do all employees require the same access permissions?',

                        'Do access permissions need to change according to working hours?',

                        'Do you need an access history?',

                        'Do you need to remove users when employees leave?',

                        'Do you need multiple doors controlled from one system?'

                    ]

                }

            },


            /* -----------------------------------------------------
               ACCESS CREDENTIAL MANAGEMENT
            ----------------------------------------------------- */

            credentialManagement: {

                principle:
                    'Access credentials should be assigned and managed according to the requirements of the customer and the capabilities of the selected system.',

                commonCredentialTypes: [

                    'PIN',

                    'RFID card',

                    'RFID tag',

                    'Fingerprint',

                    'Facial credential',

                    'Mobile credential',

                    'Remote control where supported'

                ],

                managementQuestions: [

                    'How many credentials are required?',

                    'Do different users require different permissions?',

                    'Do credentials need to be disabled remotely?',

                    'Do you require an access history?',

                    'Do you need temporary access for visitors or contractors?'

                ]

            },


            /* -----------------------------------------------------
               TIME-BASED ACCESS
            ----------------------------------------------------- */

            schedules: {

                definition:
                    'Some access-control systems can restrict user access according to configured schedules.',

                examples: [

                    'Staff access during working hours',

                    'Management access outside normal hours',

                    'Restricted weekend access',

                    'Temporary contractor access',

                    'Scheduled visitor access'

                ],

                salesQuestion:
                    'Do you want different users to have access at different times?'

            },


            /* -----------------------------------------------------
               EVENT LOGGING
            ----------------------------------------------------- */

            eventLogging: {

                definition:
                    'Compatible access-control systems can record access events for later review.',

                possibleInformation: [

                    'User identity',

                    'Credential used',

                    'Door or entry point',

                    'Date',

                    'Time',

                    'Access granted',

                    'Access denied'

                ],

                importantRule:
                    'The exact event information available depends on the selected access-control system.'

            },


            /* -----------------------------------------------------
               VISITOR ACCESS
            ----------------------------------------------------- */

            visitorManagement: {

                possibleMethods: [

                    'Intercom',

                    'Temporary PIN',

                    'Temporary RFID credential',

                    'Reception-controlled access',

                    'Mobile visitor access where supported'

                ],

                salesQuestions: [

                    'Do you regularly have visitors?',

                    'Do visitors need temporary access?',

                    'Do you need to know when visitors enter and leave?',

                    'Do you want visitors verified through an intercom or video system?'

                ]

            },


            /* -----------------------------------------------------
               ACCESS CONTROL TROUBLESHOOTING
            ----------------------------------------------------- */

            troubleshooting: {

                credentialNotWorking: [

                    'Credential not enrolled',

                    'Credential disabled',

                    'Incorrect credential type',

                    'Reader fault',

                    'Controller communication problem',

                    'Power problem',

                    'Access permission issue'

                ],


                doorNotReleasing: [

                    'Lock power problem',

                    'Controller problem',

                    'Incorrect configuration',

                    'Lock fault',

                    'Exit device problem',

                    'Mechanical door issue',

                    'Wiring problem'

                ],


                intermittentAccess: [

                    'Power instability',

                    'Loose connection',

                    'Network communication issue',

                    'Reader problem',

                    'Credential problem',

                    'Controller issue',

                    'Environmental interference'

                ]

            },


            /* -----------------------------------------------------
               ACCESS CONTROL SALES RULES
            ----------------------------------------------------- */

            salesRules: [

                'Start with the entry point and customer objective.',

                'Determine the number of users before recommending a system.',

                'Determine the required credential type.',

                'Determine whether event logging is required.',

                'Determine whether users require different permissions.',

                'Determine whether time schedules are required.',

                'Determine whether the system must integrate with a gate motor.',

                'Determine whether CCTV integration is required.',

                'Determine whether battery backup is required.',

                'Do not recommend equipment based only on price.'

            ],


            /* -----------------------------------------------------
               ACCESS CONTROL SAFETY RULES
            ----------------------------------------------------- */

            safetyRules: [

                'Do not recommend locking hardware without considering the door and emergency-release requirements.',

                'Do not claim a particular reader will work with an existing controller without checking compatibility.',

                'Do not promise biometric performance without considering the actual equipment and environment.',

                'Do not invent user capacity.',

                'Do not invent current product pricing.',

                'Recommend professional installation for commercial or complex access-control systems.',

                'Do not advise bypassing emergency or safety-release mechanisms.',

                'Do not advise disabling access-control safety functions simply to solve a fault.'

            ]

        },


        /* =========================================================
           21. ACCESS CONTROL SALES CONVERSATION ENGINE
        ========================================================= */

        accessControlSalesEngine: {

            objective:
                'Qualify the customer before recommending access-control equipment.',

            openingQuestions: [

                'What entrance are you trying to control?',

                'How many people need access?',

                'How would you like users to gain access?',

                'Do you need a record of who entered and when?'

            ],


            decisionLogic: {

                residential:
                    'Focus on simple, reliable access methods such as keypad, RFID, biometric or mobile access depending on the customer requirement.',

                commercial:
                    'Focus on user management, permissions, event logging, multiple doors and integration.',

                gate:
                    'Determine gate type, existing automation and preferred access method before recommending equipment.',

                upgrade:
                    'Identify the existing controller, readers and locks before suggesting replacement equipment.',

                employeeManagement:
                    'Prioritize user permissions, schedules, credential management and event history.',

                visitorManagement:
                    'Prioritize intercom, temporary credentials, visitor verification and controlled release.'

            },


            closingStrategy: {

                equipmentOnly:
                    'Determine the required controller, readers, locks and accessories before recommending equipment.',

                installation:
                    'Gather sufficient property information for a quotation or recommend a site assessment where necessary.',

                upgrade:
                    'Identify the existing system before suggesting replacement equipment.',

                multipleDoors:
                    'Determine the number of doors and users before selecting controller capacity.',

                highIntent:
                    'When the customer clearly wants access control installed, move toward collecting the information required for a quotation.'

            }

        },


        /* =========================================================
           22. INTERCOM SYSTEMS — ADVANCED KNOWLEDGE
        ========================================================= */

        intercomAdvanced: {

            name: 'Intercom Systems',

            category: 'Visitor Communication & Access',

            definition:
                'An intercom allows occupants, reception staff or security personnel to communicate with visitors before granting access where compatible equipment is installed.',

            simpleExplanation:
                'A visitor can contact the person inside the property, who can communicate with them and, on suitable systems, release a gate or door remotely.',


            /* -----------------------------------------------------
               INTERCOM TYPES
            ----------------------------------------------------- */

            types: {

                audio: {

                    name: 'Audio Intercom',

                    description:
                        'Provides voice communication between the visitor station and the internal station or authorized user.',

                    suitableFor: [

                        'Residential entrances',

                        'Pedestrian gates',

                        'Vehicle gates',

                        'Small businesses'

                    ]

                },


                video: {

                    name: 'Video Intercom',

                    description:
                        'Adds video communication so the occupant can visually verify the visitor on compatible equipment.',

                    advantages: [

                        'Visual visitor verification',

                        'Improved situational awareness',

                        'Possible integration with access control',

                        'Possible mobile viewing on supported systems'

                    ]

                },


                ip: {

                    name: 'IP Intercom',

                    description:
                        'Uses network infrastructure to communicate between compatible intercom devices.',

                    considerations: [

                        'Network infrastructure',

                        'Power requirements',

                        'PoE where supported',

                        'Network security',

                        'Internet connectivity for remote functions where required'

                    ]

                },


                wireless: {

                    name: 'Wireless Intercom',

                    description:
                        'Uses wireless communication between compatible intercom devices.',

                    considerations: [

                        'Wireless range',

                        'Signal strength',

                        'Power',

                        'Environmental conditions',

                        'Device compatibility'

                    ]

                }

            },


            /* -----------------------------------------------------
               INTERCOM COMPONENTS
            ----------------------------------------------------- */

            components: {

                outdoorStation: {

                    name: 'Outdoor Station',

                    function:
                        'Provides the visitor-facing communication interface and may include a camera, microphone, speaker, call button or access reader depending on the model.'

                },


                indoorStation: {

                    name: 'Indoor Station',

                    function:
                        'Allows the occupant or staff member to answer and communicate with the visitor and may provide door or gate release functions.'

                },


                mobileApplication: {

                    name: 'Mobile Intercom Application',

                    function:
                        'Compatible systems may allow calls or visitor notifications to be received through a mobile application.'

                },


                doorRelease: {

                    name: 'Door / Gate Release',

                    function:
                        'Allows an authorized person to release a compatible door or gate after communicating with the visitor.'

                }

            },


            /* -----------------------------------------------------
               INTERCOM SALES QUALIFICATION
            ----------------------------------------------------- */

            qualificationQuestions: [

                'Is the intercom for a home or business?',

                'Is it for a pedestrian door, pedestrian gate or vehicle gate?',

                'Do you need audio or video?',

                'How far is the entrance from the building?',

                'How many users need to answer the intercom?',

                'Do you want to answer calls from your phone?',

                'Do you want remote gate or door release?',

                'Do you need access-control integration?',

                'Do you need CCTV integration?',

                'Is there existing intercom equipment?'

            ],


                        /* -----------------------------------------------------
               INTERCOM SCENARIOS
            ----------------------------------------------------- */

            scenarios: {

                residential: {

                    description:
                        'Homeowner wants to identify and communicate with visitors before allowing access.',

                    askFirst: [

                        'Is the entrance a pedestrian gate or vehicle gate?',

                        'Do you need audio or video?',

                        'How far is the entrance from the house?',

                        'Do you want to answer from inside the house?',

                        'Do you want to answer from your mobile phone?',

                        'Do you want remote gate release?',

                        'Do you already have a gate motor installed?'

                    ]

                },


                commercial: {

                    description:
                        'Business requires controlled visitor communication at one or more entrances.',

                    askFirst: [

                        'How many entrances require intercoms?',

                        'Who needs to answer visitor calls?',

                        'How many staff members need access?',

                        'Do you require video verification?',

                        'Do you require access control?',

                        'Do you need visitor records?',

                        'Do you require CCTV integration?',

                        'Do you need mobile answering?'

                    ]

                },


                estate: {

                    description:
                        'Residential estate or complex requires visitor communication and controlled entrance management.',

                    askFirst: [

                        'Is this for a main entrance or individual units?',

                        'How many residents or users require access?',

                        'How many entrance points are involved?',

                        'Do visitors need to be verified before access is granted?',

                        'Do residents need mobile access?',

                        'Is access control already installed?',

                        'Is CCTV already installed?',

                        'Do you require centralized management?'

                    ]

                },


                pedestrianGate: {

                    description:
                        'Customer wants communication and controlled release at a pedestrian entrance.',

                    askFirst: [

                        'Is the pedestrian gate currently locked?',

                        'What type of lock is installed?',

                        'Do you need video verification?',

                        'How far is the gate from the building?',

                        'Do you want remote release?',

                        'Do you already have access control?'

                    ]

                },


                vehicleGate: {

                    description:
                        'Customer wants visitors to communicate with the occupant before a vehicle gate is opened.',

                    askFirst: [

                        'Is the gate sliding or swing type?',

                        'Is a gate motor already installed?',

                        'What gate motor is currently installed?',

                        'Do you need video verification?',

                        'How far is the gate from the house or office?',

                        'Do you want remote opening from a phone?',

                        'Do you require access control as well?'

                    ]

                }

            },


            /* -----------------------------------------------------
               INTERCOM PRICING
            ----------------------------------------------------- */

            pricingGuidance: {

                principle:
                    'Intercom pricing depends on the system type, number of stations, video capability, cable or network requirements, gate or door integration and installation complexity.',

                factors: [

                    'Audio or video',

                    'Number of outdoor stations',

                    'Number of indoor stations',

                    'Number of users',

                    'Cable distance',

                    'Network infrastructure',

                    'PoE requirements',

                    'Power supply',

                    'Backup power',

                    'Gate motor integration',

                    'Door lock integration',

                    'Access-control integration',

                    'Mobile functionality',

                    'Installation complexity'

                ],

                responseWhenAskedPrice:
                    'The price depends on whether you need audio or video, how many entrances are involved, the distance between the entrance and building, and whether you want gate or door release and mobile functionality.',

                importantRule:
                    'Never provide a fixed intercom installation price without understanding the entrance type, distance and required functionality.'

            },


            /* -----------------------------------------------------
               INTERCOM COMMON QUESTIONS
            ----------------------------------------------------- */

            commonQuestions: [

                'How much does an intercom cost?',

                'Can I see visitors on my phone?',

                'Can an intercom open my gate?',

                'Can I connect an intercom to my gate motor?',

                'Can I use an intercom with access control?',

                'Can I install an intercom at a pedestrian gate?',

                'Can I use video intercom?',

                'Can multiple people answer the intercom?',

                'Can an intercom work without internet?',

                'Can I upgrade my existing intercom?',

                'Can I connect an intercom to CCTV?',

                'Can I use an IP intercom?',

                'Can an intercom work over Wi-Fi?',

                'Can visitors call my phone from the gate?'

            ],


            /* -----------------------------------------------------
               INTERCOM TROUBLESHOOTING
            ----------------------------------------------------- */

            troubleshooting: {

                noAudio: [

                    'Power problem',

                    'Wiring problem',

                    'Network communication problem',

                    'Microphone fault',

                    'Speaker fault',

                    'Incorrect configuration'

                ],


                noVideo: [

                    'Camera power problem',

                    'Network communication problem',

                    'Cable fault',

                    'Camera fault',

                    'Display problem',

                    'Incorrect configuration',

                    'Insufficient network bandwidth where applicable'

                ],


                gateWillNotOpen: [

                    'Gate motor problem',

                    'Intercom relay problem',

                    'Incorrect wiring',

                    'Access-control issue',

                    'Power supply problem',

                    'Gate motor configuration problem',

                    'Mechanical gate problem'

                ],


                intermittentCommunication: [

                    'Loose connection',

                    'Network instability',

                    'Wireless signal problem',

                    'Power instability',

                    'Cable fault',

                    'Environmental interference'

                ]

            },


            /* -----------------------------------------------------
               INTERCOM SALES RULES
            ----------------------------------------------------- */

            salesRules: [

                'Determine whether the customer needs audio or video.',

                'Determine whether the entrance is a pedestrian gate, vehicle gate or door.',

                'Determine the distance between the entrance and the building.',

                'Determine whether the customer wants mobile answering.',

                'Determine whether remote gate or door release is required.',

                'Determine whether an existing gate motor or lock must be integrated.',

                'Determine whether access control is required.',

                'Determine whether CCTV integration is required.',

                'Do not recommend equipment based solely on price.',

                'Do not claim compatibility without confirming the equipment involved.'

            ],


            /* -----------------------------------------------------
               INTERCOM SAFETY RULES
            ----------------------------------------------------- */

            safetyRules: [

                'Do not assume every intercom can operate every gate motor.',

                'Do not invent compatibility between intercom and access-control equipment.',

                'Do not guarantee wireless range without assessing the installation environment.',

                'Do not promise mobile functionality without confirming compatible hardware and services.',

                'Do not recommend bypassing gate or door safety mechanisms.',

                'Recommend professional installation for complex gate, door or network integration.'

            ]

        },


        /* =========================================================
           23. INTERCOM SALES CONVERSATION ENGINE
        ========================================================= */

        intercomSalesEngine: {

            objective:
                'Determine the visitor communication and access requirement before recommending an intercom system.',

            openingQuestions: [

                'Where do you need the intercom installed?',

                'Do you need audio or video?',

                'Do you want to answer from inside the property or from your phone?',

                'Do you want the intercom to release the gate or door?'

            ],


            decisionLogic: {

                audioOnly:
                    'Focus on reliable voice communication and suitable installation distance.',

                video:
                    'Prioritize visitor visibility, camera positioning, lighting and display or mobile requirements.',

                gateRelease:
                    'Determine the existing gate motor or lock before recommending integration.',

                mobile:
                    'Determine network and mobile application requirements before recommending the system.',

                commercial:
                    'Focus on multiple users, multiple entrances, access control and visitor management.',

                residential:
                    'Focus on ease of use, visitor verification, gate release and mobile convenience.'

            },


            closingStrategy: {

                equipmentOnly:
                    'Determine the required outdoor station, indoor station, power requirements and accessories before recommending equipment.',

                installation:
                    'Collect entrance type, distances, existing equipment and integration requirements before preparing a quotation.',

                upgrade:
                    'Identify the existing intercom equipment and determine whether replacement or expansion is practical.',

                highIntent:
                    'When the customer clearly wants an intercom installation, move toward collecting the information required for a quotation.'

            }

        },


        /* =========================================================
           24. GATE AUTOMATION — ADVANCED KNOWLEDGE
        ========================================================= */

        gateAutomationAdvanced: {

            name: 'Gate Automation',

            category: 'Automated Vehicle & Pedestrian Access',

            definition:
                'Gate automation uses a suitable motor and control system to open and close a compatible gate while providing controlled access and safety functions.',

            simpleExplanation:
                'A gate motor allows the customer to open and close a compatible gate without manually moving it. The correct motor depends on the gate type, weight, dimensions, usage and installation conditions.',


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

                        'Manual release requirements',

                        'Safety sensors',

                        'Available power'

                    ]

                },


                swing: {

                    name: 'Swing Gate',

                    operation:
                        'The gate opens by rotating around hinges or another suitable pivot arrangement.',

                    considerations: [

                        'Gate weight',

                        'Gate leaf length',

                        'Number of leaves',

                        'Hinge condition',

                        'Gate alignment',

                        'Opening angle',

                        'Wind exposure',

                        'Usage frequency',

                        'Motor mounting conditions',

                        'Safety requirements'

                    ]

                },


                pedestrian: {

                    name: 'Pedestrian Gate',

                    operation:
                        'A pedestrian entrance may use an electric lock, strike, magnetic lock or other compatible access mechanism rather than a vehicle gate motor.',

                    considerations: [

                        'Gate construction',

                        'Lock type',

                        'Access-control requirements',

                        'Intercom requirements',

                        'Exit requirements',

                        'Power availability',

                        'Emergency-release requirements'

                    ]

                }

            },


            /* -----------------------------------------------------
               GATE MOTOR SELECTION
            ----------------------------------------------------- */

            motorSelection: {

                principle:
                    'Gate motor selection should be based on the actual gate and application rather than simply choosing the most powerful or cheapest motor.',

                factors: [

                    'Gate type',

                    'Gate weight',

                    'Gate length',

                    'Gate geometry',

                    'Gate condition',

                    'Track condition',

                    'Hinge condition',

                    'Usage frequency',

                    'Residential or commercial use',

                    'Power availability',

                    'Battery backup requirements',

                    'Safety requirements',

                    'Manual release requirements'

                ],

                salesRule:
                    'Never recommend a specific motor solely from the gate weight. Gate condition, geometry, usage frequency and installation conditions must also be considered.'

            },


            /* -----------------------------------------------------
               GATE AUTOMATION QUALIFICATION
            ----------------------------------------------------- */

            qualificationQuestions: [

                'Is the gate sliding or swing type?',

                'What are the approximate gate dimensions?',

                'Do you know the approximate gate weight?',

                'Is the gate currently easy to open manually?',

                'Is the track or hinge system in good condition?',

                'How often is the gate used each day?',

                'Is this a residential or commercial property?',

                'Is there mains power available at the gate?',

                'Do you need battery backup?',

                'Do you want remote controls?',

                'Do you want keypad or access-control entry?',

                'Do you want an intercom?',

                'Do you want CCTV at the entrance?'

            ],


            /* -----------------------------------------------------
               GATE AUTOMATION SALES RULES
            ----------------------------------------------------- */

            salesRules: [

                'Always identify the gate type first.',

                'Determine gate condition before recommending automation.',

                'Ask about usage frequency.',

                'Determine whether mains power is available.',

                'Determine whether backup power is required.',

                'Ask whether access control or intercom integration is required.',

                'Do not recommend a motor based solely on price.',

                'Do not guarantee motor suitability without sufficient gate information.',

                'Recommend a site assessment when the installation is complex or the gate condition is uncertain.'

            ]

        },


        /* =========================================================
           25. GATE AUTOMATION SALES ENGINE
        ========================================================= */

        gateAutomationSalesEngine: {

            objective:
                'Qualify the gate and customer requirements before recommending an automation solution.',

            openingQuestions: [

                'What type of gate do you have—sliding or swing?',

                'Approximately how heavy and large is the gate?',

                'How often is the gate used each day?',

                'Is the gate currently easy to open manually?',

                'Do you already have a motor installed?'

            ],


            decisionLogic: {

                sliding:
                    'Assess gate weight, length, track condition, alignment, usage frequency and motor requirements.',

                swing:
                    'Assess gate leaf size, weight, hinges, opening geometry, wind exposure and usage frequency.',

                existingMotor:
                    'Identify the motor make and model, current fault and desired upgrade before recommending replacement equipment.',

                highUsage:
                    'Prioritize equipment appropriate for the required duty cycle rather than selecting solely on price.',

                poorGateCondition:
                    'Recommend correcting mechanical gate problems before or as part of automation installation.',

                integratedSecurity:
                    'Determine whether the customer wants remote controls, access control, intercom or CCTV                
                    

            }

        },


        /* =========================================================
           26. GATE AUTOMATION PRICING & TROUBLESHOOTING
        ========================================================= */

        gateAutomationSupport: {

            pricingGuidance: {

                principle:
                    'Gate automation pricing depends on gate type, gate size and weight, usage frequency, motor capacity, existing gate condition, accessories, backup power and installation complexity.',

                factors: [

                    'Gate type',

                    'Gate dimensions',

                    'Gate weight',

                    'Gate condition',

                    'Motor type',

                    'Usage frequency',

                    'Remote controls',

                    'Safety beams',

                    'Battery backup',

                    'Solar backup where appropriate',

                    'Intercom',

                    'Access control',

                    'CCTV',

                    'Installation requirements',

                    'Electrical requirements'

                ],

                responseWhenAskedPrice:
                    'The correct gate automation price depends on the type and condition of the gate, its size and usage frequency, and which access and safety features you require. I can help determine the correct specification first.'

            },


            /* -----------------------------------------------------
               GATE MOTOR TROUBLESHOOTING
            ----------------------------------------------------- */

            troubleshooting: {

                gateNotMoving: [

                    'No mains power',

                    'Flat or failed backup battery',

                    'Motor fault',

                    'Control-board fault',

                    'Remote-control problem',

                    'Safety beam interruption',

                    'Manual release engaged',

                    'Mechanical obstruction',

                    'Gate binding',

                    'Track problem',

                    'Hinge problem'

                ],


                gateMovesSlowly: [

                    'Mechanical resistance',

                    'Gate alignment problem',

                    'Track or hinge problem',

                    'Battery condition',

                    'Motor configuration',

                    'Excessive gate load',

                    'Motor wear'

                ],


                gateStopsBeforeClosing: [

                    'Safety beam interruption',

                    'Obstacle detection',

                    'Mechanical resistance',

                    'Incorrect travel limits',

                    'Gate alignment',

                    'Control-board issue'

                ],


                remoteNotWorking: [

                    'Flat remote battery',

                    'Remote not programmed',

                    'Receiver problem',

                    'Range issue',

                    'Radio interference',

                    'Motor power problem'

                ],


                batteryProblems: [

                    'Battery age',

                    'Incorrect charging',

                    'Power failure',

                    'Battery failure',

                    'Excessive load',

                    'Incorrect battery specification'

                ]

            },


            safetyRules: [

                'Never advise bypassing safety beams or other safety devices as a permanent solution.',

                'Do not recommend forcing a gate when the motor or mechanical system is binding.',

                'Do not claim a motor is suitable without sufficient gate information.',

                'Do not advise customers to work on mains-voltage wiring themselves.',

                'Recommend qualified technical assistance for electrical faults.',

                'Recommend mechanical inspection where gate movement is abnormal.',

                'Do not promise battery runtime without knowing the system load and battery condition.'

            ]

        },


        /* =========================================================
           27. ELECTRIC FENCING — ADVANCED KNOWLEDGE
        ========================================================= */

        electricFencingAdvanced: {

            name: 'Electric Fencing',

            category: 'Perimeter Security',

            definition:
                'An electric fence is a security or agricultural barrier that uses an energizer to deliver controlled high-voltage pulses onto insulated conductors. The system is designed to deter intrusion or contain animals depending on its intended application.',

            simpleExplanation:
                'The energizer sends short electrical pulses through the fence conductors. When the system is correctly installed, insulated and earthed, an appropriate pulse can be detected when the circuit is completed.',


            /* -----------------------------------------------------
               CORE COMPONENTS
            ----------------------------------------------------- */

            components: {

                energizer: {

                    name: 'Fence Energizer',

                    function:
                        'Generates the electrical pulses supplied to the electric fence.',

                    considerations: [

                        'Fence length',

                        'Fence load',

                        'Vegetation',

                        'Insulation quality',

                        'Number of fence sections',

                        'Required performance',

                        'Power source',

                        'Battery backup',

                        'Solar requirements',

                        'Alarm capability'

                    ]

                },


                conductors: {

                    name: 'Fence Conductors',

                    function:
                        'Carry the energizer pulse around the protected perimeter or designated fence zone.',

                    considerations: [

                        'Conductor material',

                        'Wire condition',

                        'Wire tension',

                        'Number of strands',

                        'Fence configuration',

                        'Corrosion',

                        'Mechanical damage'

                    ]

                },


                insulators: {

                    name: 'Insulators',

                    function:
                        'Electrically isolate the fence conductors from the supporting structure.',

                    commonApplications: [

                        'Wall-top electric fencing',

                        'Steel posts',

                        'Concrete structures',

                        'Wooden posts',

                        'Security fence structures'

                    ],

                    importantRule:
                        'Poor insulation can cause leakage and reduce fence performance.'

                },


                earthSystem: {

                    name: 'Earth System',

                    function:
                        'Provides the required return path for the electrical pulse in systems designed around an earth return.',

                    considerations: [

                        'Earth rods',

                        'Earth connections',

                        'Soil conditions',

                        'Earth resistance',

                        'Corrosion',

                        'Cable condition',

                        'Separation from unsuitable electrical systems'

                    ]

                },


                warningSigns: {

                    name: 'Warning Signs',

                    function:
                        'Warn people that an electric fence is present where required.',

                    importantRule:
                        'Warning signage should be installed according to the applicable requirements for the installation.'

                },


                gateConnections: {

                    name: 'Gate Connections',

                    function:
                        'Maintain electrical continuity or provide appropriate insulated transitions across gate openings.',

                    considerations: [

                        'Gate construction',

                        'Gate hardware',

                        'Underground cable',

                        'Insulation',

                        'Mechanical movement',

                        'Electrical continuity'

                    ]

                }

            },


            /* -----------------------------------------------------
               ELECTRIC FENCE TYPES
            ----------------------------------------------------- */

            fenceApplications: {

                wallTop: {

                    name: 'Wall-Top Electric Fence',

                    description:
                        'Electric-fence conductors are installed above or along a suitable wall structure to provide an additional perimeter-security layer.',

                    considerations: [

                        'Wall construction',

                        'Bracket spacing',

                        'Fence height',

                        'Conductor spacing',

                        'Insulator quality',

                        'Gate and driveway crossings',

                        'Vegetation',

                        'Existing security systems'

                    ]

                },


                standaloneSecurity: {

                    name: 'Standalone Security Fence',

                    description:
                        'Electric-fence conductors form part of a dedicated perimeter barrier.',

                    considerations: [

                        'Fence structure',

                        'Access points',

                        'Zone configuration',

                        'Energizer capacity',

                        'Earth system',

                        'Vegetation',

                        'Alarm integration'

                    ]

                },


                agricultural: {

                    name: 'Agricultural Electric Fence',

                    description:
                        'Electric fencing can be used for livestock containment or agricultural applications where the system is designed for that purpose.',

                    considerations: [

                        'Animal type',

                        'Fence length',

                        'Vegetation',

                        'Terrain',

                        'Energizer requirements',

                        'Gate crossings',

                        'Earth system',

                        'Power availability'

                    ],

                    importantRule:
                        'Do not automatically treat an agricultural fence as equivalent to a security fence. The design objective and equipment requirements can differ.'

                }

            },


            /* -----------------------------------------------------
               ELECTRIC FENCE QUALIFICATION
            ----------------------------------------------------- */

            qualificationQuestions: [

                'Is the fence for security or agricultural use?',

                'How long is the perimeter approximately?',

                'Is the fence going onto an existing wall or fence?',

                'What type of wall or fence structure is available?',

                'How many gates or access points are there?',

                'Are there trees or vegetation close to the fence?',

                'Is there an existing electric fence energizer?',

                'Is the system new or an upgrade?',

                'Are you experiencing an alarm or fault?',

                'Is mains power available?',

                'Do you require battery backup?',

                'Do you require solar backup or solar operation?',

                'Do you want integration with an alarm system?',

                'Do you require monitoring?'

            ],


            /* -----------------------------------------------------
               ELECTRIC FENCE DESIGN PRINCIPLES
            ----------------------------------------------------- */

            designPrinciples: {

                perimeter:
                    'The perimeter should be divided and designed according to the physical layout, security objective and system requirements.',

                zoning:
                    'Dividing a large perimeter into suitable zones can help identify faults and improve maintenance and troubleshooting.',

                insulation:
                    'Conductors must remain properly insulated from supporting structures to reduce unwanted electrical leakage.',

                vegetation:
                    'Vegetation contacting conductors can create leakage and reduce system performance.',

                earthing:
                    'A properly designed and maintained earth system is essential to the operation of many electric-fence systems.',

                accessPoints:
                    'Gates and other access points require appropriate electrical continuity, insulation and mechanical consideration.',

                maintenance:
                    'Regular inspection helps identify vegetation, damaged conductors, failed insulators, loose connections and other performance problems.'

            },


            /* -----------------------------------------------------
               ELECTRIC FENCE FAULT SYMPTOMS
            ----------------------------------------------------- */

            faultSymptoms: {

                lowVoltage: [

                    'Vegetation contacting conductors',

                    'Damaged insulation',

                    'Poor earth connection',

                    'Broken conductor',

                    'Loose connection',

                    'Faulty energizer',

                    'Excessive fence loading',

                    'Damaged underground cable'

                ],


                intermittentFault: [

                    'Vegetation moving in wind',

                    'Loose connection',

                    'Intermittent insulation breakdown',

                    'Moisture',

                    'Damaged cable',

                    'Gate connection problem',

                    'Mechanical movement'

                ],


                energizerAlarm: [

                    'Fence fault',

                    'Low fence voltage',

                    'Earth fault',

                    'Broken conductor',

                    'Excessive leakage',

                    'Gate connection problem',

                    'System configuration issue'

                ]

            }

        },


        /* =========================================================
           28. ELECTRIC FENCING SALES ENGINE
        ========================================================= */

        electricFencingSalesEngine: {

            objective:
                'Determine the customer perimeter-security requirement before recommending an electric-fence solution.',

            openingQuestions: [

                'Is the electric fence for security or agricultural use?',

                'Approximately how long is the perimeter?',

                'Is the installation going onto an existing wall or fence?',

                'How many gates or access points are there?',

                'Do you have an existing electric fence system?'

            ],


            decisionLogic: {

                newInstallation:
                    'Determine perimeter length, structure, access points, vegetation, energizer requirements, zoning and power requirements.',

                wallTop:
                    'Assess wall construction, mounting options, brackets, conductor layout, access points and surrounding vegetation.',

                existingFence:
                    'Identify the existing energizer, system configuration, fault symptoms and condition of conductors and insulators.',

                lowVoltage:
                    'Investigate vegetation, insulation, earth connections, conductors, gates and energizer performance before recommending replacement equipment.',

                agricultural:
                    'Determine animal type, perimeter length, terrain, vegetation and power availability before recommending equipment.',

                security:
                    'Prioritize perimeter coverage, detection, deterrence, zoning, alarm integration and maintainability.'

            },


            /* -----------------------------------------------------
               ELECTRIC FENCE PRICING
            ----------------------------------------------------- */

            pricingGuidance: {

                principle:
                    'Electric-fence pricing depends on perimeter length, fence configuration, number of conductors, mounting structure, energizer, zoning, gates, power requirements and installation complexity.',

                factors: [

                    'Perimeter length',

                    'Number of fence strands',

                    'Fence configuration',

                    'Wall or fence structure',

                    'Brackets',

                    'Insulators',

                    'Energizer',

                    'Earth system',

                    'Gate connections',

                    'Underground cable',

                    'Warning signage',

                    'Fence zoning',

                    'Alarm integration',

                    'Battery backup',

                    'Solar requirements',

                    'Vegetation clearing',

                    'Installation complexity'

                ],

                responseWhenAskedPrice:
                    'Electric-fence pricing is normally determined by the perimeter length and installation configuration. I would first need to understand the perimeter, wall or fence type, number of gates and whether this is a new installation or an upgrade.',

                importantRule:
                    'Do not automatically quote a fixed price per metre without confirming the installation requirements.'

            }

        },

                    /* =========================================================
           29. ROBOGUARD — ADVANCED KNOWLEDGE
        ========================================================= */

        roboguardAdvanced: {

            name: 'Roboguard',

            category: 'Outdoor Perimeter Detection',

            definition:
                'Roboguard is an outdoor perimeter detection solution designed to detect movement within defined protected areas using compatible wireless outdoor detectors and a receiver or control system.',

            simpleExplanation:
                'Roboguard can help detect movement outside a building before an intruder reaches the main structure. The system is particularly useful for protecting yards, driveways, gardens, approaches and other outdoor areas.',


            /* -----------------------------------------------------
               ROBOGUARD APPLICATIONS
            ----------------------------------------------------- */

            applications: {

                residential: {

                    suitableFor: [

                        'Large residential properties',

                        'Driveways',

                        'Gardens',

                        'Pool areas',

                        'Side passages',

                        'Approaches to buildings',

                        'Perimeter areas'

                    ]

                },


                commercial: {

                    suitableFor: [

                        'Warehouses',

                        'Factories',

                        'Business premises',

                        'Storage areas',

                        'Vehicle yards',

                        'Restricted outdoor areas',

                        'Commercial perimeters'

                    ]

                },


                agricultural: {

                    suitableFor: [

                        'Farm approaches',

                        'Large properties',

                        'Outbuildings',

                        'Equipment areas',

                        'Vehicle approaches',

                        'Selected perimeter applications'

                    ],

                    importantRule:
                        'Outdoor detection must be designed around the property, terrain, environmental conditions and intended detection zone.'

                }

            },


            /* -----------------------------------------------------
               ROBOGUARD DESIGN FACTORS
            ----------------------------------------------------- */

            designFactors: [

                'Property size',

                'Detection distance',

                'Detection direction',

                'Detector positioning',

                'Terrain',

                'Vegetation',

                'Driveways',

                'Paths',

                'Walls',

                'Buildings',

                'Animals',

                'Environmental conditions',

                'Wireless communication',

                'Receiver location',

                'Power requirements',

                'Integration requirements'

            ],


            /* -----------------------------------------------------
               ROBOGUARD QUALIFICATION
            ----------------------------------------------------- */

            qualificationQuestions: [

                'What area are you trying to protect?',

                'Approximately how large is the property?',

                'Where do people or vehicles normally approach the property?',

                'Do you need driveway protection?',

                'Do you have pets or animals on the property?',

                'Are there trees, bushes or other environmental obstacles?',

                'How many areas need detection?',

                'Do you already have Roboguard equipment?',

                'Do you want the detection system integrated with an alarm?',

                'Do you require remote notifications?'

            ],


            /* -----------------------------------------------------
               ROBOGUARD DETECTION CONSIDERATIONS
            ----------------------------------------------------- */

            detectionConsiderations: {

                people:
                    'The system should be positioned and configured according to the intended human movement paths.',

                vehicles:
                    'Driveways and vehicle approaches should be considered when determining detector placement and coverage.',

                animals:
                    'Pets, livestock and wildlife must be considered because outdoor detection systems can be affected by animal movement depending on the equipment and configuration.',

                vegetation:
                    'Vegetation movement can affect outdoor detection and should be considered during system design.',

                terrain:
                    'Slopes, walls, buildings and other physical features can affect detection coverage.',

                weather:
                    'Outdoor environmental conditions should be considered when selecting and positioning detection equipment.'

            },


            /* -----------------------------------------------------
               ROBOGUARD SALES RULES
            ----------------------------------------------------- */

            salesRules: [

                'Determine the area requiring protection before recommending detector quantities.',

                'Ask about pets and animals.',

                'Ask about driveways and normal movement paths.',

                'Consider terrain and vegetation.',

                'Determine whether the customer already has an alarm system.',

                'Determine whether integration is required.',

                'Do not promise exact detection coverage without confirming the equipment and installation conditions.',

                'Do not assume one detector is sufficient for an entire property.'

            ],


            /* -----------------------------------------------------
               ROBOGUARD PRICING
            ----------------------------------------------------- */

            pricingGuidance: {

                principle:
                    'Roboguard pricing depends on the number of detectors, receiver or control equipment, accessories, integration requirements and installation conditions.',

                factors: [

                    'Number of detectors',

                    'Detection areas',

                    'Receiver',

                    'Mounting equipment',

                    'Power requirements',

                    'Alarm integration',

                    'Communication requirements',

                    'Installation complexity'

                ],

                responseWhenAskedPrice:
                    'The price depends mainly on how many outdoor areas need protection and how the detectors need to be positioned. I can help determine the required coverage first.'

            }

        },


        /* =========================================================
           30. ROBOGUARD SALES CONVERSATION ENGINE
        ========================================================= */

        roboguardSalesEngine: {

            objective:
                'Determine whether outdoor movement detection is appropriate and qualify the property before recommending a Roboguard solution.',

            openingQuestions: [

                'What area of the property are you trying to protect?',

                'Do you want to detect people, vehicles or both?',

                'How large is the area?',

                'Do you have pets or animals?',

                'Do you already have an alarm system?'

            ],


            decisionLogic: {

                driveway:
                    'Determine vehicle approach direction, detector positioning and whether additional perimeter protection is required.',

                largeProperty:
                    'Break the property into practical detection zones rather than assuming one detector can cover everything.',

                pets:
                    'Consider animal movement and the suitability of the proposed detection equipment and configuration.',

                alarmIntegration:
                    'Determine the existing alarm system and available integration method before recommending equipment.',

                outdoorSecurity:
                    'Consider Roboguard as part of a layered security strategy rather than as the only security measure.'

            }

        },


        /* =========================================================
           31. CCTV — ADVANCED KNOWLEDGE
        ========================================================= */

        cctvAdvanced: {

            name: 'CCTV Surveillance',

            category: 'Video Surveillance',

            definition:
                'CCTV systems use cameras and recording equipment to provide visual monitoring and recorded evidence of activity within selected areas.',

            simpleExplanation:
                'CCTV allows a customer to see what is happening around a property and, when recording is configured, review events after they occur.',


            /* -----------------------------------------------------
               CCTV SYSTEM TYPES
            ----------------------------------------------------- */

            systemTypes: {

                analogHD: {

                    name: 'HD Analogue CCTV',

                    description:
                        'Uses compatible analogue cameras and recording equipment over suitable cabling.',

                    considerations: [

                        'Existing cabling',

                        'Camera resolution',

                        'Cable distance',

                        'DVR capability',

                        'Power requirements',

                        'Upgrade requirements'

                    ]

                },


                ip: {

                    name: 'IP CCTV',

                    description:
                        'Uses network-connected cameras and compatible network video recording equipment.',

                    considerations: [

                        'Network infrastructure',

                        'PoE',

                        'Bandwidth',

                        'Network security',

                        'Camera resolution',

                        'NVR capacity',

                        'Storage requirements'

                    ]

                },


                wireless: {

                    name: 'Wireless CCTV',

                    description:
                        'Uses wireless networking or communication for supported camera installations.',

                    considerations: [

                        'Wireless signal',

                        'Distance',

                        'Interference',

                        'Power availability',

                        'Network capacity',

                        'Environmental conditions'

                    ],

                    importantRule:
                        'Wireless CCTV should not be recommended simply because cable installation appears inconvenient. Signal reliability and power requirements must be considered.'

                }

            },


            /* -----------------------------------------------------
               CAMERA TYPES
            ----------------------------------------------------- */

            cameraTypes: {

                dome: {

                    name: 'Dome Camera',

                    typicalApplications: [

                        'Indoor areas',

                        'Commercial premises',

                        'Entrances',

                        'Corridors',

                        'General surveillance'

                    ]

                },


                turret: {

                    name: 'Turret Camera',

                    typicalApplications: [

                        'Residential properties',

                        'Commercial properties',

                        'Outdoor walls',

                        'General surveillance'

                    ]

                },


                bullet: {

                    name: 'Bullet Camera',

                    typicalApplications: [

                        'Perimeter monitoring',

                        'Driveways',

                        'Longer viewing directions',

                        'Outdoor surveillance'

                    ]

                },


                ptz: {

                    name: 'PTZ Camera',

                    typicalApplications: [

                        'Large areas',

                        'Commercial properties',

                        'Yards',

                        'Large outdoor spaces'

                    ],

                    considerations: [

                        'Operator requirements',

                        'Preset positions',

                        'Tracking capabilities',

                        'Coverage limitations'

                    ],

                    importantRule:
                        'A PTZ camera should not automatically be treated as a replacement for multiple fixed cameras because its field of view can change.'

                }


            },


            /* -----------------------------------------------------
               CCTV IMAGE REQUIREMENTS
            ----------------------------------------------------- */

            imageRequirements: {

                overview:

                    'The customer must decide whether the objective is general monitoring, identifying people, identifying vehicles or reading number plates.',

                generalMonitoring: {

                    objective:
                        'Observe activity within an area.',

                    priorities: [

                        'Coverage',

                        'Camera position',

                        'Lighting',

                        'Recording'

                    ]

                },


                identification: {

                    objective:
                        'Capture sufficient image detail to help identify a person or event.',

                    priorities: [

                        'Camera resolution',

                        'Distance',

                        'Lens selection',

                        'Lighting',

                        'Camera position',

                        'Pixel detail'

                    ]

                },


                numberPlate: {

                    objective:
                        'Capture suitable vehicle and number-plate information under appropriate conditions.',

                    priorities: [

                        'Distance',

                        'Vehicle speed',

                        'Camera angle',

                        'Lighting',

                        'Number-plate illumination',

                        'Lens selection',

                        'Image detail',

                        'Camera positioning'

                    ],

                    importantRule:
                        'Never guarantee number-plate recognition simply because a camera is advertised as high resolution.'

                }

            },


            /* -----------------------------------------------------
               CCTV SALES QUALIFICATION
            ----------------------------------------------------- */

            qualificationQuestions: [

                'What areas do you want to monitor?',

                'How many cameras are you considering?',

                'Do you need indoor, outdoor or both?',

                'Do you need to identify people or simply monitor activity?',

                'Do you need number-plate identification?',

                'How far is the camera from the area you want to monitor?',

                'Is the area well lit at night?',

                'Do you need night vision?',

                'Do you want to view cameras remotely from your phone?',

                'How long do you want recordings stored?',

                'Do you have existing CCTV equipment?',

                'Do you have existing cabling?',

                'Do you want audio?',

                'Do you require motion detection or analytics?'

            ],


            /* -----------------------------------------------------
               CCTV STORAGE
            ----------------------------------------------------- */

            storage: {

                purpose:
                    'Recorded video requires storage capacity based on camera count, resolution, frame rate, compression, recording mode and retention period.',

                factors: [

                    'Number of cameras',

                    'Resolution',

                    'Frame rate',

                    'Compression',

                    'Continuous recording',

                    'Motion recording',

                    'Event recording',

                    'Retention period',

                    'Hard-drive capacity',

                    'NVR or DVR capability'

                ],

                salesQuestions: [

                    'How many cameras will be recording?',

                    'Do you want continuous recording or motion recording?',

                    'How many days of footage do you want to keep?',

                    'Do you need high-resolution recording?'

                ],

                importantRule:
                    'Never promise a specific recording retention period without calculating the storage requirement.'

            },


            /* -----------------------------------------------------
               CCTV REMOTE VIEWING
            ----------------------------------------------------- */

            remoteViewing: {

                possibleFeatures: [

                    'Live camera viewing',

                    'Playback',

                    'Motion notifications',

                    'Remote system management where supported',

                    'User access management'

                ],

                requirements: [

                    'Compatible recorder',

                    'Network connectivity',

                    'Compatible mobile application',

                    'Correct configuration',

                    'Internet service for remote access'

                ]

            }

        },


        /* =========================================================
           32. CCTV SALES ENGINE
        ========================================================= */

        cctvSalesEngine: {

            objective:
                'Determine the customer surveillance objective before recommending cameras, recorder capacity and storage.',

            openingQuestions: [

                'What do you want the cameras to see?',

                'How many areas need monitoring?',

                'Do you need general monitoring or identification?',

                'Do you need number-plate identification?',

                'Do you want to view the cameras from your phone?'

            ],


            decisionLogic: {

                residential:
                    'Prioritize entrances, driveway, perimeter, vulnerable areas, night visibility and practical recording requirements.',

                commercial:
                    'Prioritize entrances, staff areas, stock areas, perimeter coverage, storage retention and user access.',

                driveway:
                    'Determine distance to vehicles, camera posit
