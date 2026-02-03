import { useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { formspreeEndpoint } from '../../config/site'

type Status = 'idle' | 'sending' | 'success' | 'error'

function CheckIcon() {
  return (
    <svg
      className="w-12 h-12 text-emerald-400 mx-auto mb-3"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 13l4 4L19 7"
      />
    </svg>
  )
}

function ErrorIcon() {
  return (
    <svg
      className="w-12 h-12 text-red-400 mx-auto mb-3"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  )
}

export function ContactForm() {
  const { t } = useTranslation('translation', { keyPrefix: 'contact.form' })
  const [status, setStatus] = useState<Status>('idle')

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (!formspreeEndpoint) {
        setStatus('error')
        return
      }
      const form = e.currentTarget
      const data = new FormData(form)
      setStatus('sending')
      try {
        const res = await fetch(formspreeEndpoint, {
          method: 'POST',
          body: data,
          headers: { Accept: 'application/json' },
        })
        if (res.ok) {
          setStatus('success')
          form.reset()
        } else {
          setStatus('error')
        }
      } catch {
        setStatus('error')
      }
    },
    []
  )

  if (!formspreeEndpoint) {
    return (
      <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
        <p className="text-slate-400 text-sm m-0">
          {t('error')}{' '}
          <a href="mailto:santiagocacuav@gmail.com" className="text-blue-400">
            santiagocacuav@gmail.com
          </a>
        </p>
      </div>
    )
  }

  if (status === 'success') {
    return (
      <div
        className="p-8 rounded-xl border border-emerald-500/30 bg-emerald-500/5 text-center animate-fade-in"
        role="status"
        aria-live="polite"
      >
        <CheckIcon />
        <h3 className="text-xl font-semibold text-emerald-400 mb-2">
          {t('successTitle')}
        </h3>
        <p className="text-slate-400 m-0">{t('success')}</p>
        <button
          type="button"
          className="mt-6 px-5 py-2.5 rounded-lg font-medium text-slate-300 border border-slate-600 hover:bg-slate-800 hover:border-slate-500 transition-colors"
          onClick={() => setStatus('idle')}
        >
          {t('sendAnother')}
        </button>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div
        className="p-8 rounded-xl border border-red-500/30 bg-red-500/5 text-center animate-fade-in"
        role="alert"
      >
        <ErrorIcon />
        <h3 className="text-xl font-semibold text-red-400 mb-2">
          {t('errorTitle')}
        </h3>
        <p className="text-slate-400 text-sm mb-4">{t('error')}</p>
        <a
          href="mailto:santiagocacuav@gmail.com"
          className="inline-block px-5 py-2.5 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors"
        >
          {t('sendEmail')}
        </a>
        <button
          type="button"
          className="block w-full mt-3 text-sm text-slate-400 hover:text-slate-200"
          onClick={() => setStatus('idle')}
        >
          {t('retry')}
        </button>
      </div>
    )
  }

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={handleSubmit}
      aria-label="Formulario de contacto"
    >
      <div>
        <label
          htmlFor="contact-name"
          className="block text-sm font-medium text-slate-200 mb-1.5"
        >
          {t('name')}
        </label>
        <input
          id="contact-name"
          type="text"
          name="name"
          required
          disabled={status === 'sending'}
          placeholder={t('namePlaceholder')}
          className="w-full px-4 py-2.5 rounded-lg bg-slate-800 border border-slate-600 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow disabled:opacity-60"
        />
      </div>
      <div>
        <label
          htmlFor="contact-email"
          className="block text-sm font-medium text-slate-200 mb-1.5"
        >
          {t('email')}
        </label>
        <input
          id="contact-email"
          type="email"
          name="email"
          required
          disabled={status === 'sending'}
          placeholder={t('emailPlaceholder')}
          className="w-full px-4 py-2.5 rounded-lg bg-slate-800 border border-slate-600 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow disabled:opacity-60"
        />
      </div>
      <div>
        <label
          htmlFor="contact-message"
          className="block text-sm font-medium text-slate-200 mb-1.5"
        >
          {t('message')}
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={4}
          disabled={status === 'sending'}
          placeholder={t('messagePlaceholder')}
          className="w-full px-4 py-2.5 rounded-lg bg-slate-800 border border-slate-600 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y min-h-[100px] transition-shadow disabled:opacity-60"
        />
      </div>
      <input
        type="text"
        name="_gotcha"
        className="absolute -left-[9999px] w-px h-px opacity-0 pointer-events-none"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />
      <button
        type="submit"
        disabled={status === 'sending'}
        className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg font-medium bg-blue-600 text-white border-2 border-blue-600 hover:bg-blue-700 hover:border-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
      >
        {status === 'sending' ? t('sending') : t('submit')}
      </button>
    </form>
  )
}
