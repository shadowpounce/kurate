import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { Button } from '../../shared/Button/Button'
import { Cross } from '../../shared/Cross/Cross'
import { Input } from '../../shared/Input/Input'
import styles from './ContactForm.module.scss'
import { Waves } from '../../shared/Waves/Waves'
import clsx from 'clsx'
import useSplit from '../../hooks/useSplit'
import { DrawableLine } from '../../shared/DrawableLine/DrawableLine'

const FORM_STEPS = [
  {
    name: 'name',
    placeholder: 'Your name',
  },
  {
    name: 'email',
    placeholder: 'Your email',
  },
  {
    name: 'link',
    placeholder: 'Link to demos',
  },
]

interface IProps {
  sectionActiveId: number
}

export const ContactForm: FC<IProps> = ({ sectionActiveId }) => {
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [link, setLink] = useState<string>('')

  const [stepId, setStepId] = useState<number>(1)
  const [currentStep, setCurrentStep] = useState<string>('name')

  const [disabled, setDisabled] = useState<boolean>(false)

  const [activeValue, setActiveValue] = useState<any>(name)
  const [activeSetValue, setActiveSetValue] = useState<{
    setStateAction: Dispatch<SetStateAction<string>>
  }>({ setStateAction: setName })

  const [confirmStep, setConfirmStep] = useState<boolean>(false)
  const [formSent, setFormSent] = useState<boolean>(false)

  const [activeIdCross, setActiveIdCross] = useState<number>(0)

  useEffect(() => {
    const section = document.querySelector<HTMLDataElement>('#contact')

    const id = section?.dataset.screen

    setActiveIdCross(Number(id))
  }, [])

  useEffect(() => {
    if (stepId === FORM_STEPS.length + 1) {
      setConfirmStep(true)
    } else {
      setConfirmStep(false)
    }
  }, [stepId])

  useEffect(() => {
    if (data) {
      if (stepId === 1) {
        if (data.name !== '') {
          setActiveValue(data.name)
        }
      }

      if (stepId === 2) {
        if (data.email !== '') {
          setActiveValue(data.email)
        }
      }

      if (stepId === 3) {
        if (data.link !== '') {
          setActiveValue(data.link)
        }
      }
    }
  }, [stepId])

  const [data, setData] = useState<{
    [key: string]: any
  }>()

  useEffect(() => {
    setData({
      name: name,
      email: email,
      link: link,
    })
  }, [name, email, link])

  useEffect(() => {
    if (currentStep === 'name') {
      setActiveSetValue({ setStateAction: setName })
    }

    if (currentStep === 'email') {
      setActiveSetValue({ setStateAction: setEmail })
    }

    if (currentStep === 'link') {
      setActiveSetValue({ setStateAction: setLink })
    }
  }, [currentStep])

  useEffect(() => {
    if (currentStep === 'name') {
      setActiveValue(name)
    }

    if (currentStep === 'email') {
      setActiveValue(email)
    }

    if (currentStep === 'link') {
      setActiveValue(link)
    }
  }, [name, email, link])

  useEffect(() => {
    if (stepId <= FORM_STEPS.length) {
      setCurrentStep(FORM_STEPS[stepId - 1].name)
    }
  }, [stepId])

  useEffect(() => {
    if (currentStep === 'name') {
      name === '' ? setDisabled(true) : setDisabled(false)
    }

    if (currentStep === 'email') {
      email === '' ? setDisabled(true) : setDisabled(false)
    }

    if (currentStep === 'link') {
      link === '' ? setDisabled(true) : setDisabled(false)
    }
  }, [name, email, link, currentStep])

  const handleClick = () => {
    if (confirmStep) {
      setFormSent(true)
      return
    }

    if (data) {
      if (stepId === 3 && !data.link.includes('soundcloud')) {
        alert('Try again. Your link must be contain a link from SoundCloud')

        return
      }
    }

    if (stepId === 2 && !email.includes('@')) {
      alert('Wrong email address.')

      return
    }

    if (stepId !== FORM_STEPS.length) {
      setStepId(stepId + 1)
      setActiveValue('')
    }

    if (stepId === FORM_STEPS.length) {
      setStepId(stepId + 1)
    }
  }

  const backToStep = (id: number) => {
    if (id !== 0 && id !== FORM_STEPS.length + 1) {
      setStepId(id)
      if (data) {
        setActiveValue(data[FORM_STEPS[id - 1].name])
      }
    }
  }

  return (
    <div
      onKeyPress={(ev) => {
        if (ev.key === 'Enter') {
          ev.preventDefault()

          handleClick()
        }
      }}
      className={styles.contactForm}
    >
      {window.innerWidth > 768 && (
        <div
          className={clsx(
            styles.infoPanel,
            stepId > 1 && !formSent && styles.visible
          )}
        >
          <div className={styles.head}>
            <p>Your info</p>
            <span>
              {stepId - 1} / {FORM_STEPS.length}
            </span>
          </div>
          <div className={styles.body}>
            {FORM_STEPS.slice(0, stepId - 1).map((item, idx) => (
              <div className={styles.step}>
                <span>{item.placeholder}</span>
                <p>{data && data[item.name]}</p>
                <div
                  onClick={() => backToStep(idx + 1)}
                  className={styles.edit}
                >
                  Edit
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {window.innerWidth > 768 && (
        <div className={styles.waves}>
          <Waves />
        </div>
      )}
      <div
        className={clsx(
          styles.content,
          confirmStep && styles.confirm,
          formSent && styles.sent
        )}
      >
        <div className={styles.group}>
          <div className={styles.wrap}>
            {confirmStep && (
              <div
                className={clsx(styles.confirmContent, styles.statusContent)}
              >
                <small>
                  {useSplit(
                    'and the last step...',
                    {
                      duration: 0.3,
                      delay: 0.07,
                      startDelay: 0,
                      ease: 'ease',
                    },
                    true
                  )}
                </small>
                <h4>
                  {window.innerWidth > 768 ? (
                    <>
                      <div>
                        {useSplit(
                          'Proceed to submission by',
                          {
                            duration: 0.5,
                            delay: 0.025,
                            startDelay: 0,
                            ease: 'ease',
                          },
                          true
                        )}
                      </div>
                      <div>
                        {useSplit(
                          'pressing button down below',
                          {
                            duration: 0.5,
                            delay: 0.025,
                            startDelay: 0.5,
                            ease: 'ease',
                          },
                          true
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        {useSplit(
                          'Proceed to submission',
                          {
                            duration: 0.5,
                            delay: 0.025,
                            startDelay: 0,
                            ease: 'ease',
                          },
                          true
                        )}
                      </div>
                      <div>
                        {useSplit(
                          'by pressing button',
                          {
                            duration: 0.5,
                            delay: 0.025,
                            startDelay: 0.5,
                            ease: 'ease',
                          },
                          true
                        )}
                      </div>
                      <div>
                        {useSplit(
                          'down below',
                          {
                            duration: 0.5,
                            delay: 0.025,
                            startDelay: 1,
                            ease: 'ease',
                          },
                          true
                        )}
                      </div>
                    </>
                  )}
                </h4>
                <div className={styles.line}>
                  <DrawableLine anim={confirmStep && true}>
                    <svg
                      width="71"
                      height="70"
                      viewBox="0 0 71 70"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19 65.5C17 66.5 14.8838 67.3498 13.4936 68.2857C12.7264 68.8022 12.8514 67.5297 12.8228 66.7777C12.6939 63.3937 15.3158 59.9881 17.4093 57.6278C26.7822 47.0607 39.5993 36.427 53.6619 33.3282C54.6069 33.12 69.9985 30.1359 69.5538 32.3216C68.9661 35.2108 60.1898 37.5643 58.0289 38.3293C51.8116 40.5304 45.1504 41.6944 38.6458 42.7036C28.0852 44.342 14.1414 44.252 6.28688 35.8157C0.866052 29.9934 0.549158 20.8446 3.98042 13.8469C6.40742 8.89728 10.9678 5.51485 14.3225 1.31987M7.76539 62.0538L12.8748 68.7573"
                        stroke="#FAFAFA"
                        stroke-width="2.33424"
                        stroke-linecap="round"
                      />
                    </svg>
                  </DrawableLine>
                </div>
                <div className="reveal-anim animated">
                  <Button
                    handleClick={() => handleClick()}
                    buttonType="secondary"
                  >
                    Send your demos
                  </Button>
                </div>
              </div>
            )}
            {formSent && (
              <div className={clsx(styles.sentContent, styles.statusContent)}>
                <small>
                  {useSplit(
                    'Your demo has been submitted',
                    {
                      duration: 0.3,
                      delay: 0.05,
                      startDelay: 0,
                      ease: 'ease',
                    },
                    true
                  )}
                </small>
                <h4>
                  <div>
                    {useSplit(
                      'Thank you',
                      {
                        duration: 0.5,
                        delay: 0.025,
                        startDelay: 0,
                        ease: 'ease',
                      },
                      true
                    )}
                    <img
                      className={clsx(styles.rect, 'reveal-anim animated')}
                      src="/images/SendForm/rect.png"
                      alt=""
                    />
                    {useSplit(
                      'for your',
                      {
                        duration: 0.5,
                        delay: 0.025,
                        startDelay: 0.2,
                        ease: 'ease',
                      },
                      true
                    )}
                  </div>
                  <div>
                    {useSplit(
                      'interest in our label!',
                      {
                        duration: 0.5,
                        delay: 0.025,
                        startDelay: 0.5,
                        ease: 'ease',
                      },
                      true
                    )}
                  </div>
                </h4>
                <p>
                  {useSplit(
                    'Our team will be in touch with you soon',
                    {
                      duration: 0.1,
                      delay: 0.025,
                      startDelay: 0.65,
                      ease: 'ease',
                    },
                    true
                  )}
                </p>
              </div>
            )}
            <p className={styles.title}>
              <div>
                {useSplit('Send us your demos ', {
                  duration: 0.5,
                  delay: 0.035,
                  startDelay: 0,
                  ease: 'ease',
                })}
              </div>

              <div>
                {useSplit('to join our team', {
                  duration: 0.5,
                  delay: 0.035,
                  startDelay: 0.5,
                  ease: 'ease',
                })}
              </div>
            </p>
            <div className={styles.input}>
              <Input
                currentStep={currentStep}
                // activeValue={activeValue}
                value={activeValue}
                setValue={activeSetValue}
                placeholder={
                  stepId <= FORM_STEPS.length
                    ? FORM_STEPS[stepId - 1].placeholder
                    : ''
                }
              />
            </div>
            <div className={styles.pagination}>
              {FORM_STEPS.map((item, idx) => (
                <div className={`${idx + 1 === stepId && styles.active}`}></div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.actionButton}>
          <Button
            disabled={disabled}
            handleClick={() => handleClick()}
            buttonType="secondary"
          >
            Next step
          </Button>
        </div>

        {window.innerWidth <= 768 && currentStep !== 'name' && (
          <div
            className={clsx(
              styles.infoPanel,
              stepId > 1 && !formSent && styles.visible
            )}
          >
            <div className={styles.head}>
              <p>Your info</p>
              <span>
                {stepId - 1} / {FORM_STEPS.length}
              </span>
            </div>
            <div className={styles.body}>
              {FORM_STEPS.slice(0, stepId - 1).map((item, idx) => (
                <div className={styles.step}>
                  <span>{item.placeholder}</span>
                  <p>{data && data[item.name]}</p>
                  <div
                    onClick={() => backToStep(idx + 1)}
                    className={styles.edit}
                  >
                    Edit
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className={styles.leftBlock}>
          <div className={styles.cross}>
            <Cross activeId={sectionActiveId} />
          </div>
          <p className="brand-text">
            <div className="reveal">
              Empowering artists, captivating global{' '}
            </div>
            <div className="reveal">
              audiences, and redefining the future of{' '}
            </div>
            <div className="reveal">musicas a dynamic record label</div>
          </p>
        </div>
      </div>
    </div>
  )
}
