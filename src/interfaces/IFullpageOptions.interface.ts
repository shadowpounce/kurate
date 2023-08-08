export type Item = {
  anchor: string | number
  index: number
  item: HTMLElement
  isFirst: boolean
  isLast: boolean
}

type DragAndMove =
  | boolean
  | 'vertical'
  | 'horizontal'
  | 'fingersonly'
  | 'mouseonly'
type FadingEffect = boolean | 'sections' | 'slides'
type InterlockedSlides = boolean | Array<number>
type bigSectionsDestination = 'top' | 'bottom' | null
type Parallax = boolean | 'sections' | 'slides'
type DropEffect = boolean | 'sections' | 'slides'
type WaterEffect = boolean | 'sections' | 'slides'
type Trigger =
  | 'slideArrow'
  | 'verticalNav'
  | 'horizontalNav'
  | 'keydown'
  | 'wheel'
  | 'menu'
type ScrollOverflowReset = boolean | 'slides' | 'sections'
type WaterEffectOptions = {
  animateContent: boolean
  animateOnMouseMove: boolean
}
type CardsOptions = {
  perspective: number
  fadeContent: boolean
  fadeBackground: boolean
}
type ParallaxOptions = {
  percentage?: number
  property?: 'translate' | 'background'
  type?: 'reveal' | 'cover'
}

type Credits = {
  enabled?: boolean
  label?: string
  position?: 'left' | 'right'
}

export interface IFullpageOptions {
  anchors?: string[]
  animateAnchor?: boolean
  autoScrolling?: boolean
  bigSectionsDestination?: bigSectionsDestination //top, bottom, null
  continuousHorizontal?: boolean
  continuousVertical?: boolean
  controlArrowColor?: string
  controlArrows?: boolean
  controlArrowsHTML?: string[]
  css3?: boolean
  dragAndMove?: DragAndMove
  easing?: string
  easingcss3?: string
  fadingEffect?: FadingEffect
  fitToSection?: boolean
  fitToSectionDelay?: number
  fixedElements?: string // '#header, .footer'
  hybrid?: boolean
  interlockedSlides?: InterlockedSlides
  keyboardScrolling?: boolean
  lazyLoading?: boolean
  observer?: boolean
  licenseKey?: string
  credits: Credits
  lockAnchors?: boolean
  loopBottom?: boolean
  loopHorizontal?: boolean
  loopTop?: boolean
  menu?: string
  navigation?: boolean
  navigationPosition?: string
  navigationTooltips?: string[] // ['firstSlide', 'secondSlide']
  normalScrollElementTouchThreshold?: number
  normalScrollElements?: string // '#element1, .element2',
  offsetSections?: boolean
  paddingBottom?: string
  paddingTop?: string
  parallax?: Parallax // true, false, 'sections', 'slides'
  parallaxOptions?: ParallaxOptions
  recordHistory?: boolean
  resetSliders?: boolean
  responsive?: number
  responsiveHeight?: number
  responsiveSlides?: boolean
  responsiveWidth?: number
  scrollBar?: boolean
  scrollHorizontally?: boolean
  scrollOverflow?: boolean
  scrollOverflowMacStyle?: boolean
  scrollOverflowHandler?: any
  scrollOverflowReset?: ScrollOverflowReset
  scrollingSpeed?: number
  dropEffect?: DropEffect
  dropEffectOptions?: any
  waterEffect?: WaterEffect
  waterEffectOptions?: WaterEffectOptions
  cards?: boolean
  cardsOptions?: CardsOptions
  sectionSelector?: string
  sectionsColor?: string[]
  showActiveTooltip?: boolean
  slideSelector?: string
  slidesNavPosition?: 'top' | 'bottom'
  slidesNavigation?: boolean
  touchSensitivity?: number
  verticalCentered?: boolean

  /* callback and events */
  afterLoad?(
    origin: Item,
    destination: Item,
    direction: string,
    trigger: Trigger
  ): void
  afterRender?(): void
  afterResize?(width: number, height: number): void
  afterReBuild?(): void
  afterResponsive?(isResponsive: boolean): void
  afterSlideLoad?(
    section: Item,
    origin: Item,
    destination: Item,
    direction: string,
    trigger: Trigger
  ): void
  onLeave?(
    origin: Item,
    destination: Item,
    direction: string,
    trigger: Trigger
  ): void
  beforeLeave?(
    origin: Item,
    destination: Item,
    direction: string,
    trigger: Trigger
  ): void
  onSlideLeave?(
    section: Item,
    origin: Item,
    destination: Item,
    direction: string,
    trigger: Trigger
  ): void
  onScrollOverflow?(
    section: Item,
    slide: Item,
    position: number,
    direction: string
  ): void

  /* keys for extensions */
  fadingEffectKey?: string
  responsiveSlidesKey?: string
  continuousHorizontalKey?: string
  interlockedSlidesKey?: string
  scrollHorizontallyKey?: string
  resetSlidersKey?: string
  offsetSectionsKey?: string
  dragAndMoveKey?: string
  parallaxKey?: string
  /* end key sections */
}
