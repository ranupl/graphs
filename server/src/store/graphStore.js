const { GraphDB } = require("../models/graphModel");

const getAllDataFromDB = async () => {
    try {
        const graphData = await GraphDB.aggregate([
            {
                $group: {
                    _id: "$pestle",
                    totalIntensity: { $sum: "$intensity" },
                    totalLikelihood: { $sum: "$likelihood" },
                    totalRelevance: { $sum: "$relevance" }
                }
            },
            {
                $sort: { totalIntensity: -1 }
            },
            {
                $project: {
                    _id: 0,
                    pestle: "$_id",
                    totalIntensity: 1,
                    totalLikelihood: 1,
                    totalRelevance: 1
                }
            },
        ]);
        return graphData;
    } catch (error) {
        console.error("Error fetching data from database:", error);
        throw error;
    }
};

const getTopFiveIntensityFromDB = async () => {
    try {
        const graphData = await GraphDB.aggregate([
            {
                $group: {
                    _id: "$country",
                    totalIntensity: { $sum: "$intensity" }
                }
            },
            {
                $sort: { totalIntensity: -1 }
            },
            {
                $project: {
                    _id: 0,
                    country: "$_id",
                    totalIntensity: 1
                }
            },
            {
                $limit: 5,
            }
        ]);
        return graphData;
    } catch (error) {
        console.error("Error fetching data from database:", error);
        throw error;
    }
};

const getTopFiveLikelihoodFromDB = async () => {
    try {
        const graphData = await GraphDB.aggregate([
            {
                $group: {
                    _id: "$country",
                    totalLikelihood: { $sum: "$likelihood" }
                }
            },
            {
                $sort: { totalLikelihood: -1 }
            },
            {
                $project: {
                    _id: 0,
                    country: "$_id",
                    totalLikelihood: 1
                }
            },
            {
                $limit: 5,
            }
        ]);
        return graphData;
    } catch (error) {
        console.error("Error fetching data from database:", error);
        throw error;
    }
};

const getTopFiveRelevanceFromDB = async () => {
    try {
        const graphData = await GraphDB.aggregate([
            {
                $group: {
                    _id: "$country",
                    totalRelevance: { $sum: "$relevance" }
                }
            },
            {
                $sort: { totalRelevance: -1 }
            },
            {
                $project: {
                    _id: 0,
                    country: "$_id",
                    totalRelevance: 1
                }
            },
            {
                $limit: 5,
            }
        ]);
        return graphData;
    } catch (error) {
        console.error("Error fetching data from database:", error);
        throw error;
    }
};

const getTopSectorFromDB = async () => {
    try {
        const graphData = await GraphDB.aggregate([
            {
                $group: {
                    _id: "$sector",
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    sector: "$_id",
                    count: 1
                }
            },
            {
                $limit: 7
            },
        ]);
        const totalSectorCount = graphData.reduce((sum, item) => sum + item.count, 0);

        const responseData = {
            sectorData: graphData,
            totalSectorCount: totalSectorCount
        };

        return responseData;
    } catch (error) {
        console.error("Error fetching data from database:", error);
        throw error;
    }
}

const getStartYearAndSectorData = async () => {
    try {
        const graphData = await GraphDB.aggregate([
            {
                $group: {
                    _id: "$start_year",
                    sector: { $addToSet: "$sector" },
                    sectorCount: { $sum: 1 } 
                }
            },
            {
                $project: {
                    _id: 0,
                    start_year: "$_id",
                    sectorCount: 1,
                    sector: 1
                }
            },
            {
                $sort: { start_year: 1 , sectorCount: 1} 
            }
        ]);
        return graphData;
    } catch (error) {
        console.error("Error fetching data from database:", error);
        throw error;
    }
};

const getEndYearAndSectorData = async () => {
    try {
        const graphData = await GraphDB.aggregate([
            {
                $group: {
                    _id: "$end_year",
                    sector: { $addToSet: "$sector" },
                    sectorCount: { $sum: 1 } 
                }
            },
            {
                $project: {
                    _id: 0,
                    end_year: "$_id",
                    sectorCount: 1,
                    sector: 1
                }
            },
            {
                $sort: { end_year: 1 , sectorCount: 1} 
            }
        ]);
        
        return graphData;
    } catch (error) {
        console.error("Error fetching data from database:", error);
        throw error;
    }
};

module.exports = {
    getAllDataFromDB,
    getTopFiveIntensityFromDB, 
    getTopFiveLikelihoodFromDB,
    getTopFiveRelevanceFromDB, 
    getTopSectorFromDB,
    getStartYearAndSectorData,
    getEndYearAndSectorData
};
