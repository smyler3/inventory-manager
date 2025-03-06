const getIndexPage = (req, res) => {
    res.render("Index", { 
        title: "Home", 
    });
};

const get404Page = (req, res) => {
    res.render("layout", {
        title: "404 Page Not Found",
        body: "404",
        message: "Sorry, it looks like we couldn't find that page right now, please check the url or navigate home",
    });
};

module.exports = {
    getIndexPage,
    get404Page,
};