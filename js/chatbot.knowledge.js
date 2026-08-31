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

                '
