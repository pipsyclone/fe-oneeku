const ENV = () => {
    const productionURL     = "https://oneekuserver.vercel.app";
    const developmentURL    = "http://localhost:5000";
    const baseURL_API       = productionURL;

    return {
        baseURL_API
    }
}

export default ENV;