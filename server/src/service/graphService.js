const graphStore = require("../store/graphStore");

const getAllData = async () => {
    try {
        const data = await graphStore.getAllDataFromDB();
        return data;
    } catch (error) {
        console.error("Error in service:", error);
        throw error;
    }
};

const getFilterData = async () => {
    try {
        const intensityData = await graphStore.getTopFiveIntensityFromDB();
        const likelihoodData = await graphStore.getTopFiveLikelihoodFromDB();
        const relevanceData = await graphStore.getTopFiveRelevanceFromDB();
        const sectorData = await graphStore.getTopSectorFromDB();
        const sectorByYear = await graphStore.getStartYearAndSectorData();
        const sectorByEndYear = await graphStore.getEndYearAndSectorData();
        
        return {
            intensity: intensityData,
            likelihood: likelihoodData,
            relevance: relevanceData,
            sector: sectorData,
            start_year: sectorByYear,
            end_year: sectorByEndYear,
        };
    } catch (error) {
        console.error("Error in service:", error);
        throw error;
    }
};

module.exports = {
    getFilterData, getAllData
};

