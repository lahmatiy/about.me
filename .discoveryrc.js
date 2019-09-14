module.exports = {
    name: 'Roman Dvornov',
    data: () => require('./data.json'),
    viewport: 'width=device-width, initial-scale=1',
    favicon: __dirname + '/rdvornov.jpg',
    view: {
        assets: [
            'view.js',
            'view.css'
        ]
    }
};
