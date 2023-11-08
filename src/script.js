import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')


// Scene
const scene = new THREE.Scene()


// Fog
const fog = new THREE.Fog('#333', 1, 15)
scene.fog = fog

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')
doorColorTexture.colorSpace = THREE.SRGBColorSpace

const bricksColorTexture = textureLoader.load('/textures/bricks/color.jpg')
const bricksAmbientOcclusionTexture = textureLoader.load('/textures/bricks/ambientOcclusion.jpg')
const bricksNormalTexture = textureLoader.load('/textures/bricks/normal.jpg')
const bricksRoughnessTexture = textureLoader.load('/textures/bricks/roughness.jpg')
bricksColorTexture.colorSpace = THREE.SRGBColorSpace

const grassColorTexture = textureLoader.load('/textures/grass/color.jpg')
const grassAmbientOcclusionTexture = textureLoader.load('/textures/grass/ambientOcclusion.jpg')
const grassNormalTexture = textureLoader.load('/textures/grass/normal.jpg')
const grassRoughnessTexture = textureLoader.load('/textures/grass/roughness.jpg')
grassColorTexture.colorSpace = THREE.SRGBColorSpace

grassColorTexture.wrapS = THREE.RepeatWrapping
grassAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping
grassNormalTexture.wrapS = THREE.RepeatWrapping
grassRoughnessTexture.wrapS = THREE.RepeatWrapping

grassColorTexture.wrapT = THREE.RepeatWrapping
grassAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping
grassNormalTexture.wrapT = THREE.RepeatWrapping
grassRoughnessTexture.wrapT = THREE.RepeatWrapping

grassColorTexture.repeat.set(8, 8)
grassAmbientOcclusionTexture.repeat.set(8, 8)
grassNormalTexture.repeat.set(8, 8)
grassRoughnessTexture.repeat.set(8, 8)

bricksColorTexture.colorSpace = THREE.SRGBColorSpace

/**
 * House
 */
// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshStandardMaterial({ 
        map: grassColorTexture,
        aoMap: grassAmbientOcclusionTexture,
        normalMap: grassNormalTexture,
        roughnessMap: grassRoughnessTexture,
     })
)
floor.rotation.x = - Math.PI * 0.5
floor.position.y = 0
scene.add(floor)

// Group
const houseGroup = new THREE.Group()
scene.add(houseGroup)

// Walls
const wallSizes = {
    width: 4,
    height: 3,
    depth: 4,
}
const wallsMesh = new THREE.Mesh(
    new THREE.BoxGeometry(wallSizes.width, wallSizes.height, wallSizes.depth),
    new THREE.MeshStandardMaterial({ 
        map: bricksColorTexture,
        aoMap: bricksAmbientOcclusionTexture,
        normalMap: bricksNormalTexture,
        roughnessMap: bricksRoughnessTexture,
    })
)
wallsMesh.position.y = wallSizes.height * 0.5
houseGroup.add(wallsMesh)

// Roof
const roofSizes = {
    width: 3.5,
    height: 1,
    depth: 4
}
const roofMesh = new THREE.Mesh(
    new THREE.ConeGeometry(roofSizes.width, roofSizes.height, roofSizes.depth),
    new THREE.MeshStandardMaterial({ color: '#b35f45'})
)
roofMesh.position.y = wallSizes.height + roofSizes.height * 0.5
roofMesh.rotation.y = Math.PI * 0.25
houseGroup.add(roofMesh)

// Door
const doorSizes = {
    width: 1.5,
    height: 2.1,
}
const doorMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(doorSizes.width, doorSizes.height, 100, 100),
    new THREE.MeshStandardMaterial({
        map: doorColorTexture,
        transparent: true,
        alphaMap: doorAlphaTexture,
        aoMap: doorAmbientOcclusionTexture,
        displacementMap: doorHeightTexture,
        displacementScale: 0.1,
        normalMap: doorNormalTexture,
        metalnessMap: doorMetalnessTexture,
        roughnessMap: doorRoughnessTexture
    })
)
doorMesh.position.y = doorSizes.height * 0.5 - 0.1
doorMesh.position.z = wallSizes.depth * 0.5 + 0.01
houseGroup.add(doorMesh)

// Bushes
const bushSizes = {
    width: 1,
    height: 16,
    depth: 16
}
const bushGeometry = new THREE.SphereGeometry(1, 16, 16)
const bushMaterial = new THREE.MeshStandardMaterial({ color: '#89c854' })
const bushMesh1 = new THREE.Mesh(
    bushGeometry,
    bushMaterial
)
bushMesh1.scale.set(0.5, 0.5, 0.5)
bushMesh1.position.set(0.8, 0.2, 2.2)

const bushMesh2 = new THREE.Mesh(
    bushGeometry,
    bushMaterial
)
bushMesh2.scale.set(0.25, 0.25, 0.25)
bushMesh2.position.set(1.4, 0.1, 2.1)

