import React, { useState, useEffect } from 'react';
import './ResidentialSolarCalculator.css';

// Panel Companies Data
const PANEL_COMPANIES = {
    waaree: {
        name: 'Waaree',
        pricePerWatt: 23,
        availableWatts: [545, 560, 575]
    },
    tatapower: {
        name: 'Tata Power Solar',
        pricePerWatt: 25,
        availableWatts: [545, 560, 575]
    },
    adani: {
        name: 'Adani Solar',
        pricePerWatt: 24,
        availableWatts: [545, 560, 575]
    }
};

// Inverter Companies Data
const INVERTER_COMPANIES = {
    Growatt: {
        name: 'Growatt',
        models: [
            { capacity: 2.0, strings: 1, mppt: 'Single', phase: 'Single', price: 15200 },
            { capacity: 3.0, strings: 1, mppt: 'Single', phase: 'Single', price: 15500 },
            { capacity: 3.4, strings: 1, mppt: 'Single', phase: 'Single', price: 15500 },
            { capacity: 3.6, strings: 1, mppt: 'Single', phase: 'Single', price: 15900 },
            { capacity: 4.0, strings: 1, mppt: 'Single', phase: 'Single', price: 19800 },
            { capacity: 4.2, strings: 1, mppt: 'Single', phase: 'Single', price: 19800 },
            { capacity: 4.7, strings: 1, mppt: 'Single', phase: 'Single', price: 20800 },
            { capacity: 5.0, strings: 1, mppt: 'Single', phase: 'Single', price: 25000 },
            { capacity: 5.4, strings: 1, mppt: 'Single', phase: 'Single', price: 25000 },
            { capacity: 5.0, strings: 2, mppt: 'Dual', phase: 'Single', price: 27000 },
            { capacity: 5.4, strings: 2, mppt: 'Dual', phase: 'Single', price: 27000 },
            { capacity: 6.0, strings: 2, mppt: 'Dual', phase: 'Single', price: 28000 },
            { capacity: 4.0, strings: 1, mppt: 'Single', phase: 'Three', price: 41500 },
            { capacity: 5.0, strings: 1, mppt: 'Single', phase: 'Three', price: 42500 },
            { capacity: 6.0, strings: 1, mppt: 'Single', phase: 'Three', price: 43500 },
            { capacity: 7.0, strings: 1, mppt: 'Single', phase: 'Three', price: 44500 },
            { capacity: 8.0, strings: 1, mppt: 'Single', phase: 'Three', price: 45500 },
            { capacity: 9.0, strings: 1, mppt: 'Single', phase: 'Three', price: 46000 },
            { capacity: 10.0, strings: 1, mppt: 'Single', phase: 'Three', price: 46500 },
            { capacity: 4.0, strings: 2, mppt: 'Dual', phase: 'Three', price: 42500 },
            { capacity: 5.0, strings: 2, mppt: 'Dual', phase: 'Three', price: 43500 },
            { capacity: 6.0, strings: 2, mppt: 'Dual', phase: 'Three', price: 44500 },
            { capacity: 7.0, strings: 2, mppt: 'Dual', phase: 'Three', price: 45500 },
            { capacity: 8.0, strings: 2, mppt: 'Dual', phase: 'Three', price: 46500 },
            { capacity: 9.0, strings: 2, mppt: 'Dual', phase: 'Three', price: 47000 },
            { capacity: 10.0, strings: 2, mppt: 'Dual', phase: 'Three', price: 47500 },
            { capacity: 12.0, strings: 2, mppt: 'Dual', phase: 'Three', price: 54000 },
            { capacity: 15.0, strings: 2, mppt: 'Dual', phase: 'Three', price: 56000 },
            { capacity: 15.0, strings: 3, mppt: 'Dual', phase: 'Three', price: 58500 },
            { capacity: 18.0, strings: 3, mppt: 'Dual', phase: 'Three', price: 64000 },
            { capacity: 20.0, strings: 3, mppt: 'Dual', phase: 'Three', price: 68000 },
            { capacity: 20.0, strings: 4, mppt: 'Dual', phase: 'Three', price: 72000 },
            { capacity: 25.0, strings: 4, mppt: 'Dual', phase: 'Three', price: 81000 },
            { capacity: 30.0, strings: 4, mppt: 'Dual', phase: 'Three', price: 97000 },
            { capacity: 30.0, strings: 6, mppt: 'Dual', phase: 'Three', price: 102000 },
            { capacity: 35.0, strings: 6, mppt: 'Dual', phase: 'Three', price: 107000 },
            { capacity: 40.0, strings: 9, mppt: 'Three', phase: 'Three', price: 136000 },
            { capacity: 50.0, strings: 9, mppt: 'Three', phase: 'Three', price: 145000 },
            { capacity: 60.0, strings: 12, mppt: 'Three', phase: 'Three', price: 162000 },
            { capacity: 70.0, strings: 12, mppt: 'Three', phase: 'Three', price: 175000 },
            { capacity: 80.0, strings: 16, mppt: 'Three', phase: 'Three', price: 210000 },
            { capacity: 100.0, strings: 16, mppt: 'Three', phase: 'Three', price: 235000 },
            { capacity: 100.0, strings: 24, mppt: 'Three', phase: 'Three', price: 245000 },
            { capacity: 110.0, strings: 24, mppt: 'Three', phase: 'Three', price: 252000 },
            { capacity: 120.0, strings: 24, mppt: 'Three', phase: 'Three', price: 270000 },
            { capacity: 125.0, strings: 24, mppt: 'Three', phase: 'Three', price: 280000 },
            { capacity: 135.0, strings: 32, mppt: 'Three', phase: 'Three', price: 300000 },
            { capacity: 225.0, strings: 24, mppt: 'Three', phase: 'Three', price: 385000 },
            { capacity: 330.0, strings: 30, mppt: 'Three', phase: 'Three', price: 527000 },
            { capacity: 330.0, strings: 30, mppt: 'Three', phase: 'Three', price: 547000 }
        ]
    },
    Vsole: {
        name: 'Vsole',
        models: [
            { capacity: 2.0, strings: 1, mppt: 'Single', phase: 'Single', price: 15200 },
            { capacity: 3.0, strings: 1, mppt: 'Single', phase: 'Single', price: 15500 },
            { capacity: 3.4, strings: 1, mppt: 'Single', phase: 'Single', price: 15500 },
            { capacity: 3.6, strings: 1, mppt: 'Single', phase: 'Single', price: 15900 },
            { capacity: 4.0, strings: 1, mppt: 'Single', phase: 'Single', price: 19800 },
            { capacity: 4.2, strings: 1, mppt: 'Single', phase: 'Single', price: 19800 },
            { capacity: 4.7, strings: 1, mppt: 'Single', phase: 'Single', price: 20800 },
            { capacity: 5.0, strings: 1, mppt: 'Single', phase: 'Single', price: 25000 },
            { capacity: 5.4, strings: 1, mppt: 'Single', phase: 'Single', price: 25000 },
            { capacity: 5.0, strings: 2, mppt: 'Dual', phase: 'Single', price: 27000 },
            { capacity: 5.4, strings: 2, mppt: 'Dual', phase: 'Single', price: 27000 },
            { capacity: 6.0, strings: 2, mppt: 'Dual', phase: 'Single', price: 28000 },
            { capacity: 4.0, strings: 1, mppt: 'Single', phase: 'Three', price: 41500 },
            { capacity: 5.0, strings: 1, mppt: 'Single', phase: 'Three', price: 42500 },
            { capacity: 6.0, strings: 1, mppt: 'Single', phase: 'Three', price: 43500 },
            { capacity: 7.0, strings: 1, mppt: 'Single', phase: 'Three', price: 44500 },
            { capacity: 8.0, strings: 1, mppt: 'Single', phase: 'Three', price: 45500 },
            { capacity: 9.0, strings: 1, mppt: 'Single', phase: 'Three', price: 46000 },
            { capacity: 10.0, strings: 1, mppt: 'Single', phase: 'Three', price: 46500 },
            { capacity: 4.0, strings: 2, mppt: 'Dual', phase: 'Three', price: 42500 },
            { capacity: 5.0, strings: 2, mppt: 'Dual', phase: 'Three', price: 43500 },
            { capacity: 6.0, strings: 2, mppt: 'Dual', phase: 'Three', price: 44500 },
            { capacity: 7.0, strings: 2, mppt: 'Dual', phase: 'Three', price: 45500 },
            { capacity: 8.0, strings: 2, mppt: 'Dual', phase: 'Three', price: 46500 },
            { capacity: 9.0, strings: 2, mppt: 'Dual', phase: 'Three', price: 47000 },
            { capacity: 10.0, strings: 2, mppt: 'Dual', phase: 'Three', price: 47500 },
            { capacity: 12.0, strings: 2, mppt: 'Dual', phase: 'Three', price: 54000 },
            { capacity: 15.0, strings: 2, mppt: 'Dual', phase: 'Three', price: 56000 },
            { capacity: 15.0, strings: 3, mppt: 'Dual', phase: 'Three', price: 58500 },
            { capacity: 18.0, strings: 3, mppt: 'Dual', phase: 'Three', price: 64000 },
            { capacity: 20.0, strings: 3, mppt: 'Dual', phase: 'Three', price: 68000 },
            { capacity: 20.0, strings: 4, mppt: 'Dual', phase: 'Three', price: 72000 },
            { capacity: 25.0, strings: 4, mppt: 'Dual', phase: 'Three', price: 81000 },
            { capacity: 30.0, strings: 4, mppt: 'Dual', phase: 'Three', price: 97000 },
            { capacity: 30.0, strings: 6, mppt: 'Dual', phase: 'Three', price: 102000 },
            { capacity: 35.0, strings: 6, mppt: 'Dual', phase: 'Three', price: 107000 },
            { capacity: 40.0, strings: 9, mppt: 'Three', phase: 'Three', price: 136000 },
            { capacity: 50.0, strings: 9, mppt: 'Three', phase: 'Three', price: 145000 },
            { capacity: 60.0, strings: 12, mppt: 'Three', phase: 'Three', price: 162000 },
            { capacity: 70.0, strings: 12, mppt: 'Three', phase: 'Three', price: 175000 },
            { capacity: 80.0, strings: 16, mppt: 'Three', phase: 'Three', price: 210000 },
            { capacity: 100.0, strings: 16, mppt: 'Three', phase: 'Three', price: 235000 },
            { capacity: 100.0, strings: 24, mppt: 'Three', phase: 'Three', price: 245000 },
            { capacity: 110.0, strings: 24, mppt: 'Three', phase: 'Three', price: 252000 },
            { capacity: 120.0, strings: 24, mppt: 'Three', phase: 'Three', price: 270000 },
            { capacity: 125.0, strings: 24, mppt: 'Three', phase: 'Three', price: 280000 },
            { capacity: 135.0, strings: 32, mppt: 'Three', phase: 'Three', price: 300000 },
            { capacity: 225.0, strings: 24, mppt: 'Three', phase: 'Three', price: 385000 },
            { capacity: 330.0, strings: 30, mppt: 'Three', phase: 'Three', price: 527000 },
            { capacity: 330.0, strings: 30, mppt: 'Three', phase: 'Three', price: 547000 }
        ]
    },
    Solaryaan: {
        name: 'Solaryaan',
        models: [
            { capacity: 2.0, strings: 1, mppt: 'Single', phase: 'Single', price: 15200 },
            { capacity: 3.0, strings: 1, mppt: 'Single', phase: 'Single', price: 15500 },
            { capacity: 3.4, strings: 1, mppt: 'Single', phase: 'Single', price: 15500 },
            { capacity: 3.6, strings: 1, mppt: 'Single', phase: 'Single', price: 15900 },
            { capacity: 4.0, strings: 1, mppt: 'Single', phase: 'Single', price: 19800 },
            { capacity: 4.2, strings: 1, mppt: 'Single', phase: 'Single', price: 19800 },
            { capacity: 4.7, strings: 1, mppt: 'Single', phase: 'Single', price: 20800 },
            { capacity: 5.0, strings: 1, mppt: 'Single', phase: 'Single', price: 25000 },
            { capacity: 5.4, strings: 1, mppt: 'Single', phase: 'Single', price: 25000 },
            { capacity: 5.0, strings: 2, mppt: 'Dual', phase: 'Single', price: 27000 },
            { capacity: 5.4, strings: 2, mppt: 'Dual', phase: 'Single', price: 27000 },
            { capacity: 6.0, strings: 2, mppt: 'Dual', phase: 'Single', price: 28000 },
            { capacity: 4.0, strings: 1, mppt: 'Single', phase: 'Three', price: 41500 },
            { capacity: 5.0, strings: 1, mppt: 'Single', phase: 'Three', price: 42500 },
            { capacity: 6.0, strings: 1, mppt: 'Single', phase: 'Three', price: 43500 },
            { capacity: 7.0, strings: 1, mppt: 'Single', phase: 'Three', price: 44500 },
            { capacity: 8.0, strings: 1, mppt: 'Single', phase: 'Three', price: 45500 },
            { capacity: 9.0, strings: 1, mppt: 'Single', phase: 'Three', price: 46000 },
            { capacity: 10.0, strings: 1, mppt: 'Single', phase: 'Three', price: 46500 },
            { capacity: 4.0, strings: 2, mppt: 'Dual', phase: 'Three', price: 42500 },
            { capacity: 5.0, strings: 2, mppt: 'Dual', phase: 'Three', price: 43500 },
            { capacity: 6.0, strings: 2, mppt: 'Dual', phase: 'Three', price: 44500 },
            { capacity: 7.0, strings: 2, mppt: 'Dual', phase: 'Three', price: 45500 },
            { capacity: 8.0, strings: 2, mppt: 'Dual', phase: 'Three', price: 46500 },
            { capacity: 9.0, strings: 2, mppt: 'Dual', phase: 'Three', price: 47000 },
            { capacity: 10.0, strings: 2, mppt: 'Dual', phase: 'Three', price: 47500 },
            { capacity: 12.0, strings: 2, mppt: 'Dual', phase: 'Three', price: 54000 },
            { capacity: 15.0, strings: 2, mppt: 'Dual', phase: 'Three', price: 56000 },
            { capacity: 15.0, strings: 3, mppt: 'Dual', phase: 'Three', price: 58500 },
            { capacity: 18.0, strings: 3, mppt: 'Dual', phase: 'Three', price: 64000 },
            { capacity: 20.0, strings: 3, mppt: 'Dual', phase: 'Three', price: 68000 },
            { capacity: 20.0, strings: 4, mppt: 'Dual', phase: 'Three', price: 72000 },
            { capacity: 25.0, strings: 4, mppt: 'Dual', phase: 'Three', price: 81000 },
            { capacity: 30.0, strings: 4, mppt: 'Dual', phase: 'Three', price: 97000 },
            { capacity: 30.0, strings: 6, mppt: 'Dual', phase: 'Three', price: 102000 },
            { capacity: 35.0, strings: 6, mppt: 'Dual', phase: 'Three', price: 107000 },
            { capacity: 40.0, strings: 9, mppt: 'Three', phase: 'Three', price: 136000 },
            { capacity: 50.0, strings: 9, mppt: 'Three', phase: 'Three', price: 145000 },
            { capacity: 60.0, strings: 12, mppt: 'Three', phase: 'Three', price: 162000 },
            { capacity: 70.0, strings: 12, mppt: 'Three', phase: 'Three', price: 175000 },
            { capacity: 80.0, strings: 16, mppt: 'Three', phase: 'Three', price: 210000 },
            { capacity: 100.0, strings: 16, mppt: 'Three', phase: 'Three', price: 235000 },
            { capacity: 100.0, strings: 24, mppt: 'Three', phase: 'Three', price: 245000 },
            { capacity: 110.0, strings: 24, mppt: 'Three', phase: 'Three', price: 252000 },
            { capacity: 120.0, strings: 24, mppt: 'Three', phase: 'Three', price: 270000 },
            { capacity: 125.0, strings: 24, mppt: 'Three', phase: 'Three', price: 280000 },
            { capacity: 135.0, strings: 32, mppt: 'Three', phase: 'Three', price: 300000 },
            { capacity: 225.0, strings: 24, mppt: 'Three', phase: 'Three', price: 385000 },
            { capacity: 330.0, strings: 30, mppt: 'Three', phase: 'Three', price: 527000 },
            { capacity: 330.0, strings: 30, mppt: 'Three', phase: 'Three', price: 547000 }
        ]
    }
};

