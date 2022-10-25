module.exports = (routes) => {
    return routes.reduce(
        (acc = '', elem) => acc.concat(`<li><a href="/${elem}">/${elem}</a></li>`),
        ''
    );
};
