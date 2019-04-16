const Utils = {
    colorAlphabet: '0123456789abcdef',

    /**
     * @returns {string}
     */
    getRandomColorChar: function () {
        return Utils.colorAlphabet.charAt(
            Utils.getRandomInt(Utils.colorAlphabet.length - 1)
        );
    },

    /**
     * @returns {string}
     */
    generateColor: function() {
        return [
            Utils.getRandomColorChar(),
            Utils.getRandomColorChar(),
            Utils.getRandomColorChar(),
        ].join('');
    },

    /**
     * @param {number} max
     * @returns {number}
     */
    getRandomInt: function(max) {
        return Math.floor(Math.random() * Math.floor(max));
    },

    /**
     * @param {HTMLElement} element
     * @param {object} style
     */
    css: function(element, style) {
        for (p in style) {
            if (style.hasOwnProperty(p)) {
                element.style[p] = style[p];
            }
        }
    }
};


function init(container, linesConfig) {
    const lineHeight = container.offsetHeight / linesConfig.length;
    linesConfig.forEach(config => {
        const line = createLine(config, lineHeight);
        drawElements(line, config.elements);
        container.appendChild(line);
        runAutoUpdateForLine(line, config.updateTime);
    });
}

function createLine(config, heightPx) {
    const line = document.createElement('div');
    line.className = 'line';
    Utils.css(line, {
        backgroundColor: config.background,
        minHeight: heightPx + 'px',
        height: heightPx + 'px'
    });

    return line;
}

function drawElements(line, elementsConfig) {
    elementsConfig.forEach(config => {
        const element = createElement(config);
        line.appendChild(element);
    });
}

function createElement(config) {
    const element = document.createElement('div');
    element.className = 'element';
    Utils.css(element, {
        backgroundColor: config.background,
        width: config.width + '%',
        minHeight: '100%',
        height: '100%'
    });

    return element;
}


function runAutoUpdateForLine(line, interval) {
    const update = function () {
        line.style.backgroundColor = '#' + Utils.generateColor();
        line.querySelectorAll('.element').forEach(element => {
            element.style.backgroundColor = '#' + Utils.generateColor();
        })
    };
    setInterval(update, interval);
}

var params = {
    lines: [
        {
            background: '#dedede',
            updateTime: 1000,
            elements: [
                {
                    background: '#454545',
                    width: 25
                },
                {
                    background: '#555555',
                    width: 10
                },
                {
                    background: '#656565',
                    width: 10
                }
            ]
        },
        {
            background: '#dedede',
            updateTime: 500,
            elements: [
                {
                    background: '#454545',
                    width: 25
                },
                {
                    background: '#555555',
                    width: 35
                }
            ]
        }
    ]
};
init(document.querySelector('.container'), params.lines);