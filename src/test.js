import * as THREE from 'three'

window.THREE = THREE

import { Effect } from 'postprocessing'
import { EffectComposer, RenderPass, EffectPass } from 'postprocessing'

function lerp(current, target, speed = 0.1, limit = 0.001) {
  let change = (target - current) * speed
  if (Math.abs(change) < limit) {
    change = target - current
  }
  return change
}

import image1 from '/images/water-logo.svg'
import { font } from './font'

let images = [image1]

const GlyphURL = '/water/SourceSansPro-Black.png'

class Planes {
  constructor(sceneManager, images) {
    this.sceneManager = sceneManager
    this.meshes = []
    this.images = images
    this.textures = []
    this.hovering = 1
    this.initiated = false
    this.uniforms = {
      uPlaneSize: new THREE.Uniform(new THREE.Vector2(0, 0)),
    }
  }
  load(loader) {
    for (let i = 0; i < this.images.length; i++) {
      loader.begin('image-' + i)
      var textureLoader = new THREE.TextureLoader()
      textureLoader.load(this.images[i], (image) => {
        this.textures[i] = image
        loader.end('image-' + i)
      })
    }
  }
  init() {
    this.initiated = true
    const { width, height } = this.sceneManager.getViewSize()

    console.log(width, height)

    const planeMetrics = this.getPlaneMetrics(width, height, 0, 0)

    const geometry = new THREE.PlaneBufferGeometry(
      planeMetrics.planeWidth,
      planeMetrics.planeHeight,
      1,
      1
    )
    this.uniforms.uPlaneSize.value.set(
      planeMetrics.planeWidth,
      planeMetrics.planeHeight
    )
    this.uniforms.uPlaneSize.needsUpdate = true

    let x = planeMetrics.x

    let space = planeMetrics.space
    for (let i = 0; i < 3; i++) {
      let texture = this.textures[i]
      const material = new THREE.ShaderMaterial({
        uniforms: {
          uZoom: new THREE.Uniform(1),
          uPlaneSize: this.uniforms.uPlaneSize,
          uImage: new THREE.Uniform(texture),
          uImageSize: new THREE.Uniform(
            new THREE.Vector2(
              texture ? texture.image.width : 0,
              texture ? texture.image.height : 0
            )
          ),
          uMouse: new THREE.Uniform(new THREE.Vector2(0, 0)),
        },
        fragmentShader,
        vertexShader,
      })
      const mesh = new THREE.Mesh(geometry, material)
      mesh.position.x = x + i * space
      mesh.userData.index = i
      this.meshes.push(mesh)
      this.sceneManager.scene.add(mesh)
    }
  }
  onMouseMove(ev) {
    const raycaster = this.sceneManager.raycaster
    var intersections = raycaster.intersectObjects(this.meshes)
    if (intersections.length > 0) {
      const intersection = intersections[0]
      const index = intersection.object.userData.index
      this.meshes[index].material.uniforms.uMouse.value.set(
        intersection.uv.x,
        intersection.uv.y
      )
      if (this.hovering !== index) this.sceneManager.onPlaneHover(index)
      this.hovering = index
    } else {
      this.hovering = 1
      document.body.style.cursor = 'default'
    }
  }
  update() {
    const meshes = this.meshes
    for (let i = 0; i < 3; i++) {
      const zoomTarget = this.hovering === i ? 1 : 0
      const uZoom = meshes[i].material.uniforms.uZoom

      const zoomChange = lerp(uZoom.value, zoomTarget, 1, 1)
      // if (zoomChange !== 0) {
      //   uZoom.value += zoomChange
      //   uZoom.needsUpdate = true
      // }
    }
  }
  getPlaneMetrics(viewWidth, viewHeight, width, height) {
    const planeWidth = viewWidth
    if (width < 800) {
      return {
        planeWidth: viewWidth,
        planeHeight: viewHeight,
        x: 0,
        // Calculate the resting(empty) space and divided by number of planes
        space: viewWidth,
      }
    }
    return {
      planeWidth,
      planeHeight: viewHeight * 0.8,
      x: viewWidth / 5 / 1.5,
      // Calculate the resting(empty) space and divided by number of planes
      space: (viewWidth - (viewWidth / 5 / 1.5) * 2 - planeWidth) / 2,
    }
  }
  onResize(width, height) {
    const viewSize = this.sceneManager.getViewSize()

    const planeMetrics = this.getPlaneMetrics(
      viewSize.width,
      viewSize.height,
      width,
      height
    )
    const geometry = new THREE.PlaneBufferGeometry(
      planeMetrics.planeWidth,
      planeMetrics.planeHeight,
      1,
      1
    )

    this.uniforms.uPlaneSize.value.set(
      planeMetrics.planeWidth,
      planeMetrics.planeHeight
    )
    this.uniforms.uPlaneSize.needsUpdate = true

    let translateToLeft = -viewSize.width / 2 + planeMetrics.planeWidth / 2
    let x = planeMetrics.x
    let space = planeMetrics.space

    this.meshes.forEach((mesh, i) => {
      mesh.geometry.dispose()
      mesh.geometry = geometry
      mesh.position.x = x + i * space
    })
  }
}