// Structure Components with accurate specifications
const STRUCTURE_COMPONENTS = {
    column: {
        size: '80x40mm',
        thickness: '2mm',
        pricePerFoot: 85,
        frontHeight: 1, // Will be calculated based on angle
        rearHeight: 1  // Will be calculated based on angle
    },
    rafter: {
        size: '60x40mm',
        thickness: '2mm',
        pricePerFoot: 75,
        spacingBetween: 5 // feet between rafters
    },
    purlin: {
        size: '40x40mm',
        thickness: '2mm',
        pricePerFoot: 65,
        spacingBetween: 4 // feet between purlins
    },
    // Additional structure components
    tieSupport: {
        price: 55,
        quantityPerPanel: 2
    },
    ssTieBar: {
        price: 75,
        quantityPerPanel: 2,
        length: 1 // foot per tie bar
    },
    lClamp: {
        price: 45,
        quantityPerColumn: 2
    },
    nutBolt: {
        price: 15,
        quantityPerJoint: 2
    }
};

// Other Components
const OTHER_COMPONENTS = {
    ssTie: {
        price: 120,
        perPanel: 2 // 2 pieces per panel
    },
    jBolt: {
        price: 45,
        perPanel: 4 // 4 pieces per panel
    },
    dcCable: {
        price: 35, // per meter
        baseLength: 15 // base 15 meters
    },
    acCable: {
        price: 85, // per meter
        baseLength: 10 // base 10 meters
    },
    dcDB: {
        price: 2500
    },
    acDB: {
        price: 3500
    },
    earthingKit: {
        price: 1800,
        quantity: 2 // 2 kits by default
    },
    meterCharges: {
        GEB: 3500,
        Torrent: 4500
    }
};

