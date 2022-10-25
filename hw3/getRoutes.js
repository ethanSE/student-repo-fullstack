module.exports = (routes) => {
    return routes.map((elem) => `<li><a href="/${elem}">/${elem}</a></li>`).join('');
};
