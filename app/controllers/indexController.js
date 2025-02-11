const getIndexPage = (req, res) => {
    res.render("Index", { 
        title: "Home", 
    });
};

const get404Page = (req, res) => {
    res.render("404", { 
        title: "404 - Page Not Found", 
    });
};

module.exports = {
    getIndexPage,
    get404Page,
};