// Labor and Installation Costs
const LABOR_COSTS = {
  baseLabor: 8000, // Base labor charge
  perKW: 2000,     // Additional cost per KW
  transportation: 3000, // Transportation charges
  crane: {
    required: false, // For ground floor, usually not required
    cost: 5000      // If required for higher floors
  }
};

// Additional Components
const ADDITIONAL_COMPONENTS = {
  // Lightning Protection
  lightningArrester: {
    price: 2500,
    required: true
  },
  
  // Surge Protection
  surgeProtector: {
    price: 3200,
    required: true
  },
  
  // MC4 Connectors
  mc4Connector: {
    price: 120,
    pairsPerPanel: 1
  },
  
  // Cable Ties and Conduits
  cableTies: {
    price: 250, // per pack
    packsRequired: 1
  },
  conduit: {
    price: 45, // per meter
    baseLength: 10
  },
  
  // Earthing Components
  earthingPipe: {
    price: 850,
    quantity: 2
  },
  earthingStrip: {
    price: 85, // per meter
    baseLength: 10
  },
  
  // Documentation
  documentation: {
    price: 2500, // Drawings, certificates, etc.
  }
};

const PANEL_DIMENSIONS = {
    width: 3.7, // feet
    height: 7.5, // feet
};

const ANGLE_CALCULATIONS = {
    tiltAngle: 25, // Optimal angle for Gujarat
    tiltRadians: (25 * Math.PI) / 180,
    minFrontHeight: 1 // minimum front height in feet
};

