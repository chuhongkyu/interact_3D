function Lights() {
    return (
        <>
            <directionalLight
                castShadow
                intensity={2}
                shadow-bias={0}
                shadow-camera-top={10}
                shadow-camera-bottom={-10}
                shadow-camera-left={-10}
                shadow-camera-right={10}
                shadow-mapSize-height={1024}
                shadow-mapSize-width={1024}
                position={[2, 5, 5]}
                color="#fff"
            />
            <ambientLight intensity={1.4}/>
        </>
    )
}

export default Lights