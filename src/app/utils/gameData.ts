import { Vector3Tuple } from "three";

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
    spotPosition: [8, 0, -10] as Vector3Tuple
}

export { stage1 }