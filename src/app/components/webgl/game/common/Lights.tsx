function Lights() {
    return (
        <>
            <directionalLight
                castShadow
                intensity={2}
                shadow-bias={0}
                shadow-camera-top={20}
                shadow-camera-bottom={-20}
                shadow-camera-left={-20}
                shadow-camera-right={20}
                shadow-mapSize-height={2048}
                shadow-mapSize-width={2048}
                position={[3, 10, -10]}
                color="#fff"
            />
            <ambientLight intensity={1.4}/>
        </>
    )
}

export default Lights