const fragmentShader = `
uniform float uZoom;
uniform float uZoomDelta;
uniform vec2 uMouse;

uniform vec2 uPlaneSize;
uniform sampler2D uImage;
uniform vec2 uImageSize;

varying vec2 vUv;

vec2 withRatio(vec2 uv, vec2 canvasSize, vec2 textureSize){
    
    vec2 ratio = vec2(
        min((canvasSize.x / canvasSize.y) / (textureSize.x / textureSize.y), 1.0),
        min((canvasSize.y / canvasSize.x) / (textureSize.y / textureSize.x), 1.0)
      );

    return vec2(
        uv.x * ratio.x + (1.0 - ratio.x) * 0.5,
        uv.y * ratio.y + (1.0 - ratio.y) * 0.5
      );
}
vec3 greyScale(vec3 color){
    return vec3(color.r + color.g + color.b)/3.;
}

void main() {
    vec2 uv = vUv;
    uv -= 0.5;
    uv *= 1.- uZoomDelta * uZoom;
    uv += uZoomDelta * (uMouse-0.5) * 0.5 * uZoom;
    uv += 0.5;
    uv = withRatio(uv, uPlaneSize, uImageSize);
    vec3 tex = texture2D(uImage, uv).xyz;
  vec3 color = vec3(0.2 + uZoom * 0.5);
  color = mix(greyScale(tex)*0.5, tex, uZoom);
  gl_FragColor = vec4(color,1.);
}`
const vertexShader = `
varying vec2 vUv;
void main() {
  vec3 pos = position.xyz;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos,1.);
    vUv = uv;
}`

const easeOutSine = (t, b, c, d) => {
  return c * Math.sin((t / d) * (Math.PI / 2)) + b
}

const easeOutQuad = (t, b, c, d) => {
  t /= d
  return -c * t * (t - 2) + b
}

const loadTextAssets = (assets, loader) => {
  assets.font = font

  loader.begin('glyphs')
  var glyphsLoader = new THREE.TextureLoader()
  glyphsLoader.crossOrigin = ''
  glyphsLoader.load(GlyphURL, (glyphs) => {
    assets.glyphs = glyphs
    loader.end('glyphs')
  })
}

const createTextMaterial = (glyphs, options = {}) => {
  const mdsf = MSDFShader({
    transparent: true,
    side: THREE.DoubleSide,
    map: glyphs,
    color: 'rgb(255,255,255)',
    negate: false,
    ...options,
  })
  const material = new THREE.RawShaderMaterial({ ...mdsf })
  return material
}

