import { useTranslation } from 'react-i18next'
import { Section } from '../ui/Section'
import { contactInfo } from '../../config/site'
import { ContactForm } from './ContactForm'

export function Contact() {
  const { t } = useTranslation('translation', { keyPrefix: 'contact' })

  return (
    <Section
      id="contact"
      title={t('title')}
      header={
        <p className="text-slate-400 text-lg m-0 mt-1">{t('subtitle')}</p>
      }
    >
      <div className="grid gap-8 sm:gap-10 md:grid-cols-2 md:gap-12 items-start">
        <div className="space-y-4 min-w-0">
          <p className="text-slate-400 text-sm sm:text-base m-0 break-words">
            <strong className="text-slate-200">{t('email')}:</strong>{' '}
            <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
          </p>
          <p className="text-slate-400 text-sm sm:text-base m-0 break-words">
            <strong className="text-slate-200">{t('phone')}:</strong>{' '}
            <a href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}>
              {contactInfo.phone}
            </a>
          </p>
          <p className="text-slate-400 text-sm sm:text-base m-0 break-words">
            <strong className="text-slate-200">{t('linkedIn')}:</strong>{' '}
            <a
              href={contactInfo.linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              santiago-cacua-villamizar
            </a>
          </p>
        </div>
        <ContactForm />
      </div>
    </Section>
  )
}
