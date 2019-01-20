let latticeNumber = 12;
let centerIndex = Math.floor((latticeNumber - 1) / 2);
const designSize = {
    width: 375
}
let pd = 20;
let operationHeight = 80;
let whiteSpaceGap = 2;

let colorMap = {
    bg: 'rgba(0, 0, 0, 0.7)',
    fontColor: '#fff',
    opColor: '#CC9999'
}

let latticeColorList = [
    'rgba(51, 51, 51, 0.95)',
    'rgba(153, 204, 153, 0.6)',
    'rgba(255, 204, 153, 0.7)',
    'rgba(153, 204, 255, 0.7)',
    '#FFFFCC',
    '#EFCEE8',
    '#E2DBBE'
]

let status = {
    1: '开始',
    2: '暂停'
}

let gridItem = {
    isTaked: 0,
    color: 0
}
let baseCoords = [
    [// 田字
        {
            x: 0,
            y: -2
        },
        {
            x: 1,
            y: -2
        },
        {
            x: 0,
            y: -1
        },
        {
            x: 1,
            y: -1
        }
    ],
    [// 一字
        {
            x: -1,
            y: -1
        },
        {
            x: 0,
            y: -1
        },
        {
            x: 1,
            y: -1
        },
        {
            x: 2,
            y: -1
        }
    ],
    [// Z型
        {
            x: -1,
            y: -2
        },
        {
            x: 0,
            y: -2
        },
        {
            x: 0,
            y: -1
        },
        {
            x: 1,
            y: -1
        }
    ],
    [// 上字
        {
            x: 0,
            y: -2
        },
        {
            x: -1,
            y: -1
        },
        {
            x: 0,
            y: -1
        },
        {
            x: 1,
            y: -1
        }
    ],
    [
        {
            x: 1,
            y: -3
        },
        {
            x: 1,
            y: -2
        },
        {
            x: 1,
            y: -1
        },
        {
            x: 0,
            y: -1
        }
    ],
    [
        {
            x: 0,
            y: -3
        },
        {
            x: 0,
            y: -2
        },
        {
            x: 0,
            y: -1
        },
        {
            x: 1,
            y: -1
        }
    ]
]

let shapeCenter = [
    0, 1, 2, 2, 1, 1
]

let PAUSE_STATUS = 1,
    START_STATUS = 2;

export {
    latticeNumber,
    centerIndex,
    designSize,
    pd,
    operationHeight,
    colorMap,
    latticeColorList,
    gridItem,
    whiteSpaceGap,
    status,
    shapeCenter,
    baseCoords,
    PAUSE_STATUS,
    START_STATUS
}