class Text {
  constructor(sceneManager, text) {
    this.sceneManager = sceneManager
    this.glyphs = null
    this.font = font

    this.text = text

    this.baseScale = 1
    this.scaleY = 1
    this.scaleX = 1

    this.scaleMultX = 1
    this.scaleMultY = 1

    this.mesh = null
  }
  load(loader) {
    loader.begin('glyphs')
    var glyphsLoader = new THREE.TextureLoader()
    glyphsLoader.crossOrigin = ''
    glyphsLoader.load(GlyphURL, (glyphs) => {
      this.glyphs = glyphs
      loader.end('glyphs')
    })
  }
  init() {
    const geometry = createGeometry({
      font: this.font,
      align: 'center',
      text: this.text,
    })
    const material = createTextMaterial(this.glyphs)
    const mesh = new THREE.Mesh(geometry, material)
    this.mesh = mesh
    this.resizeText(true)
    this.sceneManager.scene.add(mesh)
  }
  updateText(text) {
    if (text === this.text) return
    this.text = text
    const geometry = createGeometry({
      font: this.font,
      align: 'center',
      text,
    })

    this.mesh.geometry = geometry
    this.mesh.geometry.needsUpdate = true
    let multX = 1
    let multY = 1

    this.setScale(
      this.baseScale * this.scaleMultX,
      this.baseScale * this.scaleMultY
    )

    this.resizeText()
  }
  update() {
    let scaleXChange = lerp(this.scaleX, this.baseScale, 0.1, 0.00001)
    let scaleYChange = lerp(this.scaleY, this.baseScale, 0.1, 0.00001)
    if (scaleXChange !== 0 || scaleYChange !== 0) {
      this.setScale(this.scaleX + scaleXChange, this.scaleY + scaleYChange)
    }
  }
  resizeText(force = false) {
    let scale = 0.1
    let scaleMultX = 1.3
    let scaleMultY = 1.05
    if (window.innerWidth >= 800) {
      scaleMultX = 1.3
      scaleMultY = 1.05
      scale = 0.15
    }
    if (window.innerWidth >= 1200) {
      scaleMultX = 1.3
      scaleMultY = 1.05
      scale = 0.2
    }

    this.scaleMultX = scaleMultX
    this.scaleMultY = scaleMultY
    this.baseScale = scale
    if (force) {
      this.setScale(scale, scale)
    }
  }
  setScale(scaleX, scaleY) {
    const mesh = this.mesh
    const layout = mesh.geometry.layout
    this.scaleX = scaleX
    this.scaleY = scaleY
    mesh.scale.x = scaleX
    mesh.scale.y = -scaleY
    mesh.position.x = (-layout.width / 2) * scaleX
    mesh.position.y = (-layout.xHeight / 2) * scaleY
  }
  onResize(width, height) {
    this.resizeText(true)
  }
}

class TouchTexture {
  constructor(parent) {
    this.size = 64
    this.width = window.innerWidth
    this.height = window.innerHeight
    this.width = this.height = this.size

    this.maxAge = 64
    this.radius = 0.1 * this.size
    // this.radius = 0.15 * 1000;

    this.speed = 1 / this.maxAge
    // this.speed = 0.01;

    this.trail = []
    this.last = null

    this.initTexture()
  }