// Add function to find appropriate inverter size
const findSuitableInverter = (totalKW, inverterCompany) => {
    // Get all available capacities
    const availableModels = INVERTER_COMPANIES[inverterCompany].models;
    
    // Find the first inverter with capacity greater than or equal to the required capacity
    const suitable = availableModels.find(model => model.capacity >= totalKW);
    
    return suitable || availableModels[availableModels.length - 1]; // Return largest if none found
};

const ResidentialSolarCalculator = () => {
    const [system, setSystem] = useState({
        panelCompany: '',
        panelWattage: 0,
        numberOfPanels: 6,
        inverterCompany: 'Vsole',
        meterType: 'GEB',
        roofType: 'flat'
    });

    const [calculations, setCalculations] = useState({
        totalCapacity: 0,
        layout: {
            panelsPerRow: 0,
            numberOfRows: 0
        },
        structure: {
            materialBreakdown: {},
            angleDetails: {
                frontHeight: 0,
                rearHeight: 0,
                horizontalDistance: 0
            }
        },
        costs: {
            panels: 0,
            inverter: 0,
            structure: 0,
            components: 0,
            additional: 0,
            labor: 0,
            subtotal: 0,
            gst: 0,
            total: 0
        }
    });

    const [installationDetails, setInstallationDetails] = useState({
        floorLevel: 'ground', // ground, first, second, higher
        roofAccess: 'easy',   // easy, moderate, difficult
        needsCrane: false,
        distanceFromBoard: 10 // meters
    });

    const [structureDetails, setStructureDetails] = useState({
        frontColumnHeight: 5, // default front column height in feet
        roofType: 'flat'
    });

    // Add error state
    const [errors, setErrors] = useState({
        panelCompany: '',
        panelWattage: '',
        numberOfPanels: '',
        inverterCompany: '',
        general: ''
    });

    // Update useEffect to suggest inverter based on system capacity
    useEffect(() => {
        const totalWatts = system.panelWattage * system.numberOfPanels;
        const totalKW = totalWatts / 1000;
        
        const suggestedInverter = findSuitableInverter(totalKW, system.inverterCompany);
        
        setCalculations(prev => ({
            ...prev,
            totalCapacity: totalKW,
            suggestedInverter: suggestedInverter
        }));
    }, [system.panelWattage, system.numberOfPanels]);

    const calculateColumnHeights = (frontHeight) => {
        // Validate minimum front height
        const validatedFrontHeight = Math.max(frontHeight, ANGLE_CALCULATIONS.minFrontHeight);
        
        // Using trigonometry to calculate rear height
        const rise = Math.sin(ANGLE_CALCULATIONS.tiltRadians) * PANEL_DIMENSIONS.height;
        const run = Math.cos(ANGLE_CALCULATIONS.tiltRadians) * PANEL_DIMENSIONS.height;
        
        return {
            frontHeight: validatedFrontHeight,
            rearHeight: validatedFrontHeight + rise,
            horizontalDistance: run
        };
    };

    const calculateStructure = (numberOfPanels) => {
        // Panel layout calculation
        const panelsPerRow = Math.ceil(Math.sqrt(numberOfPanels));
        const numberOfRows = Math.ceil(numberOfPanels / panelsPerRow);
        
        // Calculate heights based on user input front height
        const columnHeights = calculateColumnHeights(structureDetails.frontColumnHeight);
        
        // Structure dimensions with actual panel sizes
        const totalWidth = panelsPerRow * PANEL_DIMENSIONS.width;
        const totalLength = columnHeights.horizontalDistance * numberOfRows;
        
        const structure = {
            columns: {
                front: {
                    quantity: Math.ceil((numberOfRows + 1)),
                    height: columnHeights.frontHeight,
                    totalLength: 0,
                    totalCost: 0
                },
                rear: {
                    quantity: Math.ceil((numberOfRows + 1)),
                    height: columnHeights.rearHeight,
                    totalLength: 0,
                    totalCost: 0
                }
            },
            rafters: {
                quantity: Math.ceil(totalLength / STRUCTURE_COMPONENTS.rafter.spacingBetween) + 1,
                length: totalWidth + 1, // Add 1 foot for overhang
                totalLength: 0,
                totalCost: 0
            },
            purlins: {
                quantity: Math.ceil(totalWidth / STRUCTURE_COMPONENTS.purlin.spacingBetween) * numberOfRows,
                length: PANEL_DIMENSIONS.height,
                actualLength: PANEL_DIMENSIONS.height,
                totalLength: 0,
                totalCost: 0
            },
            tieSupports: {
                quantity: numberOfPanels * STRUCTURE_COMPONENTS.tieSupport.quantityPerPanel,
                totalCost: 0
            },
            ssTieBars: {
                quantity: numberOfPanels * STRUCTURE_COMPONENTS.ssTieBar.quantityPerPanel,
                totalCost: 0
            },
            lClamps: {
                quantity: 0,
                totalCost: 0
            },
            nutBolts: {
                quantity: 0,
                totalCost: 0
            }
        };

        // Calculate total lengths and costs with actual panel sizes
        structure.columns.front.totalLength = structure.columns.front.quantity * structure.columns.front.height;
        structure.columns.front.totalCost = structure.columns.front.totalLength * STRUCTURE_COMPONENTS.column.pricePerFoot;

        structure.columns.rear.totalLength = structure.columns.rear.quantity * structure.columns.rear.height;
        structure.columns.rear.totalCost = structure.columns.rear.totalLength * STRUCTURE_COMPONENTS.column.pricePerFoot;

        structure.rafters.totalLength = structure.rafters.quantity * structure.rafters.length;
        structure.rafters.totalCost = structure.rafters.totalLength * STRUCTURE_COMPONENTS.rafter.pricePerFoot;

        structure.purlins.totalLength = structure.purlins.quantity * structure.purlins.actualLength;
        structure.purlins.totalCost = structure.purlins.totalLength * STRUCTURE_COMPONENTS.purlin.pricePerFoot;

        // L-clamps calculation
        structure.lClamps.quantity = structure.columns.front.quantity * STRUCTURE_COMPONENTS.lClamp.quantityPerColumn;
        structure.lClamps.totalCost = structure.lClamps.quantity * STRUCTURE_COMPONENTS.lClamp.price;

        // Nut bolts calculation (for joints)
        structure.nutBolts.quantity = 
            (structure.columns.front.quantity * 2) + // Top and bottom of each column
            (structure.rafters.quantity * 2) + // Each end of rafter
            (structure.purlins.quantity * 2);  // Each end of purlin
        structure.nutBolts.quantity *= STRUCTURE_COMPONENTS.nutBolt.quantityPerJoint;
        structure.nutBolts.totalCost = structure.nutBolts.quantity * STRUCTURE_COMPONENTS.nutBolt.price;

        // Tie supports and SS tie bars
        structure.tieSupports.totalCost = structure.tieSupports.quantity * STRUCTURE_COMPONENTS.tieSupport.price;
        structure.ssTieBars.totalCost = structure.ssTieBars.quantity * STRUCTURE_COMPONENTS.ssTieBar.price;

        // Total structure cost
        const totalCost = 
            structure.columns.front.totalCost +
            structure.columns.rear.totalCost +
            structure.rafters.totalCost +
            structure.purlins.totalCost +
            structure.tieSupports.totalCost +
            structure.ssTieBars.totalCost +
            structure.lClamps.totalCost +
            structure.nutBolts.totalCost;

        return {
            components: structure,
            totalCost: totalCost,
            materialBreakdown: {
                frontColumns: `${structure.columns.front.quantity} pieces × ${structure.columns.front.height.toFixed(1)}' (${STRUCTURE_COMPONENTS.column.size})`,
                rearColumns: `${structure.columns.rear.quantity} pieces × ${structure.columns.rear.height.toFixed(1)}' (${STRUCTURE_COMPONENTS.column.size})`,
                rafters: `${structure.rafters.quantity} pieces × ${structure.rafters.length.toFixed(1)}' (${STRUCTURE_COMPONENTS.rafter.size})`,
                purlins: `${structure.purlins.quantity} pieces × ${structure.purlins.actualLength.toFixed(1)}' (${STRUCTURE_COMPONENTS.purlin.size})`,
                tieSupports: `${structure.tieSupports.quantity} pieces`,
                ssTieBars: `${structure.ssTieBars.quantity} pieces`,
                lClamps: `${structure.lClamps.quantity} pieces`,
                nutBolts: `${structure.nutBolts.quantity} sets`
            },
            angleDetails: {
                tiltAngle: ANGLE_CALCULATIONS.tiltAngle,
                frontHeight: columnHeights.frontHeight.toFixed(1),
                rearHeight: columnHeights.rearHeight.toFixed(1),
                horizontalDistance: columnHeights.horizontalDistance.toFixed(1)
            }
        };
    };

    // Calculate labor costs
    const calculateLaborCosts = (totalCapacity) => {
        let laborCost = LABOR_COSTS.baseLabor + (totalCapacity * LABOR_COSTS.perKW);
        
        // Add transportation
        laborCost += LABOR_COSTS.transportation;
        
        // Add crane charges if required
        if (installationDetails.needsCrane) {
            laborCost += LABOR_COSTS.crane.cost;
        }
        
        // Additional charges for higher floors
        switch(installationDetails.floorLevel) {
            case 'first':
                laborCost *= 1.1;
                break;
            case 'second':
                laborCost *= 1.2;
                break;
            case 'higher':
                laborCost *= 1.3;
                break;
            default:
                break;
        }
        
        return laborCost;
    };

    // Calculate additional components cost
    const calculateAdditionalCosts = () => {
        return {
            lightning: ADDITIONAL_COMPONENTS.lightningArrester.required ? 
                    ADDITIONAL_COMPONENTS.lightningArrester.price : 0,
            surge: ADDITIONAL_COMPONENTS.surgeProtector.required ?
                    ADDITIONAL_COMPONENTS.surgeProtector.price : 0,
            mc4: system.numberOfPanels * ADDITIONAL_COMPONENTS.mc4Connector.price * 
                ADDITIONAL_COMPONENTS.mc4Connector.pairsPerPanel,
            cableTies: ADDITIONAL_COMPONENTS.cableTies.price * 
                    ADDITIONAL_COMPONENTS.cableTies.packsRequired,
            conduit: ADDITIONAL_COMPONENTS.conduit.price * 
                    (ADDITIONAL_COMPONENTS.conduit.baseLength + installationDetails.distanceFromBoard),
            earthing: (ADDITIONAL_COMPONENTS.earthingPipe.price * 
                    ADDITIONAL_COMPONENTS.earthingPipe.quantity) +
                    (ADDITIONAL_COMPONENTS.earthingStrip.price * 
                    ADDITIONAL_COMPONENTS.earthingStrip.baseLength),
            documentation: ADDITIONAL_COMPONENTS.documentation.price
        };
    };

    // Calculate total cost
    const calculateCosts = () => {
        if (!system.panelCompany || !system.panelWattage) return;

        const structure = calculateStructure(system.numberOfPanels);
        const additionalCosts = calculateAdditionalCosts();
        const laborCosts = calculateLaborCosts(calculations.totalCapacity);
        
        // Panel Cost
        const panelCost = system.panelWattage *
            system.numberOfPanels *
            PANEL_COMPANIES[system.panelCompany].pricePerWatt;

        // Structure Cost
        const structureCost = structure.totalCost;

        // Components Cost
        const componentsCost =
            (system.numberOfPanels * OTHER_COMPONENTS.ssTie.perPanel * OTHER_COMPONENTS.ssTie.price) +
            (system.numberOfPanels * OTHER_COMPONENTS.jBolt.perPanel * OTHER_COMPONENTS.jBolt.price) +
            (OTHER_COMPONENTS.dcCable.baseLength * OTHER_COMPONENTS.dcCable.price) +
            (OTHER_COMPONENTS.acCable.baseLength * OTHER_COMPONENTS.acCable.price) +
            OTHER_COMPONENTS.dcDB.price +
            OTHER_COMPONENTS.acDB.price +
            (OTHER_COMPONENTS.earthingKit.price * OTHER_COMPONENTS.earthingKit.quantity) +
            OTHER_COMPONENTS.meterCharges[system.meterType];

        // Inverter Cost - Fix here
        const inverterCost = calculations.suggestedInverter ? calculations.suggestedInverter.price : 0;

        // Add additional costs and labor to total
        const additionalTotal = Object.values(additionalCosts).reduce((a, b) => a + b, 0);
        
        return {
            panels: panelCost,
            structure: structureCost,
            components: componentsCost,
            inverter: inverterCost,
            additional: additionalTotal,
            labor: laborCosts,
            subtotal: panelCost + structureCost + componentsCost + inverterCost + additionalTotal + laborCosts,
            gst: (panelCost + structureCost + componentsCost + inverterCost + additionalTotal) * 0.13,
            total: (panelCost + structureCost + componentsCost + inverterCost + additionalTotal) * 1.18 + laborCosts
        };
    };

    // Validation function
    const validateInputs = () => {
        const newErrors = {};
        let isValid = true;

        if (!system.panelCompany) {
            newErrors.panelCompany = 'Please select a panel company';
            isValid = false;
        }

        if (!system.panelWattage) {
            newErrors.panelWattage = 'Please select panel wattage';
            isValid = false;
        }

        if (!system.numberOfPanels || system.numberOfPanels < 1) {
            newErrors.numberOfPanels = 'Please enter a valid number of panels';
            isValid = false;
        }

        if (!system.inverterCompany) {
            newErrors.inverterCompany = 'Please select an inverter company';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    // Update handleCalculate to ensure inverter cost is included
    const handleCalculate = () => {
        if (!validateInputs()) {
            setErrors(prev => ({
                ...prev,
                general: 'Please fill in all required fields'
            }));
            return;
        }

        try {
            // Calculate panel layout
            const panelsPerRow = Math.ceil(Math.sqrt(system.numberOfPanels));
            const numberOfRows = Math.ceil(system.numberOfPanels / panelsPerRow);

            // Calculate total capacity and find suitable inverter
            const totalCapacity = (system.panelWattage * system.numberOfPanels) / 1000;
            const suggestedInverter = findSuitableInverter(totalCapacity, system.inverterCompany);

            const structure = calculateStructure(system.numberOfPanels);
            const costs = calculateCosts();

            setCalculations(prev => ({
                ...prev,
                totalCapacity,
                layout: {
                    panelsPerRow,
                    numberOfRows
                },
                structure,
                costs,
                suggestedInverter
            }));
            
            setErrors({});
        } catch (error) {
            console.error('Calculation error:', error);
            setErrors(prev => ({
                ...prev,
                general: 'An error occurred during calculation. Please check your inputs.'
            }));
        }
    };

    // Update input handlers with error clearing
    const handlePanelCompanyChange = (e) => {
        const value = e.target.value;
        setSystem(prev => ({
            ...prev,
            panelCompany: value,
            panelWattage: PANEL_COMPANIES[value]?.availableWatts[0] || 0
        }));
        setErrors(prev => ({ ...prev, panelCompany: '', general: '' }));
    };

    const handlePanelNumberChange = (e) => {
        const value = Math.max(1, parseInt(e.target.value) || 0);
        setSystem(prev => ({
            ...prev,
            numberOfPanels: value
        }));
        setErrors(prev => ({ ...prev, numberOfPanels: '', general: '' }));
    };

    const handleInverterCompanyChange = (e) => {
        const value = e.target.value;
        setSystem(prev => ({
            ...prev,
            inverterCompany: value
        }));
        setErrors(prev => ({ ...prev, inverterCompany: '', general: '' }));
    };

    return (
        <div className="solar-calculator-container">
            {errors.general && (
                <div className="error-banner">
                    {errors.general}
                </div>
            )}

            <div className="calculator-header">
                <h1>Solar Installation Calculator</h1>
                <p className="subtitle">For Residential Systems in Gujarat</p>
            </div>

            <div className="calculator-grid">
                {/* Panel Selection Section */}
                <div className="calculator-card">
                    <div className="card-header">
                        <h3>1. Panel Selection</h3>
                    </div>
                    <div className="card-content">
                        <div className="form-group">
                            <label>Panel Company</label>
                            <select 
                                className={`select-input ${errors.panelCompany ? 'error' : ''}`}
                                value={system.panelCompany}
                                onChange={handlePanelCompanyChange}
                            >
                                <option value="">Select Panel Company</option>
                                {Object.entries(PANEL_COMPANIES).map(([key, company]) => (
                                    <option key={key} value={key}>{company.name}</option>
                                ))}
                            </select>
                            {errors.panelCompany && (
                                <span className="error-message">{errors.panelCompany}</span>
                            )}
                        </div>

                        {system.panelCompany && (
                            <>
                                <div className="form-group">
                                    <label>Panel Wattage</label>
                                    <select
                                        className="select-input"
                                        value={system.panelWattage}
                                        onChange={(e) => setSystem(prev => ({
                                            ...prev,
                                            panelWattage: Number(e.target.value)
                                        }))}
                                    >
                                        {PANEL_COMPANIES[system.panelCompany].availableWatts.map(watt => (
                                            <option key={watt} value={watt}>{watt}W</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Number of Panels</label>
                                    <input
                                        type="number"
                                        className="number-input"
                                        min="1"
                                        value={system.numberOfPanels}
                                        onChange={handlePanelNumberChange}
                                    />
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Inverter Selection Section */}
                <div className="calculator-card">
                    <div className="card-header">
                        <h3>2. Inverter Selection</h3>
                    </div>
                    <div className="card-content">
                        <div className="form-group">
                            <label>Inverter Company</label>
                            <select
                                className={`select-input ${errors.inverterCompany ? 'error' : ''}`}
                                value={system.inverterCompany}
                                onChange={handleInverterCompanyChange}
                            >
                                <option value="">Select Inverter Company</option>
                                {Object.entries(INVERTER_COMPANIES).map(([key, company]) => (
                                    <option key={key} value={key}>{company.name}</option>
                                ))}
                            </select>
                            {errors.inverterCompany && (
                                <span className="error-message">{errors.inverterCompany}</span>
                            )}
                        </div>
                        {calculations.suggestedInverter && (
                            <div className="suggestion-box">
                                <h4>Recommended Inverter Specifications:</h4>
                                <p>Capacity: {calculations.suggestedInverter.capacity} kW</p>
                                <p>MPPT: {calculations.suggestedInverter.mppt}</p>
                                <p>Strings: {calculations.suggestedInverter.strings}</p>
                                <p>Phase: {calculations.suggestedInverter.phase}</p>
                                <p>Price: ₹{calculations.suggestedInverter.price}</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Structure Details Section */}
                <div className="calculator-card">
                    <div className="card-header">
                        <h3>3. Structure Details</h3>
                    </div>
                    <div className="card-content">
                        <div className="form-group">
                            <label>Front Column Height (feet)</label>
                            <div className="input-with-hint">
                                <input
                                    type="number"
                                    className="number-input"
                                    min={ANGLE_CALCULATIONS.minFrontHeight}
                                    step="0.5"
                                    value={structureDetails.frontColumnHeight}
                                    onChange={(e) => setStructureDetails(prev => ({
                                        ...prev,
                                        frontColumnHeight: Math.max(
                                            Number(e.target.value),
                                            ANGLE_CALCULATIONS.minFrontHeight
                                        )
                                    }))}
                                />
                                <small>Min: {ANGLE_CALCULATIONS.minFrontHeight} feet</small>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Roof Type</label>
                            <select
                                className="select-input"
                                value={structureDetails.roofType}
                                onChange={(e) => setStructureDetails(prev => ({
                                    ...prev,
                                    roofType: e.target.value
                                }))}
                            >
                                <option value="flat">Flat Roof</option>
                                <option value="sloped">Sloped Roof</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Installation Details */}
                <div className="calculator-card">
                    <div className="card-header">
                        <h3>4. Installation Details</h3>
                    </div>
                    <div className="card-content">
                        <div className="form-group">
                            <label>Floor Level</label>
                            <select
                                className="select-input"
                                value={installationDetails.floorLevel}
                                onChange={(e) => setInstallationDetails(prev => ({
                                    ...prev,
                                    floorLevel: e.target.value,
                                    needsCrane: e.target.value === 'higher'
                                }))}
                            >
                                <option value="0">Ground Floor</option>
                                <option value="1">1st Floor</option>
                                <option value="2">2nd Floor</option>
                                <option value="3">3rd Floor</option>
                                <option value="4">4th Floor</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div className="action-section">
                <button className="calculate-button" onClick={handleCalculate}>
                    Calculate System
                </button>
            </div>

            {calculations.costs.total > 0 && (
                <div className="results-container">
                    <div className="results-grid">
                        <div className="result-card system-details">
                            <h3>System Overview</h3>
                            <div className="detail-item">
                                <span>Total Capacity:</span>
                                <span>{calculations.totalCapacity.toFixed(2)} kW</span>
                            </div>
                            <div className="detail-item">
                                <span>Panel Configuration:</span>
                                <span>
                                    {calculations.layout.panelsPerRow} × {calculations.layout.numberOfRows}
                                    {' '}({system.numberOfPanels} total panels)
                                </span>
                            </div>
                        </div>

                        <div className="result-card structure-details">
                            <h3>Structure Details</h3>
                            <div className="detail-grid">
                                {Object.entries(calculations.structure.materialBreakdown).map(([key, value]) => (
                                    <div key={key} className="detail-item">
                                        <span>{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                                        <span>{value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="result-card cost-breakdown">
                            <h3>Cost Breakdown</h3>
                            <div className="cost-grid">
                                <div className="cost-item">
                                    <span>Panels:</span>
                                    <span>₹{calculations.costs.panels.toFixed(2)}</span>
                                </div>
                                <div className="cost-item">
                                    <span>Inverter:</span>
                                    <span>₹{calculations.costs.inverter.toFixed(2)}</span>
                                </div>
                                <div className="cost-item">
                                    <span>Structure:</span>
                                    <span>₹{calculations.costs.structure.toFixed(2)}</span>
                                </div>
                                <div className="cost-item">
                                    <span>Labor:</span>
                                    <span>₹{calculations.costs.labor.toFixed(2)}</span>
                                </div>
                                <div className="cost-item total">
                                    <span>Total Cost:</span>
                                    <span>₹{calculations.costs.total.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ResidentialSolarCalculator; 