const bushMesh3 = new THREE.Mesh(
    bushGeometry,
    bushMaterial
)
bushMesh3.scale.set(0.4, 0.4, 0.4)
bushMesh3.position.set(- 0.8, 0.1, 2.2)

const bushMesh4 = new THREE.Mesh(
    bushGeometry,
    bushMaterial
)
bushMesh4.scale.set(0.5, 0.5, 0.5)
bushMesh4.position.set(- 1.7, 0, 2.2)

houseGroup.add(bushMesh1, bushMesh2, bushMesh3, bushMesh4)

// Graves
const gravesGroup = new THREE.Group()
scene.add(gravesGroup)

const graveSizes = {
    width: 0.6,
    height: 0.8,
    depth: 0.1,
}
const graveGeometry = new THREE.BoxGeometry(graveSizes.width, graveSizes.height, graveSizes.depth)
const graveMaterial = new THREE.MeshStandardMaterial({ color: '#b2b6b1'})

const NUMBER_OF_THOMBS = 50
for (let i = 0; i < NUMBER_OF_THOMBS; i++) {
    const angle = Math.random() * Math.PI * 2
    const radius = Math.random() * 5 + 4
    const x = Math.sin(angle) * radius
    const z = Math.cos(angle) * radius

    const graveMesh = new THREE.Mesh(
        graveGeometry,
        graveMaterial
    )
    graveMesh.position.set(x, (Math.random() - 0.5 )* 0.3 + 0.1, z)
    graveMesh.rotation.y = (Math.random() - 0.1) * 0.4
    graveMesh.rotation.z = (Math.random() - 0.5) * 0.4
    graveMesh.colorSpace = true
    graveMesh.castShadow = true

    gravesGroup.add(graveMesh)
}


/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#b9d5ff', 0.12)
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
scene.add(ambientLight)

// Directional light
const moonLight = new THREE.DirectionalLight('#b9d5ff', 0.12)
moonLight.position.set(4, 5, - 2)
gui.add(moonLight, 'intensity').min(0).max(1).step(0.001)
gui.add(moonLight.position, 'x').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'y').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'z').min(- 5).max(5).step(0.001)
scene.add(moonLight)

// Door light
const doorLight = new THREE.PointLight('#ff7d46', 2, 9)
doorLight.position.set(0, 2.2, 2.7)
houseGroup.add(doorLight)

/**
 * Ghosts
 */
const ghost1 = new THREE.PointLight('#ff00ff', 6, 4)
ghost1.position
scene.add(ghost1)

const ghost2 = new THREE.PointLight('#00ff00', 6, 4)
ghost2.position
scene.add(ghost2)

const ghost3 = new THREE.PointLight('#0000ff', 6, 4)
ghost3.position
scene.add(ghost3)



/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 4
camera.position.y = 2
camera.position.z = 5
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setClearColor('#999')
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Shadows
 */
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

moonLight.castShadow = true
doorLight.castShadow = true
ghost1.castShadow = true
ghost2.castShadow = true
ghost3.castShadow = true

wallsMesh.castShadow = true
bushMesh1.castShadow = true
bushMesh2.castShadow = true
bushMesh3.castShadow = true
bushMesh4.castShadow = true

floor.receiveShadow = true

doorLight.shadow.mapSize.width = 256
doorLight.shadow.mapSize.height = 256
doorLight.shadow.camera.far = 7

ghost1.shadow.mapSize.width = 256
ghost1.shadow.mapSize.height = 256
ghost1.shadow.camera.far = 7

ghost2.shadow.mapSize.width = 256
ghost2.shadow.mapSize.height = 256
ghost2.shadow.camera.far = 7

ghost3.shadow.mapSize.width = 256
ghost3.shadow.mapSize.height = 256
ghost3.shadow.camera.far = 7





/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()


    // Update Ghosts
    const ghost1Angle = elapsedTime * 0.5
    ghost1.position.x = Math.cos(ghost1Angle) * 4
    ghost1.position.z = Math.sin(ghost1Angle) * 4
    ghost1.position.y = Math.sin(ghost1Angle * 3) 

    const ghost2Angle = - elapsedTime * 0.23
    ghost2.position.x = Math.cos(ghost2Angle) * 6
    ghost2.position.z = Math.sin(ghost2Angle) * 6
    ghost2.position.y = Math.sin(ghost2Angle * 4)  + Math.sin(elapsedTime * 2.5)


    const ghost3Angle = - elapsedTime * 0.55
    ghost3.position.x = Math.cos(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.12))
    ghost3.position.z = Math.sin(ghost3Angle) * (2 + Math.sin(elapsedTime * 0.32))
    ghost3.position.y = Math.sin(ghost3Angle * 3)  + Math.sin(elapsedTime * 1.5)


    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()