  initTexture() {
    this.canvas = document.createElement('canvas')
    this.canvas.width = this.width
    this.canvas.height = this.height
    this.ctx = this.canvas.getContext('2d')
    this.ctx.fillStyle = 'black'
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

    this.texture = new THREE.Texture(this.canvas)
    this.canvas.id = 'touchTexture'
    // this.canvas.style.width = this.canvas.style.height = `${
    //   this.canvas.width
    // }px`;
  }
  update(delta) {
    this.clear()
    let speed = this.speed
    this.trail.forEach((point, i) => {
      let f = point.force * speed * (1 - point.age / this.maxAge)
      let x = point.x
      let y = point.y

      point.x += point.vx * f
      point.y += point.vy * f
      point.age++
      if (point.age > this.maxAge) {
        this.trail.splice(i, 1)
      }
    })

    this.trail.forEach((point, i) => {
      this.drawPoint(point)
    })
    // this.drawPoints();

    // this.ctx.fillStyle = "rgba(255,0,0,0.5)";
    // this.ctx.fillRect(0, 0, 200, 200);
    // this.ctx.fillStyle = "rgba(0,255,0,0.5)";
    // this.ctx.fillRect(50, 0, 200, 200);
    // this.test();
    this.texture.needsUpdate = true
  }
  clear() {
    this.ctx.fillStyle = 'black'
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
  }
  addTouch(point) {
    let force = 0
    let vx = 0
    let vy = 0
    const last = this.last
    if (last) {
      const dx = point.x - last.x
      const dy = point.y - last.y
      if (dx === 0 && dy === 0) return
      const dd = dx * dx + dy * dy
      let d = Math.sqrt(dd)
      vx = dx / d
      vy = dy / d

      force = Math.min(dd * 10000, 1)
      // force = Math.sqrt(dd)* 50.;
      // force = 1;
    }
    this.last = {
      x: point.x,
      y: point.y,
    }
    this.trail.push({ x: point.x, y: point.y, age: 0, force, vx, vy })
  }
  drawPoint(point) {
    const ctx = this.ctx
    const pos = {
      x: point.x * this.width,
      y: (1 - point.y) * this.height,
    }

    let intensity = 1

    if (point.age < this.maxAge * 0.3) {
      intensity = easeOutSine(point.age / (this.maxAge * 0.3), 0, 1, 1)
    } else {
      intensity = easeOutQuad(
        1 - (point.age - this.maxAge * 0.3) / (this.maxAge * 0.7),
        0,
        1,
        1
      )
    }
    intensity *= point.force

    const radius = this.radius
    let color = `${((point.vx + 1) / 2) * 255}, ${
      ((point.vy + 1) / 2) * 255
    }, ${intensity * 255}`

    let offset = this.size * 5
    ctx.shadowOffsetX = offset // (default 0)
    ctx.shadowOffsetY = offset // (default 0)
    ctx.shadowBlur = radius * 1 // (default 0)
    ctx.shadowColor = `rgba(${color},${0.2 * intensity})` // (default transparent black)

    this.ctx.beginPath()
    this.ctx.fillStyle = 'rgba(255,0,0,1)'
    this.ctx.arc(pos.x - offset, pos.y - offset, radius, 0, Math.PI * 2)
    this.ctx.fill()
  }
}

class WaterEffect extends Effect {
  constructor(options = {}) {
    super('WaterEffect', fragment, {
      uniforms: new Map([['uTexture', new THREE.Uniform(options.texture)]]),
    })
  }
}

const fragment = `

uniform sampler2D uTexture;
#define PI 3.14159265359

void mainUv(inout vec2 uv) {
        vec4 tex = texture2D(uTexture, uv);
        float angle = -((tex.r) * (PI * 2.) - PI) ;
        float vx = -(tex.r *2. - 1.);
        float vy = -(tex.g *2. - 1.);
        float intensity = tex.b;
        uv.x += vx * 0.2 * intensity ;
        uv.y += vy * 0.2  *intensity;
        // uv.xy *= 1. - 0.5 * smoothstep( 0., 1., intensity) ;
        // uv.x +=  0.2 * intensity;
        // uv.y +=  0.2  *intensity;
    }
    

`

class WaterLogo {
  constructor() {
    this.renderer = new THREE.WebGLRenderer({
      antialias: false,
    })
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.setPixelRatio(window.devicePixelRatio)

    this.composer = new EffectComposer(this.renderer)

    document.body
      .querySelector('#background-grid')
      .parentElement.append(this.renderer.domElement)
    this.renderer.domElement.id = 'webGLApp'

    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      10000
    )
    this.camera.position.z = 50
    this.disposed = false
    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color('black')

    this.clock = new THREE.Clock()

    this.assets = {}
    this.raycaster = new THREE.Raycaster()
    this.hitObjects = []

    this.touchTexture = new TouchTexture()

    this.data = {
      text: ["DON'T", '', 'BACK'],
      images: images,
    }

    this.subjects = [
      new Planes(this, images),
      new Text(this, this.data.text[1]),
    ]
    // this.subjects = [];

    this.tick = this.tick.bind(this)
    this.onResize = this.onResize.bind(this)
    this.onMouseMove = this.onMouseMove.bind(this)
    this.onTouchMove = this.onTouchMove.bind(this)

