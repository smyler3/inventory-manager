const getIndexPage = (req, res) => {
    res.render("Index", { 
        title: "Home", 
    });
};

const get404Page = (req, res) => {
    res.render("404");
};

module.exports = {
    getIndexPage,
    get404Page,
};