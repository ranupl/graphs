const graphService = require("../../service/graphService");

const getAllData = async (req, res) => {
    try {
        const data = await graphService.getAllData();
        res.json(data);
    } catch (error) {
        console.error("Error in controller:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const getFilterData = async (req, res) => {
    try {
        const data = await graphService.getFilterData();
        
        res.json({
            intensity: data.intensity,
            likelihood: data.likelihood,
            relevance: data.relevance,
            sectorData: data.sector.sectorData,
            totalSectorCount: data.sector.totalSectorCount,
            start_year: data.start_year,
            end_year: data.end_year,
            // sectorCount: data.sectorCount
        });
    } catch (error) {
        console.error("Error in controller:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}


module.exports = {
    getFilterData, getAllData
};