    this.init = this.init.bind(this)
    this.loader = new Loader()
    this.loadAssets().then(this.init)
  }
  loadAssets() {
    const loader = this.loader
    const assets = this.assets
    return new Promise((resolve, reject) => {
      // loadTextAssets(assets, loader);

      this.subjects.forEach((subject) => subject.load(loader))

      loader.onComplete = () => {
        resolve()
      }
    })
  }
  onPlaneHover(i) {
    // const text = this.subjects[1];
    // if (i === 0) {
    //   text.updateText("DON'T");
    // } else if (i === 1) {
    //   text.updateText("LOOK");
    // } else if (i === 2) {
    //   text.updateText("BACK");
    // }
  }
  initComposer() {
    const renderPass = new RenderPass(this.scene, this.camera)
    this.waterEffect = new WaterEffect({ texture: this.touchTexture.texture })
    const waterPass = new EffectPass(this.camera, this.waterEffect)
    waterPass.renderToScreen = true
    renderPass.renderToScreen = false
    this.composer.addPass(renderPass)
    this.composer.addPass(waterPass)
  }
  init() {
    this.touchTexture.initTexture()
    const assets = this.assets

    // const textGeometry2 = createGeometry({
    //   font: assets.font,
    //   align: "center",
    //   width: 600,
    //   text: Array.from({ length: 100 }, () => "water").join(" ")
    // });
    // const textMaterial2 = createTextMaterial(assets.glyphs, {
    //   color: "rgba(20,20,20,1.0)"
    // });
    // const textMesh2 = new THREE.Mesh(textGeometry2, textMaterial2);
    // scale = 0.1;
    // console.log(textGeometry2.layout);
    // textMesh2.scale.x = scale;
    // textMesh2.scale.y = -scale;
    // textMesh2.position.z += -0.1;
    // textMesh2.position.x = (-textGeometry2.layout.width / 2) * scale;
    // textMesh2.position.y =
    //   (-textGeometry2.layout.height / 2) * scale +
    //   (-textGeometry2.layout.lineHeight / 4) * scale;
    // this.scene.add(textMesh2);

    this.initTextPlane()
    this.addHitPlane()
    this.subjects.forEach((subject) => subject.init())
    this.initComposer()

    // this.addImagePlane();

    this.tick()

    // window.addEventListener('resize', this.onResize)
    document.body
      .querySelector('#home-hero .container')
      .addEventListener('mousemove', this.onMouseMove)
    document.body
      .querySelector('#home-hero .container')
      .addEventListener('touchmove', this.onTouchMove)
  }

  updateTouchRender() {
    document.body
      .querySelector('#home-hero .container')
      .addEventListener('mousemove', this.onMouseMove)
    document.body
      .querySelector('#home-hero .container')
      .addEventListener('touchmove', this.onTouchMove)
  }

  onTouchMove(ev) {
    const touch = ev.targetTouches[0]
    this.onMouseMove({ clientX: touch.clientX, clientY: touch.clientY })
  }
  onMouseMove(ev) {
    const raycaster = this.raycaster
    this.mouse = {
      x: ev.clientX / window.innerWidth,
      y: 1 - (ev.clientY / window.innerHeight) * 1.4,
    }
    this.touchTexture.addTouch(this.mouse)

    raycaster.setFromCamera(
      {
        x: ev.clientX / window.innerWidth - 1,
        y: -(ev.clientY / window.innerHeight) + 1,
      },
      this.camera
    )
    // var intersections = raycaster.intersectObjects(this.hitObjects);
    // if (intersections.length > 0) {
    //   const intersect = intersections[0];
    //   this.touchTexture.addTouch(intersect.uv);
    // }
    this.subjects.forEach((subject) => {
      if (subject.onMouseMove) {
        subject.onMouseMove(ev)
      }
    })
  }
  addImagePlane() {
    const viewSize = this.getViewSize()

    let width = viewSize.width / 4.5

    const geometry = new THREE.BufferGeometry(
      width,
      viewSize.height * 0.8,
      1,
      1
    )
    let x = -viewSize.width / 2 + width / 2 + viewSize.width / 5 / 1.5

    let space = (viewSize.width - (viewSize.width / 5 / 1.5) * 2 - width) / 2
    for (let i = 0; i < 3; i++) {
      const material = new THREE.MeshBasicMaterial({ color: 0x484848 })
      const mesh = new THREE.Mesh(geometry, material)
      mesh.position.x += x + i * space
      this.scene.add(mesh)
    }
  }
  initTextPlane() {
    const viewSize = this.getViewSize()

    const geometry = new THREE.BufferGeometry(
      viewSize.width,
      viewSize.height,
      1,
      1
    )
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uMap: new THREE.Uniform(this.touchTexture.texture),
        uLines: new THREE.Uniform(5),
        uLineWidth: new THREE.Uniform(0.01),
        uLineColor: new THREE.Uniform(new THREE.Color(0x202030)),
      },
      transparent: true,
      fragmentShader: `
        uniform sampler2D uMap;
        uniform float uLines;
        uniform float uLineWidth;
        uniform vec3 uLineColor;
        varying vec2 vUv;
        void main(){
          vec3 color = vec3(1.);
          color = vec3(0.);
          float line = step(0.5-uLineWidth/2.,fract(vUv.x * uLines)) - step(0.50 +uLineWidth/2.,fract(vUv.x * uLines));
          color += line * uLineColor;
          gl_FragColor = vec4(uLineColor,line);
        }
      `,
      vertexShader: `
        varying vec2 vUv;

        void main(){
          vec3 pos = position.xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.);
          vUv = uv;
        }
      `,
    })
    const mesh = new THREE.Mesh(geometry, material)
    mesh.position.z = -0.001
    this.scene.add(mesh)
  }
  addHitPlane() {
    const viewSize = this.getViewSize()
    const geometry = new THREE.BufferGeometry(
      viewSize.width,
      viewSize.height,
      1,
      1
    )
    const material = new THREE.MeshBasicMaterial()
    const mesh = new THREE.Mesh(geometry, material)

    this.hitObjects.push(mesh)
  }
  getViewSize() {
    const fovInRadians = (this.camera.fov * Math.PI) / 180
    const height = Math.abs(
      this.camera.position.z * Math.tan(fovInRadians / 2) * 2
    )

    return { width: height * this.camera.aspect, height }
  }
  dispose() {
    this.disposed = true
    window.removeEventListener('resize', this.onResize)
    window.removeEventListener('mousemove', this.onMouseMove)
    this.scene.children.forEach((child) => {
      child.material.dispose()
      child.geometry.dispose()
    })
    if (this.assets.glyphs) this.assets.glyphs.dispose()

    this.hitObjects.forEach((child) => {
      if (child) {
        if (child.material) child.material.dispose()
        if (child.geometry) child.geometry.dispose()
        // child.dispose();
      }
    })
    if (this.touchTexture) this.touchTexture.texture.dispose()
    this.scene.dispose()
    this.renderer.dispose()
    this.composer.dispose()
  }
  update() {
    this.touchTexture.update()
    this.subjects.forEach((subject) => {
      subject.update()
    })
  }
  render() {
    // this.renderer.render(this.scene, this.camera);
    this.composer.render(this.clock.getDelta())
  }
  tick() {
    if (this.disposed) return
    this.render()
    this.update()
    requestAnimationFrame(this.tick)
  }
  onResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()

    this.composer.setSize(window.innerWidth, window.innerHeight)
    this.subjects.forEach((subject) => {
      subject.onResize(window.innerWidth, window.innerHeight)
    })
  }
}

class Loader {
  constructor() {
    this.items = []
    this.loaded = []
  }
  begin(name) {
    this.items.push(name)
  }
  end(name) {
    this.loaded.push(name)
    if (this.loaded.length === this.items.length) {
      this.onComplete()
    }
  }
  onComplete() {}
}

let myApp

function initWaterLogo() {
  myApp = new WaterLogo(0)
}

// function destroyWaterLogo() {
//   const waterLogo = document.querySelectorAll('#webGLApp')

//   if (waterLogo) {
//     Array.from(waterLogo).forEach((wLogo) => {
//       wLogo.parentElement.removeChild(wLogo)
//     })
//   }
// }

window.initWaterLogo = initWaterLogo
window.updateTouchRender = updateTouchRender

function updateTouchRender() {
  if (myApp) {
    myApp.updateTouchRender()
  }
}

if (window.innerWidth > 768) {
  setTimeout(() => initWaterLogo(), 1000)
}

// window.destroyWaterLogo = destroyWaterLogo
