import { useTranslation } from 'react-i18next'
import { useState, useRef, useId } from 'react'

type FieldName = 'name' | 'email' | 'message'

interface FieldState {
  value: string
  touched: boolean
  error: string | null
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validateName(value: string): string | null {
  if (!value.trim()) return 'required'
  if (value.trim().length < 2) return 'min'
  return null
}

function validateEmail(value: string): string | null {
  if (!value.trim()) return 'required'
  if (!EMAIL_REGEX.test(value.trim())) return 'invalid'
  return null
}

function validateMessage(value: string): string | null {
  if (!value.trim()) return 'required'
  if (value.trim().length < 10) return 'min'
  return null
}

export function FormValidationDemo() {
  const { t } = useTranslation('translation', { keyPrefix: 'demo' })
  const [name, setName] = useState<FieldState>({ value: '', touched: false, error: null })
  const [email, setEmail] = useState<FieldState>({ value: '', touched: false, error: null })
  const [message, setMessage] = useState<FieldState>({ value: '', touched: false, error: null })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [submitAttempted, setSubmitAttempted] = useState(false)
  const nameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const messageRef = useRef<HTMLTextAreaElement>(null)
  const id = useId()

  const getErrorKey = (field: FieldName, code: string): string => {
    if (code === 'required') return 'formsErrorRequired'
    if (field === 'name' && code === 'min') return 'formsErrorNameMin'
    if (field === 'email' && code === 'invalid') return 'formsErrorEmailInvalid'
    if (field === 'message' && code === 'min') return 'formsErrorMessageMin'
    return 'formsErrorRequired'
  }

  const runValidation = (field: FieldName, value: string): string | null => {
    switch (field) {
      case 'name':
        return validateName(value)
      case 'email':
        return validateEmail(value)
      case 'message':
        return validateMessage(value)
      default:
        return null
    }
  }

  const handleBlur = (field: FieldName) => {
    const state = field === 'name' ? name : field === 'email' ? email : message
    const error = runValidation(field, state.value)
    const errorKey = error ? getErrorKey(field, error) : null
    if (field === 'name') setName((s) => ({ ...s, touched: true, error: errorKey }))
    if (field === 'email') setEmail((s) => ({ ...s, touched: true, error: errorKey }))
    if (field === 'message') setMessage((s) => ({ ...s, touched: true, error: errorKey }))
  }

  const handleNameChange = (value: string) => {
    const error = runValidation('name', value)
    setName((s) => ({
      ...s,
      value,
      error: s.touched && error ? getErrorKey('name', error) : null,
    }))
  }

  const handleEmailChange = (value: string) => {
    const error = runValidation('email', value)
    setEmail((s) => ({
      ...s,
      value,
      error: s.touched && error ? getErrorKey('email', error) : null,
    }))
  }

  const handleMessageChange = (value: string) => {
    const error = runValidation('message', value)
    setMessage((s) => ({
      ...s,
      value,
      error: s.touched && error ? getErrorKey('message', error) : null,
    }))
  }

  const allValid =
    !runValidation('name', name.value) &&
    !runValidation('email', email.value) &&
    !runValidation('message', message.value)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitAttempted(true)

    const nameError = runValidation('name', name.value)
    const emailError = runValidation('email', email.value)
    const messageError = runValidation('message', message.value)

    setName((s) => ({ ...s, touched: true, error: nameError ? getErrorKey('name', nameError) : null }))
    setEmail((s) => ({ ...s, touched: true, error: emailError ? getErrorKey('email', emailError) : null }))
    setMessage((s) => ({ ...s, touched: true, error: messageError ? getErrorKey('message', messageError) : null }))

    if (nameError) {
      nameRef.current?.focus()
      return
    }
    if (emailError) {
      emailRef.current?.focus()
      return
    }
    if (messageError) {
      messageRef.current?.focus()
      return
    }

    setIsSubmitting(true)
    // Simular envío
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
      setName({ value: '', touched: false, error: null })
      setEmail({ value: '', touched: false, error: null })
      setMessage({ value: '', touched: false, error: null })
      setSubmitAttempted(false)
    }, 1200)
  }

  const inputBase =
    'w-full rounded-lg border bg-slate-800/60 px-3 py-2.5 text-sm text-slate-100 placeholder-slate-500 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-slate-800'
  const inputError = 'border-red-500/60 focus:ring-red-500/50'
  const inputOk = 'border-slate-600'

  if (isSuccess) {
    return (
      <div
        className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-6 text-center"
        role="status"
        aria-live="polite"
      >
        <div className="mb-2 text-emerald-400 text-lg font-medium">
          {t('formsSuccessTitle')}
        </div>
        <p className="text-slate-300 text-sm m-0 mb-4">{t('formsSuccessText')}</p>
        <button
          type="button"
          onClick={() => setIsSuccess(false)}
          className="px-4 py-2 rounded-lg text-sm font-medium bg-slate-700 text-slate-200 hover:bg-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800"
        >
          {t('formsAgain')}
        </button>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-4"
      aria-describedby={submitAttempted && !allValid ? `${id}-form-errors` : undefined}
    >
      {submitAttempted && !allValid && (
        <div
          id={`${id}-form-errors`}
          className="rounded-lg border border-amber-500/40 bg-amber-500/10 px-3 py-2 text-amber-200 text-sm"
          role="alert"
        >
          {t('formsReviewFields')}
        </div>
      )}

      <div>
        <label
          htmlFor={`${id}-name`}
          className="mb-1.5 block text-sm font-medium text-slate-300"
        >
          {t('formsLabelName')}
        </label>
        <input
          ref={nameRef}
          id={`${id}-name`}
          type="text"
          autoComplete="name"
          value={name.value}
          onChange={(e) => handleNameChange(e.target.value)}
          onBlur={() => handleBlur('name')}
          placeholder={t('formsPlaceholderName')}
          className={`${inputBase} ${name.error ? inputError : inputOk}`}
          aria-invalid={!!name.error}
          aria-describedby={name.error ? `${id}-name-error` : undefined}
        />
        {name.error && (
          <p
            id={`${id}-name-error`}
            className="mt-1.5 text-sm text-red-400"
            role="alert"
          >
            {t(name.error)}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor={`${id}-email`}
          className="mb-1.5 block text-sm font-medium text-slate-300"
        >
          {t('formsLabelEmail')}
        </label>
        <input
          ref={emailRef}
          id={`${id}-email`}
          type="email"
          autoComplete="email"
          value={email.value}
          onChange={(e) => handleEmailChange(e.target.value)}
          onBlur={() => handleBlur('email')}
          placeholder={t('formsPlaceholderEmail')}
          className={`${inputBase} ${email.error ? inputError : inputOk}`}
          aria-invalid={!!email.error}
          aria-describedby={email.error ? `${id}-email-error` : undefined}
        />
        {email.error && (
          <p
            id={`${id}-email-error`}
            className="mt-1.5 text-sm text-red-400"
            role="alert"
          >
            {t(email.error)}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor={`${id}-message`}
          className="mb-1.5 block text-sm font-medium text-slate-300"
        >
          {t('formsLabelMessage')}
        </label>
        <textarea
          ref={messageRef}
          id={`${id}-message`}
          rows={4}
          value={message.value}
          onChange={(e) => handleMessageChange(e.target.value)}
          onBlur={() => handleBlur('message')}
          placeholder={t('formsPlaceholderMessage')}
          className={`${inputBase} resize-y min-h-[100px] ${message.error ? inputError : inputOk}`}
          aria-invalid={!!message.error}
          aria-describedby={message.error ? `${id}-message-error` : undefined}
        />
        {message.error && (
          <p
            id={`${id}-message-error`}
            className="mt-1.5 text-sm text-red-400"
            role="alert"
          >
            {t(message.error)}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg bg-blue-500 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isSubmitting ? t('formsSubmitting') : t('formsSubmit')}
      </button>
    </form>
  )
}
