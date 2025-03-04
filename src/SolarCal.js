import React, { useState } from 'react';

const SolarCal = () => {
    const [parameters, setParameters] = useState({
        // Solar Panels
        panelWattage: 535,
        numberOfPanels: 1,
        panelPrice: 150,
        panelBrand: '',

        // Residential Structure Components
        roofType: 'flat',
        installationType: 'normal',
        structureType: 'standard',

        // Main Structure Components
        column: {
            quantity: 0,
            length: 8, // feet
            price: 120 // per foot (2" diameter GI pipe)
        },
        perlin: {
            quantity: 0,
            length: 10, // feet
            price: 85 // per foot
        },
        rafter: {
            quantity: 0,
            length: 12, // feet
            price: 95 // per foot
        },

        // Support Components
        tie: {
            quantity: 0,
            price: 55 // per piece
        },
        tieBar: {
            quantity: 0,
            length: 6, // feet
            price: 45 // per foot
        },
        ssTieBar: { // Stainless Steel Tie Bar
            quantity: 0,
            length: 4, // feet
            price: 75 // per foot
        },

        // Electrical Components
        acdb: { // AC Distribution Box
            quantity: 1,
            price: 4500
        },
        dcdb: { // DC Distribution Box
            quantity: 1,
            price: 3800
        },
        acWire: {
            length: 30, // feet
            price: 65 // per foot (4mm² copper)
        },
        dcWire: {
            length: 50, // feet
            price: 45 // per foot (6mm² copper)
        },
        earthingWire: {
            length: 40, // feet
            price: 35 // per foot
        },

        // Mounting Hardware
        jBolts: {
            quantity: 0,
            price: 25
        },
        nutBolts: {
            quantity: 0,
            price: 15
        },
        foundation: {
            quantity: 0,
            price: 250 // per foundation point
        },

        // Protection Components
        lightningArrester: {
            quantity: 1,
            price: 2500
        },
        earthingKit: {
            quantity: 2,
            price: 1800
        },
        surgeProtector: {
            quantity: 1,
            price: 3200
        },

        // GI Pipes (Hot Dipped Galvanized)
        legSupport: {
            quantity: 0,
            length: 3, // feet (standard 3 feet length)
            price: 60  // per foot
        },

        // Aluminum Rails
        railLength: 0, // feet
        railPrice: 80, // per foot (adjusted from meter price)

        // Clamps
        endClamps: {
            quantity: 0,
            price: 35
        },
        midClamps: {
            quantity: 0,
            price: 40
        },

        // Essential Hardware
        lClamps: {
            quantity: 0,
            price: 45
        },
        zAngle: {
            quantity: 0,
            price: 85
        },

        // Roof Protection
        rubberPads: {
            quantity: 0,
            price: 20
        },

        // Electrical Components
        inverterCompany: '',
        inverterPrice: 0,
        mcbQuantity: 0,
        mcbPrice: 850,
        junctionBoxQuantity: 0,
        junctionBoxPrice: 1200,

        // Labor
        laborCostPerKW: 8000,

        // Additional Parameters
        roofArea: 0,
        electricityRate: 8,
        annualConsumption: 0,
    });

    const panelOptions = [
        { brand: 'Waaree', price: 150, efficiency: 0.21 },
        { brand: 'Tata Solar', price: 160, efficiency: 0.20 },
        { brand: 'Adani Solar', price: 155, efficiency: 0.205 },
    ];

    const inverterOptions = [
        { company: 'Growatt', price: 45000, efficiency: 0.97 },
        { company: 'SolarEdge', price: 65000, efficiency: 0.98 },
        { company: 'Sungrow', price: 55000, efficiency: 0.975 },
    ];

    // Add new state for advanced settings
    const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);
    const [advancedParams, setAdvancedParams] = useState({
        sunHoursPerDay: 5.5,
        temperatureLoss: 0.15,
        otherLosses: 0.10,
        annualDegradation: 0.04,
        maintenanceCostPerYear: 2000,
        electricityRateIncrease: 0.05, // 5% annual increase
    });

    const structureTypes = {
        standard: {
            name: 'Standard Structure (2-4 kW)',
            columnPrice: 120,
            perlinPrice: 85,
            rafterPrice: 95
        },
        heavyDuty: {
            name: 'Heavy Duty Structure (5-10 kW)',
            columnPrice: 150,
            perlinPrice: 100,
            rafterPrice: 110
        }
    };

    const calculateMountingMaterials = (numberOfPanels) => {
        const panelsPerRow = Math.ceil(Math.sqrt(numberOfPanels));
        const numberOfRows = Math.ceil(numberOfPanels / panelsPerRow);

        return {
            columns: Math.floor(numberOfPanels * 0.75), // Approximately 0.75 columns per panel
            perlins: Math.ceil(numberOfRows * 2), // 2 perlins per row
            rafters: Math.floor(numberOfPanels * 0.75), // 1.5 rafters per panel in a row
            ties: Math.ceil(numberOfPanels * 0), // 2 ties per panel
            tieBars: 0, // 1 tie bar per panel
            //   tieBars: Math.ceil(numberOfPanels), // 1 tie bar per panel
            ssTieBars: Math.ceil(numberOfPanels * 0.5), // 0.5 SS tie bars per panel
            jBolts: Math.ceil(numberOfPanels * 4), // 4 J-bolts per panel
            nutBolts: Math.ceil(numberOfPanels * 8), // 8 nut-bolts per panel
            foundations: Math.ceil(numberOfPanels * 0.5), // 0.5 foundation points per panel

            // Electrical calculations
            dcWireLength: Math.ceil(numberOfPanels * 15), // 15 feet DC wire per panel
            acWireLength: 30, // Fixed 30 feet for AC connection
            earthingWireLength: 40, // Fixed 40 feet for earthing
        };
    };

    const calculateMountingStructureCost = () => {
        const materials = calculateMountingMaterials(parameters.numberOfPanels);

        const costs = {
            columns: materials.columns * parameters.column.length * parameters.column.price,
            perlins: materials.perlins * parameters.perlin.length * parameters.perlin.price,
            rafters: materials.rafters * parameters.rafter.length * parameters.rafter.price,
            ties: materials.ties * parameters.tie.price,
            tieBars: materials.tieBars * parameters.tieBar.length * parameters.tieBar.price,
            ssTieBars: materials.ssTieBars * parameters.ssTieBar.length * parameters.ssTieBar.price,
            jBolts: materials.jBolts * parameters.jBolts.price,
            nutBolts: materials.nutBolts * parameters.nutBolts.price,
            foundations: materials.foundations * parameters.foundation.price,

            // Electrical components
            acdb: parameters.acdb.quantity * parameters.acdb.price,
            dcdb: parameters.dcdb.quantity * parameters.dcdb.price,
            acWire: materials.acWireLength * parameters.acWire.price,
            dcWire: materials.dcWireLength * parameters.dcWire.price,
            earthingWire: materials.earthingWireLength * parameters.earthingWire.price,
            lightningArrester: parameters.lightningArrester.quantity * parameters.lightningArrester.price,
            earthingKit: parameters.earthingKit.quantity * parameters.earthingKit.price,
            surgeProtector: parameters.surgeProtector.quantity * parameters.surgeProtector.price
        };

        const totalCost = Object.values(costs).reduce((a, b) => a + b, 0);

        return {
            itemizedCosts: costs,
            materials: materials,
            totalCost: totalCost
        };
    };

    const calculateTotalCost = () => {
        // Basic costs calculation
        const totalPanelCost = parameters.panelWattage * parameters.numberOfPanels * parameters.panelPrice;
        const totalGIPipeCost = parameters.giPipeWeight * parameters.giPipePricePerKg;
        const totalJBoltCost = parameters.jBoltQuantity * parameters.jBoltPrice;
        const totalClampCost = parameters.clampQuantity * parameters.clampPrice;
        const totalRailCost = parameters.railLength * parameters.railPricePerMeter;
        const totalDCWireCost = parameters.dcWireLength * parameters.dcWirePrice;
        const totalACWireCost = parameters.acWireLength * parameters.acWirePrice;
        const totalMCBCost = parameters.mcbQuantity * parameters.mcbPrice;
        const totalJunctionBoxCost = parameters.junctionBoxQuantity * parameters.junctionBoxPrice;

        const systemSizeKW = (parameters.panelWattage * parameters.numberOfPanels) / 1000;
        const totalLaborCost = systemSizeKW * parameters.laborCostPerKW;

        // Tax calculations (assuming 18% GST)
        const subtotal = totalPanelCost + totalGIPipeCost + totalJBoltCost + totalClampCost +
            totalRailCost + totalDCWireCost + totalACWireCost + parameters.inverterPrice +
            totalMCBCost + totalJunctionBoxCost + totalLaborCost;
        const gst = subtotal * 0.18;
        const totalWithTax = subtotal + gst;

        return {
            panelCost: totalPanelCost,
            structureCost: totalGIPipeCost + totalJBoltCost + totalClampCost + totalRailCost,
            wireCost: totalDCWireCost + totalACWireCost,
            inverterCost: parameters.inverterPrice,
            otherComponents: totalMCBCost + totalJunctionBoxCost,
            laborCost: totalLaborCost,
            subtotal: subtotal,
            gst: gst,
            totalCost: totalWithTax
        };
    };

    const calculateROI = () => {
        const systemSizeKW = (parameters.panelWattage * parameters.numberOfPanels) / 1000;
        const selectedInverter = inverterOptions.find(inv => inv.company === parameters.inverterCompany);
        const selectedPanel = panelOptions.find(panel => panel.brand === parameters.panelBrand);

        // Calculate annual energy production
        const sunHoursPerDay = 5.5; // Average sun hours in India
        const systemEfficiency = selectedInverter?.efficiency || 0.97;
        const panelEfficiency = selectedPanel?.efficiency || 0.20;
        const temperatureLoss = 0.15; // 15% loss due to temperature
        const otherLosses = 0.10; // 10% other losses (dust, wiring, etc.)

        const dailyEnergy = systemSizeKW * sunHoursPerDay * systemEfficiency *
            panelEfficiency * (1 - temperatureLoss) * (1 - otherLosses);
        const annualEnergy = dailyEnergy * 365;

        // Calculate annual savings
        const annualSavings = annualEnergy * parameters.electricityRate;

        // Calculate payback period
        const paybackPeriod = calculateTotalCost().totalCost / annualSavings;

        // Calculate 25-year savings (assuming 2% annual degradation)
        let totalSavings = 0;
        for (let year = 1; year <= 25; year++) {
            totalSavings += annualSavings * Math.pow(0.98, year - 1);
        }

        return {
            dailyEnergy,
            annualEnergy,
            annualSavings,
            paybackPeriod,
            totalSavings,
        };
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setParameters(prev => ({
            ...prev,
            [name]: parseFloat(value) || value
        }));
    };

    const handleInverterChange = (e) => {
        const selected = inverterOptions.find(inv => inv.company === e.target.value);
        setParameters(prev => ({
            ...prev,
            inverterCompany: selected.company,
            inverterPrice: selected.price
        }));
    };

    const handlePanelBrandChange = (e) => {
        const selected = panelOptions.find(panel => panel.brand === e.target.value);
        setParameters(prev => ({
            ...prev,
            panelBrand: selected.brand,
            panelPrice: selected.price
        }));
    };

    // Add export functionality
    const exportToCSV = () => {
        const costs = calculateTotalCost();
        const roi = calculateROI();

        const data = [
            ['Solar Installation Summary'],
            ['Component', 'Cost (₹)'],
            ['Solar Panels', costs.panelCost],
            ['Mounting Structure', costs.structureCost],
            ['Wiring', costs.wireCost],
            ['Inverter', costs.inverterCost],
            ['Other Components', costs.otherComponents],
            ['Labor', costs.laborCost],
            ['GST', costs.gst],
            ['Total', costs.totalCost],
            [],
            ['Performance Metrics'],
            ['Daily Generation (kWh)', roi.dailyEnergy],
            ['Annual Generation (kWh)', roi.annualEnergy],
            ['Annual Savings (₹)', roi.annualSavings],
            ['Payback Period (Years)', roi.paybackPeriod],
            ['25-Year Savings (₹)', roi.totalSavings],
        ];

        const csvContent = data.map(row => row.join(',')).join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'solar-calculation.csv';
        a.click();
    };

    // Add function to calculate monthly savings
    const calculateMonthlySavings = () => {
        const roi = calculateROI();
        const monthlySavings = [];

        for (let year = 1; year <= 25; year++) {
            const annualSaving = roi.annualSavings *
                Math.pow(1 - advancedParams.annualDegradation, year - 1) *
                Math.pow(1 + advancedParams.electricityRateIncrease, year - 1);

            for (let month = 1; month <= 12; month++) {
                monthlySavings.push({
                    year,
                    month,
                    saving: annualSaving / 12,
                });
            }
        }

        return monthlySavings;
    };

    const costs = calculateTotalCost();
    const roi = calculateROI();

    return (
        <div className="solar-calculator">
            <h2>Solar Installation Calculator</h2>

            <div className="calculator-section">
                <h3>Solar Panels</h3>
                <div>
                    <label>Panel Brand:
                        <select name="panelBrand" value={parameters.panelBrand} onChange={handlePanelBrandChange}>
                            <option value="">Select Brand</option>
                            {panelOptions.map(panel => (
                                <option key={panel.brand} value={panel.brand}>{panel.brand}</option>
                            ))}
                        </select>
                    </label>
                    <label>Panel Wattage (W):
                        <input type="number" name="panelWattage" value={parameters.panelWattage} onChange={handleChange} />
                    </label>
                    <label>Number of Panels:
                        <input type="number" name="numberOfPanels" value={parameters.numberOfPanels} onChange={handleChange} />
                    </label>
                </div>

                <h3>Mounting Structure (Residential)</h3>

                <div className="roof-details">
                    <label>Roof Type:
                        <select
                            name="roofType"
                            value={parameters.roofType}
                            onChange={handleChange}
                        >
                            <option value="flat">Flat RCC Roof</option>
                            <option value="sloped-concrete">Sloped Concrete Roof</option>
                            <option value="metal-sheet">Metal Sheet Roof</option>
                        </select>
                    </label>

                    <label>Installation Type:
                        <select
                            name="installationType"
                            value={parameters.installationType}
                            onChange={handleChange}
                        >
                            <option value="normal">Normal</option>
                            <option value="elevated">Elevated</option>
                        </select>
                    </label>

                    <label>Structure Type:
                        <select
                            name="structureType"
                            value={parameters.structureType}
                            onChange={handleChange}
                        >
                            {Object.entries(structureTypes).map(([key, value]) => (
                                <option key={key} value={key}>{value.name}</option>
                            ))}
                        </select>
                    </label>
                </div>

                <div className="mounting-materials">
                    <h4>Required Materials (Auto-calculated)</h4>
                    {(() => {
                        const { materials } = calculateMountingStructureCost();
                        return (
                            <div className="materials-grid">
                                <div className="material-item">
                                    <span>Columns:</span>
                                    <span>{materials.columns} pieces × {parameters.column.length} ft</span>
                                </div>
                                <div className="material-item">
                                    <span>Perlins:</span>
                                    <span>{materials.perlins} pieces × {parameters.perlin.length} ft</span>
                                </div>
                                <div className="material-item">
                                    <span>Rafters:</span>
                                    <span>{materials.rafters} pieces × {parameters.rafter.length} ft</span>
                                </div>
                                <div className="material-item">
                                    <span>Ties:</span>
                                    <span>{materials.ties} pieces</span>
                                </div>
                                <div className="material-item">
                                    <span>Tie Bars:</span>
                                    <span>{materials.tieBars} pieces</span>
                                </div>
                                <div className="material-item">
                                    <span>SS Tie Bars:</span>
                                    <span>{materials.ssTieBars} pieces</span>
                                </div>
                                <div className="material-item">
                                    <span>DC Wire Length:</span>
                                    <span>{materials.dcWireLength} ft</span>
                                </div>
                                <div className="material-item">
                                    <span>AC Wire Length:</span>
                                    <span>{materials.acWireLength} ft</span>
                                </div>
                                <div className="material-item">
                                    <span>Earthing Wire:</span>
                                    <span>{materials.earthingWireLength} ft</span>
                                </div>
                                <div className="material-item">
                                    <span>End Clamps:</span>
                                    <span>{materials.endClamps} pieces</span>
                                </div>
                                <div className="material-item">
                                    <span>Mid Clamps:</span>
                                    <span>{materials.midClamps} pieces</span>
                                </div>
                                <div className="material-item">
                                    <span>L-Clamps:</span>
                                    <span>{materials.lClamps} pieces</span>
                                </div>
                                <div className="material-item">
                                    <span>Z-Angles:</span>
                                    <span>{materials.zAngles} pieces</span>
                                </div>
                                <div className="material-item">
                                    <span>J-Bolts:</span>
                                    <span>{materials.jBolts} pieces</span>
                                </div>
                                <div className="material-item">
                                    <span>Nut-Bolts:</span>
                                    <span>{materials.nutBolts} sets</span>
                                </div>
                                <div className="material-item">
                                    <span>Rubber Pads:</span>
                                    <span>{materials.rubberPads} pieces</span>
                                </div>
                            </div>
                        );
                    })()}
                </div>

                <div className="material-notes">
                    <h4>Material Specifications</h4>
                    <ul>
                        <li>GI Pipes: 2" diameter, 16 gauge thickness</li>
                        <li>Aluminum Rails: 40x40mm standard size</li>
                        <li>End Clamps: Compatible with {parameters.panelBrand || 'selected'} panels</li>
                        <li>Mid Clamps: Universal type, aluminum</li>
                        <li>L-Clamps: Hot-dip galvanized steel</li>
                        <li>J-Bolts: 5/16" × 3"</li>
                        <li>Rubber Pads: EPDM, 6mm thickness</li>
                    </ul>
                </div>
            </div>

            <div className="cost-breakdown">
                <h3>Cost Breakdown</h3>
                <p>Solar Panels: ₹{costs.panelCost.toFixed(2)}</p>
                <p>Mounting Structure: ₹{costs.structureCost.toFixed(2)}</p>
                <p>Wiring: ₹{costs.wireCost.toFixed(2)}</p>
                <p>Inverter: ₹{costs.inverterCost.toFixed(2)}</p>
                <p>Other Components: ₹{costs.otherComponents.toFixed(2)}</p>
                <p>Labor: ₹{costs.laborCost.toFixed(2)}</p>
                <p>Subtotal: ₹{costs.subtotal.toFixed(2)}</p>
                <p>GST (18%): ₹{costs.gst.toFixed(2)}</p>
                <h4>Total Cost: ₹{costs.totalCost.toFixed(2)}</h4>
            </div>

            <div className="performance-metrics">
                <h3>System Performance</h3>
                <p>Daily Energy Generation: {roi.dailyEnergy.toFixed(2)} kWh</p>
                <p>Annual Energy Generation: {roi.annualEnergy.toFixed(2)} kWh</p>
                <p>Annual Savings: ₹{roi.annualSavings.toFixed(2)}</p>
                <p>Payback Period: {roi.paybackPeriod.toFixed(1)} years</p>
                <p>25-Year Savings: ₹{roi.totalSavings.toFixed(2)}</p>
            </div>

            <div className="advanced-settings">
                <button
                    className="toggle-advanced"
                    onClick={() => setShowAdvancedSettings(!showAdvancedSettings)}
                >
                    {showAdvancedSettings ? 'Hide Advanced Settings' : 'Show Advanced Settings'}
                </button>

                {showAdvancedSettings && (
                    <div className="advanced-params">
                        <h3>Advanced Settings</h3>
                        <div>
                            <label>Sun Hours per Day:
                                <input
                                    type="number"
                                    step="0.1"
                                    value={advancedParams.sunHoursPerDay}
                                    onChange={(e) => setAdvancedParams(prev => ({
                                        ...prev,
                                        sunHoursPerDay: parseFloat(e.target.value)
                                    }))}
                                />
                            </label>
                            <label>Temperature Loss (%):
                                <input
                                    type="number"
                                    step="0.01"
                                    value={advancedParams.temperatureLoss * 100}
                                    onChange={(e) => setAdvancedParams(prev => ({
                                        ...prev,
                                        temperatureLoss: parseFloat(e.target.value) / 100
                                    }))}
                                />
                            </label>
                            <label>Annual Maintenance Cost (₹):
                                <input
                                    type="number"
                                    value={advancedParams.maintenanceCostPerYear}
                                    onChange={(e) => setAdvancedParams(prev => ({
                                        ...prev,
                                        maintenanceCostPerYear: parseFloat(e.target.value)
                                    }))}
                                />
                            </label>
                            <label>Electricity Rate Increase (%/year):
                                <input
                                    type="number"
                                    step="0.1"
                                    value={advancedParams.electricityRateIncrease * 100}
                                    onChange={(e) => setAdvancedParams(prev => ({
                                        ...prev,
                                        electricityRateIncrease: parseFloat(e.target.value) / 100
                                    }))}
                                />
                            </label>
                        </div>
                    </div>
                )}
            </div>

            <div className="monthly-savings">
                <h3>Monthly Savings Projection (First Year)</h3>
                <div className="savings-grid">
                    {calculateMonthlySavings()
                        .slice(0, 12)
                        .map((month, index) => (
                            <div key={index} className="month-card">
                                <h4>Month {month.month}</h4>
                                <p>₹{month.saving.toFixed(2)}</p>
                            </div>
                        ))}
                </div>
            </div>

            <div className="action-buttons">
                <button onClick={exportToCSV} className="export-button">
                    Export Calculation
                </button>
            </div>
        </div>
    );
};

export default SolarCal; 