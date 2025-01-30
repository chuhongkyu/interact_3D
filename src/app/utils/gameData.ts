import { Vector3Tuple } from "three";
// x: 6~10
// y: -9~-13 

const stage1 = {
    spot: [
        {
            initialRotation: {
                rotateX:0,
                rotateY:0,
                rotateZ:0,
                x:-2,
                y:0,
                z:0,
            },
            startRotation: {
                rotateX:0,
                rotateY:0,
                rotateZ:0,
                x:-2,
                y:0,
                z:0,
                transition: {
                    delay: 1,
                }
            },
        },
        {
            initialRotation: {
                rotateX:0,
                rotateY:0.2,
                rotateZ:0,
                x: -0.8,
                y: 0,
                z: 0.2
            },
            startRotation: {
                rotateX:0,
                rotateY:0,
                rotateZ:0,
                x:-0.8,
                y:0,
                z:0,
                transition: {
                    delay: 1,
                }
            },
        },
        {
            initialRotation: {
                rotateX:0,
                rotateY:-0.1,
                rotateZ:0,
                x: 0.4,
                y: 0,
                z: -0.4
            },
            startRotation: {
                rotateX:0,
                rotateY:0,
                rotateZ:0,
                x: 0.4,
                y:0,
                z:0,
                transition: {
                    delay: 1,
                }
            },
        },
        {
            initialRotation: {
                rotateX:0,
                rotateY:0,
                rotateZ:0,
                x: 1.6,
                y: 0,
                z: 0
            },
            startRotation: {
                rotateX:0,
                rotateY:0,
                rotateZ:0,
                x:1.6,
                y:0,
                z:0,
                transition: {
                    delay: 1,
                }
            },
        },
    ],
    spotPosition: [8, 0, -10] as Vector3Tuple,
    answer: [
        [
            [7,0.5,-13],
            [7,0.5,-12],
            [7,0.5,-11],
            [7,0.5,-10],
            [7,0.5,-9],
        ],
        [
            [6,0.5,-11],
            [7,0.5,-11],
            [8,0.5,-11],
            [8,0.5,-10],
            [8,0.5,-9],
        ],
        [
            [6,0.5,-10],
            [7,0.5,-10],
            [8,0.5,-10],
            [9,0.5,-10],
            [10,0.5,-10],
        ]
    ],
    problem:[
        [
            {
                "position": [
                    -2,
                    0.5,
                    -2
                ],
                "active": false
            },
            {
                "position": [
                    -1,
                    0.5,
                    -2
                ],
                "active": true
            },
            {
                "position": [
                    0,
                    0.5,
                    -2
                ],
                "active": false
            },
            {
                "position": [
                    1,
                    0.5,
                    -2
                ],
                "active": false
            },
            {
                "position": [
                    2,
                    0.5,
                    -2
                ],
                "active": false
            },
            // 2
            {
                "position": [
                    -2,
                    0.5,
                    -1
                ],
                "active": false
            },
            {
                "position": [
                    -1,
                    0.5,
                    -1
                ],
                "active": true
            },
            {
                "position": [
                    0,
                    0.5,
                    -1
                ],
                "active": false
            },
            {
                "position": [
                    1,
                    0.5,
                    -1
                ],
                "active": false
            },
            {
                "position": [
                    2,
                    0.5,
                    -1
                ],
                "active": false
            },
            // 3
            {
                "position": [
                    -2,
                    0.5,
                    0
                ],
                "active": false
            },
            {
                "position": [
                    -1,
                    0.5,
                    0
                ],
                "active": true
            },
            {
                "position": [
                    0,
                    0.5,
                    0
                ],
                "active": false
            },
            {
                "position": [
                    1,
                    0.5,
                    0
                ],
                "active": false
            },
            {
                "position": [
                    2,
                    0.5,
                    0
                ],
                "active": false
            },
            // 4
            {
                "position": [
                    -2,
                    0.5,
                    1
                ],
                "active": false
            },
            {
                "position": [
                    -1,
                    0.5,
                    1
                ],
                "active": true
            },
            {
                "position": [
                    0,
                    0.5,
                    1
                ],
                "active": false
            },
            {
                "position": [
                    1,
                    0.5,
                    1
                ],
                "active": false
            },
            {
                "position": [
                    2,
                    0.5,
                    1
                ],
                "active": false
            },
            // 5
            {
                "position": [
                    -2,
                    0.5,
                    2
                ],
                "active": false
            },
            {
                "position": [
                    -1,
                    0.5,
                    2
                ],
                "active": true
            },
            {
                "position": [
                    0,
                    0.5,
                    2
                ],
                "active": false
            },
            {
                "position": [
                    1,
                    0.5,
                    2
                ],
                "active": false
            },
            {
                "position": [
                    2,
                    0.5,
                    2
                ],
                "active": false
            },
        ],
        [
            {
                "position": [
                    -2,
                    0.5,
                    -2
                ],
                "active": false
            },
            {
                "position": [
                    -1,
                    0.5,
                    -2
                ],
                "active": false
            },
            {
                "position": [
                    0,
                    0.5,
                    -2
                ],
                "active": false
            },
            {
                "position": [
                    1,
                    0.5,
                    -2
                ],
                "active": false
            },
            {
                "position": [
                    2,
                    0.5,
                    -2
                ],
                "active": false
            },
            // 2
            {
                "position": [
                    -2,
                    0.5,
                    -1
                ],
                "active": false
            },
            {
                "position": [
                    -1,
                    0.5,
                    -1
                ],
                "active": false
            },
            {
                "position": [
                    0,
                    0.5,
                    -1
                ],
                "active": false
            },
            {
                "position": [
                    1,
                    0.5,
                    -1
                ],
                "active": false
            },
            {
                "position": [
                    2,
                    0.5,
                    -1
                ],
                "active": false
            },
            // 3
            {
                "position": [
                    -2,
                    0.5,
                    0
                ],
                "active": true
            },
            {
                "position": [
                    -1,
                    0.5,
                    0
                ],
                "active": true
            },
            {
                "position": [
                    0,
                    0.5,
                    0
                ],
                "active": true
            },
            {
                "position": [
                    1,
                    0.5,
                    0
                ],
                "active": false
            },
            {
                "position": [
                    2,
                    0.5,
                    0
                ],
                "active": false
            },
            // 4
            {
                "position": [
                    -2,
                    0.5,
                    1
                ],
                "active": false
            },
            {
                "position": [
                    -1,
                    0.5,
                    1
                ],
                "active": false
            },
            {
                "position": [
                    0,
                    0.5,
                    1
                ],
                "active": true
            },
            {
                "position": [
                    1,
                    0.5,
                    1
                ],
                "active": false
            },
            {
                "position": [
                    2,
                    0.5,
                    1
                ],
                "active": false
            },
            // 5
            {
                "position": [
                    -2,
                    0.5,
                    2
                ],
                "active": false
            },
            {
                "position": [
                    -1,
                    0.5,
                    2
                ],
                "active": false
            },
            {
                "position": [
                    0,
                    0.5,
                    2
                ],
                "active": true
            },
            {
                "position": [
                    1,
                    0.5,
                    2
                ],
                "active": false
            },
            {
                "position": [
                    2,
                    0.5,
                    2
                ],
                "active": false
            },
        ],
        [
            {
                "position": [
                    -2,
                    0.5,
                    -2
                ],
                "active": false
            },
            {
                "position": [
                    -1,
                    0.5,
                    -2
                ],
                "active": false
            },
            {
                "position": [
                    0,
                    0.5,
                    -2
                ],
                "active": false
            },
            {
                "position": [
                    1,
                    0.5,
                    -2
                ],
                "active": false
            },
            {
                "position": [
                    2,
                    0.5,
                    -2
                ],
                "active": false
            },
            // 2
            {
                "position": [
                    -2,
                    0.5,
                    -1
                ],
                "active": false
            },
            {
                "position": [
                    -1,
                    0.5,
                    -1
                ],
                "active": false
            },
            {
                "position": [
                    0,
                    0.5,
                    -1
                ],
                "active": false
            },
            {
                "position": [
                    1,
                    0.5,
                    -1
                ],
                "active": false
            },
            {
                "position": [
                    2,
                    0.5,
                    -1
                ],
                "active": false
            },
            // 3
            {
                "position": [
                    -2,
                    0.5,
                    0
                ],
                "active": false
            },
            {
                "position": [
                    -1,
                    0.5,
                    0
                ],
                "active": false
            },
            {
                "position": [
                    0,
                    0.5,
                    0
                ],
                "active": false
            },
            {
                "position": [
                    1,
                    0.5,
                    0
                ],
                "active": false
            },
            {
                "position": [
                    2,
                    0.5,
                    0
                ],
                "active": false
            },
            // 4
            {
                "position": [
                    -2,
                    0.5,
                    1
                ],
                "active": true
            },
            {
                "position": [
                    -1,
                    0.5,
                    1
                ],
                "active": true
            },
            {
                "position": [
                    0,
                    0.5,
                    1
                ],
                "active": true
            },
            {
                "position": [
                    1,
                    0.5,
                    1
                ],
                "active": true
            },
            {
                "position": [
                    2,
                    0.5,
                    1
                ],
                "active": true
            },
            // 5
            {
                "position": [
                    -2,
                    0.5,
                    2
                ],
                "active": false
            },
            {
                "position": [
                    -1,
                    0.5,
                    2
                ],
                "active": false
            },
            {
                "position": [
                    0,
                    0.5,
                    2
                ],
                "active": false
            },
            {
                "position": [
                    1,
                    0.5,
                    2
                ],
                "active": false
            },
            {
                "position": [
                    2,
                    0.5,
                    2
                ],
                "active": false
            },
        ],
    ]
}

const stage2 = {
    spot: [],
    spotPosition: [-7,0,-7] as Vector3Tuple,
    problem: 20
}

export { stage1, stage2 }