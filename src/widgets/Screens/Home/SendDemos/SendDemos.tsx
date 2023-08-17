import clsx from 'clsx'
import styles from './SendDemos.module.scss'
import { ContactForm } from '../../../../features/ContactForm/ContactForm'
import { TextTicker } from '../../../../shared/TextTicker/TextTicker'

export const SendDemos = () => {
  return (
    <section className={clsx('section', styles.sendDemos)}>
      <div className={styles.ticker}>
        <TextTicker />
      </div>
      <div className="container">
        <div className={styles.wrapper}>
          <div className={styles.contactForm}>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}
