import clsx from 'clsx'
import styles from './SendDemos.module.scss'
import { ContactForm } from '../../../../features/ContactForm/ContactForm'
import { TextTicker } from '../../../../shared/TextTicker/TextTicker'
import { FC } from 'react'

interface IProps {
  sectionActiveId?: number
}

export const SendDemos: FC<IProps> = ({ sectionActiveId = 4 }) => {
  return (
    <section
      data-grid="false"
      id="contact"
      className={clsx('section', styles.sendDemos)}
    >
      <div className={styles.ticker}>
        <TextTicker />
      </div>
      <div className="container">
        <div className={styles.wrapper}>
          <div className={styles.contactForm}>
            <ContactForm sectionActiveId={sectionActiveId} />
          </div>
        </div>
      </div>
    </section>
  )
}
